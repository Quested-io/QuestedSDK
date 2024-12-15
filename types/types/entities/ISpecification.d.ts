import type { ICategory } from "./ICategory.js";
import type { IProfileType } from "./IProfile.js";
export interface ISpecification {
    name: string;
    targetType: IProfileType;
    inputType: ISpecificationInputType;
    isRequired: boolean;
    priority: number;
    title: string;
    description: string;
    body: ISpecificationBody;
    category: ICategory;
    createdAt: Date;
    updatedAt: Date;
}
export type ISpecificationInputType = "text" | "richText" | "number" | "date" | "time" | "datetime" | "boolean" | "select" | "multiselect" | "file" | "image" | "video" | "audio" | "location" | "other";
export interface ISpecificationBody {
    [key: string]: any;
}
//# sourceMappingURL=ISpecification.d.ts.map