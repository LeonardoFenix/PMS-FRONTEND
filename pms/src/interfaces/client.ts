export interface IClient {
    id:Number;
    name: string;
    cpf: string;
    birthDate: Date | null;
    address: any[];
}