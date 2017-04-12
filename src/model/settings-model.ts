import { UserModel } from './models';

export class SettingsModel {
    isFirstRun?: boolean
    searchRadius?: number
    user?: UserModel
}