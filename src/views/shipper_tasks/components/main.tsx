"use client";

import MapPopup from "./map";
import { UUID } from "crypto";
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
import { SearchCriteria } from "@/services/interface";
import { columnsData } from "../variables/columnsData";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useCallback, useEffect, useState } from "react";
import { TaskData } from "@/types/views/tasks/tasks-config";
import { OrderData } from "@/types/views/orders/orders-config";
import { HiOutlineMagnifyingGlassCircle } from "react-icons/hi2";
import { useNotifications } from "@/hooks/NotificationsProvider";
import DetailContent from "@/views/orders/components/detailContent";
import { useSubmitNotification } from "@/hooks/SubmitNotificationProvider";
import SearchPopUp, { DetailFields } from "@/views/customTableSearchPopUp";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import { StaffInfo, StaffInfoUpdate } from "@/types/store/auth-config";
import UpdateContent from "./addContent";

const TasksMain = () => {
    const taskOp = new TaskOperation();
    const intl = useTranslations("TasksRoute");
    const TableMessage = useTranslations('Table');
    const { addNotification } = useNotifications();
    const [tasks, setTasks] = useState<TaskData[]>();
    const [openMap, setOpenMap] = useState<boolean>(false);
    const { addSubmitNotification } = useSubmitNotification();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentSize, setCurrentSize] = useState<number>(10);
    const [staffInfo, setStaffInfo] = useState<StaffInfoUpdate>();
    const [journeyData, setJourneyData] = useState<string[][]>([]);
    const [selectedOrder, setSelectedOrder] = useState<OrderData>();
    const [selectedRows, setSelectedRows] = useState<TaskData[]>([]);
    const [openUpdateStaff, setOpenUpdateStaff] = useState<boolean>(false);
    const [openOrderDetail, setOpenOrderDetail] = useState<boolean>(false);
    const locale = useSelector((state: RootState) => state.language.locale);
    const userInfo = useSelector((state: RootState) => state.auth.userInfo);
    const [searchCriteriaValue, setSearchCriteriaValue] = useState<SearchCriteria>({
        field: [],
        operator: [],
        value: null
    });

    const completedTypeOptions: SelectInputOptionFormat[] = ["true", "false"].map(type => ({
        label: intl(type === "true" ? "True" : "False"),
        value: type
    }));

    const searchFields: Array<DetailFields> = [
        { label: intl("completed"), label_value: "completed", type: "select", select_type: "single", options: completedTypeOptions, dropdownPosition: "top", hideOperator: true },
        { label: intl("orderId"), label_value: "orderId", type: "text", hideOperator: true },
        { label: intl("staff"), label_value: "staff", type: "text", hideOperator: true },
    ];

    const openOrder = (value: OrderData) => {
        const newValue = { ...value, statuscode: [value.statusCode] };
        setSelectedOrder(newValue);
        setOpenOrderDetail(true);
    };

    const openStaff = (value: StaffInfo) => {
        const updatedStaffInfo: StaffInfoUpdate = {
            ...value,
            roles: value.roles?.map(role => role.value)
        };
        setStaffInfo(updatedStaffInfo);
        setOpenUpdateStaff(true);
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
            return <div className="pl-6 pt-1">
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
                    <Button className="min-h-5 min-w-5 w-5 h-5 p-0 rounded-full bg-lightContainer dark:!bg-darkContainer" onPress={() => openStaff(cellValue)}>
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

    const fetchData = useCallback(async () => {
        const token = getTokenFromCookie();
        setTasks(undefined);
        setSelectedRows([]);

        if (!token) return;

        const rawValue = Array.isArray(searchCriteriaValue.value) ? searchCriteriaValue.value[0] : searchCriteriaValue.value;
        const criteriaField = searchCriteriaValue.field[0];
        const criteriaValue = rawValue === "true" ? true : rawValue === "false" ? false : rawValue;

        let response;

        if (criteriaField === "staff") {
            response = await taskOp.searchByShipperName(criteriaValue as string, token);
        } else if (criteriaField === "orderId") {
            response = await taskOp.searchByOrderId(criteriaValue as UUID, token);
        } else if (criteriaField === "completed") {
            response = await taskOp.searchByCompleted(criteriaValue as boolean, token);
        } else {
            response = await taskOp.search({
                addition: {
                    sort: [],
                    page: currentPage,
                    size: currentSize,
                    group: []
                },
                criteria: []
            }, token);
        }
        console.log(response)
        if (response.success) {
            const tasks = response.data.map((task: any) => {
                return {...task, mission: intl(task.mission?task.mission:"NoData")};
            }) as TaskData[];
            setTasks(tasks)
        } else if (response.message === "Người dùng không được phép truy cập tài nguyên này") {
            // addNotification({message: intl("NoPermission"), type: "error"});
            setTasks([]);
        }
    }, [currentPage, currentSize, searchCriteriaValue]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleDelete = async () => {
        const token = getTokenFromCookie();
        if (!token) return;

        for (const row of selectedRows) {
            const response = await taskOp.deleteTask(row.id as UUID, token);
            if (response.success) {
                addNotification({ message: `${intl("DeleteSuccess")} ${row.id} ${intl("DeleteSuccess2")}`, type: "success" });
            } else {
                addNotification({ message: `${intl("DeleteSuccess")} ${row.id} ${intl("DeleteFailed2")}`, type: "error" });
            }
        }

        setSearchCriteriaValue(prev => prev);
    }

    return (
        <>
            {staffInfo && <UpdateContent openUpdate={openUpdateStaff} reloadData={fetchData} setOpenUpdate={setOpenUpdateStaff} setStaffInfo={setStaffInfo} staffInfo={staffInfo} />}
            <MapPopup openMap={openMap} setOpenMap={setOpenMap} journey={journeyData} />
            <DetailContent openDetail={openOrderDetail} setOpenDetail={setOpenOrderDetail} selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} updatePermission={userInfo && userInfo.agencyId ? userInfo.agencyId === selectedOrder?.agencyId : false} reloadData={fetchData} setOpenAssignTask={() => {}}/>
            <TableSwitcher
                primaryKey="id"
                tableData={tasks}
                isPaginated={true}
                renderCell={renderCell}
                currentPage={currentPage}
                currentSize={currentSize}
                fetchPageData={fetchData}
                renderHeader={renderHeader}
                columnsData={columnsData()}
                selectedRows={selectedRows}
                setCurrentPage={setCurrentPage}
                setSelectedRows={setSelectedRows}
                customSearch={true}
                customButton={<CustomButton fetchData={fetchData} handleDelete={() => addSubmitNotification({ message: intl("Confirm"), submitClick: handleDelete })} selectedRows={selectedRows} extraButton={
                    <SearchPopUp fields={searchFields} searchCriteriaValue={searchCriteriaValue} setSearchCriteriaValue={setSearchCriteriaValue} />
                } />}
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