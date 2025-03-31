import { DayOffInfo } from "@/types/store/auth-config";
import { useTranslations } from "next-intl";
import { Column } from "react-table";

export const columnsData = (): Column<DayOffInfo>[] => {
    const intl = useTranslations("DayOff");
    
    return [
        // {
        //     Header: intl("staffId"),
        //     accessor: "staffId",
        // },
        {
            Header: intl("startDate"),
            accessor: "startDate",
        },
        {
            Header: intl("endDate"),
            accessor: "endDate",
        },
        {
            Header: intl("reason"),
            accessor: "reason",
        },
    ];
}