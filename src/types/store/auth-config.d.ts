import { ShipperType, StaffRole } from "@/services/interface";

declare type AuthState = {
    isAuthenticated: boolean;
    userInfo: StaffInfo | null;
    error: string | SerializedError | null;
    loading: boolean;
}

declare type RoleValue = {
    value: StaffRole;
}

declare type ManagedWard = {
    agencyId: string;
    district: string;
    districtId: number;
    id: number;
    level: string;
    postalCode: string;
    province: string;
    provinceId: number;
    ward: string;
    wardId: number;
};

declare type StaffInfo = {
    agencyId?: string;
    avatar?: string;
    bank?: string;
    bin?: string;
    birthDate?: string;
    cccd?: string;
    createdAt: string;
    shipperDeposit?: number | {deposit: number};
    deposit?: number;
    detailAddress?: string;
    district?: string;
    email: string;
    fullname: string;
    id: string;
    paidSalary?: number;
    phoneNumber: string;
    province?: string;
    roles: RoleValue[];
    salary?: number;
    staffId?: string;
    town?: string;
    updatedAt: string;
    username: string;
    managedWards?: ManagedWard[];
    shipperType?: ShipperType | ShipperType[];
    shipperStatus: boolean;
    paidDebt: number;
    unpaidDebt: number;
    status: string;
};

declare type DayOffInfo = {
    id: string;
    startDate: string;
    endDate: string;
    reason: string;
    staffId: string;
}

declare type StaffInfoUpdate = Omit<StaffInfo, 'roles'> & {
    roles: StaffRole[];
};

declare type RejectedValue = string | SerializedError;