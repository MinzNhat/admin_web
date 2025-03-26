"use client";

import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import TableSwitcher from "@/components/table";
import { getTokenFromCookie } from "@/utils/token";
import { VoucherOperation } from "@/services/main";
import CustomButton from "@/views/customTableButton";
import { SearchCriteria } from "@/services/interface";
import { columnsData } from "../variables/columnsData";
import { useCallback, useEffect, useState } from "react";
import SearchPopUp, { DetailFields } from "@/views/customTableSearchPopUp";
import AddContent from "./addContent";
import { useSubmitNotification } from "@/hooks/SubmitNotificationProvider";
import { useNotifications } from "@/hooks/NotificationsProvider";

const VouchersMain = () => {
    const intl = useTranslations("VouchersRoute");
    const vouchersOp = new VoucherOperation();
    const [vouchers, setVouchers] = useState<VoucherData[]>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { addSubmitNotification } = useSubmitNotification();
    const { addNotification } = useNotifications();
    const [currentSize, setCurrentSize] = useState<number>(10);
    const [selectedRows, setSelectedRows] = useState<VoucherData[]>([]);
    const locale = useSelector((state: RootState) => state.language.locale);
    const [sortBy, setSortBy] = useState<{ id: string; desc: boolean }[]>([]);
    const [searchCriteriaValue, setSearchCriteriaValue] = useState<SearchCriteria>({
        field: [],
        operator: [],
        value: null
    });
    const [openAddVoucher, setOpenAddVoucher] = useState(false);

    const searchFields: Array<DetailFields> = [
        { label: intl("discount"), label_value: "discount", type: "text" },
        { label: intl("customerId"), label_value: "customerId", type: "text" },
    ];

    const renderCell = (cellHeader: string, cellValue: string | number | boolean | any) => {
        if (cellHeader === intl("customer")) {
            return <div className="w-full h-full whitespace-nowrap">{`${cellValue.firstName} ${cellValue.lastName}`}</div>
        } else if (cellHeader === intl("expiration")){
            return cellValue? new Intl.DateTimeFormat(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric"
            }).format(new Date(cellValue)).replace(/^\w/, (c) => c.toUpperCase()) : "";
        }
    };

    const fetchData = useCallback(async () => {
        const token = getTokenFromCookie();
        setVouchers(undefined);
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

        const response = await vouchersOp.search({
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
            setVouchers(response.data as VoucherData[]);
        };
    }, [currentPage, currentSize, sortBy, searchCriteriaValue]);

    const handleDelete = async () => {
        const token = getTokenFromCookie();
        if (!token) return;
        for(const row of selectedRows) {
            const response = await vouchersOp.delete(row.id, token);
        }
        addNotification({
            message: intl("Success"),
            type: "success"
        });
    }

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
            <AddContent openAdd={openAddVoucher} setOpenAdd={setOpenAddVoucher}/>
            <TableSwitcher
                sortBy={sortBy}
                primaryKey="id"
                tableData={vouchers}
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
                    openAdd={() => setOpenAddVoucher(true)}
                    handleDelete={() => {addSubmitNotification({ message: intl("LogoutMessage"), submitClick:  handleDelete})}}
                    extraButton={
                        <SearchPopUp fields={searchFields} searchCriteriaValue={searchCriteriaValue} setSearchCriteriaValue={setSearchCriteriaValue}  />
                    }
                    />
                }
                containerClassname="!rounded-xl p-4"
                selectType="multi"
                setPageSize={{
                    setCurrentSize,
                    sizeOptions: [10, 20, 30]
                }}
                // onRowClick={onRowClick}
            />
        </>
    );
}

export default VouchersMain;