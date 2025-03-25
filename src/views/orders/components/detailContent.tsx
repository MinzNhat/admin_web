"use client";

import { RootState } from "@/store";
import TaskDetail from "./taskDetail";
import { FaBox } from "react-icons/fa";
import JourneyTimeline from "./journies";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import DetailPopup from "@/components/popup";
import RenderCase from "@/components/render";
import LoadingUI from "@/components/loading";
import Container from "@/components/container";
import CustomButton from "@/components/button";
import { RiMenuSearchLine } from "react-icons/ri";
import { IoReloadOutline } from "react-icons/io5";
import CustomInputField from "@/components/input";
import { getTokenFromCookie } from "@/utils/token";
import { UpdateOrderDto } from "@/services/interface";
import { useCallback, useEffect, useState } from "react";
import CollapsibleSection from "@/components/collapsible";
import { TaskData } from "@/types/views/tasks/tasks-config";
import { Insurance, OrderData } from "@/types/views/orders/orders-config";
import { OrdersOperation, TaskOperation } from "@/services/main";
import { useNotifications } from "@/hooks/NotificationsProvider";
import { useSubmitNotification } from "@/hooks/SubmitNotificationProvider";
import { useDefaultNotification } from "@/hooks/DefaultNotificationProvider";
import ImageList from "./imageList";

type ButtonList = {
    key: string,
    action?: () => void;
}

type DetailFields = {
    id: keyof OrderData,
    type?: InputTypes,
    canUpdate?: boolean,
    select_type?: SelectInputType,
    options?: SelectInputOptionFormat[],
    isClearable?: boolean,
    dropdownPosition?: DropdownPosition;
}

type Props = {
    openDetail: boolean;
    setOpenDetail: React.Dispatch<React.SetStateAction<boolean>>;
    selectedOrder?: OrderData;
    setSelectedOrder: React.Dispatch<React.SetStateAction<OrderData | undefined>>;
    updatePermission?: boolean;
    reloadData: () => void;
}

const DetailContent = ({ openDetail, setOpenDetail, selectedOrder, updatePermission, setSelectedOrder, reloadData }: Props) => {
    const tasksOp = new TaskOperation();
    const orderOp = new OrdersOperation();
    const intl = useTranslations("OrdersRoute");
    const [task, setTask] = useState<TaskData[]>();
    const { addNotification } = useNotifications();
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [insurance, setInsurance] = useState<Insurance>();
    const [openTask, setOpenTask] = useState<boolean>(false);
    const { addSubmitNotification } = useSubmitNotification();
    const { addDefaultNotification } = useDefaultNotification();
    const [initialValue, setInitialValue] = useState<OrderData>();
    const [openJournies, setOpenJournies] = useState<boolean>(false);
    const [openImages, setOpenImages] = useState(false);
    const [openSignatures, setOpenSignatures] = useState(false);
    const locale = useSelector((state: RootState) => state.language.locale);

    const updateValue = (id: keyof OrderData, value: string | string[]) => {
        setSelectedOrder(prevData => {
            if (!prevData) return prevData;
            return {
                ...prevData,
                [id]: value,
            };
        });
    };

    const buttonList: ButtonList[] = [
        { key: "journies", action: () => setOpenJournies(true) },
        { key: "images" , action: () => setOpenImages(true)},
        { key: "signatures", action: () => setOpenSignatures(true) },
        { key: "task", action: () => setOpenTask(true) }
    ];

    const detailFields: Array<DetailFields> = [
        { id: "trackingNumber" },
        { id: "orderCode" },
        { id: "statusCode" },
        { id: "nameSender" },
        { id: "phoneNumberSender" },
        { id: "detailSource" },
        { id: "provinceSource" },
        { id: "districtSource" },
        { id: "wardSource" },
        { id: "nameReceiver" },
        { id: "phoneNumberReceiver" },
        { id: "detailDest" },
        { id: "provinceDest" },
        { id: "districtDest" },
        { id: "wardDest" },
        { id: "goodType" },
        { id: "mass", type: "number", canUpdate: updatePermission },
        { id: "width", type: "number", canUpdate: updatePermission },
        { id: "height", type: "number", canUpdate: updatePermission },
        { id: "length", type: "number", canUpdate: updatePermission },
        { id: "cod", type: "number", canUpdate: updatePermission },
        { id: "fee" },
        { id: "paid" },
        { id: "receiverWillPay" },
        { id: "createdAt" },
        { id: "updatedAt" },
        { id: "note", type: "text-area" },
    ];

    const handleSubmitUpdate = () => {
        if (!selectedOrder || !initialValue || loading) return;

        const validFields: (keyof UpdateOrderDto)[] = ["cod", "mass", "width", "height", "length"];

        const invalidFields = validFields.filter(field => {
            const value = selectedOrder[field as keyof OrderData];
            const numericValue = typeof value === "string" ? parseFloat(value) : value;

            return field === "cod" ? numericValue < 0 : numericValue <= 0;
        });


        if (invalidFields.length > 0) {
            setError(true);
            addDefaultNotification({ message: intl("ErrorUpdate") });
            return;
        }

        const updatedFields: Partial<UpdateOrderDto> = {};
        validFields.forEach(key => {
            const newValue = typeof selectedOrder[key as keyof OrderData] === "string"
                ? parseFloat(selectedOrder[key as keyof OrderData] as unknown as string)
                : selectedOrder[key as keyof OrderData];

            const oldValue = typeof initialValue[key as keyof OrderData] === "string"
                ? parseFloat(initialValue[key as keyof OrderData] as unknown as string)
                : initialValue[key as keyof OrderData];

            if (newValue !== oldValue) {
                updatedFields[key] = newValue;
            }
        });

        if (Object.keys(updatedFields).length === 0) {
            return;
        }

        addSubmitNotification({ message: intl("Confirm"), submitClick: () => handleUpdateOrder(updatedFields) });
    };

    const handleUpdateOrder = async (updateData: Partial<UpdateOrderDto>) => {
        const token = getTokenFromCookie();
        if (!token || !selectedOrder?.id) return;

        setLoading(true);
        const response = await orderOp.updateOrder(selectedOrder.id, updateData, token);
        if (response.success) {
            setInitialValue(selectedOrder);
            setError(false);
            addNotification({ message: intl("Success"), type: "success" });
            reloadData();
        } else {
            addDefaultNotification({ message: response.message || intl("UpdateFail") });
        }

        setLoading(false);
    };

    const fetchInitialData = useCallback(async () => {
        if (!selectedOrder || !selectedOrder.id) {
            return;
        };

        const token = getTokenFromCookie();
        if (!token) return;

        const response = await tasksOp.searchByOrderId(selectedOrder.id, token);

        if (response.success) {
            setTask(response.data as TaskData[]);
        }

        const response2 = await orderOp.getOrderInsurance(selectedOrder.id, token);

        if (response2.success) {
            setInsurance(response.data as Insurance);
        }
    }, [selectedOrder?.id]);

    const renderValue = (id: keyof OrderData) => {
        if (id === "paid" || id === "receiverWillPay") {
            return selectedOrder && selectedOrder[id] ? intl("yes") : intl("no");
        } else if (id === "goodType") {
            return selectedOrder && selectedOrder[id] ? intl(selectedOrder[id]) : "";
        } else if (id === "createdAt" || id === "updatedAt") {
            return selectedOrder && selectedOrder[id] ? new Intl.DateTimeFormat(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric"
            }).format(new Date(selectedOrder[id])).replace(/^\w/, (c) => c.toUpperCase()) : "";
        }
        return selectedOrder ? selectedOrder[id] : "";
    };

    useEffect(() => {
        if (openDetail && selectedOrder && selectedOrder.id) {
            fetchInitialData();
            setInitialValue(selectedOrder);
        }
        else setTask(undefined);
    }, [openDetail, selectedOrder?.id]);

    return (
        <RenderCase condition={openDetail}>
            <DetailPopup
                customWidth="w-full md:w-fit"
                title={intl("Title")}
                onClose={() => setOpenDetail(false)}
                icon={<FaBox className="h-4 w-4" />}
                noPadding
            >
                <div className="relative">
                    <RenderCase condition={openJournies}>
                        <DetailPopup
                            customWidth="w-full md:w-fit"
                            title={intl("journies")}
                            onClose={() => setOpenJournies(false)}
                            icon={<FaBox className="h-4 w-4" />}
                            noPadding
                            className="px-4 pt-2 min-h-20 flex place-items-center"
                        >
                            <JourneyTimeline journey={selectedOrder?.journies} order={true} />
                        </DetailPopup>
                    </RenderCase>
                    <RenderCase condition={openImages}>
                        <DetailPopup
                            customWidth="w-full md:w-fit"
                            title={intl("images")}
                            onClose={() => setOpenImages(false)}
                            icon={<FaBox className="h-4 w-4" />}
                            noPadding
                            className="px-4 pt-2 min-h-20 flex place-items-center"
                        >
                            <ImageList images={selectedOrder?.images??[]} noImage={intl("noImage")}/>
                        </DetailPopup>
                    </RenderCase>
                    <RenderCase condition={openSignatures}>
                        <DetailPopup
                            customWidth="w-full md:w-fit"
                            title={intl("signatures")}
                            onClose={() => setOpenSignatures(false)}
                            icon={<FaBox className="h-4 w-4" />}
                            noPadding
                            className="px-4 pt-2 min-h-20 flex place-items-center"
                        >
                            <JourneyTimeline journey={selectedOrder?.journies} order={true} />
                        </DetailPopup>
                    </RenderCase>

                    <TaskDetail openDetail={openTask} setOpenDetail={setOpenTask} selectedTask={task} reloadData={fetchInitialData} />

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
                            <div className="linear !min-w-10 py-2 !px-2 rounded-md bg-lightContainer dark:!bg-darkContainer border border-red-500 dark:!border-red-500 text-base font-medium transition duration-200 hover:border-red-600
                                    active:border-red-700 text-red-500 dark:text-white dark:hover:border-red-400 dark:active:border-red-300 flex justify-center place-items-center flex-col">
                                    <div className="flex gap-1"><p>{intl("cargoinsurance")}</p> - <p>{intl("hasDeliveryCare")}: {intl(insurance?.hasDeliveryCare ? "true" : "false")}</p></div>
                                    <CustomInputField
                                        id="InsuranceNote"
                                        key="InsuranceNote"
                                        type="text-area"
                                        disabled={true}
                                        value={insurance?.note}
                                        className="w-full"
                                        inputClassName="bg-lightContainer dark:!bg-darkContainerPrimary border border-gray-200 dark:border-white/10 max-h-10"
                                        containerClassName="w-full"
                                        label={intl("note")}
                                    />
                            </div>
                        </div>
                    </CollapsibleSection>

                    <div className="flex flex-col gap-2 px-2 pb-2 md:grid grid-cols-2 md:w-[700px]">
                        {detailFields.map(({ id, type, canUpdate, dropdownPosition, isClearable, options, select_type }: DetailFields) => (
                            <CustomInputField
                                id={id}
                                key={id}
                                type={type ?? "text"}
                                disabled={!canUpdate}
                                dropdownPosition={dropdownPosition}
                                isClearable={isClearable}
                                options={options}
                                select_type={select_type}
                                state={type === "number" && error && (!selectedOrder || !selectedOrder[id]) ? "error" : "none"}
                                setValue={(value: string | string[]) => updateValue(id, value)}
                                value={renderValue(id)}
                                containerClassName={id === "note" || id === "trackingNumber" || id === "goodType" ? "col-span-2" : ""}
                                className="w-full"
                                inputClassName="bg-lightContainer dark:!bg-darkContainerPrimary border border-gray-200 dark:border-white/10"
                                label={
                                    <div className='flex gap-1 place-items-center relative mb-2'>
                                        {intl(id)}
                                    </div>
                                } />
                        ))}
                    </div>
                    <Container className="sticky bottom-0 w-full p-2 !rounded-none flex gap-1.5">
                        <CustomButton
                            version="1"
                            color="error"
                            className="linear !min-w-10 !w-10 !px-0 rounded-md bg-lightContainer dark:!bg-darkContainer border border-red-500 dark:!border-red-500 h-10 text-base font-medium transition duration-200 hover:border-red-600 
                            active:border-red-700 text-red-500 dark:text-white dark:hover:border-red-400 dark:active:border-red-300 flex justify-center place-items-center"
                        >
                            <IoReloadOutline />
                        </CustomButton>
                        <CustomButton
                            onClick={handleSubmitUpdate}
                            version="1"
                            color="error"
                            disabled={loading || !updatePermission}
                            className="linear w-full rounded-md bg-red-500 dark:!bg-red-500 h-10 text-base font-medium text-white transition duration-200 hover:bg-red-600 
                            active:bg-red-700 dark:text-white dark:hover:bg-red-400 dark:active:bg-red-300 flex justify-center place-items-center"
                        >
                            {updatePermission ? (loading ? <LoadingUI /> : intl("update")) : intl("permission")}
                        </CustomButton>
                    </Container>
                </div>
            </DetailPopup>
        </RenderCase>
    );
};

export default DetailContent;