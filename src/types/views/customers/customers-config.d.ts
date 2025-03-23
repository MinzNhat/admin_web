declare type User = {
    id: string;
    active: boolean;
};

declare type Customer = {
    id: string;
    firstName?: string;
    lastName?: string;
    email: string;
    phoneNumber: string;
    avatar?: string;
    createdAt: string;
    updatedAt: string;
    user: User;
}