import winston from 'winston';

const consoleTransport = new winston.transports.Console();
winston.add(consoleTransport);

export default winston;