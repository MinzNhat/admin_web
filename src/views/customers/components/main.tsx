"use client";

import { useTranslations } from "next-intl";
import { getTokenFromCookie } from "@/utils/token";
import { CustomerOperation } from "@/services/main";
import { SearchCriteria } from "@/services/interface";
import { useCallback, useEffect, useState } from "react";
import { columnsData } from "../variables/columnsData";
import CustomButton from "@/views/customTableButton";
import TableSwitcher from "@/components/table";
import SearchPopUp, { DetailFields } from "@/views/customTableSearchPopUp";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const CustomerMain = () => {
    const customerOp = new CustomerOperation();
    const intl = useTranslations("StaffInfo");
    const [customers, setCustomers] = useState<Customer[]>();
    const locale = useSelector((state: RootState) => state.language.locale);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentSize, setCurrentSize] = useState<number>(10);
    const [selectedRows, setSelectedRows] = useState<Customer[]>([]);
    const [sortBy, setSortBy] = useState<{ id: string; desc: boolean }[]>([]);
    const [searchCriteriaValue, setSearchCriteriaValue] = useState<SearchCriteria>({
        field: [],
        operator: [],
        value: null
    });

    const renderCell = (cellHeader: string, cellValue: string | number | boolean | any) => {
        if (cellHeader === intl("firstName")) {
            return <div className="w-full h-full whitespace-nowrap">{cellValue}</div>
        } else if (cellHeader === intl("lastName")) {
            return <div className="w-full h-full whitespace-nowrap">{cellValue}</div>
        } else if (cellHeader === intl("createdAt")){
            return cellValue? new Intl.DateTimeFormat(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric"
            }).format(new Date(cellValue)).replace(/^\w/, (c) => c.toUpperCase()) : "";
        } else if (cellHeader === intl("id")) {
            return <div className="w-full h-full whitespace-nowrap">{cellValue}</div>
        } else if (cellHeader === intl("user")) {
            return <div className="w-full h-full whitespace-nowrap">{cellValue.active?intl("active"):intl("inactive")}</div>
        }
    };

    const searchFields: Array<DetailFields> = [
        { label: intl("id"), label_value: "id", type: "text" },
        { label: intl("firstName"), label_value: "firstName", type: "text" },
        { label: intl("lastName"), label_value: "lastName", type: "text" },
        { label: intl("phoneNumber"), label_value: "phoneNumber", type: "text" },
        { label: intl("email"), label_value: "email", type: "text" },
    ];

    const fetchData = useCallback(async () => {
        const token = getTokenFromCookie();
        setCustomers(undefined);
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

        const response = await customerOp.searchCustomer({
            addition: {
                sort: sortBy.map(({ id, desc }) => [id, desc ? "DESC" : "ASC"]),
                page: currentPage,
                size: currentSize,
                group: []
            },
            criteria: criteria ? [criteria] : []
        }, token);

        if (response.success) {
            setCustomers(response.data as Customer[]);
        } else if (response.message === "Người dùng không được phép truy cập tài nguyên này") {
            // addNotification({message: intl("NoPermission"), type: "error"});
            setCustomers([]);
        }
    }, [currentPage, currentSize, sortBy, searchCriteriaValue]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
            <TableSwitcher
                primaryKey="id"
                tableData={customers}
                isPaginated={true}
                renderCell={renderCell}
                setSortBy={setSortBy}
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
            />
        </>
    );
}

export default CustomerMain;