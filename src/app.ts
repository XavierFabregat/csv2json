import Express from "express";
import cors from "cors";
import { json } from "express";
import router from "./router";

const app = Express();

app.use(cors()).use(json()).use(router);

export default app;
