import 'reflect-metadata';
import { create } from './create';
import type {Instance} from './types/Instance';
import type {InitOptions} from './types/InitOptions';

let instance: Instance;

const init = (options: InitOptions) => {
  instance = create(options);
};

export { init, create, instance };
