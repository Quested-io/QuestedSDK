[**Quested SDK**](../README.md) • **Docs**

***

[Quested SDK](../README.md) / isNumberParseable

# Function: isNumberParseable()

> **isNumberParseable**(`value`): `value is NumberParseable`

Check if value is parseable to number.

## Parameters

• **value**: `unknown`

An `unknown` value to be checked.

## Returns

`value is NumberParseable`

## Example

```js
isNumberParseable('AAAA');
//=> false

isNumberParseable('100');
//=> true

if (!isNumberParseable(value))
  throw new Error('Value can\'t be parseable to `Number`.')
return Number(value);
```

## Defined in

[index.ts:24](https://github.com/Quested-io/QuestedSDK/blob/69a95465bf18d4a8513aae800638db7ae330c80e/src/index.ts#L24)
