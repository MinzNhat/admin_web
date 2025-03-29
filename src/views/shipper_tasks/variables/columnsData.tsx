import { Column } from "react-table";
import { useTranslations } from "next-intl";
import { TaskData } from "@/types/views/tasks/tasks-config";

export const columnsData = (): Column<TaskData>[] => {
    const intl = useTranslations("TasksRoute");

    return [
        {
            Header: intl("order"),
            accessor: "order",
        },
        {
            Header: intl("staff"),
            accessor: "staff",
        },
        {
            Header: intl("mission"),
            accessor: "mission",
        },
        {
            Header: intl("completed"),
            accessor: "completed",
        },

        {
            Header: intl("completedAt"),
            accessor: "completedAt",
        },
        {
            Header: intl("journey"),
            accessor: "journey",
        },
    ];
};


// {
//     "journey": [
//         [
//             37.785834,
//             -122.406417,
//             "2025-03-05T02:40:35.799Z"
//         ],
//         [
//             37.785834,
//             -122.406417,
//             "2025-03-05T02:45:27.711Z"
//         ],
//         [
//             37.785834,
//             -122.406417,
//             "2025-03-05T02:56:54.513Z"
//         ],
//         [
//             37.785834,
//             -122.406417,
//             "2025-03-05T03:11:17.395Z"
//         ]
//     ],
//     "id": "19114036-aeaf-4cc1-89dc-553d0cc8fc02",
//     "orderId": "c2d1b83c-fe58-4921-9151-7c471e8d1ee9",
//     "staffId": "049b06f7-6631-4731-b099-48030906cc50",
//     "completedAt": null,
//     "completed": false,
//     "mission": "DELIVERING",
//     "createdAt": "2025-03-01T07:53:22.000Z",
//     "updatedAt": "2025-03-05T03:11:17.000Z",
//     "order": {
//         "id": "c2d1b83c-fe58-4921-9151-7c471e8d1ee9",
//         "trackingNumber": "DL_78301_20250301033321762",
//         "orderCode": 1629408768,
//         "agencyId": "DL_78301_077204005691",
//         "serviceType": "SN",
//         "nameSender": "Tran The Nhan2222",
//         "phoneNumberSender": "0787919942",
//         "nameReceiver": "Nguyen Van B",
//         "phoneNumberReceiver": "0787919943",
//         "mass": 45,
//         "height": null,
//         "width": null,
//         "length": null,
//         "provinceSource": "Tỉnh Bà Rịa - Vũng Tàu",
//         "districtSource": "Huyện Đất Đỏ",
//         "wardSource": "Xã Long Mỹ",
//         "detailSource": "Đường tỉnh 52, tổ 6 Khu phố Hiệp Hòa",
//         "longSource": 107.271563,
//         "latSource": 10.477812,
//         "provinceDest": "Tỉnh Bà Rịa - Vũng Tàu",
//         "districtDest": "Thành phố Vũng Tàu",
//         "wardDest": "Phường Đất Đỏ",
//         "detailDest": "20 Lý Thái Tổ",
//         "longDestination": 105.442062,
//         "latDestination": 10.377187,
//         "fee": 2000,
//         "parent": null,
//         "cod": 32000,
//         "shipper": null,
//         "statusCode": "DELIVERING",
//         "miss": 0,
//         "qrcode": "00020101021238530010A0000007270123000697042201096668689790208QRIBFTTA5303704540420005802VN62350831CSV0WD1OAV0 THANH TOAN DON HANG63041D00",
//         "signature": null,
//         "paid": false,
//         "customerId": "a6b1e63d-5ae2-4de2-b613-52f6e5e8e4ea",
//         "takingDescription": null,
//         "fromMass": null,
//         "toMass": null,
//         "goodType": "FOOD",
//         "isBulkyGood": false,
//         "note": null,
//         "receiverWillPay": false,
//         "deliverDoorToDoor": false,
//         "value": 0,
//         "isThirdPartyDelivery": false,
//         "createdAt": "2025-03-01T03:33:22.000Z",
//         "updatedAt": "2025-03-02T07:12:18.000Z"
//     },
//     "staff": {
//         "id": "049b06f7-6631-4731-b099-48030906cc50",
//         "staffId": null,
//         "username": "minhluxuan",
//         "agencyId": null,
//         "fullname": "Lữ Xuân Minh",
//         "phoneNumber": "0981430418",
//         "email": "minhfaptv@gmail.com",
//         "cccd": null,
//         "province": null,
//         "district": null,
//         "town": null,
//         "detailAddress": null,
//         "birthDate": null,
//         "bin": null,
//         "bank": null,
//         "deposit": null,
//         "salary": null,
//         "paidSalary": null,
//         "avatar": null
//     }
// },