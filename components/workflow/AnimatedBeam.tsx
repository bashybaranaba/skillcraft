"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 border-border bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function AnimatedBeams({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null); // Upload Docs
  const div4Ref = useRef<HTMLDivElement>(null); // Database
  const div6Ref = useRef<HTMLDivElement>(null); // OpenAI
  const div7Ref = useRef<HTMLDivElement>(null); // User

  return (
    <div
      className={cn(
        "relative flex h-[250px] w-full items-center justify-center overflow-hidden",
        className
      )}
      ref={containerRef}
    >
      <div className="flex size-full flex-row items-stretch justify-between gap-10 max-w-2xl">
        <div className="flex flex-col justify-center gap-2">
          <Circle ref={div4Ref} className="size-16">
            <Icons.database />
          </Circle>
          <Circle ref={div1Ref} className="size-16">
            <Icons.uploadDocs />
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={div6Ref} className="size-22">
            <Icons.openai />
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={div7Ref} className="size-16">
            <Icons.user />
          </Circle>
        </div>
      </div>

      {/* Connect the left icons to the OpenAI icon */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref} // From Upload Docs
        toRef={div6Ref} // To OpenAI
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref} // From Database
        toRef={div6Ref} // To OpenAI
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref} // From OpenAI
        toRef={div7Ref} // To User
      />
    </div>
  );
}

const Icons = {
  uploadDocs: () => (
    <img
      src="/icons8-upload-to-ftp-100.png"
      alt="User's Uploaded Documents"
      width={100}
      height={100}
    />
  ),
  database: () => (
    <img
      src="/icons8-database-100.png"
      alt="Kool-kit's Database"
      width={100}
      height={100}
    />
  ),
  openai: () => (
    <img src="/icons8-chatgpt-100.png" alt="OpenAI" width={100} height={100} />
  ),
  user: () => (
    <img src="/icons8-user-100.png" alt="User" width={100} height={100} />
  ),
};
