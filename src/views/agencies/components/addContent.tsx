"use client";

import { useState } from "react";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import DetailPopup from "@/components/popup";
import RenderCase from "@/components/render";
import LoadingUI from "@/components/loading";
import { FaBuilding } from "react-icons/fa";
import Container from "@/components/container";
import CustomButton from "@/components/button";
import CustomInputField from "@/components/input";
import { IoReloadOutline } from "react-icons/io5";
import { AgencyOperation } from "@/services/main";
import { getTokenFromCookie } from "@/utils/token";
import { useScreenView } from "@/hooks/ScreenViewProvider";
import { useNotifications } from "@/hooks/NotificationsProvider";
import { useSubmitNotification } from "@/hooks/SubmitNotificationProvider";
import { useDefaultNotification } from "@/hooks/DefaultNotificationProvider";
import { AgencyType, CreateAgencyDto, CreateAgencyManager, CreateCompanyDto } from "@/services/interface";

type AddFields = {
    id: keyof CreateAgencyDto | keyof CreateAgencyManager | keyof CreateCompanyDto,
    type: InputTypes,
    important?: boolean,
    version?: TextInputVersion | SelectInputVersion,
    select_type?: SelectInputType,
    options?: SelectInputOptionFormat[],
    isClearable?: boolean,
    state?: InputState,
    dropdownPosition?: DropdownPosition;
    onChange?: (id: keyof CreateAgencyDto, value: string) => void,
}

type Props = {
    openAdd: boolean;
    setOpenAdd: React.Dispatch<React.SetStateAction<boolean>>;
    addInfo: CreateAgencyManager;
    setAddInfo: React.Dispatch<React.SetStateAction<CreateAgencyManager>>;
    addInfo2: CreateAgencyDto;
    setAddInfo2: React.Dispatch<React.SetStateAction<CreateAgencyDto>>;
    addInfo3: CreateCompanyDto;
    setAddInfo3: React.Dispatch<React.SetStateAction<CreateCompanyDto>>;
    reloadData: () => void;
}

const AddAgencyContent = ({ openAdd, setOpenAdd, addInfo, setAddInfo, reloadData, addInfo2, setAddInfo2, addInfo3, setAddInfo3 }: Props) => {
    const { isXL } = useScreenView();
    const agencyOp = new AgencyOperation();
    const intl = useTranslations("AgenciesRoute");
    const { addNotification } = useNotifications();
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const { addSubmitNotification } = useSubmitNotification();
    const { addDefaultNotification } = useDefaultNotification();
    const userInfo = useSelector((state: RootState) => state.auth.userInfo);

    const agencyTypeOptions: SelectInputOptionFormat[] = Object.values(AgencyType).map(type => ({
        label: intl(type),
        value: type
    }));

    const isIndividualOptions: SelectInputOptionFormat[] = Object.values([true, false]).map(boolean => ({
        label: intl(boolean.toString()),
        value: boolean
    }));

    const hasAdminRole = userInfo?.roles.some(role =>
        ["ADMIN", "MANAGER", "HUMAN_RESOURCE_MANAGER"].includes(role.value)
    );

    const handleChangeLevel = (id: keyof CreateAgencyDto, value: string) => {
        let sanitizedValue = value.replace(/[^0-9]/g, '');
        let numberValue = sanitizedValue ? parseInt(sanitizedValue, 10) : 1;
        numberValue = Math.max(numberValue, 1);
        setAddInfo2(prevData => ({ ...prevData, [id]: numberValue }));
    };

    const addFields: Array<AddFields> = [
        { id: "type", type: "select", options: agencyTypeOptions, isClearable: false, select_type: "single", important: true, dropdownPosition: !isXL && Array.isArray(addInfo2.isIndividual) && !addInfo2.isIndividual[0] === false ? "right" : "bottom" },
        { id: "isIndividual", type: "select", options: isIndividualOptions, isClearable: false, select_type: "single", important: true, dropdownPosition: !isXL ? "right" : "bottom" },
        { id: "level", type: "number", onChange: handleChangeLevel, important: true },
        { id: "name", type: "text", important: true },
        { id: "postalCode", type: "text", important: true },
        { id: "email", type: "text", important: true },
        { id: "phoneNumber", type: "text", important: true },
        { id: "bank", type: "text", important: true },
        { id: "bin", type: "text", important: true },
        { id: "commissionRate", type: "number", important: true, },
        { id: "detailAddress", type: "text", important: true },
        { id: "province", type: "text", important: true },
        { id: "district", type: "text", important: true },
        { id: "town", type: "text", important: true },
        { id: "revenue", type: "number", important: true },
        { id: "managedWards", type: "select", options: [], select_type: "multi", dropdownPosition: "top" }
    ];

    if (hasAdminRole) {
        addFields.unshift({ id: "agencyId", type: "text", important: true });
    }

    const managerFields: Array<AddFields> = [
        { id: "fullname", type: "text", important: true },
        { id: "cccd", type: "text", important: true },
        { id: "phoneNumber", type: "number", important: true },
        { id: "email", type: "text", important: true },
        { id: "birthDate", type: "date" },
        { id: "position", type: "text" },
        { id: "bank", type: "text" },
        { id: "bin", type: "text" },
        { id: "salary", type: "number" },
        { id: "detailAddress", type: "text" },
        { id: "province", type: "text" },
        { id: "district", type: "text" },
        { id: "town", type: "text" },
    ];

    const companyFields: Array<AddFields> = [
        { id: "name", type: "text", important: true },
        { id: "taxCode", type: "text", important: true },
    ];

    const updateValue = (id: keyof CreateAgencyManager, value: string | string[]) => {
        setAddInfo(prevData => ({ ...prevData, [id]: value }));
    };

    const updateValue2 = (id: keyof CreateAgencyDto, value: string | string[]) => {
        setAddInfo2(prevData => ({ ...prevData, [id]: value }));
    };

    const updateValue3 = (id: keyof CreateCompanyDto, value: string | string[]) => {
        setAddInfo3(prevData => ({ ...prevData, [id]: value }));
    };

    const handleReload = () => {
        if (loading) { return; };
        setAddInfo3({ taxCode: "", name: "" })
        setAddInfo({
            fullname: "", cccd: "", phoneNumber: "", email: "", province: "", district: "", town: "", detailAddress: "", birthDate: "", bin: "", bank: "", salary: 0,
        });
        setAddInfo2({
            agencyId: "", name: "", phoneNumber: "", email: "", bin: "", province: "", district: "", town: "", detailAddress: "", latitude: 0, longitude: 0, commissionRate: 0, bank: "",
            company: addInfo3, isIndividual: [false], level: 1, managedWards: [], postalCode: "", revenue: 0, type: [AgencyType["DL"]],
            manager: addInfo,
        });
    };

    const checkImportantFields = () => {
        const missingFields: string[] = [];
        addFields.forEach(({ id, important }) => {
            if (important && !addInfo2[id as keyof CreateAgencyDto]) {
                missingFields.push(id);
            }
        });
        return missingFields;
    };

    const checkImportantFields2 = () => {
        const missingFields2: string[] = [];
        managerFields.forEach(({ id, important }) => {
            if (important && !addInfo[id as keyof CreateAgencyManager]) {
                missingFields2.push(id);
            }
        });
        return missingFields2;
    };

    const checkImportantFields3 = () => {
        const missingFields3: string[] = [];
        companyFields.forEach(({ id, important }) => {
            if (important && !addInfo3[id as keyof CreateCompanyDto]) {
                missingFields3.push(id);
            }
        });
        return missingFields3;
    };

    const handleSubmit = () => {
        if (loading) { return; };
        const missingFields = checkImportantFields();
        const missingFields2 = checkImportantFields2();
        const missingFields3 = checkImportantFields3();

        if (missingFields.length > 0 || missingFields2.length > 0 || (Array.isArray(addInfo2.isIndividual) && addInfo2.isIndividual[0] === false && missingFields3.length > 0)) {
            setError(true);
            const missingFieldsLabels = missingFields.map(field => intl(field));
            const missingFieldsLabels2 = missingFields2.map(field => intl(`manager${field}`));
            const missingFieldsLabels3 = missingFields3.map(field => intl(`company${field}`));

            addDefaultNotification({
                children: (
                    <div>
                        <p>{intl("MissingField")}</p>
                        <ul className="list-disc pl-5 flex flex-col w-full">
                            <RenderCase renderIf={missingFields.length > 0}>
                                <div className="py-1 font-bold">{(intl("Agency"))}</div>
                                {missingFieldsLabels.map((label, index) => (
                                    <li key={index} className="text-left">{label}</li>
                                ))}
                            </RenderCase>
                            <RenderCase renderIf={missingFields2.length > 0}>
                                <div className="py-1 font-bold pr-5">{(intl("Manager"))}</div>
                                {missingFieldsLabels2.map((label, index) => (
                                    <li key={index} className="text-left">{label}</li>
                                ))}
                            </RenderCase>
                            <RenderCase renderIf={(Array.isArray(addInfo2.isIndividual) && addInfo2.isIndividual[0] === false && missingFields3.length > 0)}>
                                <div className="py-1 font-bold">{(intl("Company"))}</div>
                                {missingFieldsLabels3.map((label, index) => (
                                    <li key={index} className="text-left">{label}</li>
                                ))}
                            </RenderCase>
                        </ul>
                    </div>
                )
            });
        } else {
            setError(false)
            addSubmitNotification({ message: intl("Confirm"), submitClick: handleCreate });
        }
    };

    const handleCreate = async () => {
        setLoading(true);
        const token = getTokenFromCookie();
        if (!token) {
            return;
        }

        const createManagerData: CreateAgencyManager = {
            ...addInfo,
            birthDate: addInfo.birthDate ? new Date(addInfo.birthDate).toISOString().slice(0, 10) : undefined,
            province: addInfo.province || undefined,
            district: addInfo.district || undefined,
            town: addInfo.town || undefined,
            detailAddress: addInfo.detailAddress || undefined,
            bank: addInfo.bank || undefined,
            bin: addInfo.bin || undefined,
            salary: typeof addInfo.salary === "string" ? parseFloat(addInfo.salary) : addInfo.salary || undefined,
            position: addInfo.position || undefined
        }

        const createAgencyData: CreateAgencyDto = {
            ...addInfo2,
            agencyId: hasAdminRole ? addInfo2.agencyId : userInfo?.agencyId ?? "",
            type: Array.isArray(addInfo2.type) ? addInfo2.type[0] : addInfo2.type,
            isIndividual: Array.isArray(addInfo2.isIndividual) ? addInfo2.isIndividual[0] : addInfo2.isIndividual,
            company: Array.isArray(addInfo2.isIndividual) && !addInfo2.isIndividual[0] ? addInfo3 : undefined,
            manager: createManagerData,
            commissionRate: typeof addInfo2.commissionRate === "string" ? parseFloat(addInfo2.commissionRate) : addInfo2.commissionRate,
        };

        console.log(createAgencyData)

        const response = await agencyOp.create(createAgencyData, token);

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
                icon={<FaBuilding className="w-4 h-4" />}
                noPadding
            >
                <div className="relative">
                    <div className={`flex flex-col gap-8 px-2 pb-1 xl:grid ${Array.isArray(addInfo2.isIndividual) && addInfo2.isIndividual[0] === false ? "grid-cols-3 xl:w-[1050px]" : "grid-cols-2  xl:w-[700px]"}`}>
                        <div className="flex flex-col gap-2">
                            <div className="py-1 font-bold text-center">{(intl("Manager"))}</div>
                            {managerFields.map(({ id, type, version, isClearable, options, select_type, state, important, dropdownPosition }: AddFields) => (
                                <CustomInputField
                                    id={id}
                                    key={id}
                                    type={type}
                                    value={addInfo[id as keyof CreateAgencyManager]}
                                    setValue={(value: string | string[]) => updateValue(id as keyof CreateAgencyManager, value)}
                                    state={error && important && !addInfo[id as keyof CreateAgencyManager] ? "error" : state}
                                    version={version}
                                    options={options}
                                    select_type={select_type}
                                    isClearable={isClearable}
                                    dropdownPosition={dropdownPosition}
                                    clssName="w-full"
                                    inputClassName="bg-lightContainer dark:!bg-darkContainerPrimary border border-gray-200 dark:border-white/10"
                                    label={
                                        <div className='flex gap-1 place-items-center relative mb-2'>
                                            {intl(`manager${id}`)} {important && <div className="text-red-500">*</div>}
                                        </div>
                                    } />
                            ))}
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="py-1 font-bold text-center">{(intl("Agency"))}</div>
                            {addFields.map(({ id, type, version, isClearable, options, select_type, state, important, dropdownPosition, onChange }: AddFields) => (
                                <CustomInputField
                                    id={id}
                                    key={id}
                                    type={type}
                                    value={addInfo2[id as keyof CreateAgencyDto]}
                                    setValue={(value: string | string[]) => { onChange ? onChange(id as keyof CreateAgencyDto, value as string) : updateValue2(id as keyof CreateAgencyDto, value) }}
                                    state={error && important && !addInfo2[id as keyof CreateAgencyDto] ? "error" : state}
                                    version={version}
                                    options={options}
                                    select_type={select_type}
                                    isClearable={isClearable}
                                    dropdownPosition={dropdownPosition}
                                    clssName="w-full"
                                    inputClassName="bg-lightContainer dark:!bg-darkContainerPrimary border border-gray-200 dark:border-white/10"
                                    label={
                                        <div className='flex gap-1 place-items-center relative mb-2'>
                                            {intl(id)} {important && <div className="text-red-500">*</div>}
                                        </div>
                                    } />
                            ))}
                        </div>

                        <RenderCase renderIf={Array.isArray(addInfo2.isIndividual) && addInfo2.isIndividual[0] === false}>
                            <div className="flex flex-col gap-2">
                                <div className="py-1 font-bold text-center">{(intl("Company"))}</div>
                                {companyFields.map(({ id, type, version, isClearable, options, select_type, state, important, dropdownPosition }: AddFields) => (
                                    <CustomInputField
                                        id={id}
                                        key={id}
                                        type={type}
                                        value={addInfo3[id as keyof CreateCompanyDto]}
                                        setValue={(value: string | string[]) => updateValue3(id as keyof CreateCompanyDto, value)}
                                        state={error && important && !addInfo3[id as keyof CreateCompanyDto] ? "error" : state}
                                        version={version}
                                        options={options}
                                        select_type={select_type}
                                        isClearable={isClearable}
                                        dropdownPosition={dropdownPosition}
                                        clssName="w-full"
                                        inputClassName="bg-lightContainer dark:!bg-darkContainerPrimary border border-gray-200 dark:border-white/10"
                                        label={
                                            <div className='flex gap-1 place-items-center relative mb-2'>
                                                {intl(`company${id}`)} {important && <div className="text-red-500">*</div>}
                                            </div>
                                        } />
                                ))}
                            </div>
                        </RenderCase>
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

export default AddAgencyContent;