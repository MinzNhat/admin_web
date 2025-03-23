import { OrderData } from "../orders/orders-config";

declare type DriverTaskData = {
    id: string;
    completed: boolean;
    completedAt?: string;
    shipment?: Shipment;
    shipmentId: string;
    staff: StaffInfo;
    staffId: string;
    updatedAt: string;
}