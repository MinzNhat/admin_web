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
            Header: intl("detailAddress"),
            accessor: "detailAddress",
        },
    ];
};