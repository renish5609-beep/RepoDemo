import { Router } from "express";
import crypto from "crypto";
import { startAnalysis } from "../services/repoService.js";

const router = Router();

const activeRequests = new Map();
const RATE_LIMIT_WINDOW = 60_000;
const RATE_LIMIT_MAX = 10;
const TIMEOUT_MS = 5 * 60_000;

router.post("/", async (req, res) => {
  const requestId = generateRequestId();
  const startedAt = Date.now();
  const ip = req.ip || req.connection?.remoteAddress || "unknown";

  res.setHeader("X-Request-Id", requestId);

  if (!rateLimit(ip)) {
    return res.status(429).json({
      error: "rate_limited",
      requestId
    });
  }

  let repoUrl = req.body?.repoUrl;

  if (typeof repoUrl !== "string") {
    return res.status(400).json({
      error: "invalid_payload",
      requestId
    });
  }

  repoUrl = repoUrl.trim();

  if (repoUrl.length < 10) {
    return res.status(400).json({
      error: "repo_url_too_short",
      requestId
    });
  }

  if (!repoUrl.startsWith("http")) {
    return res.status(400).json({
      error: "invalid_url_format",
      requestId
    });
  }

  if (activeRequests.has(repoUrl)) {
    return res.status(409).json({
      error: "analysis_already_running",
      requestId
    });
  }

  activeRequests.set(repoUrl, requestId);

  let timeoutHandle;
  let finished = false;

  try {
    timeoutHandle = setTimeout(() => {
      if (!finished) {
        activeRequests.delete(repoUrl);
        res.status(504).json({
          error: "analysis_timeout",
          requestId
        });
      }
    }, TIMEOUT_MS);

    const result = await startAnalysis(repoUrl);

    finished = true;
    clearTimeout(timeoutHandle);
    activeRequests.delete(repoUrl);

    res.json({
      requestId,
      durationMs: Date.now() - startedAt,
      result
    });
  } catch (err) {
    finished = true;
    clearTimeout(timeoutHandle);
    activeRequests.delete(repoUrl);

    const payload = normalizeError(err);

    res.status(500).json({
      error: "analysis_failed",
      requestId,
      durationMs: Date.now() - startedAt,
      details: payload
    });
  }
});

function rateLimit(ip) {
  const now = Date.now();
  const record = rateLimitStore.get(ip) || [];

  const recent = record.filter((t) => now - t < RATE_LIMIT_WINDOW);
  recent.push(now);

  rateLimitStore.set(ip, recent);

  return recent.length <= RATE_LIMIT_MAX;
}

const rateLimitStore = new Map();

function normalizeError(err) {
  if (!err) return "unknown";

  if (typeof err === "string") return err;

  if (err.context) {
    return {
      message: err.message,
      context: err.context
    };
  }

  return {
    message: err.message || "unknown_error"
  };
}

function generateRequestId() {
  return crypto
    .randomBytes(8)
    .toString("hex");
}

export default router;

