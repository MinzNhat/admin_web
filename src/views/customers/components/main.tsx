"use client";

import { useTranslations } from "next-intl";
import { getTokenFromCookie } from "@/utils/token";
import { CustomerOperation } from "@/services/main";
import { SearchCriteria } from "@/services/interface";
import { useCallback, useEffect, useState } from "react";

const CustomerMain = () => {
    const customerOp = new CustomerOperation();
    const intl = useTranslations("CustomersRoute");
        // const [staffs, setStaffs] = useState<Customer[]>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentSize, setCurrentSize] = useState<number>(10);
    const [selectedRows, setSelectedRows] = useState<StaffInfo[]>([]);
    const [sortBy, setSortBy] = useState<{ id: string; desc: boolean }[]>([]);
    const [searchCriteriaValue, setSearchCriteriaValue] = useState<SearchCriteria>({
        field: [],
        operator: [],
        value: null
    });

    const fetchData = useCallback(async () => {
            const token = getTokenFromCookie();
            // setStaffs(undefined);
            setSelectedRows([]);
    
            if (!token) return;
    
            const rawValue = Array.isArray(searchCriteriaValue.value) ? searchCriteriaValue.value[0] : searchCriteriaValue.value;
            const criteriaField = searchCriteriaValue.field[0];
            const criteriaValue = rawValue === "true" ? true : rawValue === "false" ? false : rawValue;
    
            const response = await customerOp.searchCustomer({
                addition: {
                    sort: sortBy.map(({ id, desc }) => [id, desc ? "DESC" : "ASC"]),
                    page: currentPage,
                    size: currentSize,
                    group: []
                },
                criteria: []
            }, token);
            console.log(response)
            // if (response.success) {
            //     setStaffs(response.data as StaffInfo[]);
            // }
        }, [currentPage, currentSize, sortBy, searchCriteriaValue]);
    
        useEffect(() => {
            fetchData();
        }, [fetchData]);

    return (
        <>
            {/* <TableSwitcher
                primaryKey="id"
                tableData={staffs}
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
                customButton={<CustomButton fetchData={fetchData} selectedRows={selectedRows} openAdd={() => { setOpenAdd(true) }}
                    extraButton={
                        <SearchPopUp fields={searchFields} searchCriteriaValue={searchCriteriaValue} setSearchCriteriaValue={setSearchCriteriaValue} />
                    } />}
                containerClassname="!rounded-xl p-4"
                selectType="none"
                setPageSize={{
                    setCurrentSize,
                    sizeOptions: [10, 20, 30]
                }}
                customSearch={true}
            /> */}
        </>
    );
}

export default CustomerMain;