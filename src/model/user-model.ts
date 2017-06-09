export class UserModel {
    id?: number
    providerIdToken: string
    email: string
    displayName: string
    familyName: string
    givenName: string
    provider: string
    authCode?: string
    providerUserId?: string
    imageUrl?: string
    gender?: string
    telephone?: string
}

export class UserModelHappHour extends UserModel {
    isConfirmed?: boolean
    isRefused?: boolean
    isCheckedin?: boolean
}