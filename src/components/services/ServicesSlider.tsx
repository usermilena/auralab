"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  type PanInfo,
} from "motion/react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { useProjectBrief } from "@/components/providers/ProjectBriefProvider";
import type { ServiceSlideConfig } from "@/config/services";
import { cn } from "@/lib/cn";
import { ServiceSlide } from "./ServiceSlide";

export type SlideData = Omit<ServiceSlideConfig, "visual"> & {
  tab: string;
  title: string;
  description: string;
  cta: string;
  visual: ReactNode;
};

type ServicesSliderProps = {
  slides: SlideData[];
  heading: ReactNode;
  contactId: string;
  labels: {
    pause: string;
    play: string;
    tabs: string;
    previous: string;
    next: string;
    conceptNote: string;
    progress: string[];
  };
};

const SWIPE_THRESHOLD = 6000;
/** Time each slide stays on screen while autoplaying. */
const AUTOPLAY_MS = 6500;

const variants = {
  enter: (direction: number) => ({ x: direction > 0 ? "6%" : "-6%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? "-6%" : "6%", opacity: 0 }),
};

export function ServicesSlider({ slides, heading, contactId, labels }: ServicesSliderProps) {
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);
  const tablistRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  // Visitor can stop autoplay with the pause button (WCAG 2.2.2).
  const [stopped, setStopped] = useState(false);
  const [dragging, setDragging] = useState(false);
  /** 0..1 progress of the current slide's autoplay timer. */
  const progress = useMotionValue(0);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const baseId = useId();
  const { suggestProjectType } = useProjectBrief();
  const count = slides.length;
  const slide = slides[index];

  const goTo = useCallback(
    (next: number, dir?: number) => {
      setState(([current]) => {
        const target = (next + count) % count;
        if (target === current) return [current, 0];
        return [target, dir ?? (target > current ? 1 : -1)];
      });
    },
    [count],
  );

  const step = useCallback(
    (dir: 1 | -1) => setState(([current]) => [(current + dir + count) % count, dir]),
    [count],
  );

  const autoplay = !reducedMotion && !stopped;
  const running = autoplay && !dragging && inView && pageVisible;

  // Every slide change (auto or manual) restarts the timer.
  useEffect(() => {
    progress.set(0);
  }, [index, progress]);

  useEffect(() => {
    if (!running) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const next = progress.get() + (now - last) / AUTOPLAY_MS;
      last = now;
      if (next >= 1) {
        progress.set(0);
        step(1);
      } else {
        progress.set(next);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running, progress, step]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
    });
    observer.observe(root);
    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // Keep the active tab visible in the horizontally scrolling tab row (mobile).
  useEffect(() => {
    const list = tablistRef.current;
    const tab = tabRefs.current[index];
    if (!list || !tab || list.scrollWidth <= list.clientWidth) return;
    const left = tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2;
    list.scrollTo({ left, behavior: reducedMotion ? "auto" : "smooth" });
  }, [index, reducedMotion]);


  const onTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: count - 1,
    };
    if (!(event.key in keys)) return;
    event.preventDefault();
    const target = (keys[event.key] + count) % count;
    goTo(target);
    tabRefs.current[target]?.focus();
  };

  const onDragEnd = (_: unknown, { offset, velocity }: PanInfo) => {
    const power = Math.abs(offset.x) * Math.abs(velocity.x);
    setDragging(false);
    if (power < SWIPE_THRESHOLD && Math.abs(offset.x) < 80) return;
    step(offset.x < 0 ? 1 : -1);
  };

  const arrowClass =
    "inline-flex size-12 items-center justify-center rounded-full border border-line-strong bg-surface/70 text-foreground transition-[background-color,border-color,transform] duration-300 hover:border-foreground/30 hover:bg-surface active:scale-95";

  const arrows = (
    <>
      <button type="button" aria-label={labels.previous} onClick={() => step(-1)} className={arrowClass}>
        <ArrowLeft className="size-[1.125rem]" aria-hidden="true" />
      </button>
      <button type="button" aria-label={labels.next} onClick={() => step(1)} className={arrowClass}>
        <ArrowRight className="size-[1.125rem]" aria-hidden="true" />
      </button>
    </>
  );

  return (
    <div ref={rootRef}>
      <div className="flex items-end justify-between gap-6">
        {heading}
        <div className="hidden shrink-0 gap-3 sm:flex">{arrows}</div>
      </div>

      <div
        ref={tablistRef}
        role="tablist"
        aria-label={labels.tabs}
        onKeyDown={onTabKeyDown}
        className="-mx-5 mt-7 flex gap-1 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:px-0 md:mt-9 [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((s, i) => {
          const active = i === index;
          return (
            <button
              key={s.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${s.id}`}
              aria-selected={active}
              aria-controls={`${baseId}-panel`}
              tabIndex={active ? 0 : -1}
              onClick={() => goTo(i)}
              className={cn(
                "relative h-11 shrink-0 rounded-full px-5 text-[0.9375rem] font-medium whitespace-nowrap transition-colors duration-300",
                active ? "text-foreground" : "text-foreground/60 hover:text-foreground",
              )}
            >
              {active && (
                <motion.span
                  layoutId={`${baseId}-pill`}
                  className="absolute inset-0 rounded-full bg-soft"
                  transition={{ type: "spring", bounce: 0.18, duration: 0.55 }}
                />
              )}
              <span className="relative">{s.tab}</span>
            </button>
          );
        })}
      </div>

      <div className="relative mt-5 overflow-hidden rounded-card md:mt-6">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={slide.id}
            id={`${baseId}-panel`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${slide.id}`}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragStart={() => setDragging(true)}
            onDragEnd={onDragEnd}
            style={
              {
                "--slide-bg": slide.background,
                "--slide-bg-dark": slide.darkBackground,
                touchAction: "pan-y",
              } as CSSProperties
            }
            className="cursor-grab [background:var(--slide-bg)] active:cursor-grabbing dark:[background:var(--slide-bg-dark)]"
          >
            <ServiceSlide
              slide={slide}
              conceptNote={labels.conceptNote}
              ctaHref={`#${contactId}`}
              onCtaClick={() => suggestProjectType(slide.projectType)}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 sm:gap-6">
        <div className="flex items-center gap-4 sm:gap-6">
          <p
            className="text-sm whitespace-nowrap text-muted tabular-nums"
            aria-live={autoplay ? "off" : "polite"}
          >
            <span className="sr-only">{labels.progress[index]}</span>
            <span aria-hidden="true">
              <span className="font-medium text-foreground">{String(index + 1).padStart(2, "0")}</span>
              {" / "}
              {String(count).padStart(2, "0")}
            </span>
          </p>
          <div aria-hidden="true" className="flex gap-1.5">
            {slides.map((s, i) => {
              const active = i === index;
              return (
                <span
                  key={s.id}
                  className={cn(
                    "relative h-[3px] overflow-hidden rounded-full bg-foreground/12 transition-[width] duration-500 ease-out",
                    active ? "w-10 min-[24rem]:w-12" : "w-4 min-[24rem]:w-6",
                  )}
                >
                  {active && (
                    <motion.span
                      className="absolute inset-0 origin-left bg-foreground"
                      style={{ scaleX: autoplay ? progress : 1 }}
                    />
                  )}
                </span>
              );
            })}
          </div>
          {!reducedMotion && (
            <button
              type="button"
              onClick={() => setStopped((v) => !v)}
              aria-label={stopped ? labels.play : labels.pause}
              className="-ml-2 grid size-8 place-items-center rounded-full text-foreground/50 transition-colors hover:bg-foreground/5 hover:text-foreground"
            >
              {stopped ? (
                <Play className="size-3.5" fill="currentColor" aria-hidden="true" />
              ) : (
                <Pause className="size-3.5" fill="currentColor" aria-hidden="true" />
              )}
            </button>
          )}
        </div>
        <div className="flex gap-2 sm:hidden">{arrows}</div>
      </div>
    </div>
  );
}
