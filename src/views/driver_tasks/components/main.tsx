"use client";

import { SetStateAction, useCallback, useEffect, useState } from "react";
import { DriverTaskOperation } from "@/services/main";
import { SearchCriteria } from "@/services/interface";
import { getTokenFromCookie } from "@/utils/token";
import { DriverTaskData } from "@/types/views/driver_tasks/driver-config";
import { StaffInfo, StaffInfoUpdate } from "@/types/store/auth-config";
import { useTranslations } from "next-intl";
import SearchPopUp, { DetailFields } from "@/views/customTableSearchPopUp";
import RenderCase from "@/components/render";
import { Button } from "@nextui-org/react";
import { HiOutlineMagnifyingGlassCircle } from "react-icons/hi2";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import { RiMapPinLine } from "react-icons/ri";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import CustomButton from "@/views/customTableButton";
import { columnsData } from "../variables/columnsData";
import TableSwitcher from "@/components/table";
import UpdateContent from "@/views/staffs/components/updateContent";
import UpdateContent2 from "@/views/shipments/components/updateContent";

const TasksMain = () => {
    const intl = useTranslations("TasksRoute");
    const TableMessage = useTranslations('Table');
    const driverOp = new DriverTaskOperation();
    const [tasks, setTasks] = useState<DriverTaskData[]>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentSize, setCurrentSize] = useState<number>(10);
    const [selectedRows, setSelectedRows] = useState<DriverTaskData[]>([]);
    const [sortBy, setSortBy] = useState<{ id: string; desc: boolean }[]>([]);
    const [openUpdateStaff, setOpenUpdateStaff] = useState<boolean>(false);
    const [openShipment, setOpenShipment] = useState<boolean>(false);
    const [staffInfo, setStaffInfo] = useState<StaffInfoUpdate>();
    const [shipment, setShipment] = useState<Shipment>();
    const locale = useSelector((state: RootState) => state.language.locale);

    const [searchCriteriaValue, setSearchCriteriaValue] = useState<SearchCriteria>({
        field: [],
        operator: [],
        value: null
    });

    const openShipmentDetail = (value: Shipment) => {
        setShipment(value);
        setOpenShipment(true);
    };

    const searchFields: Array<DetailFields> = [
        { label: intl("shipmentId"), label_value: "shipmentId", type: "text", hideOperator: true },
    ];

    const openStaff = (value: StaffInfo) => {
        const updatedStaffInfo: StaffInfoUpdate = {
            ...value,
            roles: value.roles?.map(role => role.value)
        };
        setStaffInfo(updatedStaffInfo);
        setOpenUpdateStaff(true);
    };

    const renderCell = (cellHeader: string, cellValue: string | number | boolean | any, rowValue: DriverTaskData) => {
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
        } else if (cellHeader === intl("shipment") && cellValue) {
            return rowValue.shipmentId ? (
                <div className="flex justify-start place-items-center gap-2">
                    <Button className="min-h-5 min-w-5 w-5 h-5 p-0 rounded-full bg-lightContainer dark:!bg-darkContainer" onPress={() => openShipmentDetail(cellValue)}>
                        <HiOutlineMagnifyingGlassCircle className="min-h-5 min-w-5" />
                    </Button>
                    {rowValue.shipmentId}
                </div>
            ) : TableMessage("DefaultNoDataValue");
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
        const criteria: SearchCriteria | null = rawValue ? {
            field: criteriaField,
            operator: searchCriteriaValue.operator[0] as SearchOperator,
            value: criteriaValue
        } : null;

        const response = await driverOp.searchTasks({
            addition: {
                sort: sortBy.map(({ id, desc }) => [id, desc ? "DESC" : "ASC"]),
                page: currentPage,
                size: currentSize,
                group: []
            },
            criteria: criteria ? [criteria] : []
        }, token);
        console.log(response)
        if (response.success) {
            setTasks(response.data as DriverTaskData[]);
        }
    }, [currentPage, currentSize, sortBy, searchCriteriaValue]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
            {staffInfo && <UpdateContent openUpdate={openUpdateStaff} reloadData={fetchData} setOpenUpdate={setOpenUpdateStaff} setStaffInfo={setStaffInfo} staffInfo={staffInfo} />}
            {shipment && <UpdateContent2 openUpdate={openShipment} reloadData={fetchData} setOpenUpdate={setOpenShipment} setShipmentInfo={setShipment} shipmentInfo={shipment} setOpenAddOrders={function (value: SetStateAction<boolean>): void {
                throw new Error("Function not implemented.");
            } } setOpenUpdateStatus={function (value: SetStateAction<boolean>): void {
                throw new Error("Function not implemented.");
            } } />}
            <TableSwitcher
                primaryKey="id"
                tableData={tasks}
                isPaginated={true}
                renderCell={renderCell}
                currentPage={currentPage}
                currentSize={currentSize}
                fetchPageData={fetchData}
                columnsData={columnsData()}
                selectedRows={selectedRows}
                setCurrentPage={setCurrentPage}
                setSelectedRows={setSelectedRows}
                customSearch={true}
                customButton={<CustomButton fetchData={fetchData} selectedRows={selectedRows} extraButton={
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