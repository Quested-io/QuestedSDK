# Quested SDK

[![License](https://badgen.net/github/license/Quested-io/QuestedSDK)](./LICENSE)
[![Package tree-shaking](https://badgen.net/bundlephobia/tree-shaking/@quested/sdk)](https://bundlephobia.com/package/@quested/sdk)
[![Package minified & gzipped size](https://badgen.net/bundlephobia/minzip/@quested/sdk)](https://bundlephobia.com/package/@quested/sdk)

## Overview

The Quested SDK provides a streamlined interface for developers to create web-based games and interactive activities that integrate seamlessly with the Quested platform. This library eliminates the need to build backend services or authentication systems by handling all communication with the Quested platform infrastructure.

### Key Features

- **Zero Backend Required**: Focus on your game logic while the SDK handles data persistence, user profiles, and platform integration
- **Dual-Mode Operation**: Use the same API for both production environments and local development
- **Player Profiles**: Access and update player information and custom profile specifications
- **Data Management**: Store and retrieve game-specific properties that persist across sessions
- **List Management**: Work with collections of profiles, favorites, and other platform lists
- **Event Tracking**: Track player progress and activity events with built-in messaging system

## Installation

This library is published in the NPM registry and can be installed using any compatible package manager.

```sh
npm install @quested/sdk --save

# For Yarn, use the command below.
yarn add @quested/sdk
```

### Installation from CDN

This module has a UMD bundle available through JSDelivr and Unpkg CDNs.

```html
<!-- For UNPKG use the code below. -->
<script src="https://unpkg.com/@quested/sdk"></script>

<!-- For JSDelivr use the code below. -->
<script src="https://cdn.jsdelivr.net/npm/@quested/sdk"></script>

<script>
  // UMD module is exposed through the "QuestedSDK" global variable.
  console.log(QuestedSDK);
</script>
```

## Usage

### Initializing the SDK

```js
import { init } from '@quested/sdk';

// Normal mode (communicates with parent frame)
const sdk = init({
  activityId: 'my-activity-id',
  onReady: () => {
    console.log('SDK is ready');
    // Start your game or activity here
  }
});
```

### Working with Player Profiles

```js
// Get the current player's profile
const profile = await sdk.api.player.me();
console.log(`Hello, ${profile.publicName}!`);

// Update a profile specification
await sdk.api.player.updateProfileSpecification('skill_level', 'intermediate');
```

### Storing Game State

```js
// Save game progress
await sdk.api.player.setGameProperty('current_level', '5');
await sdk.api.player.setGameProperty('score', '1250');

// Retrieve saved data
const level = await sdk.api.player.getGameProperty('current_level');
const score = await sdk.api.player.getGameProperty('score');
```

### Tracking Player Events

```js
// Track when a player completes a level
await sdk.api.player.trackEvent('event:activityEnded', {
  durationInSeconds: 120,
  mistakes: 2,
  answers: 10
});

// Track custom events
await sdk.api.player.trackEvent('quest:levelCompleted', {
  level: 5,
  score: 1250,
  timeSpent: 120
});
```

### Working with Lists

```js
// Get all available lists
const lists = await sdk.api.player.getAllLists();
const favorites = lists.find(list => list.id === 'favorites');

// Add an item to a list
await sdk.api.player.addToList('favorites', 'item-123');

// Remove an item from a list
await sdk.api.player.removeFromList('favorites', 'item-456');
```

## Local Development Mode

The SDK supports a local development mode that stores all data in the browser's localStorage instead of communicating with an external application. This is useful for:

- Developing and testing your app without needing to run the full Quested platform
- Prototyping new features in isolation
- Debugging specific scenarios with controlled data

```js
// Local development mode (stores data in localStorage)
const sdk = init({
  activityId: 'my-activity-id',
  mode: 'local', // Uses localStorage instead of postMessage
  onReady: () => {
    console.log('SDK is ready in local mode');
    // Test your game or activity here
  }
});
```

When in local mode:
- All data is persisted in localStorage with the prefix `quested_sdk_`
- Default profile and list data is created automatically
- No postMessage communication occurs with parent frames
- All API calls work identically to production mode

## Configuration Options

The `init` function accepts the following options:

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `activityId` | string | Yes | Unique identifier for your activity |
| `mode` | 'bridge' \| 'local' | No | Operation mode (default: 'bridge') |
| `onReady` | () => void | No | Callback executed when SDK is initialized |
| `logLevel` | LogLevel | No | Controls logging verbosity |
| `logger` | ILogger | No | Custom logger implementation |

## Advanced Usage

### Error Handling

All API methods return Promises, allowing you to implement error handling:

```js
try {
  await sdk.api.player.setGameProperty('level', '10');
} catch (error) {
  console.error('Failed to save game property:', error);
}
```

### Integration with Game Frameworks

The SDK works seamlessly with popular game frameworks:

```js
// Example with Phaser
class GameScene extends Phaser.Scene {
  async create() {
    // Load player progress when scene starts
    const level = await sdk.api.player.getGameProperty('level') || '1';
    this.currentLevel = parseInt(level, 10);
    
    // Set up the level
    this.setupLevel(this.currentLevel);
  }
  
  async completeLevel() {
    // Save progress and track completion
    await sdk.api.player.setGameProperty('level', (this.currentLevel + 1).toString());
    await sdk.api.player.trackEvent('quest:levelCompleted', {
      level: this.currentLevel,
      stars: this.stars
    });
  }
}
```

## Integrating Your Game with Quested

Once you've built your game using the SDK, follow these steps to publish it on the Quested platform:

1. **Development & Testing**: Fully test your game using the local development mode.
2. **Contact Quested**: Email yev@quested.co to start the publishing process.
3. **Submission**: The Quested team will provide details on how to submit your game for review.
4. **Review Process**: Your game will be reviewed for quality and educational value.
5. **Publication**: Once approved, your game will be published on Quested.io and made available to the public.

### About the Quested Ecosystem

Quested is the Steam of educational gaming - a platform where:

- **Game Developers** can create and publish educational games without worrying about backend infrastructure, user management, or distribution
- **Students** can discover and play games that make learning engaging and effective
- **Teachers** can assign specific games and track student progress through detailed analytics

### Platform Benefits

By integrating your game with Quested, you gain access to:

#### AI-Generated Game Levels
Provide a schema for your game levels, and Quested's AI can automatically generate custom content tailored to specific learning objectives or difficulty levels.

#### Leaderboards
Built-in competitive features that encourage engagement and replay value.

#### Level Library
A growing collection of user-created and AI-generated levels for your game that extends its educational value and replayability.

#### Analytics & Insights
Comprehensive data on how students interact with your game, helping you improve and iterate.

#### Distribution
Reach educational institutions and individual learners through Quested's growing platform.

## Documentation

For detailed API documentation, see [Documentation generated from source files by Typedoc](./docs/README.md).

## License

Released under [MIT License](./LICENSE).