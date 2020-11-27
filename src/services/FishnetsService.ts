import {injectable} from "inversify";
import {Fishnet} from "@/types/Fishnet";
import api from '@/plugins/api';
import {ICreateFishnetForm} from "@/interfaces/forms/ICreateFishnetForm";

@injectable()
export class FishnetsService {
    public async getMyFishnets(): Promise<Array<Fishnet>> {
        const response = await api.get('/fishnets/my');
        return response.data;
    }

    public async getAllFishnets(): Promise<Array<Fishnet>> {
        const response = await api.get('/fishnets');
        return response.data;
    }

    public async getFishnetById(id: number): Promise<Fishnet> {
        const response = await api.get('/fishnets/' + id);
        return response.data;
    }

    public async markAsLost(id: number): Promise<Fishnet> {
        const response = await api.post('/fishnets/' + id + '/lost');
        return response.data;
    }

    public async deleteFishnet(id: number): Promise<Fishnet> {
        const response = await api.delete('/fishnets/' + id);
        return response.data;
    }

    public async create(form: ICreateFishnetForm): Promise<Array<Fishnet>> {
        const response = await api.post('/fishnets', form);
        return response.data;
    }

    public async changeStatus(id: number, state: string): Promise<Fishnet> {
        const response = await api.post('fishnets/' + id + '/state', {state: state});
        return response.data;
    }

    public async renew(id: number): Promise<Fishnet> {
        const response = await api.post('fishnets/' + id + '/renew');
        return response.data;
    }
}