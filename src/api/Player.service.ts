import { inject, injectable } from 'inversify';
import type { ActivityEventType, PlayerApi } from '../types/api/Player.api';
import type { IProfile } from '../types/entities/IProfile';
import { BridgeService } from '../utils/Bridge.service';
import { CONFIG_INJECT_KEY } from '../config';
import type { InitOptions } from '../types/InitOptions';
import type {IList} from "../types/entities/IList";

@injectable()
export class PlayerService implements PlayerApi {
  constructor(
    @inject(BridgeService)
    private bridgeService: BridgeService,
    @inject(CONFIG_INJECT_KEY)
    private options: InitOptions,
  ) {}

  async me(): Promise<IProfile> {
    return this.bridgeService.sendAndWaitForReply(
      this.options.activityId,
      'request:getProfile',
      {},
    );
  }
  async trackEvent(event: ActivityEventType, data: any): Promise<void> {
    return this.bridgeService.send(this.options.activityId, event, data);
  }
  updateProfileSpecification(id: string, value: string): Promise<void> {
    return this.bridgeService.send(
      this.options.activityId,
      'system:updateProfileSpecification',
      { id, value },
    );
  }
  getGameProperty(key: string): Promise<string> {
    return this.bridgeService.sendAndWaitForReply(
      this.options.activityId,
      'system:getGameProperty',
      { key },
    );
  }
  setGameProperty(key: string, value: string): Promise<void> {
    return this.bridgeService.send(
      this.options.activityId,
      'system:setGameProperty',
      { key, value },
    );
  }
  getAllLists(): Promise<IList[]> {
    return this.bridgeService.sendAndWaitForReply(
      this.options.activityId,
      'system:getAllLists',
      {},
    );
  }
  removeFromList(listId: string, itemId: string): Promise<void> {
    return this.bridgeService.send(
      this.options.activityId,
      'system:removeFromList',
      { listId, itemId },
    );
  }
  addToList(listId: string, itemId: string): Promise<void> {
    return this.bridgeService.send(
      this.options.activityId,
      'system:addToList',
      { listId, itemId },
    );
  }
}
