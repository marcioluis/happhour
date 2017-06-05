import { PlaceModel } from "./place-model";
import { UserModel, UserModelHappHour } from "./user-model";

/**
 * Modela um happhour generico
 */
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

/**
 * Expressa caracteristicas do proprio usuario dentro do evento.
 * Se ele confirmou presenca, fez checkin, se é o criador, se é um evento
 * novo na sua lista, etc.
 */
export class MyHappHourModel extends HappHourModel {
    isConfirmed?: boolean
    isRefused?: boolean
    isCheckedin?: boolean
    isOwner?: boolean
    isGuest?: boolean
    me?: number
    isNew?: boolean
}