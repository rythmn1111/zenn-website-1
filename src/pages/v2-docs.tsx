import React, { useRef, useState } from "react";
import Image from "next/image";
import { Manrope } from "next/font/google";
import {  Sparkles } from "lucide-react";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500"],
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

export default function V2Docs() {
  return (
    <div className={manrope.className + " min-h-screen bg-white flex flex-col items-center pt-8"}>
      {/* Logo */}
      <div className="mb-8">
        <Image src="./logo.png" alt="farza" width={48} height={48} />
      </div>
      
      {/* Audio Player */}
      <div className="w-full max-w-2xl px-4 flex justify-center mb-8">
        <CustomAudioPlayer src="./audio.mp3" />
      </div>
      
      {/* Content */}
      <div className="w-full max-w-2xl px-4 text-gray-500 text-xl font-semibold lowercase">
        <p className="mb-6">[hi play above track as you read this]</p>
        <p className="mb-6 flex items-center gap-2 text-2xl">
          <Sparkles size={20} color="#6b7280" strokeWidth={2} /> our vision
        </p>
        <Image src="./rpi.png" alt="aot" width={1000} height={1000} className="mb-6" />
        <p className="mb-4 normal-case">a hardware device that runs a custom OS, purpose-built for AO. out of the box, you can plug in any sensor — temperature, mic, GPS — and it&apos;s instantly AO-compatible. no bridges, no glue code, no weird setups.</p>
        <p className="mb-4 normal-case">now imagine a mesh of these devices: a decentralized network of sensors running trustless processes at the edge. when idle, they become compute nodes, earning through HyperBEAM by offering spare cycles.</p>
        <p className="mb-4 normal-case">this isn&apos;t just hardware — it&apos;s the first trustless IoT computer. a unified, plug-and-play platform for building the permaweb of things.</p>
      </div>
    </div>
  );
}


