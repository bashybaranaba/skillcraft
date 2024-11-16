// components/AudioRecorder.tsx
"use client";

import React, { useState, useRef } from "react";
import AudioPlayer from "./AudioPlayer";
import { Button } from "@/components/ui/button";
import { MicIcon, CircleCheck } from "lucide-react";
import IndustrySelector from "@/components/industry/IndustrySelector";

const AudioRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [responseAudio, setResponseAudio] = useState<string | null>(null);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [scenario, setScenario] = useState<string | null>(null);
  const [scenarioAudio, setScenarioAudio] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const memoryRef = useRef<{ inputs: string[]; outputs: string[] }>({
    inputs: [],
    outputs: [],
  });

  const handleIndustrySelect = async (industry: string) => {
    setSelectedIndustry(industry);
    setStatusMessage("Generating scenario...");
    setScenario(null);
    setScenarioAudio(null);

    // Fetch scenario from API
    const response = await fetch("/api/llm/scenario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ industry }),
    });

    const data = await response.json();

    if (response.ok) {
      setScenario(data.scenario);
      setStatusMessage("Start recording yourself");

      // Generate audio for scenario
      const ttsResponse = await fetch("/api/voice/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: data.scenario }),
      });

      if (ttsResponse.ok) {
        const ttsBlob = await ttsResponse.blob();
        const audioUrl = URL.createObjectURL(ttsBlob);
        setScenarioAudio(audioUrl);
      }
    } else {
      console.error("Error generating scenario:", data.error);
      setStatusMessage("Error generating scenario.");
    }
  };

  const startRecording = async () => {
    setLoading(true);
    setResponseAudio(null);
    setIsRecording(true);
    setStatusMessage("Listening");
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
            "Analyze the user's response to the scenario and provide feedback on their soft skills.";
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
              memory,
            }),
          });

          const llmData = await llmResponse.json();
          console.log("LLM Data:", llmData);

          if (llmResponse.ok) {
            const assistantContent = llmData;

            // Remove backticks and sanitize GPT output before parsing
            const cleanedOutput = assistantContent
              .replace(/```json/g, "")
              .replace(/```/g, "")
              .trim();

            const feedbackJSON = JSON.parse(cleanedOutput);
            setAnalysisResult(feedbackJSON);

            const feedbackText = feedbackJSON.general_comment;

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
    <div className="p-12 grid grid-cols-12 ">
      {/* Left Side */}
      <div className="col-span-6 p-4 border-r">
        {!selectedIndustry && (
          <IndustrySelector onSelect={handleIndustrySelect} />
        )}

        {selectedIndustry && scenario && scenarioAudio && (
          <div className="p-2">
            <div className="mt-4">
              <div className="flex items-center space-x-4">
                <div
                  className={`rounded-full p-1  border ${
                    isRecording ? "" : ""
                  }`}
                >
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`p-6   rounded-full ${
                      isRecording
                        ? "bg-white border animate-pulse text-blue-500"
                        : "bg-blue-500 text-white"
                    }`}
                    disabled={!scenario}
                  >
                    <MicIcon className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex items-center justify-center mt-2">
                  <p className="text-gray-500 text-xs mr-1">{statusMessage}</p>
                  {isRecording && (
                    <div className="h-2 w-2 rounded-full animate-ping bg-blue-600"></div>
                  )}
                  {!loading && responseAudio && (
                    <CircleCheck className="h-3 w-3 text-gray-500" />
                  )}
                </div>
              </div>
              {scenarioAudio && !responseAudio && (
                <AudioPlayer audio={scenarioAudio} loading={false} />
              )}
              {responseAudio && (
                <AudioPlayer audio={responseAudio} loading={loadingAudio} />
              )}
            </div>
            <div className="mt-2 p-4 border rounded-xl">
              <h2 className="text-xl font-semibold mb-2">Scenario</h2>

              <p className="mb-4">{scenario}</p>
            </div>
          </div>
        )}
      </div>

      {/* Right Side */}
      <div className="col-span-6  p-4">
        {analysisResult ? (
          <div>
            <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
            <p className="mb-4">
              <strong>General Comment:</strong> {analysisResult.general_comment}
            </p>
            <ul className="space-y-2">
              <li>
                <strong>Communication:</strong> {analysisResult.communication}
              </li>
              <li>
                <strong>Social Intelligence:</strong>{" "}
                {analysisResult.social_intelligence}
              </li>
              <li>
                <strong>Problem-Solving:</strong>{" "}
                {analysisResult.problem_solving}
              </li>
              <li>
                <strong>Creative Agency:</strong>{" "}
                {analysisResult.creative_agency}
              </li>
            </ul>
          </div>
        ) : (
          <p className="text-gray-500">
            Analysis results will appear here after you record your response.
          </p>
        )}
      </div>
    </div>
  );
};

export default AudioRecorder;
