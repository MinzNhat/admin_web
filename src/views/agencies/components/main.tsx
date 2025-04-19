"use client";

import { UUID } from "crypto";
import AddAgencyContent from "./addContent";
import { useTranslations } from "next-intl";
import TableSwitcher from "@/components/table";
import { AgencyOperation } from "@/services/main";
import { getTokenFromCookie } from "@/utils/token";
import CustomButton from "@/views/customTableButton";
import { columnsData } from "../variables/columnsData";
import { useCallback, useEffect, useState } from "react";
import { useNotifications } from "@/hooks/NotificationsProvider";
import SearchPopUp, { DetailFields } from "@/views/customTableSearchPopUp";
import { AgencyType, CreateAgencyDto, CreateAgencyManager, CreateCompanyDto, SearchCriteria, StaffRole } from "@/services/interface";
import { useSubmitNotification } from "@/hooks/SubmitNotificationProvider";
import { HiOutlineMagnifyingGlassCircle } from "react-icons/hi2";
import { Button } from "@nextui-org/react";
import FileOpen from "./fileOpen";
import { IoPersonCircleOutline, IoRepeat } from "react-icons/io5";
import { StaffInfo, StaffInfoUpdate } from "@/types/store/auth-config";
import UpdateContent from "@/views/shipper_tasks/components/addContent";
import UpdateContentAgency from "./updateContent";

const AgenciesMain = () => {
    const agencyOp = new AgencyOperation();
    const intl = useTranslations("AgenciesRoute");
    const { addNotification } = useNotifications();
    const [openAdd, setOpenAdd] = useState<boolean>(false);
    const [agencies, setAgencies] = useState<AgencyInfo[]>();
    const { addSubmitNotification } = useSubmitNotification();
    const [staffInfo, setStaffInfo] = useState<StaffInfoUpdate>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [openDetail, setOpenDetail] = useState(false);
    const [selectedAgency, setSelectedAgency] = useState<AgencyInfo | null>(null);
    const [openAgencyDetail, setOpenAgencyDetail] = useState(false);
    const [openUpdateStaff, setOpenUpdateStaff] = useState<boolean>(false);
    const [currentSize, setCurrentSize] = useState<number>(10);
    const [selectedRows, setSelectedRows] = useState<AgencyInfo[]>([]);
    const [addInfo, setAddInfo] = useState<CreateAgencyManager>({
        fullname: "", cccd: "", phoneNumber: "", email: "", province: "", district: "", town: "", detailAddress: "", birthDate: "", bin: "", bank: "", salary: 0,
    });
    const [isAgency, setIsAgency] = useState(true);
    const [addInfo3, setAddInfo3] = useState<CreateCompanyDto>({ taxcode: "", name: "" });
    const [addInfo2, setAddInfo2] = useState<CreateAgencyDto>({
        agencyId: "", name: "", phoneNumber: "", email: "", bin: "", province: "", district: "", town: "", detailAddress: "", latitude: 0, longitude: 0, commissionRate: 0, bank: "",
        company: addInfo3, isIndividual: [false], level: 1, managedWards: [], postalCode: "", revenue: 0, type: [AgencyType["DL"]],
        manager: addInfo,
    });
    const [sortBy, setSortBy] = useState<{ id: string; desc: boolean }[]>([]);
    const [searchCriteriaValue, setSearchCriteriaValue] = useState<SearchCriteria>({
        field: [],
        operator: [],
        value: null
    });

    const searchFields: Array<DetailFields> = [
        { label: intl("id"), label_value: "id", type: "text" },
        { label: intl("name"), label_value: "name", type: "text" },
        { label: intl("manager"), label_value: "manager", type: "text" },
        { label: intl("postalCode"), label_value: "postalCode", type: "text" },
        { label: intl("email"), label_value: "email", type: "text" },
        { label: intl("phoneNumber"), label_value: "phoneNumber", type: "text" },
    ];

    const openStaff = (value: StaffInfo) => {
        const updatedStaffInfo: StaffInfoUpdate = {
            ...value,
            roles: value.roles?.map(role => role.value)
        };
        setStaffInfo(updatedStaffInfo);
        setOpenUpdateStaff(true);
    };

    const renderCell = (cellHeader: string, _cellValue: string | boolean | number | any, rowValue: AgencyInfo) => {
        if (cellHeader === intl("detailAddress")) {
            return (
                <div className="w-full h-full line-clamp-4">
                    {`${rowValue.detailAddress}, ${rowValue.town}, ${rowValue.district}, ${rowValue.province}`}
                </div>
            );
        } else if (cellHeader === intl("manager")) {
            return (
                <div className="flex justify-start place-items-center gap-2 whitespace-nowrap">
                    <Button className="min-h-5 min-w-5 w-5 h-5 p-0 rounded-full bg-lightContainer dark:!bg-darkContainer" onPress={() => openStaff({
                            username: rowValue.manager.username,
                            agencyId: rowValue.manager.agencyId,
                            avatar: rowValue.manager.avatar,
                            bank: rowValue.manager.bank,
                            bin: rowValue.manager.bin,
                            birthDate: rowValue.manager.birthDate,
                            cccd: rowValue.manager.cccd,
                            deposit: rowValue.manager.deposit,
                            detailAddress: rowValue.manager.detailAddress,
                            district: rowValue.manager.district,
                            email: rowValue.manager.email ?? "",
                            fullname: rowValue.manager.fullname,
                            id: rowValue.manager.id,
                            paidSalary: rowValue.manager.paidSalary,
                            phoneNumber: rowValue.manager.phoneNumber ?? "",
                            province: rowValue.manager.province,
                            roles: [
                                {value: StaffRole.AGENCY_MANAGER}
                            ],
                            salary: rowValue.manager.salary,
                            staffId: rowValue.manager.staffId,
                            town: rowValue.manager.town,
                        })}>
                        <IoPersonCircleOutline className="min-h-5 min-w-5" />
                    </Button>
                    {rowValue.manager.fullname}
                </div>
            )
            // } else if (cellHeader === intl("manager")) {
            //     return (
            //         <div className="w-full h-full whitespace-nowrap">
            //             {rowValue.manager.fullname}
            //         </div>
            //     );
        } else if (cellHeader === intl('company')) {
            return (
                <div className="w-full h-full whitespace-nowrap">
                    {_cellValue.name}
                </div>
            );
        } else if (cellHeader === intl('contracts')) {
            return (
                <div className="w-full h-full whitespace-nowrap">
                    <Button className="min-h-5 min-w-5 w-5 h-5 p-0 rounded-full bg-lightContainer dark:!bg-darkContainer" onPress={() => setOpenAgencyDetail(true)}>
                        <HiOutlineMagnifyingGlassCircle className="min-h-5 min-w-5" />
                    </Button>
                    {_cellValue.length > 0 ? _cellValue[0].name : ""}
                </div>
            );
        }
    };

    const toggleType = () => {
        setIsAgency(!isAgency);
        fetchData();
    }

    const fetchData = async () => {
        const token = getTokenFromCookie();
        setAgencies(undefined);
        setSelectedRows([]);
        if (!token) return;
        const typeCriteria = {
            field: "type",
            operator: "=",
            value: isAgency ? "BC" : "DL"
        } as SearchCriteria;

        const response = await agencyOp.search({
            addition: {
                sort: sortBy.map(({ id, desc }) => [id, desc ? "DESC" : "ASC"]),
                page: currentPage,
                size: currentSize,
                group: []
            },
            criteria: [typeCriteria]
        }, token);
        console.log(response)
        if (response.success) {
            setAgencies(response.data as AgencyInfo[])
        }
    }

    const reloadData = useCallback(async () => {
        const token = getTokenFromCookie();
        setAgencies(undefined);
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

        const typeCriteria = {
            field: "type",
            operator: "=",
            value: "DL"
        } as SearchCriteria;

        const response = await agencyOp.search({
            addition: {
                sort: sortBy.map(({ id, desc }) => [id, desc ? "DESC" : "ASC"]),
                page: currentPage,
                size: currentSize,
                group: []
            },
            criteria: criteria ? [criteria, typeCriteria] : [typeCriteria]
        }, token);
        console.log(response)
        if (response.success) {
            setAgencies(response.data as AgencyInfo[])
        }
    }, [currentPage, currentSize, sortBy, searchCriteriaValue]);

    useEffect(() => {
        reloadData();
    }, []);

    const handleDelete = async () => {
        const token = getTokenFromCookie();
        if (!token) return;

        for (const row of selectedRows) {
            const response = await agencyOp.delete(row.id as UUID, token);
            if (response.success) {
                addNotification({ message: `${intl("DeleteSuccess")} ${row.id} ${intl("DeleteSuccess2")}`, type: "success" });
            } else {
                addNotification({ message: `${intl("DeleteSuccess")} ${row.id} ${intl("DeleteFailed2")}`, type: "error" });
            }
        }

        setSearchCriteriaValue(prev => prev);
    }

    return (
        <>
            <AddAgencyContent addInfo={addInfo} openAdd={openAdd} setAddInfo={setAddInfo} addInfo2={addInfo2} setAddInfo2={setAddInfo2} setOpenAdd={setOpenAdd} reloadData={reloadData} addInfo3={addInfo3} setAddInfo3={setAddInfo3} />
            {staffInfo && <UpdateContent openUpdate={openUpdateStaff} reloadData={fetchData} setOpenUpdate={setOpenUpdateStaff} setStaffInfo={setStaffInfo} staffInfo={staffInfo} />}
            {openAgencyDetail && <UpdateContentAgency openAdd={openAgencyDetail} setOpenAdd={setOpenAgencyDetail} selectedAgency={selectedAgency!} setSelectedAgency={setSelectedAgency}/>}
            {/* <FileOpen /> */}
            <TableSwitcher
                primaryKey="id"
                tableData={agencies}
                isPaginated={true}
                customSearch={true}
                setSortBy={setSortBy}
                renderCell={renderCell}
                currentPage={currentPage}
                currentSize={currentSize}
                fetchPageData={reloadData}
                columnsData={columnsData()}
                selectedRows={selectedRows}
                setCurrentPage={setCurrentPage}
                setSelectedRows={setSelectedRows}
                customButton={<CustomButton fetchData={reloadData} handleDelete={() => addSubmitNotification({ message: intl("Confirm2"), submitClick: handleDelete })} selectedRows={selectedRows} openAdd={() => { setOpenAdd(true) }}
                    extraButton={
                        <>
                            <SearchPopUp fields={searchFields} searchCriteriaValue={searchCriteriaValue} setSearchCriteriaValue={setSearchCriteriaValue} />
                            <div className="mr-4">

                                <Button
                                    className={`
            w-full lg:w-fit flex items-center text-md hover:cursor-pointer 
            bg-lightPrimary dark:bg-darkContainerPrimary hover:bg-gray-100 dark:hover:bg-white/20 dark:active:bg-white/10
            linear justify-center rounded-lg font-medium dark:font-base transition duration-200
        `}
                                    onPress={toggleType}
                                >
                                    <IoRepeat size={24} className="text-gray-500" />
                                    {intl(isAgency ? "IsAgency" : "IsPostOffice")}
                                </Button>
                            </div>
                        </>
                    } />}
                containerClassname="!rounded-xl p-4"
                selectType="multi"
                setPageSize={{
                    setCurrentSize,
                    sizeOptions: [10, 20, 30]
                }}
                onRowClick={(agency) => {
                    // console.log("agency", agency);
                    setSelectedAgency(agency);
                    setOpenAgencyDetail(true);
                }}
            />
        </>
    );
}

export default AgenciesMain;