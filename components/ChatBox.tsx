"use client";

import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatBox() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);

  const handleAsk = async () => {
    if (!question.trim()) return;

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

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong.",
        },
      ]);
    }

    setLoading(false);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF first");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      console.log(data.text);

      alert("PDF processed successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to process PDF");
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Chat Messages */}

      <div className="border rounded-xl p-4 h-[500px] overflow-y-auto space-y-4">
        {messages.length === 0 && (
          <p className="text-gray-500">
            Ask a legal question to get started...
          </p>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`max-w-[80%] p-4 rounded-xl ${
              message.role === "user"
                ? "bg-black text-white ml-auto"
                : "bg-gray-100"
            }`}
          >
            <p>{message.content}</p>
          </div>
        ))}

        {loading && (
          <div className="bg-gray-100 p-4 rounded-xl max-w-[80%]">
            Thinking...
          </div>
        )}
      </div>

      {/* PDF Upload Section */}

      <div className="border rounded-xl p-4 space-y-3">
        <h3 className="font-semibold">
          Upload Legal Document
        </h3>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setFile(e.target.files[0]);
            }
          }}
          className="w-full border rounded-lg p-2"
        />

        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Upload PDF
        </button>
      </div>

      {/* Question Input */}

      <div className="flex gap-3">
        <textarea
          rows={2}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a legal question..."
          className="flex-1 border rounded-lg p-3"
        />

        <button
          onClick={handleAsk}
          disabled={loading}
          className="bg-black text-white px-6 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}