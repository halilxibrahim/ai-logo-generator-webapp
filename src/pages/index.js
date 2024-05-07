import { useState } from "react";
import Header from "@/components/Header";

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
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header/>

      {/* Main content */}
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <aside className="md:w-1/4 md:mr-4">
            {/* Sidebar content can be added here */}
          </aside>

          {/* Logo generator */}
          <div className="md:w-3/4">
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
              {loading ? "Generating..." : "Generate Logos"}
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
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-4 px-8">
        <p className="text-center">&copy; 2024 Halil ibrahim Kamaci</p>
      </footer>
    </div>
  );
}
