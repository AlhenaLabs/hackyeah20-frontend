import api from '@/plugins/api';
import {EndpointsEnum} from "@/enums/EndpointsEnum";
import {User} from "@/types/User";
import {injectable} from "inversify";


@injectable()
export class UserService {
    public async getAllUsers(): Promise<Array<User>>{
        const response = await api.get(EndpointsEnum.USERS);
        return response.data;
    }

    public async updateUser() {

        return null;
    }

    public async createUser() {

        return null;
    }
}