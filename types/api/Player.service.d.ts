import type { ActivityEventType, PlayerApi } from '../types/api/Player.api';
import type { IProfile } from '../types/entities/IProfile';
import { BridgeService } from '../utils/Bridge.service';
import type { InitOptions } from '../types/InitOptions';
import type { IList } from "../types/entities/IList";
export declare class PlayerService implements PlayerApi {
    private bridgeService;
    private options;
    constructor(bridgeService: BridgeService, options: InitOptions);
    me(): Promise<IProfile>;
    trackEvent(event: ActivityEventType, data: any): Promise<void>;
    updateProfileSpecification(id: string, value: string): Promise<void>;
    getGameProperty(key: string): Promise<string>;
    setGameProperty(key: string, value: string): Promise<void>;
    getAllLists(): Promise<IList[]>;
    removeFromList(listId: string, itemId: string): Promise<void>;
    addToList(listId: string, itemId: string): Promise<void>;
}
//# sourceMappingURL=Player.service.d.ts.map