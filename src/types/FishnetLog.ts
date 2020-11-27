import {FishnetStateEnum} from "@/enums/FishnetStateEnum";

export type FishnetLog = {
    id: number
    type: FishnetStateEnum
    created_at: Date
}