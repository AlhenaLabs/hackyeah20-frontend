import {RolesEnum} from "@/enums/RolesEnum";

export type Account = {
    id: number
    name: string
    email: string
    email_verified_at: Date
    created_at: Date
    updated_at: Date
    role: RolesEnum
}