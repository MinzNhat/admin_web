"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVoucherDto = exports.UpdateCustomerDto = exports.UpdateStaffDto = exports.UpdateShipperStatusDto = exports.UpdateTaskDto = exports.AssignTaskToShipperDto = exports.CreateShippingBillDto = exports.AddOrderToShipmentDto = exports.CreateShipmentDto = exports.UpdateOrderLocationDto = exports.UpdateFavoriteOrderLocationDto = exports.UpdateOrderDto = exports.ConfigServicesDto = exports.ConfigDepositDto = exports.UpdateCargoInsuranceDto = exports.ImageChangeStatusDto = exports.UpdateAgencyDto = exports.CreateCargoInsuranceDto = exports.staffShouldBeGotAttributes = exports.agencyRoles = exports.adminRoles = exports.MissionType = exports.ServiceType = exports.OrderLocationType = exports.GoodType = exports.OrderSignatureType = exports.OrderImageType = exports.AccountNotificationType = exports.SendingOrderRequestStatus = exports.OrderNotificationType = exports.NotificationType = exports.OrderStatus = exports.ShipperType = exports.AgencyType = exports.OtpPurpose = exports.UserRole = exports.StaffRole = void 0;
var StaffRole;
(function (StaffRole) {
    StaffRole["ADMIN"] = "ADMIN";
    StaffRole["MANAGER"] = "MANAGER";
    StaffRole["HUMAN_RESOURCE_MANAGER"] = "HUMAN RESOURCE MANAGER";
    StaffRole["OPERATION_STAFF"] = "OPERATION STAFF";
    StaffRole["TELLER"] = "TELLER";
    StaffRole["AGENCY_MANAGER"] = "AGENCY MANAGER";
    StaffRole["AGENCY_HUMAN_RESOURCE_MANAGER"] = "AGENCY HUMAN RESOURCE MANAGER";
    StaffRole["AGENCY_OPERATION_STAFF"] = "AGENCY OPERATION STAFF";
    StaffRole["AGENCY_TELLER"] = "AGENCY TELLER";
    StaffRole["SHIPPER"] = "SHIPPER";
})(StaffRole || (exports.StaffRole = StaffRole = {}));
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["MANAGER"] = "MANAGER";
    UserRole["HUMAN_RESOURCE_MANAGER"] = "HUMAN RESOURCE MANAGER";
    UserRole["OPERATION_STAFF"] = "OPERATION STAFF";
    UserRole["TELLER"] = "TELLER";
    UserRole["AGENCY_MANAGER"] = "AGENCY MANAGER";
    UserRole["AGENCY_HUMAN_RESOURCE_MANAGER"] = "AGENCY HUMAN RESOURCE MANAGER";
    UserRole["AGENCY_OPERATION_STAFF"] = "AGENCY OPERATION STAFF";
    UserRole["AGENCY_TELLER"] = "AGENCY TELLER";
    UserRole["CUSTOMER"] = "CUSTOMER";
    UserRole["SHIPPER"] = "SHIPPER";
})(UserRole || (exports.UserRole = UserRole = {}));
var OtpPurpose;
(function (OtpPurpose) {
    OtpPurpose["CREATE_ACCOUNT"] = "CREATE_ACCOUNT";
    OtpPurpose["RESET_PASSWORD"] = "RESET_PASSWORD";
})(OtpPurpose || (exports.OtpPurpose = OtpPurpose = {}));
var AgencyType;
(function (AgencyType) {
    AgencyType["DL"] = "DL";
    AgencyType["BC"] = "BC";
})(AgencyType || (exports.AgencyType = AgencyType = {}));
var ShipperType;
(function (ShipperType) {
    ShipperType["NT"] = "NT";
    ShipperType["LT"] = "LT";
})(ShipperType || (exports.ShipperType = ShipperType = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["DELIVERED_SUCCESS"] = "DELIVERED SUCCESS";
    OrderStatus["PROCESSING"] = "PROCESSING";
    OrderStatus["TAKING"] = "TAKING";
    OrderStatus["TAKEN_SUCCESS"] = "TAKEN SUCCESS";
    OrderStatus["TAKEN_FAIL_DUE_TO_TIMEOUT"] = "TAKEN FAIL DUE TO TIMEOUT";
    OrderStatus["TAKEN_FAIL_DUE_TO_SHIPPER"] = "TAKEN FAIL DUE TO SHIPPER";
    OrderStatus["TAKEN_FAIL_DUE_TO_CUSTOMER_CANCELLING"] = "TAKEN FAIL DUE TO CUSTOMER CANCELLING";
    OrderStatus["DELIVERING"] = "DELIVERING";
    OrderStatus["DELIVERED_CANCEL"] = "DELIVERED CANCEL";
    OrderStatus["DELIVERED_FAIL"] = "DELIVERED FAIL";
    OrderStatus["REFUNDING"] = "REFUNDING";
    OrderStatus["REFUNDED_SUCCESS"] = "REFUNDED SUCCESS";
    OrderStatus["REFUNDED_FAIL"] = "REFUNDED FAIL";
    OrderStatus["ENTER_AGENCY"] = "ENTER AGENCY";
    OrderStatus["LEAVE_AGENCY"] = "LEAVE AGENCY";
    OrderStatus["THIRD_PARTY_DELIVERY"] = "THIRD PARTY DELIVERY";
    OrderStatus["RECEIVED"] = "RECEIVED"; // "Đã được tiếp nhận"
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
var NotificationType;
(function (NotificationType) {
    NotificationType["ORDER"] = "ORDER";
    NotificationType["ACCOUNT"] = "ACCOUNT";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
var OrderNotificationType;
(function (OrderNotificationType) {
    OrderNotificationType["PENDING"] = "PENDING";
    OrderNotificationType["ACCEPTED"] = "ACCEPTED";
    OrderNotificationType["DELIVERING"] = "DELIVERING";
    OrderNotificationType["RECEIVED"] = "RECEIVED";
    OrderNotificationType["CANCELED"] = "CANCELED";
})(OrderNotificationType || (exports.OrderNotificationType = OrderNotificationType = {}));
var SendingOrderRequestStatus;
(function (SendingOrderRequestStatus) {
    SendingOrderRequestStatus["PENDING"] = "PENDING";
    SendingOrderRequestStatus["ACCEPTED"] = "ACCEPTED";
    SendingOrderRequestStatus["CANCELED"] = "CANCELED";
})(SendingOrderRequestStatus || (exports.SendingOrderRequestStatus = SendingOrderRequestStatus = {}));
var AccountNotificationType;
(function (AccountNotificationType) {
})(AccountNotificationType || (exports.AccountNotificationType = AccountNotificationType = {}));
var OrderImageType;
(function (OrderImageType) {
    OrderImageType["RECEIVE"] = "RECEIVE";
    OrderImageType["SEND"] = "SEND";
})(OrderImageType || (exports.OrderImageType = OrderImageType = {}));
var OrderSignatureType;
(function (OrderSignatureType) {
    OrderSignatureType["RECEIVE"] = "RECEIVE";
    OrderSignatureType["SEND"] = "SEND";
})(OrderSignatureType || (exports.OrderSignatureType = OrderSignatureType = {}));
var GoodType;
(function (GoodType) {
    GoodType["FOOD"] = "FOOD";
    GoodType["FRAGILE"] = "FRAGILE";
    GoodType["CLOTHES"] = "CLOTHES";
    GoodType["OTHER"] = "OTHER";
})(GoodType || (exports.GoodType = GoodType = {}));
var OrderLocationType;
(function (OrderLocationType) {
    OrderLocationType["HOME"] = "HOME";
    OrderLocationType["COMPANY"] = "COMPANY";
    OrderLocationType["DEFAULT"] = "DEFAULT";
})(OrderLocationType || (exports.OrderLocationType = OrderLocationType = {}));
var ServiceType;
(function (ServiceType) {
    ServiceType["SR"] = "SR";
    ServiceType["SN"] = "SN";
})(ServiceType || (exports.ServiceType = ServiceType = {}));
var MissionType;
(function (MissionType) {
    MissionType["TAKING"] = "TAKING";
    MissionType["DELIVERING"] = "DELIVERING";
})(MissionType || (exports.MissionType = MissionType = {}));
exports.adminRoles = [UserRole.ADMIN, UserRole.MANAGER, UserRole.HUMAN_RESOURCE_MANAGER, UserRole.TELLER, UserRole.OPERATION_STAFF];
exports.agencyRoles = [UserRole.AGENCY_MANAGER, UserRole.AGENCY_HUMAN_RESOURCE_MANAGER, UserRole.AGENCY_TELLER, UserRole.AGENCY_OPERATION_STAFF];
exports.staffShouldBeGotAttributes = ['id', 'staffId', 'username', 'agencyId', 'fullname', 'phoneNumber', 'email', 'cccd',
    'province', 'district', 'town', 'detailAddress', 'birthDate', 'bin', 'bank', 'deposit', 'salary', 'paidSalary', 'avatar'];
var CreateCargoInsuranceDto = /** @class */ (function () {
    function CreateCargoInsuranceDto() {
    }
    return CreateCargoInsuranceDto;
}());
exports.CreateCargoInsuranceDto = CreateCargoInsuranceDto;
var UpdateAgencyDto = /** @class */ (function () {
    function UpdateAgencyDto() {
    }
    return UpdateAgencyDto;
}());
exports.UpdateAgencyDto = UpdateAgencyDto;
var ImageChangeStatusDto = /** @class */ (function () {
    function ImageChangeStatusDto() {
    }
    return ImageChangeStatusDto;
}());
exports.ImageChangeStatusDto = ImageChangeStatusDto;
var UpdateCargoInsuranceDto = /** @class */ (function () {
    function UpdateCargoInsuranceDto() {
    }
    return UpdateCargoInsuranceDto;
}());
exports.UpdateCargoInsuranceDto = UpdateCargoInsuranceDto;
var ConfigDepositDto = /** @class */ (function () {
    function ConfigDepositDto() {
    }
    return ConfigDepositDto;
}());
exports.ConfigDepositDto = ConfigDepositDto;
var ConfigServicesDto = /** @class */ (function () {
    function ConfigServicesDto() {
    }
    return ConfigServicesDto;
}());
exports.ConfigServicesDto = ConfigServicesDto;
var UpdateOrderDto = /** @class */ (function () {
    function UpdateOrderDto() {
    }
    return UpdateOrderDto;
}());
exports.UpdateOrderDto = UpdateOrderDto;
var UpdateFavoriteOrderLocationDto = /** @class */ (function () {
    function UpdateFavoriteOrderLocationDto() {
    }
    return UpdateFavoriteOrderLocationDto;
}());
exports.UpdateFavoriteOrderLocationDto = UpdateFavoriteOrderLocationDto;
var UpdateOrderLocationDto = /** @class */ (function () {
    function UpdateOrderLocationDto() {
    }
    return UpdateOrderLocationDto;
}());
exports.UpdateOrderLocationDto = UpdateOrderLocationDto;
var CreateShipmentDto = /** @class */ (function () {
    function CreateShipmentDto() {
    }
    return CreateShipmentDto;
}());
exports.CreateShipmentDto = CreateShipmentDto;
var AddOrderToShipmentDto = /** @class */ (function () {
    function AddOrderToShipmentDto() {
    }
    return AddOrderToShipmentDto;
}());
exports.AddOrderToShipmentDto = AddOrderToShipmentDto;
var CreateShippingBillDto = /** @class */ (function () {
    function CreateShippingBillDto() {
    }
    return CreateShippingBillDto;
}());
exports.CreateShippingBillDto = CreateShippingBillDto;
var AssignTaskToShipperDto = /** @class */ (function () {
    function AssignTaskToShipperDto() {
    }
    return AssignTaskToShipperDto;
}());
exports.AssignTaskToShipperDto = AssignTaskToShipperDto;
var UpdateTaskDto = /** @class */ (function () {
    function UpdateTaskDto() {
    }
    return UpdateTaskDto;
}());
exports.UpdateTaskDto = UpdateTaskDto;
var UpdateShipperStatusDto = /** @class */ (function () {
    function UpdateShipperStatusDto() {
    }
    return UpdateShipperStatusDto;
}());
exports.UpdateShipperStatusDto = UpdateShipperStatusDto;
var UpdateStaffDto = /** @class */ (function () {
    function UpdateStaffDto() {
    }
    return UpdateStaffDto;
}());
exports.UpdateStaffDto = UpdateStaffDto;
var UpdateCustomerDto = /** @class */ (function () {
    function UpdateCustomerDto() {
    }
    return UpdateCustomerDto;
}());
exports.UpdateCustomerDto = UpdateCustomerDto;
var CreateVoucherDto = /** @class */ (function () {
    function CreateVoucherDto() {
    }
    return CreateVoucherDto;
}());
exports.CreateVoucherDto = CreateVoucherDto;
