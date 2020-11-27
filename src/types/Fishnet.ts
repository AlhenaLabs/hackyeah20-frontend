import {FishnetStateEnum} from "@/enums/FishnetStateEnum";
import {User} from "@/types/User";
import {FishnetLog} from "@/types/FishnetLog";

export type Fishnet = {
    id: number
    rfid: number
    seller: User | null
    customer: User | null
    logs: Array<FishnetLog> | null | undefined
    state: FishnetStateEnum
    created_at: Date
    updated_at: Date
}