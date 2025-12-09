import React from "react";

export default function FireRingButton({
  text = "View all plates",
  onClick,
  color = "green", // "green" | "blue"
  className = "",
}) {
  const colorVars =
    color === "blue"
      ? {
          btnFrom: "#3b82f6",
          btnTo: "#2563eb",
          focus: "#60a5fa",
        }
      : {
          btnFrom: "#10b981",
          btnTo: "#059669",
          focus: "#34d399",
        };

  const handleClick = (e) => {
    if (typeof onClick === "function") onClick(e);
  };

  return (
    <div className={className}>
      <style>{`
        /* Shimmer */
        @keyframes shimmer {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(120%); }
        }
        /* Twinkle pop */
        @keyframes star-pop {
          0% { transform: translateY(6px) scale(0.6); opacity: 0; }
          35% { opacity: 1; }
          100% { transform: translateY(-6px) scale(1); opacity: 0; }
        }
        .shine:hover { opacity: 1; }
        .twinkles { position: absolute; inset: -6px; pointer-events: none; }
        .twinkle {
          position: absolute; width: 8px; height: 8px; border-radius: 9999px;
          background: radial-gradient(circle, #fff 0%, rgba(255,255,255,.7) 55%, transparent 70%);
          animation: star-pop 1.6s ease-in-out infinite;
          filter: drop-shadow(0 0 6px rgba(255,255,255,.7));
        }
        .t1 { left: 12%; top: 12%; animation-delay: .1s; }
        .t2 { left: 28%; top: -6%; animation-delay: .35s; }
        .t3 { right: 18%; top: 10%; animation-delay: .55s; }
        .t4 { right: 6%; top: -10%; animation-delay: .8s; }
        .t5 { left: 6%; bottom: -10%; animation-delay: 1.05s; }
        .t6 { right: 28%; bottom: -8%; animation-delay: 1.3s; }

        @media (prefers-reduced-motion: reduce) {
          .shine-layer { animation: none !important; opacity: .2 !important; }
          .twinkle { animation: none !important; opacity: .4 !important; }
        }
      `}</style>

      <div className="relative inline-block">
        {/* Twinkling stars around button (subtle) */}
        <span className="twinkles">
          <span className="twinkle t1" />
          <span className="twinkle t2" />
          <span className="twinkle t3" />
          <span className="twinkle t4" />
          <span className="twinkle t5" />
          <span className="twinkle t6" />
        </span>

        <button
          onClick={handleClick}
          className="btn-root relative overflow-hidden inline-flex items-center justify-center px-8 py-3 rounded-full text-white font-semibold shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus:outline-none"
          style={{
            background: `linear-gradient(90deg, ${colorVars.btnFrom}, ${colorVars.btnTo})`,
            boxShadow: `0 8px 24px rgba(0,0,0,.15)`,
          }}
        >
          <span className="relative z-10">{text}</span>
          {/* Shine sweep */}
          <span
            aria-hidden
            className="shine-layer pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)",
              transform: "translateX(-120%)",
              animation: "shimmer 1.6s infinite",
              opacity: 0,
            }}
          />
        </button>
      </div>
    </div>
  );
}
