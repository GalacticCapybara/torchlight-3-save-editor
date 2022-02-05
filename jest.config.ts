import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  verbose: true,
  modulePathIgnorePatterns: ["./dist"],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
};
export default config;
