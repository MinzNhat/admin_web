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
import { RoleValue, StaffInfoUpdate } from "@/types/store/auth-config"
import { useSubmitNotification } from "@/hooks/SubmitNotificationProvider";
import { useDefaultNotification } from "@/hooks/DefaultNotificationProvider";
import { UpdateStaffDto, ShipperType, StaffRole } from "@/services/interface";
import { UUID } from "crypto";

type UpdateFields = {
    id: keyof StaffInfoUpdate,
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
    openUpdate: boolean;
    setOpenUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    staffInfo: StaffInfoUpdate;
    setStaffInfo: React.Dispatch<React.SetStateAction<StaffInfoUpdate | undefined>>;
    reloadData: () => void;
}

const UpdateContent = ({ openUpdate, setOpenUpdate, staffInfo, setStaffInfo, reloadData }: Props) => {
    const intl = useTranslations("AddStaff");
    const intl2 = useTranslations("StaffInfo");
    const staffOperation = new StaffOperation();
    const { addNotification } = useNotifications();
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const { addSubmitNotification } = useSubmitNotification();
    const { addDefaultNotification } = useDefaultNotification();
    const [initValue, setInitValue] = useState<StaffInfoUpdate>();
    const userInfo = useSelector((state: RootState) => state.auth.userInfo);

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

    const UpdateFields: Array<UpdateFields> = [
        { id: "fullname", type: "text", important: true },
        { id: "email", type: "text", important: true },
        { id: "phoneNumber", type: "text", important: true },
        { id: "cccd", type: "number", important: true },
        { id: "birthDate", type: "date", dropdownPosition: "bottom", important: true },
        { id: "roles", type: "select", options: roleOptions, isClearable: false, select_type: "multi", important: true, dropdownPosition: "bottom" },
        ...(staffInfo.roles?.includes(StaffRole["SHIPPER"]) ? [
            { id: "shipperType" as keyof StaffInfoUpdate, type: "select" as InputTypes, select_type: "single" as SelectInputType, options: shipperTypeOptions, isClearable: false, important: true, dropdownPosition: "bottom" as DropdownPosition }
        ] : []),
        { id: "province", type: "text" },
        { id: "district", type: "text" },
        { id: "town", type: "text" },
        { id: "detailAddress", type: "text" },
        { id: "bank", type: "text" },
        { id: "bin", type: "text" },
        ...(staffInfo.roles?.includes(StaffRole["SHIPPER"]) ? [{ id: "deposit" as keyof UpdateStaffDto, type: "number" as InputTypes }] : []),
        { id: "salary", type: "number" },
        { id: "managedWards", type: "select", options: [], select_type: "multi", dropdownPosition: "top" }
    ];

    if (hasAdminRole) {
        UpdateFields.unshift({ id: "agencyId", type: "text", important: true });
    }

    const updateValue = (id: keyof StaffInfoUpdate, value: string | string[]) => {
        setStaffInfo(prevData => {
            if (!prevData) return prevData;
            return {
                ...prevData,
                [id]: value,
            };
        });
    };

    const checkImportantFields = (staffInfo: StaffInfoUpdate, UpdateFields: Array<UpdateFields>) => {
        const missingFields: string[] = [];
        UpdateFields.forEach(({ id, important }) => {
            if (important && !staffInfo[id]) {
                missingFields.push(id);
            }
        });
        return missingFields;
    };

    const handleReload = () => {
        if (loading) { return; };
        setStaffInfo(initValue);
    }

    const handleSubmit = () => {
        if (loading) { return; };

        const missingFields = checkImportantFields(staffInfo, UpdateFields);
        if (missingFields.length > 0) {
            setError(true);
            const missingFieldsLabels = missingFields.map(field => intl2(field));
            addDefaultNotification({
                children: (
                    <div>
                        <p>{intl("MissingField")}</p>
                        <ul className="list-disc pl-5">
                            {missingFieldsLabels.map((label, index) => (
                                <li key={index} className="text-left">{label}</li>
                            ))}
                        </ul>
                    </div>
                )
            });
        } else {
            setError(false)
            addSubmitNotification({ message: intl("Confirm2"), submitClick: handleCreate });
        }
    }

    const handleCreate = async () => {
        setLoading(true);
        const token = getTokenFromCookie();
        if (!token) {
            return;
        }

        const updateStaffData: UpdateStaffDto = {
            ...staffInfo,
            cccd: staffInfo.cccd ? staffInfo.cccd : "",
            agencyId: hasAdminRole ? staffInfo.agencyId : userInfo?.agencyId ?? "",
            birthDate: staffInfo.birthDate ? new Date(staffInfo.birthDate).toISOString().slice(0, 10) : undefined,
            province: staffInfo.province || undefined,
            district: staffInfo.district || undefined,
            town: staffInfo.town || undefined,
            detailAddress: staffInfo.detailAddress || undefined,
            bank: staffInfo.bank || undefined,
            bin: staffInfo.bin || undefined,
            deposit: staffInfo.roles.includes(StaffRole["SHIPPER"]) ? (typeof staffInfo.deposit === 'string' ? parseFloat(staffInfo.deposit) : staffInfo.deposit) : undefined,
            salary: typeof staffInfo.salary === 'string' ? parseFloat(staffInfo.salary) : staffInfo.salary || undefined,
            shipperType: staffInfo.roles.includes(StaffRole["SHIPPER"]) ? (Array.isArray(staffInfo.shipperType) ? staffInfo.shipperType[0] : staffInfo.shipperType) : undefined
        };
        console.log(updateStaffData)
        const response = await staffOperation.update(staffInfo.id as UUID, updateStaffData, token);
        console.log(response)
        if (response.success) {
            setInitValue(staffInfo);
            addNotification({ message: intl("Success2"), type: "success" });
            reloadData();
        } else {
            addDefaultNotification({ message: response.message || intl("Fail2") });
        }

        setLoading(false);
    };

    useEffect(() => {
        if (staffInfo) setInitValue(staffInfo);
    }, [staffInfo])

    return (
        <RenderCase condition={openUpdate}>
            <DetailPopup
                customWidth="w-full md:w-fit"
                title={intl("Title2")}
                onClose={() => setOpenUpdate(false)}
                icon={<FaUserCircle className="w-full h-full" />}
                noPadding
            >
                <div className="relative">
                    <div className="flex flex-col gap-2 px-2 pb-1 md:grid grid-cols-2 md:w-[700px]">
                        {UpdateFields.map(({ id, type, version, isClearable, options, select_type, state, important, dropdownPosition }: UpdateFields) => (
                            <CustomInputField
                                id={id}
                                key={id}
                                type={type}
                                value={staffInfo[id]}
                                setValue={(value: string | string[]) => updateValue(id, value)}
                                state={error && important && !staffInfo[id] ? "error" : state}
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
                            {loading ? <LoadingUI /> : intl2("Submit")}
                        </CustomButton>
                    </Container>
                </div>
            </DetailPopup>
        </RenderCase>
    );
};

export default UpdateContent;