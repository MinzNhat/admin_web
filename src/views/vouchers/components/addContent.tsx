"use client";

import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import TableSwitcher from "@/components/table";
import { getTokenFromCookie } from "@/utils/token";
import { AdministrativeOperation, VoucherOperation } from "@/services/main";
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
import { useNotifications } from "@/hooks/NotificationsProvider";

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
    const intl = useTranslations("VouchersRoute");
    const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
    const [selectedWard, setSelectedWard] = useState<string | null>(null);
    const [discount, setDiscount] = useState(0);
    const { addSubmitNotification } = useSubmitNotification();
    const { addNotification } = useNotifications();
    const [numOfOrders, setNumOfOrders] = useState(0);
    const [addInfo, setAddInfo] = useState<Location>({ id: "", district: "", province: "", ward: "", services: [], deposit: 0 });

    const [provinces, setProvinces] = useState<string[]>([]);
    const [districts, setDistricts] = useState<string[]>([]);
    const [wards, setWards] = useState<string[]>([]);
    const [startDate, setStartDate] = useState<string>();
    const [endDate, setEndDate] = useState<string>();
    const [expiration, setExpiration] = useState<string> ();
    
    const [error, setError] = useState<boolean>(false);
    const administrativeOperation = new AdministrativeOperation();
    const voucherOperation = new VoucherOperation();
    const [loading, setLoading] = useState(false);

    // Lấy danh sách tỉnh thành
    useEffect(() => {
        const fetchProvinces = async () => {
            const response = await administrativeOperation.get({});
            setProvinces(response.data);
        };
        fetchProvinces();
    }, []);

    // Lấy danh sách quận/huyện khi tỉnh thay đổi
    useEffect(() => {
        const fetchDistricts = async () => {
            if (!selectedProvince) {
                setDistricts([]);
                setSelectedDistrict(null);
                return;
            }
            const response = await administrativeOperation.get({ province: selectedProvince });
            setDistricts(response.data);
            setSelectedDistrict(null); // Reset quận/huyện cũ
            setWards([]); // Xóa danh sách phường/xã
            setSelectedWard(null);
        };
        fetchDistricts();
    }, [selectedProvince]);

    // Lấy danh sách phường/xã khi quận/huyện thay đổi
    useEffect(() => {
        const fetchWards = async () => {
            if (!selectedProvince || !selectedDistrict) {
                setWards([]);
                setSelectedWard(null);
                return;
            }
            const response = await administrativeOperation.get({ province: selectedProvince, district: selectedDistrict });
            setWards(response.data);
            setSelectedWard(null); // Reset phường/xã cũ
        };
        fetchWards();
    }, [selectedDistrict]);

    const updateValue = (id: string, value: string | string[] | number ) => {
        setAddInfo(prevData => ({
            ...prevData,
            [id]: value,
        }));

        if (id === "province") {
            setSelectedProvince(value as string);
        } else if (id === "district") {
            setSelectedDistrict(value as string);
        } else if (id === "ward") {
            setSelectedWard(value as string);
        } else if (id === "deposit") {
            setDiscount(parseInt(value as string, 10));
        } else if(id === "startDate") {
            setStartDate(value as string);
        } else if(id === "endDate") {
            setEndDate(value as string);
        } else if(id === "expiration") {
            setExpiration(value as string);
        } else {
            setNumOfOrders(value as number);
        }
    };

    const formatDate = (date: string) => {
        const [day, month, year] = date.split('/');
        return `${month}/${day}/${year}`;
    };

    const handleSubmit = async () => {
        console.log(addInfo);
        const token = getTokenFromCookie();
        if (!token) return;
        const response = await voucherOperation.create({
            area: {
                province: selectedProvince,
                district: selectedDistrict,
                ward: selectedWard
            },
            discount: discount,
            numOfOrders: numOfOrders,
            startDate: formatDate(startDate ?? ""),
            endDate: formatDate(endDate ?? ""),
            expiration: formatDate(expiration ?? "")
        }, token);
        if(response.success) {
            addNotification({ message: intl("Success"), type: "success" }); 
        }else {
            addNotification({ message: response.message, type: "success" }); 
        }
    }

    const handleReload = () => {
        setDistricts([]);
        setWards([]);
        setSelectedDistrict(null);
        setSelectedProvince(null)
        setSelectedWard(null);
    }

    const addFields: Array<AddFields> = [
        { id: "startDate", type: 'date', isClearable: true, select_type: "single", important: true, dropdownPosition: "bottom" },
        { id: "endDate", type: 'date', isClearable: true, select_type: "single", important: true, dropdownPosition: "bottom" },
        { id: "expiration", type: 'date', isClearable: true, select_type: "single", important: true, dropdownPosition: "bottom" },
        { id: "province", type: "select", options: provinces.map(p => ({ label: p, value: p })), isClearable: true, select_type: "single", important: false },
        { id: "district", type: "select", options: districts.map(d => ({ label: d, value: d })), isClearable: true, select_type: "single", important: false },
        { id: "ward", type: "select", options: wards.map(w => ({ label: w, value: w })), isClearable: true, select_type: "single", important: false },
        { id: "discount", type: "number", isClearable: true, important: true },
        { id: "numOfOrders", type: "number", isClearable: true, important: true },
    ];

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