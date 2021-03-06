import api from '@/plugins/api';
import {EndpointsEnum} from "@/enums/EndpointsEnum";
import {User} from "@/types/User";
import {injectable} from "inversify";
import ICreateUserForm from "@/interfaces/forms/ICreateUserForm";
import {StorageKeys} from "@/enums/StorageKeys";


@injectable()
export class UserService {
    public async getAllUsers(): Promise<Array<User>> {
        const response = await api.get(EndpointsEnum.USERS);
        return response.data;
    }

    public async updateUser() {

        return null;
    }

    public async createUser(form: ICreateUserForm) {
        return await api.post(EndpointsEnum.USERS, form);
    }

    public async removeUser(id: number) {
        return await api.delete(EndpointsEnum.USERS + '/' + id);
    }

    public async resetPassword(id: number) {
        return await api.post(EndpointsEnum.USERS + '/' + id);
    }

    public getCurrentUserRole() {
        const user = JSON.parse(localStorage.getItem(StorageKeys.USER) || '{}');

        return user.role;
    }
}