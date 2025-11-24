import React, { useRef, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { Manrope } from "next/font/google";
import ProofOfExecutionFlow from "@/components/ProofOfExecutionFlow";
import ProofOfDeviceIdentityFlow from "@/components/ProofOfDeviceIdentityFlow";
import ProofOfFreshnessFlow from "@/components/ProofOfFreshnessFlow";
import ProofOfFreshnessConceptualFlow from "@/components/ProofOfFreshnessConceptualFlow";

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
          <p className="text-lg text-gray-500">Author: Rythmn Magnani(Hope)</p>
          <p className="text-lg text-gray-500">In support by: Greg Albritton | Longview Labs</p>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-6">II. Core Architecture for Verifiable Anchoring</h2>
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

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              II.A. How Do I Know This Result Came From This Exact Device?
            </h3>
            <p className="text-lg text-gray-600 mb-4 italic">(Establishing Proof of Identity)</p>
            
            <div className="my-12">
              <h4 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                Proof of Device Identity Flow Diagram
              </h4>
              <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
                <ProofOfDeviceIdentityFlow />
              </div>
            </div>
            
            <p className="mb-4 text-lg">
              A verifiable sensor system must first prove who produced the data.
            </p>
            <p className="mb-4 text-lg font-semibold">
              If the identity of the device cannot be trusted, every downstream guarantee collapses.
            </p>
            <p className="mb-4 text-lg">
              In a world where IoT devices are cheap, cloneable, and frequently compromised, we require a mechanism that binds data to a specific physical unit, not just a software instance.
            </p>
            <p className="mb-4 text-lg">
              Our architecture achieves this through three pillars:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-4 text-lg">
              <li>A secure element containing a hardware-protected private key</li>
              <li>A public key registered and recognized as that device&apos;s identity</li>
              <li>Cryptographic signatures that only the true device can produce</li>
            </ul>
            <p className="mb-4 text-lg">
              Let us break this down.
            </p>

            <h4 className="text-xl font-semibold text-gray-800 mb-4 mt-8">
              II.A.1. Secure Element Chips: The Hardware Root-of-Identity
            </h4>
            
            <p className="mb-4 text-lg">
              At the foundation of our identity model is a dedicated <strong>secure element chip</strong>, the same class of hardware primitives used in high-security environments such as Ledger hardware wallets, YubiKeys, and bank-grade smart cards. Secure element chips are custom-designed to safeguard cryptographic secrets even against advanced physical attacks, firmware tampering, or OS-level compromise.
            </p>
            
            <p className="mb-4 text-lg">
              In our implementation, the device (e.g., Raspberry Pi Zero 2 W) uses:
            </p>
            
            <div className="bg-gray-50 border-l-4 border-gray-400 pl-6 py-4 mb-6">
              <p className="text-lg font-semibold text-gray-800">
                SparkFun Cryptographic Co-Processor Breakout - ATECC608A (Qwiic)
              </p>
            </div>
            
            <p className="mb-4 text-lg">
              This module exposes the <strong>Microchip ATECC608A CryptoAuthentication™ Secure Element</strong> through the Qwiic I²C interface, making it easy and stable to integrate with small edge devices. Importantly, this is the same secure element family used in devices like Ledger Nano S/X, which collectively protect billions of dollars in cryptocurrency.
            </p>
            <p className="mb-4 text-lg">
              By adopting the same hardware primitive, our IoT system inherits that level of identity assurance.
            </p>
            
            <div className="my-8 flex justify-center">
              <Image src="./secure_element.webp" alt="Secure Element Chip" width={400} height={600} className="rounded-lg shadow-md" />
            </div>
            
            <p className="mb-4 text-lg font-semibold">
              Key properties of secure element chips (including the ATECC608A):
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-4 text-lg">
              <li>The private key is generated inside the chip, never in software</li>
              <li>The private key never leaves the chip-not even the CPU can read it</li>
              <li>All signing operations occur internally in protected hardware logic</li>
              <li>Physically extracting the key is infeasible due to tamper-resistant circuitry</li>
              <li>Glitching, probing, fault-injection, and side-channel attacks are mitigated at the silicon level</li>
              <li>Each chip is unique and resistant to cloning or duplication</li>
              <li>The chip provides <strong>true hardware-backed root-of-trust</strong></li>
            </ul>
            
            <p className="mb-4 text-lg">
              This aligns directly with how Ledger wallets claim:
            </p>
            <div className="bg-gray-50 border-l-4 border-gray-400 pl-6 py-4 mb-6">
              <p className="text-lg font-semibold text-gray-800 italic">
                &quot;Only this exact physical device can sign using this private key.&quot;
              </p>
            </div>
            
            <p className="mb-4 text-lg">
              We now repurpose this exact security model to claim:
            </p>
            <div className="bg-gray-50 border-l-4 border-gray-400 pl-6 py-4 mb-6">
              <p className="text-lg font-semibold text-gray-800 italic">
                &quot;Only this exact physical IoT device can produce a valid attestation for a sensor reading.&quot;
              </p>
            </div>
            
            <p className="mb-4 text-lg">
              This makes it impossible for:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-4 text-lg">
              <li>a cloned device,</li>
              <li>a virtual machine,</li>
              <li>a software emulator,</li>
              <li>a dumped SD card, or</li>
              <li>a modified Pi</li>
            </ul>
            <p className="mb-4 text-lg">
              to impersonate the real hardware.
            </p>
            
            <p className="mb-4 text-lg">
              Only the genuine <strong>SparkFun ATECC608A secure element chip</strong> can produce valid signatures linked to its internal private key.
            </p>
            
            <p className="mb-4 text-lg font-semibold">
              With this component in place, we achieve <strong>Proof of Device Identity</strong>, the foundational anchor that every other guarantee in the system builds upon.
            </p>

            <h4 className="text-xl font-semibold text-gray-800 mb-4 mt-8">
              II.A.2. Device Keypair Generation
            </h4>
            
            <p className="mb-4 text-lg">
              When the device is first provisioned:
            </p>
            
            <div className="my-6 bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <pre className="text-sm text-white font-mono whitespace-pre">
{`+------------------------------------------------------+
| Secure Element (ATECC608A)       
+-------------------------------------------------------+
| Generates keypair:                                
|                                                              
|   PRIV_DEV  (never leaves)       
|   PUB_DEV   (exported)           
+-------------------------------------------------------+`}
              </pre>
            </div>
            
            <p className="mb-4 text-lg">
              The public key (<strong>PUB_DEV</strong>) becomes the globally recognized identity of this device.
            </p>
            
            <p className="mb-4 text-lg">
              We now have:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-4 text-lg">
              <li>a private key sealed inside hardware</li>
              <li>a public key anyone can use to verify signatures</li>
            </ul>
            
            <p className="mb-4 text-lg">
              This is <strong>cryptographic identity at the hardware level</strong>.
            </p>

            <h4 className="text-xl font-semibold text-gray-800 mb-4 mt-8">
              II.A.3. Public Key Registration (Arweave + HyperBEAM Anchoring)
            </h4>
            
            <p className="mb-4 text-lg">
              For a verifier to trust any device, its cryptographic identity must be publicly known, immutable, and tamper-proof.
            </p>
            
            <p className="mb-4 text-lg">
              We accomplish this using the <strong>Arweave ecosystem</strong>, specifically an Arweave wallet controlled by the device owner and <strong>HyperBEAM&apos;s message based compute layer</strong> for anchoring identity records permanently.
            </p>
            
            <p className="mb-4 text-lg">
              During onboarding, the secure element chip generates its internal keypair:
            </p>
            
            <div className="my-6 bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <pre className="text-sm text-white font-mono whitespace-pre">
{`PRIV_DEV  (sealed inside ATECC608A)
PUB_DEV   (exported)`}
              </pre>
            </div>
            
            <p className="mb-4 text-lg">
              The device owner uses their <strong>Arweave wallet</strong> to sign and publish an identity record to the Arweave network via a <strong>HyperBEAM ~process@1.0 device</strong>.
            </p>
            
            <p className="mb-4 text-lg">
              This record is structured as a cryptographically signed message containing:
            </p>
            
            <div className="my-6 bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <pre className="text-sm text-white font-mono whitespace-pre">
{`Device_ID := {
    pubkey: PUB_DEV,
    metadata: { model, batch, sensor_type, device_label },
    owner_wallet: <Arweave wallet address>,
    timestamp: <block timestamp>
}`}
              </pre>
            </div>
            
            <p className="mb-4 text-lg">
              This record is stored permanently on <strong>Arweave</strong> through <strong>HyperBEAM</strong> and becomes part of the verifiable public state of the system.
            </p>
            
            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              Why This Matters
            </h5>
            
            <p className="mb-4 text-lg">
              Because <strong>Arweave</strong> provides permanent, immutable storage and <strong>HyperBEAM</strong> provides verifiable computation through cryptographic HashPaths, a verifier can always reconstruct the chain of trust.
            </p>
            
            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              Why Identity Cannot Be Faked
            </h5>
            
            <p className="mb-4 text-lg">
              To impersonate the real hardware, an attacker would need:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-4 text-lg">
              <li>The private key sealed inside the genuine <strong>ATECC608A</strong></li>
              <li>The original <strong>Arweave wallet signature</strong> used during onboarding</li>
              <li>The ability to forge <strong>HTTP Message Signatures</strong> that HyperBEAM validates via <strong>dev_codec_httpsig</strong></li>
              <li>The ability to overwrite immutable <strong>Arweave records</strong> (impossible)</li>
              <li>The ability to alter <strong>HashPath merkle trees</strong> retroactively (cryptographically infeasible)</li>
            </ul>
            
            <p className="mb-4 text-lg font-semibold">
              Because none of these things are achievable, device identity becomes <strong>provably unforgeable</strong>. And true Device Identity is established.
            </p>

            <hr className="my-12 border-t-2 border-gray-300" />

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              II.B. How Do I Know It Was Produced by This Exact Code?
            </h3>
            <p className="text-lg text-gray-600 mb-4 italic">(Establishing Proof of Execution)</p>
            
            <p className="mb-4 text-lg">
              Proving the identity of the device is not enough. Even a genuine, hardware-authentic sensor could be running malicious code, tampered scripts, injected binaries, or synthetic replay logic.
            </p>
            
            <p className="mb-4 text-lg">
              A truly verifiable sensing architecture must prove that the result was produced by the exact program the developer intended, nothing more, nothing less.
            </p>
            
            <p className="mb-4 text-lg font-semibold">
              This requirement gives rise to <strong>Proof of Execution</strong>.
            </p>
            
            <p className="mb-4 text-lg">
              Our architecture enforces this through five mechanisms:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-4 text-lg">
              <li><strong>Code hashing</strong></li>
              <li><strong>Trusted Sensor Execution Library (TSEL)</strong></li>
              <li><strong>RAW bound to code logic</strong> (explained in later section)</li>
              <li><strong>Challenge obtained from HyperBEAM Device</strong> (explained in later section)</li>
              <li><strong>Secure element signing</strong> of the entire computation chain</li>
            </ul>
            
            <p className="mb-4 text-lg">
              Together, they create an execution flow that cannot be forged, replayed, or faked.
            </p>

            <div className="my-12">
              <h4 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                Proof of Execution Flow Diagram
              </h4>
              <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
                <ProofOfExecutionFlow />
              </div>
            </div>

            <h4 className="text-xl font-semibold text-gray-800 mb-4 mt-8">
              II.B.1. Code Hashing: Freezing the Intended Logic
            </h4>
            
            <p className="mb-4 text-lg">
              Before any reading happens, our trusted library computes a cryptographic hash of the user&apos;s code:
            </p>
            
            <div className="my-6 bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <pre className="text-sm text-white font-mono whitespace-pre">
{`code_hash = SHA256(user_program)`}
              </pre>
            </div>
            
            <p className="mb-4 text-lg">
              This hash acts as a <strong>fingerprint of the program&apos;s logic</strong>.
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-4 text-lg">
              <li>Change one line → new hash</li>
              <li>Change one character → new hash</li>
              <li>Remove a sensor call → new hash</li>
              <li>Inject malicious logic → new hash</li>
            </ul>
            
            <p className="mb-4 text-lg">
              This makes the code path immutable, because the later attestation signature includes this hash.
            </p>
            <p className="mb-4 text-lg font-semibold">
              If the code was altered after hashing, the attestation becomes invalid.
            </p>

            <h4 className="text-xl font-semibold text-gray-800 mb-4 mt-8">
              II.B.2. Trusted Sensor Execution Library (TSEL)
            </h4>
            <p className="text-lg text-gray-600 mb-4 italic">(Execution Guard + Cryptographic Packager)</p>
            
            <p className="mb-4 text-lg">
              To prevent runtime tampering, the user&apos;s program does not interact with sensors directly.
            </p>
            <p className="mb-4 text-lg">
              Instead, it runs inside the <strong>Trusted Sensor Execution Library (TSEL)</strong> - a minimal, hardened execution environment responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-4 text-lg">
              <li>capturing <strong>RAW sensor bytes</strong></li>
              <li>preventing file-based or synthetic injection</li>
              <li>computing <strong>RAW hashes</strong> and <strong>output hashes</strong></li>
              <li>batching results</li>
              <li>requesting challenges</li>
              <li>invoking the secure element</li>
              <li>assembling the final attestation packet</li>
            </ul>
            
            <p className="mb-4 text-lg font-semibold">
              TSEL ensures that:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-4 text-lg">
              <li>data comes only from real sensor hardware</li>
              <li><strong>RAW</strong> cannot be modified or replaced</li>
              <li>output cannot be injected from memory or disk</li>
              <li>the code path remains deterministic</li>
              <li>no attacker can bypass the attestation process</li>
            </ul>
            
            <p className="mb-4 text-lg">
              This library is the enforcement point that binds <strong>code → sensor → secure element</strong> into a single, tamper-evident pipeline.
            </p>

            <h4 className="text-xl font-semibold text-gray-800 mb-4 mt-8">
              II.B.3. Developer-Level API: TSEL_result()
            </h4>
            
            <p className="mb-4 text-lg">
              Developers interact with TSEL through a single API call that marks the moment they want to publish results:
            </p>
            
            <p className="mb-4 text-lg font-semibold">
              Example Pseudo-Code
            </p>
            
            <div className="my-6 bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <pre className="text-sm text-white font-mono whitespace-pre">
{`import TSEL

do_something()
speed = read_speed_sensor()
do_something_else()

TSEL_result(speed, batch_size=10)`}
              </pre>
            </div>
            
            <p className="mb-4 text-lg font-semibold">
              When the developer calls <strong>TSEL_result()</strong>, TSEL takes full control.
            </p>

            <h4 className="text-xl font-semibold text-gray-800 mb-4 mt-8">
              II.B.4. TSEL&apos;s Internal Packaging Process
            </h4>
            
            <p className="mb-4 text-lg">
              When <strong>TSEL_result()</strong> is invoked:
            </p>
            
            <p className="mb-4 text-lg font-semibold">
              1. Batch handling
            </p>
            <p className="mb-4 text-lg ml-4">
              If batching is enabled, TSEL collects multiple readings (e.g., 10) before producing an attestation.
            </p>
            
            <p className="mb-4 text-lg font-semibold">
              2. RAW capture
            </p>
            <p className="mb-4 text-lg ml-4">
              TSEL pulls <strong>RAW bytes</strong> directly from the sensor hardware (camera, IMU, speed sensor, etc.).
            </p>
            
            <p className="mb-4 text-lg font-semibold">
              3. Hash generation
            </p>
            <div className="my-6 bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <pre className="text-sm text-white font-mono whitespace-pre">
{`raw_hash  = SHA256(RAW)
data_hash = SHA256(processed_output)`}
              </pre>
            </div>
            
            <p className="mb-4 text-lg font-semibold">
              4. TSEL constructs the attestation packet
            </p>
            <div className="my-6 bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <pre className="text-sm text-white font-mono whitespace-pre">
{`attestation_packet = {
    code_hash,
    raw_hash,
    data_hash,
    data,
    challenge,
    timestamp
}`}
              </pre>
            </div>
            
            <p className="mb-4 text-lg font-semibold">
              5. Secure Element signing
            </p>
            <p className="mb-4 text-lg ml-4">
              This packet is passed into the <strong>ATECC608A secure element chip</strong>:
            </p>
            <div className="my-6 bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <pre className="text-sm text-white font-mono whitespace-pre">
{`SIG_DEV = SIGN(PRIV_DEV,
               code_hash +
               raw_hash +
               data_hash +
               challenge +
               timestamp)`}
              </pre>
            </div>
            <p className="mb-4 text-lg ml-4">
              No attacker can forge this signature without physical access to the secure element.
            </p>
            
            <p className="mb-4 text-lg font-semibold">
              6. Output returned
            </p>
            <div className="my-6 bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <pre className="text-sm text-white font-mono whitespace-pre">
{`{
  pubkey: PUB_DEV,
  code_hash,
  raw_hash,
  data_hash,
  data,
  challenge,
  timestamp,
  signature: SIG_DEV
}`}
              </pre>
            </div>
            
            <p className="mb-4 text-lg font-semibold">
              This becomes the <strong>verifiable truth artifact</strong>.
            </p>

            <h4 className="text-xl font-semibold text-gray-800 mb-4 mt-8">
              II.B.5. Batch Processing and Buffer Integrity
            </h4>
            <p className="text-lg text-gray-600 mb-4 italic">(Ensuring completeness, ordering, and integrity across multiple results)</p>
            
            <p className="mb-4 text-lg">
              Many sensing applications produce values continuously (e.g., IMU readings, speed samples, temperature streams). Emitting a full attestation for every single reading would be inefficient and unnecessary.
            </p>
            
            <p className="mb-4 text-lg">
              To address this, <strong>TSEL</strong> implements a secure batching mechanism that preserves integrity while significantly reducing overhead.
            </p>
            
            <p className="mb-4 text-lg font-semibold">
              Batching is designed around three guarantees:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-4 text-lg">
              <li><strong>Integrity:</strong> Every reading is hashed and stored along with its RAW counterpart.</li>
              <li><strong>Completeness:</strong> No reading can be omitted or injected.</li>
              <li><strong>Ordering:</strong> Readings remain in the exact temporal sequence in which they were produced.</li>
            </ul>

            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              II.B.5.1. Example Workflow: 10-Sample Speed Batch
            </h5>
            
            <p className="mb-4 text-lg">
              Assume a program produces 10 speed readings:
            </p>
            <div className="my-6 bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <pre className="text-sm text-white font-mono whitespace-pre">
{`31.2, 29.8, 30.1, 28.9, ..., 34.5`}
              </pre>
            </div>
            
            <p className="mb-4 text-lg">
              For each reading, <strong>TSEL</strong>:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-4 text-lg">
              <li>captures <strong>RAW bytes</strong> directly from the sensor</li>
              <li>computes <code className="text-gray-700 bg-gray-100 px-1 rounded">raw_hash = SHA256(raw)</code></li>
              <li>computes <code className="text-gray-700 bg-gray-100 px-1 rounded">data_hash = SHA256(processed_value)</code></li>
              <li>appends this to the internal batch buffer</li>
            </ul>
            
            <p className="mb-4 text-lg">
              This buffer persists inside <strong>TSEL</strong> until it reaches the configured batch size.
            </p>

            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              II.B.5.2. TSEL Internal Buffering Logic
            </h5>
            
            <p className="mb-4 text-lg">
              Here is a simplified representation of how batching works:
            </p>
            
            <div className="my-6 bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <pre className="text-sm text-white font-mono whitespace-pre">
{`batch_buffer = []
batch_size = 10

def TSEL_result(data):
    raw = sensor.read_raw()
    raw_hash  = SHA256(raw)
    data_hash = SHA256(serialize(data))
    
    batch_buffer.append({
        "raw": raw,
        "raw_hash": raw_hash,
        "data": data,
        "data_hash": data_hash
    })
    
    if len(batch_buffer) == batch_size:
        produce_attestation(batch_buffer)
        batch_buffer.clear()`}
              </pre>
            </div>
            
            <p className="mb-4 text-lg font-semibold">
              This ensures:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-4 text-lg">
              <li>no result leaves unprotected</li>
              <li>all results are captured in correct order</li>
              <li>the developer cannot bypass the buffer</li>
              <li>attackers cannot insert fake readings</li>
            </ul>

            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              II.B.5.3. Batch Hash Construction
            </h5>
            
            <p className="mb-4 text-lg">
              Once the buffer reaches full capacity, <strong>TSEL</strong> derives a <strong>batch_hash</strong>:
            </p>
            
            <div className="my-6 bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <pre className="text-sm text-white font-mono whitespace-pre">
{`batch_hash = SHA256(
    raw_hash_1  || data_hash_1  ||
    raw_hash_2  || data_hash_2  ||
    ...
    raw_hash_N  || data_hash_N
)`}
              </pre>
            </div>
            
            <p className="mb-4 text-lg">
              This acts as a <strong>Merkle-like integrity guarantee</strong> without computational overhead.
            </p>
            
            <p className="mb-4 text-lg">
              A verifier can:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-4 text-lg">
              <li>recompute the batch hash</li>
              <li>validate each reading</li>
              <li>confirm ordering and completeness</li>
              <li>detect missing or manipulated samples</li>
            </ul>

            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              II.B.5.4. Attestation Packet Structure for Batches
            </h5>
            
            <p className="mb-4 text-lg">
              When ready, <strong>TSEL</strong> constructs an attestation packet containing:
            </p>
            
            <div className="my-6 bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <pre className="text-sm text-white font-mono whitespace-pre">
{`attestation_packet = {
    code_hash,
    batch_hash,
    readings: [
        {
         raw_hash,
         data_hash,
         data
        },
        ...
    ],
    challenge,
    timestamp
}`}
              </pre>
            </div>
            
            <p className="mb-4 text-lg">
              <strong>RAW bytes</strong> are not included (to preserve privacy and reduce size) - only their hashes.
            </p>

            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              II.B.5.5. Secure Element Signing
            </h5>
            
            <p className="mb-4 text-lg">
              The entire batch is sealed via the <strong>ATECC608A secure element</strong>:
            </p>
            
            <div className="my-6 bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <pre className="text-sm text-white font-mono whitespace-pre">
{`SIG_DEV = SIGN(PRIV_DEV,
               code_hash +
               batch_hash +
               challenge +
               timestamp)`}
              </pre>
            </div>
            
            <p className="mb-4 text-lg">
              This signature cryptographically binds:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-4 text-lg">
              <li>the device</li>
              <li>the exact code</li>
              <li>the full ordered batch</li>
              <li>the TEE challenge</li>
              <li>the time of capture</li>
            </ul>
            <p className="mb-4 text-lg font-semibold">
              into one atomic statement.
            </p>

            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              II.B.5.6. How Developers Use Batching
            </h5>
            
            <p className="mb-4 text-lg">
              From the developer&apos;s perspective, batching is optional and controlled through a simple API. By default, <strong>TSEL_result()</strong> behaves in single-result mode (batch size = 1), meaning each call produces its own attestation.
            </p>
            
            <p className="mb-4 text-lg">
              To enable batching, the developer can either:
            </p>
            
            <p className="mb-4 text-lg font-semibold">
              Option A - Configure once at startup
            </p>
            <div className="my-6 bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <pre className="text-sm text-white font-mono whitespace-pre">
{`import TSEL

# Configure TSEL to batch 10 readings per attestation
TSEL.configure(batch_size=10)

while True:
    speed = read_speed_sensor()
    TSEL_result(speed)     # uses the configured batch_size internally`}
              </pre>
            </div>
            
            <p className="mb-4 text-lg font-semibold">
              Option B - Specify per-call (explicit batching)
            </p>
            <div className="my-6 bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <pre className="text-sm text-white font-mono whitespace-pre">
{`import TSEL

while True:
    speed = read_speed_sensor()
    TSEL_result(speed, batch_size=10)`}
              </pre>
            </div>
            
            <p className="mb-4 text-lg font-semibold">
              In both cases:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-4 text-lg">
              <li><strong>TSEL</strong> collects readings in an internal buffer.</li>
              <li>When the buffer reaches <code className="text-gray-700 bg-gray-100 px-1 rounded">batch_size</code> entries, it:</li>
              <ul className="list-disc list-inside space-y-2 ml-8 text-lg">
                <li>computes all <code className="text-gray-700 bg-gray-100 px-1 rounded">raw_hash_i</code> and <code className="text-gray-700 bg-gray-100 px-1 rounded">data_hash_i</code></li>
                <li>derives a <strong>batch_hash</strong></li>
                <li>builds the attestation packet</li>
                <li>calls the secure element to sign</li>
                <li>returns a single signed attestation covering the entire batch</li>
              </ul>
            </ul>
            
            <p className="mb-4 text-lg">
              If <code className="text-gray-700 bg-gray-100 px-1 rounded">batch_size = 1</code>, <strong>TSEL</strong> effectively disables batching and emits one attestation per reading, preserving the same trust guarantees with higher granularity.
            </p>
            
            <p className="mb-4 text-lg">
              This makes batching:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-4 text-lg">
              <li>opt-in</li>
              <li>explicit in code</li>
              <li>simple to reason about</li>
              <li>and fully aligned with the <strong>Proof of Execution</strong> model.</li>
            </ul>

            <hr className="my-12 border-t-2 border-gray-300" />

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              II.C. How Do I Know It Was Captured at This Exact Moment?
            </h3>
            <p className="text-lg text-gray-600 mb-4 italic">(Establishing Proof of Freshness)</p>
            
            <p className="mb-4 text-lg">
              Even if we know which device produced the data (Section II.A) and which code produced the data (Section II.B), there is still a critical question:
            </p>
            
            <div className="bg-gray-50 border-l-4 border-gray-400 pl-6 py-4 mb-6">
              <p className="text-lg font-semibold text-gray-800 italic">
                &quot;How do I know this sensor reading wasn&apos;t captured earlier and replayed now?&quot;
              </p>
            </div>
            
            <p className="mb-4 text-lg">
              This is the <strong>freshness problem</strong> - proving that the measurement or image was produced after a specific moment in public history, and not pre-computed or reused from the past.
            </p>
            
            <p className="mb-4 text-lg">
              Our architecture solves this using a mechanism called the <b>freshness challenge</b> and highly relies on <strong>HyperBEAM TEE (Trusted Execution Environment)</strong>.
            </p>
            
            <p className="mb-4 text-lg">
              We implement a dedicated <strong>attestation engine</strong> built on <strong>HyperBEAM</strong>, which serves multiple roles within our system, some of which were introduced earlier (such as device registration), and others that will be explored in later sections. In this section, we focus specifically on its function as a <strong>decentralized TEE-backed freshness oracle</strong>. Our <strong>HyperBEAM based Attestation Engine</strong> issues an <strong>unpredictable challenge nonce</strong> that devices must embed into their signed attestation packages. By binding each reading to this challenge, sensors can cryptographically prove that the reported result was generated after the challenge was issued, ensuring it cannot be replayed, reused, or fabricated from prior data.
            </p>
            
            <div className="bg-gray-50 border-l-4 border-gray-400 pl-6 py-4 mb-6">
              <p className="text-lg text-gray-800 italic">
                &quot;<strong>HyperBEAM&apos;s TEE-backed architecture</strong> makes it an ideal source for issuing freshness challenges. Because the challenge nonce is generated inside a <strong>decentralized Trusted Execution Environment</strong>, we can cryptographically verify when the challenge was produced, that it was produced in response to our request, and that it could not have been predicted or precomputed. This <strong>verifiable, timing anchored generation</strong> is what uniquely distinguishes HyperBEAM as a <strong>trusted oracle for freshness</strong>.&quot;
              </p>
            </div>

            <h4 className="text-xl font-semibold text-gray-800 mb-4 mt-8">
              II.C.1. How Freshness Challenge Works?
            </h4>

            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              Who Talks to Whom?
            </h5>
            <p className="mb-4 text-lg">
              Your Pi (through our trusted library) → <strong>Attestation Engine (AE)</strong> on HyperBEAM/AO.
            </p>

            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              What the Pi Sends
            </h5>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-4 text-lg">
              <li><strong>wallet_address</strong> (Arweave wallet of the owner)</li>
              <li><strong>code_hash</strong> (hash of the code / firmware that will run)</li>
            </ul>
            <p className="mb-4 text-lg">
              So the request is basically:
            </p>
            <div className="bg-gray-50 border-l-4 border-gray-400 pl-6 py-4 mb-6">
              <p className="text-lg font-semibold text-gray-800 italic">
                &quot;Hi AE, for this wallet + this code_hash, give me a fresh challenge.&quot;
              </p>
            </div>

            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              Technical Implementation (HyperBEAM)
            </h5>
            <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-6">
              <code>{`// Pi sends HTTP request to AE process
POST http://NODE_IP:10000/<AE_PROCESS_ID>~process@1.0/schedule
Body: {
    action: "issue-challenge",
    wallet_address: "0xabc123...",
    code_hash: "0xdef456..."
}`}</code>
            </pre>

            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              What the AE Does (Challenge Creation)
            </h5>
            <p className="mb-4 text-lg">
              <strong>AE Process:</strong>
            </p>
            <ol className="list-decimal list-inside space-y-2 mb-6 ml-4 text-lg">
              <li>Generates a random challenge <strong>C</strong> (unpredictable nonce).</li>
              <li>Sets a timestamp <strong>T</strong> (when it created C).</li>
              <li>Builds a record:
                <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mt-2 mb-2">
                  <code>{`record = { wallet, code_hash, C, T, slot, block_height }`}</code>
                </pre>
              </li>
              <li>Signs it:
                <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mt-2 mb-2">
                  <code>{`SIG_TEE = SIGN_TEE(record)`}</code>
                </pre>
              </li>
              <li>Anchors this record on-chain using AO → Arweave (so later anyone can see that C really existed at time T).</li>
              <li>Returns to the device:
                <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                  <li><strong>C</strong> (challenge nonce)</li>
                  <li><strong>T</strong> (timestamp)</li>
                  <li><strong>SIG_TEE</strong> (AE&apos;s signature over the record)</li>
                  <li><strong>slot</strong> (scheduler slot number)</li>
                  <li><strong>hashpath</strong> (Merkle proof)</li>
                  <li>(optionally a txid / reference to the Arweave log)</li>
                </ul>
              </li>
            </ol>
            <p className="mb-4 text-lg">
              So now: We have a public, immutable, TEE-signed challenge tied to (wallet, code_hash, C, T).
            </p>

            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              Technical Details (HyperBEAM): Challenge Generation Inside TEE
            </h5>
            <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-6">
              <code>{`-- Executed by ~lua@5.3a device inside TEE
function generate_challenge(msg)
    -- Step 1: Gather entropy sources
    local entropy = {
        crypto.random(32),              -- TEE Hardware RNG (256 bits)
        tostring(msg.Timestamp),        -- Millisecond timestamp
        msg.From,                       -- Requester wallet (auto-included)
        msg["Code-Hash"],               -- Code hash
        tostring(State.challenge_count), -- Monotonic counter
        msg["Block-Height"]             -- Arweave block height
    }
    
    -- Step 2: Generate challenge
    local combined = table.concat(entropy, "|")
    local challenge = crypto.sha256(combined)
    
    -- Step 3: Create record (automatically gets slot from ~scheduler@1.0)
    local record = {
        challenge: challenge,
        wallet: msg.From,
        code_hash: msg["Code-Hash"],
        timestamp: msg.Timestamp,
        slot: msg.Slot,                 -- Assigned by scheduler
        block_height: msg["Block-Height"]
    }
    
    -- Step 4: TEE signature (automatically added by ~snp@1.0 device)
    -- SIG_TEE and TEE_REPORT added to response automatically
    
    -- Step 5: Store in state
    State.challenges[challenge] = record
    
    -- Step 6: Return to device
    msg.reply({
        challenge: challenge,
        timestamp: msg.Timestamp,
        slot: msg.Slot,
        tee_signature: msg["TEE-Signature"],  -- Added by ~snp@1.0
        tee_report: msg["TEE-Report"]         -- Added by ~snp@1.0
    })
end`}</code>
            </pre>

            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              Device Stack Execution Flow
            </h5>
            <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-6">
              <code>{`Client Request
    ↓
~scheduler@1.0 Device
  │ • Assigns unique slot number (e.g., slot 42)
  │ • Creates deterministic ordering
  │ • Slot acts as Merkle tree node
    ↓
~snp@1.0 Device (TEE Attestation)
  │ • Generates AMD SEV-SNP attestation report
  │ • Signs with ephemeral TEE key (PRIV_TEE)
  │ • Adds TEE-Signature and TEE-Report to message
    ↓
~lua@5.3a Device (Challenge Logic)
  │ • Executes generate_challenge() function
  │ • Uses TEE hardware RNG
  │ • Creates challenge record
  │ • Updates process state
    ↓
HashPath Calculation (Automatic)
  │ • HP₄₂ = Hash(HP₄₁ || Message₄₂)
  │ • Creates Merkle proof
  │ • Added to response headers (X-HashPath)
    ↓
Storage Layer
  │ • Stored in hb_store_lmdb (local, fast)
  │ • Synced to Arweave via hb_store_gateway
  │ • Permanent, immutable record
    ↓
Response to Pi`}</code>
            </pre>

            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              Response Structure
            </h5>
            <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-6">
              <code>{`HTTP 200 OK
Headers:
  X-HashPath: /HP0/HP1/.../HP42    // Merkle proof (FREE!)
  X-Slot: 42
  X-Block-Height: 1234567
Body:
{
    challenge: "0xabc123...",        // 256-bit challenge nonce
    timestamp: 1234567890,           // Millisecond precision
    slot: 42,                        // Scheduler slot (unique)
    block_height: 1234567,           // Arweave block anchor
    tee_signature: "0xdef456...",    // ECDSA signature from TEE
    tee_report: {                    // AMD SEV-SNP attestation
        measurement: "...",
        report_data: "...",
        signature: "..."
    },
    process_id: "AE_PROCESS_ID"      // For verification queries
}`}</code>
            </pre>

            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              How the Pi Uses the Challenge During Capture
            </h5>
            <p className="mb-4 text-lg">
              When the device actually does work (e.g., take photo or compute 2+2), our trusted library (TSEL) does:
            </p>
            <ol className="list-decimal list-inside space-y-2 mb-6 ml-4 text-lg">
              <li>Capture sensor data / run code.</li>
              <li>Compute:
                <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                  <li><strong>raw_hash</strong> (from RAW bytes, for sensors/cameras)</li>
                  <li><strong>data_hash</strong> (from processed output, e.g. JPEG or numeric result)</li>
                </ul>
              </li>
              <li>Build an execution / data transcript including:
                <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                  <li><strong>code_hash</strong></li>
                  <li><strong>raw_hash</strong></li>
                  <li><strong>data_hash</strong></li>
                  <li><strong>challenge = C</strong> (from AE)</li>
                  <li><strong>timestamp_device</strong> (device&apos;s local time)</li>
                </ul>
              </li>
              <li>Ask the secure element to sign this transcript:
                <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mt-2 mb-2">
                  <code>{`SIG_DEV = SIGN(PRIV_DEV,
      raw_hash +
      data_hash +
      code_hash +
      C +
      timestamp_device
)`}</code>
                </pre>
              </li>
            </ol>
            <p className="mb-4 text-lg">
              So the final attestation packet the device outputs is:
            </p>
            <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-6">
              <code>{`{
    code_hash,
    raw_hash,
    data_hash,
    challenge: C,
    timestamp_device,
    device_pubkey: PUB_DEV,
    sig_dev: SIG_DEV,
    // Reference to AE challenge record
    ae_process_id: "<AE_PROCESS_ID>",
    ae_slot: 42,
    ae_timestamp: T
}`}</code>
            </pre>

            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              How a Verifier Checks &quot;Freshness&quot;
            </h5>
            <p className="mb-4 text-lg">
              Later, a verifier:
            </p>

            <h6 className="text-base font-semibold text-gray-800 mb-3 mt-4">
              Step 1: Fetch Challenge Record from AE / Arweave
            </h6>
            <p className="mb-4 text-lg">
              Using HyperBEAM HyperPATH:
            </p>
            <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-6">
              <code>{`// Query AE at specific slot where challenge was created
GET http://NODE_IP:10000/<AE_PROCESS_ID>~process@1.0/compute/slot/42
// Returns:
{
    challenges: {
        "0xabc123...": {
            challenge: "0xabc123...",
            wallet: "wallet_address",
            code_hash: "0xdef456...",
            timestamp: T,
            slot: 42,
            block_height: 1234567,
            tee_signature: "0xghi789...",
            tee_report: {...}
        }
    }
}
// Response Headers contain:
X-HashPath: /HP0/HP1/.../HP42    // Merkle proof for verification`}</code>
            </pre>
            <p className="mb-4 text-lg">
              Gets: {'{'}wallet, code_hash_AE, C_AE, T, SIG_TEE, slot, hashpath{'}'}
            </p>

            <h6 className="text-base font-semibold text-gray-800 mb-3 mt-4">
              Step 2: Verify AE&apos;s TEE Signature
            </h6>
            <p className="mb-4 text-lg">
              <strong>AMD SEV-SNP Verification:</strong>
            </p>
            <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-6">
              <code>{`// Check AE's signature (proves TEE execution)
const teeValid = verifyAMDAttestation(
    challenge_record.tee_report,      // AMD attestation report
    challenge_record.challenge,       // Challenge that was signed
    challenge_record.tee_signature    // TEE signature
)
// This verifies:
// 1. Signature is from genuine AMD SEV-SNP TEE
// 2. TEE firmware measurement matches expected value
// 3. Challenge was actually generated inside TEE`}</code>
            </pre>
            <p className="mb-4 text-lg">
              Checks: <strong>VERIFY_TEE(record, SIG_TEE)</strong> → must be true (proves AE really issued C_AE at time T inside genuine TEE)
            </p>

            <h6 className="text-base font-semibold text-gray-800 mb-3 mt-4">
              Step 3: Verify HashPath (Merkle Proof)
            </h6>
            <p className="mb-4 text-lg">
              <strong>HyperBEAM&apos;s Built-in Merkle Verification:</strong>
            </p>
            <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-6">
              <code>{`// Reconstruct HashPath from slot 0 to slot 42
async function verifyHashPath(aeProcessId, targetSlot, claimedHashPath) {
    // Start with genesis
    let hp = sha256(aeProcessId)  // HP₀
    
    // Reconstruct chain
    for (let slot = 1; slot <= targetSlot; slot++) {
        const state = await fetch(
            \`http://NODE_IP:10000/\${aeProcessId}~process@1.0/compute/slot/\${slot}\`
        )
        const message = await state.json()
        hp = sha256(hp + JSON.stringify(message))  // HPᵢ = H(HPᵢ₋₁ || Mᵢ)
    }
    
    // Verify matches
    return hp === claimedHashPath  // If true, record is authentic
}`}</code>
            </pre>
            <p className="mb-4 text-lg">
              This proves:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-4 text-lg">
              <li>Challenge record hasn&apos;t been tampered with</li>
              <li>Historical state is authentic</li>
              <li>Slot is genuine and unique</li>
            </ul>

            <h6 className="text-base font-semibold text-gray-800 mb-3 mt-4">
              Step 4: Confirm Challenge Matches
            </h6>
            <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-6">
              <code>{`const C_from_device = device_attestation.challenge
const C_from_AE = challenge_record.challenge
if (C_from_device !== C_from_AE) {
    return { verified: false, reason: "Challenge mismatch" }
}`}</code>
            </pre>
            <p className="mb-4 text-lg">
              Check: <strong>C from device == C_AE from AE record</strong>
            </p>

            <h6 className="text-base font-semibold text-gray-800 mb-3 mt-4">
              Step 5: Confirm Code Hash Matches
            </h6>
            <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-6">
              <code>{`const code_hash_device = device_attestation.code_hash
const code_hash_AE = challenge_record.code_hash
if (code_hash_device !== code_hash_AE) {
    return { verified: false, reason: "Code hash mismatch" }
}`}</code>
            </pre>
            <p className="mb-4 text-lg">
              Check: <strong>code_hash in device attestation == code_hash_AE in record</strong>
            </p>

            <h6 className="text-base font-semibold text-gray-800 mb-3 mt-4">
              Step 6: Verify Device Signature
            </h6>
            <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-6">
              <code>{`// Recompute the signed message
const signed_data = concatenate([
    device_attestation.raw_hash,
    device_attestation.data_hash,
    device_attestation.code_hash,
    device_attestation.challenge,
    device_attestation.timestamp_device
])
// Verify with device's public key
const deviceSigValid = verifyECDSA(
    signed_data,
    device_attestation.sig_dev,
    device_attestation.device_pubkey
)`}</code>
            </pre>
            <p className="mb-4 text-lg">
              Verifies <strong>SIG_DEV</strong> with <strong>PUB_DEV</strong>
            </p>

            <h6 className="text-base font-semibold text-gray-800 mb-3 mt-4">
              Step 7: Check Time Ordering (Arweave Anchor)
            </h6>
            <p className="mb-4 text-lg">
              Query Arweave for temporal proof:
            </p>
            <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-6">
              <code>{`// Get Arweave block at challenge creation time
const arweaveBlock = await fetch(
    \`https://arweave.net/block/height/\${challenge_record.block_height}\`
)
const blockData = await arweaveBlock.json()
// Verify temporal consistency
const checks = {
    // Challenge timestamp must be after or equal to block time
    challenge_after_block: challenge_record.timestamp >= blockData.timestamp,
    
    // Device timestamp must be after challenge
    device_after_challenge: device_attestation.timestamp_device >= challenge_record.timestamp,
    
    // Device not too far after challenge (prevent long replay)
    not_stale: (device_attestation.timestamp_device - challenge_record.timestamp) < MAX_FRESHNESS_WINDOW
}`}</code>
            </pre>
            <p className="mb-4 text-lg">
              Checks:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-4 text-lg">
              <li><strong>timestamp_device ≥ T</strong> (data produced after challenge time)</li>
              <li>Optionally: <strong>timestamp_device</strong> not too far after T (no long replay)</li>
            </ul>

            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              Complete Verification Flow
            </h5>
            <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-6">
              <code>{`async function verifyFreshness(deviceAttestation, aeProcessId) {
    // 1. Fetch challenge from AE via HyperPATH
    const response = await fetch(
        \`http://NODE_IP:10000/\${aeProcessId}~process@1.0/compute/slot/\${deviceAttestation.ae_slot}\`
    )
    const state = await response.json()
    const hashpath = response.headers.get('X-HashPath')
    const challengeRecord = state.challenges[deviceAttestation.challenge]
    
    // 2. Verify TEE signature (AE authenticity)
    const teeValid = await verifyAMDAttestation(
        challengeRecord.tee_report,
        challengeRecord.challenge,
        challengeRecord.tee_signature
    )
    if (!teeValid) return { verified: false, step: "TEE signature" }
    
    // 3. Verify HashPath (Merkle proof)
    const hashpathValid = await verifyHashPath(
        aeProcessId,
        deviceAttestation.ae_slot,
        hashpath
    )
    if (!hashpathValid) return { verified: false, step: "HashPath" }
    
    // 4. Verify challenge matches
    if (deviceAttestation.challenge !== challengeRecord.challenge) {
        return { verified: false, step: "Challenge mismatch" }
    }
    
    // 5. Verify code hash matches
    if (deviceAttestation.code_hash !== challengeRecord.code_hash) {
        return { verified: false, step: "Code hash mismatch" }
    }
    
    // 6. Verify device signature
    const signedData = concatenate([
        deviceAttestation.raw_hash,
        deviceAttestation.data_hash,
        deviceAttestation.code_hash,
        deviceAttestation.challenge,
        deviceAttestation.timestamp_device
    ])
    const deviceSigValid = verifyECDSA(
        signedData,
        deviceAttestation.sig_dev,
        deviceAttestation.device_pubkey
    )
    if (!deviceSigValid) return { verified: false, step: "Device signature" }
    
    // 7. Verify temporal ordering via Arweave
    const block = await getArweaveBlock(challengeRecord.block_height)
    const temporalValid = (
        challengeRecord.timestamp >= block.timestamp &&
        deviceAttestation.timestamp_device >= challengeRecord.timestamp &&
        (deviceAttestation.timestamp_device - challengeRecord.timestamp) < MAX_FRESHNESS
    )
    if (!temporalValid) return { verified: false, step: "Temporal ordering" }
    
    // All checks passed!
    return {
        verified: true,
        challenge_time: challengeRecord.timestamp,
        device_time: deviceAttestation.timestamp_device,
        slot: challengeRecord.slot,
        hashpath: hashpath,
        arweave_block: challengeRecord.block_height
    }
}`}</code>
            </pre>
            <p className="mb-4 text-lg">
              If all checks pass, the verifier can say:
            </p>
            <div className="bg-gray-50 border-l-4 border-gray-400 pl-6 py-4 mb-6">
              <p className="text-lg font-semibold text-gray-800 italic">
                &quot;This result was produced after challenge C was issued at time T, by this device key, using this code_hash. It&apos;s fresh, not a replay.&quot;
              </p>
            </div>

            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              Summary (One Sentence)
            </h5>
            <p className="mb-4 text-lg">
              Freshness challenge = AE creates a random challenge C + timestamp T inside a TEE, logs it on-chain via HyperBEAM (with HashPath Merkle proof), the device must sign its data including C, and later verifiers check that signature + the on-chain challenge record (using HyperPATH queries) + HashPath integrity + TEE attestation to prove the data came after that challenge and is cryptographically fresh.
            </p>

            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              Key HyperBEAM Features Used
            </h5>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Feature</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"><code>~process@1.0</code></td>
                    <td className="border border-gray-300 px-4 py-2">AE process orchestration</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"><code>~scheduler@1.0</code></td>
                    <td className="border border-gray-300 px-4 py-2">Slot assignment (unique ordering)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"><code>~snp@1.0</code></td>
                    <td className="border border-gray-300 px-4 py-2">TEE attestation generation</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"><code>~lua@5.3a</code></td>
                    <td className="border border-gray-300 px-4 py-2">Challenge generation logic</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"><strong>HashPaths</strong></td>
                    <td className="border border-gray-300 px-4 py-2">Merkle proofs (automatic, built-in)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"><strong>HyperPATHs</strong></td>
                    <td className="border border-gray-300 px-4 py-2">Query state at any slot: /compute/slot/N</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"><strong>Arweave integration</strong></td>
                    <td className="border border-gray-300 px-4 py-2">Permanent storage via hb_store_gateway</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"><strong>HTTP-native</strong></td>
                    <td className="border border-gray-300 px-4 py-2">Standard web requests for all operations</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="my-12">
              <h4 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                Proof of Freshness: High-Level Conceptual View
              </h4>
              <div className="border border-gray-300 rounded-lg overflow-hidden bg-white mb-8">
                <ProofOfFreshnessConceptualFlow />
              </div>
              
              <h4 className="text-xl font-semibold text-gray-800 mb-6 text-center mt-12">
                Proof of Freshness: Detailed Process Flow
              </h4>
              <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
                <ProofOfFreshnessFlow />
              </div>
            </div>

            <hr className="my-12 border-t-2 border-gray-300" />

            <h3 className="text-2xl font-semibold text-gray-800 mb-8 mt-8">
              II.D. How Do I Know That This Output Originated From the Real Sensor, Capturing a Real Moment, Instead of Being Fabricated or Replayed?
            </h3>
            
            <p className="mb-4 text-lg mt-4">
              &quot;<strong>Proof of Origin</strong>&quot; answers one deceptively simple question:
            </p>
            
            <div className="bg-gray-50 border-l-4 border-gray-400 pl-6 py-4 mb-6">
              <p className="text-lg font-semibold text-gray-800 italic">
                &quot;Did this data actually originate from the physical sensor it claims to come from - or was it fabricated, replayed, or generated off-device?&quot;
              </p>
            </div>
            
            <p className="mb-4 text-lg">
              Unlike <strong>Proof of Execution</strong> (which verifies which code ran) or <strong>Proof of Freshness</strong> (which verifies when it ran), <strong>Proof of Origin</strong> verifies what physically happened in the world was genuinely captured by this specific hardware at that moment.
            </p>
            
            <p className="mb-4 text-lg font-semibold">
              This is the hardest problem in all of decentralized or remote sensing.
            </p>
            
            <p className="mb-4 text-lg">
              In our architecture:
            </p>
            
            <div className="bg-gray-50 border-l-4 border-gray-400 pl-6 py-4 mb-6">
              <p className="text-lg text-gray-800">
                <strong>Proof of Origin</strong> = cryptographic proof that the processed output (JPEG/reading) came from real raw sensor bytes captured at that moment on this device.
              </p>
            </div>
            
            <p className="mb-4 text-lg">
              So the heart of Proof of Origin is:
            </p>
            
            <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-6">
              <code>{`RAW_HASH = H(raw_sensor_bytes)`}</code>
            </pre>
            
            <p className="mb-4 text-lg">
              Everything else is just binding that <strong>RAW_HASH</strong> to the final attestation.
            </p>

            <h4 className="text-xl font-semibold text-gray-800 mb-4 mt-8">
              II.D.1. How RAW_HASH is Generated (Step-by-Step)
            </h4>

            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              Step 1 - Sensor Produces RAW Bytes
            </h5>
            <p className="mb-4 text-lg">
              When a sensor fires, it produces raw electrical samples that the driver reads.
            </p>
            <p className="mb-4 text-lg">
              Examples:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-4 text-lg">
              <li>Camera → Bayer RAW frame</li>
              <li>Accelerometer → 300-sample burst</li>
              <li>Temperature sensor → raw ADC/I²C register bytes</li>
              <li>Microphone → PCM block</li>
            </ul>
            <p className="mb-4 text-lg">
              These bytes are the closest representation of the physical world.
            </p>

            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              Step 2 - TSEL (Trusted Library) Intercepts Them Immediately
            </h5>
            <p className="mb-4 text-lg">
              The Pi never controls this. Our trusted code (TSEL) grabs the raw buffer before any processing.
            </p>

            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              Step 3 - TSEL Hashes the Raw Bytes
            </h5>
            <p className="mb-4 text-lg">
              We compute:
            </p>
            <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-6">
              <code>{`raw_hash = H(raw_bytes)`}</code>
            </pre>
            <p className="mb-4 text-lg">
              Using SHA-256 or SHA-3.
            </p>

            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              Step 4 - TSEL Discards the Raw Bytes
            </h5>
            <p className="mb-4 text-lg">
              Unless the app specifically needs RAW, we discard it from memory. This prevents later tampering.
            </p>
            <p className="mb-4 text-lg font-semibold">
              Now we have the single strongest anchor: → <strong>RAW_HASH</strong> proves what the sensor physically saw.
            </p>

            <h4 className="text-xl font-semibold text-gray-800 mb-4 mt-8">
              II.D.2. Binding RAW_HASH to the Processed Output
            </h4>
            <p className="mb-4 text-lg">
              Most outputs are processed:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-4 text-lg">
              <li>JPEG from a camera</li>
              <li>A computed speed value</li>
              <li>A filtered sensor reading</li>
              <li>An attacker could fake these.</li>
            </ul>
            <p className="mb-4 text-lg">
              So we compute:
            </p>
            <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-4">
              <code>{`data_hash = H(processed_output)`}</code>
            </pre>
            <p className="mb-4 text-lg">
              Then bind the two:
            </p>
            <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-6">
              <code>{`origin_hash = H(raw_hash || data_hash)`}</code>
            </pre>
            <p className="mb-4 text-lg">
              Now:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-4 text-lg">
              <li>If RAW is fake → raw_hash wrong → origin_hash wrong → attestation fails</li>
              <li>If processed output is fake → data_hash wrong → origin_hash wrong → attestation fails</li>
            </ul>
            <p className="mb-4 text-lg font-semibold">
              This is the exact cryptographic connection between physical measurement and output.
            </p>

            <h4 className="text-xl font-semibold text-gray-800 mb-4 mt-8">
              II.D.3. Why RAW_HASH Gives Proof of Origin (The Key Logic)
            </h4>
            <ol className="list-decimal list-inside space-y-4 mb-6 ml-4 text-lg">
              <li className="mb-4">
                <strong>Physical event → raw bytes</strong>
                <p className="ml-6 mt-2">The only way to generate the correct raw bytes is to have the real sensor triggered.</p>
              </li>
              <li className="mb-4">
                <strong>RAW_HASH is deterministic</strong>
                <p className="ml-6 mt-2">Any change in raw data → completely different hash.</p>
              </li>
              <li className="mb-4">
                <strong>RAW_HASH is signed by the secure element</strong>
                <p className="ml-6 mt-2">Device signs:</p>
                <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mt-2 mb-2 ml-6">
                  <code>{`SIGN(PRIV_DEV, raw_hash || data_hash || code_hash || challenge || timestamp)`}</code>
                </pre>
                <p className="ml-6 mt-2">So the attacker cannot forge a RAW_HASH unless:</p>
                <ul className="list-disc list-inside space-y-1 ml-12 mt-2">
                  <li>they have the physical sensor,</li>
                  <li>they can feed the exact raw bytes to TSEL,</li>
                  <li>and the secure element signs it.</li>
                </ul>
              </li>
              <li className="mb-4">
                <strong>AE freshness ties raw capture to a moment in time</strong>
                <p className="ml-6 mt-2">RAW_HASH appears together with challenge C from AE. So RAW_HASH must have been produced after the challenge.</p>
              </li>
              <li className="mb-4">
                <strong>AE on-chain log proves the challenge was real</strong>
                <p className="ml-6 mt-2">This makes replay impossible.</p>
              </li>
              <li className="mb-4">
                <strong>Sealing prevents the device owner from swapping drivers/code</strong>
                <p className="ml-6 mt-2">So they cannot inject synthetic bytes into TSEL anymore.</p>
              </li>
            </ol>

            <h4 className="text-xl font-semibold text-gray-800 mb-4 mt-8">
              II.D.4. Final One-Paragraph Explanation
            </h4>
            <p className="mb-4 text-lg">
              Proof of Origin is achieved by hashing the raw sensor bytes at the instant they are captured. Our trusted library (TSEL) reads the raw buffer directly from the hardware interface, computes <strong>raw_hash = H(raw_bytes)</strong>, and immediately binds it to the processed output through <strong>origin_hash = H(raw_hash || data_hash)</strong>. This origin_hash is then signed by the secure element along with an attestation challenge from the HyperBEAM AE. Because the raw bytes are produced by the actual sensor, cannot be predicted or reconstructed, and must appear after an AE-issued challenge, the resulting signature becomes an unforgeable cryptographic proof that the output truly originated from a real physical event on this specific device.
            </p>
          </div>
        </section>

        {/* Section III */}
        <section id="sealing" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">III. Sealing the Device: Ensuring Verifiability Even Against Its Owner</h2>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="mb-4 text-lg">
              Commodity hardware like the Raspberry Pi Zero 2 W does not contain a built-in <strong>Trusted Execution Environment (TEE)</strong>. Under normal circumstances, this makes it impossible to guarantee that sensor readings, raw bytes, or code execution pathways have not been tampered with by the device owner or by malicious software running on the OS. To solve this, our system relies on a critical architectural insight:
            </p>
            
            <div className="bg-gray-50 border-l-4 border-gray-400 pl-6 py-4 mb-6">
              <p className="text-lg text-gray-800">
                We offload trust guarantees to a remote, decentralized <strong>HyperBEAM Attestation Engine (AE)</strong> backed by real TEEs, while enforcing local sealing so the Pi cannot cheat, modify its environment, or forge attestations.
              </p>
            </div>
            
            <p className="mb-4 text-lg">
              <strong>HyperBEAM&apos;s TEE-backed nodes</strong> provide the unpredictable challenges, on-chain commitments, and timing guarantees that would traditionally require an onboard TEE. The Pi itself provides cryptographic identity through its secure element, but no longer needs to host trusted execution internally, the <strong>sealing + sandbox model</strong> enforces those constraints externally.
            </p>
            
            <p className="mb-4 text-lg">
              We introduce a <strong>sealing stage</strong> and a <strong>sandboxed execution environment</strong> that together transform a Raspberry Pi into a cryptographically verifiable sensor. Sealing ensures that once a device enters its production state, neither the owner nor the manufacturer can alter its software environment without detection. The sandbox ensures that once sealed, the device can only execute code that has been cryptographically validated and distributed by the Attestation Engine (AE). Combined, these mechanisms elevate our system from a set of cryptographic proofs to a full, tamper evident hardware pipeline, one where users cannot cheat, modify, or influence attestation results after the system enters its final, trusted state.
            </p>

            <h4 className="text-xl font-semibold text-gray-800 mb-4 mt-8">
              III.A. Why We Must Protect the Device Even From Its Owner
            </h4>
            
            <p className="mb-4 text-lg">
              In traditional IoT systems, the device owner holds ultimate control: they can alter the OS, change sensor drivers, inject synthetic raw bytes, replay old readings, or directly manipulate any computation performed on the board. This makes external verification fundamentally impossible.
            </p>
            
            <p className="mb-4 text-lg">
              Our framework removes this trust requirement.
            </p>

            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              The Core Problem
            </h5>
            <p className="mb-4 text-lg">
              If the owner is not constrained, they can trivially break every trust anchor:
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Trust Anchor</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">How an Unrestricted Owner Breaks It</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"><strong>Proof of Origin</strong></td>
                    <td className="border border-gray-300 px-4 py-2">Inject fake raw bytes into drivers</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"><strong>Proof of Execution</strong></td>
                    <td className="border border-gray-300 px-4 py-2">Replace or edit the code before running</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"><strong>Proof of Freshness</strong></td>
                    <td className="border border-gray-300 px-4 py-2">Replay old readings after receiving a new challenge</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"><strong>Device Identity</strong></td>
                    <td className="border border-gray-300 px-4 py-2">Make the secure element sign arbitrary attacker-chosen data</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mb-4 text-lg">
              Even expensive enterprise systems (CCTV, industrial sensors, vehicle cameras) cannot defend against this - the owner always has full OS control, and the device has no independently verifiable runtime environment.
            </p>

            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              Our Solution
            </h5>
            <p className="mb-4 text-lg">
              We protect the pipeline by eliminating owner control after deployment:
            </p>
            <p className="mb-4 text-lg font-semibold">
              A custom Pi OS seals itself on first boot
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-4 text-lg">
              <li>bootloader locked</li>
              <li>root filesystem made immutable</li>
              <li>SSH/password access destroyed</li>
              <li>secure-element access restricted</li>
              <li>initialization recorded by the AE</li>
            </ul>
            <p className="mb-4 text-lg font-semibold">
              All code must be issued and approved by the HyperBEAM TEE-backed AE
            </p>
            <p className="mb-4 text-lg">
              The sandbox cannot run user-submitted code unless:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-4 text-lg">
              <li>AE has uploaded it to Arweave</li>
              <li>AE has generated a unique challenge tied to that code</li>
              <li>AE has marked the device as sealed</li>
              <li>AE has cryptographically approved the code_hash</li>
            </ul>
            <p className="mb-4 text-lg font-semibold">
              All attestations are tethered to TEE-generated challenges
            </p>
            <p className="mb-4 text-lg">
              Since HyperBEAM nodes run inside secure TEEs, they produce unpredictable nonces and verifiable timestamps that a Pi cannot forge or predict.
            </p>
            <p className="mb-4 text-lg font-semibold">
              Tampering resets the identity irreversibly
            </p>
            <p className="mb-4 text-lg">
              Reflashing the Pi wipes the secure-element wallet → new identity → AE rejects all future proofs from this hardware.
            </p>

            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              Why This Matters
            </h5>
            <p className="mb-4 text-lg">
              Once sealed:
            </p>
            <p className="mb-4 text-lg">
              The Pi cannot lie - not to verifiers, not to the AE, and not even to its own owner - because the computation and attestation depend on a remote TEE and a sealed local runtime.
            </p>
            <p className="mb-4 text-lg">
              This achieves tamper-evident, trust-minimized verifiable sensing without requiring an onboard TEE.
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-4 text-lg">
              <li><strong>HyperBEAM&apos;s decentralized TEE network</strong> provides the trust guarantees.</li>
              <li><strong>Sealing</strong> provides the enforcement mechanism locally.</li>
              <li>Together, they create a verifiable sensor architecture that neither the owner nor the manufacturer can manipulate once activated.</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-800 mb-4 mt-8">
              III.B. The Sealing Model (High Level)
            </h4>
            
            <p className="mb-4 text-lg">
              After a device completes its development cycle, it must transition into a one way irreversible state that prevents the owner or any external actor from modifying the software environment. This sealed state is critical, because <strong>Proof of Origin</strong>, <strong>Proof of Execution</strong>, and <strong>Proof of Freshness</strong> remain valid only if the device cannot alter its code path or sensor pipeline after deployment.
            </p>
            
            <p className="mb-4 text-lg">
              When the sealing process is initiated, the device transforms from a flexible computing board into a locked verification appliance. The transition is final. Any modification after sealing results in the creation of a new hardware identity, which the HyperBEAM Attestation Engine will treat as an entirely different device.
            </p>
            
            <p className="mb-4 text-lg">
              Once sealed, the following guarantees hold:
            </p>

            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              Code Cannot Change
            </h5>
            <p className="mb-4 text-lg">
              No new code can be executed unless it is issued through the HyperBEAM TEE based Attestation Engine and delivered into the sandbox. Local file editing, package installation, or runtime modification are not possible.
            </p>

            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              The Operating System Cannot Change
            </h5>
            <p className="mb-4 text-lg">
              The custom Pi OS becomes read only. System partitions are locked. Bootloader configuration is fixed. Firmware paths and kernel modules cannot be altered.
            </p>

            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              Secure Element Access Cannot Change
            </h5>
            <p className="mb-4 text-lg">
              The secure element only accepts signing requests from the trusted sensor execution library inside the sandbox. All direct access from the operating system or user programs is permanently revoked.
            </p>

            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              Only the Sandbox Can Produce Attestations
            </h5>
            <p className="mb-4 text-lg">
              After sealing, the sandbox becomes the only component that can interact with the secure element and the Attestation Engine. All proofs must pass through the sandbox pipeline which enforces every trust anchor in the system.
            </p>

            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              Any Modification Creates a New Identity and the Attestation Engine Rejects the Device
            </h5>
            <p className="mb-4 text-lg">
              Reflashing the SD card erases the on device Arweave wallet and therefore changes the identity. The AE immediately detects the mismatch between sealed device identity and the new one. Any attestation from a modified board is rejected as invalid.
            </p>
            
            <p className="mb-4 text-lg">
              The sealing model ensures that, after activation, the device cannot deviate from the cryptographically verifiable path defined by the Attestation Engine and the trusted execution pipeline. This converts the Raspberry Pi into a deterministic, tamper evident sensor that derives its trust from remote TEE backed challenge issuance, a sealed local environment, and an irreversible hardware identity anchored on chain.
            </p>

            <h4 className="text-xl font-semibold text-gray-800 mb-4 mt-8">
              III.C. Sealing Through a Modified Pi OS
            </h4>
            
            <p className="mb-4 text-lg">
              To reliably convert a Raspberry Pi into a verifiable sensor device, the operating system must enforce a sealed execution environment that cannot be modified after activation. This is achieved by using a custom modified version of Pi OS that performs an irreversible locking procedure the moment it boots for the very first time. The goal is to ensure that the device cannot escape the trusted pipeline, cannot bypass the sandbox, and cannot manipulate the secure element or code execution after sealing.
            </p>
            
            <p className="mb-4 text-lg">
              The modified Pi OS therefore contains a first boot sealing sequence and several persistent hardening steps that guarantee long term integrity.
            </p>

            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              III.C.1. First Boot and Auto Sealing
            </h5>
            <p className="mb-4 text-lg">
              On the very first boot, before any user interaction occurs, the system performs a complete sealing operation. The following steps take place automatically:
            </p>

            <h6 className="text-base font-semibold text-gray-800 mb-3 mt-4">
              The Operating System Locks Itself
            </h6>
            <p className="mb-4 text-lg">
              Critical partitions are converted to read only mode. The root filesystem becomes immutable and system files can no longer be modified.
            </p>

            <h6 className="text-base font-semibold text-gray-800 mb-3 mt-4">
              The Root Password is Destroyed
            </h6>
            <p className="mb-4 text-lg">
              No administrative login is possible after sealing. Password authentication becomes permanently unavailable.
            </p>

            <h6 className="text-base font-semibold text-gray-800 mb-3 mt-4">
              SSH Access is Disabled
            </h6>
            <p className="mb-4 text-lg">
              Remote shells and administrative channels are fully removed to prevent users from altering the runtime.
            </p>

            <h6 className="text-base font-semibold text-gray-800 mb-3 mt-4">
              The Bootloader is Locked
            </h6>
            <p className="mb-4 text-lg">
              Boot configuration and kernel parameters cannot be modified anymore. This prevents custom kernels or debugging modes from being loaded.
            </p>

            <h6 className="text-base font-semibold text-gray-800 mb-3 mt-4">
              The Root Filesystem is Marked as Read Only
            </h6>
            <p className="mb-4 text-lg">
              The core OS image cannot be edited, replaced, or patched by the owner after the initial sealing.
            </p>

            <h6 className="text-base font-semibold text-gray-800 mb-3 mt-4">
              The Secure Element is Provisioned
            </h6>
            <p className="mb-4 text-lg">
              A fresh public and private keypair is generated inside the secure element. The private key never leaves the chip at any point.
            </p>

            <h6 className="text-base font-semibold text-gray-800 mb-3 mt-4">
              The Device Arweave Wallet is Loaded into the Secure Element
            </h6>
            <p className="mb-4 text-lg">
              The wallet address and signing identity are now bound to the sealed hardware. This identity will be used for all future attestations.
            </p>

            <h6 className="text-base font-semibold text-gray-800 mb-3 mt-4">
              The Device Registers with the HyperBEAM TEE Backed Attestation Engine
            </h6>
            <p className="mb-4 text-lg">
              The device sends the following registration package:
            </p>
            <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-6">
              <code>{`{
  PUB_DEV,
  wallet_address,
  sealed=true,
  seal_timestamp
}`}</code>
            </pre>
            <p className="mb-4 text-lg">
              The AE stores this on chain, which creates a permanent and publicly verifiable record that this specific device entered its sealed state at the recorded time.
            </p>
            
            <p className="mb-4 text-lg font-semibold">
              Once these steps complete, the device cannot return to an unsealed state. The operating system, the secure element configuration, and the identity registration are now permanently locked.
            </p>

            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              III.C.2. Why Sealing Works on a Pi
            </h5>
            <p className="mb-4 text-lg">
              Sealing is effective on a Raspberry Pi because of several core properties of the platform.
            </p>

            <h6 className="text-base font-semibold text-gray-800 mb-3 mt-4">
              The Root Filesystem is Locked
            </h6>
            <p className="mb-4 text-lg">
              After sealing, the OS becomes immutable. Any change requires a complete reflash, which invalidates the identity.
            </p>

            <h6 className="text-base font-semibold text-gray-800 mb-3 mt-4">
              The Secure Element is Protected
            </h6>
            <p className="mb-4 text-lg">
              Only the trusted sensor execution library is allowed to communicate with the secure element after sealing. Direct access from the system or applications is prevented.
            </p>

            <h6 className="text-base font-semibold text-gray-800 mb-3 mt-4">
              Identity is Tied to the Sealed State
            </h6>
            <p className="mb-4 text-lg">
              The Arweave wallet stored in the secure element becomes the unique device identity. If the OS changes, the wallet cannot be recovered, so the identity is lost.
            </p>

            <h6 className="text-base font-semibold text-gray-800 mb-3 mt-4">
              Reflashing the SD Card Produces a New Identity
            </h6>
            <p className="mb-4 text-lg">
              Any attempt to modify or reset the device requires wiping the OS. This deletes the wallet address inside the secure element, creating a brand new identity. The Attestation Engine will immediately reject this new identity because it does not match the sealed registration.
            </p>
            
            <p className="mb-4 text-lg">
              These properties allow a Raspberry Pi, which does not contain a hardware TEE, to behave like a locked verification appliance. The remote HyperBEAM TEE nodes guarantee challenge and timestamp correctness, and the sealed Pi OS guarantees that local execution and sensor handling cannot be altered by the device owner.
            </p>

            <h4 className="text-xl font-semibold text-gray-800 mb-4 mt-8">
              III.D. Post Sealing Operation and the Sandbox Execution Environment
            </h4>
            
            <p className="mb-4 text-lg">
              Once the device completes its sealing process, the Raspberry Pi stops behaving like a normal computer and becomes a locked verification appliance. Only a small set of controlled, verifiable functions remain available. Everything else is permanently removed.
            </p>
            
            <p className="mb-4 text-lg">
              This stage combines two components:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-4 text-lg">
              <li>A post seal access point for safe configuration</li>
              <li>A sandbox execution environment that enforces every trust anchor</li>
            </ul>
            
            <p className="mb-4 text-lg">
              Together they ensure that the device cannot lie, cannot alter its code, and cannot misuse the secure element even if the owner attempts to tamper with it.
            </p>

            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              III.D.1. Post Seal Access Point (AP Mode)
            </h5>
            <p className="mb-4 text-lg">
              When sealing finishes, the device activates a local Wi Fi hotspot. This AP becomes the only interface the owner can use to interact with the device.
            </p>
            <p className="mb-4 text-lg">
              Device (sealed) → boots → starts WiFi hotspot → exposes minimal configuration UI
            </p>
            <p className="mb-4 text-lg">
              The user connects through a browser or mobile app. The interface exposes only safe operations:
            </p>

            <h6 className="text-base font-semibold text-gray-800 mb-3 mt-4">
              Allowed Functions
            </h6>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-4 text-lg">
              <li>network configuration</li>
              <li>pairing the device with a backend system</li>
              <li>selecting a predefined task or sensor pipeline to run</li>
            </ul>

            <h6 className="text-base font-semibold text-gray-800 mb-3 mt-4">
              Blocked Permanently
            </h6>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-4 text-lg">
              <li>no shell access</li>
              <li>no SSH</li>
              <li>no package installation</li>
              <li>no editing of files</li>
              <li>no OS level modification</li>
            </ul>

            <h6 className="text-base font-semibold text-gray-800 mb-3 mt-4">
              Why This Matters
            </h6>
            <p className="mb-4 text-lg">
              The AP exposes functionality, not the operating system. The user can guide what the device should do, but cannot interfere with how the device performs verifiable execution.
            </p>

            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              III.D.2. The Sandbox Execution Environment
            </h5>
            <p className="mb-4 text-lg">
              The sandbox is the heart of the sealed device. It is the only subsystem allowed to run sensor related code and the only subsystem allowed to instruct the secure element to sign anything.
            </p>
            <p className="mb-4 text-lg">
              Think of the sandbox as: a sealed chamber that accepts only authenticated code from the HyperBEAM TEE backed Attestation Engine and produces verifiable attestation packages.
            </p>
            <p className="mb-4 text-lg">
              The sandbox has three roles:
            </p>
            <ol className="list-decimal list-inside space-y-2 mb-6 ml-4 text-lg">
              <li>Receive approved code</li>
              <li>Validate and lock the code path</li>
              <li>Execute it deterministically under the trusted sensor execution library</li>
            </ol>

            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              III.D.3. Code Receipt
            </h5>
            <p className="mb-4 text-lg">
              The sandbox does not accept code directly from the user. Every code update must pass through the HyperBEAM TEE based Attestation Engine before reaching the device.
            </p>
            <p className="mb-4 text-lg">
              The flow is always:
            </p>
            <p className="mb-4 text-lg font-semibold">
              User → submits code → Attestation Engine → device&apos;s sandbox
            </p>
            <p className="mb-4 text-lg">
              Inside the AE, the following steps occur:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-4 text-lg">
              <li>AE uploads the code to Arweave</li>
              <li>AE computes the code hash</li>
              <li>AE generates a challenge C that is tied to this exact code</li>
              <li>AE sends the package back to the device</li>
            </ul>
            <p className="mb-4 text-lg">
              The full package looks like:
            </p>
            <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-6">
              <code>{`{
  code,
  code_hash,
  challenge_C
}`}</code>
            </pre>
            <p className="mb-4 text-lg">
              The AE also records a permanent entry on chain:
            </p>
            <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-6">
              <code>{`{
  device_pubkey,
  code_hash,
  sealed_status=true
}`}</code>
            </pre>

            <h6 className="text-base font-semibold text-gray-800 mb-3 mt-4">
              Acceptance Rules
            </h6>
            <p className="mb-4 text-lg">
              The sandbox only accepts code if:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-4 text-lg">
              <li>it came from the AE</li>
              <li>the device identity matches the sealed identity</li>
              <li>the AE challenge is present and valid</li>
            </ul>
            <p className="mb-4 text-lg">
              Anything else is rejected immediately.
            </p>

            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              III.D.4. Code Validation
            </h5>
            <p className="mb-4 text-lg">
              Once the package arrives, the sandbox performs strict validation.
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-4 text-lg">
              <li>It verifies the AE signature</li>
              <li>It confirms that the code hash matches the payload</li>
              <li>It stores the code hash internally so that all future attestations can reference the correct code version</li>
            </ul>
            <p className="mb-4 text-lg">
              Only after the validation passes does the sandbox allow execution.
            </p>

            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              III.D.5. Execution Under TSEL
            </h5>
            <p className="mb-4 text-lg">
              Now the sandbox executes the code inside the Trusted Sensor Execution Library (TSEL). TSEL enforces the complete attestation pipeline.
            </p>
            <p className="mb-4 text-lg">
              During execution, TSEL performs:
            </p>
            <ol className="list-decimal list-inside space-y-3 mb-6 ml-4 text-lg">
              <li className="mb-2">
                <strong>Raw origin capture</strong>
                <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mt-2 mb-2 ml-6">
                  <code>{`raw_hash = H(raw_sensor_bytes)`}</code>
                </pre>
              </li>
              <li className="mb-2">
                <strong>Processed output hashing</strong>
                <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mt-2 mb-2 ml-6">
                  <code>{`data_hash = H(processed_output)`}</code>
                </pre>
              </li>
              <li className="mb-2">
                <strong>Origin binding</strong>
                <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mt-2 mb-2 ml-6">
                  <code>{`origin_hash = H(raw_hash || data_hash)`}</code>
                </pre>
              </li>
              <li className="mb-2">
                <strong>Freshness anchoring</strong>
                <p className="ml-6 mt-2">The AE challenge is bound into the attestation</p>
                <p className="ml-6">The device timestamp is included</p>
                <p className="ml-6">TSEL ensures the reading happened after the challenge</p>
              </li>
              <li className="mb-2">
                <strong>Deterministic execution</strong>
                <p className="ml-6 mt-2">The entire code path is deterministic and tied to the stored code hash. No dynamic modification is possible.</p>
              </li>
              <li className="mb-2">
                <strong>Final attestation creation</strong>
                <p className="ml-6 mt-2">TSEL produces the final attestation package:</p>
                <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mt-2 mb-2 ml-6">
                  <code>{`{
  origin_hash,
  raw_hash,
  data_hash,
  code_hash,
  challenge_C,
  timestamp_device
}`}</code>
                </pre>
                <p className="ml-6 mt-2">The secure element signs this structure.</p>
              </li>
              <li className="mb-2">
                <strong>Return to the AE for on chain anchoring</strong>
                <p className="ml-6 mt-2">The attestation is submitted back to the AE.</p>
                <p className="ml-6">The AE anchors it on Arweave for public verification.</p>
              </li>
            </ol>

            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              III.D.6. Why This Architecture Works
            </h5>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-4 text-lg">
              <li>The AP gives minimal safe control without exposing the OS.</li>
              <li>The sandbox is the only path to the secure element.</li>
              <li>The AE is the only source of approved code.</li>
              <li>TSEL is the only code allowed to touch raw sensor bytes.</li>
              <li>Every attestation is tied to a TEE generated challenge.</li>
              <li>Any modification or reflash resets the identity and is rejected by the AE.</li>
            </ul>
            <p className="mb-4 text-lg">
              This combined design creates a pipeline where:
            </p>
            <p className="mb-4 text-lg">
              The owner cannot cheat the system. The Pi cannot escape the sandbox. And the attestation engine cannot be bypassed.
            </p>
            <p className="mb-4 text-lg">
              A Raspberry Pi, even without an onboard TEE, becomes a fully verifiable sensor device because all trust is enforced by sealing locally and by HyperBEAM&apos;s TEE based challenge issuance remotely.
            </p>

            <h4 className="text-xl font-semibold text-gray-800 mb-4 mt-8">
              III.E. Why User Reflashing Does Not Break Security
            </h4>
            
            <p className="mb-4 text-lg">
              Reflashing the SD card is the simplest and most powerful action a device owner can perform. It wipes the operating system, resets the filesystem, and erases everything on disk. In traditional IoT systems, this gives the owner full control, which permanently breaks any possibility of external verification.
            </p>
            
            <p className="mb-4 text-lg">
              In our architecture, reflashing is not an attack vector. It is a self invalidation event.
            </p>
            
            <div className="bg-gray-50 border-l-4 border-gray-400 pl-6 py-4 mb-6">
              <p className="text-lg font-semibold text-gray-800">
                Reflashing does not allow the device to lie. Reflashing destroys its identity.
              </p>
            </div>

            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              III.E.1. What Happens When the User Reflashes
            </h5>
            <p className="mb-4 text-lg">
              The sequence is predictable and fully accounted for in the design.
            </p>
            <p className="mb-4 text-lg font-semibold">
              User reflashes SD card → device boots fresh OS → sealed identity lost
            </p>
            <p className="mb-4 text-lg">
              Specifically:
            </p>

            <h6 className="text-base font-semibold text-gray-800 mb-3 mt-4">
              The Operating System Resets
            </h6>
            <p className="mb-4 text-lg">
              All sealed state is removed. Rootfs immutability is gone. Bootloader protection is lost. The device returns to a pre sealed state.
            </p>

            <h6 className="text-base font-semibold text-gray-800 mb-3 mt-4">
              The Arweave Wallet Inside the Secure Element Becomes Inaccessible
            </h6>
            <p className="mb-4 text-lg">
              The sealed OS contained the only authorized pathway to the secure element. Reflashing removes these pathways, so the wallet cannot be recovered or reused.
            </p>

            <h6 className="text-base font-semibold text-gray-800 mb-3 mt-4">
              The Wallet Address and Device Identity are Effectively Gone Forever
            </h6>
            <p className="mb-4 text-lg">
              A sealed identity is not stored on the SD card. It is bound to the sealed OS behavior. Without the sealed OS, the old identity cannot operate.
            </p>

            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              III.E.2. How the Attestation Engine Detects the Change
            </h5>
            <p className="mb-4 text-lg">
              The HyperBEAM TEE backed Attestation Engine verifies every device request by checking:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-4 text-lg">
              <li>the public device key</li>
              <li>the code hash associated with the sealed state</li>
              <li>the sealed flag</li>
              <li>the registration record on chain</li>
            </ul>
            <p className="mb-4 text-lg">
              After reflashing, none of these values match.
            </p>
            <p className="mb-4 text-lg">
              The AE immediately sees one of the following mismatches:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-4 text-lg">
              <li>PUB_DEV does not match the previous sealed identity</li>
              <li>code_hash does not match the stored value</li>
              <li>sealed_status is now false or missing</li>
              <li>device registration record does not align with runtime state</li>
            </ul>
            <p className="mb-4 text-lg">
              When any mismatch occurs, the AE outputs a simple result:
            </p>
            <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-6">
              <code>{`reject(attestation)`}</code>
            </pre>

            <h5 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              III.E.3. How the Device Appears After Reflashing
            </h5>
            <p className="mb-4 text-lg">
              When a reflashed device tries to interact with the AE, it appears exactly like a brand new board that has never been seen before.
            </p>
            <p className="mb-4 text-lg font-semibold">
              reflashed Pi → AE view: new device with no sealed identity
            </p>
            <p className="mb-4 text-lg">
              The AE forces it to go through the full initialization and sealing flow again. This creates a new identity, a new registration entry, and a new on chain presence.
            </p>
            <p className="mb-4 text-lg font-semibold">
              Nothing from the old identity survives.
            </p>
          </div>
        </section>
      </div>
    </div>
    </>
  );
}

