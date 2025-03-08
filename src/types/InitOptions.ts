import type {LogLevel} from './LogLevel';
import type {ILogger} from './ILogger';

export type StorageMode = 'local' | 'bridge';

export interface InitOptions {
  activityId: string;
  onReady?: () => void;
  logLevel?: LogLevel;
  logger?: ILogger;
  mode?: StorageMode;
}
