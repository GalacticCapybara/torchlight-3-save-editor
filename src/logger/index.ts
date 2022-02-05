/**
 * TODO: better logging system
 */

export interface LoggerInterface {
  // important events that will be cause the program execution to fail
  error(...args: any[]): void;
  // crucial events that should be noticed to prevent fails
  warn(...args: any[]): void;
  // important events that details a completed task
  info(...args: any[]): void;
  // mostly used by developers
  debug(...args: any[]): void;
}

const defaultLogger: LoggerInterface = {
  error: function (...args: any[]): void {
    console.error(...args);
  },
  warn: function (...args: any[]): void {
    console.warn(...args);
  },
  info: function (...args: any[]): void {
    console.info(...args);
  },
  debug: function (...args: any[]): void {
    console.debug(...args);
  },
};

export default defaultLogger;
