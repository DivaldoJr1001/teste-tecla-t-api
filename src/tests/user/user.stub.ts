import { User } from "src/objects/user/user.schema";

export const UserStub = (): User => {
  return {
    username: "username",
    password: "password"
  };
};
