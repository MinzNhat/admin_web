"use client";

import { useCallback, useEffect, useState } from "react";
import { CreateShipmentDto, SearchCriteria } from "@/services/interface";
import { ShipmentOperation } from "@/services/main";
import { getTokenFromCookie } from "@/utils/token";
import { useTranslations } from "next-intl";
import TableSwitcher from "@/components/table";
import { columnsData } from "../variables/columnsData";
import CustomButton from "@/views/customTableButton";
import SearchPopUp, { DetailFields } from "@/views/customTableSearchPopUp";
import UpdateContent from "./updateContent";
import AddContent from "./addContent";
import { useSubmitNotification } from "@/hooks/SubmitNotificationProvider";
import { useNotifications } from "@/hooks/NotificationsProvider";
import { UUID } from "node:crypto";
import OrdersToShipment from "./addOrderToShipmemt";
import RenderCase from "@/components/render";
import DetailPopup from "@/components/popup";
import { FaUserCircle } from "react-icons/fa";

const ShipmentsMain = () => {
    const intl = useTranslations("ShipmentsRoute");
    const shipmentsOp = new ShipmentOperation();
    const TableMessage = useTranslations('Table');
    const [shipments, setShipments] = useState<Shipment[]>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { addSubmitNotification } = useSubmitNotification();
    const { addNotification } = useNotifications();
    const [currentSize, setCurrentSize] = useState<number>(10);
    const [openAdd, setOpenAdd] = useState<boolean>(false);
    const [shipmentInfo, setShipmentInfo] = useState<Shipment>();
    const [openUpdate, setOpenUpdate] = useState<boolean>(false);
    const [sortBy, setSortBy] = useState<{ id: string; desc: boolean }[]>([]);
    const [selectedRows, setSelectedRows] = useState<Shipment[]>([]);
    const [openAddOrders, setOpenAddOrders] = useState(false);
    const [searchCriteriaValue, setSearchCriteriaValue] = useState<SearchCriteria>({
        field: [],
        operator: [],
        value: null
    });
    const [addOrderPopup, setAddOrderPopup] = useState(false);
    const [addOrderMessage, setAddOrderMessage] = useState<string | null> (null);
    const shipmentOperation = new ShipmentOperation();
    const [addInfo, setAddInfo] = useState<CreateShipmentDto>({
        destinationAgencyId: "",
        vehicleId: "",
    });

    const searchFields: Array<DetailFields> = [
        { label: intl("id"), label_value: "id", type: "text" },
        { label: intl("status"), label_value: "status", type: "text" },
    ];

    const renderCell = (cellHeader: string, cellValue: string | number | boolean | any) => {
        if (cellHeader === intl("sourceAgency") || cellHeader === intl("destinationAgency")) {
            return (
                <div className="w-full h-full whitespace-nowrap">
                    {cellValue && cellValue.name ? cellValue.name : TableMessage("DefaultNoDataValue")}
                </div>
            );
        }
    };

        const handleDelete = async () => {
            const token = getTokenFromCookie();
            if (!token) return;
    
            // for (const row of selectedRows) {
            //     const response = await shipmentsOp.delete(row.id as UUID, token);
            //     if (response.success) {
            //         addNotification({ message: `${intl("DeleteSuccess")} ${row.id} ${intl("DeleteSuccess2")}`, type: "success" });
            //     } else {
            //         addNotification({ message: `${intl("DeleteSuccess")} ${row.id} ${intl("DeleteFailed2")}`, type: "error" });
            //     }
            // }
    
            setSearchCriteriaValue(prev => prev);
        }

    const fetchData = useCallback(async () => {
        const token = getTokenFromCookie();

        if (!token) return;

        const rawValue = Array.isArray(searchCriteriaValue.value) ? searchCriteriaValue.value[0] : searchCriteriaValue.value;
        const criteriaField = searchCriteriaValue.field[0];
        const criteriaValue = rawValue === "true" ? true : rawValue === "false" ? false : rawValue;
        const criteria: SearchCriteria | null = rawValue ? {
            field: criteriaField,
            operator: searchCriteriaValue.operator[0] as SearchOperator,
            value: criteriaValue
        } : null;

        const response = await shipmentsOp.search({
            addition: {
                sort: sortBy.map(({ id, desc }) => [id, desc ? "DESC" : "ASC"]),
                page: currentPage,
                size: currentSize,
                group: []
            },
            criteria: criteria ? [criteria] : []
        }, token);

        if (response.success) {
            setShipments(response.data as Shipment[]);
        }
    }, [currentPage, currentSize, sortBy, searchCriteriaValue]);

    const handleAddOrdersToShipment = async (orderIds: string[]) => {
        const token = getTokenFromCookie();
        if(!token) return;
        const response = await shipmentOperation.addOrdersToShipment({orderIds: orderIds, shipmentId: shipmentInfo?.id ?? ""}, token);
        if(response.success) {
            setAddOrderMessage(intl("AddOrderSuccess"));
        } else {
            setAddOrderMessage(intl("AddOrderFailed"));
        }
        setAddOrderPopup(true);
    }

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
            <RenderCase condition={addOrderPopup}>
                <DetailPopup onClose={() => setAddOrderPopup(false)} title={intl("InfoTitle")}
                    customWidth="w-fit"
                    icon={<FaUserCircle className="w-full h-full" />}>
                    <div className="p-2 flex flex-col gap-2">
                        {addOrderMessage}
                    </div>
                </DetailPopup>
            </RenderCase>
            {shipmentInfo && <UpdateContent openUpdate={openUpdate} reloadData={fetchData} setOpenUpdate={setOpenUpdate} setShipmentInfo={setShipmentInfo} shipmentInfo={shipmentInfo} setOpenAddOrders={setOpenAddOrders}/>}
            <AddContent addInfo={addInfo} openAdd={openAdd} setAddInfo={setAddInfo} setOpenAdd={setOpenAdd} reloadData={fetchData} />
            <OrdersToShipment addOrderToShipment={(orderIds: string[]) => {handleAddOrdersToShipment(orderIds); fetchData()}} openOrders={openAddOrders} reloadData={fetchData} setOpenOrders={setOpenAddOrders} />
            <TableSwitcher
                primaryKey="id"
                tableData={shipments}
                isPaginated={true}
                setSortBy={setSortBy}
                renderCell={renderCell}
                currentPage={currentPage}
                currentSize={currentSize}
                fetchPageData={fetchData}
                columnsData={columnsData()}
                selectedRows={selectedRows}
                setCurrentPage={setCurrentPage}
                setSelectedRows={setSelectedRows}
                customButton={<CustomButton fetchData={fetchData} handleDelete={() => addSubmitNotification({ message: intl("Confirm2"), submitClick: handleDelete })} selectedRows={selectedRows} openAdd={() => { setOpenAdd(true) }} extraButton={
                    <SearchPopUp fields={searchFields} searchCriteriaValue={searchCriteriaValue} setSearchCriteriaValue={setSearchCriteriaValue} />
                } />}
                containerClassname="!rounded-xl p-4"
                selectType="multi"
                setPageSize={{
                    setCurrentSize,
                    sizeOptions: [10, 20, 30]
                }}
                customSearch={true}
                onRowClick={(value: Shipment) => {
                    setShipmentInfo(value);
                    setOpenUpdate(true);
                }}
            />
        </>
    );
}

export default ShipmentsMain;