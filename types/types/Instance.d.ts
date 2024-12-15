import type { Api } from './api';
import { Container } from 'inversify';
export interface Instance {
    readonly api: Api;
    readonly _container: Container;
    readonly isInitialized: () => boolean;
}
//# sourceMappingURL=Instance.d.ts.map