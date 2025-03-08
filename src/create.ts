import { Container } from 'inversify';
import type { Instance } from './types/Instance';
import { PlayerService } from './api/Player.service';
import type { InitOptions, StorageMode } from './types/InitOptions';
import { CONFIG_INJECT_KEY } from './config';
import { LoggerService } from './utils/Logger.service';
import type { OnInstanceInit } from './types/OnInstanceInit';
import { BridgeService } from './utils/Bridge.service';
import { LocalStorageService } from './utils/LocalStorage.service';
import type { IStorageService } from './types/IStorageService';
import { STORAGE_SERVICE_SYMBOL } from './types/symbols';

const Components: any[] = [PlayerService, LoggerService];

export const create = (options: InitOptions): Instance => {
  let isInitialized = false;
  const mode: StorageMode = options.mode || 'bridge';

  const container = new Container();
  container.bind(CONFIG_INJECT_KEY).toConstantValue(options);

  // Bind the appropriate storage service based on mode
  if (mode === 'local') {
    container.bind(LocalStorageService).toSelf().inSingletonScope();
    container.bind<IStorageService>(STORAGE_SERVICE_SYMBOL).toService(LocalStorageService);
  } else {
    container.bind(BridgeService).toSelf().inSingletonScope();
    container.bind<IStorageService>(STORAGE_SERVICE_SYMBOL).toService(BridgeService);
  }

  // Register all components
  for (const provider of Components) {
    container.bind(provider).toSelf().inSingletonScope();
  }

  const allComponents = [...Components];
  // Add the storage service to the components for initialization
  if (mode === 'local') {
    allComponents.push(LocalStorageService);
  } else {
    allComponents.push(BridgeService);
  }

  handleInstanceInitForComponent(container, allComponents).then(() => {
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
