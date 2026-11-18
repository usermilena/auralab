"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { HeroAura } from "./HeroAura";

/**
 * Hero aura: a slow, soft mesh gradient rendered with a tiny WebGL shader.
 * Four pastel light sources drift on long, unhurried orbits (a full cycle
 * takes minutes), blend into each other, and fade out at organic edges with a
 * touch of film grain. It follows the site theme, leans very slightly towards
 * the pointer, pauses off-screen, renders a single still frame for
 * reduced-motion users and falls back to the CSS aura without WebGL.
 */

const VERTEX = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAGMENT = `
precision highp float;

uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPointer;   // 0..1, y down
uniform vec2 uCenter;    // 0..1, y down
uniform float uRadius;   // relative to the shorter side
uniform vec3 uBg;
uniform vec3 uC1;
uniform vec3 uC2;
uniform vec3 uC3;
uniform vec3 uC4;
uniform float uStrength;

vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

float blob(vec2 p, vec2 c, float size) {
  vec2 d = p - c;
  return exp(-dot(d, d) / (size * size));
}

void main() {
  vec2 frag = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
  float minSide = min(uRes.x, uRes.y);
  vec2 uv = frag / minSide;
  vec2 center = uCenter * uRes / minSide;
  vec2 pointer = uPointer * uRes / minSide;
  center += (pointer - center) * 0.025;

  vec2 p = (uv - center) / uRadius;
  float t = uTime * 0.045;

  // Gentle, low-frequency warp keeps the edges organic.
  vec2 warp = vec2(snoise(p * 0.7 + vec2(t * 0.6, 0.0)), snoise(p * 0.7 + vec2(3.1, -t * 0.5)));
  vec2 q = p + warp * 0.16;

  vec2 o1 = vec2(cos(t * 0.9), sin(t * 1.1)) * 0.30 + vec2(-0.12, -0.10);
  vec2 o2 = vec2(cos(t * 0.7 + 2.1), sin(t * 0.8 + 1.0)) * 0.34 + vec2(0.18, 0.05);
  vec2 o3 = vec2(cos(t * 0.6 + 4.2), sin(t * 0.95 + 3.3)) * 0.28 + vec2(-0.05, 0.22);
  vec2 o4 = vec2(cos(t * 0.8 + 5.5), sin(t * 0.65 + 2.4)) * 0.32 + vec2(0.10, -0.22);

  float w1 = blob(q, o1, 0.46);
  float w2 = blob(q, o2, 0.42);
  float w3 = blob(q, o3, 0.40);
  float w4 = blob(q, o4, 0.36);
  float sum = w1 + w2 + w3 + w4 + 1e-4;

  vec3 col = (uC1 * w1 + uC2 * w2 + uC3 * w3 + uC4 * w4) / sum;

  // Soft sheen sweeping across very slowly.
  float sheen = smoothstep(0.35, 0.0, abs(dot(q, normalize(vec2(1.0, -0.6))) - sin(t * 0.7) * 0.35));
  col = mix(col, vec3(1.0), sheen * 0.12 * uStrength);

  float alpha = (1.0 - exp(-sum * 1.7)) * (1.0 - smoothstep(0.55, 1.15, length(q)));
  vec3 outCol = mix(uBg, col, clamp(alpha * uStrength, 0.0, 1.0));
  outCol += (hash(frag + fract(uTime * 0.37)) - 0.5) * (4.0 / 255.0);

  gl_FragColor = vec4(outCol, 1.0);
}
`;

type Rgb = [number, number, number];
type Palette = { bg: Rgb; colors: [Rgb, Rgb, Rgb, Rgb]; strength: number };

const hex = (value: string): Rgb => {
  const n = parseInt(value.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

// Iridescent pastels: periwinkle, lilac, sea-glass and peach.
const palettes: Record<"light" | "dark", Palette> = {
  light: {
    bg: hex("#e9e5dd"),
    // Dusty, warmer versions so the aura sits on the linen background.
    colors: [hex("#c3c8e8"), hex("#d9c9e0"), hex("#c6ddd2"), hex("#efd2bf")],
    strength: 0.8,
  },
  dark: {
    bg: hex("#0e0f0f"),
    colors: [hex("#3a4aa8"), hex("#6a3f9e"), hex("#1f6a62"), hex("#a0563f")],
    strength: 0.7,
  },
};

type Layout = { center: [number, number]; radius: number };

function layoutFor(width: number, height: number): Layout {
  if (width < 640) return { center: [0.9, 0.12], radius: 0.95 };
  if (width < 1024) return { center: [0.82, 0.3], radius: 0.85 };
  return { center: [0.76, 0.42], radius: Math.min(0.95, (height / width) * 1.4 + 0.25) };
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

const currentTheme = () =>
  document.documentElement.dataset.theme === "dark" ? "dark" : "light";

export function HeroShader({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    const vs = gl && compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fs = gl && compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    const program = gl?.createProgram();
    if (!gl || !vs || !fs || !program) {
      setFailed(true);
      return;
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setFailed(true);
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(program, name);
    const uRes = u("uRes");
    const uTime = u("uTime");
    const uPointer = u("uPointer");
    const uCenter = u("uCenter");
    const uRadius = u("uRadius");
    const uBg = u("uBg");
    const uColors = [u("uC1"), u("uC2"), u("uC3"), u("uC4")];
    const uStrength = u("uStrength");

    const applyPalette = () => {
      const palette = palettes[currentTheme()];
      gl.uniform3fv(uBg, palette.bg);
      palette.colors.forEach((c, i) => gl.uniform3fv(uColors[i], c));
      gl.uniform1f(uStrength, palette.strength);
    };
    applyPalette();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let layout = layoutFor(1, 1);
    const pointer = { x: 0.76, y: 0.42, tx: 0.76, ty: 0.42 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      // The field is very soft, so a reduced internal resolution is visually lossless.
      const scale = Math.min(window.devicePixelRatio || 1, 1.5) * 0.5;
      canvas.width = Math.max(1, Math.round(rect.width * scale));
      canvas.height = Math.max(1, Math.round(rect.height * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
      layout = layoutFor(rect.width, rect.height);
      pointer.x = pointer.tx = layout.center[0];
      pointer.y = pointer.ty = layout.center[1];
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      pointer.tx = (event.clientX - rect.left) / rect.width;
      pointer.ty = (event.clientY - rect.top) / rect.height;
    };

    const timeOffset = Math.random() * 200;
    const start = performance.now();
    let frame = 0;
    let running = false;
    let visible = true;
    let firstFrame = true;

    const draw = (now: number) => {
      pointer.x += (pointer.tx - pointer.x) * 0.02;
      pointer.y += (pointer.ty - pointer.y) * 0.02;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, timeOffset + (now - start) / 1000);
      gl.uniform2f(uPointer, pointer.x, pointer.y);
      gl.uniform2f(uCenter, layout.center[0], layout.center[1]);
      gl.uniform1f(uRadius, layout.radius);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (firstFrame) {
        firstFrame = false;
        setReady(true);
      }
    };

    const loop = (now: number) => {
      draw(now);
      frame = requestAnimationFrame(loop);
    };

    const sync = () => {
      const shouldRun = visible && !document.hidden && !reducedMotion;
      if (shouldRun && !running) {
        running = true;
        frame = requestAnimationFrame(loop);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(frame);
      }
    };

    resize();
    draw(performance.now());

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (!running) draw(performance.now());
    });
    resizeObserver.observe(canvas);

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    intersection.observe(canvas);

    const themeObserver = new MutationObserver(() => {
      applyPalette();
      if (!running) draw(performance.now());
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    document.addEventListener("visibilitychange", sync);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    sync();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("pointermove", onPointerMove);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <div aria-hidden="true" className={cn("pointer-events-none select-none", className)}>
      {failed ? (
        <HeroAura className="absolute -top-[6rem] -right-[14rem] size-[30rem] sm:-right-[12rem] sm:size-[40rem] lg:-right-[4rem] lg:size-[50rem]" />
      ) : (
        <canvas
          ref={canvasRef}
          className={cn(
            "size-full transition-opacity duration-[2000ms] ease-out",
            ready ? "opacity-100" : "opacity-0",
          )}
        />
      )}
    </div>
  );
}
