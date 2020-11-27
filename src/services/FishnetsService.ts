import {injectable} from "inversify";
import {Fishnet} from "@/types/Fishnet";
import api from '@/plugins/api';

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
}