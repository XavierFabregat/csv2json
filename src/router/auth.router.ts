import { getToken, delToken } from "../controllers/authToken";
import express from "express";

const router = express.Router();

router.get("/token", getToken);
router.delete("/token/:token", delToken);

export default router;
