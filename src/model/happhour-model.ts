import { PlaceModel } from "./place-model";
import { UserModel, UserModelHappHour } from "./user-model";

export class HappHourModel {
    id?: number
    name?: string
    creator?: UserModel
    place?: PlaceModel
    invited?: UserModelHappHour[]
    date?: string
    isPublic?: boolean
    isActive?: boolean
}

export class MyHappHourModel extends HappHourModel {
    isConfirmed?: boolean
    isRefused?: boolean
    isCheckedin?: boolean
    isOwner?: boolean
    isGuest?: boolean
    me?: number
}