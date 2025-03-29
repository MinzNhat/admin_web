import { Column } from "react-table";
import { useTranslations } from "next-intl";
import { StaffInfo } from "@/types/store/auth-config";

export const columnsData = (): Column<StaffInfo>[] => {
    const intl = useTranslations("StaffInfo");

    return [
        {
            Header: intl("staffId"),
            accessor: "staffId",
        },
        {
            Header: intl("agencyId"),
            accessor: "agencyId",
        },
        {
            Header: intl("username"),
            accessor: "username",
        },
        {
            Header: intl("birthDate"),
            accessor: "birthDate",
        },
        {
            Header: intl("bank"),
            accessor: "bank",
        },
        {
            Header: intl("createdAt"),
            accessor: "createdAt",
        },
        {
            Header: intl("managedWards"),
            accessor: "managedWards",
        },
        {
            Header: intl("fullname"),
            accessor: "fullname",
        },
        {
            Header: intl("cccd"),
            accessor: "cccd",
        },
        {
            Header: intl("phoneNumber"),
            accessor: "phoneNumber",
        },
        {
            Header: intl("email"),
            accessor: "email",
        },
        {
            Header: intl("salary"),
            accessor: "salary",
        },
        {
            Header: intl("roles"),
            accessor: "roles",
        },
    ];
};


// {
//     "id": "049b06f7-6631-4731-b099-48030906cc50",
//     "username": "minhluxuan",
//     "password": "$2b$10$smIKB4WtQA1bVU4tjrEdy.gS5qxgBQQ0PBJBxy6zm0IsXtKb3ZQ6G",
//     "staffId": null,
//     "agencyId": null,
//     "fullname": "Lữ Xuân Minh",
//     "phoneNumber": "0981430418",
//     "email": "minhfaptv@gmail.com",
//     "cccd": null,
//     "province": null,
//     "district": null,
//     "town": null,
//     "detailAddress": null,
//     "birthDate": null,
//     "bin": null,
//     "bank": null,
//     "deposit": null,
//     "salary": null,
//     "paidSalary": null,
//     "avatar": null,
//     "createdAt": "2024-10-19T12:52:31.000Z",
//     "updatedAt": "2024-10-19T12:52:32.000Z",
//     "managedWards": [
//         {
//             "province": "Tỉnh Bà Rịa - Vũng Tàu",
//             "district": "Huyện Đất Đỏ",
//             "ward": "Xã Long Mỹ",
//             "StaffOnWard": {
//                 "staffId": "049b06f7-6631-4731-b099-48030906cc50",
//                 "wardId": 8670,
//                 "createdAt": "2024-10-19T13:09:41.000Z",
//                 "updatedAt": "2024-10-19T13:09:42.000Z"
//             }
//         }
//     ],
//     "roles": [
//         {
//             "value": "ADMIN",
//             "StaffOnRole": {
//                 "staffId": "049b06f7-6631-4731-b099-48030906cc50",
//                 "roleId": "049b06f7-6631-4731-b099-48030906cc51",
//                 "createdAt": "2024-10-19T12:57:11.000Z",
//                 "updatedAt": "2024-10-19T12:57:13.000Z"
//             }
//         },
//         {
//             "value": "SHIPPER",
//             "StaffOnRole": {
//                 "staffId": "049b06f7-6631-4731-b099-48030906cc50",
//                 "roleId": "049b06f7-6631-4731-b099-48030906cc53",
//                 "createdAt": "2024-10-19T12:57:28.000Z",
//                 "updatedAt": "2024-10-19T12:57:30.000Z"
//             }
//         }
//     ],
//     "shipperType": null,
//     "shipperDeposit": null
// },