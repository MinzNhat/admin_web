declare type Customer = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
}

declare type ShippingBillData = {
    id: string;
    companyName: string;
    companyAddress: string;
    taxCode: string;
    email: string;
    customerId: string;
    customer: Customer;
    createdAt: string;
    updatedAt: string;
}