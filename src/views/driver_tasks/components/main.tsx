"use client";

import { useCallback, useEffect, useState } from "react";
import { DriverTaskOperation } from "@/services/main";
import { SearchCriteria } from "@/services/interface";
import { getTokenFromCookie } from "@/utils/token";

const TasksMain = () => {
    const driverOp = new DriverTaskOperation();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentSize, setCurrentSize] = useState<number>(10);
    const [selectedRows, setSelectedRows] = useState<any[]>([]);
    const [sortBy, setSortBy] = useState<{ id: string; desc: boolean }[]>([]);
    const [searchCriteriaValue, setSearchCriteriaValue] = useState<SearchCriteria>({field: [],
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

        const response = await driverOp.searchTasks({
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
        </>
    );
}

export default TasksMain;