import { Column } from "react-table";
import { useTranslations } from "next-intl";

export const columnsData = (): Column<ShippingBillData>[] => {
    const intl = useTranslations("ShippingBillsRoute");

    return [
        {
            Header: intl("companyName"),
            accessor: "companyName",
        },
        {
            Header: intl("customerId"),
            accessor: "customerId",
        },
        {
            Header: intl("customer"),
            accessor: "customer",
        },
        {
            Header: intl("taxCode"),
            accessor: "taxCode",
        },
    ];
};