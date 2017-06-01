import { PlaceModel } from "./place-model";
import { UserModel } from "./user-model";

export class HappHourModel {
    id?: number
    name?: string
    creator?: UserModel
    place?: PlaceModel
    invited?: UserModel[]
    date?: string
    isPublic?: boolean
    isActive?: boolean
}

export class MyHappHourModel extends HappHourModel {
    confirmed?: boolean
    refused?: boolean
    checkedin?: boolean
    owner?: boolean
}