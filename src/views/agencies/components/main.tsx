"use client";

import AddAgencyContent from "./addContent";
import { useTranslations } from "next-intl";
import TableSwitcher from "@/components/table";
import { AgencyOperation } from "@/services/main";
import { getTokenFromCookie } from "@/utils/token";
import CustomButton from "@/views/customTableButton";
import { columnsData } from "../variables/columnsData";
import { useCallback, useEffect, useState } from "react";
import { AgencyType, CreateAgencyDto, CreateAgencyManager, CreateCompanyDto } from "@/services/interface";

const AgenciesMain = () => {
    const agencyOp = new AgencyOperation();
    const intl = useTranslations("AgenciesRoute");
    const TableMessage = useTranslations('Table');
    const [openAdd, setOpenAdd] = useState<boolean>(false);
    const [agencies, setAgencies] = useState<AgencyInfo[]>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentSize, setCurrentSize] = useState<number>(10);
    const [selectedRows, setSelectedRows] = useState<AgencyInfo[]>([]);
    const [addInfo, setAddInfo] = useState<CreateAgencyManager>({
        fullname: "", cccd: "", phoneNumber: "", email: "", province: "", district: "", town: "", detailAddress: "", birthDate: "", bin: "", bank: "", salary: 0, position: ""
    });
    const [addInfo3, setAddInfo3] = useState<CreateCompanyDto>({ taxCode: "", name: "" });
    const [addInfo2, setAddInfo2] = useState<CreateAgencyDto>({
        agencyId: "", name: "", phoneNumber: "", email: "", bin: "", province: "", district: "", town: "", detailAddress: "", latitude: 0, longitude: 0, commissionRate: 0, bank: "",
        company: addInfo3, isIndividual: [false], level: 1, managedWards: [], postalCode: "", revenue: 0, type: [AgencyType["DL"]],
        manager: addInfo,
    });

    const renderCell = (cellHeader: string, _cellValue: string | boolean | number, rowValue: AgencyInfo) => {
        if (cellHeader === intl("detailAddress")) {
            return (
                <div className="w-full h-full line-clamp-4">
                    {`${rowValue.detailAddress}, ${rowValue.town}, ${rowValue.district}, ${rowValue.province}`}
                </div>
            );
        } else if (cellHeader === intl("manager")) {
            return (
                <div className="w-full h-full">
                    {rowValue.manager.fullname}
                </div>
            );
        }
    };

    const reloadData = useCallback(async () => {
        const token = getTokenFromCookie();
        setAgencies(undefined);
        if (token) {
            const response = await agencyOp.search({
                addition: {
                    sort: [],
                    page: currentPage,
                    size: currentSize,
                    group: []
                },
                criteria: []
            }, token)
            console.log(response)
            if (response.success) {
                setAgencies(response.data as AgencyInfo[])
            }
        }
    }, [currentPage, currentSize]);

    useEffect(() => {
        reloadData();
    }, []);

    return (
        <>
            <AddAgencyContent addInfo={addInfo} openAdd={openAdd} setAddInfo={setAddInfo} addInfo2={addInfo2} setAddInfo2={setAddInfo2} setOpenAdd={setOpenAdd} reloadData={reloadData} addInfo3={addInfo3} setAddInfo3={setAddInfo3} />
            <TableSwitcher
                primaryKey="id"
                tableData={agencies}
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

export default AgenciesMain;