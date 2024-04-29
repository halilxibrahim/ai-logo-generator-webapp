import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateLogos = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/logo-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const { logos } = await response.json();
      setLogos(logos[0]);
    } catch (error) {
      console.error("Failed to generate logos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">AI Logo Generator</h1>
      <input
        type="text"
        placeholder="Enter your logo text..."
        className="text-black border p-2 rounded w-full mb-4"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={generateLogos}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {
            loading ? "Generating..." : "Generate Logos"
        }
      </button>
      {logos.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-4">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`Logo ${index + 1}`}
              className="w-48 h-auto mx-2 my-4"
            />
          ))}
        </div>
      )}
    </div>
  );
}