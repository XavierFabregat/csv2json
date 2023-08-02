import Express from "express";
import { csvToJson } from "../controllers/csvToJson";
import upload from "../middleware/upload";
import rateLimiter from "../middleware/rateLimiter";
import { auth } from "../middleware/auth";

const router = Express.Router();

router.post("/upload", auth, rateLimiter, upload, csvToJson);

export default router;
