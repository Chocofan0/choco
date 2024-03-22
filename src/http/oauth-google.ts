import { Router } from "express";
import { fetch } from "@whatwg-node/fetch";
import qs from "qs";
import { container } from "tsyringe";
import { Knex } from "knex";
import { UserRepository } from "../app/repositories/user-repository";
import { WalletRepository } from "../app/repositories/wallet-repository";
import jwt from "jsonwebtoken";

export const oatuhGoogleRoute = Router();

oatuhGoogleRoute.get("/google/callback", async (req, res) => {
  if (!req.query.code) {
    return res.status(400).json({ message: "code not provide" });
  }

  const options = {
    code: req.query.code,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URI,
    grant_type: "authorization_code",
  };

  const result = await fetch(
    `https://oauth2.googleapis.com/token?${qs.stringify(options)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  if (!result.ok) {
    return res
      .status(400)
      .json({ message: "error exchange code authorization" });
  }

  const data = await result.json();

  const user = await fetch(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${data.access_token}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${data.id_token}`,
      },
    }
  );

  if (!user.ok) {
    return res.status(400).json({ message: "error get user" });
  }

  const userData = await user.json();

  const knex = container.resolve<Knex>("knex");

  let userId: any;

  const exists = await knex.table("users").where("google_id", userData.id);

  if (exists.length < 1) {
    try {
      await knex.transaction(async (t) => {
        await container
          .resolve(UserRepository)
          .insert(
            {
              name: userData.name,
              email: userData.email,
              google_id: userData.id,
            },
            t
          )
          .then((id) => {
            userId = id;

            return container.resolve(WalletRepository).insert(
              {
                name: "Main wallet",
                user_id: id,
                balance: 0,
              },
              t
            );
          })
          .then(t.commit)
          .catch(t.rollback);
      });
    } catch (error) {
      return res.status(405).json({message: "internal server error"})
    }
  }

  return res
    .status(200)
    .redirect(
      `/google/success?token=${jwt.sign(
        { id: userId ? userId : exists[0].id },
        process.env.JWT_KEY as string
      )}`
    );
});
