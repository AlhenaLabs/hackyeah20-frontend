import {AxiosResponse} from 'axios';
import api from '@/plugins/api';
import {EndpointsEnum} from "@/enums/EndpointsEnum";
import {injectable} from "inversify";
import {IUpdateUserForm} from "@/interfaces/forms/IUpdateUserForm";
import {Account} from "@/types/Account";
import {IUpdatePasswordForm} from "@/interfaces/forms/IUpdatePasswordForm";


@injectable()
export class AccountService {
    public async getAccount(): Promise<Account> {
        const response: AxiosResponse = await api.get(EndpointsEnum.ACCOUNT);
        return response.data;
    }

    public async updateAccount(form: IUpdateUserForm) {
        const response: AxiosResponse = await api.put(EndpointsEnum.ACCOUNT, form);
        return response;
    }

    public async updateAccountPass(form: IUpdatePasswordForm) {
        const response: AxiosResponse = await api.patch(EndpointsEnum.ACCOUNT_PASS, form);
        return response;
    }
}