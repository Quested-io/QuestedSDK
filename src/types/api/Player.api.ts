import type {IProfile} from "../entities/IProfile";
import type {IList} from "../entities/IList";

export interface PlayerApi {
  me(): Promise<IProfile>;
  getGameProperty(key: string): Promise<string>;
  getAllLists(): Promise<IList[]>;

  trackEvent<T extends ActivityEventData>(event: ActivityEventType, data: T): Promise<void>;
  updateProfileSpecification(id: string, value: string): Promise<void>;
  setGameProperty(key: string, value: string): Promise<void>;
  removeFromList(listId: string, itemId: string): Promise<void>;
  addToList(listId: string, itemId: string): Promise<void>;
}

export type ActivityEventType = 'event:activityEnded' | 'quest:configChanged' | 'request:getProfile'

export interface ActivityEventData {}

export interface MatchEndedEventData extends ActivityEventData {
  durationInSeconds: number;
  mistakes?: number;
  answers?: number;
}

export interface RouteChangedEventData extends ActivityEventData {
  oldSettings: string;
  newSettings: string;
}
