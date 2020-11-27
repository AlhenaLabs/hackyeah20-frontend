import {RolesEnum} from "@/enums/RolesEnum";

export type User = {
    email: string
    name: string
    role: RolesEnum
}