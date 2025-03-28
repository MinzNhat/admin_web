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

const CustomerMain = () => {
    const customerOp = new CustomerOperation();
    const intl = useTranslations("StaffInfo");
    const [customers, setCustomers] = useState<Customer[]>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentSize, setCurrentSize] = useState<number>(10);
    const [selectedRows, setSelectedRows] = useState<Customer[]>([]);
    const [sortBy, setSortBy] = useState<{ id: string; desc: boolean }[]>([]);
    const [searchCriteriaValue, setSearchCriteriaValue] = useState<SearchCriteria>({
        field: [],
        operator: [],
        value: null
    });

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