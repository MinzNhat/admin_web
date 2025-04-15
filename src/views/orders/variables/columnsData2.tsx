import { Column } from "react-table";
import { useTranslations } from "next-intl";
import { StaffInfo } from "@/types/store/auth-config";

export const columnsData2 = (): Column<StaffInfo>[] => {
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
        // {
        //     Header: intl("shipperDeposit"),
        //     accessor: "shipperDeposit",
        // },
        {
            Header: intl("shipperType"),
            accessor: "shipperType",
        },
        {
            Header: intl("shipperStatus"),
            accessor: "shipperStatus",
        },
        {
            Header: intl("paidDebt"),
            accessor: "paidDebt",
        },
        {
            Header: intl("unpaidDebt"),
            accessor: "unpaidDebt",
        },
        {
            Header: intl("roles"),
            accessor: "roles",
        },
    ];
};

// {
//     "id": "1a4973a8-b8e9-4f99-841d-3d089e690396",
//     "username": "levodanoatg2693",
//     "password": "$2b$10$a6hGAAhsLr7GuheywwP9FeOsBaY.cAuWmbBeVQ6VyVTs3ThLXtksq",
//     "staffId": "DL_78300_09098978788",
//     "agencyId": "DL_78300_077204005692",
//     "fullname": "LE VO DANG KHOA",
//     "phoneNumber": "0708107015",
//     "email": "levodanoatg2@gmail.com",
//     "cccd": "09098978788",
//     "province": "ACT",
//     "district": null,
//     "town": "My Tho",
//     "detailAddress": null,
//     "birthDate": "2025-04-02",
//     "bin": null,
//     "bank": null,
//     "deposit": 0,
//     "salary": null,
//     "paidSalary": 0,
//     "avatar": null,
//     "createdAt": "2025-03-26T14:35:10.000Z",
//     "updatedAt": "2025-03-26T14:35:10.000Z",
//     "roles": [
//         {
//             "id": "049b06f7-6631-4731-b099-48030906cc53",
//             "value": "SHIPPER",
//             "createdAt": "2024-10-19T12:55:22.000Z",
//             "updatedAt": "2024-10-19T12:55:23.000Z"
//         }
//     ],
//     "managedWards": [
//         {
//             "id": 8667,
//             "wardId": 26680,
//             "ward": "Thị trấn Đất Đỏ",
//             "level": "Thị trấn",
//             "districtId": 753,
//             "district": "Huyện Đất Đỏ",
//             "provinceId": 77,
//             "province": "Tỉnh Bà Rịa - Vũng Tàu",
//             "postalCode": "78300",
//             "deposit": 1233320,
//             "agencyId": "DL_78300_077204005692"
//         }
//     ],
//     "shipperType": "NT",
//     "shipperDeposit": 0,
//     "shipperStatus": true
// },