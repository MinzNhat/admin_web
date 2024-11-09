"use client";

import RenderCase from "@/components/render";
import { useTranslations } from "next-intl";
import TableSwitcher from "@/components/table";
import { TaskOperation } from "@/services/main";
import { getTokenFromCookie } from "@/utils/token";
import CustomButton from "@/views/customTableButton";
import { columnsData } from "../variables/columnsData";
import { useCallback, useEffect, useState } from "react";
import { TaskData } from "@/types/views/tasks/tasks-config";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";

const TasksMain = () => {
    const taskOp = new TaskOperation();
    const intl = useTranslations("TasksRoute");
    const [tasks, setTasks] = useState<TaskData[]>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentSize, setCurrentSize] = useState<number>(10);
    const [selectedRows, setSelectedRows] = useState<TaskData[]>([]);

    const renderHeader = (cellHeader: string): string => {
        if (cellHeader == intl("completed")) {
            return "!text-end !pr-0"
        }
        return "";
    }

    const renderCell = (cellHeader: string, cellValue: string | number | boolean) => {
        if (cellHeader === intl("completed")) {
            return <div className="w-full h-full flex justify-center place-items-center">
                <RenderCase renderIf={!!cellValue}>
                    <MdRadioButtonChecked />
                </RenderCase>

                <RenderCase renderIf={!cellValue}>
                    <MdRadioButtonUnchecked />
                </RenderCase>
            </div>
        }
    };

    const reloadData = useCallback(async () => {
        const token = getTokenFromCookie();
        setTasks(undefined);
        if (token) {
            const response = await taskOp.search({
                addition: {
                    sort: [],
                    page: currentPage,
                    size: currentSize,
                    group: []
                },
                criteria: []
            }, token)
            console.log(response)
            if (response.success) {
                setTasks(response.data as TaskData[])
            }
        }
    }, [currentPage, currentSize]);

    useEffect(() => {
        reloadData();
    }, []);

    return (
        <>
            <TableSwitcher
                primaryKey="id"
                tableData={tasks}
                isPaginated={true}
                renderCell={renderCell}
                currentPage={currentPage}
                currentSize={currentSize}
                fetchPageData={reloadData}
                columnsData={columnsData()}
                renderHeader={renderHeader}
                selectedRows={selectedRows}
                setCurrentPage={setCurrentPage}
                setSelectedRows={setSelectedRows}
                customButton={<CustomButton fetchData={reloadData} handleDelete={() => { }} selectedRows={selectedRows} />}
                containerClassname="!rounded-xl p-4"
                selectType="multi"
                setPageSize={{
                    setCurrentSize,
                    sizeOptions: [10, 20, 30]
                }}
            />
        </>
    );
}

export default TasksMain;