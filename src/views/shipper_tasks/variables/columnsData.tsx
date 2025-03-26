import { Column } from "react-table";
import { useTranslations } from "next-intl";
import { TaskData } from "@/types/views/tasks/tasks-config";

export const columnsData = (): Column<TaskData>[] => {
    const intl = useTranslations("TasksRoute");

    return [
        {
            Header: intl("order"),
            accessor: "order",
        },
        {
            Header: intl("staff"),
            accessor: "staff",
        },
        {
            Header: intl("mission"),
            accessor: "mission",
        },
        {
            Header: intl("completed"),
            accessor: "completed",
        },

        {
            Header: intl("completedAt"),
            accessor: "completedAt",
        },
        {
            Header: intl("journey"),
            accessor: "journey",
        },
    ];
};