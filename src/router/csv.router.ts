import Express from "express";
import { csvToJson } from "../controllers/csvToJson";
import upload from "../middleware/upload";
import rateLimiter from "../middleware/rateLimiter";

const router = Express.Router();

router.post("/upload", rateLimiter, upload, csvToJson);

export default router;
