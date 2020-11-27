import {FishnetStateEnum} from "@/enums/FishnetStateEnum";
import {User} from "@/types/User";

export type Fishnet = {
    id: number
    rfid: number
    seller: User | null
    customer: User | null
    state: FishnetStateEnum
    created_at: Date
    updated_at: Date
}