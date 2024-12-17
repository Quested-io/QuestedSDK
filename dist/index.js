/*!
 * @quested/sdk v0.1.8
 * (c) Yevhenii Rachkovan
 * Released under the MIT License.
 */

'use strict';

require('reflect-metadata');
var inversify = require('inversify');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

const CONFIG_INJECT_KEY = Symbol('CONFIG_INJECT_KEY');

const logLevelOrder = {
    debug: 0,
    info: 1,
    log: 2,
    warn: 3,
    error: 4,
};
let LoggerService = class LoggerService {
    constructor(options) {
        var _a, _b;
        this.options = options;
        this.logLevel = (_a = this.options.logLevel) !== null && _a !== void 0 ? _a : 'log';
        this.logger = (_b = this.options.logger) !== null && _b !== void 0 ? _b : console;
    }
    debug(...args) {
        if (logLevelOrder[this.logLevel] <= logLevelOrder.debug) {
            this.logger.debug(...args);
        }
    }
    info(...args) {
        if (logLevelOrder[this.logLevel] <= logLevelOrder.info) {
            this.logger.info(...args);
        }
    }
    log(...args) {
        if (logLevelOrder[this.logLevel] <= logLevelOrder.log) {
            this.logger.log(...args);
        }
    }
    warn(...args) {
        if (logLevelOrder[this.logLevel] <= logLevelOrder.warn) {
            this.logger.warn(...args);
        }
    }
    error(...args) {
        if (logLevelOrder[this.logLevel] <= logLevelOrder.error) {
            this.logger.error(...args);
        }
    }
};
LoggerService = __decorate([
    inversify.injectable(),
    __param(0, inversify.inject(CONFIG_INJECT_KEY)),
    __metadata("design:paramtypes", [Object])
], LoggerService);

let BridgeService = class BridgeService {
    constructor(logger) {
        this.logger = logger;
        this.TIMEOUT_MS = 5000;
    }
    send(activityId, eventType, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(activityId, eventType, payload);
            window.parent.postMessage({
                type: eventType,
                source: activityId,
                payload: payload,
            }, '*');
        });
    }
    waitForReply(activityId, eventType) {
        return new Promise((resolve, reject) => {
            const listener = (event) => {
                if (event.data.type === eventType && event.data.source === activityId) {
                    cleanup();
                    resolve(event.data.payload);
                }
            };
            const timeout = setTimeout(() => {
                cleanup();
                reject(new Error(`Timeout waiting for reply to ${eventType} after ${this.TIMEOUT_MS}ms`));
            }, this.TIMEOUT_MS);
            const cleanup = () => {
                window.removeEventListener('message', listener);
                clearTimeout(timeout);
            };
            window.addEventListener('message', listener);
        });
    }
    sendAndWaitForReply(activityId, eventType, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.send(activityId, eventType, payload);
            return this.waitForReply(activityId, eventType);
        });
    }
};
BridgeService = __decorate([
    inversify.injectable(),
    __param(0, inversify.inject(LoggerService)),
    __metadata("design:paramtypes", [LoggerService])
], BridgeService);

let PlayerService = class PlayerService {
    constructor(bridgeService, options) {
        this.bridgeService = bridgeService;
        this.options = options;
    }
    me() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bridgeService.sendAndWaitForReply(this.options.activityId, 'getProfile', {});
        });
    }
    trackEvent(event, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bridgeService.send(this.options.activityId, event, data);
        });
    }
    updateProfileSpecification(id, value) {
        return this.bridgeService.send(this.options.activityId, 'system:updateProfileSpecification', { id, value });
    }
    getGameProperty(key) {
        return this.bridgeService.sendAndWaitForReply(this.options.activityId, 'system:getGameProperty', { key });
    }
    setGameProperty(key, value) {
        return this.bridgeService.send(this.options.activityId, 'system:setGameProperty', { key, value });
    }
    getAllLists() {
        return this.bridgeService.sendAndWaitForReply(this.options.activityId, 'system:getAllLists', {});
    }
    removeFromList(listId, itemId) {
        return this.bridgeService.send(this.options.activityId, 'system:removeFromList', { listId, itemId });
    }
    addToList(listId, itemId) {
        return this.bridgeService.send(this.options.activityId, 'system:addToList', { listId, itemId });
    }
};
PlayerService = __decorate([
    inversify.injectable(),
    __param(0, inversify.inject(BridgeService)),
    __param(1, inversify.inject(CONFIG_INJECT_KEY)),
    __metadata("design:paramtypes", [BridgeService, Object])
], PlayerService);

const Components = [PlayerService, LoggerService, BridgeService];
const create = (options) => {
    let isInitialized = false;
    const container = new inversify.Container();
    container.bind(CONFIG_INJECT_KEY).toConstantValue(options);
    for (const provider of Components) {
        container.bind(provider).toSelf().inSingletonScope();
    }
    handleInstanceInitForComponent(container, Components).then(() => {
        var _a;
        (_a = options.onReady) === null || _a === void 0 ? void 0 : _a.call(options);
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
const handleInstanceInitForComponent = (container, components) => __awaiter(void 0, void 0, void 0, function* () {
    for (const provider of components) {
        const component = container.get(provider);
        if (component.onInstanceInit) {
            yield component.onInstanceInit();
        }
    }
});

exports.instance = void 0;
const init = (options) => {
    exports.instance = create(options);
};

exports.create = create;
exports.init = init;
//# sourceMappingURL=index.js.map
