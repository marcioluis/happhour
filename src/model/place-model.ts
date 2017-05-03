
export class PlaceModel {
    _id: number
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