import Express from "express";
import { csvToJson } from "../controllers/csvToJson";
import upload from "../middleware/upload";

const router = Express.Router();

router.post("/upload", upload, csvToJson);

export default router;
