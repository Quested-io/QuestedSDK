[**Quested SDK**](../README.md) • **Docs**

***

[Quested SDK](../README.md) / PlayerApi

# Interface: PlayerApi

## Methods

### addToList()

> **addToList**(`listId`, `itemId`): `Promise`\<`void`\>

#### Parameters

• **listId**: `string`

• **itemId**: `string`

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/types/api/Player.api.ts:19](https://github.com/Quested-io/QuestedSDK/blob/3ff90c0a0f9090e518d0fc8b569b6bd9c3728f32/src/types/api/Player.api.ts#L19)

***

### getAllLists()

> **getAllLists**(): `Promise`\<[`IList`](IList.md)[]\>

#### Returns

`Promise`\<[`IList`](IList.md)[]\>

#### Defined in

[src/types/api/Player.api.ts:9](https://github.com/Quested-io/QuestedSDK/blob/3ff90c0a0f9090e518d0fc8b569b6bd9c3728f32/src/types/api/Player.api.ts#L9)

***

### getGameProperty()

> **getGameProperty**(`key`): `Promise`\<`string`\>

#### Parameters

• **key**: `string`

#### Returns

`Promise`\<`string`\>

#### Defined in

[src/types/api/Player.api.ts:7](https://github.com/Quested-io/QuestedSDK/blob/3ff90c0a0f9090e518d0fc8b569b6bd9c3728f32/src/types/api/Player.api.ts#L7)

***

### me()

> **me**(): `Promise`\<[`IProfile`](IProfile.md)\>

#### Returns

`Promise`\<[`IProfile`](IProfile.md)\>

#### Defined in

[src/types/api/Player.api.ts:5](https://github.com/Quested-io/QuestedSDK/blob/3ff90c0a0f9090e518d0fc8b569b6bd9c3728f32/src/types/api/Player.api.ts#L5)

***

### removeFromList()

> **removeFromList**(`listId`, `itemId`): `Promise`\<`void`\>

#### Parameters

• **listId**: `string`

• **itemId**: `string`

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/types/api/Player.api.ts:17](https://github.com/Quested-io/QuestedSDK/blob/3ff90c0a0f9090e518d0fc8b569b6bd9c3728f32/src/types/api/Player.api.ts#L17)

***

### setGameProperty()

> **setGameProperty**(`key`, `value`): `Promise`\<`void`\>

#### Parameters

• **key**: `string`

• **value**: `string`

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/types/api/Player.api.ts:15](https://github.com/Quested-io/QuestedSDK/blob/3ff90c0a0f9090e518d0fc8b569b6bd9c3728f32/src/types/api/Player.api.ts#L15)

***

### trackEvent()

> **trackEvent**\<`T`\>(`event`, `data`): `Promise`\<`void`\>

#### Type Parameters

• **T** *extends* [`ActivityEventData`](ActivityEventData.md)

#### Parameters

• **event**: `string`

• **data**: `T`

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/types/api/Player.api.ts:11](https://github.com/Quested-io/QuestedSDK/blob/3ff90c0a0f9090e518d0fc8b569b6bd9c3728f32/src/types/api/Player.api.ts#L11)

***

### updateProfileSpecification()

> **updateProfileSpecification**(`id`, `value`): `Promise`\<`void`\>

#### Parameters

• **id**: `string`

• **value**: `string`

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/types/api/Player.api.ts:13](https://github.com/Quested-io/QuestedSDK/blob/3ff90c0a0f9090e518d0fc8b569b6bd9c3728f32/src/types/api/Player.api.ts#L13)
