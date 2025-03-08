import { inject, injectable } from 'inversify';
import { LoggerService } from './Logger.service';
import type { IStorageService } from '../types/IStorageService';
import type { IProfile, IProfileType } from '../types/entities/IProfile';
import type { IList } from '../types/entities/IList';
import type { ICategory } from '../types/entities/ICategory';
import type { IProfileSpecification } from '../types/entities/IProfileSpecification';

@injectable()
export class LocalStorageService implements IStorageService {
  private readonly LOCAL_STORAGE_PREFIX = 'quested_sdk_';
  private gameProperties: Record<string, string> = {};
  private mockData: {
    profile: IProfile | null;
    lists: IList[];
  } = {
    profile: null,
    lists: []
  };

  constructor(
    @inject(LoggerService)
    private logger: LoggerService,
  ) {
    this.initializeLocalData();
  }

  async onInstanceInit() {
    // Initialize data if it doesn't exist
    this.initializeLocalData();
  }

  private initializeLocalData() {
    // Check if we already have data in localStorage
    const profileData = localStorage.getItem(`${this.LOCAL_STORAGE_PREFIX}profile`);
    const listsData = localStorage.getItem(`${this.LOCAL_STORAGE_PREFIX}lists`);
    const propertiesData = localStorage.getItem(`${this.LOCAL_STORAGE_PREFIX}properties`);

    if (profileData) {
      this.mockData.profile = JSON.parse(profileData);
    } else {
      // Create default profile
      this.mockData.profile = {
        id: 'local-profile-id',
        createdAt: new Date(),
        profileSpecifications: [],
        type: 'buyer' as IProfileType,
        publicName: 'Local User',
        categories: [],
        isPublic: false
      };
      this.saveProfile();
    }

    if (listsData) {
      this.mockData.lists = JSON.parse(listsData);
    } else {
      // Create default lists
      this.mockData.lists = [
        {
          id: 'favorites',
          ownerId: 'local-profile-id',
          name: 'Favorites',
          profiles: [],
          isSystem: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      this.saveLists();
    }

    if (propertiesData) {
      this.gameProperties = JSON.parse(propertiesData);
    } else {
      this.gameProperties = {};
      this.saveProperties();
    }
  }

  private saveProfile() {
    localStorage.setItem(
      `${this.LOCAL_STORAGE_PREFIX}profile`, 
      JSON.stringify(this.mockData.profile)
    );
  }

  private saveLists() {
    localStorage.setItem(
      `${this.LOCAL_STORAGE_PREFIX}lists`, 
      JSON.stringify(this.mockData.lists)
    );
  }

  private saveProperties() {
    localStorage.setItem(
      `${this.LOCAL_STORAGE_PREFIX}properties`, 
      JSON.stringify(this.gameProperties)
    );
  }

  async send(activityId: string, eventType: string, payload: any): Promise<void> {
    this.logger.log(activityId, eventType, payload);
    
    // Handle different event types
    if (eventType === 'system:updateProfileSpecification' && payload.id && payload.value) {
      if (this.mockData.profile) {
        const spec = this.mockData.profile.profileSpecifications.find(s => s.id === payload.id);
        if (spec) {
          spec.value = payload.value;
        } else {
          this.mockData.profile.profileSpecifications.push({
            id: payload.id,
            name: payload.id,
            value: payload.value,
            type: 'text'
          });
        }
        this.saveProfile();
      }
    } else if (eventType === 'system:setGameProperty' && payload.key && payload.value) {
      this.gameProperties[payload.key] = payload.value;
      this.saveProperties();
    } else if (eventType === 'system:addToList' && payload.listId && payload.itemId) {
      const list = this.mockData.lists.find(l => l.id === payload.listId);
      if (list) {
        if (!list.profiles.some(p => p.id === payload.itemId)) {
          // In a real implementation, we'd fetch the profile details
          // For now, we'll just add the ID
          list.profiles.push({
            id: payload.itemId,
            createdAt: new Date(),
            profileSpecifications: [],
            type: 'buyer',
            categories: [],
            isPublic: false
          });
          list.updatedAt = new Date();
          this.saveLists();
        }
      }
    } else if (eventType === 'system:removeFromList' && payload.listId && payload.itemId) {
      const list = this.mockData.lists.find(l => l.id === payload.listId);
      if (list) {
        list.profiles = list.profiles.filter(p => p.id !== payload.itemId);
        list.updatedAt = new Date();
        this.saveLists();
      }
    }
    
    return Promise.resolve();
  }

  waitForReply(eventType: string): Promise<any> {
    // This is a mock implementation for local storage
    // In the local version, we don't need to wait for events
    return Promise.resolve(null);
  }

  async sendAndWaitForReply(
    activityId: string,
    eventType: string,
    payload: any,
  ): Promise<any> {
    this.logger.log(activityId, eventType, payload);
    
    // Handle different request types
    if (eventType === 'request:getProfile') {
      return Promise.resolve(this.mockData.profile);
    } else if (eventType === 'system:getGameProperty' && payload.key) {
      return Promise.resolve(this.gameProperties[payload.key] || '');
    } else if (eventType === 'system:getAllLists') {
      return Promise.resolve(this.mockData.lists);
    }
    
    return Promise.resolve(null);
  }
}