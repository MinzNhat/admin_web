import { JourneyData, OrderData } from "../orders/orders-config";

declare type TaskData = {
    id: string;
    completed: boolean;
    completedAt?: string;
    journey: JourneyData;
    order?: OrderData;
    orderId: string;
    staff: StaffInfo;
    staffId: string;
    updatedAt: string;
}