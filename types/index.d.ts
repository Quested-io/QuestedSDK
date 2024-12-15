import 'reflect-metadata';
import { create } from './create';
import type { Instance } from './types/Instance';
import type { InitOptions } from './types/InitOptions';
import { ActivityEventData, ActivityEventType, ActivityEndedEventData, ConfigChangedEventData } from './types/api/Player.api';
declare let instance: Instance;
declare const init: (options: InitOptions) => void;
export { init, create, instance };
export type { Instance, InitOptions, ActivityEventType, ActivityEventData, ActivityEndedEventData, ConfigChangedEventData };
//# sourceMappingURL=index.d.ts.map