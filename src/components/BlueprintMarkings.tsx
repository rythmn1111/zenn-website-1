import React from "react";

const MARK_COLOR = "rgba(103,232,249,0.12)";
const MARK_COLOR_STRONG = "rgba(103,232,249,0.18)";

function CrosshairMark({ x, y, size = 32 }: { x: string; y: string; size?: number }) {
  const r = size / 2;
  return (
    <svg
      className="absolute"
      style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
      width={size * 1.5}
      height={size * 1.5}
      viewBox={`0 0 ${size * 1.5} ${size * 1.5}`}
      fill="none"
    >
      <circle cx={size * 0.75} cy={size * 0.75} r={r} stroke={MARK_COLOR_STRONG} strokeWidth="0.75" />
      <circle cx={size * 0.75} cy={size * 0.75} r={r * 0.35} stroke={MARK_COLOR} strokeWidth="0.5" />
      <line x1={size * 0.75} y1={0} x2={size * 0.75} y2={size * 1.5} stroke={MARK_COLOR} strokeWidth="0.5" />
      <line x1={0} y1={size * 0.75} x2={size * 1.5} y2={size * 0.75} stroke={MARK_COLOR} strokeWidth="0.5" />
    </svg>
  );
}

function CornerBracket({ corner }: { corner: "tl" | "tr" | "bl" | "br" }) {
  const size = 40;
  const inset = "24px";

  const posStyle: React.CSSProperties = {
    position: "absolute",
    ...(corner.includes("t") ? { top: inset } : { bottom: inset }),
    ...(corner.includes("l") ? { left: inset } : { right: inset }),
  };

  const rotate =
    corner === "tl" ? 0 :
    corner === "tr" ? 90 :
    corner === "br" ? 180 :
    270;

  return (
    <svg
      style={posStyle}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
    >
      <g transform={`rotate(${rotate} ${size / 2} ${size / 2})`}>
        <line x1="0" y1="0" x2="0" y2={size} stroke={MARK_COLOR_STRONG} strokeWidth="1" />
        <line x1="0" y1="0" x2={size} y2="0" stroke={MARK_COLOR_STRONG} strokeWidth="1" />
        <line x1="0" y1={size * 0.3} x2={size * 0.15} y2={size * 0.3} stroke={MARK_COLOR} strokeWidth="0.5" />
        <line x1={size * 0.3} y1="0" x2={size * 0.3} y2={size * 0.15} stroke={MARK_COLOR} strokeWidth="0.5" />
      </g>
    </svg>
  );
}

function DimensionLine({ x, y, width, label }: { x: string; y: string; width: number; label: string }) {
  const h = 12;
  const arrowSize = 4;
  return (
    <svg
      className="absolute"
      style={{ left: x, top: y }}
      width={width}
      height={h * 2}
      viewBox={`0 0 ${width} ${h * 2}`}
      fill="none"
    >
      {/* Extension lines */}
      <line x1="0" y1="0" x2="0" y2={h * 2} stroke={MARK_COLOR} strokeWidth="0.5" />
      <line x1={width} y1="0" x2={width} y2={h * 2} stroke={MARK_COLOR} strokeWidth="0.5" />
      {/* Main line */}
      <line x1={arrowSize} y1={h} x2={width - arrowSize} y2={h} stroke={MARK_COLOR_STRONG} strokeWidth="0.75" />
      {/* Left arrow */}
      <polyline points={`${arrowSize},${h - 3} 0,${h} ${arrowSize},${h + 3}`} stroke={MARK_COLOR_STRONG} strokeWidth="0.75" fill="none" />
      {/* Right arrow */}
      <polyline points={`${width - arrowSize},${h - 3} ${width},${h} ${width - arrowSize},${h + 3}`} stroke={MARK_COLOR_STRONG} strokeWidth="0.75" fill="none" />
      {/* Label */}
      <text x={width / 2} y={h - 4} textAnchor="middle" fill={MARK_COLOR_STRONG} fontSize="7" fontFamily="monospace">
        {label}
      </text>
    </svg>
  );
}

function CompassRose({ x, y }: { x: string; y: string }) {
  const size = 48;
  const c = size / 2;
  const r = 16;
  return (
    <svg
      className="absolute"
      style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
    >
      <circle cx={c} cy={c} r={r} stroke={MARK_COLOR_STRONG} strokeWidth="0.75" />
      <circle cx={c} cy={c} r={r * 0.15} fill={MARK_COLOR_STRONG} />
      {/* N arrow */}
      <line x1={c} y1={c - r + 2} x2={c} y2={c - r - 4} stroke={MARK_COLOR_STRONG} strokeWidth="1" />
      <polygon points={`${c},${c - r - 7} ${c - 2.5},${c - r - 2} ${c + 2.5},${c - r - 2}`} fill={MARK_COLOR_STRONG} />
      {/* Cardinal ticks */}
      <line x1={c} y1={c + r - 2} x2={c} y2={c + r + 3} stroke={MARK_COLOR} strokeWidth="0.5" />
      <line x1={c - r + 2} y1={c} x2={c - r - 3} y2={c} stroke={MARK_COLOR} strokeWidth="0.5" />
      <line x1={c + r - 2} y1={c} x2={c + r + 3} y2={c} stroke={MARK_COLOR} strokeWidth="0.5" />
      {/* Labels */}
      <text x={c} y={c - r - 9} textAnchor="middle" fill={MARK_COLOR_STRONG} fontSize="6" fontFamily="monospace">N</text>
      <text x={c} y={c + r + 9} textAnchor="middle" fill={MARK_COLOR} fontSize="5" fontFamily="monospace">S</text>
      <text x={c - r - 6} y={c + 2} textAnchor="middle" fill={MARK_COLOR} fontSize="5" fontFamily="monospace">W</text>
      <text x={c + r + 6} y={c + 2} textAnchor="middle" fill={MARK_COLOR} fontSize="5" fontFamily="monospace">E</text>
    </svg>
  );
}

function ScaleBar({ x, y }: { x: string; y: string }) {
  const totalWidth = 120;
  const segmentCount = 5;
  const segWidth = totalWidth / segmentCount;
  const h = 6;
  return (
    <svg
      className="absolute"
      style={{ left: x, top: y, transform: "translateX(-50%)" }}
      width={totalWidth + 20}
      height={h + 20}
      viewBox={`0 0 ${totalWidth + 20} ${h + 20}`}
      fill="none"
    >
      {Array.from({ length: segmentCount }).map((_, i) => (
        <rect
          key={i}
          x={10 + i * segWidth}
          y={4}
          width={segWidth}
          height={h}
          fill={i % 2 === 0 ? MARK_COLOR_STRONG : "none"}
          stroke={MARK_COLOR_STRONG}
          strokeWidth="0.5"
        />
      ))}
      {/* Tick labels */}
      {Array.from({ length: segmentCount + 1 }).map((_, i) => (
        <text
          key={i}
          x={10 + i * segWidth}
          y={h + 14}
          textAnchor="middle"
          fill={MARK_COLOR}
          fontSize="5"
          fontFamily="monospace"
        >
          {i * 10}
        </text>
      ))}
      <text
        x={totalWidth + 16}
        y={h + 14}
        textAnchor="start"
        fill={MARK_COLOR}
        fontSize="5"
        fontFamily="monospace"
      >
        mm
      </text>
    </svg>
  );
}

function ArcMark({ x, y }: { x: string; y: string }) {
  const size = 56;
  const c = size / 2;
  const r = 20;
  return (
    <svg
      className="absolute"
      style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
    >
      {/* Main arc */}
      <path
        d={`M ${c + r * Math.cos(-Math.PI * 0.75)} ${c + r * Math.sin(-Math.PI * 0.75)} A ${r} ${r} 0 1 1 ${c + r * Math.cos(Math.PI * 0.1)} ${c + r * Math.sin(Math.PI * 0.1)}`}
        stroke={MARK_COLOR_STRONG}
        strokeWidth="0.75"
      />
      {/* Center dot */}
      <circle cx={c} cy={c} r="1.5" fill={MARK_COLOR_STRONG} />
      {/* Radius lines */}
      <line x1={c} y1={c} x2={c + r * Math.cos(-Math.PI * 0.75)} y2={c + r * Math.sin(-Math.PI * 0.75)} stroke={MARK_COLOR} strokeWidth="0.5" />
      <line x1={c} y1={c} x2={c + r * Math.cos(Math.PI * 0.1)} y2={c + r * Math.sin(Math.PI * 0.1)} stroke={MARK_COLOR} strokeWidth="0.5" />
      {/* Angle label */}
      <text x={c - 2} y={c - 6} fill={MARK_COLOR} fontSize="6" fontFamily="monospace">R{r}</text>
      {/* Small tick marks along arc */}
      {[0, 1, 2, 3].map((i) => {
        const angle = -Math.PI * 0.75 + (i / 3) * Math.PI * 1.6;
        const innerR = r - 2;
        const outerR = r + 2;
        return (
          <line
            key={i}
            x1={c + innerR * Math.cos(angle)}
            y1={c + innerR * Math.sin(angle)}
            x2={c + outerR * Math.cos(angle)}
            y2={c + outerR * Math.sin(angle)}
            stroke={MARK_COLOR}
            strokeWidth="0.5"
          />
        );
      })}
    </svg>
  );
}

function WalletSchematic() {
  const w = 380;
  const h = 560;
  const LINE = "rgba(255,255,255,0.22)";
  const LINE_BOLD = "rgba(255,255,255,0.30)";
  const DIM = "rgba(255,255,255,0.14)";

  // Main body
  const bx = 80; // body left x
  const by = 110; // body top y
  const bw = 200; // body width
  const bh = 320; // body height
  const depth = 10; // 3D depth offset
  const r = 8;

  // Top perforated panel
  const tph = 90; // top panel height

  // Handle (lanyard loop — left side)
  const hw = 44;
  const hh = 28;
  const hx = bx + 20;
  const hy = by - hh;
  const hThick = 6;

  // Sensor
  const sx = bx + bw / 2;
  const sy = by + tph + (bh - tph) * 0.38;
  const sOuterR = 22;

  // Grooves
  const gStartY = sy + 50;
  const gCount = 6;
  const gSpacing = 14;

  // Perf holes
  const holeCols = 10;
  const holeRows = 4;
  const holeR = 5.5;
  const holePadX = 16;
  const holePadY = 14;

  return (
    <svg
      className="absolute"
      style={{
        right: "3%",
        top: "50%",
        transform: "translateY(-50%)",
        opacity: 0.55,
      }}
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
    >
      {/* === TOP VIEW LABEL with arrow dimension line === */}
      <text x={bx + bw / 2} y={35} textAnchor="middle" fill={LINE} fontSize="11" fontFamily="monospace" fontWeight="bold">
        TOP VIEW
      </text>
      {/* Arrow line spanning body width */}
      <line x1={bx + 6} y1={45} x2={bx + bw - 6} y2={45} stroke={DIM} strokeWidth="1" />
      <polygon points={`${bx},45 ${bx + 8},42 ${bx + 8},48`} fill={DIM} />
      <polygon points={`${bx + bw},45 ${bx + bw - 8},42 ${bx + bw - 8},48`} fill={DIM} />

      {/* === 3D DEPTH EDGES (right side + bottom) === */}
      {/* Right depth edge */}
      <line x1={bx + bw} y1={by + r} x2={bx + bw + depth} y2={by + r - depth} stroke={LINE} strokeWidth="1" />
      <line x1={bx + bw + depth} y1={by + r - depth} x2={bx + bw + depth} y2={by + bh - depth} stroke={LINE} strokeWidth="1.5" />
      <line x1={bx + bw} y1={by + bh} x2={bx + bw + depth} y2={by + bh - depth} stroke={LINE} strokeWidth="1" />
      {/* Bottom depth edge */}
      <line x1={bx + r} y1={by + bh} x2={bx + r - depth * 0.3} y2={by + bh + depth * 0.7} stroke={LINE} strokeWidth="1" />
      <line x1={bx + r - depth * 0.3} y1={by + bh + depth * 0.7} x2={bx + bw + depth * 0.7} y2={by + bh + depth * 0.7} stroke={LINE} strokeWidth="1" />
      <line x1={bx + bw + depth * 0.7} y1={by + bh + depth * 0.7} x2={bx + bw + depth} y2={by + bh - depth} stroke={LINE} strokeWidth="1" />

      {/* === MAIN BODY OUTLINE === */}
      <rect x={bx} y={by} width={bw} height={bh} rx={r} ry={r} stroke={LINE_BOLD} strokeWidth="2" />

      {/* === TOP PANEL OUTLINE (overlaid, slightly inset look) === */}
      <rect x={bx} y={by} width={bw} height={tph} rx={r} ry={r} stroke={LINE_BOLD} strokeWidth="2" />
      {/* Panel separator — double line for thickness */}
      <line x1={bx} y1={by + tph} x2={bx + bw} y2={by + tph} stroke={LINE_BOLD} strokeWidth="2" />
      <line x1={bx + 4} y1={by + tph + 4} x2={bx + bw - 4} y2={by + tph + 4} stroke={LINE} strokeWidth="0.75" />

      {/* === PERFORATION HOLES === */}
      {Array.from({ length: holeRows }).map((_, row) =>
        Array.from({ length: holeCols }).map((_, col) => {
          const cx = bx + holePadX + col * ((bw - holePadX * 2) / (holeCols - 1));
          const cy = by + holePadY + row * ((tph - holePadY * 2) / (holeRows - 1));
          return (
            <circle
              key={`h-${row}-${col}`}
              cx={cx} cy={cy} r={holeR}
              stroke={LINE} strokeWidth="1.2"
            />
          );
        })
      )}

      {/* === HANDLE / LOOP === */}
      {/* Outer handle shape */}
      <path
        d={`M ${hx} ${hy + hh} L ${hx} ${hy + 8} Q ${hx} ${hy} ${hx + 8} ${hy} L ${hx + hw - 8} ${hy} Q ${hx + hw} ${hy} ${hx + hw} ${hy + 8} L ${hx + hw} ${hy + hh}`}
        stroke={LINE_BOLD} strokeWidth="2"
      />
      {/* Inner handle cutout */}
      <path
        d={`M ${hx + hThick} ${hy + hh} L ${hx + hThick} ${hy + hThick + 6} Q ${hx + hThick} ${hy + hThick} ${hx + hThick + 6} ${hy + hThick} L ${hx + hw - hThick - 6} ${hy + hThick} Q ${hx + hw - hThick} ${hy + hThick} ${hx + hw - hThick} ${hy + hThick + 6} L ${hx + hw - hThick} ${hy + hh}`}
        stroke={LINE} strokeWidth="1"
      />

      {/* === LINE ABOVE CAMERA === */}
      <line x1={bx + 8} y1={sy - 65} x2={bx + bw - 8} y2={sy - 65} stroke={LINE} strokeWidth="1.5" />

      {/* === SENSOR / CAMERA — concentric rings === */}
      {[sOuterR, sOuterR * 0.78, sOuterR * 0.58, sOuterR * 0.42, sOuterR * 0.28, sOuterR * 0.16].map((rad, i) => (
        <circle
          key={`sensor-${i}`}
          cx={sx} cy={sy} r={rad}
          stroke={i === 0 ? LINE_BOLD : LINE}
          strokeWidth={i === 0 ? "1.8" : i < 3 ? "1.2" : "0.8"}
        />
      ))}
      <circle cx={sx} cy={sy} r={2} fill={LINE} />

      {/* === SIDE HINGE CLIPS (left) — 3 clips, lower position === */}
      {[0.45, 0.60, 0.75].map((pct, i) => {
        const cy = by + tph + (bh - tph) * pct;
        const cw = 12;
        const ch = 20;
        return (
          <g key={`hinge-${i}`}>
            {/* Hinge base */}
            <rect
              x={bx - cw} y={cy - ch / 2}
              width={cw} height={ch}
              rx={3} ry={3}
              stroke={LINE} strokeWidth="1.2"
            />
            {/* Hinge pin circle */}
            <circle cx={bx - cw / 2} cy={cy} r={3} stroke={LINE} strokeWidth="0.8" />
            {/* Hinge pin dot */}
            <circle cx={bx - cw / 2} cy={cy} r={1} fill={LINE} />
            {/* Connection line to body */}
            <line x1={bx - 1} y1={cy - ch / 2 + 3} x2={bx - 1} y2={cy + ch / 2 - 3} stroke={LINE} strokeWidth="0.6" />
          </g>
        );
      })}

      {/* === HORIZONTAL GROOVES (bold, spaced) === */}
      {Array.from({ length: gCount }).map((_, i) => (
        <g key={`groove-${i}`}>
          <line
            x1={bx + 8} y1={gStartY + i * gSpacing}
            x2={bx + bw - 8} y2={gStartY + i * gSpacing}
            stroke={LINE} strokeWidth="1.5"
          />
          {/* Shadow line below each groove */}
          <line
            x1={bx + 8} y1={gStartY + i * gSpacing + 3}
            x2={bx + bw - 8} y2={gStartY + i * gSpacing + 3}
            stroke={LINE} strokeWidth="0.4"
          />
        </g>
      ))}

      {/* === CENTER LINES (dashed) === */}
      <line
        x1={sx} y1={by - 10} x2={sx} y2={by + bh + 10}
        stroke={DIM} strokeWidth="0.7"
        strokeDasharray="8 5"
      />
      <line
        x1={bx - 20} y1={sy} x2={bx + bw + 20} y2={sy}
        stroke={DIM} strokeWidth="0.7"
        strokeDasharray="8 5"
      />

      {/* === DIMENSION: Width (bottom) === */}
      <line x1={bx} y1={by + bh + 25} x2={bx} y2={by + bh + 40} stroke={DIM} strokeWidth="0.8" />
      <line x1={bx + bw} y1={by + bh + 25} x2={bx + bw} y2={by + bh + 40} stroke={DIM} strokeWidth="0.8" />
      <line x1={bx + 6} y1={by + bh + 33} x2={bx + bw - 6} y2={by + bh + 33} stroke={DIM} strokeWidth="0.8" />
      <polygon points={`${bx},${by + bh + 33} ${bx + 7},${by + bh + 30} ${bx + 7},${by + bh + 36}`} fill={DIM} />
      <polygon points={`${bx + bw},${by + bh + 33} ${bx + bw - 7},${by + bh + 30} ${bx + bw - 7},${by + bh + 36}`} fill={DIM} />
      <text x={bx + bw / 2} y={by + bh + 30} textAnchor="middle" fill={LINE} fontSize="10" fontFamily="monospace">
        50mm
      </text>

      {/* === DIMENSION: Height (left) === */}
      <line x1={bx - 30} y1={by} x2={bx - 20} y2={by} stroke={DIM} strokeWidth="0.8" />
      <line x1={bx - 30} y1={by + bh} x2={bx - 20} y2={by + bh} stroke={DIM} strokeWidth="0.8" />
      <line x1={bx - 25} y1={by + 6} x2={bx - 25} y2={by + bh - 6} stroke={DIM} strokeWidth="0.8" />
      <polygon points={`${bx - 25},${by} ${bx - 28},${by + 7} ${bx - 22},${by + 7}`} fill={DIM} />
      <polygon points={`${bx - 25},${by + bh} ${bx - 28},${by + bh - 7} ${bx - 22},${by + bh - 7}`} fill={DIM} />
      <text
        x={bx - 32}
        y={by + bh / 2 + 4}
        fill={LINE} fontSize="10" fontFamily="monospace"
        transform={`rotate(-90 ${bx - 32} ${by + bh / 2 + 4})`}
        textAnchor="middle"
      >
        85mm
      </text>

      {/* === SIDE VIEW label (bottom left) === */}
      <text x={bx - 18} y={by + bh + 50} fill={LINE} fontSize="9" fontFamily="monospace">
        SIDE VIEW →
      </text>

      {/* === PART NUMBER === */}
      <text x={bx + bw / 2} y={by + bh + 55} textAnchor="middle" fill={DIM} fontSize="8" fontFamily="monospace">
        VW-001 REV A
      </text>
    </svg>
  );
}

function TitleBlock() {
  return (
    <svg
      className="absolute bottom-6 right-6"
      width="180"
      height="72"
      viewBox="0 0 180 72"
      fill="none"
    >
      <rect x="0.5" y="0.5" width="179" height="71" stroke={MARK_COLOR_STRONG} strokeWidth="1" />
      <line x1="0" y1="18" x2="180" y2="18" stroke={MARK_COLOR} strokeWidth="0.5" />
      <line x1="0" y1="36" x2="180" y2="36" stroke={MARK_COLOR} strokeWidth="0.5" />
      <line x1="0" y1="54" x2="180" y2="54" stroke={MARK_COLOR} strokeWidth="0.5" />
      <line x1="60" y1="0" x2="60" y2="72" stroke={MARK_COLOR} strokeWidth="0.5" />
      <text x="4" y="12" fill={MARK_COLOR} fontSize="6" fontFamily="monospace">PROJECT</text>
      <text x="64" y="12" fill={MARK_COLOR_STRONG} fontSize="6" fontFamily="monospace">VERIFIABLE WALLET</text>
      <text x="4" y="30" fill={MARK_COLOR} fontSize="6" fontFamily="monospace">SCALE</text>
      <text x="64" y="30" fill={MARK_COLOR_STRONG} fontSize="6" fontFamily="monospace">1:1</text>
      <text x="4" y="48" fill={MARK_COLOR} fontSize="6" fontFamily="monospace">SHEET</text>
      <text x="64" y="48" fill={MARK_COLOR_STRONG} fontSize="6" fontFamily="monospace">1 OF 1</text>
      <text x="4" y="66" fill={MARK_COLOR} fontSize="6" fontFamily="monospace">REV</text>
      <text x="64" y="66" fill={MARK_COLOR_STRONG} fontSize="6" fontFamily="monospace">DRAFT 1.0</text>
    </svg>
  );
}

export default function BlueprintMarkings() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Corner brackets — always visible */}
      <CornerBracket corner="tl" />
      <CornerBracket corner="tr" />
      <CornerBracket corner="bl" />
      <CornerBracket corner="br" />

      {/* Crosshair marks — all screens */}
      <CrosshairMark x="50%" y="24px" />
      <CrosshairMark x="50%" y="calc(100% - 24px)" />
      <CrosshairMark x="24px" y="50%" />
      <CrosshairMark x="calc(100% - 24px)" y="50%" />

      {/* Compass rose — all screens, repositioned on mobile */}
      {/* Mobile: top-right, small */}
      <div className="block md:hidden opacity-70">
        <CompassRose x="calc(100% - 50px)" y="60px" />
      </div>
      {/* Desktop: lower left */}
      <div className="hidden md:block">
        <CompassRose x="80px" y="calc(100% - 120px)" />
      </div>

      {/* Arc mark — tablet+ */}
      <div className="hidden md:block">
        <ArcMark x="calc(100% - 100px)" y="180px" />
      </div>

      {/* Scale bar — all screens */}
      <ScaleBar x="50%" y="calc(100% - 40px)" />

      {/* Dimension line — all screens */}
      <DimensionLine x="calc(50% - 60px)" y="60px" width={120} label="SEC. A" />

      {/* Title block — all screens */}
      <TitleBlock />

      {/* Hardware wallet schematic — desktop only (too large for mobile) */}
      <div className="hidden lg:block">
        <WalletSchematic />
      </div>
    </div>
  );
}
