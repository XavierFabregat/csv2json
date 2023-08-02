import "./loadEnv";
import Express from "express";

const { PORT, HOST } = process.env;

const app = Express();

app.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
