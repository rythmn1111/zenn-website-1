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
  { id: "terminologies", title: "Terminologies", level: 1 },
  { id: "introduction", title: "I. Introduction", level: 1 },
  { id: "threat-model", title: "Threat Model", level: 1 },
  { id: "core-architecture", title: "II. Core Architecture", level: 1 },
  { id: "proof-of-identity", title: "II.A. Proof of Identity", level: 2 },
  { id: "proof-of-execution", title: "II.B. Proof of Execution", level: 2 },
  { id: "proof-of-freshness", title: "II.C. Proof of Freshness", level: 2 },
  { id: "proof-of-origin", title: "II.D. Proof of Origin", level: 2 },
  { id: "sealing", title: "III. Sealing the Device", level: 1 },
  { id: "protecting-from-owner", title: "III.A. Protecting From Owner", level: 2 },
  { id: "sealing-model", title: "III.B. Sealing Model", level: 2 },
  { id: "modified-pi-os", title: "III.C. Modified Pi OS", level: 2 },
  { id: "sandbox-environment", title: "III.D. Sandbox Environment", level: 2 },
  { id: "reflashing-security", title: "III.E. Reflashing Security", level: 2 },
  { id: "putting-it-together", title: "IV. Putting It Together", level: 1 },
  { id: "four-anchors", title: "IV.A. Four Anchors", level: 2 },
  { id: "sealed-lifecycle", title: "IV.B. Sealed Lifecycle", level: 2 },
  { id: "end-to-end-flow", title: "IV.C. End-to-End Flow", level: 2 },
];

export default function TableOfContents() {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Set initial state based on screen size
  useEffect(() => {
    const handleResize = () => {
      // Open by default on tablet/desktop (md and above), closed on mobile
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    // Set initial state
    handleResize();

    // Listen for window resize
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

    // Observe all sections
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
      const yOffset = -80; // Offset for fixed header if any
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Toggle Button - Always visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-24 z-50 bg-white border border-gray-200 rounded-lg p-2 shadow-md hover:shadow-lg transition-all"
        aria-label={isOpen ? "Close table of contents" : "Open table of contents"}
      >
        {isOpen ? (
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-700" />
        )}
      </button>

      {/* Table of Contents Panel */}
      <nav
        className={`fixed left-4 top-40 w-64 z-40 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-[280px]"
        }`}
      >
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-lg max-h-[calc(100vh-12rem)] overflow-y-auto">
          <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">
            Table of Contents
          </h3>
          <ul className="space-y-1">
            {tableOfContentsData.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    w-full text-left py-1.5 px-2 rounded transition-colors text-sm
                    ${item.level === 2 ? "pl-4" : ""}
                    ${
                      activeId === item.id
                        ? "bg-gray-900 text-white font-medium"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
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
