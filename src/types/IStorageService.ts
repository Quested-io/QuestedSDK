import type { ActivityEventType } from './api/Player.api';

export interface IStorageService {
  send(activityId: string, eventType: string, payload: any): Promise<void>;
  waitForReply(eventType: string): Promise<any>;
  sendAndWaitForReply(
    activityId: string, 
    eventType: string, 
    payload: any
  ): Promise<any>;
}