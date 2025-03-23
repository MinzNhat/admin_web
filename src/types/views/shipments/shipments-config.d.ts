declare type Agency = {
    name: string;
};

declare type Shipment = {
    id: string;
    createdAt: string;
    updatedAt: string;
    destinationAgency?: Agency;
    destinationAgencyId?: string;
    sourceAgency?: Agency;
    sourceAgencyId?: string;
    mass: number;
    status: string;
    vehicleId: string;
};