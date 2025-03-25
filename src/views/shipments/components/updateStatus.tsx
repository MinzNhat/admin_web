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
import { ShipmentOperation, StaffOperation } from "@/services/main";
import CustomInputField from "@/components/input";
import { IoReloadOutline } from "react-icons/io5";
import { getTokenFromCookie } from "@/utils/token";
import { useNotifications } from "@/hooks/NotificationsProvider";
import { useSubmitNotification } from "@/hooks/SubmitNotificationProvider";
import { useDefaultNotification } from "@/hooks/DefaultNotificationProvider";
import { UpdateStaffDto, ShipperType, StaffRole } from "@/services/interface";
import { UUID } from "crypto";

type UpdateFields = {
    id: string,
    type: InputTypes,
    important?: boolean,
    version?: TextInputVersion | SelectInputVersion,
    select_type?: SelectInputType,
    options?: SelectInputOptionFormat[],
    isClearable?: boolean,
    state?: InputState,
    dropdownPosition?: DropdownPosition;
}

type StaffInfo = {
    [key: string]: any;
    status: string;
};

type Props = {
    openUpdate: boolean;
    setOpenUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    staffInfo: StaffInfo | null;
    setStaffInfo: React.Dispatch<React.SetStateAction<StaffInfo | null>>;
    shippmentId: string | undefined;
}

const UpdateStatus = ({ openUpdate, setOpenUpdate, staffInfo, setStaffInfo, shippmentId }: Props) => {
    const intl = useTranslations("ShipmentRoute");
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const { addNotification } = useNotifications();
    const shipmentOp = new ShipmentOperation();
    const status = ["ENTERING", "LEAVING"].map(sta => ({
        label: sta,
        value: sta
    }));;

    const UpdateFields: Array<UpdateFields> = [
        { id: "status", type: "select", options: status, select_type: "single", dropdownPosition: "top" }
    ];

    const updateValue = (id: string, value: string) => {
        console.log({status: value[0]});
        setStaffInfo({status: value[0]});
    };

    const checkImportantFields = (staffInfo: {id: string} | null, UpdateFields: Array<UpdateFields>) => {
        const missingFields: string[] = [];
        UpdateFields.forEach(({ id, important }) => {
            if (important && !staffInfo?[status]:false) {
                missingFields.push(id);
            }
        });
        return missingFields;
    };

    const handleSubmit = async () => {
        if (loading) { return; };
        setLoading(true);

        const token = getTokenFromCookie();
        if (!token) {
            return;
        }
        console.log(token, staffInfo?.status);

        if(staffInfo && staffInfo?.status == "ENTERING") {
            const response = await shipmentOp.confirmAllOrdersInShipmentEnteringAgency(shippmentId??"", token);
            addNotification({ message: response.message ?? intl("Success2"), type: "success" });
            console.log(response);
        } else if (staffInfo && staffInfo?.status == "LEAVING") {
            const response = await shipmentOp.confirmAllOrdersInShipmentLeavingAgency(shippmentId??"", token);
            addNotification({ message: response.message ?? intl("Success2"), type: "success" });
            console.log(response);
        }
        setLoading(false);
        // const missingFields = checkImportantFields(staffInfo??{status: ""}, UpdateFields);
        // if (missingFields.length > 0) {
        //     setError(true);
        //     const missingFieldsLabels = missingFields.map(field => intl(field));
        //     addDefaultNotification({
        //         children: (
        //             <div>
        //                 <p>{intl("MissingField")}</p>
        //                 <ul className="list-disc pl-5">
        //                     {missingFieldsLabels.map((label, index) => (
        //                         <li key={index} className="text-left">{label}</li>
        //                     ))}
        //                 </ul>
        //             </div>
        //         )
        //     });
        // } else {
        //     setError(false)
        //     addSubmitNotification({ message: intl("Confirm2"), submitClick: handleCreate });
        // }
    }

    const handleCreate = async () => {
        setLoading(true);
        const token = getTokenFromCookie();
        if (!token) {
            return;
        }

        // const updateStaffData: UpdateStaffDto = {
        //     ...staffInfo,
        //     cccd: staffInfo.cccd ? staffInfo.cccd : "",
        //     agencyId: hasAdminRole ? staffInfo.agencyId : userInfo?.agencyId ?? "",
        //     birthDate: staffInfo.birthDate ? new Date(staffInfo.birthDate).toISOString().slice(0, 10) : undefined,
        //     province: staffInfo.province || undefined,
        //     district: staffInfo.district || undefined,
        //     town: staffInfo.town || undefined,
        //     detailAddress: staffInfo.detailAddress || undefined,
        //     bank: staffInfo.bank || undefined,
        //     bin: staffInfo.bin || undefined,
        //     deposit: staffInfo.roles.includes(StaffRole["SHIPPER"]) ? (typeof staffInfo.deposit === 'string' ? parseFloat(staffInfo.deposit) : staffInfo.deposit) : undefined,
        //     salary: typeof staffInfo.salary === 'string' ? parseFloat(staffInfo.salary) : staffInfo.salary || undefined,
        //     shipperType: staffInfo.roles.includes(StaffRole["SHIPPER"]) ? (Array.isArray(staffInfo.shipperType) ? staffInfo.shipperType[0] : staffInfo.shipperType) : undefined,
        //     managedWards: staffInfo.managedWards ? staffInfo.managedWards.map(ward => ward.toString()) : []
        // };
        // console.log(updateStaffData)
        // const response = await staffOperation.update(staffInfo.id as UUID, updateStaffData, token);
        // console.log(response)
        // if (response.success) {
        //     setInitValue(staffInfo);
        //     addNotification({ message: intl("Success2"), type: "success" });
        //     reloadData();
        // } else {
        //     addDefaultNotification({ message: response.message || intl("Fail2") });
        // }

        setLoading(false);
    };

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
                                value={staffInfo?.status}
                                setValue={(value: string) => updateValue(id, value)}
                                state={error && important && !staffInfo?.[id] ? "error" : state}
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
                        ))}
                    </div>
                    <Container className="sticky bottom-0 w-full p-2 !rounded-none flex gap-1.5">
                        <CustomButton
                            version="1"
                            color="error"
                            onClick={handleSubmit}
                            className="linear w-full rounded-md bg-red-500 dark:!bg-red-500 h-10 text-base font-medium text-white transition duration-200 hover:bg-red-600 
                            active:bg-red-700 dark:text-white dark:hover:bg-red-400 dark:active:bg-red-300 flex justify-center place-items-center"
                        >
                            {loading ? <LoadingUI /> : intl("Submit")}
                        </CustomButton>
                    </Container>
                </div>
            </DetailPopup>
        </RenderCase>
    );
};

export default UpdateStatus;