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
}