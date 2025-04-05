"use client";

import { use, useEffect, useState } from "react";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import DetailPopup from "@/components/popup";
import RenderCase from "@/components/render";
import LoadingUI from "@/components/loading";
import { FaUserCircle } from "react-icons/fa";
import Container from "@/components/container";
import CustomButton from "@/components/button";
import { AdministrativeOperation, AgencyOperation, MapOperation, OrdersOperation, ShipmentOperation, StaffOperation } from "@/services/main";
import CustomInputField from "@/components/input";
import { IoReloadOutline } from "react-icons/io5";
import { getTokenFromCookie } from "@/utils/token";
import { useNotifications } from "@/hooks/NotificationsProvider";
import { useSubmitNotification } from "@/hooks/SubmitNotificationProvider";
import { CreateOrderDto, CreateStaffDto, ShipperType, StaffRole } from "@/services/interface";
import { useDefaultNotification } from "@/hooks/DefaultNotificationProvider";
import { RoleValue } from "@/types/store/auth-config";

type AddFields = {
    id: keyof CreateOrderDto,
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
    addInfo: CreateOrderDto;
    setAddInfo: React.Dispatch<React.SetStateAction<CreateOrderDto>>;
    reloadData: () => void;
}

const AddContent = ({ openAdd, setOpenAdd, addInfo, setAddInfo, reloadData }: Props) => {
    const intl = useTranslations("OrdersRoute");
    const orderOperation = new OrdersOperation();
    const mapOperation = new MapOperation();
    const userInfo = useSelector((state: RootState) => state.auth.userInfo);
    const { addNotification } = useNotifications();
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const { addSubmitNotification } = useSubmitNotification();
    const administrativeOperation = new AdministrativeOperation();
    const { addDefaultNotification } = useDefaultNotification();
    const [provinces, setProvinces] = useState<string[]>([]);
    const [districts, setDistricts] = useState<string[]>([]);
    const [wards, setWards] = useState<string[]>([]);

    const serviceOptions: SelectInputOptionFormat[] = ['Siêu nhanh', 'Siêu rẻ'].map(province => ({
        label: province,
        value: province
    }));

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

    const addFields: Array<AddFields> = [
        // { id: "agencyId", type: "text", important: true },
        { id: "serviceType", type: "select", options: serviceOptions, important: true },
        { id: "nameSender", type: "text", important: true },
        { id: "nameReceiver", type: "text", important: true },
        { id: "phoneNumberSender", type: "text", important: true },
        { id: "phoneNumberReceiver", type: "text", important: true },
        { id: "mass", type: "number", important: true, isClearable: false },
        { id: "height", type: "number", important: true, isClearable: false },
        { id: "width", type: "number", important: true, isClearable: false },
        { id: "length", type: "number", important: true, isClearable: false },
        { id: "provinceSource", type: "text" },
        { id: "provinceDest", type: "select", options: provinceOptions, dropdownPosition: "top", important: true },
        { id: "districtSource", type: "text" },
        { id: "districtDest", type: "select", options: districtOptions, dropdownPosition: "top", important: true },
        { id: "wardSource", type: "text" },
        { id: "wardDest", type: "select", options: wardOptions, dropdownPosition: "top", important: true },
        { id: "detailSource", type: "text" },
        { id: "detailDest", type: "text", important: true },
        // { id: "fee", type: "number", important: true },
        { id: "cod", type: "number", important: true, isClearable: false },
        // { id: "userId", type: "text", important: true },
    ];

    const fetchProvinces = async () => {
        const response = await administrativeOperation.get({});
        setProvinces(response.data);
    };

    const fetchDistricts = async () => {
        const response = await administrativeOperation.get({ province: addInfo.provinceDest });
        setDistricts(response.data);
    };

    const fetchWards = async () => {
        const response = await administrativeOperation.get({ province: addInfo.provinceDest, district: addInfo.districtDest });
        setWards(response.data);
    };

    const updateValue = (id: keyof CreateOrderDto, value: number | string | string[]) => {
        setAddInfo(prevData => ({
            ...prevData,
            [id]: value,
        }));
        if(id === "provinceDest") {
            fetchDistricts();
        } else if (id === "districtDest"){
            fetchWards();
        }    
    };

    const checkImportantFields = (addInfo: CreateOrderDto, addFields: Array<AddFields>) => {
        const missingFields: string[] = [];
        addFields.forEach(({ id, important }) => {
            if (important && !addInfo[id]) {
                missingFields.push(id);
            }
        });
        return missingFields;
    };
    useEffect(() => {
        fetchProvinces();
    },[openAdd]);

    const handleReload = () => {
        if (loading) {
            return;
        }
        fetchProvinces();
    
        setAddInfo(prevData => ({
            serviceType: "",
            nameSender: "",
            phoneNumberSender: "",
            nameReceiver: "",
            phoneNumberReceiver: "",
            mass: 0,
            height: 0,
            width: 0,
            length: 0,
            provinceSource: userInfo?.province??"Thành phố Hồ Chí Minh",
            districtSource: userInfo?.district??"Thành phố Thủ Đức",
            wardSource: userInfo?.town??"Phường Linh Trung",
            detailSource: userInfo?.detailAddress??"ktx khu A",
            longSource: 0,
            latSource: 0,
            provinceDest: "",
            districtDest: "",
            wardDest: "",
            detailDest: "",
            longDestination: 0,
            latDestination: 0,
            fee: 0,
            cod: 0,
            userId: "",
            deliverDoorToDoor: false,
            fromMass: 0,
            toMass: 0,
            goodType: "OTHER",
            isBulkyGood: false,
            note: "",
            paymentMethod: "BY_CASH",
            receiverWillPay: false,
            willExportInvoice: true
        }));
    };
    

    const handleSubmit = () => {
        if (loading) { return; };
        setLoading(true);

        const missingFields = checkImportantFields(addInfo, addFields);
        if (missingFields.length > 0) {
            setError(true);
            const missingFieldsLabels = missingFields.map(field => intl(field));
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
            addSubmitNotification({ message: intl("CreateOrder"), submitClick: handleCreate });
        }
        setLoading(false);
    }

    const handleCreate = async () => {
        setLoading(true);
        const token = getTokenFromCookie();
        if (!token) {
            return;
        }
        console.log("addInfo.mass", typeof(addInfo.mass));

        const sourceCoor = await mapOperation.getCoordinates(addInfo.detailSource + addInfo.wardSource + addInfo.districtSource + addInfo.provinceSource, process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? "");
        // setSource(sourceCoor);
        console.log(sourceCoor)
        const destCoor = await mapOperation.getCoordinates(
            addInfo.detailDest + 
            (addInfo.wardDest?.[0] ?? "") + 
            (addInfo.districtDest?.[0] ?? "") +  
            (addInfo.provinceDest?.[0] ?? ""), 
            process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? ""
        );
        console.log(process.env.NEXT_PUBLIC_GOOGLE_API_KEY, destCoor)
        
        
        // setSource(destCoor);
        const response = await orderOperation.create(
            {
                ...addInfo, 
                serviceType: addInfo.serviceType[0]??"",
                provinceDest: addInfo.provinceDest[0]??"",
                districtDest: addInfo.districtDest[0]??"",
                wardDest: addInfo.wardDest[0]??"",
                mass: parseFloat(addInfo.mass.toString()) || 0,
                height: parseFloat(addInfo.height.toString()) || 0,
                width: parseFloat(addInfo.width.toString()) || 0,
                length: parseFloat(addInfo.length.toString()) || 0,
                cod: parseFloat(addInfo.cod.toString()) || 0,
                longSource: sourceCoor?.lng??0,
                latSource: sourceCoor?.lat??0,
                longDestination: destCoor?.lng??0,
                latDestination: destCoor?.lat??0,
            }, token);

        if (response.success) {
            addNotification({ message: intl("Success"), type: "success" });
            reloadData();
        } else {
            addDefaultNotification({ message: response.message || intl("Fail") });
        }

        setLoading(false);
    };

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
                                disabled={id.includes("Source")}
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
                            onClick={handleSubmit}
                            className="linear w-full rounded-md bg-red-500 dark:!bg-red-500 h-10 text-base font-medium text-white transition duration-200 hover:bg-red-600 
                            active:bg-red-700 dark:text-white dark:hover:bg-red-400 dark:active:bg-red-300 flex justify-center place-items-center"
                        >
                            {loading ? <LoadingUI /> : intl("CreateOrder")}
                        </CustomButton>
                    </Container>
                </div>
            </DetailPopup>
        </RenderCase>
    );
};

export default AddContent;