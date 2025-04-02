"use client";

import { useEffect, useState } from "react";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import DetailPopup from "@/components/popup";
import RenderCase from "@/components/render";
import LoadingUI from "@/components/loading";
import { FaUserCircle } from "react-icons/fa";
import Container from "@/components/container";
import CustomButton from "@/components/button";
import { StaffOperation } from "@/services/main";
import CustomInputField from "@/components/input";
import { IoReloadOutline } from "react-icons/io5";
import { getTokenFromCookie } from "@/utils/token";
import { useNotifications } from "@/hooks/NotificationsProvider";
import { useSubmitNotification } from "@/hooks/SubmitNotificationProvider";
import { CreateStaffDto, ShipperType, StaffRole, UpdateStaffDto } from "@/services/interface";
import { useDefaultNotification } from "@/hooks/DefaultNotificationProvider";
import { RoleValue, StaffInfo } from "@/types/store/auth-config";

type AddFields = {
    id: keyof CreateStaffDto,
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
    staffId: string;
    updatePopup: boolean;
    setUpdatePopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateStaffContent = ({ staffId, updatePopup, setUpdatePopup }: Props) => {
    const intl = useTranslations("AddStaff");
    const intl2 = useTranslations("StaffInfo");
    const staffOperation = new StaffOperation();
    const { addNotification } = useNotifications();
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const { addSubmitNotification } = useSubmitNotification();
    const { addDefaultNotification } = useDefaultNotification();
    const userInfo = useSelector((state: RootState) => state.auth.userInfo);
    const [updateInfo, setUpdateInfo] = useState<UpdateStaffDto>({
        agencyId: "",
        cccd: "",
        email: "",
        fullname: "",
        managedWards: [],
        phoneNumber: "",
        roles: []
    });

    const hasAdminRole = userInfo?.roles.some((role: RoleValue) =>
        ["ADMIN", "MANAGER", "HUMAN_RESOURCE_MANAGER"].includes(role.value)
    );

    const roleOptions: SelectInputOptionFormat[] = Object.values(StaffRole).map(role => ({
        label: intl(role),
        value: role
    }));

    const shipperTypeOptions: SelectInputOptionFormat[] = Object.values(ShipperType).map(type => ({
        label: intl2(type),
        value: type
    }));

    const addFields: Array<AddFields> = [
        { id: "fullname", type: "text", important: true },
        { id: "email", type: "text", important: true },
        { id: "phoneNumber", type: "text", important: true },
        { id: "cccd", type: "number", important: true },
        { id: "birthDate", type: "date", dropdownPosition: "bottom", important: true },
        { id: "roles", type: "select", options: roleOptions, isClearable: false, select_type: "multi", important: true, dropdownPosition: "bottom" },
        // ...(addInfo.roles.includes(StaffRole["SHIPPER"]) ? [
        { id: "shipperType" as keyof CreateStaffDto, type: "select" as InputTypes, select_type: "single" as SelectInputType, options: shipperTypeOptions, isClearable: false, important: true, dropdownPosition: "bottom" as DropdownPosition },
        // ] : []),
        { id: "province", type: "text" },
        { id: "district", type: "text" },
        { id: "town", type: "text" },
        { id: "detailAddress", type: "text" },
        { id: "bank", type: "text" },
        { id: "bin", type: "text" },
        // ...(addInfo.roles.includes(StaffRole["SHIPPER"]) ? [{ id: "deposit" as keyof CreateStaffDto, type: "number" as InputTypes }] : []),
        { id: "salary", type: "number" },
        { id: "managedWards", type: "select", options: [], select_type: "multi", dropdownPosition: "top" }
    ];

    if (hasAdminRole) {
        addFields.unshift({ id: "agencyId", type: "text", important: true });
    }

    const updateValue = (id: keyof CreateStaffDto, value: string | string[]) => {
        // setUpdateInfo(prevData => ({
        //     ...prevData,
        //     [id]: value,
        // }));
    };

    const checkImportantFields = (addInfo: CreateStaffDto, addFields: Array<AddFields>) => {
        const missingFields: string[] = [];
        addFields.forEach(({ id, important }) => {
            if (important && !addInfo[id]) {
                missingFields.push(id);
            }
        });
        return missingFields;
    };

    const handleReload = () => {
        if (loading) { return; };
        setUpdateInfo({
            agencyId: "",
            cccd: "",
            email: "",
            fullname: "",
            managedWards: [],
            phoneNumber: "",
            roles: []
        });
    }

    const handleSubmit = async () => {
        setLoading(true);
        const token = getTokenFromCookie();
        if (!token) {
            return;
        }

        const response = await staffOperation.update(staffId, {
            ...updateInfo
        }, token);

        setLoading(false);
    };

    const fetchStaffData = async () => {
        const token = getTokenFromCookie();
        if (!token) return;

        const response = await staffOperation.search({
            addition: {
                sort: [],
                page: 1,
                size: 1,
                group: []
            },
            criteria: [{
                field: "id",
                operator: "=",
                value: staffId
            }]
        }, token);
        if (response.success) {
            const fetchedStaff = response.data[0];
            const newInfo = {
                agencyId: fetchedStaff.agnecyId,
                cccd: fetchedStaff.cccd,
                email: fetchedStaff.email,
                fullname: fetchedStaff.fullname,
                managedWards: fetchedStaff.managedWards,
                phoneNumber: fetchedStaff.phoneNumber,
                roles: fetchedStaff.roles,
                birthDate: fetchedStaff.birthDate,

            };
            console.log(newInfo);
            setUpdateInfo(newInfo);
        }
    }

    useEffect(() => {
        fetchStaffData();
    }, []);

    return (
        <div className="relative">
            <div className="flex flex-col gap-2 px-2 pb-1 md:grid grid-cols-2 md:w-[700px]">
                {addFields.map(({ id, type, version, isClearable, options, select_type, state, important, dropdownPosition }: AddFields) => (
                    <CustomInputField
                        id={id}
                        key={id}
                        type={type}
                        value={updateInfo[id]}
                        setValue={(value: string | string[]) => updateValue(id, value)}
                        state={error && important && !updateInfo[id] ? "error" : state}
                        version={version}
                        options={options}
                        select_type={select_type}
                        isClearable={isClearable}
                        dropdownPosition={dropdownPosition}
                        className="w-full"
                        inputClassName="bg-lightContainer dark:!bg-darkContainerPrimary border border-gray-200 dark:border-white/10"
                        label={
                            <div className='flex gap-1 place-items-center relative mb-2'>
                                {intl2(id)} {important && <div className="text-red-500">*</div>}
                            </div>
                        } />
                ))}
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
                    onClick={() => { setUpdatePopup(!updatePopup); console.log("update click") }}
                    className="linear !min-w-20 !px-0 rounded-md bg-lightContainer dark:!bg-darkContainer border border-red-500 dark:!border-red-500 h-10 text-base font-medium transition duration-200 hover:border-red-600 
                            active:border-red-700 text-red-500 dark:text-white dark:hover:border-red-400 dark:active:border-red-300 flex justify-center place-items-center"
                >
                    {updateInfo ? intl("DayOff") : intl("UpdateInfo")}
                </CustomButton>
            </Container>
        </div>
    );
};

export default UpdateStaffContent;