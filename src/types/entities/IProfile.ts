import type {IProfileSpecification} from "./IProfileSpecification.js";
import type {ICategory} from "./ICategory.js";

export interface IProfile {
  id: string;
  createdAt: Date;
  profileSpecifications: IProfileSpecification[];
  type: IProfileType;
  avatarUrl?: string;
  publicName?: string;
  description?: string;
  categories: ICategory[];
  isPublic: boolean;
}

export type IProfileType = 'buyer' | 'seller' | 'institution';
