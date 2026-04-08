import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db.js";

dotenv.config();

const NAME_MAX_LEN = 40;
const SCORE_MIN = 0;
const SCORE_MAX = 100;

/**
 * @param {unknown} body
 * @returns {{ ok: true, name: string, score: number } | { ok: false, message: string }}
 */

function validateScoreSubmission(body) {
  if (body === null || typeof body !== "object") {
    return { ok: false, message: "Request body must be a JSON object" };
  }

  const { name, score } = body;

  if (typeof name !== "string") {
    return { ok: false, message: "name must be a string" };
  }

  const trimmed = name.trim();
  if (trimmed.length === 0) {
    return { ok: false, message: "name must not be empty" };
  }
  if (trimmed.length > NAME_MAX_LEN) {
    return { ok: false, message: `name must be at most ${NAME_MAX_LEN} characters` };
  }
  if (/[\x00-\x1f\x7f]/.test(trimmed)) {
    return { ok: false, message: "name must not contain control characters" };
  }
  if (/[<>]/.test(trimmed)) {
    return { ok: false, message: "name must not contain < or >" };
  }

  const scoreNum = typeof score === "number" ? score : Number(score);
  if (!Number.isFinite(scoreNum) || !Number.isInteger(scoreNum)) {
    return { ok: false, message: "score must be an integer" };
  }
  if (scoreNum < SCORE_MIN || scoreNum > SCORE_MAX) {
    return {
      ok: false,
      message: `score must be between ${SCORE_MIN}% and ${SCORE_MAX}%`,
    };
  }

  return { ok: true, name: trimmed, score: scoreNum };
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());

app.get("/api/scores", (req, res) => {
  const scores = db.prepare("SELECT * FROM scores ORDER BY score DESC").all();
  res.json({ scores });
});

app.post("/api/scores", (req, res) => {
  const parsed = validateScoreSubmission(req.body);
  if (!parsed.ok) {
    return res.status(400).json({ error: parsed.message });
  }

  const info = db
    .prepare("INSERT INTO scores (name, score) VALUES (?, ?)")
    .run(parsed.name, parsed.score);

  res.status(201).json({ id: Number(info.lastInsertRowid) });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("exit", () => db.close());
process.on("SIGHUP", () => process.exit(128 + 1));
process.on("SIGINT", () => process.exit(128 + 2));
process.on("SIGTERM", () => process.exit(128 + 15));
