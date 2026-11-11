import { useTranslations } from "next-intl";
import { BrowserFrame, PhoneFrame } from "@/components/ui/frames";
import { CupArt } from "@/components/ui/illustrations";
import type { ServiceVisual } from "@/config/services";

/**
 * Concept mockups for the services slider, built with CSS/SVG so they scale
 * crisply. They illustrate the type of work and are not real client projects;
 * replace with portfolio imagery when available.
 */
export function ServiceVisualRenderer({ visual }: { visual: ServiceVisual }) {
  switch (visual) {
    case "laptop":
      return <LaptopVisual />;
    case "store":
      return <StoreVisual />;
    case "phones":
      return <PhonesVisual />;
    case "canvas":
      return <CanvasVisual />;
  }
}

/* ---------------------------------------------------------------- */

function LaptopVisual() {
  const t = useTranslations("services.mockups.site");
  return (
    <div className="@container relative size-full">
      <div className="absolute top-[8%] right-[6%] size-[62cqw] rounded-full bg-[radial-gradient(circle,rgb(255_255_255/0.7),transparent_65%)]" />
      <div className="absolute right-[-3%] bottom-[7%] w-[94%] md:right-[4%] md:w-[88%]">
        <div className="@container">
          <div className="rounded-t-[2.4cqw] bg-[#161a18] p-[1.3cqw] pb-[1.6cqw] shadow-[0_40px_80px_-40px_rgb(0_0_0/0.5)]">
            <div className="aspect-[16/10] overflow-hidden rounded-[0.6cqw] bg-[#f5eee5]">
              <div className="flex items-center justify-between px-[4cqw] pt-[3cqw]">
                <span className="text-[2.6cqw] font-semibold tracking-tight">{t("brand")}</span>
                <span className="flex gap-[2.6cqw] text-[1.45cqw] text-black/60">
                  <span>{t("nav1")}</span>
                  <span>{t("nav2")}</span>
                  <span>{t("nav3")}</span>
                </span>
              </div>
              <div className="grid grid-cols-[1fr_1.05fr] items-center gap-[2cqw] px-[4cqw] pt-[3cqw]">
                <div>
                  <p className="text-[5cqw] leading-[1.02] font-medium tracking-[-0.03em] text-[#2a2420]">
                    {t("heading")}
                  </p>
                  <p className="mt-[2cqw] max-w-[90%] text-[1.6cqw] leading-snug text-black/55">
                    {t("text")}
                  </p>
                  <span className="mt-[2.6cqw] inline-flex rounded-full bg-primary px-[2.6cqw] py-[1cqw] text-[1.45cqw] font-medium text-white">
                    {t("cta")}
                  </span>
                </div>
                <CupArt className="w-full" />
              </div>
            </div>
          </div>
          <div className="relative -mx-[5%] h-[2.6cqw] rounded-b-[2.4cqw] bg-[linear-gradient(180deg,#e2e2df,#a8a8a3)] shadow-[0_20px_30px_-12px_rgb(0_0_0/0.35)]">
            <span className="absolute top-0 left-1/2 h-[0.9cqw] w-[14%] -translate-x-1/2 rounded-b-[1cqw] bg-[#bcbcb7]" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */

const products = [
  { key: "1", tint: "#efe8de", shape: "vase" },
  { key: "2", tint: "#e3efe8", shape: "mug" },
  { key: "3", tint: "#ece8f1", shape: "throw" },
] as const;

function ProductShape({ shape }: { shape: (typeof products)[number]["shape"] }) {
  if (shape === "vase")
    return (
      <span className="relative block h-[58%] w-[36%]">
        <span className="absolute inset-x-[30%] top-0 h-[18%] rounded-t-[30%] bg-[#e9dfd0]" />
        <span className="absolute inset-x-0 top-[14%] bottom-0 rounded-[45%_45%_38%_38%] bg-[linear-gradient(90deg,#fbf8f3,#e2d7c8)]" />
      </span>
    );
  if (shape === "mug")
    return (
      <span className="relative block h-[44%] w-[40%]">
        <span className="absolute inset-y-[18%] -right-[24%] w-[34%] rounded-r-full border-[0.9cqw] border-l-0 border-[#1f8a70]/70" />
        <span className="absolute inset-0 rounded-b-[30%] rounded-t-[8%] bg-[linear-gradient(90deg,#2a9a7f,#1b6f5b)]" />
      </span>
    );
  return (
    <span className="flex h-[46%] w-[58%] flex-col justify-end gap-[6%]">
      <span className="h-[30%] rounded-[0.8cqw] bg-[#cfc5dd]" />
      <span className="h-[30%] rounded-[0.8cqw] bg-[#bfb3d1]" />
      <span className="h-[30%] rounded-[0.8cqw] bg-[#ada0c2]" />
    </span>
  );
}

function StoreVisual() {
  const t = useTranslations("services.mockups.store");
  return (
    <div className="@container relative size-full">
      <BrowserFrame
        className="absolute right-[-4%] bottom-[-6%] w-[86%] md:right-[2%] md:w-[78%]"
        bodyClassName="px-[4cqw] pt-[3cqw] pb-[6cqw]"
      >
        <div className="flex items-center justify-between">
          <span className="text-[2.6cqw] font-semibold tracking-tight">{t("brand")}</span>
          <span className="flex gap-[1.4cqw]">
            {[0, 1, 2].map((i) => (
              <span key={i} className="size-[2.4cqw] rounded-full border-[0.3cqw] border-black/25" />
            ))}
          </span>
        </div>
        <p className="mt-[3cqw] text-[4cqw] font-medium tracking-[-0.03em]">{t("heading")}</p>
        <div className="mt-[2.6cqw] grid grid-cols-3 gap-[2cqw]">
          {products.map((p) => (
            <div key={p.key}>
              <div
                className="flex aspect-[4/5] items-center justify-center rounded-[1.6cqw]"
                style={{ background: p.tint }}
              >
                <ProductShape shape={p.shape} />
              </div>
              <div className="mt-[1.4cqw] flex items-center justify-between text-[1.6cqw]">
                <span className="font-medium">{t(`product${p.key}`)}</span>
                <span className="text-black/50">{t(`price${p.key}`)}</span>
              </div>
            </div>
          ))}
        </div>
      </BrowserFrame>

      <PhoneFrame className="absolute bottom-[-14%] left-[2%] w-[26%] md:left-[1%] md:w-[24%]">
        <div className="flex h-full flex-col bg-[#f7f8f6] px-[8cqw] pt-[22cqw] pb-[8cqw]">
          <p className="text-[9cqw] font-semibold tracking-tight">{t("cartTitle")}</p>
          {products.slice(0, 2).map((p) => (
            <div key={p.key} className="mt-[6cqw] flex items-center gap-[5cqw]">
              <span
                className="flex size-[22cqw] shrink-0 items-center justify-center rounded-[5cqw]"
                style={{ background: p.tint }}
              >
                <span className="block size-[9cqw] rounded-full bg-black/10" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[6.5cqw] font-medium">{t(`product${p.key}`)}</span>
                <span className="block text-[5.5cqw] text-black/50">{t(`price${p.key}`)}</span>
              </span>
            </div>
          ))}
          <span className="mt-auto rounded-full bg-primary py-[4cqw] text-center text-[6cqw] font-medium text-white">
            {t("checkout")}
          </span>
        </div>
      </PhoneFrame>
    </div>
  );
}

/* ---------------------------------------------------------------- */

function PhonesVisual() {
  const t = useTranslations("services.mockups.app");
  return (
    <div className="@container relative size-full">
      <div className="absolute top-1/2 left-[56%] size-[70cqw] -translate-1/2 rounded-full bg-[radial-gradient(circle,rgb(111_227_196/0.25),transparent_65%)]" />

      <PhoneFrame
        className="absolute top-[13%] right-[8%] w-[30%] opacity-95 md:right-[10%]"
        screenClassName="bg-[#eef6f1]"
      >
        <div className="flex h-full flex-col px-[8cqw] pt-[22cqw]">
          <p className="text-[6cqw] text-black/50">{t("balance")}</p>
          <div className="mt-[4cqw] rounded-[8cqw] bg-[linear-gradient(135deg,#b5f5b0,#6fe3c4)] p-[8cqw]">
            <p className="text-[13cqw] font-semibold tracking-tight text-[#0b2a20]">{t("points")}</p>
            <div className="mt-[10cqw] flex items-end gap-[3cqw]">
              {[40, 64, 52, 80, 70, 92].map((h, i) => (
                <span key={i} className="w-full rounded-full bg-[#0b2a20]/25" style={{ height: `${h / 4}cqw` }} />
              ))}
            </div>
          </div>
          <div className="mt-[6cqw] grid grid-cols-2 gap-[4cqw]">
            <span className="aspect-square rounded-[7cqw] bg-white" />
            <span className="aspect-square rounded-[7cqw] bg-white" />
          </div>
        </div>
      </PhoneFrame>

      <PhoneFrame className="absolute top-[22%] left-[24%] w-[32%] md:left-[30%]">
        <div className="flex h-full flex-col px-[8cqw] pt-[22cqw]">
          <div className="flex items-center justify-between">
            <p className="text-[8cqw] font-semibold tracking-tight">{t("greeting")}</p>
            <span className="size-[11cqw] rounded-full bg-[linear-gradient(135deg,#ddf4e6,#b5f5b0)]" />
          </div>
          <div className="mt-[6cqw] rounded-[8cqw] bg-primary p-[7cqw] text-white">
            <p className="text-[5.5cqw] text-white/60">{t("cardTitle")}</p>
            <div className="mt-[2cqw] flex items-baseline justify-between">
              <p className="text-[8cqw] font-semibold">{t("cardStatus")}</p>
              <p className="text-[6cqw] text-mint">{t("eta")}</p>
            </div>
            <div className="mt-[5cqw] h-[2.4cqw] rounded-full bg-white/15">
              <div className="h-full w-[62%] rounded-full bg-mint" />
            </div>
          </div>
          <p className="mt-[7cqw] text-[5.5cqw] font-medium text-black/45">{t("section")}</p>
          {(["row1", "row2", "row3"] as const).map((row, i) => (
            <div key={row} className="mt-[4cqw] flex items-center gap-[4cqw]">
              <span
                className="size-[10cqw] shrink-0 rounded-[3.5cqw]"
                style={{ background: ["#ddf4e6", "#eae6f7", "#f3ece2"][i] }}
              />
              <span className="truncate text-[6cqw]">{t(row)}</span>
            </div>
          ))}
        </div>
      </PhoneFrame>
    </div>
  );
}

/* ---------------------------------------------------------------- */

function CanvasVisual() {
  const t = useTranslations("services.mockups.design");
  const palette = ["#103d2e", "#207d6c", "#6fe3c4", "#b5f5b0", "#f1ece4"];
  return (
    <div className="@container relative size-full">
      <div className="absolute right-[-3%] bottom-[-6%] w-[94%] md:right-[3%]">
        <div className="@container overflow-hidden rounded-[1.8cqw] border border-black/[0.06] bg-white shadow-float">
          <div className="grid grid-cols-[16%_1fr]">
            {/* Layers panel */}
            <div className="space-y-[1.6cqw] border-r border-black/[0.06] p-[2cqw]">
              {[70, 54, 62, 40, 58, 46].map((w, i) => (
                <span key={i} className="flex items-center gap-[1cqw]">
                  <span className="size-[1.4cqw] shrink-0 rounded-[0.3cqw] bg-black/10" />
                  <span className="h-[0.9cqw] rounded-full bg-black/10" style={{ width: `${w}%` }} />
                </span>
              ))}
            </div>
            {/* Canvas */}
            <div className="relative grid grid-cols-[1fr_1.15fr] gap-[2.4cqw] bg-[#f4f5f3] bg-[radial-gradient(rgb(0_0_0/0.08)_1px,transparent_1px)] bg-size-[2cqw_2cqw] p-[3cqw] pb-[7cqw]">
              <div className="space-y-[2.4cqw]">
                {/* Type specimen with selection */}
                <div className="relative rounded-[1.4cqw] bg-white p-[2.6cqw] outline-[0.25cqw] outline-secondary outline-solid">
                  {[
                    "-top-[0.7cqw] -left-[0.7cqw]",
                    "-top-[0.7cqw] -right-[0.7cqw]",
                    "-bottom-[0.7cqw] -left-[0.7cqw]",
                    "-right-[0.7cqw] -bottom-[0.7cqw]",
                  ].map((pos) => (
                    <span
                      key={pos}
                      className={`absolute ${pos} size-[1.4cqw] border-[0.25cqw] border-secondary bg-white`}
                    />
                  ))}
                  <p className="text-[1.5cqw] text-black/45">{t("typeLabel")}</p>
                  <p className="mt-[0.5cqw] text-[9cqw] leading-none font-semibold tracking-[-0.04em]">Aa</p>
                  <p className="mt-[1cqw] text-[1.6cqw] font-medium">Onest</p>
                </div>
                <div className="rounded-[1.4cqw] bg-white p-[2.6cqw]">
                  <p className="text-[1.5cqw] text-black/45">{t("colorsLabel")}</p>
                  <div className="mt-[1.6cqw] flex gap-[1cqw]">
                    {palette.map((c) => (
                      <span
                        key={c}
                        className="aspect-square flex-1 rounded-full ring-[0.2cqw] ring-black/5"
                        style={{ background: c }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-[2.4cqw]">
                <div className="rounded-[1.4cqw] bg-white p-[2.6cqw]">
                  <p className="text-[1.5cqw] text-black/45">{t("componentsLabel")}</p>
                  <div className="mt-[1.8cqw] flex items-center gap-[1.6cqw]">
                    <span className="rounded-full bg-primary px-[2.4cqw] py-[1cqw] text-[1.5cqw] font-medium text-white">
                      {t("button")}
                    </span>
                    <span className="flex h-[3cqw] w-[5.4cqw] items-center rounded-full bg-secondary p-[0.4cqw]">
                      <span className="ml-auto size-[2.2cqw] rounded-full bg-white" />
                    </span>
                  </div>
                  <div className="mt-[1.6cqw] rounded-[0.9cqw] border border-black/10 px-[1.6cqw] py-[1.1cqw] text-[1.45cqw] text-black/40">
                    {t("input")}
                  </div>
                </div>
                <div className="rounded-[1.4cqw] bg-white p-[2cqw]">
                  <p className="text-[1.4cqw] text-black/45">{t("frame")}</p>
                  <div className="mt-[1.2cqw] rounded-[1cqw] bg-[linear-gradient(120deg,#ddf4e6,#f1ece4)] p-[2cqw]">
                    <span className="block h-[1.2cqw] w-[60%] rounded-full bg-primary/70" />
                    <span className="mt-[1cqw] block h-[0.9cqw] w-[80%] rounded-full bg-black/10" />
                    <span className="mt-[1.6cqw] block h-[2cqw] w-[30%] rounded-full bg-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
