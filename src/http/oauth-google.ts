import { Router } from "express";
import { fetch } from "@whatwg-node/fetch";

export const oatuhGoogleRoute = Router();

oatuhGoogleRoute.get("/google/callback", async (req, res) => {
  if (!req.query.code) {
    return res.status(400).json({ message: "code not provide" });
  }

  const result = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: JSON.stringify({
      code: req.query.code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,
      grant_type: "authorization_code",
    }),
  });

  if (!result.ok) {
    const error = await result.json();
    console.error(error);
    return res
      .status(400)
      .json({ message: "error exchange code authorization" });
  }

  return res.status(200).json({ message: "success" });
});
