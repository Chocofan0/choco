import "dotenv/config";
import { App } from "./config/app";

const app = new App();

app.express.listen(4000, () => {
  console.log(`Listen port ${process.env.PORT}`);
});
