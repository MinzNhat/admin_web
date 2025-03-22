"use client";

import { useTranslations } from "next-intl";
import TableSwitcher from "@/components/table";
import { getTokenFromCookie } from "@/utils/token";
import CustomButton from "@/views/customTableButton";
import { SearchCriteria } from "@/services/interface";
import { ShippingBillOperation } from "@/services/main";
import { useCallback, useEffect, useState } from "react";
import { columnsData } from "../variables/columnsData";
import SearchPopUp, { DetailFields } from "@/views/customTableSearchPopUp";


const ShippingBillsMain = () => {
    const intl = useTranslations("ShippingBillsRoute");
    const shippingBillsOp = new ShippingBillOperation();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentSize, setCurrentSize] = useState<number>(10);
    const [shippingBills, setShippingBills] = useState<ShippingBillData[]>();
    const [sortBy, setSortBy] = useState<{ id: string; desc: boolean }[]>([]);
    const [selectedRows, setSelectedRows] = useState<ShippingBillData[]>([]);
    const [searchCriteriaValue, setSearchCriteriaValue] = useState<SearchCriteria>({
        field: [],
        operator: [],
        value: null
    });

    const searchFields: Array<DetailFields> = [
        { label: intl("companyName"), label_value: "companyName", type: "text" },
        { label: intl("customerId"), label_value: "customerId", type: "text" },
        { label: intl("taxCode"), label_value: "taxCode", type: "text" },
    ];

    const renderCell = (cellHeader: string, cellValue: string | number | boolean | any) => {
        if (cellHeader === intl("customer")) {
            return <div className="w-full h-full whitespace-nowrap">{`${cellValue.firstName} ${cellValue.lastName}`}</div>
        }
    };

    const fetchData = useCallback(async () => {
        const token = getTokenFromCookie();
        setShippingBills(undefined);
        setSelectedRows([]);

        if (!token) return;

        const rawValue = Array.isArray(searchCriteriaValue.value) ? searchCriteriaValue.value[0] : searchCriteriaValue.value;
        const criteriaField = searchCriteriaValue.field[0];
        const criteriaValue = rawValue === "true" ? true : rawValue === "false" ? false : rawValue;

        const criteria: SearchCriteria | null = rawValue ? {
            field: criteriaField,
            operator: searchCriteriaValue.operator[0] as SearchOperator,
            value: criteriaValue
        } : null;

        const response = await shippingBillsOp.search({
            addition: {
                sort: sortBy.map(({ id, desc }) => [id, desc ? "DESC" : "ASC"]),
                page: currentPage,
                size: currentSize,
                group: []
            },
            criteria: criteria ? [criteria] : []
        }, token);
        console.log(response);

        if (response.success) {
            setShippingBills(response.data as ShippingBillData[]);
        };
    }, [currentPage, currentSize, sortBy, searchCriteriaValue]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
            <TableSwitcher
                sortBy={sortBy}
                primaryKey="id"
                tableData={shippingBills}
                isPaginated={true}
                setSortBy={setSortBy}
                renderCell={renderCell}
                currentPage={currentPage}
                currentSize={currentSize}
                fetchPageData={fetchData}
                fetchSearchSortData={true}
                columnsData={columnsData()}
                selectedRows={selectedRows}
                setCurrentPage={setCurrentPage}
                setSelectedRows={setSelectedRows}
                customSearch={true}
                customButton={
                    <CustomButton fetchData={fetchData} selectedRows={selectedRows}
                    extraButton={
                        <SearchPopUp fields={searchFields} searchCriteriaValue={searchCriteriaValue} setSearchCriteriaValue={setSearchCriteriaValue} />
                    }
                    />
                }
                containerClassname="!rounded-xl p-4"
                selectType="none"
                setPageSize={{
                    setCurrentSize,
                    sizeOptions: [10, 20, 30]
                }}
                // onRowClick={onRowClick}
            />
        </>
    );
}

export default ShippingBillsMain;