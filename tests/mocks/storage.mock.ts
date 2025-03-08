import { IStorageService } from '../../src/types/IStorageService';

/**
 * Mock implementation of IStorageService for testing
 */
export class MockStorageService implements IStorageService {
  private mockResponses: Record<string, any> = {};
  public sentMessages: Array<{
    activityId: string;
    eventType: string;
    payload: any;
  }> = [];

  /**
   * Set a mock response for a specific event type
   */
  setMockResponse(eventType: string, response: any): void {
    this.mockResponses[eventType] = response;
  }

  /**
   * Record a sent message and return a resolved promise
   */
  async send(
    activityId: string, 
    eventType: string, 
    payload: any
  ): Promise<void> {
    this.sentMessages.push({ activityId, eventType, payload });
    return Promise.resolve();
  }

  /**
   * Return a mock response for the given event type
   */
  waitForReply(eventType: string): Promise<any> {
    return Promise.resolve(this.mockResponses[eventType] || null);
  }

  /**
   * Send a message and return the mock response
   */
  async sendAndWaitForReply(
    activityId: string, 
    eventType: string, 
    payload: any
  ): Promise<any> {
    await this.send(activityId, eventType, payload);
    return this.waitForReply(eventType);
  }

  /**
   * Clear all mock responses and sent messages
   */
  reset(): void {
    this.mockResponses = {};
    this.sentMessages = [];
  }
}