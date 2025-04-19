"use client";

import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import TableSwitcher from "@/components/table";
import { getTokenFromCookie } from "@/utils/token";
import { AdministrativeOperation, AgencyOperation, ConfigOperation } from "@/services/main";
import CustomButton from "@/components/button";
import { SearchCriteria, ServiceType } from "@/services/interface";
import { columnsData } from "../variables/columnsData";
import { useCallback, useEffect, useState } from "react";
import SearchPopUp, { DetailFields } from "@/views/customTableSearchPopUp";
import { Card, CardHeader, CardBody, Select, Checkbox, Input, Button } from "@nextui-org/react";
import CustomInputField from "@/components/input";
import RenderCase from "@/components/render";
import DetailPopup from "@/components/popup";
import { FaBox, FaUserCircle } from "react-icons/fa";
import Container from "@/components/container";
import LoadingUI from "@/components/loading";
import { IoReloadOutline } from "react-icons/io5";
import { useDefaultNotification } from "@/hooks/DefaultNotificationProvider";
import { useSubmitNotification } from "@/hooks/SubmitNotificationProvider";
import { useNotifications } from "@/hooks/NotificationsProvider";
import CollapsibleSection from "@/components/collapsible";
import { RiMenuSearchLine } from "react-icons/ri";

// console.log("debug", AdministrativeOperation, VoucherOperation, TaskOperation);

type ButtonList = {
    key: string,
    action?: () => void;
}

type AddFields = {
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

type LocationWithDepostService = {
    province: string;
    district: string;
    ward: string;
    deposit: number;
    services: ServiceType[];
}

type FileInfo = {
    id: string;
    name: string;
    url: string;
}

type Address = {
    province: string;
    district: string;
    ward: string;
}

type Props = {
    openAdd: boolean;
    setOpenAdd: React.Dispatch<React.SetStateAction<boolean>>;
    selectedAgency?: AgencyInfo;
    setSelectedAgency?: React.Dispatch<React.SetStateAction<AgencyInfo | null>>;
}

const UpdateContentAgency = ({ openAdd, setOpenAdd, selectedAgency, setSelectedAgency }: Props) => {
    const intl = useTranslations("AgenciesRoute");
    const [addInfo, setAddInfo] = useState<AgencyInfo>({
        id: "",
        name: "",
        bank: "",
        bin: "",
        commissionRate: 0,
        createdAt: "",
        detailAddress: "",
        district: "",
        email: "",
        isIndividual: false,
        latitude: 0,
        level: "",
        longitude: 0,
        managerId: "",
        phoneNumber: "",
        postalCode: "",
        province: "",
        revenue: 0,
        town: "",
        type: "",
        updatedAt: "",
        company: {
            id: "",
            taxCode: "",
            name: "",
            licenses: [],
        },
        contracts: [],
        manager: {
            agencyId: "",
            avatar: "",
            bank: "",
            bin: "",
            birthDate: "",
            cccd: "",
            deposit: 0,
            detailAddress: "",
            district: "",
            town: "",
            email: "",
            fullname: "",
            id: "",
            paidSalary: 0,
            phoneNumber: "",
            province: "",
            salary: 0,
            staffId: "",
            username: "",
        },
    });
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const { addSubmitNotification } = useSubmitNotification();
    const { addNotification } = useNotifications();
    const [openContracts, setOpenContracts] = useState(false);
    const [openCompany, setOpenCompany] = useState(false);
    const agencyOp = new AgencyOperation();
    const [licenseUrls, setLicenseUrls] = useState<FileInfo[]>([]);
    const [contractUrls, setContractUrls] = useState<FileInfo[]>([]);
    const individualOptions = [
        'Có', 'Không',
    ].map(service => ({
        label: service,
        value: service
    }));

    const buttonList: ButtonList[] = [
        { key: "company", action: () => setOpenCompany(true) },
        { key: "contract", action: () => setOpenContracts(true) },
    ];

    const companyAddFields: Array<AddFields> = [
        { id: "nameCompany", type: "text", isClearable: false },
        { id: "taxCode", type: "text", isClearable: false },
    ];

    const addFields: Array<AddFields> = [
        { id: "name", type: "text", isClearable: false },
        { id: "bank", type: "text", isClearable: false },
        { id: "bin", type: "text", isClearable: false },
        { id: "commissionRate", type: "number", isClearable: false },
        { id: "detailAddress", type: "text", isClearable: false },
        { id: "district", type: "text", isClearable: false },
        { id: "email", type: "text", isClearable: false },
        { id: "isIndividual", type: "select", options: individualOptions, isClearable: false },
        { id: "latitude", type: "number", isClearable: false },
        { id: "longitude", type: "number", isClearable: false },
        { id: "managerId", type: "text", isClearable: false },
        { id: "phoneNumber", type: "text", isClearable: false },
        { id: "postalCode", type: "text", isClearable: false },
        { id: "province", type: "text", isClearable: false },
        { id: "revenue", type: "number", isClearable: false },
        { id: "town", type: "text", isClearable: false },
        { id: "type", type: "text", isClearable: false },
        { id: "level", type: "text", isClearable: false },
    ];


    const updateValue = (id: string, value: any) => {
        setAddInfo(prevData => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async () => {
        const token = getTokenFromCookie();
        if (!token) {
            return;
        }
        // for(const location of locations) {
        //     const response = await configOperation.update({
        //         deposit: depositAmount,
        //         district: location.district,
        //         province: location.province,
        //         serviceNames: services.map((service)=>{
        //             return  service === intl('SN')? "SN": 
        //                     service === intl('SR')? "SR":
        //                     service === intl('hht')? "HHT":
        //                     service === intl('ttk')? "TTK": "CPN"
        //         }),
        //         ward: location.ward,
        //         managedByThirdParty: managedByThirdParty,
        //     }, token);
        //     if(!response.success) {
        //         addNotification({message: response.message, type: "error"});
        //     } else {
        //         addNotification({message: response.message, type: "success"});
        //     }
        // }
    }

    const fetchInitialData = async () => {
        console.log('selectedAgency', selectedAgency)
        if (!selectedAgency || !selectedAgency.id) {
            return;
        };
        setAddInfo({
            id: selectedAgency.id,
            name: selectedAgency.name,
            bank: selectedAgency.bank,
            bin: selectedAgency.bin,
            commissionRate: selectedAgency.commissionRate,
            createdAt: selectedAgency.createdAt,
            detailAddress: selectedAgency.detailAddress,
            district: selectedAgency.district,
            email: selectedAgency.email,
            isIndividual: selectedAgency.isIndividual,
            latitude: selectedAgency.latitude,
            level: selectedAgency.level,
            longitude: selectedAgency.longitude,
            managerId: selectedAgency.managerId,
            phoneNumber: selectedAgency.phoneNumber,
            postalCode: selectedAgency.postalCode,
            province: selectedAgency.province,
            revenue: selectedAgency.revenue,
            town: selectedAgency.town,
            type: selectedAgency.type,
            updatedAt: selectedAgency.updatedAt,
            company: {
                id: selectedAgency.company?.id,
                taxCode: selectedAgency.company?.taxCode,
                name: selectedAgency.company?.name,
                licenses: selectedAgency.company?.licenses || [],
            },
            contracts: selectedAgency.contracts || [],
            manager: {
                agencyId: selectedAgency.manager?.agencyId,
                avatar: selectedAgency.manager?.avatar,
                bank: selectedAgency.manager?.bank,
                bin: selectedAgency.manager?.bin,
                birthDate: selectedAgency.manager?.birthDate,
                cccd: selectedAgency.manager?.cccd,
                deposit: selectedAgency.manager?.deposit,
                detailAddress: selectedAgency.manager?.detailAddress,
                district: selectedAgency.manager?.district,
                town: selectedAgency.manager?.town,
                email: selectedAgency.manager?.email,
                fullname: selectedAgency.manager?.fullname,
                id: selectedAgency.manager?.id,
                paidSalary: selectedAgency.manager?.paidSalary,
                phoneNumber: selectedAgency.manager?.phoneNumber,
                province: selectedAgency.manager?.province,
                salary: selectedAgency.manager?.salary,
                staffId: selectedAgency.manager?.staffId,
                username: selectedAgency.manager?.username,
            }
        });
        const token = getTokenFromCookie();
        if (!token) {
            return;
        }
        console.log('getting files');
        selectedAgency.company.licenses.forEach(async (license) => {
            const fileResponse = await agencyOp.downloadCompanyLicenseFile(license.id, token);
            console.log(fileResponse);
            if (fileResponse) {
                const url = URL.createObjectURL(fileResponse);
                setLicenseUrls((prevUrls) => [...prevUrls, {
                    url,
                    id: license.id,
                    name: license.name,
                }]);
            } else {
                console.error("File response is null or invalid");
            }
        });
        selectedAgency.contracts.forEach(async (contract) => {
            const fileUrl = await agencyOp.downloadContractFile(contract.id, token);
            if (fileUrl) {
                const url = URL.createObjectURL(fileUrl);
                console.log('contract url', url);
                setContractUrls((prevUrls) => [...prevUrls, {
                    url,
                    id: contract.id,
                    name: contract.name,
                }]);
            } else {
                console.error("File response is null or invalid");
            }
        });
        // const fileResponse = await businessOperation.getLicenseFile({ fileId: license.id }, token);

        // if (fileResponse) {
        //     const fileBlob = new Blob([fileResponse], { type: "application/pdf" });
        //     const url = URL.createObjectURL(fileBlob);
        //     setFileUrl(url);
        // } else {
        //     console.error("File response is null or invalid");
        // }

        // const response = await tasksOp.searchByOrderId(selectedAgency.id, token);
    };

    useEffect(() => {
        if (openAdd) {
            fetchInitialData();
        }
    }, []);

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
                    <RenderCase condition={openContracts}>
                        <DetailPopup
                            customWidth="w-full md:w-fit"
                            title={intl("contract")}
                            onClose={() => setOpenContracts(false)}
                            icon={<FaBox className="h-4 w-4" />}
                            noPadding
                            className="flex flex-col px-4 pt-2 min-h-20 flex place-items-center"
                        >
                            {
                                contractUrls.map((contract, index) => (
                                    <div key={index} className="flex flex-col gap-2">
                                        <div className="flex gap-2 place-items-center">
                                            <span className="text-sm font-semibold">{intl("contract")}: {index + 1}</span>
                                            <a href={contract.url} download={contract.name} className="text-blue-500 hover:underline">
                                                {intl("download")}
                                            </a>
                                        </div>
                                    </div>
                                ))
                            }
                        </DetailPopup>
                    </RenderCase>
                    <RenderCase condition={openCompany}>
                        <DetailPopup
                            customWidth="w-full md:w-fit"
                            title={intl("company")}
                            onClose={() => setOpenCompany(false)}
                            icon={<FaBox className="h-4 w-4" />}
                            noPadding
                            className="flex flex-col gap-2 px-4 pt-2 min-h-20 flex place-items-center"
                        >
                            <div className={"flex flex-row gap-2 place-items-center"}>
                                {companyAddFields.map(({ id, type, version, isClearable, options, select_type, state, important, dropdownPosition }: AddFields) => (
                                    <CustomInputField
                                        id={id}
                                        key={id}
                                        type={type}
                                        value={addInfo[id as keyof AgencyInfo]}
                                        setValue={(value: string | string[]) => updateValue(id, value)}
                                        state={error && important && !addInfo[id as keyof AgencyInfo] ? "error" : state}
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
                            {licenseUrls.map((license, index) => (
                                <div key={index} className="flex flex-col gap-2">
                                    <div className="flex gap-2 place-items-center">
                                        <span className="text-sm font-semibold">{intl("license")}: {index + 1}</span>
                                        <a href={license.url} download={license.name} className="text-blue-500 hover:underline">
                                            {intl("download")}
                                        </a>
                                    </div>
                                </div>
                            ))}
                            {/* <a
                                href={fileUrl}
                                download={fileInfo.name}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg mt-4 transition-all"
                            >
                                📄 <FormattedMessage id="Business.DownloadPDF" />
                            </a> */}
                        </DetailPopup>
                    </RenderCase>

                    <CollapsibleSection
                        initialValue={false}
                        trigger={
                            <div className="p-2">
                                <div
                                    color="error"
                                    className="linear w-full rounded-md bg-red-500 dark:!bg-red-500 h-10 text-base font-medium text-white transition duration-200 hover:bg-red-600 
                                active:bg-red-700 dark:text-white dark:hover:bg-red-400 dark:active:bg-red-300 flex justify-between place-items-center px-3"
                                >
                                    {intl("menu")} <RiMenuSearchLine className="w-5 h-5" />
                                </div>
                            </div>
                        }
                    >
                        <div className="flex flex-col gap-2 px-2 pb-2">
                            {buttonList.map(({ key, action }) => (
                                <CustomButton
                                    key={key}
                                    version="1"
                                    color="error"
                                    onClick={action}
                                    className="linear !min-w-10 !px-0 rounded-md bg-lightContainer dark:!bg-darkContainer border border-red-500 dark:!border-red-500 h-10 text-base font-medium transition duration-200 hover:border-red-600
                                    active:border-red-700 text-red-500 dark:text-white dark:hover:border-red-400 dark:active:border-red-300 flex justify-center place-items-center"
                                >
                                    {intl(key)}
                                </CustomButton>
                            ))}
                        </div>
                    </CollapsibleSection>
                    <div className="flex flex-col gap-2 px-2 pb-1 md:grid grid-cols-2 md:w-[700px]">
                        {addFields.map(({ id, type, version, isClearable, options, select_type, state, important, dropdownPosition }: AddFields) => (
                            <CustomInputField
                                id={id}
                                key={id}
                                type={type}
                                value={addInfo[id as keyof AgencyInfo]}
                                setValue={(value: string | string[]) => updateValue(id, value)}
                                state={error && important && !addInfo[id as keyof AgencyInfo] ? "error" : state}
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
                            onClick={fetchInitialData}
                            className="linear !min-w-10 !w-10 !px-0 rounded-md bg-lightContainer dark:!bg-darkContainer border border-red-500 dark:!border-red-500 h-10 text-base font-medium transition duration-200 hover:border-red-600 
                            active:border-red-700 text-red-500 dark:text-white dark:hover:border-red-400 dark:active:border-red-300 flex justify-center place-items-center"
                        >
                            <IoReloadOutline />
                        </CustomButton>
                        <CustomButton
                            version="1"
                            color="error"
                            onClick={() => addSubmitNotification({ message: intl("SubmitConfig"), submitClick: handleSubmit })}
                            className="linear w-full rounded-md bg-red-500 dark:!bg-red-500 h-10 text-base font-medium text-white transition duration-200 hover:bg-red-600 
                        active:bg-red-700 dark:text-white dark:hover:bg-red-400 dark:active:bg-red-300 flex justify-center place-items-center"
                        >{loading ? <LoadingUI /> : intl("Submit")}</CustomButton>
                    </Container>
                </div>
            </DetailPopup>
        </RenderCase>
    );
}

export default UpdateContentAgency;