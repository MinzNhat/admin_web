import { Column } from "react-table";
import { useTranslations } from "next-intl";
import { TaskData } from "@/types/views/tasks/tasks-config";

export const columnsData = (): Column<TaskData>[] => {
    const intl = useTranslations("TasksRoute");

    return [
        {
            Header: intl("id"),
            accessor: "id",
        },
        {
            Header: intl("orderId"),
            accessor: "orderId",
        },
        {
            Header: intl("staffId"),
            accessor: "staffId",
        },
        {
            Header: intl("completed"),
            accessor: "completed",
        },
    ];
};