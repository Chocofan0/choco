import { YogaInitialContext } from "graphql-yoga";
import { UserRepository } from "../app/repositories/user-repository";
import { Knex } from "knex";
import { WalletRepository } from "../app/repositories/wallet-repository";

export type ContextType = {
  request: Request;
  repository: {
    userRepo: UserRepository;
    walletRepo: WalletRepository;
  };
  id?: string;
  db: Knex;
  token: string | null;
  userId?: string
};

export const createContext = (request: Request, db: Knex): ContextType => {
  return {
    request,
    repository: {
      userRepo: new UserRepository(db),
      walletRepo: new WalletRepository(db),
    },
    db,
    userId: undefined,
    token: request.headers.get("Authorizaton"),
  };
};
