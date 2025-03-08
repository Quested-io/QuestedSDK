import { create, init, instance } from '../src/index';
import { BridgeService } from '../src/utils/Bridge.service';
import { MockStorageService } from './mocks/storage.mock';

// Mock localStorage operations
let mockStorage: Record<string, string> = {};

// Configure localStorage mock methods
beforeAll(() => {
  // Replace the localStorage implementation directly
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn((key: string) => mockStorage[key] || null),
      setItem: jest.fn((key: string, value: string) => {
        mockStorage[key] = value;
      }),
      clear: jest.fn(() => {
        mockStorage = {};
      }),
      removeItem: jest.fn((key: string) => {
        delete mockStorage[key];
      }),
      get length() {
        return Object.keys(mockStorage).length;
      },
      key: jest.fn((index: number) => Object.keys(mockStorage)[index] || null)
    },
    writable: true
  });
});

// Mock postMessage
const mockPostMessage = jest.fn();
Object.defineProperty(window, 'parent', {
  value: {
    postMessage: mockPostMessage,
  },
});

// Helper to create mock MessageEvent
const createMessageEvent = (type: string, payload: any) => {
  return {
    data: {
      type,
      source: 'QUESTED',
      payload,
    },
  } as MessageEvent;
};

describe('QuestedSDK', () => {
  beforeEach(() => {
    // Clear mocks and localStorage before each test
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe('SDK Initialization', () => {
    it('should initialize with bridge mode by default', () => {
      const sdk = create({ activityId: 'test-activity' });
      expect(sdk).toBeDefined();
      expect(sdk.api.player).toBeDefined();
      expect(sdk.isInitialized()).toBe(false);
    });

    it('should initialize with local mode when specified', () => {
      const sdk = create({ 
        activityId: 'test-activity',
        mode: 'local'
      });
      expect(sdk).toBeDefined();
      expect(sdk.api.player).toBeDefined();
      expect(sdk.isInitialized()).toBe(false);
    });

    it('should call onReady callback when initialized', async () => {
      const onReadyMock = jest.fn();
      create({ 
        activityId: 'test-activity',
        onReady: onReadyMock
      });
      
      // Give time for promises to resolve
      await new Promise(resolve => setTimeout(resolve, 100));
      
      expect(onReadyMock).toHaveBeenCalled();
    });
  });

  describe('LocalStorage Mode', () => {
    it('should store and retrieve game properties', async () => {
      const sdk = create({ 
        activityId: 'test-activity',
        mode: 'local'
      });
      
      await sdk.api.player.setGameProperty('testKey', 'testValue');
      const value = await sdk.api.player.getGameProperty('testKey');
      
      expect(value).toBe('testValue');
    });

    it('should return player profile in local mode', async () => {
      const sdk = create({ 
        activityId: 'test-activity',
        mode: 'local'
      });
      
      const profile = await sdk.api.player.me();
      
      expect(profile).toBeDefined();
      expect(profile.id).toBe('local-profile-id');
      expect(profile.publicName).toBe('Local User');
    });

    it('should update profile specification', async () => {
      const sdk = create({ 
        activityId: 'test-activity',
        mode: 'local'
      });
      
      await sdk.api.player.updateProfileSpecification('testSpec', 'testValue');
      const profile = await sdk.api.player.me();
      
      expect(profile.profileSpecifications).toContainEqual(
        expect.objectContaining({
          id: 'testSpec',
          value: 'testValue'
        })
      );
    });

    it('should manage lists', async () => {
      const sdk = create({ 
        activityId: 'test-activity',
        mode: 'local'
      });
      
      // Add item to list
      await sdk.api.player.addToList('favorites', 'test-item-id');
      
      // Get all lists
      const lists = await sdk.api.player.getAllLists();
      
      expect(lists).toHaveLength(1);
      expect(lists[0].id).toBe('favorites');
      expect(lists[0].profiles).toContainEqual(
        expect.objectContaining({
          id: 'test-item-id'
        })
      );
      
      // Remove item from list
      await sdk.api.player.removeFromList('favorites', 'test-item-id');
      
      const updatedLists = await sdk.api.player.getAllLists();
      expect(updatedLists[0].profiles).not.toContainEqual(
        expect.objectContaining({
          id: 'test-item-id'
        })
      );
    });
  });

  describe('Bridge Mode', () => {
    it('should send messages via postMessage', async () => {
      const sdk = create({ 
        activityId: 'test-activity',
        mode: 'bridge'
      });
      
      // Mock the waitForReply method directly
      BridgeService.prototype.waitForReply = jest.fn().mockResolvedValue({ id: 'bridge-profile-id' });
      
      await sdk.api.player.me();
      
      expect(mockPostMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'request:getProfile',
          source: 'test-activity'
        }),
        '*'
      );
    });

    it('should track events', async () => {
      const sdk = create({ 
        activityId: 'test-activity',
        mode: 'bridge'
      });
      
      await sdk.api.player.trackEvent('activity:started', { gameId: 'test-game' });
      
      expect(mockPostMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'activity:started',
          source: 'test-activity',
          payload: { gameId: 'test-game' }
        }),
        '*'
      );
    });
  });

  describe('Global instance', () => {
    it('should create a global instance when init is called', () => {
      init({ activityId: 'test-activity' });
      
      expect(instance).toBeDefined();
      expect(instance.api.player).toBeDefined();
    });
  });
});