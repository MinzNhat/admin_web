import { OrderData } from "../orders/orders-config";

declare type TaskData = {
    id: string;
    completed: boolean;
    completedAt?: string;
    journey: string[][];
    order?: OrderData;
    orderId: string;
    staff: StaffInfo;
    staffId: string;
    updatedAt: string;
}