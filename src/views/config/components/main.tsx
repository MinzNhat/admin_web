"use client";

import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import TableSwitcher from "@/components/table";
import { getTokenFromCookie } from "@/utils/token";
import { AdministrativeOperation } from "@/services/main";
import CustomButton from "@/views/customTableButton";
import { SearchCriteria, ServiceType } from "@/services/interface";
import { columnsData } from "../variables/columnsData";
import { useCallback, useEffect, useState } from "react";
import SearchPopUp, { DetailFields } from "@/views/customTableSearchPopUp";
import { Card, CardHeader, CardBody, Select, Checkbox, Input, Button } from "@nextui-org/react";
import CustomInputField from "@/components/input";

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

interface LocationWithDepostService {
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
}

type LocationKeys = keyof Location;

const ConfigMain = () => {
    const intl = useTranslations("Config");
    const [selectedProvince, setSelectedProvince] = useState<string[]>([]);
    const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
    const [selectedWards, setSelectedWards] = useState<string[]>([]);
    const [depositAmount, setDepositAmount] = useState("");
    const [addInfo, setAddInfo] = useState<Location>({id: "", district: "", province: "", ward: ""});
    const [provinces, setProvinces] = useState<string[]>([]);
    const [districts, setDistricts] = useState<string[]>([]);
    const [wards, setWards] = useState<string[]>([]);
    const administrativeOperation = new AdministrativeOperation();

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
        for (const province of provinces) {
            for (const district of districts) {
                const response = await administrativeOperation.get({ province: province, district: district });
                newWards = [...newWards, ...response.data];
            }
        }
        setWards((prevWards) => [...prevWards, ... newWards]);
    };

    const updateValue = (id: string, value: string | string[]) => {
        setAddInfo(prevData => ({
            ...prevData,
            [id]: value,
        }));
        if(id === "province") {
            setSelectedProvince(Array.isArray(value) ? value : [value]);
            fetchDistricts(Array.isArray(value) ? value : [value]);
        } else if (id === "district"){
            setSelectedDistricts(Array.isArray(value) ? value : [value]);
            fetchWards(provinces, Array.isArray(value) ? value : [value]);
        } else {
            setSelectedWards((Array.isArray(value) ? value : [value]));
        }
    };

    const addFields: Array<AddFields> = [
        { id: "province", type: "select", options: provinceOptions, isClearable: false, select_type: "multi", important: true, dropdownPosition: "bottom" },
        { id: "district", type: "select", options: districtOptions, isClearable: false, select_type: "multi", important: true, dropdownPosition: "bottom" },
        { id: "ward", type: "select", options: wardOptions, isClearable: false, select_type: "multi", important: true, dropdownPosition: "bottom" },
    ];

    const fetchData = useCallback(async () => {
        const token = getTokenFromCookie();
        fetchProvinces();
    }, [
        // currentPage, currentSize, sortBy, searchCriteriaValue
    ]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <h2>Thiết lập tiền giữ chân & dịch vụ</h2>
                </CardHeader>
                <CardBody>
                    <div className="flex flex-row gap-3 justify-start w-full">
                        {/* <div className="mt-4">
                            <p className="text-sm font-medium">Chọn Tỉnh/Thành</p>
                            {provinces.map((province) => (
                                <div key={province} className="flex items-center gap-2">
                                    <Checkbox onChange={(e) => {
                                        const checked = e.target.checked;
                                        setSelectedProvince((prev) => checked ? [...prev, province] : prev.filter(d => d !== province));
                                    }} />
                                    <span>{province}</span>
                                </div>
                            ))}
                        </div>

                        {selectedProvince.length > 0 && (
                            <div className="mt-4">
                                <p className="text-sm font-medium">Chọn Quận/Huyện</p>
                                {selectedProvince.flatMap(provinve => districts[provinve] || []).map((district) => (
                                    <div key={district} className="flex items-center gap-2">
                                        <Checkbox onChange={(e) => {
                                            const checked = e.target.checked;
                                            return setSelectedDistricts((prev) => checked ? [...prev, district] : prev.filter(d => d !== district));
                                        }} />
                                        <span>{district}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {selectedDistricts.length > 0 && (
                            <div className="mt-4">
                                <p className="text-sm font-medium">Chọn Phường/Xã</p>
                                {selectedDistricts.flatMap(district => wards[district] || []).map((ward) => (
                                    <div>
                                        <Checkbox onChange={(e) => {
                                            const checked = e.target.checked;
                                            setSelectedWards((prev) => checked ? [...prev, ward] : prev.filter(w => w !== ward));
                                        }} />

                                        <span>{ward}</span>
                                    </div>
                                ))}
                            </div>
                        )} */}
                        {addFields.map(({ id, type, version, isClearable, options, select_type, state, important, dropdownPosition }: AddFields) => (
                            <CustomInputField
                                id={id}
                                key={id}
                                type={type}
                                value={addInfo[id as LocationKeys]}
                                setValue={(value: string | string[]) => updateValue(id, value)}
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
                    <div className="mt-4">
                        <p className="text-sm font-medium">Tiền giữ chân (VNĐ)</p>
                        <Input type="number" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} />
                    </div>

                    <Button className="mt-4 w-full">Lưu cấu hình</Button>
                </CardBody>
            </Card>
        </div>
    );
}

export default ConfigMain;