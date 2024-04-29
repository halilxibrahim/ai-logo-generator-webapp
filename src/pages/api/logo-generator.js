import Replicate from "replicate";

export default async function handler(req, res) {
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  const { prompt } = req.body;

  try {
    const output = await replicate.run(
      "laion-ai/erlich:92fa143ccefeed01534d5d6648bd47796ef06847a6bc55c0e5c5b6975f2dcdfb",
      {
        input: {
          prompt,
        },
      }
    );

    res.status(200).json({ logos: output });
  } catch (error) {
    console.error("AI logo generation failed:", error);
    res.status(500).json({ error: "AI logo generation failed" });
  }
}