import { Column } from "react-table";
import { useTranslations } from "next-intl";

export const columnsData = (): Column<VoucherData>[] => {
    const intl = useTranslations("VouchersRoute");

    return [
        {
            Header: intl("discount"),
            accessor: "discount",
        },
        {
            Header: intl("id"),
            accessor: "id",
        },
        {
            Header: intl("customer"),
            accessor: "customer",
        },
        {
            Header: intl("createdAt"),
            accessor: "createdAt",
        },
        {
            Header: intl("expiration"),
            accessor: "expiration",
        },
    ];
};

// {
//     "id": "VOUCHER_3Hb0MLJjMy",
//     "discount": 0,
//     "expiration": "2025-03-15T17:00:00.000Z",
//     "customerId": "b5b9826d-da0e-40e6-ac08-4695651ef144",
//     "createdAt": "2025-03-26T14:28:22.000Z",
//     "updatedAt": "2025-03-26T14:28:22.000Z",
//     "customer": {
//         "id": "b5b9826d-da0e-40e6-ac08-4695651ef144",
//         "phoneNumber": "0981430418",
//         "email": "minhfaptv@gmail.com",
//         "firstName": "Minh",
//         "lastName": "Lu",
//         "avatar": null,
//         "createdAt": "2024-10-19T06:09:53.000Z",
//         "updatedAt": "2024-11-05T13:19:39.000Z"
//     }
// },