"use client";

import React, { useEffect, useRef, useState } from "react";

const CX = 280;
const CY = 280;
const R = 170;

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function pointOnCircle(angleDeg: number) {
  const rad = toRad(angleDeg - 90); // -90 so 0° = top
  return {
    x: CX + R * Math.cos(rad),
    y: CY + R * Math.sin(rad),
  };
}

const NODES = [
  {
    angle: 0,
    label: ["Click Through", "Rate"],
    color: "#7C3AED",
    glowColor: "rgba(124,58,237,0.35)",
    icon: "📈",
    labelOffsetY: -52,
    textAnchor: "middle" as const,
  },
  {
    angle: 72,
    label: ["Platform", "Management"],
    color: "#DC2626",
    glowColor: "rgba(220,38,38,0.35)",
    icon: "⚙️",
    labelOffsetX: 52,
    textAnchor: "start" as const,
  },
  {
    angle: 144,
    label: ["Brand Content", "& Optimization"],
    color: "#16A34A",
    glowColor: "rgba(22,163,74,0.35)",
    icon: "✨",
    labelOffsetY: 52,
    textAnchor: "middle" as const,
  },
  {
    angle: 216,
    label: ["Search Engine", "Optimization"],
    color: "#0369A1",
    glowColor: "rgba(3,105,161,0.35)",
    icon: "🔍",
    labelOffsetY: 52,
    textAnchor: "middle" as const,
  },
  {
    angle: 288,
    label: ["Paid", "Advertising"],
    color: "#D97706",
    glowColor: "rgba(217,119,6,0.35)",
    icon: "💰",
    labelOffsetX: -52,
    textAnchor: "end" as const,
  },
];

const ARC_LENGTH = Math.round((2 * Math.PI * R * 72) / 360) + 10;

function arcPath(startAngle: number, endAngle: number) {
  const start = pointOnCircle(startAngle);
  const end = pointOnCircle(endAngle);
  return `M${start.x.toFixed(2)},${start.y.toFixed(2)} A${R},${R} 0 0,1 ${end.x.toFixed(2)},${end.y.toFixed(2)}`;
}

export default function DigitalSolutionsCircle() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const points = NODES.map((n) => pointOnCircle(n.angle));

  const arcDelay = (i: number) => `${i * 0.45}s`;
  const nodeDelay = (i: number) => `${i * 0.45 + 0.5}s`;
  const centerDelay = `${NODES.length * 0.45 + 0.4}s`;

  return (
    <div ref={ref} className="flex items-center justify-center w-full py-4">
      <style>{`
        ${NODES.map((_, i) => `
          @keyframes drawArc${i} {
            from { stroke-dashoffset: ${ARC_LENGTH}; opacity: 0.3; }
            to   { stroke-dashoffset: 0; opacity: 1; }
          }
          .dsc-arc-${i} {
            stroke-dasharray: ${ARC_LENGTH};
            stroke-dashoffset: ${ARC_LENGTH};
            opacity: 0;
          }
          .dsc-visible .dsc-arc-${i} {
            animation: drawArc${i} 0.65s cubic-bezier(.4,0,.2,1) ${arcDelay(i)} forwards;
          }

          @keyframes nodePop${i} {
            0%   { opacity: 0; transform: scale(0.4); }
            70%  { opacity: 1; transform: scale(1.15); }
            100% { opacity: 1; transform: scale(1); }
          }
          .dsc-node-${i} {
            opacity: 0;
            transform-box: fill-box;
            transform-origin: center;
          }
          .dsc-visible .dsc-node-${i} {
            animation: nodePop${i} 0.4s cubic-bezier(.34,1.56,.64,1) ${nodeDelay(i)} forwards;
          }
        `).join("")}

        @keyframes dscFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .dsc-center {
          opacity: 0;
        }
        .dsc-visible .dsc-center {
          animation: dscFadeIn 0.6s ease-out ${centerDelay} forwards;
        }

        @keyframes dscOrbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .dsc-orbit {
          transform-origin: ${CX}px ${CY}px;
          animation: dscOrbit 40s linear infinite;
        }

        @keyframes dscPulse {
          0%, 100% { r: 12; opacity: 0.5; }
          50%       { r: 18; opacity: 0.15; }
        }
      `}</style>

      <svg
        viewBox="0 0 560 560"
        className={`w-full max-w-[340px] sm:max-w-[420px] md:max-w-[500px] lg:max-w-[540px] drop-shadow-sm ${visible ? "dsc-visible" : ""}`}
        aria-label="End-to-End Digital Solutions circular diagram"
        role="img"
      >
        {/* Background glow ring */}
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="currentColor" strokeWidth="1" className="opacity-5" />

        {/* Dashed orbit ring (slow spin) */}
        <circle
          cx={CX} cy={CY} r={R}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="5 8"
          className="dsc-orbit opacity-[0.12]"
        />

        {/* Colored arc segments */}
        {NODES.map((node, i) => {
          const nextNode = NODES[(i + 1) % NODES.length];
          const endAngle = i === NODES.length - 1
            ? nextNode.angle + 360
            : nextNode.angle;
          const safeEnd = endAngle > 360 ? endAngle - 360 : nextNode.angle;
          return (
            <path
              key={`arc-${i}`}
              className={`dsc-arc-${i}`}
              d={arcPath(node.angle, safeEnd)}
              fill="none"
              stroke={node.color}
              strokeWidth="3"
              strokeLinecap="round"
            />
          );
        })}

        {/* Node glows + circles + icons + labels */}
        {NODES.map((node, i) => {
          const p = points[i];
          const lx = p.x + (node.labelOffsetX ?? 0);
          const ly = p.y + (node.labelOffsetY ?? 0);

          return (
            <g key={`node-${i}`} className={`dsc-node-${i}`}>
              {/* Soft glow behind node */}
              <circle cx={p.x} cy={p.y} r={30} fill={node.glowColor} className="blur-[2px]" />

              {/* Outer ring accent */}
              <circle cx={p.x} cy={p.y} r={26} fill="none" stroke={node.color} strokeWidth="1.5" strokeDasharray="4 3" opacity={0.6} />

              {/* Main circle */}
              <circle cx={p.x} cy={p.y} r={20} fill={node.color} />

              {/* Icon (emoji rendered as foreign object for full color) */}
              <foreignObject
                x={p.x - 12}
                y={p.y - 12}
                width={24}
                height={24}
                style={{ overflow: "visible", pointerEvents: "none" }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    lineHeight: 1,
                  }}
                >
                  {node.icon}
                </div>
              </foreignObject>

              {/* Label lines */}
              {node.label.map((line, li) => (
                <text
                  key={li}
                  x={lx}
                  y={ly + li * 16}
                  textAnchor={node.textAnchor}
                  fontSize={11.5}
                  fontWeight={700}
                  fill={node.color}
                  fontFamily="inherit"
                  letterSpacing="0.01em"
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}

        {/* Center content */}
        <g className="dsc-center">
          {/* Center background circle */}
          <circle cx={CX} cy={CY} r={90} fill="currentColor" className="opacity-5" />
          <circle cx={CX} cy={CY} r={88} fill="none" stroke="currentColor" strokeWidth="1" className="opacity-10" />

          <text x={CX} y={CY - 28} textAnchor="middle" fontSize={15} fontWeight={800} fill="currentColor" fontFamily="inherit" className="opacity-90">
            End-to-End
          </text>
          <text x={CX} y={CY - 8} textAnchor="middle" fontSize={15} fontWeight={800} fill="currentColor" fontFamily="inherit" className="opacity-90">
            Digital
          </text>
          <text x={CX} y={CY + 12} textAnchor="middle" fontSize={15} fontWeight={800} fill="currentColor" fontFamily="inherit" className="opacity-90">
            Solutions
          </text>

          {/* Divider */}
          <line x1={CX - 40} y1={CY + 24} x2={CX + 40} y2={CY + 24} stroke="currentColor" strokeWidth="0.8" className="opacity-20" />

          <text x={CX} y={CY + 40} textAnchor="middle" fontSize={10} fontWeight={600} fill="#EAB308" fontFamily="inherit" letterSpacing="0.05em">
            ALPHADIGIFY
          </text>
        </g>
      </svg>
    </div>
  );
}
