"use client";

import AddContent from "./addContent";
import { useTranslations } from "next-intl";
import TableSwitcher from "@/components/table";
import { StaffOperation } from "@/services/main";
import { getTokenFromCookie } from "@/utils/token";
import CustomButton from "@/views/customTableButton";
import { columnsData } from "../variables/columnsData";
import { useCallback, useEffect, useState } from "react";
import { CreateStaffDto, StaffRole } from "@/services/interface";

const StaffsMain = () => {
    const staffOp = new StaffOperation();
    const intl = useTranslations("StaffInfo");
    const TableMessage = useTranslations('Table');
    const [staffs, setStaffs] = useState<StaffInfo[]>();
    const [openAdd, setOpenAdd] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentSize, setCurrentSize] = useState<number>(10);
    const [selectedRows, setSelectedRows] = useState<StaffInfo[]>([]);
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
        managedWards: []
    });

    const renderCell = (cellHeader: string, cellValue: string | number | boolean | unknown) => {
        if (cellHeader === intl("roles")) {
            return (
                <div className="w-full h-full ">
                    {Array.isArray(cellValue) && cellValue.length !== 0 ? cellValue.map((role) => (role as Role).value).join(", ") : TableMessage("DefaultNoDataValue")}
                </div>
            );
        }
    };

    const reloadData = useCallback(async () => {
        const token = getTokenFromCookie();
        setStaffs(undefined);
        if (token) {
            const response = await staffOp.search({
                addition: {
                    sort: [],
                    page: currentPage,
                    size: currentSize,
                    group: []
                },
                criteria: []
            }, token)
            if (response.success) {
                setStaffs(response.data as StaffInfo[])
            }
        }
    }, [currentPage, currentSize]);

    useEffect(() => {
        reloadData();
    }, []);

    return (
        <>
            <AddContent addInfo={addInfo} openAdd={openAdd} setAddInfo={setAddInfo} setOpenAdd={setOpenAdd} reloadData={reloadData} />
            <TableSwitcher
                primaryKey="id"
                tableData={staffs}
                isPaginated={true}
                renderCell={renderCell}
                currentPage={currentPage}
                currentSize={currentSize}
                fetchPageData={reloadData}
                columnsData={columnsData()}
                selectedRows={selectedRows}
                setCurrentPage={setCurrentPage}
                setSelectedRows={setSelectedRows}
                customButton={<CustomButton fetchData={reloadData} handleDelete={() => { }} selectedRows={selectedRows} openAdd={() => { setOpenAdd(true) }} />}
                containerClassname="!rounded-xl p-4"
                selectType="multi"
                setPageSize={{
                    setCurrentSize,
                    sizeOptions: [10, 20, 30]
                }}
            />
        </>
    );
}

export default StaffsMain;