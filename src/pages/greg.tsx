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

export default function Greg() {
  return (
    <div className={manrope.className + " min-h-screen bg-white flex flex-col items-center pt-8"}>
      {/* Logo */}
      <div className="mb-8">
        <Image src="/logo.png" alt="farza" width={48} height={48} />
      </div>
      
      {/* Audio Player */}
      <div className="w-full max-w-2xl px-4 flex justify-center mb-8">
        <CustomAudioPlayer src="/audio.mp3" />
      </div>
      
      {/* Content */}
      <div className="w-full max-w-2xl px-4 text-gray-500 text-xl font-semibold lowercase">
        <p className="mb-6">[hi play above track as you read this]</p>
        <p className="mb-2">true trustless hardware.</p>
        <p className="mb-6">by: hope.<br/></p>
        <div className="mb-6">
          <ol className="list-decimal list-inside">
            <li className="mb-2">current implementation
              <ul className="list-disc list-inside ml-6 font-normal">
                <li>how aura works now</li>
                <li>what&apos;s broken</li>
              </ul>
            </li>
            <li className="mb-2">new approach
              <ul className="list-disc list-inside ml-6 font-normal">
                <li>the vision</li>
                <li>aot: the permaweb of things</li>
                <li>blockchain ball: v2</li>
              </ul>
            </li>
            <li>timeline</li>
          </ol>
        </div>
        <div className="mb-6 text-gray-500 text-xl font-semibold lowercase">
          <hr />
          <h4 className="text-lg font-semibold mb-6 mt-6">1) how aura works right now</h4>
          <p className="mb-6">mqtt is like a walkie-talkie system for devices — they talk into a &quot;topic&quot; and anyone tuned in hears it.<br/> <br />our setup uses mqtt to bridge our iot device and an ao process.</p>
          <br /><p className="mb-2">here&apos;s what actually happens:</p>
          <br /><ul className="list-disc list-inside mb-2">
            <li>device sends an mqtt message to our express server</li>
            <li>message is a json: {'{'} data, back-channel, process-id {'}'}</li>
            <li>express forwards this to the ao <span className="font-semibold">mother process</span></li>
            <li>mother has <span className="font-semibold">handlers</span> that forward it to the correct <span className="font-semibold">destination process</span></li>
            <li>destination process replies with {'{'} data, target-mqtt-channel {'}'}</li>
            <li>express constantly polls, then publishes that data to the mqtt topic</li>
          </ul>
          <br />
          <Image src="/aura.jpg" alt="aura" width={1000} height={1000} />
          <br /><p className="mb-2">it works. <br />but it&apos;s clunky...</p>

          <br /><p className="mb-2">what&apos;s broken?</p>
          <br /><p className="mb-2">~ everything&apos;s fragmented: mqtt, ao, server logic = 3 separate mental models. </p>
          <br /><p className="mb-2">~ everything has to be signed from one wallet.</p>
          <br /><p className="mb-2">~ messy to scale.</p>
          <br /><p className="mb-2">~ just adding a simple feature, like pushing data to a webpage or a database, means rewriting the bridge, handlers, mqtt logic, maybe even the AO process. it&apos;s like open-heart surgery for a system change.</p>
          <br /><hr />
          <br />
          <p className="mb-2 flex items-center gap-2"><Sparkles size={20} color="#6b7280" strokeWidth={2} /> 2. the future <Sparkles size={20} color="#6b7280" strokeWidth={2} /></p>
          <br /><p className="mb-2 flex items-center gap-2">imagine this :</p>
          <br /><Image src="/rpi.png" alt="aot" width={1000} height={1000} />
          
          <br /><p className="mb-2 flex items-center gap-2">a hardware device that runs a custom OS, purpose-built for AO.  
out of the box, you can plug in any sensor, temperature, mic, GPS, anything, and it&apos;s instantly AO-compatible. no bridges, no glue code, no weird setups.
</p>
<br /> <p className="mb-2 flex items-center gap-2 normal-case">now imagine a mesh of these devices, a decentralized network of sensors, running trustless processes at the edge. and when they&apos;re idle?  
they become compute nodes, earning through HyperBEAM by offering up spare cycles.
</p><br />
<p className="mb-2 flex items-center gap-2 normal-case">
  this isn&apos;t just hardware — it&apos;s the first <span className="italic">trustless IoT computer</span>.
</p>
<br />

<p>hats <Sparkles size={20} color="#6b7280" strokeWidth={2} /> </p>
        <br /><Image src="/hats.jpg" alt="hats" width={1000} height={1000} />
<br /> <p className="mb-2 flex items-center gap-2 normal-case">just like the raspberry pi changed the DIY world with its ecosystem of modular accessories — called &quot;hats&quot; — we imagine something similar for this AO-powered platform.
</p> 
<br /> <p className="mb-2 flex items-center gap-2 normal-case">for those unfamiliar, a &quot;hat&quot; is a small hardware module that plugs into the GPIO pins of a raspberry pi. people have built hats for everything: weather stations, motor drivers, audio synths, thermal cameras — each one unlocking new functionality with zero need for rewiring the core board.
</p>
<br /> <p className="mb-2 normal-case">our vision is to bring that same kind of plug-and-play hardware modularity to the <span className="italic">permaweb of things.</span></p>
<br /> <p className="mb-2 normal-case">our custom AO device — running a trustless OS — would support existing hats, and also inspire a new generation of AO-native hats. 
</p>
<br /> <p className="mb-2 normal-case">imagine: </p>
<br /> <p className="mb-2 normal-case"> ~ a microphone hat for journalists that streams interviews to the permaweb.</p>
<br /> <p className="mb-2 normal-case"> ~ a GPS + sensor hat for vehicles that logs diagnostics on-chain.</p>
<br /> <p className="mb-2 normal-case"> ~ a secure polling station hat that records tamper-proof votes with time and location.</p>
<br /> <p className="mb-2 normal-case">and just like the pi community thrives by building and sharing hats, the AO x IoT ecosystem would empower developers and hardware hackers to create their own trustless modules — all speaking the same language: <span className="font-semibold text-green-400">AO</span>.
</p>
{/* <br /> <p className="mb-2 normal-case">this isn&apos;t just hardware — it&apos;s the first <span className="italic">trustless IoT computer</span>. */}
{/* </p> */}
<br /> <p className="mb-2 normal-case">it&apos;s a new era of hardware, where every device is a node in a global network, and every node is a potential compute node, earning through HyperBEAM by offering up spare cycles.
</p>
<br />
<p className="mb-2 flex items-center gap-2 font-semibold text-lg text-xl">
  how will we achieve this?
</p>

<br />
<p className="mb-2 flex items-center gap-2 text-xl font-semibold">
  we start with two powerful, proven modules as the foundation:
</p>

<br />
<p className="mb-2 flex items-center gap-2 pl-4 text-xl font-semibold">
  • <span className="font-medium">raspberry pi zero 2 W</span>
</p>
<Image src="/pi-zero.jpg" alt="Raspberry Pi Zero 2 W" width={500} height={1000} />
<p className="mb-2 flex items-center gap-2 pl-4 text-xl font-semibold">
  • <span className="font-medium">raspberry pi compute module 5</span>
</p>
<Image src="/compute-module.jpeg" alt="Raspberry Pi Compute Module 5" width={500} height={1000} />



<br />
<p className="mb-2 flex items-center gap-2 text-xl font-semibold">
  we&apos;ll build a minimal custom linux distro around AO — lightweight, fast, and designed for IoT. this OS will ship with baked-in support for AO processes, Arweave signing, and custom sensor libraries.
</p>

<br />
<p className="mb-2 flex items-center gap-2 text-xl font-semibold">
  developers will be able to connect whatever sensors they want, write code in the language they know, and immediately start creating permawear, without writing glue code or setting up external bridges.
</p>
<br />
<p className="mb-2 flex items-center gap-2 text-xl font-semibold">
  what are the benefits?
</p>
<br />
<p className="mb-2 flex items-center gap-2 text-xl font-semibold">~ standardized IoT-AO dev flow</p>
<p className="mb-2 flex items-center gap-2 text-xl font-semibold">finally, a unified way to build with AO and hardware. no more scattered docs or messy integrations.</p>

<br />
<p className="mb-2 flex items-center gap-2 text-xl font-semibold">~ use any language you want</p>
<p className="mb-2 flex items-center gap-2 text-xl font-semibold">since this is a full computing module, there&apos;s no restriction. build in Python, Node, Rust, Lua, C — whatever you&apos;re comfortable with.</p>
<br />
<p className="mb-2 flex items-center gap-2 text-xl font-semibold">~ infinite possibilities</p>
<p className="mb-2 flex items-center gap-2 text-xl font-semibold">attach a SIM module and go fully wireless. add a screen, buttons, camera, GPS — the hardware possibilities are endless.</p>

<br />
<hr />
<br />
<p className="mb-2 flex items-center gap-2 text-xl font-semibold"> what does it means for Blockchain Ball?</p>
<p className="mb-2 flex items-center gap-2 text-xl font-semibold"> blockchain ball v2 would be miles better than what it is in its current state, our ball can have so many custom options, we can make fully mobile with sim module, it would upload smoothly as power supply for raspberry pi is much more stable and standard.</p>


        </div>
      </div>
    </div>
  );
}