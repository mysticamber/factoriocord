import log from 'loglevel';
const LogLevelNames = ['TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR']

// Set up custom log format
const originalFactory = log.methodFactory;
log.methodFactory = (methodName, logLevel, loggerName) => {
  const rawMethod = originalFactory(methodName, logLevel, loggerName);
  return (...args) => {
    const timestamp = new Date().toISOString();
    const level = LogLevelNames[logLevel];
    const message = args.join(' ');
    rawMethod(`[${timestamp} ${level}] ${message}`);
  };
};

// Enable all log methods
log.enableAll();

// Set the default log level
log.setDefaultLevel(log.levels.INFO);
log.setLevel('info');

export default log;
