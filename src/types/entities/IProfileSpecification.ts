import type {ISpecification} from "./ISpecification.js";

export interface IProfileSpecification {
  id: string;
  specification: ISpecification
  profileId: string;
  value: string;
  createdAt: Date;
}