import { Container } from 'inversify';
import type {Instance} from './types/Instance';
import { PlayerService } from './api/Player.service';
import type {InitOptions} from './types/InitOptions';
import { CONFIG_INJECT_KEY } from './config';
import { LoggerService } from './utils/Logger.service';
import type {OnInstanceInit} from './types/OnInstanceInit';

const Components: any[] = [
  PlayerService,
  LoggerService,
];

export const create = (options: InitOptions): Instance => {
  let isInitialized = false;

  const container = new Container();
  container.bind(CONFIG_INJECT_KEY).toConstantValue(options);

  for (const provider of Components) {
    container.bind(provider).toSelf().inSingletonScope();
  }
  handleInstanceInitForComponent(container, Components).then(() => {
    options.onReady?.();
    isInitialized = true;
  });
  return {
    _container: container,
    api: {
      player: container.get(PlayerService),
    },
    isInitialized: () => isInitialized,
  };
};

const handleInstanceInitForComponent = async (
  container: Container,
  components: any[],
) => {
  for (const provider of components) {
    const component = container.get<OnInstanceInit>(provider);
    if (component.onInstanceInit) {
      await component.onInstanceInit();
    }
  }
};
