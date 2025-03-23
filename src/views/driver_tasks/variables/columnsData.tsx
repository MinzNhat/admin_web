import { Column } from "react-table";
import { useTranslations } from "next-intl";
import { DriverTaskData } from "@/types/views/driver_tasks/driver-config";

export const columnsData = (): Column<DriverTaskData>[] => {
    const intl = useTranslations("TasksRoute");

    return [
        {
            Header: intl("shipment"),
            accessor: "shipment",
        },
        {
            Header: intl("staff"),
            accessor: "staff",
        },
        {
            Header: intl("completed"),
            accessor: "completed",
        },
        {
            Header: intl("completedAt"),
            accessor: "completedAt",
        },
    ];
};