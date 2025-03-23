"use client";

import { useCallback, useEffect, useState } from "react";
import { SearchCriteria } from "@/services/interface";
import { ShipmentOperation } from "@/services/main";
import { getTokenFromCookie } from "@/utils/token";
import { useTranslations } from "next-intl";
import TableSwitcher from "@/components/table";
import { columnsData } from "../variables/columnsData";
import CustomButton from "@/views/customTableButton";
import SearchPopUp, { DetailFields } from "@/views/customTableSearchPopUp";
import UpdateContent from "./updateContent";

const ShipmentsMain = () => {
    const intl = useTranslations("ShipmentsRoute");
    const shipmentsOp = new ShipmentOperation();
    const TableMessage = useTranslations('Table');
    const [shipments, setShipments] = useState<Shipment[]>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentSize, setCurrentSize] = useState<number>(10);
    const [shipmentInfo, setShipmentInfo] = useState<Shipment>();
    const [openUpdate, setOpenUpdate] = useState<boolean>(false);
    const [sortBy, setSortBy] = useState<{ id: string; desc: boolean }[]>([]);
    const [selectedRows, setSelectedRows] = useState<Shipment[]>([]);
    const [searchCriteriaValue, setSearchCriteriaValue] = useState<SearchCriteria>({
        field: [],
        operator: [],
        value: null
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

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
            {shipmentInfo && <UpdateContent openUpdate={openUpdate} reloadData={fetchData} setOpenUpdate={setOpenUpdate} setShipmentInfo={setShipmentInfo} shipmentInfo={shipmentInfo} />}
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
                customButton={<CustomButton fetchData={fetchData} selectedRows={selectedRows} extraButton={
                    <SearchPopUp fields={searchFields} searchCriteriaValue={searchCriteriaValue} setSearchCriteriaValue={setSearchCriteriaValue} />
                } />}
                containerClassname="!rounded-xl p-4"
                selectType="none"
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