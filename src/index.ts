import 'reflect-metadata';
import { create } from './create';
import type {Instance} from './types/Instance';
import type {InitOptions} from './types/InitOptions';
import {
  ActivityEventData,
  ActivityEventType,
  ActivityEndedEventData,
  ConfigChangedEventData,
} from './types/api/Player.api';

let instance: Instance;

const init = (options: InitOptions) => {
  instance = create(options);
};

export { init, create, instance };
export type {Instance, InitOptions, ActivityEventType, ActivityEventData, ActivityEndedEventData, ConfigChangedEventData};