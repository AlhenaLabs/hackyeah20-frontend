import {RolesEnum} from "@/enums/RolesEnum";

export type User = {
    id: number
    email: string
    name: string
    role: RolesEnum
}