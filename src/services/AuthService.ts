import {injectable} from 'inversify';
import {User} from "@/types/User";
import {StorageKeys} from "@/enums/StorageKeys";
import {ILoginForm} from "@/interfaces/forms/ILoginForm";
import {AxiosResponse} from 'axios';
import api from '@/plugins/api';
import {EndpointsEnum} from "@/enums/EndpointsEnum";

@injectable()
export class AuthService {
    public async login(form: ILoginForm): Promise<void> {
        const response: AxiosResponse = await api.post(EndpointsEnum.LOGIN, form);
        const data = response.data;

        localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));
        localStorage.setItem(StorageKeys.AUTH_TOKEN, data.token);
    }

    public logout(): void {
        localStorage.removeItem(StorageKeys.USER);
        localStorage.removeItem(StorageKeys.AUTH_TOKEN);
    }

    public getLoggedUser(): User | null {
        const user = localStorage.getItem(StorageKeys.USER);
        return user ? JSON.parse(user) : null;
    }
}