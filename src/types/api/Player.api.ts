import type {IProfile} from "../entities/IProfile";
import type {IList} from "../entities/IList";

export interface PlayerApi {
  me(): Promise<IProfile>;
  getGameProperty(key: string): Promise<string>;
  getAllLists(): Promise<IList[]>;

  trackEvent<T extends GameEventData>(event: GameEvent, data: T): Promise<void>;
  updateProfileSpecification(id: string, value: string): Promise<void>;
  setGameProperty(key: string, value: string): Promise<void>;
  removeFromList(listId: string, itemId: string): Promise<void>;
  addToList(listId: string, itemId: string): Promise<void>;
}

export type GameEvent = 'activity:ended' | 'system:routeChanged' | 'system:getProfile'

export interface GameEventData {}

export interface MatchEndedEventData extends GameEventData {
  durationInSeconds: number;
  mistakes?: number;
  answers?: number;
}

export interface RouteChangedEventData extends GameEventData {
  oldSettings: string;
  newSettings: string;
}
