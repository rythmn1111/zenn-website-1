"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

const tableOfContentsData: TOCItem[] = [
  { id: "abstract", title: "Abstract", level: 1 },
  { id: "introduction", title: "I. Introduction", level: 1 },
  { id: "the-trust-problem", title: "I.A. The Trust Problem", level: 2 },
  { id: "why-verify", title: "I.B. Why \"Just Trust Us\" Fails", level: 2 },
  { id: "a-different-approach", title: "I.C. A Different Approach", level: 2 },
  { id: "section-ii", title: "II. Terminologies", level: 1 },
  { id: "secure-boot", title: "II.A. Secure Boot", level: 2 },
  { id: "flash-encryption", title: "II.B. Flash Encryption", level: 2 },
  { id: "efuse-burn", title: "II.C. eFuse Burn", level: 2 },
  { id: "section-iii", title: "III. Components Overview", level: 1 },
  { id: "hardware-arch", title: "III.A. Hardware Architecture", level: 2 },
  { id: "web-verification", title: "III.B. Web Verification Client", level: 2 },
  { id: "firmware-registry", title: "III.C. AO Firmware Registry", level: 2 },
  { id: "device-registry", title: "III.D. AO Device Registry", level: 2 },
  { id: "section-iv", title: "IV. Firmware Verification", level: 1 },
  { id: "starting-state", title: "IV.A. Starting Device State", level: 2 },
  { id: "verification-mechanism", title: "IV.B. Verification Mechanism", level: 2 },
  { id: "trust-minimized", title: "IV.C. Trust-Minimized Option", level: 2 },
  { id: "secure-boot-matters", title: "IV.D. Why Secure Boot Matters", level: 2 },
  { id: "section-v", title: "V. Device Registration", level: 1 },
  { id: "no-preinstall", title: "V.A. No Pre-Installed Identity", level: 2 },
  { id: "registration-challenge", title: "V.B. Registration Challenge", level: 2 },
  { id: "identity-creation", title: "V.C. Identity Creation", level: 2 },
  { id: "registration-proof", title: "V.D. Registration Proof", level: 2 },
  { id: "anti-replay", title: "V.E. Anti-Replay", level: 2 },
  { id: "section-vi", title: "VI. Locking the Device", level: 1 },
  { id: "locking-mechanism", title: "VI.A. Locking Mechanism", level: 2 },
  { id: "delayed-encryption", title: "VI.B. Delayed Encryption", level: 2 },
  { id: "section-vii", title: "VII. Operational Verification", level: 1 },
  { id: "fresh-challenge", title: "VII.A. Fresh Challenge-Response", level: 2 },
  { id: "replay-fail", title: "VII.B. Why Replay Fails", level: 2 },
  { id: "why-verifiable", title: "VII.C. Why This Is Verifiable", level: 2 },
  { id: "section-viii", title: "VIII. Build Your Own", level: 1 },
];

export default function TableOfContentsWallet() {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Set initial state based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -80% 0px",
        threshold: 0,
      }
    );

    tableOfContentsData.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSectionClick = (id: string) => {
    scrollToSection(id);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Toggle Button — bottom-right FAB on mobile, top-left on desktop */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed z-50 bg-[#0f1b33] border border-blue-400/30 rounded-lg p-2.5 md:p-2 hover:border-cyan-400/50 transition-all ${
          isMobile
            ? "bottom-6 right-4 shadow-lg shadow-black/40"
            : "left-4 top-24"
        }`}
        aria-label={isOpen ? "Close table of contents" : "Open table of contents"}
      >
        {isOpen ? (
          <ChevronLeft className="w-5 h-5 text-blue-200" />
        ) : (
          <ChevronRight className="w-5 h-5 text-blue-200" />
        )}
      </button>

      {/* Backdrop overlay — mobile only */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Table of Contents Panel */}
      <nav
        className={`fixed z-40 transition-transform duration-300 ease-in-out ${
          isMobile
            ? `bottom-0 left-0 right-0 ${isOpen ? "translate-y-0" : "translate-y-full"}`
            : `left-4 top-40 w-64 ${isOpen ? "translate-x-0" : "-translate-x-[280px]"}`
        }`}
      >
        <div className={`bg-[#0f1b33] border border-blue-400/30 p-4 overflow-y-auto ${
          isMobile
            ? "rounded-t-xl max-h-[70vh] border-b-0"
            : "rounded-lg max-h-[calc(100vh-12rem)]"
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-blue-200 uppercase tracking-wide">
              Table of Contents
            </h3>
            {isMobile && (
              <button
                onClick={() => setIsOpen(false)}
                className="text-blue-400/60 hover:text-blue-200 text-lg leading-none"
                aria-label="Close"
              >
                &times;
              </button>
            )}
          </div>
          <ul className="space-y-1">
            {tableOfContentsData.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleSectionClick(item.id)}
                  className={`
                    w-full text-left py-1.5 px-2 rounded transition-colors text-sm
                    ${item.level === 2 ? "pl-4" : ""}
                    ${
                      activeId === item.id
                        ? "bg-cyan-400/20 text-cyan-300 font-medium border-l-2 border-cyan-400"
                        : "text-blue-300/70 hover:bg-blue-400/10 hover:text-blue-100"
                    }
                  `}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
