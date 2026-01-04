// File: /routes/analyze.js
import { Router } from "express";
import { startAnalysis } from "../services/repoService.js";

const router = Router();


router.post("/", async (req, res) => {
  const { repoUrl } = req.body;

  // 1. Validation
  if (!repoUrl) {
    return res.status(400).json({ error: "repoUrl required" });
  }

  if (!repoUrl.startsWith("http")) {
    return res.status(400).json({ error: "Invalid URL format" });
  }

  try {
    console.log(`[Analyze] Starting: ${repoUrl}`);
    const result = await startAnalysis(repoUrl);
    console.log(`[Analyze] Success: ${repoUrl}`);
    res.json(result);
  } catch (err) {
    console.error("[Analyze] Error:", err.message);
    res.status(500).json({ 
      error: "Analysis failed", 
      details: err.message 
    });
  }
});

export default router;
