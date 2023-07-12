import { env } from "./../environment/env";

export const jwtConstants = {
  secret: env.jwtKey,
};
