import {RolesEnum} from "@/enums/RolesEnum";

export default interface ICreateUserForm {
    name: string;
    email: string;
    role: RolesEnum;
}