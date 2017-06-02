
export class PlaceModel {
    id: number
    nome: string
    logoUrl: string
    endereco: string
    telefones: string[]
    descricao: string
    subNome?: string
    isHappyOnDemand?: boolean
    isPontuavel?: boolean
    isReservavel?: boolean
    horariosFuncionamento?: any
    fotosUrls?: string[]
}

export class OpenDay {
    day?: string
    openAt?: string
    closeAt?: string
}