import csvRouter from "./csv.router";
import express from "express";
const router = express.Router();

router.use("/csv", csvRouter);

export default router;
