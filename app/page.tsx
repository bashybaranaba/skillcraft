import Image from "next/image";
import AudioRecorder from "@/components/audio/AudioRecorder";
import { Bot } from "lucide-react";

export default function Home() {
  return (
    <div>
      <div className="border-b p-3 px-4">
        <div className="flex items-center">
          <p className=" pointer-events-none whitespace-pre-wrap bg-gradient-to-r from-blue-500 via-sky-500 to-indigo-500 bg-clip-text text-center text-xl font-bold leading-none tracking-tighter text-transparent">
            SkillCraft
          </p>
          <Bot className="h-5 w-5 text-indigo-500" />
        </div>
      </div>
      <div className="flex flex-col items-center w-full justify-items-center">
        <div className="mx-4 lg:mx-24">
          <AudioRecorder />
        </div>
      </div>
    </div>
  );
}
