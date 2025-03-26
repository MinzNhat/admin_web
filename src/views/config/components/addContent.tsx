"use client";

import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import TableSwitcher from "@/components/table";
import { getTokenFromCookie } from "@/utils/token";
import { AdministrativeOperation } from "@/services/main";
import CustomButton from "@/components/button";
import { SearchCriteria, ServiceType } from "@/services/interface";
import { columnsData } from "../variables/columnsData";
import { useCallback, useEffect, useState } from "react";
import SearchPopUp, { DetailFields } from "@/views/customTableSearchPopUp";
import { Card, CardHeader, CardBody, Select, Checkbox, Input, Button } from "@nextui-org/react";
import CustomInputField from "@/components/input";
import RenderCase from "@/components/render";
import DetailPopup from "@/components/popup";
import { FaUserCircle } from "react-icons/fa";
import Container from "@/components/container";
import LoadingUI from "@/components/loading";
import { IoReloadOutline } from "react-icons/io5";
import { useDefaultNotification } from "@/hooks/DefaultNotificationProvider";
import { useSubmitNotification } from "@/hooks/SubmitNotificationProvider";

// console.log("debug", AdministrativeOperation, VoucherOperation, TaskOperation);

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

type Location = {
    id: string;
    province: string;
    district: string;
    ward: string;
    services: string[];
    deposit: number;
}

type Props = {
    openAdd: boolean;
    setOpenAdd: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddContent = ({ openAdd, setOpenAdd }: Props) => {
    const intl = useTranslations("Config");
    const [selectedProvince, setSelectedProvince] = useState<string[]>([]);
    const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
    const [selectedWards, setSelectedWards] = useState<string[]>([]);
    const [depositAmount, setDepositAmount] = useState(0);
    const [services, setServices] = useState<string[]>([]);
    const [addInfo, setAddInfo] = useState<Location>({ id: "", district: "", province: "", ward: "", services: [], deposit: 0 });
    const [provinces, setProvinces] = useState<string[]>([]);
    const [districts, setDistricts] = useState<string[]>([]);
    const [wards, setWards] = useState<string[]>([]);
    const [error, setError] = useState<boolean>(false);
    const administrativeOperation = new AdministrativeOperation();
    const [loading, setLoading] = useState(false);
    const { addSubmitNotification } = useSubmitNotification();
    const { addDefaultNotification } = useDefaultNotification();

    const provinceOptions: SelectInputOptionFormat[] = Object.values(provinces).map(province => ({
        label: province,
        value: province
    }));

    const districtOptions: SelectInputOptionFormat[] = Object.values(districts).map(district => ({
        label: district,
        value: district
    }));

    const wardOptions: SelectInputOptionFormat[] = Object.values(wards).map(ward => ({
        label: ward,
        value: ward
    }));

    const fetchProvinces = async () => {
        const response = await administrativeOperation.get({});
        setProvinces(response.data);
    };

    const fetchDistricts = async (provinces: string[]) => {
        let newDistricts: string[] = [];

        for (const province of provinces) {
            const response = await administrativeOperation.get({ province: province });
            newDistricts = [...newDistricts, ...response.data];
        }

        setDistricts((prevDistricts) => [...prevDistricts, ...newDistricts]);
    };

    const fetchWards = async (provinces: string[], districts: string[]) => {
        let newWards: string[] = [];
        console.log("fetchWards");
        for (const province of provinces) {
            // console.log(province);
            for (const district of districts) {
                // console.log(district);
                const response = await administrativeOperation.get({ province: province, district: district });
                newWards = [...newWards, ...response.data];
            }
        }
        console.log(newWards);
        setWards((prevWards) => [...prevWards, ...newWards]);
    };

    const serviceOptions = [
        'Siêu nhanh', 'Siêu rẻ',
    ].map(service => ({
        label: service,
        value: service
    }));

    const updateValue = (id: string, value: string | string[]) => {
        setAddInfo(prevData => ({
            ...prevData,
            [id]: value,
        }));
        if (id === "province") {
            setSelectedProvince(Array.isArray(value) ? value : [value]);
            fetchDistricts(Array.isArray(value) ? value : [value]);
        } else if (id === "district") {
            setSelectedDistricts(Array.isArray(value) ? value : [value]);
            fetchWards(provinces, Array.isArray(value) ? value : [value]);
        } else if (id === "ward"){
            setSelectedWards((Array.isArray(value) ? value : [value]));
        } else if (id === "deposit") {
            setDepositAmount(parseInt(value as string, 10));
        } else {
            setServices(Array.isArray(value) ? value : [value]);
        }
    };

    const addFields: Array<AddFields> = [
        { id: "province", type: "select", options: provinceOptions, isClearable: false, select_type: "multi", important: true, dropdownPosition: "bottom" },
        { id: "district", type: "select", options: districtOptions, isClearable: false, select_type: "multi", important: true, dropdownPosition: "bottom" },
        { id: "ward", type: "select", options: wardOptions, isClearable: false, select_type: "multi", important: true, dropdownPosition: "bottom" },
        { id: "services", type: "select", options: serviceOptions, isClearable: false, select_type: "multi", important: true, dropdownPosition: "bottom" },
        { id: "deposit", type: "number", isClearable: false },
    ];

    const handleSubmit = () => {
        console.log(depositAmount, services);
    }

    const fetchData = useCallback(async () => {
        const token = getTokenFromCookie();
        fetchProvinces();
    }, [
        // currentPage, currentSize, sortBy, searchCriteriaValue
    ]);

    const handleReload = () => {
        setDistricts([]);
        setWards([]);
        setSelectedDistricts([]);
        setSelectedProvince([]);
        setSelectedWards([]);
    }

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    <div className="flex flex-col gap-2 px-2 pb-1 md:grid grid-cols-2 md:w-[700px]">
                        {addFields.map(({ id, type, version, isClearable, options, select_type, state, important, dropdownPosition }: AddFields) => (
                            <CustomInputField
                                id={id}
                                key={id}
                                type={type}
                                value={addInfo[id as keyof Location]}
                                setValue={(value: string | string[]) => updateValue(id, value)}
                                state={error && important && !addInfo[id as keyof Location] ? "error" : state}
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
                            onClick={handleReload}
                            className="linear !min-w-10 !w-10 !px-0 rounded-md bg-lightContainer dark:!bg-darkContainer border border-red-500 dark:!border-red-500 h-10 text-base font-medium transition duration-200 hover:border-red-600 
                            active:border-red-700 text-red-500 dark:text-white dark:hover:border-red-400 dark:active:border-red-300 flex justify-center place-items-center"
                        >
                            <IoReloadOutline />
                        </CustomButton>
                        <CustomButton
                            version="1"
                            color="error"
                            onClick={()=>addSubmitNotification({ message: intl("SubmitConfig"), submitClick: handleSubmit})}
                            className="linear w-full rounded-md bg-red-500 dark:!bg-red-500 h-10 text-base font-medium text-white transition duration-200 hover:bg-red-600 
                        active:bg-red-700 dark:text-white dark:hover:bg-red-400 dark:active:bg-red-300 flex justify-center place-items-center"
                        >{loading ? <LoadingUI /> : intl("Submit")}</CustomButton>
                    </Container>
                </div>
            </DetailPopup>
        </RenderCase>
    );
}

export default AddContent;