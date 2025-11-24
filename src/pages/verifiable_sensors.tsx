import React, { useRef, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { Manrope } from "next/font/google";
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
          </div>
        </section>
      </div>
    </div>
    </>
  );
}

