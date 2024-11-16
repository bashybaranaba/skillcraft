// components/AudioPlayer.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Slider } from "@/components/ui/slider";
import { Loader2, Volume2Icon, CircleStopIcon } from "lucide-react";

export default function AudioPlayer({
  audio,
  loading,
}: {
  audio: string;
  loading: boolean;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Handle play and pause
  const playAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Update progress and duration of audio
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Reset play button when the audio ends
  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  // Set the duration when metadata is loaded
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // Add and remove event listener for "ended" event
  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) {
      audioElement.addEventListener("ended", handleAudioEnd);

      return () => {
        audioElement.removeEventListener("ended", handleAudioEnd);
      };
    }
  }, []);

  return (
    <div className="mt-4">
      {/* If not loading and the audio URL is valid */}
      {!loading && audio && (
        <div className="flex flex-col items-center justify-center w-full p-4 border rounded-lg">
          <div className="flex items-center space-x-4 w-full">
            <audio
              ref={audioRef}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              src={audio}
            />
            <button
              onClick={playAudio}
              className="p-2 border rounded-full focus:outline-none"
            >
              {isPlaying ? (
                <CircleStopIcon className="w-6 h-6 text-gray-700" />
              ) : (
                <Volume2Icon className="w-6 h-6 text-gray-700" />
              )}
            </button>
            <div className="w-full">
              <Slider
                value={[currentTime]}
                max={duration}
                step={1}
                className="w-full"
                onValueChange={(value) => {
                  if (audioRef.current) {
                    const newTime = value[0];
                    audioRef.current.currentTime = newTime;
                    setCurrentTime(newTime);
                  }
                }}
              />
              <div className="flex justify-between mt-1 text-xs">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Show loader when loading */}
      {loading && (
        <div className="flex items-center justify-center w-full p-4 border rounded-lg">
          <Loader2 className="w-6 h-6 animate-spin text-gray-700" />
          <span className="ml-2">Loading audio...</span>
        </div>
      )}
    </div>
  );
}

// Utility function to format time in mm:ss
const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};
