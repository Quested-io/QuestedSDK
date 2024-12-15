import type { IProfile } from "./IProfile";
export interface IList {
    id: string;
    ownerId: string;
    name: string;
    description?: string;
    iconUrl?: string;
    profiles: IProfile[];
    isSystem: boolean;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=IList.d.ts.map