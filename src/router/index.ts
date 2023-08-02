import csvRouter from "./csv.router";
import express from "express";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send("Hello World!");
});
router.use("/csv", csvRouter);

export default router;
