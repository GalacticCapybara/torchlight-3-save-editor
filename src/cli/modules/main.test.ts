import main from "./main";
import { LoggerInterface } from "../../logger";

const logger: LoggerInterface = {
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};

// @ts-ignore
global.process.exit = () => {};

describe("CLI main", () => {
  beforeEach(() => jest.clearAllMocks());

  it("--version: should accept and log(info) injected version", async () => {
    const version = "x.y.z";

    main(["--version", "import"], { version, logger });

    expect(logger.info).toHaveBeenCalledWith(version);
    expect(logger.info).toHaveBeenCalledTimes(1);
  });

  it("--help: should log(info) help message", async () => {
    main(["--help", "import"], { logger });

    expect(logger.info).toHaveBeenCalledTimes(1);
  });

  it("-h: should log(info) help message", async () => {
    main(["-h", "import"], { logger });

    expect(logger.info).toHaveBeenCalledTimes(1);
  });

  // TODO: how I test it?
  it("--path: ?", async () => {
    main(["--path", "."], { logger });
  });

  it("empty: should log(error)", async () => {
    main([], { logger });

    expect(logger.error).toHaveBeenCalledWith("no command");
    expect(logger.error).toHaveBeenCalledTimes(1);
  });

  it("invalid command: should log(error)", async () => {
    main(["aaaaaaaa"], { logger });

    expect(logger.error).toHaveBeenCalledWith("invalid command");
    expect(logger.error).toHaveBeenCalledTimes(1);
  });
});
