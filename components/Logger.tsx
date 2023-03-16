import winston from "winston";

/* Example logger with custom formatter
https://github.com/winstonjs/winston#combining-formats
const { combine, timestamp, label, prettyPrint } = winston.format;
const logger = winston.createLogger({
  format: combine(
    label({ label: "NextJs NR Integration" }),
    timestamp(),
    prettyPrint()
  ),
  transports: [new winston.transports.Console()],
});
*/

/* Example logger outputing to the console without formatting
const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});
*/

// thsi will simply send logs to NR without outputting to the console
// best for prod environments
const logger = winston.createLogger();

export { logger };
