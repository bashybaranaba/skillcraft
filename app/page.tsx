import Image from "next/image";
import AudioRecorder from "@/components/audio/AudioRecorder";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center">
      <div className="mt-12">
        <AudioRecorder />
      </div>
    </div>
  );
}
