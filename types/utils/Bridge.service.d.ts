import { LoggerService } from './Logger.service';
export declare class BridgeService {
    private logger;
    private readonly TIMEOUT_MS;
    constructor(logger: LoggerService);
    send(activityId: string, eventType: string, payload: any): Promise<void>;
    waitForReply(eventType: string): Promise<any>;
    sendAndWaitForReply(activityId: string, eventType: string, payload: any): Promise<any>;
}
//# sourceMappingURL=Bridge.service.d.ts.map