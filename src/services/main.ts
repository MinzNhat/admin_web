import axios, { AxiosResponse } from "axios";

import { AddJourneyNodeDto, CalculateFeePayload, CreateAgencyDto, CreateFavoriteOrderLocationDto, CreateGiftOrderTopicDto, CreateOrderDto, CreateStaffDto, CustomerLoginDto, FileID, MultiFileUpload, OrderImageType, OrderStatus, SearchPayload, StaffLoginDto, UpdateCargoInsuranceDto, UpdateCustomerDto, UpdateFavoriteOrderLocationDto, UpdateOrderLocationDto, VerifyOtpDto } from "./interface";
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

export class CargoInsuranceOperation {
    private baseUrl: string;

    constructor() {
        this.baseUrl = 'https://api.tdlogistics.net.vn/v3/cargo_insurance';
    }

    async getByCustomerId(customerId: UUID, token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/order/get/${customerId}`, {
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
            console.log("Error searching cargo insurance: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async update(updateDto: UpdateCargoInsuranceDto, id: UUID, token: string, files?: File[]) {
        try {
            const formData = new FormData();

            Object.keys(updateDto).forEach((key) => {
                formData.append(key, (updateDto as any)[key]);
            });

            if (files && files.length > 0) {
                files.forEach((file) => formData.append("file", file));
            }

            const response: AxiosResponse = await axios.put(`${this.baseUrl}/update/${id}`, updateDto, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    "Content-Type": "multipart/form-data",
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
            console.log("Error updating cargo insurance: ", error?.response?.data);
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
            console.log("Error creating order: ", error?.response?.data);
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
            console.log("Error searching orders: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async getById(id: string, token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/${id}`, {
                withCredentials: true,
                validateStatus: (status) => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status,
            };
        } catch (error: any) {
            console.log("Error getting order by id: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null,
            };
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
            console.log("Error calculating fee: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async uploadImage(orderId: string, type: OrderImageType, files: File[], token: string) {
        try {
            const formData = new FormData();
            files.forEach((file) => formData.append("file", file));

            const response: AxiosResponse = await axios.put(`${this.baseUrl}/image/upload`, formData, {
                params: { orderId, type },
                withCredentials: true,
                validateStatus: (status) => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status,
            };
        } catch (error: any) {
            console.error("Error updating image: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null,
            };
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
            console.log("Error downloading image: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async deleteImage(id: string, token: string) {
        try {
            const response: AxiosResponse = await axios.delete(`${this.baseUrl}/image/delete/${id}`, {
                withCredentials: true,
                validateStatus: (status) => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status,
            };
        } catch (error: any) {
            console.error("Error deleting image: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null,
            };
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
            console.log("Error downloading signature: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async getCurrentShipperJourney(id: string, token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/shipper/current_journey/${id}`, {
                withCredentials: true,
                validateStatus: (status) => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status,
            };
        } catch (error: any) {
            console.log("Error getting current shipper journey: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null,
            };
        }
    }

    async getShipperWhoTakenOrder(id: string, token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/shipper/get/${id}`, {
                withCredentials: true,
                validateStatus: (status) => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status,
            };
        } catch (error: any) {
            console.log("Error getting shipper who taken order: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null,
            };
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
            console.log("Error creating favorite location: ", error?.response?.data);
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
            console.log("Error searching favorite location: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    // CUSTOMER
    async update(id: UUID, dto: UpdateFavoriteOrderLocationDto, token: string) {
        try {
            const response: AxiosResponse = await axios.put(`${this.baseUrl}/update/${id}`, dto, {
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
            console.log("Error updating favourite order location: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    // CUSTOMER
    async delete(id: UUID, token: string) {
        try {
            const response: AxiosResponse = await axios.delete(`${this.baseUrl}/delete/${id}`, {
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
            console.log("Error deleting favourite order location: ", error?.response?.data);
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
            console.log("Error creating order location: ", error?.response?.data);
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
            console.log("Error fetching order locations: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async update(id: string, payload: UpdateOrderLocationDto, token: string) {
        try {
            const response: AxiosResponse = await axios.put(`${this.baseUrl}/update/${id}`, payload, {
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
            console.log("Error updating order location: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }

    // CUSTOMER
    async destroy(id: string, token: string) {
        try {
            const response: AxiosResponse = await axios.delete(`${this.baseUrl}/delete/${id}`, {
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
            console.log("Error deleting order location: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }
}

export class SendingOrderRequestOperation {
    private baseUrl: string;
    constructor() {
        this.baseUrl = 'https://api.tdlogistics.net.vn/v3/sending_order_request';
    }

    // SHIPPER: Hủy yêu cầu lấy hàng
    async cancel(
        orderId: UUID,
        reason: OrderStatus.TAKEN_FAIL_DUE_TO_SHIPPER | OrderStatus.TAKEN_FAIL_DUE_TO_CUSTOMER_CANCELLING,
        token: string
    ) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/cancel`, {
                params: { orderId, reason },
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
            console.log("Error canceling sending order request: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }

    // SHIPPER, ADMIN, AGENCY: Tra cứu yêu cầu lấy hàng
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
            console.log("Error searching sending order requests: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }

    // SHIPPER: Tiếp nhận đơn hàng (accept)
    async accept(orderId: UUID, token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/accept/${orderId}`, {
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
            console.log("Error accepting sending order request: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
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

    async update(dto: UpdateCustomerDto, token: string) {
        try {
            const response: AxiosResponse = await axios.put(`${this.baseUrl}/update`, dto, {
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
            console.log("Error updating customer: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
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
        this.baseUrl = 'https://api.tdlogistics.net.vn/v3/task';
    }

    // SHIPPER: Tìm kiếm công việc theo payload
    async search(payload: SearchPayload, token: string) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/shipper/search`, payload, {
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
            console.log("Error searching tasks: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }

    // SHIPPER: Xác nhận không tiếp nhận đơn hàng (do TIMEOUT, SHIPPER hoặc CUSTOMER_CANCELLING)
    async confirmTakenFail(id: UUID, dueTo: 'TIMEOUT' | 'SHIPPER' | 'CUSTOMER_CANCELLING', token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/confirm_taken_fail`, {
                params: { id, dueTo },
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
            console.log("Error confirming taken fail: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }

    // SHIPPER: Xác nhận đã tiếp nhận đơn hàng thành công
    async confirmTakenSuccess(id: UUID, token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/confirm_taken_success`, {
                params: { id },
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
            console.log("Error confirming taken success: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }

    // SHIPPER: Xác nhận đang giao hàng
    async confirmDelivering(id: UUID, token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/confirm_delivering`, {
                params: { id },
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
            console.log("Error confirming delivering: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }

    // SHIPPER: Xác nhận đã nhận hàng thành công
    async confirmReceived(id: UUID, token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/confirm_received`, {
                params: { id },
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
            console.log("Error confirming received: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }

    // SHIPPER: Thêm node vào hành trình (journey) của đơn hàng
    async addJourneyNode(journeyNodeId: number, payload: AddJourneyNodeDto, token: string) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/journey/add`, payload, {
                params: { id: journeyNodeId },
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
            console.log("Error adding journey node: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }

    // SHIPPER: Lấy thông tin hành trình của đơn hàng
    async getJourneyNode(journeyNodeId: UUID, token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/journey/get`, {
                params: { id: journeyNodeId },
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
            console.log("Error getting journey node: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }
}