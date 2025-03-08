import { inject, injectable } from 'inversify';
import { LoggerService } from './Logger.service';
import type { IStorageService } from '../types/IStorageService';

@injectable()
export class BridgeService implements IStorageService {
  private readonly TIMEOUT_MS = 5000;

  constructor(
    @inject(LoggerService)
    private logger: LoggerService,
  ) {}

  async send(activityId: string, eventType: string, payload: any) {
    this.logger.log(activityId, eventType, payload);
    window.parent.postMessage(
      {
        type: eventType,
        source: activityId,
        payload: payload,
      },
      '*',
    );
  }

  waitForReply(eventType: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const listener = (event: MessageEvent) => {
        console.log('Reply event received for', eventType, event);
        if (event.data.type === eventType && event.data.source === 'QUESTED') {
          cleanup();
          resolve(event.data.payload);
        }
      };

      const timeout = setTimeout(() => {
        cleanup();
        reject(
          new Error(
            `Timeout waiting for reply to ${eventType} after ${this.TIMEOUT_MS}ms`,
          ),
        );
      }, this.TIMEOUT_MS);

      const cleanup = () => {
        window.removeEventListener('message', listener);
        clearTimeout(timeout);
      };

      window.addEventListener('message', listener);
    });
  }

  async sendAndWaitForReply(
    activityId: string,
    eventType: string,
    payload: any,
  ): Promise<any> {
    await this.send(activityId, eventType, payload);
    return this.waitForReply(eventType);
  }
}
