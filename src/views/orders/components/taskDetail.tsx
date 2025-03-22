"use client";

import { useState } from "react";
import { RootState } from "@/store";
import { FaBox } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import RenderCase from "@/components/render";
import DetailPopup from "@/components/popup";
import TableSwitcher from "@/components/table";
import { RiMapPinLine } from "react-icons/ri";
import MapPopup from "@/views/shipper_tasks/components/map";
import { IoPersonCircleOutline } from "react-icons/io5";
import CustomTableButton from "@/views/customTableButton";
import { TaskData } from "@/types/views/tasks/tasks-config";
import { columnsData } from "@/views/shipper_tasks/variables/columnsData";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";

type Props = {
    openDetail: boolean;
    setOpenDetail: React.Dispatch<React.SetStateAction<boolean>>;
    selectedTask?: TaskData[];
    reloadData: () => void;
}

const TaskDetail = ({ openDetail, setOpenDetail, selectedTask, reloadData }: Props) => {
    const intl = useTranslations("TasksRoute");
    const TableMessage = useTranslations('Table');
    const [openMap, setOpenMap] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentSize, setCurrentSize] = useState<number>(10);
    const [journeyData, setJourneyData] = useState<string[][]>([]);
    const [selectedRows, setSelectedRows] = useState<TaskData[]>([]);
    const locale = useSelector((state: RootState) => state.language.locale);

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
                <div className="flex justify-center place-items-center w-full whitespace-nowrap">
                    {TableMessage("DefaultNoDataValue")}
                </div>
            );
        }
    };

    return (
        <RenderCase condition={openDetail}>
            <DetailPopup
                customWidth="w-full md:w-fit"
                title={intl("Title")}
                onClose={() => setOpenDetail(false)}
                icon={<FaBox className="h-4 w-4" />}
                noPadding
            >
                <div className="relative">
                    <MapPopup openMap={openMap} setOpenMap={setOpenMap} journey={journeyData} />
                    <TableSwitcher
                        primaryKey="id"
                        tableData={selectedTask}
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
                        customButton={<CustomTableButton fetchData={reloadData} handleDelete={() => { }} selectedRows={selectedRows} />}
                        containerClassname="!rounded-xl p-4"
                        selectType="multi"
                        setPageSize={{
                            setCurrentSize,
                            sizeOptions: [10, 20, 30]
                        }}
                    />
                </div>
            </DetailPopup>
        </RenderCase>
    );
};

export default TaskDetail;