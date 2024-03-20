import { UserRepository } from "../app/repositories/user-repository";
import { Knex } from "knex";
import { WalletRepository } from "../app/repositories/wallet-repository";
import { container } from "tsyringe";

export type ContextType = {
  request: Request;
  repository: {
    userRepo: UserRepository;
    walletRepo: WalletRepository;
  };
  id?: string;
  db: Knex;
  token: string | null;
  userId?: string;
};

export const createContext = (request: Request, db: Knex): ContextType => {
  return {
    request,
    repository: {
      userRepo: container.resolve(UserRepository),
      walletRepo: container.resolve(WalletRepository),
    },
    db,
    userId: undefined,
    token: request.headers.get("Authorizaton"),
  };
};
