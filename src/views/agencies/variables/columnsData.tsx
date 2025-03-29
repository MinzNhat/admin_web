import { Column } from "react-table";
import { useTranslations } from "next-intl";

export const columnsData = (): Column<AgencyInfo>[] => {
    const intl = useTranslations("AgenciesRoute");

    return [
        {
            Header: intl("id"),
            accessor: "id",
        },
        {
            Header: intl("name"),
            accessor: "name",
        },
        {
            Header: intl("type"),
            accessor: "type",
        },
        {
            Header: intl("province"),
            accessor: "province",
        },
        {
            Header: intl("district"),
            accessor: "district",
        },
        {
            Header: intl("town"),
            accessor: "town",
        },
        {
            Header: intl("detailAddress"),
            accessor: "detailAddress",
        },
        {
            Header: intl("manager"),
            accessor: "manager",
        },
        {
            Header: intl("postalCode"),
            accessor: "postalCode",
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
            Header: intl("company"),
            accessor: "company",
        },
        {
            Header: intl("contracts"),
            accessor: "contracts",
        },
    ];
};


// {
//     "level": 3,
//     "type": "DL",
//     "id": "DL_78300_077204005692",
//     "name": "Bưu cục Long Mỹ - Đất Đỏ",
//     "email": "buucucquan1@gmail.com",
//     "phoneNumber": "0981430417",
//     "postalCode": "78300",
//     "province": "Tỉnh Bà Rịa - Vũng Tàu",
//     "district": "Huyện Đất Đỏ",
//     "town": "Xã Long Mỹ",
//     "detailAddress": "QL55",
//     "latitude": 10.7541,
//     "longitude": 106.034,
//     "bin": "050138319579",
//     "bank": "Sacombank",
//     "commissionRate": 0.4,
//     "revenue": 0,
//     "isIndividual": false,
//     "managerId": "14b2cbc8-1b34-43a3-83fa-29ce0037350d",
//     "createdAt": "2025-03-01T03:44:02.000Z",
//     "updatedAt": "2025-03-01T03:44:02.000Z",
//     "manager": {
//         "id": "14b2cbc8-1b34-43a3-83fa-29ce0037350d",
//         "staffId": "DL_78300_077204005692",
//         "username": "buucucquan1976",
//         "agencyId": "DL_78300_077204005692",
//         "fullname": "Trần Thế Nhân",
//         "phoneNumber": null,
//         "email": null,
//         "cccd": "077204005692",
//         "province": "Tỉnh Bà Rịa - Vũng Tàu",
//         "district": "Huyện Đất Đỏ",
//         "town": "Thị trấn Đất Đỏ",
//         "detailAddress": "326, ĐT44A",
//         "birthDate": null,
//         "bin": null,
//         "bank": null,
//         "deposit": null,
//         "salary": 25000000,
//         "paidSalary": 0,
//         "avatar": null
//     },
//     "company": {
//         "id": "895f977b-66fe-48c3-8f07-9083ec7722bd",
//         "taxCode": "0123456789",
//         "name": "Công ty Cổ phần Bất động sản Tiến Dũng",
//         "licenses": [
//             {
//                 "name": "Giấy phép kinh do",
//                 "path": "src/modules/storage/uploads/orders_signatures/1729507980377_order_2.jpg"
//             }
//         ]
//     },
//     "contracts": [
//         {
//             "name": "contract2",
//             "path": "src/modules/storage/uploads/orders_signatures/1729507980377_order_2.jpg"
//         }
//     ]
// },