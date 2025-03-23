"use client";

import CustomButton from "@/components/button";
import DetailPopup from "@/components/popup";
import RenderCase from "@/components/render";
import { ShipmentOperation } from "@/services/main";
import { OrderData } from "@/types/views/orders/orders-config";
import { getTokenFromCookie } from "@/utils/token";
import { UUID } from "crypto";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { FaShippingFast } from "react-icons/fa";
import CustomButton2 from "@/views/customTableButton";
import TableSwitcher from "@/components/table";
import { columnsData } from "../variables/columnsData2";

type UpdateFields = {
    id: keyof Shipment,
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
    openUpdate: boolean;
    setOpenUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    shipmentInfo: Shipment;
    setShipmentInfo: React.Dispatch<React.SetStateAction<Shipment | undefined>>;
    reloadData: () => void;
}

const UpdateContent = ({ openUpdate, setOpenUpdate, shipmentInfo, setShipmentInfo, reloadData }: Props) => {
    const intl = useTranslations("ShipmentsRoute");
    const shipmentsOp = new ShipmentOperation();
    const [openOrders, setOpenOrders] = useState<boolean>(false);
    const [orders, setOrders] = useState<OrderData[]>();
    const [selectedRows, setSelectedRows] = useState<OrderData[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentSize, setCurrentSize] = useState<number>(10);

    const fetchData = useCallback(async () => {
        const token = getTokenFromCookie();
        setOrders(undefined);
        setSelectedRows([]);

        if (!token) return;

        const response = await shipmentsOp.getOrdersFromShipment(shipmentInfo.id as UUID, token);
        if (response.success) {
            setOrders(response.data as OrderData[]);
        }
    }, [currentPage, currentSize, shipmentInfo.id]);

    const renderCell = (cellHeader: string, cellValue: string | number | boolean, rowValue: OrderData) => {
        if (cellHeader === intl("statusCode")) {
            return <div className="w-full h-full whitespace-nowrap">{intl(cellValue)}</div>
        } else if (cellHeader === intl("serviceType")) {
            return <div className="w-full h-full text-center">{rowValue.serviceType}</div>
        } else if (cellHeader === intl("detailSource")) {
            return <div className="w-full h-full line-clamp-4">{`${rowValue.detailSource}, ${rowValue.wardSource}, ${rowValue.districtSource}, ${rowValue.provinceSource}`}</div>
        } else if (cellHeader === intl("detailDest")) {
            return <div className="w-full h-full line-clamp-4">{`${rowValue.detailDest}, ${rowValue.wardDest}, ${rowValue.districtDest}, ${rowValue.provinceDest}`}</div>
        } else if (cellHeader === intl("trackingNumber")) {
            return <div className="w-full h-full pl-2">{rowValue.trackingNumber}</div>
        }
    };

    const renderHeader = (cellHeader: string): string => {
        if (cellHeader === intl("statusCode")) {
            return "!text-end !pr-2"
        } else if (cellHeader === intl("trackingNumber")) {
            return "!pl-2"
        }
        return "";
    }

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <RenderCase condition={openUpdate}>
            <DetailPopup
                customWidth="w-full md:w-fit"
                title={intl("Title")}
                onClose={() => setOpenUpdate(false)}
                icon={<FaShippingFast className="w-full h-full" />}
                noPadding
            >
                <RenderCase condition={openOrders}>
                    <DetailPopup
                        customWidth="w-full md:w-fit"
                        title={intl("OrdersList")}
                        onClose={() => setOpenOrders(false)}
                        icon={<FaShippingFast className="w-full h-full" />}
                        noPadding
                    >
                        <div className="relative flex flex-col gap-2 p-2">
                            <TableSwitcher
                                primaryKey="id"
                                tableData={orders}
                                isPaginated={true}
                                renderCell={renderCell}
                                currentPage={currentPage}
                                currentSize={currentSize}
                                fetchPageData={fetchData}
                                fetchSearchSortData={true}
                                columnsData={columnsData()}
                                renderHeader={renderHeader}
                                selectedRows={selectedRows}
                                setCurrentPage={setCurrentPage}
                                setSelectedRows={setSelectedRows}
                                customButton={
                                    <CustomButton2 fetchData={fetchData} selectedRows={selectedRows} />
                                }
                                containerClassname="!rounded-xl p-4"
                                selectType="none"
                                setPageSize={{
                                    setCurrentSize,
                                    sizeOptions: [10, 20, 30]
                                }}
                            />
                        </div>
                    </DetailPopup>
                </RenderCase>
                <div className="relative flex flex-col gap-2 p-2">
                    <CustomButton
                        key="orderlist"
                        version="1"
                        color="error"
                        onClick={() => setOpenOrders(true)}
                        className="linear !min-w-10 !px-0 rounded-md bg-lightContainer dark:!bg-darkContainer border border-red-500 dark:!border-red-500 h-10 text-base font-medium transition duration-200 hover:border-red-600
                                    active:border-red-700 text-red-500 dark:text-white dark:hover:border-red-400 dark:active:border-red-300 flex justify-center place-items-center"
                    >
                        {intl("OrdersList")}
                    </CustomButton>
                </div>
            </DetailPopup>
        </RenderCase>
    );
};

export default UpdateContent;