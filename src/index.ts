import "./loadEnv";
import app from "./app";

const { PORT, HOST } = process.env;

app.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
