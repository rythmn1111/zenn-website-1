"use client";

import React, { useState, useEffect } from "react";

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
    <nav className="fixed left-8 top-32 w-64 hidden xl:block">
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm max-h-[calc(100vh-10rem)] overflow-y-auto">
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
  );
}
