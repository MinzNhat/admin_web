"use client";

import { RootState } from "@/store";
import { FaBox } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import DetailPopup from "@/components/popup";
import RenderCase from "@/components/render";
import CustomInputField from "@/components/input";
import { OrderData } from "@/types/views/orders/orders-config";

type DetailFields = {
    id: keyof OrderData,
    type?: InputTypes,
}

type Props = {
    openDetail: boolean;
    setOpenDetail: React.Dispatch<React.SetStateAction<boolean>>;
    selectedOrder?: OrderData;
}

const DetailContent = ({ openDetail, setOpenDetail, selectedOrder }: Props) => {
    const intl = useTranslations("OrdersRoute");
    const locale = useSelector((state: RootState) => state.language.locale);

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
        { id: "mass" },
        { id: "width" },
        { id: "height" },
        { id: "length" },
        { id: "cod" },
        { id: "fee" },
        { id: "paid" },
        { id: "receiverWillPay" },
        { id: "createdAt" },
        { id: "updatedAt" },
        { id: "note", type: "text-area" },
    ];

    const renderValue = (id: keyof OrderData) => {
        if (id === "paid" || id === "receiverWillPay") {
            return selectedOrder && selectedOrder[id] ? intl("yes") : intl("no");
        } else if (id === "statusCode" || id === "goodType") {
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
                    <div className="flex flex-col gap-2 px-2 pb-2 md:grid grid-cols-2 md:w-[700px]">
                        {detailFields.map(({ id, type }: DetailFields) => (
                            <CustomInputField
                                id={id}
                                key={id}
                                type={type ?? "text"}
                                disabled
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
                </div>
            </DetailPopup>
        </RenderCase>
    );
};

export default DetailContent;