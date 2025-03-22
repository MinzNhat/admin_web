import axios, { AxiosResponse } from "axios";

import { AddJourneyNodeDto, AddOrderToShipmentDto, AssignTaskToShipperDto, CalculateFeePayload, ConfigDepositDto, ConfigServicesDto, CreateAgencyDto, CreateCargoInsuranceDto, CreateFavoriteOrderLocationDto, CreateGiftOrderTopicDto, CreateOrderDto, CreateShipmentDto, CreateShippingBillDto, CreateStaffDto, CreateVoucherDto, CustomerLoginDto, FileID, MultiFileUpload, OrderImageType, OrderStatus, SearchCriteria, SearchPayload, StaffLoginDto, UpdateAgencyDto, UpdateCargoInsuranceDto, UpdateCustomerDto, UpdateFavoriteOrderLocationDto, UpdateOrderDto, UpdateOrderLocationDto, UpdateShipperStatusDto, UpdateStaffDto, UpdateTaskDto, VerifyOtpDto } from "./interface";
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
            console.log("Error creating agency: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null,
            };
        }
    }

    async search(payload: SearchPayload, token: string) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/search`, payload, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
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
            console.log("Error searching agency: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null,
            };
        }
    }

    async update(id: UUID, payload: UpdateAgencyDto, token: string) {
        try {
            const response: AxiosResponse = await axios.put(`${this.baseUrl}/update/${id}`, payload, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
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
            console.log("Error updating agency: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null,
            };
        }
    }

    async delete(id: UUID, token: string) {
        try {
            const response: AxiosResponse = await axios.delete(`${this.baseUrl}/delete/${id}`, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
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
            console.log("Error deleting agency: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null,
            };
        }
    }

    async downloadContractFile(fileId: UUID, token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/contract/download/${fileId}`, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                responseType: 'stream',
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status,
                stream: response.data, // Dữ liệu stream của file
            };
        } catch (error: any) {
            console.log("Error downloading contract file: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null,
            };
        }
    }

    async downloadCompanyLicenseFile(fileId: UUID, token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/company/license/download/${fileId}`, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                responseType: 'stream',
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status,
                stream: response.data, // Dữ liệu stream của file
            };
        } catch (error: any) {
            console.log("Error downloading company license file: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null,
            };
        }
    }
}

export class CargoInsuranceOperation {
    private baseUrl: string;

    constructor() {
        this.baseUrl = 'https://api.tdlogistics.net.vn/v3/cargo_insurance';
    }

    async getByCustomerId(orderId: UUID, token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/order/get/${orderId}`, {
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
            console.log("Error fetching cargo insurance: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }

    async update(updateDto: UpdateCargoInsuranceDto, id: UUID, token: string, files?: File[]) {
        try {
            const formData = new FormData();

            // Append all fields from updateDto to formData
            Object.keys(updateDto).forEach((key) => {
                formData.append(key, (updateDto as any)[key]);
            });

            // If there are files, append them to formData
            if (files && files.length > 0) {
                files.forEach((file) => formData.append("file", file));
            }

            const response: AxiosResponse = await axios.put(`${this.baseUrl}/update/${id}`, formData, {
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
        } catch (error: any) {
            console.log("Error updating cargo insurance: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }

    async create(payload: CreateCargoInsuranceDto, token: string, files?: File[]) {
        try {
            const formData = new FormData();

            // Append all fields from payload to formData
            Object.keys(payload).forEach((key) => {
                formData.append(key, (payload as any)[key]);
            });

            // If there are files, append them to formData
            if (files && files.length > 0) {
                files.forEach((file) => formData.append("file", file));
            }

            const response: AxiosResponse = await axios.post(`${this.baseUrl}/create`, formData, {
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
        } catch (error: any) {
            console.log("Error creating cargo insurance: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }
}

export class ConfigOperation {
    private baseUrl: string;

    constructor() {
        this.baseUrl = 'https://api.tdlogistics.net.vn/v3/config';
    }

    async configDeposit(dto: ConfigDepositDto, token: string) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/deposit`, dto, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        } catch (error: any) {
            console.log("Error updating deposit config: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }

    async configServiceOnWard(dto: ConfigServicesDto, token: string) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/service`, dto, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        } catch (error: any) {
            console.log("Error updating service on ward: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }

    async getServicesByWardId(wardId: number, token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/service/${wardId}`, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        } catch (error: any) {
            console.log("Error fetching services by ward: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
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
    async confirmEnteringAgency(id: string, token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/confirm_entering_agency/${id}`, {
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
            console.log("Error confirming order entering agency: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null,
            };
        }
    }

    async updateOrder(id: string, payload: UpdateOrderDto, token: string) {
        try {
            const response: AxiosResponse = await axios.put(`${this.baseUrl}/update/${id}`, payload, {
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
            console.log("Error updating order: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null,
            };
        }
    }

    async deleteOrder(id: string, token: string) {
        try {
            const response: AxiosResponse = await axios.delete(`${this.baseUrl}/delete/${id}`, {
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
            console.log("Error deleting order: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null,
            };
        }
    }

    async getOrderInsurance(id: string, token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/insurance/${id}`, {
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
            console.log("Error getting order insurance: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null,
            };
        }
    }

    async getProcessingOrders(token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/status/processing`, {
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
            console.log("Error getting processing orders: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null,
            };
        }
    }

    async getAllOrders(token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}`, {
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
            console.log("Error getting all orders: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null,
            };
        }
    }

    async getThirdPartyOrders(token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/status/needThirdParty`, {
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
            console.log("Error getting third party orders: ", error?.response?.data);
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

export class ShipmentOperation {
    private baseUrl: string;

    constructor() {
        this.baseUrl = 'https://api.tdlogistics.net.vn/v3/shipment';
    }

    async create(dto: CreateShipmentDto, token: string) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/create`, dto, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        } catch (error: any) {
            console.log("Error creating shipment: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }

    async addOrdersToShipment(dto: AddOrderToShipmentDto, token: string) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/order/add`, dto, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        } catch (error: any) {
            console.log("Error adding orders to shipment: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }

    async confirmAllOrdersInShipmentLeavingAgency(shipmentId: UUID, token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/order/confirm_leaving_agency/${shipmentId}`, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        } catch (error: any) {
            console.log("Error confirming orders leaving agency: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }

    async confirmAllOrdersInShipmentEnteringAgency(shipmentId: UUID, token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/order/confirm_entering_agency/${shipmentId}`, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        } catch (error: any) {
            console.log("Error confirming orders entering agency: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }

    async decompose(shipmentId: UUID, token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/decompose/${shipmentId}`, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        } catch (error: any) {
            console.log("Error decomposing shipment: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }

    async search(payload: SearchPayload, token: string) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/search`, payload, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        } catch (error: any) {
            console.log("Error searching shipment: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }

    async getOrdersFromShipment(shipmentId: UUID, token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/order/get/${shipmentId}`, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        } catch (error: any) {
            console.log("Error fetching orders from shipment: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }
}

export class ShippingBillOperation {
    private baseUrl: string;

    constructor() {
        this.baseUrl = 'https://api.tdlogistics.net.vn/v3/shipping_bill';
    }

    async create(dto: CreateShippingBillDto, token: string) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/create`, dto, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        } catch (error: any) {
            console.log("Error creating shipping bill: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }

    async getByCustomerId(customerId: UUID, token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/customer/get`, {
                params: { customerId },
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        } catch (error: any) {
            console.log("Error fetching shipping bill by customer: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }

    async search(payload: SearchPayload, token: string) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/search`, payload, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        } catch (error: any) {
            console.log("Error searching shipping bills: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
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

    async searchCustomer(dto: SearchPayload, token: string) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/search`, dto, {
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
            console.log("Error searching customer: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }
}

export class DriverTaskOperation {
    private baseUrl: string;

    constructor() {
        this.baseUrl = "https://api.tdlogistics.net.vn/v3/task/driver";
    }

    async assignTask(dto: { shipmentId: string; staffId: string }, token: string) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/assign`, dto, {
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
            console.log("Error assigning task: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }

    async searchTasks(dto: SearchPayload, token: string) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/search`, dto, {
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
            console.log("Error searching tasks: ", error?.response?.data);
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
            console.log("Error creating staff: ", error?.response?.data);
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
            console.log("Error searching staff: ", error?.response?.data);
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
            console.log("Error fetching staff info: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async update(id: UUID, dto: UpdateStaffDto, token: string) {
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
            console.log("Error updating staff: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async updateShipperStatus(dto: UpdateShipperStatusDto, token: string) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/status/update`, dto, {
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
            console.log("Error updating shipper status: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async searchByName(name: string, token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/search_by_name/${name}`, {
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
            console.log("Error searching staff by name: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async searchByCccd(cccd: string, token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/search_by_cccd/${cccd}`, {
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
            console.log("Error searching staff by cccd: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async searchByRole(role: string, token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/search_by_role/${role}`, {
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
            console.log("Error searching staff by role: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async getShipperExtendedInfo(id: UUID, token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/shipper/get_extended_info/${id}`, {
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
            console.log("Error fetching shipper extended info: ", error?.response?.data);
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
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/shipper/confirm_taken_fail`, {
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
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/shipper/confirm_taken_success`, {
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
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/shipper/confirm_delivering`, {
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
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/shipper/confirm_received`, {
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
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/shipper/journey/add`, payload, {
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
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/shipper/journey/get`, {
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

    async assignTaskToShipper(payload: AssignTaskToShipperDto, token: string) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/shipper/assign`, payload, {
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
            console.log("Error assigning task to shipper: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }

    // AGENCY: Cập nhật thông tin công việc
    async updateTask(id: UUID, payload: UpdateTaskDto, token: string) {
        try {
            const response: AxiosResponse = await axios.put(`${this.baseUrl}/shipper/update/${id}`, payload, {
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
            console.log("Error updating task: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }

    // AGENCY: Xóa công việc
    async deleteTask(id: UUID, token: string) {
        try {
            const response: AxiosResponse = await axios.delete(`${this.baseUrl}/shipper/delete/${id}`, {
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
            console.log("Error deleting task: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }

    // AGENCY: Xác nhận công việc hoàn thành
    async confirmCompletedTask(id: UUID, token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/shipper/completed/${id}`, {
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
            console.log("Error confirming completed task: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }

    // Tìm kiếm công việc theo trạng thái hoàn thành (completed)
    async searchByCompleted(completed: boolean, token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/shipper/search_by_completed/${completed}`, {
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
            console.log("Error searching tasks by completed status: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }

    // Tìm kiếm công việc theo tên shipper
    async searchByShipperName(shipperName: string, token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/shipper/search_by_shipper_name/${shipperName}`, {
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
            console.log("Error searching tasks by shipper name: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }

    // Tìm kiếm công việc theo orderId
    async searchByOrderId(orderId: UUID, token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/shipper/search_by_order_id/${orderId}`, {
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
            console.log("Error searching tasks by order ID: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }
}

export class VoucherOperation {
    private baseUrl: string;

    constructor() {
        this.baseUrl = 'https://api.tdlogistics.net.vn/v3/voucher';
    }

    async create(payload: CreateVoucherDto, token: string) {
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
        } catch (error: any) {
            console.log("Error creating voucher: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async getVouchersByCustomer(page: number, size: number, token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/get`, {
                params: {
                    page: page,
                    size: size
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
            console.log("Error fetching vouchers: ", error?.response?.data);
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
        } catch (error: any) {
            console.log("Error searching vouchers: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }
}