import express from "express";
import cors from "cors";
import analyzeRouter from "./routes/analyze.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/analyze", analyzeRouter);

app.get("/health", (_, res) => {
  res.json({ status: "ok", backend: "active" });
});

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`[backend] listening on ${PORT}`);
});
