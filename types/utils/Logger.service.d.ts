import { InitOptions } from '../types/InitOptions';
export declare class LoggerService {
    private options;
    private readonly logLevel;
    private logger;
    constructor(options: InitOptions);
    debug(...args: any[]): void;
    info(...args: any[]): void;
    log(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
}
//# sourceMappingURL=Logger.service.d.ts.map