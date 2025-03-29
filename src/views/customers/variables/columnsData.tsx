import { Column } from "react-table";
import { useTranslations } from "next-intl";

export const columnsData = (): Column<Customer>[] => {
    const intl = useTranslations("StaffInfo");

    return [
        {
            Header: intl("id"),
            accessor: "id",
        },
        {
            Header: intl("lastName"),
            accessor: "lastName",
        },
        {
            Header: intl("firstName"),
            accessor: "firstName",
        },
        {
            Header: intl("email"),
            accessor: "email",
        },
        {
            Header: intl("phoneNumber"),
            accessor: "phoneNumber",
        },
        {
            Header: intl("createdAt"),
            accessor: "createdAt",
        },
        {
            Header: intl("user"),
            accessor: "user",
        }
    ];
};


// {
//     "id": "a6b1e63d-5ae2-4de2-b613-52f6e5e8e4ea",
//     "phoneNumber": "0708103015",
//     "email": "levodangkhoatg2@gmail.com",
//     "firstName": "Lê",
//     "lastName": "Khoa",
//     "avatar": null,
//     "createdAt": "2025-03-01T03:25:54.000Z",
//     "updatedAt": "2025-03-05T00:14:17.000Z",
//     "user": {
//         "id": "a6b1e63d-5ae2-4de2-b613-52f6e5e8e4ea",
//         "active": true
//     }
// },