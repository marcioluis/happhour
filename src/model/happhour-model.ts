import { UserModel, PlaceModel } from "./models";

export class HappHourModel {
    id?: number
    name?: string
    creator?: UserModel
    place?: PlaceModel
    invited?: UserModel[]
    data?: string
    isPublic?: boolean
    isActive?: boolean

}