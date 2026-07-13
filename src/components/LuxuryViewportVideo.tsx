/*
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { Maximize2, Volume2, VolumeX, Play } from 'lucide-react';

interface LuxuryViewportVideoProps {
  id: string;
  src: string;
  poster?: string;
  title?: string;
  onExpand?: (url: string) => void;
}

export default function LuxuryViewportVideo({
  id,
  src,
  poster,
  title = "Cinematic Tour",
  onExpand
}: LuxuryViewportVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const videoElement = videoRef.current;
    const containerElement = containerRef.current;
    if (!videoElement || !containerElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoElement.play().then(() => {
              setIsPlaying(true);
            }).catch((err) => {
              console.log("Autoplay blocked or interrupted: ", err);
            });
          } else {
            videoElement.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.2 } // trigger when 20% of container is visible
    );

    observer.observe(containerElement);

    return () => {
      observer.unobserve(containerElement);
    };
  }, [src]);

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const currentMute = videoRef.current.muted;
      videoRef.current.muted = !currentMute;
      setIsMuted(!currentMute);
    }
  };

  const handleContainerClick = () => {
    if (onExpand) {
      onExpand(src);
    }
  };

  return (
    <div
      ref={containerRef}
      id={id}
      className="relative w-full h-full bg-black overflow-hidden group cursor-pointer shadow-2xl border border-[#ECECEC]/10 transition-all duration-700 hover:border-[#622219]/40"
      onClick={handleContainerClick}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted={isMuted}
        loop
        playsInline
        className="w-full h-full object-cover transition-transform duration-[4000ms] ease-out group-hover:scale-105 opacity-80"
      />
      
      {/* Cinematic dark overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-1 pointer-events-none" />
      
      {/* Floating indicators / control buttons */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#99B7DE] font-bold">
            Autoplay Active
          </span>
          <span className="font-sans text-xs text-white font-bold tracking-wide">
            {title}
          </span>
        </div>
        
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Mute button */}
          <button
            onClick={handleToggleMute}
            className="w-8 h-8 rounded-full bg-black/40 hover:bg-[#622219] backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer border border-white/10"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5" />
            ) : (
              <Volume2 className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Fullscreen Expand button */}
          <button
            className="w-8 h-8 rounded-full bg-black/40 hover:bg-[#622219] backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer border border-white/10"
            title="Watch Cinematic Immersive View"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Center luxury play hover overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-2">
        <div className="w-16 h-16 rounded-full bg-[#D11D1F]/90 text-white flex items-center justify-center shadow-2xl scale-95 group-hover:scale-100 transition-all duration-500">
          <Play className="w-6 h-6 fill-white ml-1 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
