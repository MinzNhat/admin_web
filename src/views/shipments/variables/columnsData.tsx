import { Column } from "react-table";
import { useTranslations } from "next-intl";

export const columnsData = (): Column<Shipment>[] => {
    const intl = useTranslations("ShipmentsRoute");

    return [
        {
            Header: intl("id"),
            accessor: "id",
        },
        {
            Header: intl("sourceAgency"),
            accessor: "sourceAgency",
        },
        {
            Header: intl("destinationAgency"),
            accessor: "destinationAgency",
        },
        {
            Header: intl("status"),
            accessor: "status",
        },
    ];
};