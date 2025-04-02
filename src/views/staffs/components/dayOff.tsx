"use client";

import { useCallback, useEffect, useState } from "react";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import DetailPopup from "@/components/popup";
import RenderCase from "@/components/render";
import LoadingUI from "@/components/loading";
import { FaUserCircle } from "react-icons/fa";
import Container from "@/components/container";
import CustomButton from "@/components/button";
import { AgencyOperation, DayOffOperation, StaffOperation } from "@/services/main";
import CustomInputField from "@/components/input";
import { IoReloadOutline } from "react-icons/io5";
import { getTokenFromCookie } from "@/utils/token";
import { useNotifications } from "@/hooks/NotificationsProvider";
import { useSubmitNotification } from "@/hooks/SubmitNotificationProvider";
import { CreateDayOffDto, SearchCriteria, ShipperType, StaffRole, UpdateStaffDto } from "@/services/interface";
import { useDefaultNotification } from "@/hooks/DefaultNotificationProvider";
import { DayOffInfo, RoleValue, StaffInfo } from "@/types/store/auth-config";
import TableSwitcher from "@/components/table";
import { columnsData } from "../variables/columnsData4";
import UpdateStaffContent from "./updateStaff";

type AddFields = {
    id: keyof CreateDayOffDto,
    type: InputTypes,
    important?: boolean,
    version?: TextInputVersion | SelectInputVersion,
    select_type?: SelectInputType,
    options?: SelectInputOptionFormat[],
    isClearable?: boolean,
    state?: InputState,
    dropdownPosition?: DropdownPosition;
}

type Props = {
    openAdd: boolean;
    setOpenAdd: React.Dispatch<React.SetStateAction<boolean>>;
    staff: StaffInfo;
}

const AddDayOff = ({ openAdd, setOpenAdd, staff }: Props) => {
    const intl = useTranslations("DayOff");
    const { addNotification } = useNotifications();
    const [error, setError] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentSize, setCurrentSize] = useState<number>(10);
    const [loading, setLoading] = useState<boolean>(false);
    const { addSubmitNotification } = useSubmitNotification();
    const { addDefaultNotification } = useDefaultNotification();
    const [selectedRows, setSelectedRows] = useState<DayOffInfo[]>([]);
    const [dayOffs, setDayOffs] = useState<DayOffInfo[]>([]);
    const [sortBy, setSortBy] = useState<{ id: string; desc: boolean }[]>([]);
    const dayOffOp = new DayOffOperation();
    const [updateInfo, setUpdateInfo] = useState(false);
    const [staffInfo, setStaffInfo] = useState<StaffInfo | null>(null);
    const [addInfo, setAddInfo] = useState<CreateDayOffDto>({
        endDate: "",
        startDate: "",
        staffId: staff.id,
        reason: ""
    });

    const addFields: Array<AddFields> = [
        { id: "startDate", type: "date", dropdownPosition: "bottom", important: true },
        { id: "endDate", type: "date", dropdownPosition: "bottom", important: true },
        { id: "reason", type: "text", dropdownPosition: "bottom" },
    ];



    const renderCell = (cellHeader: string, cellValue: string | number | boolean | any) => {
        return (
            <div className="w-full h-full whitespace-nowrap">
                {(cellValue && cellValue.deposit) ? (cellValue.deposit as string) : cellValue as string}
            </div>
        );
    };

    const handleReload = () => {
        if (loading) { return; };
    }

    const handleSubmit = async () => {
        if (loading) { return; };
        const token = getTokenFromCookie();
        console.log(token);
        if (!token) {
            return;
        }
        const response = await dayOffOp.create({
            ...addInfo
        }, token);
        if (response.success) {
            addDefaultNotification({ message: intl("SuccessAdd") })
        }
    }

    const handleCreate = async () => {
        setLoading(true);
        // const token = getTokenFromCookie();
        // console.log(token);
        // if (!token) {
        //     return;
        // }
        // console.log(token);

        // const createStaffData: CreateDayOffDto = {
        //     ...addInfo,
        //     agencyId: hasAdminRole ? addInfo.agencyId : userInfo?.agencyId ?? "",
        //     birthDate: addInfo.birthDate ? new Date(addInfo.birthDate).toISOString().slice(0, 10) : undefined,
        //     province: addInfo.province || undefined,
        //     district: addInfo.district || undefined,
        //     town: addInfo.town || undefined,
        //     detailAddress: addInfo.detailAddress || undefined,
        //     bank: addInfo.bank || undefined,
        //     bin: addInfo.bin || undefined,
        //     deposit: addInfo.roles.includes(StaffRole["SHIPPER"]) ? (typeof addInfo.deposit === 'string' ? parseFloat(addInfo.deposit) : addInfo.deposit) : undefined,
        //     salary: typeof addInfo.salary === 'string' ? parseFloat(addInfo.salary) : addInfo.salary || undefined,
        //     shipperType: addInfo.roles.includes(StaffRole["SHIPPER"]) ? (Array.isArray(addInfo.shipperType) ? addInfo.shipperType[0] : addInfo.shipperType) : undefined
        // };

        // const response = await staffOperation.create(createStaffData, token);
        // console.log(createStaffData)
        // console.log(response)
        // if (response.success) {
        //     addNotification({ message: intl("Success"), type: "success" });
        //     reloadData();
        // } else {
        //     addDefaultNotification({ message: response.message || intl("Fail") });
        // }

        setLoading(false);
    };


    const fetchData = useCallback(async () => {
        const token = getTokenFromCookie();
        setDayOffs([]);
        setSelectedRows([]);

        if (!token) return;
        let criterias: SearchCriteria[] = [];

        const response = await dayOffOp.search({
            addition: {
                sort: sortBy.map(({ id, desc }) => [id, desc ? "DESC" : "ASC"]),
                page: currentPage,
                size: currentSize,
                group: []
            },
            criteria: [{
                field: "staffId",
                operator: "=",
                value: staff.id
            }]
        }, token);
        // }

        console.log(response);

        if (response.success) {
            setDayOffs(response.data as DayOffInfo[]);
        }
    }, [currentPage, currentSize, sortBy]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <RenderCase condition={openAdd}>
            <DetailPopup
                customWidth="w-full md:w-fit"
                title={intl(updateInfo?"Title":"DayOff")}
                onClose={() => setOpenAdd(false)}
                icon={<FaUserCircle className="w-full h-full" />}
                noPadding
            >
                <div className={"flex flex-row"}>
                    <RenderCase condition={!updateInfo}>
                        <TableSwitcher
                            primaryKey="id"
                            tableData={dayOffs}
                            isPaginated={true}
                            setSortBy={setSortBy}
                            renderCell={renderCell}
                            currentPage={currentPage}
                            currentSize={currentSize}
                            fetchPageData={fetchData}
                            columnsData={columnsData()}
                            selectedRows={selectedRows}
                            setCurrentPage={setCurrentPage}
                            setSelectedRows={setSelectedRows}
                            containerClassname="!rounded-xl p-4"
                            selectType="none"
                            setPageSize={{
                                setCurrentSize,
                                sizeOptions: [10, 20, 30]
                            }}
                            customSearch={true}
                        /></RenderCase>
                    <div className="relative">

                        <RenderCase condition={!updateInfo}>
                            <div className="flex flex-col gap-2 px-2 pb-1 md:grid grid-cols-2 md:w-[700px]">
                                {addFields.map(({ id, type, version, isClearable, options, select_type, state, important, dropdownPosition }: AddFields) => (
                                    <CustomInputField
                                        id={id}
                                        key={id}
                                        type={type}
                                        value={addInfo[id]}
                                        setValue={(value: string) => setAddInfo(id === "startDate" ? {
                                            ...addInfo,
                                            startDate: value as string
                                        } : id === "reason" ? {
                                            ...addInfo,
                                            reason: value as string
                                        } : {
                                            ...addInfo,
                                            endDate: value as string
                                        })}
                                        state={error && important && !addInfo[id] ? "error" : state}
                                        version={version}
                                        options={options}
                                        select_type={select_type}
                                        isClearable={isClearable}
                                        dropdownPosition={dropdownPosition}
                                        className="w-full"
                                        inputClassName="bg-lightContainer dark:!bg-darkContainerPrimary border border-gray-200 dark:border-white/10"
                                        label={
                                            <div className='flex gap-1 place-items-center relative mb-2'>
                                                {intl(id)} {important && <div className="text-red-500">*</div>}
                                            </div>
                                        } />
                                ))
                                }
                            </div>
                            <Container className="sticky bottom-0 w-full p-2 !rounded-none flex gap-1.5">
                                <CustomButton
                                    version="1"
                                    color="error"
                                    onClick={handleReload}
                                    className="linear !min-w-10 !w-10 !px-0 rounded-md bg-lightContainer dark:!bg-darkContainer border border-red-500 dark:!border-red-500 h-10 text-base font-medium transition duration-200 hover:border-red-600 
                            active:border-red-700 text-red-500 dark:text-white dark:hover:border-red-400 dark:active:border-red-300 flex justify-center place-items-center"
                                >
                                    <IoReloadOutline />
                                </CustomButton>
                                <CustomButton
                                    version="1"
                                    color="error"
                                    onClick={handleSubmit}
                                    className="linear w-full rounded-md bg-red-500 dark:!bg-red-500 h-10 text-base font-medium text-white transition duration-200 hover:bg-red-600 
                            active:bg-red-700 dark:text-white dark:hover:bg-red-400 dark:active:bg-red-300 flex justify-center place-items-center"
                                >
                                    {loading ? <LoadingUI /> : intl("Submit")}
                                </CustomButton>
                                <CustomButton
                                    version="1"
                                    color="error"
                                    onClick={() => { setUpdateInfo(!updateInfo); console.log("update click") }}
                                    className="linear !min-w-20 !px-0 rounded-md bg-lightContainer dark:!bg-darkContainer border border-red-500 dark:!border-red-500 h-10 text-base font-medium transition duration-200 hover:border-red-600 
                            active:border-red-700 text-red-500 dark:text-white dark:hover:border-red-400 dark:active:border-red-300 flex justify-center place-items-center"
                                >
                                    {updateInfo ? intl("DayOff") : intl("UpdateInfo")}
                                </CustomButton>
                            </Container>
                        </RenderCase>
                        {
                            <RenderCase condition={updateInfo}>
                                <UpdateStaffContent staffId={staff.id} updatePopup={updateInfo} setUpdatePopup={setUpdateInfo} />
                            </RenderCase>
                        }
                    </div>
                </div>
            </DetailPopup>
        </RenderCase>
    );
};

export default AddDayOff;