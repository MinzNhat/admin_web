"use client";

import AddContent from "./addContent";
import { useTranslations } from "next-intl";
import UpdateContent from "./updateContent";
import TableSwitcher from "@/components/table";
import { StaffOperation, TaskOperation } from "@/services/main";
import { getTokenFromCookie } from "@/utils/token";
import CustomButton from "@/views/customTableButton";
import { columnsData } from "../variables/columnsData";
import { columnsData2 } from "../variables/columnsData2";
import { useCallback, useEffect, useState } from "react";
import SearchPopUp, { DetailFields } from "@/views/customTableSearchPopUp";
import { RoleValue, StaffInfo, StaffInfoUpdate } from "@/types/store/auth-config";
import { CreateStaffDto, SearchCriteria, ShipperType, StaffRole } from "@/services/interface";
import Switch from "@/components/switch";
import RenderCase from "@/components/render";
import { Button } from "@nextui-org/react";
import { MdAutorenew } from "react-icons/md";
import AddDayOff from "./dayOff";

const StaffsMain = () => {
    const staffOp = new StaffOperation();
    const intl = useTranslations("StaffInfo");
    const TableMessage = useTranslations('Table');
    const [staffs, setStaffs] = useState<StaffInfo[]>();
    const [openAdd, setOpenAdd] = useState<boolean>(false);
    const [openDayOff, setOpenDayOff] = useState(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentSize, setCurrentSize] = useState<number>(10);
    const [openUpdate, setOpenUpdate] = useState<boolean>(false);
    const [staffInfo, setStaffInfo] = useState<StaffInfo>();
    const [selectedRows, setSelectedRows] = useState<StaffInfo[]>([]);
    const [sortBy, setSortBy] = useState<{ id: string; desc: boolean }[]>([]);
    const [shipperTab, setShipperTab] = useState(false);
    const taskOperation = new TaskOperation();
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
        // { label: intl("roles"), label_value: "roles", type: "select", options: roleOptions, select_type: "single", dropdownPosition: "top", hideOperator: true },
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

    const renderCell = (cellHeader: string, cellValue: string | number | boolean | any) => {
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
        } else if (cellHeader === intl("managedWards")) {
            return (
                <div className="w-full h-full whitespace-nowrap">
                    {Array.isArray(cellValue) && cellValue.length !== 0
                        ? cellValue
                            .map((ward) => `${ward.ward}, ${ward.district}, ${ward.province}`)
                            .join(", ")
                        : TableMessage("DefaultNoDataValue")}
                </div>
            );
        } else if (cellHeader === intl("fullname")) {
            return (
                <div className="w-full h-full whitespace-nowrap">
                    {cellValue as string}
                </div>
            );
        } else if (cellHeader === intl("shipperType")) {
            return (
                <div className="w-full h-full whitespace-nowrap">
                    {intl(cellValue??"NoInfor")}
                </div>
            );
        } else if (cellHeader === intl("shipperStatus")) {
            return (
                <div className="w-full h-full whitespace-nowrap">
                    {intl(cellValue?"active":"inactive")}
                </div>
            );
        } else if (cellHeader === intl("shipperDeposit")) {
            return (
                <div className="w-full h-full whitespace-nowrap">
                    {(cellValue && cellValue.deposit > 0)?(cellValue.deposit as number): cellValue as number}
                    {/* {cellValue.deposit as string} */}
                </div>
            );
        } else if (cellHeader === intl("paidDebt") || cellHeader === intl("unpaidDebt")) {
            // console.log(cellHeader, cellValue)
            return (
                <div className="w-full h-full whitespace-nowrap">
                    {cellValue === 0? "0": cellValue as number}
                </div>
            );
        }
    };

    const handleShipperButton = async () => {
        if(shipperTab) {
            fetchData();
            setShipperTab(false);
            return;
        }
        // setStaffInfo(null)
        const token = getTokenFromCookie();
        if (!token) return;

        const response = await staffOp.searchByRole("SHIPPER", token);
        if(response.success) {
            setStaffs(response.data as StaffInfo[]);
        }
        setShipperTab(true);
    }


    const fetchData = useCallback(async () => {
        const token = getTokenFromCookie();
        setStaffs(undefined);
        setSelectedRows([]);

        if (!token) return;
        let criterias : SearchCriteria[] = [];

        (searchCriteriaValue.field as string[]).forEach((field, index) => {
            console.log(`Field: ${field}, Value: ${searchCriteriaValue.value[index]}`);
            const value = Array.isArray(searchCriteriaValue.value[index])?searchCriteriaValue.value[index][0]: searchCriteriaValue.value[index];
            if(!value) return;
            criterias.push({
                field: field === "staffId"? "id": field,
                operator:value === "yes" ? "=": value === "no"? "!=":
                        (field === "staffId" || field === "phoneNumber" || field === "agencyId")? "=": "~",
                value: value === "yes" ? true : value === "no" ? false : value
            })
        });

        // const rawValue = Array.isArray(searchCriteriaValue.value) ? searchCriteriaValue.value[0] : searchCriteriaValue.value;
        // const criteriaField = searchCriteriaValue.field[0];
        // const criteriaValue = rawValue === "true" ? true : rawValue === "false" ? false : rawValue;

        let response;

        // if (criteriaField === "cccd") {
        //     response = await staffOp.searchByCccd(criteriaValue as string, token);
        // } else if (criteriaField === "roles") {
        //     response = await staffOp.searchByRole(criteriaValue as string, token);
        // } else {
        //     const criteria: SearchCriteria | null = rawValue ? {
        //         field: criteriaField,
        //         operator: searchCriteriaValue.operator[0] as SearchOperator,
        //         value: criteriaValue
        //     } : null;

            response = await staffOp.search({
                addition: {
                    sort: sortBy.map(({ id, desc }) => [id, desc ? "DESC" : "ASC"]),
                    page: currentPage,
                    size: currentSize,
                    group: []
                },
                criteria: criterias
                // criteria: [{
                //     field: "id",
                //     operator: "=",
                //     value: "8bf8a710-ac6e-4c69-93f3-ce1a781bbaff"
                // }]
            }, token);
        // }

        console.log(response);

        if (response.success) {
            const token = getTokenFromCookie();
            if (!token) return;
            const staffs = await Promise.all(
                response.data.map(async (staff: StaffInfo) => {
                    const paidDebt = await taskOperation.getPaidDebt(staff.id, token);
                    
                    const unPaidDebt = await taskOperation.getUnPaidDebt(staff.id, token);
                    console.log(paidDebt, unPaidDebt);
                    return {
                        ...staff,
                        paidDebt: paidDebt.data,
                        unpaidDebt: unPaidDebt.data,
                    };
                })
            ) as StaffInfo[];
            console.log("staffs", staffs);
            setStaffs(staffs);
        }
    }, [currentPage, currentSize, sortBy, searchCriteriaValue, shipperTab]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
            {staffInfo && (shipperTab? 
            <UpdateContent openOrders={openUpdate} reloadData={fetchData} setOpenOrders={setOpenUpdate} shipperData={staffInfo}/>: 
            <AddDayOff openAdd={openDayOff} setOpenAdd={setOpenDayOff} staff={staffInfo}/>)}
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
                columnsData={shipperTab?columnsData2():columnsData()}
                selectedRows={selectedRows}
                setCurrentPage={setCurrentPage}
                setSelectedRows={setSelectedRows}
                customButton={<CustomButton fetchData={fetchData} selectedRows={selectedRows} openAdd={() => { setOpenAdd(true) }}
                    extraButton={
                        <>
                            <SearchPopUp fields={searchFields} searchCriteriaValue={searchCriteriaValue} setSearchCriteriaValue={setSearchCriteriaValue} />
                            <div className="mr-4">
                                <Button
                                    className={`
            w-full lg:w-fit flex items-center text-md hover:cursor-pointer 
            ${shipperTab ? "bg-red-500 dark:bg-red-700 hover:bg-red-600 dark:hover:bg-red-800 text-white"
                                            : "bg-lightPrimary dark:bg-darkContainerPrimary hover:bg-gray-100 dark:hover:bg-white/20 dark:active:bg-white/10"} 
            linear justify-center rounded-lg font-medium dark:font-base transition duration-200
        `}
                                    onPress={handleShipperButton}
                                >
                                    {intl("IsShipper")}
                                </Button>
                            </div>

                        </>
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
                    setStaffInfo(value);
                    setOpenUpdate(shipperTab);
                    setOpenDayOff(true);
                }}
            />
        </>
    );
}

export default StaffsMain;