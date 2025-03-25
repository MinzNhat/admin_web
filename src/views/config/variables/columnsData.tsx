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
            Header: intl("customerId"),
            accessor: "customerId",
        },
        {
            Header: intl("customer"),
            accessor: "customer",
        },
        {
            Header: intl("expiration"),
            accessor: "expiration",
        },
    ];
};