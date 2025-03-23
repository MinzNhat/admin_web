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
        }
    ];
};