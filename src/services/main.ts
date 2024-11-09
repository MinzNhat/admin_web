import axios, { AxiosResponse } from "axios";

import { AddJourneyNodeDto, CalculateFeePayload, CreateAgencyDto, CreateFavoriteOrderLocationDto, CreateGiftOrderTopicDto, CreateOrderDto, CreateStaffDto, CustomerLoginDto, FileID, MultiFileUpload, OrderImageType, OrderStatus, SearchPayload, StaffLoginDto, VerifyOtpDto } from "./interface";
import { UUID } from "crypto";

export class AgencyOperation {
    private baseUrl: string;


    constructor() {
        this.baseUrl = 'https://api.tdlogistics.net.vn/v3/agency';
    }

    async create(payload: CreateAgencyDto, token: string) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/create`, payload, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        }
        catch (error: any) {
            console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }


    async search(payload: SearchPayload, token: string) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/search`, payload, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        }
        catch (error: any) {
            console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }
}


export class OrdersOperation {
    private baseUrl: string;


    constructor() {
        this.baseUrl = 'https://api.tdlogistics.net.vn/v3/order';
    }

    async create(payload: CreateOrderDto, token: string) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/create`, payload, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        }
        catch (error: any) {
            console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async search(payload: SearchPayload, token: string) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/search`, payload, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        }
        catch (error: any) {
            console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async calculateFee(payload: CalculateFeePayload, token: string) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/fee/calculate`, payload, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        }
        catch (error: any) {
            console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async uploadImage(payload: MultiFileUpload, orderId: UUID, type: OrderImageType, token: string) {
        try {

            const formData = new FormData();
            for (let i = 0; i < payload.files.length; i++) {
                formData.append('file', payload.files[i]);
            }

            const response: AxiosResponse = await axios.post(`${this.baseUrl}/image/upload?orderId=${orderId}&type=${type}`, formData, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };

        } catch (error: any) {
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async downloadImage(payload: FileID, token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/image/download`, {
                params: {
                    fileId: payload.fileId
                },
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                responseType: 'stream'
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        }
        catch (error: any) {
            console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async uploadSignature(payload: MultiFileUpload, orderId: UUID, type: OrderImageType, token: string) {
        try {

            const formData = new FormData();
            for (let i = 0; i < payload.files.length; i++) {
                formData.append('file', payload.files[i]);
            }

            const response: AxiosResponse = await axios.post(`${this.baseUrl}/signature/upload`, formData, {
                params: {
                    orderId,
                    type
                },
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };

        } catch (error: any) {
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async downloadSignature(payload: FileID, token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/signature/download`, {
                params: {
                    fileId: payload.fileId
                },
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                responseType: 'stream'
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        }
        catch (error: any) {
            console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

}

export class FavouriteOrderLocationOperation {
    private baseUrl: string;
    constructor() {
        this.baseUrl = 'https://api.tdlogistics.net.vn/v3/favorite_order_location';
    }

    // CUSTOMER
    async create(payload: CreateFavoriteOrderLocationDto, token: string) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/create`, payload, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        }
        catch (error: any) {
            console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    // CUSTOMER
    async findAll(token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/get`, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        }
        catch (error: any) {
            console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

}

export class GiftOrderTopicOperation {
    private baseUrl: string;
    constructor() {
        this.baseUrl = 'https://api.tdlogistics.net.vn/v3/gift_order_topic';
    }

    // ADMIN
    async create(payload: CreateGiftOrderTopicDto, token: string) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/create`, payload, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        }
        catch (error: any) {
            console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    // ADMIN
    async findAll(token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/get`, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        }
        catch (error: any) {
            console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

}


export class OrderLocationOperation {
    private baseUrl: string;
    constructor() {
        this.baseUrl = 'https://api.tdlogistics.net.vn/v3/order_location';
    }

    // CUSTOMER
    async create(payload: CreateGiftOrderTopicDto, token: string) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/create`, payload, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        }
        catch (error: any) {
            console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    // CUSTOMER
    async findAll(token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/get`, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        }
        catch (error: any) {
            console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

}

export class SendingOrderRequestOperation {
    private baseUrl: string;
    constructor() {
        this.baseUrl = 'https://api.tdlogistics.net.vn/v3/sending_order_request';
    }

    // SHIPPER
    async cancel(orderId: UUID, reason: OrderStatus.TAKEN_FAIL_DUE_TO_SHIPPER | OrderStatus.TAKEN_FAIL_DUE_TO_CUSTOMER_CANCELLING, token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/cancel?orderId=${orderId}&reason=${reason}`, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        }
        catch (error: any) {
            console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    // SHIPPER, ADMIN, AGENCY
    async search(payload: SearchPayload, token: string) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/search`, payload, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        }
        catch (error: any) {
            console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

}


export class AuthOperation {
    private baseUrl: string;


    constructor() {
        this.baseUrl = 'https://api.tdlogistics.net.vn/v3/auth';
    }

    async loggedInByCustomer(payload: CustomerLoginDto) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/customer/login`, payload, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        }
        catch (error: any) {
            console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }


    async verifyOtp(payload: VerifyOtpDto) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/otp/verify`, payload, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        }
        catch (error: any) {
            console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async loggedInByStaff(payload: StaffLoginDto) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/staff/login`, payload, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        }
        catch (error: any) {
            console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

}

export class CustomerOperation {
    private baseUrl: string;

    constructor() {
        this.baseUrl = 'https://api.tdlogistics.net.vn/v3/customer';
    }

    async getInfo(token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/`, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        }
        catch (error: any) {
            console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }
}

export class StaffOperation {
    private baseUrl: string;


    constructor() {
        this.baseUrl = 'https://api.tdlogistics.net.vn/v3/staff';
    }

    async create(payload: CreateStaffDto, token: string) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/create`, payload, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        }
        catch (error: any) {
            console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }


    async search(payload: SearchPayload, token: string) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/search`, payload, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        }
        catch (error: any) {
            console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async getInfo(token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/`, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        }
        catch (error: any) {
            console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

}

export class TaskOperation {
    private baseUrl: string;


    constructor() {
        this.baseUrl = 'https://api.tdlogistics.net.vn/v3/task/shipper';
    }

    async search(payload: SearchPayload, token: string) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/search`, payload, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        }
        catch (error: any) {
            console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }


    // SHIPPER
    async confirmTakenFail(id: UUID, dueTo: 'TIMEOUT' | 'SHIPPER' | 'CUSTOMER_CANCELLING', token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/confirm_taken_fail`, {
                params: {
                    id,
                    dueTo
                },
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        }
        catch (error: any) {
            console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    // SHIPPER
    async confirmTakenSuccess(id: UUID, token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/confirm_taken_success`, {
                params: {
                    id
                },
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        }
        catch (error: any) {
            console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    // SHIPPER
    async confirmDelivering(id: UUID, token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/confirm_delivering`, {
                params: {
                    id
                },
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        }
        catch (error: any) {
            console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    // SHIPPER
    async confirmReceived(id: UUID, token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/confirm_received`, {
                params: {
                    id
                },
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        }
        catch (error: any) {
            console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    // SHIPPER
    async addJourneyNode(journeyNodeId: number, payload: AddJourneyNodeDto, token: string) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/journey/add`, payload, {
                params: {
                    id: journeyNodeId
                },
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        }
        catch (error: any) {
            console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    // SHIPPER
    async getJourneyNode(journeyNodeId: UUID, token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/journey/get`, {
                params: {
                    id: journeyNodeId
                },
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        }
        catch (error: any) {
            console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

}
