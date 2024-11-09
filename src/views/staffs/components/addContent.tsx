"use client";

import { useState } from "react";
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
import { useScreenView } from "@/hooks/ScreenViewProvider";
import { CreateStaffDto, StaffRole } from "@/services/interface";
import { useSubmitNotification } from "@/hooks/SubmitNotificationProvider";
import { useDefaultNotification } from "@/hooks/DefaultNotificationProvider";
import { useNotifications } from "@/hooks/NotificationsProvider";

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
    openAdd: boolean;
    setOpenAdd: React.Dispatch<React.SetStateAction<boolean>>;
    addInfo: CreateStaffDto;
    setAddInfo: React.Dispatch<React.SetStateAction<CreateStaffDto>>;
    reloadData: () => void;
}

const AddContent = ({ openAdd, setOpenAdd, addInfo, setAddInfo, reloadData }: Props) => {
    const { isXL } = useScreenView();
    const intl = useTranslations("AddStaff");
    const intl2 = useTranslations("StaffInfo");
    const staffOperation = new StaffOperation();
    const { addNotification } = useNotifications();
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const { addSubmitNotification } = useSubmitNotification();
    const { addDefaultNotification } = useDefaultNotification();
    const userInfo = useSelector((state: RootState) => state.auth.userInfo);

    const hasAdminRole = userInfo?.roles.some(role =>
        ["ADMIN", "MANAGER", "HUMAN_RESOURCE_MANAGER"].includes(role.value)
    );

    const roleOptions: SelectInputOptionFormat[] = Object.values(StaffRole).map(role => ({
        label: intl(role),
        value: role
    }));

    const addFields: Array<AddFields> = [
        { id: "fullname", type: "text", important: true },
        { id: "email", type: "text", important: true },
        { id: "phoneNumber", type: "text", important: true },
        { id: "cccd", type: "number", important: true },
        { id: "birthDate", type: "date", dropdownPosition: !isXL ? "right" : "top", important: true },
        { id: "roles", type: "select", options: roleOptions, isClearable: false, select_type: "multi", important: true, dropdownPosition: !isXL ? "left" : "top" },
        { id: "province", type: "text" },
        { id: "district", type: "text" },
        { id: "town", type: "text" },
        { id: "detailAddress", type: "text" },
        { id: "bank", type: "text" },
        { id: "bin", type: "text" },
        { id: "deposit", type: "number" },
        { id: "salary", type: "number" },
        { id: "managedWards", type: "select", options: [], select_type: "multi", dropdownPosition: "top" }
    ];

    if (hasAdminRole) {
        addFields.unshift({ id: "agencyId", type: "text", important: true });
    }

    const updateValue = (id: keyof CreateStaffDto, value: string | string[]) => {
        setAddInfo(prevData => ({
            ...prevData,
            [id]: value,
        }));
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
        setAddInfo({
            agencyId: "",
            fullname: "",
            phoneNumber: "",
            email: "",
            cccd: "",
            province: "",
            district: "",
            town: "",
            detailAddress: "",
            birthDate: "",
            bin: "",
            bank: "",
            deposit: 0,
            salary: 0,
            roles: [StaffRole["SHIPPER"]],
            managedWards: []
        });
    }

    const handleSubmit = () => {
        if (loading) { return; };

        const missingFields = checkImportantFields(addInfo, addFields);
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
            addSubmitNotification({ message: intl("Confirm"), submitClick: handleCreate });
        }
    }

    const handleCreate = async () => {
        setLoading(true);
        const token = getTokenFromCookie();
        if (!token) {
            return;
        }

        const createStaffData: CreateStaffDto = {
            ...addInfo,
            agencyId: hasAdminRole ? addInfo.agencyId : userInfo?.agencyId ?? "",
            birthDate: addInfo.birthDate ? new Date(addInfo.birthDate).toISOString().slice(0, 10) : undefined,
            province: addInfo.province || undefined,
            district: addInfo.district || undefined,
            town: addInfo.town || undefined,
            detailAddress: addInfo.detailAddress || undefined,
            bank: addInfo.bank || undefined,
            bin: addInfo.bin || undefined,
            deposit: addInfo.deposit || undefined,
            salary: addInfo.salary || undefined,
        };

        const response = await staffOperation.create(createStaffData, token);

        if (response.success) {
            addNotification({ message: intl("Success"), type: "success" });
            reloadData();
        } else {
            addDefaultNotification({ message: response.message || intl("Fail") });
        }

        setLoading(false);
    };

    return (
        <RenderCase renderIf={openAdd}>
            <DetailPopup
                customWidth="w-fit"
                title={intl("Title")}
                onClose={() => setOpenAdd(false)}
                icon={<FaUserCircle className="w-full h-full" />}
                noPadding
            >
                <div className="relative">
                    <div className="flex flex-col gap-2 px-2 pb-1 xl:grid grid-cols-2">
                        {addFields.map(({ id, type, version, isClearable, options, select_type, state, important, dropdownPosition }: AddFields) => (
                            <CustomInputField
                                id={id}
                                key={id}
                                type={type}
                                value={addInfo[id]}
                                setValue={(value: string | string[]) => updateValue(id, value)}
                                state={error && important && !addInfo[id] ? "error" : state}
                                version={version}
                                options={options}
                                select_type={select_type}
                                isClearable={isClearable}
                                dropdownPosition={dropdownPosition}
                                inputClassName="bg-lightContainer dark:!bg-darkContainerPrimary border border-gray-200 dark:border-white/10 max-w-96"
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
                            {loading ? <LoadingUI /> : "Xác nhận"}
                        </CustomButton>
                    </Container>
                </div>
            </DetailPopup>
        </RenderCase>
    );
};

export default AddContent;