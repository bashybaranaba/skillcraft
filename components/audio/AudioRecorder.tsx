// components/AudioRecorder.tsx
"use client";

import React, { useState, useRef } from "react";
import AudioPlayer from "./AudioPlayer";
import { Button } from "@/components/ui/button";
import { MicIcon } from "lucide-react";

const AudioRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [responseAudio, setResponseAudio] = useState<string | null>(null);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [loading, setLoading] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const memoryRef = useRef<{ inputs: string[]; outputs: string[] }>({
    inputs: [],
    outputs: [],
  });

  const startRecording = async () => {
    setLoading(true);
    setResponseAudio(null);
    setIsRecording(true);
    setStatusMessage("Listening ");
    audioChunksRef.current = [];

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Your browser does not support audio recording");
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = async () => {
      setStatusMessage("Transcribing audio...");
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });

      // Convert audioBlob to Base64
      const base64Audio = await blobToBase64(audioBlob);

      // Send to /api/voice/whisper
      try {
        const transcriptionResponse = await fetch("/api/voice/whisper", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ base64Audio }),
        });
        const transcriptionData = await transcriptionResponse.json();

        if (transcriptionResponse.ok) {
          const transcription = transcriptionData.transcription;
          setStatusMessage("Analyzing text... ");

          // Prepare request to /api/llm/gpt
          const instruction =
            "Provide constructive feedback on the user's input focusing on communication, empathy, teamwork, and conflict resolution.";
          const outputs = '{ "feedback": "string" }';
          const memory = memoryRef.current;

          // Add current input to memory
          memory.inputs.push(transcription);

          const llmResponse = await fetch("/api/llm/gpt", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              instruction,
              inputs: transcription,
              outputs,
              memory,
            }),
          });

          const llmData = await llmResponse.json();
          console.log("LLM GPT Data:", llmData);

          if (llmResponse.ok) {
            const assistantContent = llmData;
            console.log("Assistant Content:", assistantContent);

            // Remove backticks and sanitize GPT output before parsing
            const cleanedOutput = assistantContent
              .replace(/```json/g, "")
              .replace(/```/g, "")
              .trim();

            const feedbackJSON = JSON.parse(cleanedOutput);
            console.log("Feedback JSON:", feedbackJSON);
            const feedbackText = feedbackJSON.feedback;
            console.log("Feedback Text:", feedbackText);

            // Add output to memory
            memory.outputs.push(feedbackText);

            setStatusMessage("Generating response ");
            setLoadingAudio(true);

            // Send feedbackText to /api/voice/tts
            const ttsResponse = await fetch("/api/voice/tts", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ input: feedbackText }),
            });

            if (ttsResponse.ok) {
              // Get audio from response
              const ttsBlob = await ttsResponse.blob();
              const audioUrl = URL.createObjectURL(ttsBlob);

              setResponseAudio(audioUrl);
              setStatusMessage("Response ready.");
              setLoadingAudio(false);
            } else {
              const errorText = await ttsResponse.text();
              console.error("TTS API Error:", errorText);
              setStatusMessage("Error generating audio response.");
              setLoadingAudio(false);
            }
          } else {
            const errorText = llmData.error || "Error processing input.";
            console.error("LLM GPT API Error:", errorText);
            setStatusMessage("Error analyzing text.");
          }
        } else {
          const errorText =
            transcriptionData.error || "Error transcribing audio.";
          console.error("Whisper API Error:", errorText);
          setStatusMessage("Error transcribing audio.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setStatusMessage("An error occurred. Please try again.");
      }
    };

    mediaRecorder.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
    setStatusMessage("Processing ");
    mediaRecorderRef.current?.stop();
  };

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = (reader.result as string).split(",")[1];
        resolve(base64data);
      };
      reader.readAsDataURL(blob);
    });
  };

  return (
    <div>
      <div className="flex flex-col items-center space-x-4">
        <div className={`rounded-full p-1  border ${isRecording ? "" : ""}`}>
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`p-6   rounded-full ${
              isRecording
                ? "bg-white border animate-pulse text-blue-500"
                : "bg-blue-500 text-white"
            }`}
          >
            {isRecording ? (
              <MicIcon className="h-5 w-5" />
            ) : (
              <MicIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        <div className="flex items-center space-x-2 mt-2">
          <p className="text-gray-600 text-sm">{statusMessage}</p>
          {isRecording && (
            <div className="h-2 w-2 rounded-full animate-ping bg-blue-600"></div>
          )}
        </div>
      </div>

      {responseAudio && (
        <AudioPlayer audio={responseAudio} loading={loadingAudio} />
      )}
    </div>
  );
};

export default AudioRecorder;
