import { envsafe, str } from "envsafe";

export const env = envsafe({
  NODE_ENV: str({
    choices: ["development", "production", "test"],
  }),
  SESSION_SECRET: str(),
});