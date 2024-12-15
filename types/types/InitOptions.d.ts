import type { LogLevel } from './LogLevel';
import type { ILogger } from './ILogger';
export interface InitOptions {
    activityId: string;
    onReady?: () => void;
    logLevel?: LogLevel;
    logger?: ILogger;
}
//# sourceMappingURL=InitOptions.d.ts.map