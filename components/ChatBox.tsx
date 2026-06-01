"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatBox() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = useState("");

  const [messages, setMessages] = useState<Message[]>([]);

  const handleAsk = async () => {
    if (!question.trim() || loading) return;

    const userQuestion = question;

    setQuestion("");

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userQuestion,
      },
    ]);

    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: userQuestion,
        }),
      });

      const data = await response.json();
      const assistantReply =
        response.ok && data.answer
          ? data.answer
          : data.error || "Failed to get a legal response.";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: assistantReply,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Something went wrong while contacting the legal assistant.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!file || uploading) {
      setUploadMessage("Please select a PDF first.");
      return;
    }

    setUploading(true);
    setUploadMessage("");

    try {
      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setUploadMessage(data.error || "Failed to process PDF.");
        return;
      }

      setUploadMessage(
        `PDF processed successfully (${data.numPages} pages, ${data.characterCount} characters).`
      );
      setFile(null);
    } catch (error) {
      console.error(error);
      setUploadMessage("Failed to process PDF.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
            Conversation
          </h2>
          <span className="text-xs text-slate-500">
            {messages.length} message{messages.length === 1 ? "" : "s"}
          </span>
        </div>

        <div className="h-[420px] space-y-4 overflow-y-auto pr-1">
          {messages.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
              <p className="text-sm font-medium text-slate-700">
                Ask a legal question to get started
              </p>
              <p className="mt-2 text-xs text-slate-500 md:text-sm">
                Example: What is anticipatory bail under Indian law?
              </p>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`max-w-[88%] rounded-2xl p-4 text-sm leading-relaxed md:text-base ${
                message.role === "user"
                  ? "ml-auto bg-slate-900 text-white"
                  : "border border-slate-200 bg-slate-50 text-slate-800"
              }`}
            >
              {message.role === "assistant" ? (
                <div className="space-y-3">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({ children }) => (
                        <p className="leading-relaxed text-slate-800">{children}</p>
                      ),
                      strong: ({ children }) => (
                        <strong className="font-semibold text-slate-900">{children}</strong>
                      ),
                      ul: ({ children }) => (
                        <ul className="list-disc space-y-1 pl-5">{children}</ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal space-y-1 pl-5">{children}</ol>
                      ),
                      li: ({ children }) => <li className="pl-1">{children}</li>,
                      h1: ({ children }) => (
                        <h3 className="text-lg font-semibold text-slate-900">{children}</h3>
                      ),
                      h2: ({ children }) => (
                        <h4 className="text-base font-semibold text-slate-900">{children}</h4>
                      ),
                      h3: ({ children }) => (
                        <h5 className="text-sm font-semibold text-slate-900">{children}</h5>
                      ),
                      code: ({ children }) => (
                        <code className="rounded bg-slate-200 px-1 py-0.5 text-xs text-slate-800">
                          {children}
                        </code>
                      ),
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              ) : (
                <p>{message.content}</p>
              )}
            </div>
          ))}

          {loading && (
            <div className="max-w-[88%] rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              Thinking...
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row">
          <textarea
            rows={2}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void handleAsk();
              }
            }}
            placeholder="Ask a legal question..."
            className="flex-1 rounded-xl border border-slate-300 bg-white p-3 text-sm outline-none transition focus:border-slate-500 md:text-base"
          />

          <button
            onClick={handleAsk}
            disabled={loading}
            className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </section>

      <aside className="h-fit space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:sticky lg:top-24">
        <h3 className="font-semibold text-slate-900">Upload Legal Document</h3>
        <p className="text-xs text-slate-500 md:text-sm">
          Upload a PDF to extract text for legal analysis.
        </p>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setFile(e.target.files[0]);
              setUploadMessage("");
            }
          }}
          className="w-full rounded-lg border border-slate-300 bg-white p-2 text-sm"
        />

        <button
          onClick={handleUpload}
          disabled={uploading}
          className="group relative w-full overflow-hidden rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-black hover:shadow-md disabled:cursor-not-allowed disabled:bg-slate-400 disabled:opacity-80"
        >
          <span className="absolute inset-0 bg-white/0 transition group-hover:bg-white/5" />
          <span className="relative inline-flex items-center justify-center gap-2">
            {uploading ? "Uploading PDF..." : "Upload PDF"}
          </span>
        </button>

        {file && (
          <p className="text-xs text-slate-600 md:text-sm">Selected: {file.name}</p>
        )}
        {uploadMessage && (
          <p className="text-xs text-slate-600 md:text-sm">{uploadMessage}</p>
        )}
      </aside>
    </div>
  );
}