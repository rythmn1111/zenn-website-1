import React, { useRef, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { JetBrains_Mono } from "next/font/google";
import TableOfContentsWallet from "@/components/TableOfContentsWallet";
import BlueprintMarkings from "@/components/BlueprintMarkings";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
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
    if (!isNaN(audio.duration) && audio.duration > 0) {
      setDuration(audio.duration);
      setIsLoaded(true);
    }
  };

  const handleCanPlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!isNaN(audio.duration) && audio.duration > 0 && duration === 0) {
      setDuration(audio.duration);
      setIsLoaded(true);
    }
  };

  const handleLoadedData = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!isNaN(audio.duration) && audio.duration > 0) {
      setDuration(audio.duration);
      setIsLoaded(true);
    }
  };

  React.useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.load();
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
    <div className="w-full max-w-2xl bg-[#0f1b33] border border-blue-400/30 flex items-center px-3 py-2 md:px-4 md:py-3 gap-2 md:gap-3 overflow-hidden">
      <button
        onClick={togglePlay}
        className="flex-shrink-0 w-8 h-8 flex items-center justify-center hover:bg-blue-400/10 rounded-full transition-colors focus:outline-none"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="2" y="1" width="3" height="12" rx="0.5" fill="#67e8f9"/>
            <rect x="9" y="1" width="3" height="12" rx="0.5" fill="#67e8f9"/>
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 1.5V12.5L12 7L3 1.5Z" fill="#67e8f9"/>
          </svg>
        )}
      </button>

      <span className="text-sm md:text-base text-blue-200 font-mono flex-shrink-0 font-semibold">
        {formatTime(currentTime)}
      </span>

      <span className="text-base text-blue-400/50 flex-shrink-0 font-semibold">/</span>

      <span className="text-sm md:text-base text-blue-200 font-mono flex-shrink-0 font-semibold">
        {formatTime(duration)}
      </span>

      <div
        className="flex-1 min-w-0 h-1 bg-blue-400/20 cursor-pointer relative ml-2"
        onClick={handleProgressClick}
      >
        <div
          className="h-1 bg-cyan-400 absolute top-0 left-0 max-w-full"
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

export default function VerifiableWallet() {
  return (
    <>
      <Head>
        <title>Verifiable Wallet</title>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%231a2744'/></svg>" />
      </Head>
      <div className={jetbrainsMono.className + " min-h-screen"} style={{
        backgroundColor: '#1a2744',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}>
      <style jsx global>{`
        html, body {
          scroll-behavior: smooth;
          background-color: #1a2744;
        }
      `}</style>
      <BlueprintMarkings />
      <TableOfContentsWallet />
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 md:px-8 md:py-16">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Image src="./logo.png" alt="Logo" width={48} height={48} />
        </div>

        {/* Title Page */}
        <div className="text-center mb-8 pb-8 md:mb-16 md:pb-16 border-b border-blue-400/30">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight" style={{ textShadow: '0 0 10px rgba(103,232,249,0.3)' }}>
            Verifiable Hardware Wallet
          </h1>
          <p className="text-lg md:text-xl text-blue-200 mb-2">Open Hardware Schematic</p>
          <p className="text-base md:text-lg text-blue-300/70">Author: Rythmn Magnani(Hope)</p>
          <p className="text-sm text-blue-400/50 mt-6 md:mt-8">Draft 1.0</p>
        </div>

        {/* Audio Player */}
        <div className="mb-4 flex flex-col items-center">
          <CustomAudioPlayer src="./audio2.mp3" />
          <p className="text-sm text-blue-300/60 mt-2">[play this while reading]</p>
        </div>

        {/* Abstract */}
        <section id="abstract" className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6" style={{ textShadow: '0 0 8px rgba(103,232,249,0.2)' }}>Abstract</h2>
          <div className="bg-[#0f1b33] border-l-4 border-cyan-400 pl-4 md:pl-6 py-3 md:py-4 mb-4 md:mb-6">
            <p className="text-blue-100 leading-relaxed text-base md:text-lg">
              Every hardware wallet on the market asks you the same thing: <span className="text-cyan-300">trust us</span>. Trust that our firmware is what we say it is. Trust that we didn{"'"}t copy your keys during manufacturing. Trust that our supply chain wasn{"'"}t compromised. This document presents a complete, open hardware wallet design where trust is replaced by verification. The firmware is inspectable before any secrets exist. The device identity is created by the user, not the vendor. The verification tools themselves are hosted on Arweave and are permanently auditable. Every part of the system, from 3D-printed enclosure to firmware source to cryptographic registration, is open, reproducible, and verifiable. This is the full schematic: the problem, the architecture, the verification protocol, the parts list, and the build guide. Everything you need to build it yourself.
            </p>
          </div>
        </section>

        {/* I. Introduction: The Problem */}
        <section id="introduction" className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6" style={{ textShadow: '0 0 8px rgba(103,232,249,0.2)' }}>I. Introduction: The Problem</h2>

          <p className="text-base md:text-base md:text-lg text-blue-100 mb-3 md:mb-4 md:mb-6">
            Hardware wallets are supposed to be the most secure way to store cryptocurrency. You buy a small device, it generates your private keys in isolation, and it signs transactions without ever exposing those keys to a networked computer. That{"'"}s the promise.
          </p>

          <p className="text-base md:text-base md:text-lg text-blue-100 mb-3 md:mb-4 md:mb-6">
            The reality is different. When you receive a hardware wallet from a vendor, you are making a series of trust assumptions that most users never think about:
          </p>

          <div id="the-trust-problem" className="mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-blue-200 mb-3 md:mb-4">I.A. The Trust Problem</h3>

            <p className="text-base md:text-lg text-blue-100 mb-3 md:mb-4">
              When you unbox a Ledger, a Trezor, or any commercial hardware wallet, you are implicitly trusting that:
            </p>

            <ul className="space-y-3 mb-6 ml-4">
              <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                <span><span className="text-cyan-300 font-semibold">The firmware is genuine.</span> The binary running on the chip is actually the open-source code the vendor published, not a modified version with a backdoor, not a version that leaks entropy, not a build that phones home.</span>
              </li>
              <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                <span><span className="text-cyan-300 font-semibold">Your keys were not pre-generated or copied.</span> The device generated your private keys fresh, on-device, using a proper random number generator. Nobody in the factory saw them. No backup was silently stored.</span>
              </li>
              <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                <span><span className="text-cyan-300 font-semibold">The supply chain was not compromised.</span> Between the factory and your doorstep, nobody swapped the device, reflashed the firmware, or implanted hardware modifications.</span>
              </li>
              <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                <span><span className="text-cyan-300 font-semibold">Future firmware updates are safe.</span> When the vendor pushes an update, it does what they say it does and nothing more.</span>
              </li>
            </ul>

            <p className="text-base md:text-lg text-blue-100 mb-3 md:mb-4">
              These are not hypothetical concerns. There have been cases where hardware wallet devices were intercepted and modified in transit before reaching the buyer. Firmware vulnerabilities have been discovered in popular wallets that could extract seed phrases. In one well-known incident, a major hardware wallet company pushed a firmware update that introduced key extraction capabilities, something users never asked for and many actively opposed.
            </p>
          </div>

          <div id="why-verify" className="mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-blue-200 mb-3 md:mb-4">I.B. Why {"\""}Just Trust Us{"\""} Is Not Enough</h3>

            <p className="text-base md:text-lg text-blue-100 mb-3 md:mb-4">
              The fundamental issue is that existing hardware wallets are <span className="text-cyan-300 font-semibold">black boxes</span>. Even when the firmware source code is open, you have no practical way to confirm that the binary on your specific device matches that source code. The verification gap looks like this:
            </p>

            <div className="bg-[#0f1b33] border border-blue-400/20 p-3 md:p-6 mb-4 md:mb-6 font-mono text-xs md:text-sm overflow-x-auto">
              <p className="text-blue-300 mb-2">{"  "}Open Source Code {"  "}──{">"} Vendor Builds Binary ──{">"} Ships Device</p>
              <p className="text-blue-300 mb-2">{"       "}(visible) {"        "}(invisible) {"       "}(sealed)</p>
              <p className="text-blue-400/60 mt-4 mb-2">{"  "}You can read the code.</p>
              <p className="text-blue-400/60 mb-2">{"  "}You cannot verify the build.</p>
              <p className="text-blue-400/60">{"  "}You cannot inspect what{"'"}s running.</p>
            </div>

            <p className="text-base md:text-lg text-blue-100 mb-3 md:mb-4">
              Even {"\""}reproducible builds{"\""}, where you can compile the source and get the same binary, don{"'"}t fully solve this. You still can{"'"}t read the flash memory of most commercial wallets to compare, because flash encryption is enabled from the factory. The device is locked before you ever touch it.
            </p>
          </div>

          <div id="a-different-approach" className="mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-blue-200 mb-3 md:mb-4">I.C. A Different Approach</h3>

            <p className="text-base md:text-lg text-blue-100 mb-3 md:mb-4">
              This project takes a fundamentally different approach. Instead of asking users to trust the device, it gives them the tools to verify it. The core principle is:
            </p>

            <div className="bg-[#0f1b33] border-l-4 border-cyan-400 pl-4 md:pl-6 py-3 md:py-4 mb-4 md:mb-6">
              <p className="text-cyan-300 text-lg md:text-xl font-semibold leading-relaxed">
                Verify the firmware first. Create the identity second. Lock the hardware third.
              </p>
            </div>

            <p className="text-base md:text-lg text-blue-100 mb-3 md:mb-4">
              The device ships with flash encryption <span className="text-cyan-300">off</span>. This means you can read exactly what{"'"}s on the chip. You compare it against the published firmware in an AO based registry. Only after you{"'"}ve confirmed the firmware is genuine does the device generate keys and create its cryptographic identity. Only then does it lock itself with flash encryption and eFuse burns, permanently sealing the verified state.
            </p>

            <p className="text-base md:text-lg text-blue-100 mb-3 md:mb-4">
              The verification website is hosted on Arweave, immutable, publicly inspectable, and cannot be silently changed. Both the firmware registry and the device registration record live on AO. <span className="text-cyan-300 font-semibold">Even the tools you use to verify the wallet can themselves be verified.</span>
            </p>

            <p className="text-base md:text-lg text-blue-100">
              The rest of this document explains exactly how all of this works.
            </p>
          </div>
        </section>

        {/* II. Terminologies */}
        <section id="section-ii" className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6" style={{ textShadow: '0 0 8px rgba(103,232,249,0.2)' }}>II. Terminologies</h2>
          <p className="text-base md:text-lg text-blue-100 mb-6 md:mb-8">
            Before diving into how the wallet works, it helps to understand a few hardware terms.
          </p>

          {/* II.A Secure Boot */}
          <div id="secure-boot" className="mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-blue-200 mb-3 md:mb-4">II.A. Secure Boot</h3>
            <p className="text-base md:text-lg text-blue-100 mb-3 md:mb-4">
              Secure Boot makes sure the device only runs software that is approved or signed by a particular entity. It ensures no one without a specific signature can upload or update the firmware.
            </p>
            <p className="text-base md:text-lg text-blue-200 font-semibold mb-2 md:mb-3">Without Secure Boot, someone could:</p>
            <ul className="space-y-2 mb-6 ml-4">
              <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                <span>Replace the firmware</span>
              </li>
              <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                <span>Insert malicious code</span>
              </li>
              <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                <span>Trick the device into running something else</span>
              </li>
            </ul>
            <p className="text-base md:text-lg text-blue-200 font-semibold mb-2 md:mb-3">With Secure Boot enabled:</p>
            <ul className="space-y-2 mb-6 ml-4">
              <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                <span>The device won{"'"}t run modified or unsigned firmware</span>
              </li>
              <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                <span>The boot process cannot be silently hijacked</span>
              </li>
            </ul>
            <div className="bg-[#0f1b33] border-l-4 border-cyan-400 pl-4 md:pl-6 py-3 md:py-4 mb-4 md:mb-6">
              <p className="text-cyan-300 font-semibold text-base md:text-lg">
                In our wallet: Secure Boot ensures that once firmware is approved and locked, the device cannot later be forced to run unapproved code.
              </p>
            </div>
          </div>

          {/* II.B Flash Encryption */}
          <div id="flash-encryption" className="mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-blue-200 mb-3 md:mb-4">II.B. Flash Encryption</h3>
            <p className="text-base md:text-lg text-blue-100 mb-3 md:mb-4">
              Flash Encryption scrambles everything stored inside the device so it cannot be read directly. It is an encryption applied silicon-wise, even on RAM.
            </p>
            <div className="bg-[#0f1b33] border border-blue-400/20 p-3 md:p-6 mb-4 md:mb-6 font-mono text-xs md:text-sm overflow-x-auto">
              <p className="text-blue-300 mb-1">{"  "}Think of it like storing all internal data in a locked safe.</p>
              <p className="text-blue-400/60 mb-1">{"  "}- Even if someone removes the storage chip</p>
              <p className="text-blue-400/60 mb-1">{"  "}- or physically reads the memory</p>
              <p className="text-blue-400/60">{"  "}- all they see is unreadable garbage</p>
            </div>
            <p className="text-base md:text-lg text-blue-200 font-semibold mb-2 md:mb-3">Without Flash Encryption:</p>
            <ul className="space-y-2 mb-6 ml-4">
              <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                <span>Secrets stored in memory could be copied</span>
              </li>
              <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                <span>Keys could be cloned</span>
              </li>
              <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                <span>Device identity could be stolen</span>
              </li>
            </ul>
            <p className="text-base md:text-lg text-blue-200 font-semibold mb-2 md:mb-3">With Flash Encryption:</p>
            <ul className="space-y-2 mb-6 ml-4">
              <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                <span>Secrets are bound to the physical device</span>
              </li>
              <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                <span>Copying memory does not copy identity</span>
              </li>
            </ul>
            <div className="bg-[#0f1b33] border-l-4 border-cyan-400 pl-4 md:pl-6 py-3 md:py-4 mb-4 md:mb-6">
              <p className="text-cyan-300 font-semibold text-base md:text-lg">
                In our wallet: Flash Encryption is enabled <span className="text-white">after</span> the user verifies firmware and registers the device. This locks the verified state in place and protects wallet secrets going forward.
              </p>
            </div>
          </div>

          {/* II.C eFuse Burn */}
          <div id="efuse-burn" className="mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-blue-200 mb-3 md:mb-4">II.C. eFuse Burn</h3>
            <p className="text-base md:text-lg text-blue-100 mb-3 md:mb-4">
              An eFuse is a tiny, one-time programmable switch inside the chip. When an eFuse is {"\""}burned{"\""}:
            </p>
            <ul className="space-y-2 mb-6 ml-4">
              <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                <span>It permanently changes state</span>
              </li>
              <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                <span>It cannot be undone</span>
              </li>
              <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                <span>It survives resets, power loss, and firmware updates</span>
              </li>
            </ul>
            <div className="bg-[#0f1b33] border border-blue-400/20 p-3 md:p-6 mb-4 md:mb-6 font-mono text-xs md:text-sm overflow-x-auto">
              <p className="text-blue-300 mb-1">{"  "}Burning an eFuse is like snapping off a physical switch inside the chip.</p>
              <p className="text-blue-400/60 mb-1">{"  "}Once it{"'"}s snapped:</p>
              <p className="text-blue-400/60 mb-1">{"  "}- there is no software command that can turn it back on</p>
              <p className="text-blue-400/60">{"  "}- even the manufacturer can{"'"}t reverse it</p>
            </div>
            <p className="text-base md:text-lg text-blue-200 font-semibold mb-2 md:mb-3">eFuses are used for:</p>
            <ul className="space-y-2 mb-6 ml-4">
              <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                <span>Enabling Secure Boot permanently</span>
              </li>
              <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                <span>Enabling Flash Encryption permanently</span>
              </li>
              <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                <span>Marking a device as {"\""}locked{"\""} or {"\""}registered{"\""}
                </span>
              </li>
            </ul>
            <p className="text-base md:text-lg text-blue-100 mb-3 md:mb-4">
              eFuses prevent rollback attacks such as disabling encryption later, re-entering setup mode, or replacing firmware after identity creation.
            </p>
            <div className="bg-[#0f1b33] border-l-4 border-cyan-400 pl-4 md:pl-6 py-3 md:py-4 mb-4 md:mb-6">
              <p className="text-cyan-300 font-semibold text-base md:text-lg">
                In our wallet: eFuses are used to permanently lock the device after registration, ensure security settings cannot be undone, and guarantee that the verified and registered state is final.
              </p>
            </div>
          </div>
        </section>

        {/* III. Components Overview */}
        <section id="section-iii" className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6" style={{ textShadow: '0 0 8px rgba(103,232,249,0.2)' }}>III. Components Overview</h2>
          <p className="text-base md:text-lg text-blue-100 mb-6 md:mb-8">
            This hardware wallet is {"\""}verifiable{"\""} because a user can independently confirm, using open and reproducible processes, that the firmware is exactly what they intended, the identity is created only after verification, and the device is locked immediately after registration.
          </p>

          {/* III.A Hardware Architecture */}
          <div id="hardware-arch" className="mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-blue-200 mb-3 md:mb-4">III.A. Hardware Architecture</h3>
            <p className="text-base md:text-lg text-blue-100 mb-3 md:mb-4">
              The wallet uses two ESP32-S3 chips:
            </p>
            <div className="bg-[#0f1b33] border border-blue-400/20 p-4 md:p-6 mb-4 md:mb-6">
              <p className="text-cyan-300 font-semibold text-base md:text-lg mb-2 md:mb-3">Vault ESP32-S3 (Security Domain)</p>
              <ul className="space-y-2 ml-4 mb-6">
                <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                  <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                  <span>Generates and stores Arweave wallet secrets (private keys)</span>
                </li>
                <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                  <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                  <span>Encrypts secrets under user credentials (PIN/passphrase)</span>
                </li>
                <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                  <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                  <span>Performs signing operations internally</span>
                </li>
                <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                  <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                  <span>Never exposes private keys externally</span>
                </li>
                <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                  <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                  <span>Flash Encrypted</span>
                </li>
              </ul>
              <p className="text-cyan-300 font-semibold text-base md:text-lg mb-2 md:mb-3">Interface ESP32-S3 (UI/IO Domain)</p>
              <ul className="space-y-2 ml-4">
                <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                  <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                  <span>Camera (QR scan)</span>
                </li>
                <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                  <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                  <span>Display (QR render)</span>
                </li>
                <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                  <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                  <span>User input and interaction</span>
                </li>
                <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                  <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                  <span>Communication with website (via QR/USB/etc.)</span>
                </li>
                <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                  <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                  <span>Sends requests to vault (e.g., {"\""}sign this{"\""}), receives signatures/public info</span>
                </li>
                <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                  <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                  <span>Flash Encrypted</span>
                </li>
              </ul>
            </div>
          </div>

          {/* III.B Web Verification Client */}
          <div id="web-verification" className="mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-blue-200 mb-3 md:mb-4">III.B. Web Verification Client</h3>
            <p className="text-base md:text-lg text-blue-100 mb-3 md:mb-4">
              Before the user uses the hardware wallet, they can verify that the firmware running on the hardware is the right one. <span className="text-cyan-300 font-semibold">In this stage, flash encryption is not enabled</span>, so the user can read the memory and confirm the firmware. Also, without flash encryption, keys are not generated.
            </p>
            <p className="text-base md:text-lg text-blue-100 mb-3 md:mb-4">
              The user interacts with an <span className="text-cyan-300">open-source website hosted on Arweave</span>. Since it is stored on Arweave, the exact web code is publicly inspectable and can be pinned to immutable content identifiers. Users can self-host or locally run the same code if they want.
            </p>
          </div>

          {/* III.C AO Firmware Registry */}
          <div id="firmware-registry" className="mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-blue-200 mb-3 md:mb-4">III.C. AO Firmware Registry</h3>
            <p className="text-base md:text-lg text-blue-100 mb-3 md:mb-4">
              An AO-based firmware registry stores:
            </p>
            <ul className="space-y-2 mb-6 ml-4">
              <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                <span>Firmware <span className="text-cyan-300 font-semibold">source code</span></span>
              </li>
              <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                <span>The <span className="text-cyan-300 font-semibold">build process</span> (how to produce a binary from the source)</span>
              </li>
              <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                <span>The resulting firmware <span className="text-cyan-300 font-semibold">binary</span></span>
              </li>
              <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                <span>Firmware <span className="text-cyan-300 font-semibold">hash(es)</span> and metadata</span>
              </li>
            </ul>
            <p className="text-base md:text-lg text-blue-100 mb-3 md:mb-4">
              This allows verification through either trusting the registry{"'"}s published binary hash, or reproducing the binary from source independently and comparing.
            </p>
          </div>

          {/* III.D AO Device Registration Registry */}
          <div id="device-registry" className="mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-blue-200 mb-3 md:mb-4">III.D. AO Device Registration Registry</h3>
            <p className="text-base md:text-lg text-blue-100 mb-3 md:mb-4">
              A separate AO table stores:
            </p>
            <ul className="space-y-2 mb-6 ml-4">
              <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                <span>Device public key (device identity)</span>
              </li>
              <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                <span>Registration challenge (nonce, context)</span>
              </li>
              <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                <span>Signature proving the device generated the identity</span>
              </li>
              <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                <span>Firmware hash used during registration</span>
              </li>
            </ul>
            <p className="text-base md:text-lg text-blue-100">
              This provides a permanent, public record of device registration and the verified firmware state at registration time.
            </p>
          </div>
        </section>

        {/* IV. Step 1: Firmware Verification */}
        <section id="section-iv" className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6" style={{ textShadow: '0 0 8px rgba(103,232,249,0.2)' }}>IV. Step 1: Firmware Verification</h2>
          <p className="text-base md:text-base md:text-lg text-blue-100 mb-3 md:mb-4 md:mb-6">
            Firmware verification happens <span className="text-cyan-300 font-semibold">before any keys exist</span> on the device.
          </p>

          {/* IV.A Starting Device State */}
          <div id="starting-state" className="mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-blue-200 mb-3 md:mb-4">IV.A. Starting Device State</h3>
            <p className="text-base md:text-lg text-blue-100 mb-3 md:mb-4">
              On first boot / initial setup:
            </p>
            <div className="bg-[#0f1b33] border border-blue-400/20 p-3 md:p-6 mb-4 md:mb-6 font-mono text-xs md:text-sm overflow-x-auto">
              <p className="text-cyan-300 mb-1">{"  "}Secure Boot: {"    "}<span className="text-green-400">ON</span></p>
              <p className="text-cyan-300 mb-1">{"  "}Flash Encryption: <span className="text-red-400">OFF</span></p>
              <p className="text-cyan-300 mb-1">{"  "}Device Identity: <span className="text-red-400">NONE</span></p>
              <p className="text-cyan-300">{"  "}Wallet Keys: {"   "}<span className="text-red-400">NONE</span></p>
            </div>
            <p className="text-base md:text-lg text-blue-100">
              This is intentional: the device is in a <span className="text-cyan-300">transparent inspection state</span> before becoming {"\""}owned{"\""}.
            </p>
          </div>

          {/* IV.B Verification Mechanism */}
          <div id="verification-mechanism" className="mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-blue-200 mb-3 md:mb-4">IV.B. Verification Mechanism</h3>
            <p className="text-base md:text-lg text-blue-100 mb-3 md:mb-4">
              The user must be able to answer: <span className="text-cyan-300 italic">{"\""}Is the device running exactly the firmware I expect?{"\""}
              </span>
            </p>
            <div className="bg-[#0f1b33] border border-blue-400/20 p-3 md:p-6 mb-4 md:mb-6 font-mono text-xs md:text-sm overflow-x-auto">
              <p className="text-blue-300 mb-1">{"  "}1. User visits the Arweave-hosted verification website</p>
              <p className="text-blue-300 mb-1">{"  "}2. User plugs in / connects the device</p>
              <p className="text-blue-300 mb-1">{"  "}3. Website reads firmware binary (or hash) from device</p>
              <p className="text-blue-300 mb-1">{"  "}4. Website fetches expected firmware from AO registry</p>
              <p className="text-blue-300">{"  "}5. Comparison: device firmware == registry firmware</p>
            </div>
            <p className="text-base md:text-lg text-blue-100 mb-3 md:mb-4">
              If it matches, the user has cryptographic confirmation that the device is running the published firmware.
            </p>
          </div>

          {/* IV.C Trust-Minimized Option */}
          <div id="trust-minimized" className="mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-blue-200 mb-3 md:mb-4">IV.C. Trust-Minimized Option</h3>
            <p className="text-base md:text-lg text-blue-100 mb-3 md:mb-4">
              If the user distrusts any part of the system (the registry, the website, or the vendor), they can:
            </p>
            <ul className="space-y-2 mb-6 ml-4">
              <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                <span>Download firmware source code</span>
              </li>
              <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                <span>Build the binary independently</span>
              </li>
              <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                <span>Read the device binary using independent tooling</span>
              </li>
              <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                <span>Compare locally</span>
              </li>
            </ul>
            <div className="bg-[#0f1b33] border-l-4 border-cyan-400 pl-4 md:pl-6 py-3 md:py-4 mb-4 md:mb-6">
              <p className="text-cyan-300 font-semibold text-base md:text-lg">
                This makes Step 1 verifiable even under a {"\""}trust nobody{"\""} model.
              </p>
            </div>
          </div>

          {/* IV.D Why Secure Boot Matters Here */}
          <div id="secure-boot-matters" className="mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-blue-200 mb-3 md:mb-4">IV.D. Why Secure Boot Matters Here</h3>
            <p className="text-base md:text-lg text-blue-100 mb-3 md:mb-4">
              Secure Boot helps ensure that the device is not booting arbitrary unsigned firmware. Combined with the explicit binary comparison, the user can verify both:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                <span>{"\""}What firmware is currently present{"\""}
                </span>
              </li>
              <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                <span>{"\""}That it is the expected firmware, not a modified fork{"\""}
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* V. Step 2: Device Registration */}
        <section id="section-v" className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6" style={{ textShadow: '0 0 8px rgba(103,232,249,0.2)' }}>V. Step 2: Device Registration</h2>
          <p className="text-base md:text-base md:text-lg text-blue-100 mb-3 md:mb-4 md:mb-6">
            After the user has verified the firmware, they register the device so that it gets a cryptographic identity, publicly recorded on AO, bound to the verified firmware hash.
          </p>

          {/* V.A Why Identity Is Not Pre-Installed */}
          <div id="no-preinstall" className="mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-blue-200 mb-3 md:mb-4">V.A. Why Identity Is Not Pre-Installed</h3>
            <p className="text-base md:text-lg text-blue-100 mb-3 md:mb-4">
              If a vendor pre-installs keys, the user cannot be sure the vendor (or attacker) didn{"'"}t copy them. This wallet flips the model:
            </p>
            <div className="bg-[#0f1b33] border-l-4 border-cyan-400 pl-4 md:pl-6 py-3 md:py-4 mb-4 md:mb-6">
              <p className="text-cyan-300 text-lg md:text-xl font-semibold leading-relaxed">
                The user creates the device identity themselves, after verifying firmware.
              </p>
            </div>
          </div>

          {/* V.B Registration Challenge */}
          <div id="registration-challenge" className="mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-blue-200 mb-3 md:mb-4">V.B. Registration Challenge</h3>
            <p className="text-base md:text-lg text-blue-100 mb-3 md:mb-4">
              The website generates a one-time registration challenge (QR):
            </p>
            <pre className="bg-[#0a1628] text-blue-200 p-3 md:p-4 rounded-lg overflow-x-auto mb-4 md:mb-6 border border-blue-400/20 text-xs md:text-sm">
              <code>{`{
  purpose: "device-registration",
  nonce: <random unique value>,
  timestamp: <current time>,
  firmware_hash: <hash of firmware verified in Step 1>
}`}</code>
            </pre>
            <p className="text-base md:text-lg text-blue-100">
              The device scans the QR and shows the challenge to the user on-screen for confirmation.
            </p>
          </div>

          {/* V.C Identity Creation and Signature */}
          <div id="identity-creation" className="mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-blue-200 mb-3 md:mb-4">V.C. Identity Creation and Signature</h3>
            <p className="text-base md:text-lg text-blue-100 mb-3 md:mb-4">
              After user confirmation, the device:
            </p>
            <div className="bg-[#0f1b33] border border-blue-400/20 p-3 md:p-6 mb-4 md:mb-6 font-mono text-xs md:text-sm overflow-x-auto">
              <p className="text-blue-300 mb-1">{"  "}1. Generates a device private key (kept secret)</p>
              <p className="text-blue-300 mb-1">{"  "}2. Derives a device public key (shareable)</p>
              <p className="text-blue-300 mb-3">{"  "}3. Signs the registration statement:</p>
              <p className="text-cyan-300">{"  "}signature = SIGN(device_private_key, purpose || nonce || timestamp || firmware_hash)</p>
            </div>
          </div>

          {/* V.D Registration Proof */}
          <div id="registration-proof" className="mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-blue-200 mb-3 md:mb-4">V.D. Registration Proof and AO Record</h3>
            <p className="text-base md:text-lg text-blue-100 mb-3 md:mb-4">
              The device displays a response QR containing the device public key, the challenge fields, and the signature. The website verifies the signature and then writes to AO:
            </p>
            <pre className="bg-[#0a1628] text-blue-200 p-3 md:p-4 rounded-lg overflow-x-auto mb-4 md:mb-6 border border-blue-400/20 text-xs md:text-sm">
              <code>{`{
  device_id: hash(public_key),
  public_key,
  firmware_hash,
  nonce,
  signature,
  registered_at
}`}</code>
            </pre>
          </div>

          {/* V.E Why Replay Does Not Work */}
          <div id="anti-replay" className="mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-blue-200 mb-3 md:mb-4">V.E. Why Replay Does Not Work</h3>
            <p className="text-base md:text-lg text-blue-100">
              A fake device cannot {"\""}replay{"\""} the registration later because registration is a <span className="text-cyan-300 font-semibold">one-time challenge</span>. Even if registration data is public, it is not proof of current possession. Future checks require fresh challenges.
            </p>
          </div>
        </section>

        {/* VI. Step 3: Locking the Device */}
        <section id="section-vi" className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6" style={{ textShadow: '0 0 8px rgba(103,232,249,0.2)' }}>VI. Step 3: Locking the Device</h2>
          <p className="text-base md:text-base md:text-lg text-blue-100 mb-3 md:mb-4 md:mb-6">
            Immediately after successful registration, the device becomes tamper-resistant: secrets and internal state become impossible to extract, the identity key cannot be swapped, and firmware state cannot be silently altered.
          </p>

          {/* VI.A Mechanism */}
          <div id="locking-mechanism" className="mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-blue-200 mb-3 md:mb-4">VI.A. Locking Mechanism</h3>
            <p className="text-base md:text-lg text-blue-100 mb-3 md:mb-4">
              Right after registration completes, the device:
            </p>
            <div className="bg-[#0f1b33] border border-blue-400/20 p-3 md:p-6 mb-4 md:mb-6 font-mono text-xs md:text-sm overflow-x-auto">
              <p className="text-blue-300 mb-1">{"  "}1. Enables <span className="text-cyan-300">Flash Encryption</span></p>
              <p className="text-blue-300 mb-1">{"  "}2. Marks itself as <span className="text-cyan-300">locked</span></p>
              <p className="text-blue-300">{"  "}3. Reboots into <span className="text-cyan-300">operational mode</span></p>
            </div>
            <p className="text-base md:text-lg text-blue-100">
              The system transitions from <span className="text-cyan-300">{"\""}transparent setup{"\""}
              </span> to <span className="text-cyan-300">{"\""}secure wallet{"\""}</span>.
            </p>
          </div>

          {/* VI.B Why Flash Encryption Is Delayed */}
          <div id="delayed-encryption" className="mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-blue-200 mb-3 md:mb-4">VI.B. Why Flash Encryption Is Delayed</h3>
            <p className="text-base md:text-lg text-blue-100 mb-3 md:mb-4">
              If flash encryption were enabled from the factory:
            </p>
            <ul className="space-y-2 mb-6 ml-4">
              <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                <span>A user would have difficulty auditing what is running</span>
              </li>
              <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                <span>Verification could become trust-based instead of proof-based</span>
              </li>
            </ul>
            <p className="text-base md:text-lg text-blue-100 mb-3 md:mb-4">
              By delaying encryption until after Step 1 and Step 2:
            </p>
            <div className="bg-[#0f1b33] border border-blue-400/20 p-3 md:p-6 mb-4 md:mb-6 font-mono text-xs md:text-sm overflow-x-auto">
              <p className="text-blue-300 mb-1">{"  "}1. User verifies the firmware first</p>
              <p className="text-blue-300 mb-1">{"  "}2. User creates identity</p>
              <p className="text-blue-300">{"  "}3. Device locks, preserving that verified state</p>
            </div>
          </div>
        </section>

        {/* VII. Operational Verification */}
        <section id="section-vii" className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6" style={{ textShadow: '0 0 8px rgba(103,232,249,0.2)' }}>VII. Operational Verification</h2>
          <p className="text-base md:text-base md:text-lg text-blue-100 mb-3 md:mb-4 md:mb-6">
            Even though the logs are public, <span className="text-cyan-300 font-semibold">public logs are not enough to prove possession</span>. To prove a device is the same one later, you use a fresh challenge.
          </p>

          {/* VII.A Fresh Challenge-Response */}
          <div id="fresh-challenge" className="mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-blue-200 mb-3 md:mb-4">VII.A. Fresh Challenge-Response</h3>
            <p className="text-base md:text-lg text-blue-100 mb-3 md:mb-4">
              At any time after registration:
            </p>
            <div className="bg-[#0f1b33] border border-blue-400/20 p-3 md:p-6 mb-4 md:mb-6 font-mono text-xs md:text-sm overflow-x-auto">
              <p className="text-blue-300 mb-1">{"  "}1. Verifier reads public_key from AO for a target device_id</p>
              <p className="text-blue-300 mb-1">{"  "}2. Verifier generates a new random challenge (nonce, timestamp)</p>
              <p className="text-blue-300 mb-1">{"  "}3. Device signs it:</p>
              <p className="text-cyan-300 mb-1">{"     "}sig = SIGN(device_private_key, nonce || timestamp || purpose)</p>
              <p className="text-blue-300">{"  "}4. Verifier checks signature using public key from AO</p>
            </div>
            <div className="bg-[#0f1b33] border-l-4 border-cyan-400 pl-4 md:pl-6 py-3 md:py-4 mb-4 md:mb-6">
              <p className="text-cyan-300 font-semibold text-base md:text-lg">
                This proves: {"\""}This physical device currently possesses the same private key that registered earlier.{"\""}
              </p>
            </div>
          </div>

          {/* VII.B Why Replay Devices Fail */}
          <div id="replay-fail" className="mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-blue-200 mb-3 md:mb-4">VII.B. Why Replay Devices Fail</h3>
            <p className="text-base md:text-base md:text-lg text-blue-100 mb-3 md:mb-4 md:mb-6">
              A replay-only fake device can copy old AO data, but it cannot sign a <span className="text-cyan-300 font-semibold">new</span> challenge it has never seen. Therefore it cannot prove possession.
            </p>
          </div>

          {/* VII.C Why This Is Verifiable */}
          <div id="why-verifiable" className="mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-blue-200 mb-3 md:mb-4">VII.C. Why This Is {"\""}Verifiable{"\""} Compared to Typical Wallets</h3>
            <p className="text-base md:text-lg text-blue-100 mb-3 md:mb-4">
              Most hardware wallets require trusting the vendor that firmware is what they say it is, keys were not copied, and production wasn{"'"}t compromised. This design reduces those trust requirements by giving users:
            </p>
            <ul className="space-y-3 mb-6 ml-4">
              <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                <span>A reproducible firmware verification path</span>
              </li>
              <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                <span>A visible, auditable registration ceremony</span>
              </li>
              <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                <span>An AO-backed immutable registry of both firmware and identity binding</span>
              </li>
              <li className="text-base md:text-lg text-blue-100 flex items-start gap-2 md:gap-3">
                <span className="text-cyan-400 mt-1.5 flex-shrink-0">&#9656;</span>
                <span>A locked operational mode only after verification and identity creation</span>
              </li>
            </ul>
          </div>
        </section>

        {/* VIII. Build Your Own */}
        <section id="section-viii" className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6" style={{ textShadow: '0 0 8px rgba(103,232,249,0.2)' }}>VIII. Build Your Own</h2>
          <p className="text-base md:text-base md:text-lg text-blue-100 mb-3 md:mb-4 md:mb-6">
            All the implementation details, firmware source code, build instructions, wiring diagrams, and everything you need to build your own verifiable hardware wallet from scratch are available in the open-source repository:
          </p>
          <div className="bg-[#0f1b33] border border-blue-400/20 p-5 md:p-8 text-center">
            <a
              href="https://github.com/rythmn1111/verifiable_wallet"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-300 text-lg md:text-2xl font-bold hover:text-white transition-colors break-all"
              style={{ textShadow: '0 0 10px rgba(103,232,249,0.3)' }}
            >
              github.com/rythmn1111/verifiable_wallet
            </a>
            <p className="text-blue-300/60 text-sm mt-3">
              Firmware, schematics, verification tools, and step-by-step build guide.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-blue-400/30 text-center">
          <p className="text-base text-blue-300/70 mb-2">
            Want to critic? Or see any mistake? Write here:
          </p>
          <a
            href="https://github.com/rythmn1111/zenn-website-1/blob/master/src/pages/verifiable_wallet.tsx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 underline text-base"
          >
            GitHub
          </a>
        </footer>
      </div>
    </div>
    </>
  );
}
