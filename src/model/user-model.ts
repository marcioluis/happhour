export class UserModel {
    _id: number
    idToken: string
    email: string
    displayName: string
    familyName: string
    givenName: string
    provider: string
    userId?: string
    imageUrl?: string
    gender?: string
}