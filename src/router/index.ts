import csvRouter from "./csv.router";
import authRouter from "./auth.router";
import express from "express";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send("Hello World!");
});
router.use("/csv", csvRouter);
router.use("/auth", authRouter);

export default router;
