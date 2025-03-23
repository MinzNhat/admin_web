"use client";

import AddContent from "./addContent";
import { useTranslations } from "next-intl";
import UpdateContent from "./updateContent";
import TableSwitcher from "@/components/table";
import { StaffOperation } from "@/services/main";
import { getTokenFromCookie } from "@/utils/token";
import CustomButton from "@/views/customTableButton";
import { columnsData } from "../variables/columnsData";
import { useCallback, useEffect, useState } from "react";
import SearchPopUp, { DetailFields } from "@/views/customTableSearchPopUp";
import { RoleValue, StaffInfo, StaffInfoUpdate } from "@/types/store/auth-config";
import { CreateStaffDto, SearchCriteria, ShipperType, StaffRole } from "@/services/interface";

const StaffsMain = () => {
    const staffOp = new StaffOperation();
    const intl = useTranslations("StaffInfo");
    const TableMessage = useTranslations('Table');
    const [staffs, setStaffs] = useState<StaffInfo[]>();
    const [openAdd, setOpenAdd] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentSize, setCurrentSize] = useState<number>(10);
    const [openUpdate, setOpenUpdate] = useState<boolean>(false);
    const [staffInfo, setStaffInfo] = useState<StaffInfoUpdate>();
    const [selectedRows, setSelectedRows] = useState<StaffInfo[]>([]);
    const [sortBy, setSortBy] = useState<{ id: string; desc: boolean }[]>([]);
    const [searchCriteriaValue, setSearchCriteriaValue] = useState<SearchCriteria>({
        field: [],
        operator: [],
        value: null
    });

    const roleOptions: SelectInputOptionFormat[] = Object.values(StaffRole).map(type => ({
        label: intl(type),
        value: type
    }));

    const searchFields: Array<DetailFields> = [
        { label: intl("staffId"), label_value: "staffId", type: "text" },
        { label: intl("agencyId"), label_value: "agencyId", type: "text" },
        { label: intl("fullname"), label_value: "fullname", type: "text" },
        { label: intl("phoneNumber"), label_value: "phoneNumber", type: "text" },
        { label: intl("email"), label_value: "email", type: "text" },
        { label: intl("cccd"), label_value: "cccd", type: "text", hideOperator: true },
        { label: intl("roles"), label_value: "roles", type: "select", options: roleOptions, select_type: "single", dropdownPosition: "top", hideOperator: true },
    ];

    const [addInfo, setAddInfo] = useState<CreateStaffDto>({
        agencyId: "",
        fullname: "",
        phoneNumber: "",
        email: "",
        cccd: "",
        province: "",
        district: "",
        town: "",
        detailAddress: "",
        birthDate: "",
        bin: "",
        bank: "",
        deposit: 0,
        salary: 0,
        roles: [StaffRole["SHIPPER"]],
        managedWards: [],
        shipperType: [ShipperType["LT"]]
    });

    const renderCell = (cellHeader: string, cellValue: string | number | boolean | unknown) => {
        if (cellHeader === intl("roles")) {
            return (
                <div className="w-full h-full whitespace-nowrap">
                    {Array.isArray(cellValue) && cellValue.length !== 0
                        ? cellValue
                            .map((role) => `${intl((role as RoleValue).value)}`)
                            .join(", ")
                        : TableMessage("DefaultNoDataValue")}
                </div>
            );
        }

        if (cellHeader === intl("fullname")) {
            return (
                <div className="w-full h-full whitespace-nowrap">
                    {cellValue as string}
                </div>
            );
        }
    };


    const fetchData = useCallback(async () => {
        const token = getTokenFromCookie();
        setStaffs(undefined);
        setSelectedRows([]);

        if (!token) return;

        const rawValue = Array.isArray(searchCriteriaValue.value) ? searchCriteriaValue.value[0] : searchCriteriaValue.value;
        const criteriaField = searchCriteriaValue.field[0];
        const criteriaValue = rawValue === "true" ? true : rawValue === "false" ? false : rawValue;

        let response;

        if (criteriaField === "cccd") {
            response = await staffOp.searchByCccd(criteriaValue as string, token);
        } else if (criteriaField === "roles") {
            response = await staffOp.searchByRole(criteriaValue as string, token);
        } else {
            const criteria: SearchCriteria | null = rawValue ? {
                field: criteriaField,
                operator: searchCriteriaValue.operator[0] as SearchOperator,
                value: criteriaValue
            } : null;

            response = await staffOp.search({
                addition: {
                    sort: sortBy.map(({ id, desc }) => [id, desc ? "DESC" : "ASC"]),
                    page: currentPage,
                    size: currentSize,
                    group: []
                },
                criteria: criteria ? [criteria] : []
            }, token);
        }

        console.log(response);

        if (response.success) {
            setStaffs(response.data as StaffInfo[]);
        }
    }, [currentPage, currentSize, sortBy, searchCriteriaValue]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
            {staffInfo && <UpdateContent openUpdate={openUpdate} reloadData={fetchData} setOpenUpdate={setOpenUpdate} setStaffInfo={setStaffInfo} staffInfo={staffInfo} />}
            <AddContent addInfo={addInfo} openAdd={openAdd} setAddInfo={setAddInfo} setOpenAdd={setOpenAdd} reloadData={fetchData} />
            <TableSwitcher
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
                onRowClick={(value: StaffInfo) => {
                    const updatedStaffInfo: StaffInfoUpdate = {
                        ...value,
                        roles: value.roles.map(role => role.value)
                    };
                    setStaffInfo(updatedStaffInfo);
                    setOpenUpdate(true);
                }}
            />
        </>
    );
}

export default StaffsMain;