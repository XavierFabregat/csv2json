import csvRouter from "./csv.router";
import authRouter from "./auth.router";
import express from "express";
import path from "path";
const router = express.Router();

console.log(path.join(__dirname, "/../../public"));

router.use("/", express.static(path.join(__dirname, "/../../public/")));
router.use("/csv", csvRouter);
router.use("/auth", authRouter);

export default router;
