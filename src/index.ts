import "dotenv/config";
import { App } from "./config/app";

const app = new App();

app.express.listen(process.env.PORT, () => {
  console.log(`Listen port ${process.env.PORT}`);
});
