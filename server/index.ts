import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import historyRouter from "./routes/history";

dotenv.config();

export function createServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api", historyRouter); // ✅ fixed route prefix

  app.get("/api/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
  });

  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
  });

  return app;
}

if (require.main === module) {
  const app = createServer();
  const PORT = Number(process.env.PORT) || 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AgroSaarthi Backend running on port ${PORT}`);
  });
}
