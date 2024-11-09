import { Column } from "react-table";
import { useTranslations } from "next-intl";

export const columnsData = (): Column<StaffInfo>[] => {
    const intl = useTranslations("StaffInfo");

    return [
        {
            Header: intl("staffId"),
            accessor: "staffId",
        },
        {
            Header: intl("fullname"),
            accessor: "fullname",
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
            Header: intl("roles"),
            accessor: "roles",
        },
    ];
};