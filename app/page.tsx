"use client";

import { useEffect, useRef, useState } from "react";
import PhoneFrame from "@/components/PhoneFrame";
import MicButton from "@/components/MicButton";
import ReportView from "@/components/ReportView";
import type { GenerateResponse } from "@/lib/types";

type Status = "idle" | "recording" | "reviewing" | "generating" | "result";

const SAMPLE_TRANSCRIPT =
  "This is the Henderson job on Maple Street, Trane XR16 condenser unit, about eight years old. Customer said AC wasn't cooling. Checked refrigerant, it was low, found a leak on the outdoor coil, sealed it, recharged about 2 pounds of R410A. Replaced the air filter, it was dirty. Checked electrical connections at the disconnect, no corrosion, all good. System's cooling to 62 degrees output now. Told the customer to plan on replacing this unit in 2 to 3 years given the age and the coil issue. No safety concerns. Job took about ninety minutes.";

export default function Home() {
  const [status, setStatus] = useState<Status>("idle");
  const [micSupported, setMicSupported] = useState(true);
  const [transcript, setTranscript] = useState("");
  const [interim, setInterim] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setMicSupported(false);
      return;
    }
    const recognition = new SR();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let finalChunk = "";
      let interimChunk = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const res = event.results[i];
        if (res.isFinal) {
          finalChunk += res[0].transcript;
        } else {
          interimChunk += res[0].transcript;
        }
      }
      if (finalChunk) {
        setTranscript((prev) => (prev ? `${prev} ${finalChunk}` : finalChunk).trim());
      }
      setInterim(interimChunk);
    };

    recognition.onerror = (event) => {
      if (event.error === "no-speech") return;
      setError("Couldn't hear you — try again or type instead.");
      setStatus((s) => (s === "recording" ? "idle" : s));
    };

    recognition.onend = () => {
      setInterim("");
    };

    recognitionRef.current = recognition;
  }, []);

  function toggleRecording() {
    setError(null);
    if (status === "recording") {
      recognitionRef.current?.stop();
      setStatus(transcript.trim() ? "reviewing" : "idle");
    } else {
      setTranscript("");
      setInterim("");
      try {
        recognitionRef.current?.start();
        setStatus("recording");
      } catch {
        setError("Couldn't access the microphone — try typing instead.");
      }
    }
  }

  function stopAndReview() {
    recognitionRef.current?.stop();
    setStatus(transcript.trim() ? "reviewing" : "idle");
  }

  async function generateReport() {
    setStatus("generating");
    setError(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong.");
      }
      const data: GenerateResponse = await res.json();
      setResult(data);
      setStatus("result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("reviewing");
    }
  }

  function newJob() {
    setTranscript("");
    setInterim("");
    setResult(null);
    setError(null);
    setStatus("idle");
  }

  return (
    <PhoneFrame>
      <div className="px-5 py-4 border-b border-slate-200">
        <h1 className="text-lg font-bold text-slate-900">Scripa · Trades</h1>
        <p className="text-xs text-slate-500">Speak your job, get a report</p>
      </div>

      {status !== "result" ? (
        <div className="flex flex-col flex-1 px-5 py-6 gap-5">
          {status === "idle" || status === "recording" ? (
            <div className="flex flex-col items-center gap-3 pt-4">
              <MicButton recording={status === "recording"} onClick={toggleRecording} />
              <p className="text-sm text-slate-500 text-center">
                {status === "recording"
                  ? "Listening — tap to stop"
                  : micSupported
                    ? "Tap to dictate your job notes"
                    : "Voice input isn't supported in this browser — type below instead"}
              </p>
              {status === "recording" && (
                <>
                  <p className="text-sm text-slate-800 text-center min-h-[3rem]">
                    {transcript} <span className="text-slate-400">{interim}</span>
                  </p>
                  <button
                    onClick={stopAndReview}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    Done recording
                  </button>
                </>
              )}
            </div>
          ) : null}

          {status === "idle" && (
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Or type / paste your notes
              </label>
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                rows={5}
                placeholder="Describe the job you just finished..."
                className="w-full rounded-lg border border-slate-300 p-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => setTranscript(SAMPLE_TRANSCRIPT)}
                className="self-start text-xs text-blue-600 hover:text-blue-700"
              >
                Use sample transcript
              </button>
              {transcript.trim() && (
                <button
                  onClick={() => setStatus("reviewing")}
                  className="mt-2 w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Continue
                </button>
              )}
            </div>
          )}

          {status === "reviewing" && (
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Review your notes
              </label>
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                rows={8}
                className="w-full rounded-lg border border-slate-300 p-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={generateReport}
                disabled={!transcript.trim()}
                className="mt-2 w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-slate-300"
              >
                Generate Report
              </button>
            </div>
          )}

          {status === "generating" && (
            <div className="flex flex-col items-center justify-center flex-1 gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
              <p className="text-sm text-slate-500">Generating your report...</p>
            </div>
          )}

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
        </div>
      ) : (
        <>
          {result && <ReportView data={result} />}
          <div className="p-4 border-t border-slate-200">
            <button
              onClick={newJob}
              className="w-full rounded-lg bg-slate-900 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              New Job
            </button>
          </div>
        </>
      )}
    </PhoneFrame>
  );
}
