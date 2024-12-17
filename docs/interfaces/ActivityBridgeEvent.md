[**Quested SDK**](../README.md) • **Docs**

***

[Quested SDK](../README.md) / ActivityBridgeEvent

# Interface: ActivityBridgeEvent

## Extends

- `MessageEvent`

## Properties

### AT\_TARGET

> `readonly` **AT\_TARGET**: `2`

#### Inherited from

`MessageEvent.AT_TARGET`

#### Defined in

node\_modules/typescript/lib/lib.dom.d.ts:8226

***

### bubbles

> `readonly` **bubbles**: `boolean`

Returns true or false depending on how event was initialized. True if event goes through its target's ancestors in reverse tree order, and false otherwise.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/bubbles)

#### Inherited from

`MessageEvent.bubbles`

#### Defined in

node\_modules/typescript/lib/lib.dom.d.ts:8121

***

### BUBBLING\_PHASE

> `readonly` **BUBBLING\_PHASE**: `3`

#### Inherited from

`MessageEvent.BUBBLING_PHASE`

#### Defined in

node\_modules/typescript/lib/lib.dom.d.ts:8227

***

### cancelable

> `readonly` **cancelable**: `boolean`

Returns true or false depending on how event was initialized. Its return value does not always carry meaning, but true can indicate that part of the operation during which event was dispatched, can be canceled by invoking the preventDefault() method.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/cancelable)

#### Inherited from

`MessageEvent.cancelable`

#### Defined in

node\_modules/typescript/lib/lib.dom.d.ts:8133

***

### ~~cancelBubble~~

> **cancelBubble**: `boolean`

#### Deprecated

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/cancelBubble)

#### Inherited from

`MessageEvent.cancelBubble`

#### Defined in

node\_modules/typescript/lib/lib.dom.d.ts:8127

***

### CAPTURING\_PHASE

> `readonly` **CAPTURING\_PHASE**: `1`

#### Inherited from

`MessageEvent.CAPTURING_PHASE`

#### Defined in

node\_modules/typescript/lib/lib.dom.d.ts:8225

***

### composed

> `readonly` **composed**: `boolean`

Returns true or false depending on how event was initialized. True if event invokes listeners past a ShadowRoot node that is the root of its target, and false otherwise.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/composed)

#### Inherited from

`MessageEvent.composed`

#### Defined in

node\_modules/typescript/lib/lib.dom.d.ts:8139

***

### currentTarget

> `readonly` **currentTarget**: `null` \| `EventTarget`

Returns the object whose event listener's callback is currently being invoked.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/currentTarget)

#### Inherited from

`MessageEvent.currentTarget`

#### Defined in

node\_modules/typescript/lib/lib.dom.d.ts:8145

***

### data

> **data**: `object`

Returns the data of the message.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/MessageEvent/data)

#### payload

> **payload**: [`ActivityEventData`](ActivityEventData.md)

#### source

> **source**: `string`

#### type

> **type**: `string`

#### Overrides

`MessageEvent.data`

#### Defined in

[src/types/api/Player.api.ts:36](https://github.com/Quested-io/QuestedSDK/blob/3ff90c0a0f9090e518d0fc8b569b6bd9c3728f32/src/types/api/Player.api.ts#L36)

***

### defaultPrevented

> `readonly` **defaultPrevented**: `boolean`

Returns true if preventDefault() was invoked successfully to indicate cancelation, and false otherwise.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/defaultPrevented)

#### Inherited from

`MessageEvent.defaultPrevented`

#### Defined in

node\_modules/typescript/lib/lib.dom.d.ts:8151

***

### eventPhase

> `readonly` **eventPhase**: `number`

Returns the event's phase, which is one of NONE, CAPTURING_PHASE, AT_TARGET, and BUBBLING_PHASE.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/eventPhase)

#### Inherited from

`MessageEvent.eventPhase`

#### Defined in

node\_modules/typescript/lib/lib.dom.d.ts:8157

***

### isTrusted

> `readonly` **isTrusted**: `boolean`

Returns true if event was dispatched by the user agent, and false otherwise.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/isTrusted)

#### Inherited from

`MessageEvent.isTrusted`

#### Defined in

node\_modules/typescript/lib/lib.dom.d.ts:8163

***

### lastEventId

> `readonly` **lastEventId**: `string`

Returns the last event ID string, for server-sent events.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/MessageEvent/lastEventId)

#### Inherited from

`MessageEvent.lastEventId`

#### Defined in

node\_modules/typescript/lib/lib.dom.d.ts:15700

***

### NONE

> `readonly` **NONE**: `0`

#### Inherited from

`MessageEvent.NONE`

#### Defined in

node\_modules/typescript/lib/lib.dom.d.ts:8224

***

### origin

> `readonly` **origin**: `string`

Returns the origin of the message, for server-sent events and cross-document messaging.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/MessageEvent/origin)

#### Inherited from

`MessageEvent.origin`

#### Defined in

node\_modules/typescript/lib/lib.dom.d.ts:15706

***

### ports

> `readonly` **ports**: readonly `MessagePort`[]

Returns the MessagePort array sent with the message, for cross-document messaging and channel messaging.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/MessageEvent/ports)

#### Inherited from

`MessageEvent.ports`

#### Defined in

node\_modules/typescript/lib/lib.dom.d.ts:15712

***

### ~~returnValue~~

> **returnValue**: `boolean`

#### Deprecated

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/returnValue)

#### Inherited from

`MessageEvent.returnValue`

#### Defined in

node\_modules/typescript/lib/lib.dom.d.ts:8169

***

### source

> `readonly` **source**: `null` \| `MessageEventSource`

Returns the WindowProxy of the source window, for cross-document messaging, and the MessagePort being attached, in the connect event fired at SharedWorkerGlobalScope objects.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/MessageEvent/source)

#### Inherited from

`MessageEvent.source`

#### Defined in

node\_modules/typescript/lib/lib.dom.d.ts:15718

***

### ~~srcElement~~

> `readonly` **srcElement**: `null` \| `EventTarget`

#### Deprecated

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/srcElement)

#### Inherited from

`MessageEvent.srcElement`

#### Defined in

node\_modules/typescript/lib/lib.dom.d.ts:8175

***

### target

> `readonly` **target**: `null` \| `EventTarget`

Returns the object to which event is dispatched (its target).

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/target)

#### Inherited from

`MessageEvent.target`

#### Defined in

node\_modules/typescript/lib/lib.dom.d.ts:8181

***

### timeStamp

> `readonly` **timeStamp**: `number`

Returns the event's timestamp as the number of milliseconds measured relative to the time origin.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/timeStamp)

#### Inherited from

`MessageEvent.timeStamp`

#### Defined in

node\_modules/typescript/lib/lib.dom.d.ts:8187

***

### type

> `readonly` **type**: `string`

Returns the type of event, e.g. "click", "hashchange", or "submit".

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/type)

#### Inherited from

`MessageEvent.type`

#### Defined in

node\_modules/typescript/lib/lib.dom.d.ts:8193

## Methods

### composedPath()

> **composedPath**(): `EventTarget`[]

Returns the invocation target objects of event's path (objects on which listeners will be invoked), except for any nodes in shadow trees of which the shadow root's mode is "closed" that are not reachable from event's currentTarget.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/composedPath)

#### Returns

`EventTarget`[]

#### Inherited from

`MessageEvent.composedPath`

#### Defined in

node\_modules/typescript/lib/lib.dom.d.ts:8199

***

### ~~initEvent()~~

> **initEvent**(`type`, `bubbles`?, `cancelable`?): `void`

#### Parameters

• **type**: `string`

• **bubbles?**: `boolean`

• **cancelable?**: `boolean`

#### Returns

`void`

#### Deprecated

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/initEvent)

#### Inherited from

`MessageEvent.initEvent`

#### Defined in

node\_modules/typescript/lib/lib.dom.d.ts:8205

***

### ~~initMessageEvent()~~

> **initMessageEvent**(`type`, `bubbles`?, `cancelable`?, `data`?, `origin`?, `lastEventId`?, `source`?, `ports`?): `void`

#### Parameters

• **type**: `string`

• **bubbles?**: `boolean`

• **cancelable?**: `boolean`

• **data?**: `any`

• **origin?**: `string`

• **lastEventId?**: `string`

• **source?**: `null` \| `MessageEventSource`

• **ports?**: `MessagePort`[]

#### Returns

`void`

#### Deprecated

[MDN Reference](https://developer.mozilla.org/docs/Web/API/MessageEvent/initMessageEvent)

#### Inherited from

`MessageEvent.initMessageEvent`

#### Defined in

node\_modules/typescript/lib/lib.dom.d.ts:15724

***

### preventDefault()

> **preventDefault**(): `void`

If invoked when the cancelable attribute value is true, and while executing a listener for the event with passive set to false, signals to the operation that caused event to be dispatched that it needs to be canceled.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/preventDefault)

#### Returns

`void`

#### Inherited from

`MessageEvent.preventDefault`

#### Defined in

node\_modules/typescript/lib/lib.dom.d.ts:8211

***

### stopImmediatePropagation()

> **stopImmediatePropagation**(): `void`

Invoking this method prevents event from reaching any registered event listeners after the current one finishes running and, when dispatched in a tree, also prevents event from reaching any other objects.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/stopImmediatePropagation)

#### Returns

`void`

#### Inherited from

`MessageEvent.stopImmediatePropagation`

#### Defined in

node\_modules/typescript/lib/lib.dom.d.ts:8217

***

### stopPropagation()

> **stopPropagation**(): `void`

When dispatched in a tree, invoking this method prevents event from reaching any objects other than the current object.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/stopPropagation)

#### Returns

`void`

#### Inherited from

`MessageEvent.stopPropagation`

#### Defined in

node\_modules/typescript/lib/lib.dom.d.ts:8223
