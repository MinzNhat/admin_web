import { Column } from "react-table";

import { useTranslations } from "next-intl";

interface ConfigData {
    id: string;
    province: string;
    district: string;
    ward: string;
    deposit: number;
    services: string[];
}

export const columnsData = (): Column<ConfigData>[] => {
    const intl = useTranslations("ConfigRoute");

    return [
        {
            Header: intl("province"),
            accessor: "province",
        },
        {
            Header: intl("district"),
            accessor: "district",
        },
        {
            Header: intl("ward"),
            accessor: "ward",
        },
        {
            Header: intl("deposit"),
            accessor: "deposit",
        },
        {
            Header: intl("services"),
            accessor: "services",
        },
    ];
};