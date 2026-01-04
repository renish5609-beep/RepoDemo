import { Router } from "express";
import { startAnalysis } from "../services/repoService.js";

const router = Router();

/**
 * POST /api/analyze
 * body: { repoUrl }
 */
router.post("/", async (req, res) => {
  const { repoUrl } = req.body;

  if (!repoUrl) {
    return res.status(400).json({ error: "repoUrl required" });
  }

  try {
    const result = await startAnalysis(repoUrl);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "analysis failed" });
  }
});

export default router;
