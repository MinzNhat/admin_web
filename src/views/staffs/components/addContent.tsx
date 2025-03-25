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
import { AgencyOperation, StaffOperation } from "@/services/main";
import CustomInputField from "@/components/input";
import { IoReloadOutline } from "react-icons/io5";
import { getTokenFromCookie } from "@/utils/token";
import { useNotifications } from "@/hooks/NotificationsProvider";
import { useSubmitNotification } from "@/hooks/SubmitNotificationProvider";
import { CreateStaffDto, ShipperType, StaffRole } from "@/services/interface";
import { useDefaultNotification } from "@/hooks/DefaultNotificationProvider";
import { RoleValue } from "@/types/store/auth-config";

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
    const intl = useTranslations("AddStaff");
    const intl2 = useTranslations("StaffInfo");
    const staffOperation = new StaffOperation();
    const agencyOperationOperation = new AgencyOperation();
    const { addNotification } = useNotifications();
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const { addSubmitNotification } = useSubmitNotification();
    const { addDefaultNotification } = useDefaultNotification();
    const userInfo = useSelector((state: RootState) => state.auth.userInfo);
    const [managedWards, setManagedWards] = useState<SelectInputOptionFormat[]>([]);

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
        // { id: "agencyId", type: "text", important: true },
        { id: "email", type: "text", important: true },
        { id: "phoneNumber", type: "text", important: true },
        { id: "cccd", type: "number", important: true },
        { id: "birthDate", type: "date", dropdownPosition: "bottom", important: true },
        { id: "roles", type: "select", options: roleOptions, isClearable: false, select_type: "multi", important: true, dropdownPosition: "bottom" },
        ...(addInfo.roles.includes(StaffRole["SHIPPER"]) ? [
            { id: "shipperType" as keyof CreateStaffDto, type: "select" as InputTypes, select_type: "single" as SelectInputType, options: shipperTypeOptions, isClearable: false, important: true, dropdownPosition: "bottom" as DropdownPosition }
        ] : []),
        { id: "province", type: "text" },
        { id: "district", type: "text" },
        { id: "town", type: "text" },
        { id: "detailAddress", type: "text" },
        { id: "bank", type: "text" },
        { id: "bin", type: "text" },
        ...(addInfo.roles.includes(StaffRole["SHIPPER"]) ? [{ id: "deposit" as keyof CreateStaffDto, type: "number" as InputTypes }] : []),
        { id: "salary", type: "number" },
        { id: "managedWards", type: "select", options: managedWards, select_type: "multi", dropdownPosition: "top" }
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
        console.log(token);
        if (!token) {
            return;
        }
        console.log(token);

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
            deposit: addInfo.roles.includes(StaffRole["SHIPPER"]) ? (typeof addInfo.deposit === 'string' ? parseFloat(addInfo.deposit) : addInfo.deposit) : undefined,
            salary: typeof addInfo.salary === 'string' ? parseFloat(addInfo.salary) : addInfo.salary || undefined,
            shipperType: addInfo.roles.includes(StaffRole["SHIPPER"]) ? (Array.isArray(addInfo.shipperType) ? addInfo.shipperType[0] : addInfo.shipperType) : undefined
        };

        const response = await staffOperation.create(createStaffData, token);
        console.log(createStaffData)
        console.log(response)
        if (response.success) {
            addNotification({ message: intl("Success"), type: "success" });
            reloadData();
        } else {
            addDefaultNotification({ message: response.message || intl("Fail") });
        }

        setLoading(false);
    };

    const fetchManagedWards = async () => {
        const token = getTokenFromCookie();
        if(!token) return;
        console.log("user agencyId:", addInfo.agencyId);
        const response = await agencyOperationOperation.getManageWardsById(addInfo.agencyId, token);
        if(response.success && response.data) {
            console.log(response.data.managedWards);
            // setManagedWards(response.data.managedWards);
            const wards: SelectInputOptionFormat[] = response.data.managedWards.map((ward: any)=> ({
                label: ward.ward,
                value: ward.ward
            }))
            setManagedWards(wards);
            console.log(wards);
            console.log(roleOptions);
        }

    }

    useEffect(() => {
        fetchManagedWards();
    }, [addInfo])

    return (
        <RenderCase condition={openAdd}>
            <DetailPopup
                customWidth="w-full md:w-fit"
                title={intl("Title")}
                onClose={() => setOpenAdd(false)}
                icon={<FaUserCircle className="w-full h-full" />}
                noPadding
            >
                <div className="relative">
                    <div className="flex flex-col gap-2 px-2 pb-1 md:grid grid-cols-2 md:w-[700px]">
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

export default AddContent;