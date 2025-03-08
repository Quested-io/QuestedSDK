import { inject, injectable, LazyServiceIdentifier } from 'inversify';
import type { ActivityEventType, PlayerApi } from '../types/api/Player.api';
import type { IProfile } from '../types/entities/IProfile';
import { CONFIG_INJECT_KEY } from '../config';
import type { InitOptions } from '../types/InitOptions';
import type {IList} from "../types/entities/IList";
import type { IStorageService } from '../types/IStorageService';
import { STORAGE_SERVICE_SYMBOL } from '../types/symbols';

@injectable()
export class PlayerService implements PlayerApi {
  constructor(
    @inject(STORAGE_SERVICE_SYMBOL)
    private storageService: IStorageService,
    @inject(CONFIG_INJECT_KEY)
    private options: InitOptions,
  ) {}

  async me(): Promise<IProfile> {
    return this.storageService.sendAndWaitForReply(
      this.options.activityId,
      'request:getProfile',
      {},
    );
  }
  async trackEvent(event: ActivityEventType, data: any): Promise<void> {
    return this.storageService.send(this.options.activityId, event, data);
  }
  updateProfileSpecification(id: string, value: string): Promise<void> {
    return this.storageService.send(
      this.options.activityId,
      'system:updateProfileSpecification',
      { id, value },
    );
  }
  getGameProperty(key: string): Promise<string> {
    return this.storageService.sendAndWaitForReply(
      this.options.activityId,
      'system:getGameProperty',
      { key },
    );
  }
  setGameProperty(key: string, value: string): Promise<void> {
    return this.storageService.send(
      this.options.activityId,
      'system:setGameProperty',
      { key, value },
    );
  }
  getAllLists(): Promise<IList[]> {
    return this.storageService.sendAndWaitForReply(
      this.options.activityId,
      'system:getAllLists',
      {},
    );
  }
  removeFromList(listId: string, itemId: string): Promise<void> {
    return this.storageService.send(
      this.options.activityId,
      'system:removeFromList',
      { listId, itemId },
    );
  }
  addToList(listId: string, itemId: string): Promise<void> {
    return this.storageService.send(
      this.options.activityId,
      'system:addToList',
      { listId, itemId },
    );
  }
}
