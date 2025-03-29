declare type ManagerInfo = {
    agencyId: string;
    avatar?: string;
    bank?: string;
    bin?: string;
    birthDate?: string;
    cccd: string;
    deposit?: number;
    detailAddress: string;
    district: string;
    email?: string;
    fullname: string;
    id: string;
    paidSalary: number;
    phoneNumber?: string;
    province: string;
    salary: number;
    staffId: string;
    town: string;
    username: string;
};

declare License = {
    name: string,
    path: string
}

declare type Company = {
    id: string,
    taxCode: string,
    name: string,
    licenses: License[]
}

declare type AgencyInfo = {
    bank: string;
    bin: string;
    commissionRate: number;
    createdAt: string;
    detailAddress: string;
    district: string;
    email: string;
    id: string;
    isIndividual: boolean;
    latitude: number;
    level: string;
    longitude: number;
    manager: ManagerInfo;
    managerId: string;
    name: string;
    phoneNumber: string;
    postalCode: string;
    province: string;
    revenue: number;
    town: string;
    type: string;
    updatedAt: string;
    company: Company;
    contracts: License[];
};
