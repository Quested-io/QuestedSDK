// Example of using the SDK in local mode
import { init } from '../../dist/index.esm.js';

// Initialize the SDK with local mode
const sdk = init({
  activityId: 'test-activity',
  mode: 'local', // This enables local storage mode
  onReady: () => {
    console.log('SDK is ready in local mode');
    startDemo();
  }
});

async function startDemo() {
  try {
    // Get current profile
    const profile = await sdk.api.player.me();
    console.log('Current profile:', profile);

    // Set a game property
    await sdk.api.player.setGameProperty('score', '100');
    console.log('Set game property: score = 100');

    // Get the game property
    const score = await sdk.api.player.getGameProperty('score');
    console.log('Retrieved game property:', score);

    // Update profile specification
    await sdk.api.player.updateProfileSpecification('level', '5');
    console.log('Updated profile specification: level = 5');

    // Get lists
    const lists = await sdk.api.player.getAllLists();
    console.log('Available lists:', lists);

    // If we have a favorites list, add the current profile to it
    if (lists.length > 0) {
      const favoritesList = lists[0];
      await sdk.api.player.addToList(favoritesList.id, profile.id);
      console.log(`Added profile to list: ${favoritesList.name}`);

      // Get the updated lists
      const updatedLists = await sdk.api.player.getAllLists();
      console.log('Updated lists:', updatedLists);
    }

    // Track an event
    await sdk.api.player.trackEvent('game:levelCompleted', { level: 1, score: 100 });
    console.log('Tracked event: game:levelCompleted');

    console.log('Demo completed successfully!');
  } catch (error) {
    console.error('Error in demo:', error);
  }
}

// In a real application, you would add this to your HTML:
// <div id="app">
//   <h1>Local Mode Demo</h1>
//   <p>Check the console for output.</p>
// </div>