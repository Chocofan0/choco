import "reflect-metadata";
import "./config/container";
import "dotenv/config";
import { App } from "./config/app";
import { container } from "tsyringe";

const app = container.resolve(App);

app.express.listen(process.env.PORT, () => {
  console.log(`Listen port ${process.env.PORT}`);
});
