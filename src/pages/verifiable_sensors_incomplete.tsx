import React, { useRef, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { Manrope } from "next/font/google";
import { Star } from "lucide-react";
import ProofOfExecutionFlow from "@/components/ProofOfExecutionFlow";
import ProofOfDeviceIdentityFlow from "@/components/ProofOfDeviceIdentityFlow";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function CustomAudioPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
    } else {
      // Force load metadata before playing
      if (!isLoaded) {
        audio.load();
      }
      audio.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;
    console.log("Metadata loaded, duration:", audio.duration);
    if (!isNaN(audio.duration) && audio.duration > 0) {
      setDuration(audio.duration);
      setIsLoaded(true);
    }
  };

  const handleCanPlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    console.log("Can play, duration:", audio.duration);
    if (!isNaN(audio.duration) && audio.duration > 0 && duration === 0) {
      setDuration(audio.duration);
      setIsLoaded(true);
    }
  };

  const handleLoadedData = () => {
    const audio = audioRef.current;
    if (!audio) return;
    console.log("Data loaded, duration:", audio.duration);
    if (!isNaN(audio.duration) && audio.duration > 0) {
      setDuration(audio.duration);
      setIsLoaded(true);
    }
  };

  // Force load metadata on component mount
  React.useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.load();
      // Also try to get duration directly
      if (!isNaN(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
        setIsLoaded(true);
      }
    }
  }, [src]);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const audio = audioRef.current;
    if (!audio || !isLoaded) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percent = clickX / width;
    const newTime = percent * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="w-full max-w-2xl bg-gray-100 flex items-center px-4 py-3 gap-3 overflow-hidden">
      <button
        onClick={togglePlay}
        className="flex-shrink-0 w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-full transition-colors focus:outline-none"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="2" y="1" width="3" height="12" rx="0.5" fill="#4B5563"/>
            <rect x="9" y="1" width="3" height="12" rx="0.5" fill="#4B5563"/>
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 1.5V12.5L12 7L3 1.5Z" fill="#4B5563"/>
          </svg>
        )}
      </button>
      
      <span className="text-base text-gray-500 font-mono flex-shrink-0 font-semibold">
        {formatTime(currentTime)}
      </span>
      
      <span className="text-base text-gray-400 flex-shrink-0 font-semibold">/</span>
      
      <span className="text-base text-gray-500 font-mono flex-shrink-0 font-semibold">
        {formatTime(duration)}
      </span>
      
      <div
        className="flex-1 min-w-0 h-1 bg-gray-300 cursor-pointer relative ml-2"
        onClick={handleProgressClick}
      >
        <div
          className="h-1 bg-gray-700 absolute top-0 left-0 max-w-full"
          style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
        />
      </div>
      
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onCanPlay={handleCanPlay}
        onLoadedData={handleLoadedData}
        onDurationChange={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />
    </div>
  );
}

export default function VerifiableSensors() {
  return (
    <>
      <Head>
        <title>Verifiable Sensors - HyperBEAM Anchored Trustless IoT</title>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%238B4513'/></svg>" />
      </Head>
      <div className={manrope.className + " min-h-screen bg-white"}>
        <div className="max-w-4xl mx-auto px-8 py-16">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <Image src="./logo.png" alt="Logo" width={48} height={48} />
          </div>
          
          {/* Title Page */}
          <div className="text-center mb-16 pb-16 border-b-2 border-gray-300">
            <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              HyperBEAM Anchored Verifiable Sensors: A True Trustless IoT Architecture
            </h1>
            <p className="text-xl text-gray-600 mb-2">A Technical White Paper</p>
            <p className="text-lg text-gray-500">Author: Rythmn Magnani</p>
            <p className="text-sm text-gray-400 mt-8">Draft 1.0</p>
          </div>

          {/* Audio Player - Subtle placement */}
          <div className="mb-4 flex flex-col items-center">
            <CustomAudioPlayer src="./audio2.mp3" />
            <p className="text-sm text-gray-500 mt-2">[play this while reading]</p>
          </div>

          {/* Abstract */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Abstract</h2>
            <div className="bg-gray-50 border-l-4 border-gray-400 pl-6 py-4 mb-6">
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                Modern IoT devices continuously generate data that is used in critical decision making, yet today&apos;s systems offer no cryptographically sound guarantee that such data genuinely originates from the claimed hardware, was produced by the intended software, or was captured at the asserted moment in time. This paper introduces a novel end-to-end attestation framework that establishes Proof of Origin for sensor and camera outputs on resource-constrained devices such as the Raspberry Pi Zero 2 W. Our architecture combines secure elements(cryptographic co-processors, ATECC608A), trusted execution challenges, on-chain anchoring, raw sensor commitments, and code path hashing to construct a verifiable chain of custody for every data point.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                At the core of our system is a simple but powerful assurance:
              </p>
              <p className="text-gray-700 leading-relaxed text-lg mb-4 italic pl-4 border-l-2 border-gray-300">
                &quot;I am confident this result truly came from this exact device, running this exact code, at this exact moment, and was not fabricated, manipulated, or replayed.&quot;
              </p>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                We achieve this guarantee by binding five independently verifiable anchors, device identity, execution integrity, sensor-level raw data commitments, temporal freshness, and immutable public anchoring, into a single cryptographic attestation package. Raw sensor bytes are hashed at the moment of capture, processed outputs are deterministically derived and hashed, and a secure element signs both together with a decentralized TEE-issued challenge that is simultaneously committed on-chain with Merkle proofs. This ensures that each measurement or image is not only tamper evident but cryptographically tied to a real world physical event.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                The result is a lightweight but robust primitive for verifiable reality, enabling trustworthy sensing, authenticated imaging, and tamper-proof data provenance across consumer grade hardware. This whitepaper formalizes the design, threat model, and verification pipeline, demonstrating how verifiable IoT becomes practical without full TEEs on edge devices.
              </p>
            </div>
          </section>

          {/* Terminologies */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Terminologies to Know Before Starting the Paper</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  <span className="font-bold mr-2">a.</span> Secure Element (SE)
                </h3>
                <p className="text-lg text-gray-700 mb-4 ml-6">
                  A Secure Element is a tamper-resistant hardware chip designed to store cryptographic secrets safely.
                </p>
                <p className="text-lg font-semibold text-gray-800 mb-2 ml-6">Key properties:</p>
                <ul className="list-disc list-inside space-y-2 ml-10 text-lg text-gray-700">
                  <li>Generates private keys internally and never reveals them</li>
                  <li>Performs signing operations inside the chip</li>
                  <li>Protects against physical extraction and software compromise</li>
                  <li>Acts as a hardware root-of-trust for the device</li>
                </ul>
                <p className="text-lg text-gray-700 mt-4 italic ml-6">
                  When we say &quot;device signature&quot;, we mean a signature produced inside the secure element.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  <span className="font-bold mr-2">b.</span> Merkle Trees & Merkle Proofs
                </h3>
                <p className="text-lg text-gray-700 mb-4 ml-6">
                  A Merkle tree is a data structure used to efficiently prove that a piece of data exists inside a larger dataset without storing the entire dataset.
                </p>
                <p className="text-lg text-gray-700 mb-2 ml-6">
                  In this paper, Merkle proofs allow verifiers to check:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-10 text-lg text-gray-700">
                  <li>That the challenge they received was actually recorded in the TEE&apos;s public log</li>
                  <li>Without downloading the entire log</li>
                </ul>
                <p className="text-lg text-gray-700 mt-4 ml-6">
                  This is essential for scalable verification.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  <span className="font-bold mr-2">c.</span> Trusted Execution Environment (TEE)
                </h3>
                <p className="text-lg text-gray-700 ml-6">
                  A Trusted Execution Environment (TEE) is a secure, hardware-isolated region inside a specialised processor designed to run code and handle sensitive data in complete isolation from the main operating system. It ensures that even if the OS is compromised, the code executing inside the TEE and the data it processes remain confidential, unaltered, and verifiable. TEEs can also generate cryptographic attestations proving what code ran, on which hardware, and that the execution was genuine and untampered.
                </p>
              </div>
            </div>
          </section>

          {/* Introduction */}
          <section id="introduction" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">I. Introduction</h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="mb-4 text-lg">
                Modern connected devices continuously observe, measure, and interpret the physical world. IoT sensors capture weather conditions, environmental metrics, acceleration patterns, motion trajectories, biometric signals, and images, all of which increasingly feed into automation systems, machine learning pipelines, compliance audits, and real world decision making. Yet despite their growing influence, the overwhelming majority of IoT measurements are not verifiable. They can be fabricated, replayed, modified, or injected at any point in the pipeline, and current systems provide no cryptographic mechanism to prove that a measurement truly originated from a particular device, running a particular program, at a particular moment in time.
              </p>
              <p className="mb-4 text-lg">
                This fundamental absence of trust is what our system addresses. We introduce a generalized and lightweight framework for creating Proof of Origin on everyday hardware such as the Raspberry Pi Zero 2 W, supported by low cost secure elements and a decentralized HyperBEAM attestation engine. The goal is to make sensor outputs verifiable, tamper-evident, and cryptographically anchored to physical reality without requiring specialized processors or heavy Trusted Execution Environments on the edge device.
              </p>
            </div>
          </section>

          {/* Threat Model Overview */}
          <section id="threat-model" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Threat Model Overview</h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="mb-4 text-lg">
                To design Proof of Origin correctly, we explicitly consider the following threats:
              </p>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Attacker Model</h3>
              <p className="mb-4 text-lg">
                We assume an adversary who may have:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-6 ml-4 text-lg">
                <li>full software control of the device</li>
                <li>root access to the OS</li>
                <li>ability to run arbitrary user code</li>
                <li>ability to load files, inject values, or replay data</li>
                <li>network control for man-in-the-middle attacks</li>
                <li>ability to tamper with sensors or feed synthetic inputs</li>
                <li>ability to intercept communications to and from the TEE</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">What We Protect Against</h3>
              <ul className="list-disc list-inside space-y-2 mb-6 ml-4 text-lg">
                <li>Fake measurements loaded from storage</li>
                <li>Synthetic sensor data forged in software</li>
                <li>Precomputed outputs submitted as &quot;new&quot;</li>
                <li>Replay of old valid sensor readings</li>
                <li>Code manipulation producing fraudulent values</li>
                <li>Device impersonation / identity theft</li>
                <li>Challenge manipulation or timestamp forgery</li>
                <li>Cloud-side injection or hijacking</li>
                <li>Man-in-the-middle tampering on challenge flow</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">What We Do Not Protect Against</h3>
              <p className="mb-2 text-lg italic text-gray-600">(standard honest-hardware assumptions)</p>
              <ul className="list-disc list-inside space-y-2 mb-6 ml-4 text-lg">
                <li>Physical destruction of the secure element</li>
                <li>Hardware replacement with malicious clones</li>
                <li>Sensor bypass via physical spoofing (e.g., shining fake light on a camera) unless paired with optical/electrical protections</li>
                <li>Side-channel attacks requiring lab-grade equipment</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Goal</h3>
              <p className="mb-4 text-lg">
                Under this threat model, our objective is to ensure that:
              </p>
              <div className="bg-gray-50 border-l-4 border-gray-400 pl-6 py-4 mb-6">
                <p className="text-lg font-semibold text-gray-800">
                  If a sensor reading is accepted as valid, it must have come from a real physical event, captured honestly, after a real challenge, on a real device, using authorized code.
                </p>
              </div>
              <p className="mb-4 text-lg">
                This formalizes the security boundary for the rest of the paper.
              </p>
            </div>
          </section>

          {/* Core Architecture */}
          <section id="core-architecture" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">II. Core Architecture</h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="mb-4 text-lg">
                To understand the core architecture, we must anchor ourselves to a single defining question: what does it truly mean for a sensor to be verifiable? In our framework, &quot;verifiable&quot; is captured entirely by one foundational assurance:
              </p>
              <div className="bg-gray-50 border-l-4 border-gray-400 pl-6 py-4 mb-6">
                <p className="text-lg font-semibold text-gray-800 italic">
                  &quot;I am confident this result really came from this exact device, running this exact code, at this exact moment, and was not faked or replayed.&quot;
                </p>
              </div>
              <p className="mb-4 text-lg">
                If we can rigorously defend every part of this statement device, code, time, and authenticity, then we have constructed a genuinely verifiable sensor architecture. Each component of the system exists for the sole purpose of upholding one of these guarantees.
              </p>
              <p className="mb-4 text-lg">
                With this in mind, we now begin by examining the first requirement.
              </p>

              <div className="my-12">
                <h4 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                  Proof of Device Identity Flow Diagram
                </h4>
                <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
                  <ProofOfDeviceIdentityFlow />
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8 flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                II.C. How Do I Know It Was Captured at This Exact Moment?
              </h3>
              <p className="text-lg text-gray-600 mb-4 italic">(Establishing Proof of Freshness)</p>
              
              <p className="mb-4 text-lg">
                Even if we know which device produced the data (Section 1) and which code produced the data (Section 2), there is still a critical question:
              </p>
              
              <div className="bg-gray-50 border-l-4 border-gray-400 pl-6 py-4 mb-6">
                <p className="text-lg font-semibold text-gray-800 italic">
                  &quot;How do I know this sensor reading wasn&apos;t captured earlier and replayed now?&quot;
                </p>
              </div>
              
              <p className="mb-4 text-lg">
                This is the <strong>freshness problem</strong> - proving that the measurement or image was produced after a specific moment in public history, and not pre-computed or reused from the past.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
