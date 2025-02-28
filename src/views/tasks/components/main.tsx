"use client";

import MapPopup from "./map";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import RenderCase from "@/components/render";
import { RiMapPinLine } from "react-icons/ri";
import TableSwitcher from "@/components/table";
import { TaskOperation } from "@/services/main";
import { getTokenFromCookie } from "@/utils/token";
import CustomButton from "@/views/customTableButton";
import { columnsData } from "../variables/columnsData";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useCallback, useEffect, useState } from "react";
import { TaskData } from "@/types/views/tasks/tasks-config";
import { OrderData } from "@/types/views/orders/orders-config";
import { HiOutlineMagnifyingGlassCircle } from "react-icons/hi2";
import DetailContent from "@/views/orders/components/detailContent";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";

const TasksMain = () => {
    const taskOp = new TaskOperation();
    const intl = useTranslations("TasksRoute");
    const TableMessage = useTranslations('Table');
    const [tasks, setTasks] = useState<TaskData[]>();
    const [openMap, setOpenMap] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentSize, setCurrentSize] = useState<number>(10);
    const [journeyData, setJourneyData] = useState<string[][]>([]);
    const [selectedOrder, setSelectedOrder] = useState<OrderData>();
    const [selectedRows, setSelectedRows] = useState<TaskData[]>([]);
    const [openOrderDetail, setOpenOrderDetail] = useState<boolean>(false);
    const locale = useSelector((state: RootState) => state.language.locale);

    const openOrder = (value: OrderData) => {
        setSelectedOrder(value);
        setOpenOrderDetail(true);
    };

    const openMapHandler = (value: string[][]) => {
        setJourneyData(value);
        setOpenMap(true);
    };

    const renderHeader = (cellHeader: string): string => {
        if (cellHeader == intl("journey")) {
            return "pl-4 !text-center"
        }
        return "";
    };

    const renderCell = (cellHeader: string, cellValue: string | number | boolean | any) => {
        if (cellHeader === intl("completed")) {
            return <div className="pl-6">
                <RenderCase condition={!!cellValue}>
                    <MdRadioButtonChecked />
                </RenderCase>

                <RenderCase condition={!cellValue}>
                    <MdRadioButtonUnchecked />
                </RenderCase>
            </div>
        } else if (cellHeader === intl("staff")) {
            return (
                <div className="flex justify-start place-items-center gap-2 whitespace-nowrap">
                    <Button className="min-h-5 min-w-5 w-5 h-5 p-0 rounded-full bg-lightContainer dark:!bg-darkContainer" onChange={() => { }}>
                        <IoPersonCircleOutline className="min-h-5 min-w-5" />
                    </Button>
                    {cellValue.fullname}
                </div>
            )
        } else if (cellHeader === intl("completedAt") && cellValue) {
            return <div className="w-full h-full">{new Intl.DateTimeFormat(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric"
            }).format(new Date(cellValue)).replace(/^\w/, (c) => c.toUpperCase())}</div>
        } else if (cellHeader === intl("order") && cellValue) {
            return cellValue.trackingNumber ? (
                <div className="flex justify-start place-items-center gap-2">
                    <Button className="min-h-5 min-w-5 w-5 h-5 p-0 rounded-full bg-lightContainer dark:!bg-darkContainer" onPress={() => openOrder(cellValue)}>
                        <HiOutlineMagnifyingGlassCircle className="min-h-5 min-w-5" />
                    </Button>
                    {cellValue?.trackingNumber}
                </div>
            ) : TableMessage("DefaultNoDataValue");
        } else if (cellHeader === intl("journey") && cellValue) {
            return cellValue.length !== 0 ? (
                <div className="flex justify-center place-items-center w-full">
                    <Button className="min-h-5 min-w-5 w-5 h-5 p-0 rounded-full bg-lightContainer dark:!bg-darkContainer" onPress={() => openMapHandler(cellValue)}>
                        <RiMapPinLine className="min-h-5 min-w-5" />
                    </Button>
                </div>
            ) : (
                <div className="flex justify-center place-items-center w-full">
                    {TableMessage("DefaultNoDataValue")}
                </div>
            );
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
            }, token);
            console.log(response.data)

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
            <MapPopup openMap={openMap} setOpenMap={setOpenMap} journey={journeyData} />
            <DetailContent openDetail={openOrderDetail} setOpenDetail={setOpenOrderDetail} selectedOrder={selectedOrder} />
            <TableSwitcher
                primaryKey="id"
                tableData={tasks}
                isPaginated={true}
                renderCell={renderCell}
                currentPage={currentPage}
                currentSize={currentSize}
                fetchPageData={reloadData}
                renderHeader={renderHeader}
                columnsData={columnsData()}
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