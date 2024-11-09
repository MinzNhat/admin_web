import { Column } from "react-table";
import { OrderData } from "@/types/views/orders/orders-config";
import { useTranslations } from "next-intl";

export const columnsData = (): Column<OrderData>[] => {
    const intl = useTranslations("OrdersRoute");

    return [
        {
            Header: intl("id"),
            accessor: "id",
        },
        {
            Header: intl("detailSource"),
            accessor: "detailSource",
        },
        {
            Header: intl("detailDest"),
            accessor: "detailDest",
        },
        {
            Header: intl("statusCode"),
            accessor: "statusCode",
        },
    ];
};