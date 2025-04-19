"use client";

import { useCallback, useEffect, useState } from "react";
import { SearchCriteria } from "@/services/interface";
import { getTokenFromCookie } from "@/utils/token";
import { useTranslations } from "next-intl";
import TableSwitcher from "@/components/table";
import { columnsData } from "../variables/columnsData2";
import CustomButton from "@/views/customTableButton";
import SearchPopUp, { DetailFields } from "@/views/customTableSearchPopUp";
import AddContent from "./addContent";
import { useSubmitNotification } from "@/hooks/SubmitNotificationProvider";
import { useNotifications } from "@/hooks/NotificationsProvider";
import { FaUserCircle } from "react-icons/fa";
import RenderCase from "@/components/render";
import DetailPopup from "@/components/popup";
import { AdministrativeOperation, ConfigOperation } from "@/services/main";
import { Button } from "@nextui-org/react";
import { MdAutorenew, MdOutlineRemoveCircleOutline } from "react-icons/md";
import UpdateContent from "./updateContent";

const ConfigMain = () => {
    const intl = useTranslations("Config");
    const TableMessage = useTranslations('Table');
    const [configs, setConfigs] = useState<ConfigData[]>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [openUpdate, setOpenUpdate] = useState(false);
    const { addSubmitNotification } = useSubmitNotification();
    const { addNotification } = useNotifications();
    const [currentSize, setCurrentSize] = useState<number>(10);
    const [sortBy, setSortBy] = useState<{ id: string; desc: boolean }[]>([]);
    const [selectedRows, setSelectedRows] = useState<ConfigData[]>([]);
    const [searchCriteriaValue, setSearchCriteriaValue] = useState<SearchCriteria>({
        field: [],
        operator: [],
        value: null
    });
    const [addConfig, setAddConfig] = useState(false);
    const administrativeOperation = new AdministrativeOperation();

    const searchFields: Array<DetailFields> = [
        { label: intl("id"), label_value: "id", type: "text" },
        { label: intl("province"), label_value: "province", type: "text" },
        { label: intl("ward"), label_value: "ward", type: "text" },
        { label: intl("district"), label_value: "district", type: "text" },
        { label: intl("deposit"), label_value: "deposit", type: "text" },
        { label: intl("managedByThirdParty"), label_value: "managedByThirdParty", type: "text" },
    ];

    const renderCell = (cellHeader: string, cellValue: string | number | boolean | any) => {
        if (cellHeader === intl("province")) {
            return <div className="w-full h-full whitespace-nowrap">{cellValue}</div>
        }
        else if (cellHeader === intl("ward")) {
            return <div className="w-full h-full text-center">{cellValue}</div>
        }
        else if (cellHeader === intl("district")) {
            return <div className="w-full h-full line-clamp-4">{`${cellValue}`}</div>
        }
        else if (cellHeader === intl("deposit")) {
            return <div className="w-full h-full line-clamp-4">{`${cellValue}`}</div>
        }
        else if (cellHeader === intl("managedByThirdParty")) {
            return <div className="w-full h-full line-clamp-4">{`${intl(cellValue?'yes':'no')}`}</div>
        }
        else if (cellHeader === intl("services")) {
            console.log(cellValue)
            return (
                <div className="w-full h-full pl-2">
                    {Array.isArray(cellValue) ? cellValue.map(item => intl(item)).join(", ") : cellValue}
                </div>
            );
        }
    };

    const handleDelete = async () => {
        const token = getTokenFromCookie();
        if (!token) return;

        // for (const row of selectedRows) {
        //     const response = await shipmentsOp.delete(row.id as UUID, token);
        //     if (response.success) {
        //         addNotification({ message: `${intl("DeleteSuccess")} ${row.id} ${intl("DeleteSuccess2")}`, type: "success" });
        //     } else {
        //         addNotification({ message: `${intl("DeleteSuccess")} ${row.id} ${intl("DeleteFailed2")}`, type: "error" });
        //     }
        // }

        setSearchCriteriaValue(prev => prev);
    }

    const handleUpadte = () => {
        // const response = await configOperation.
    }

    const fetchData = useCallback(async () => {
        const token = getTokenFromCookie();

        if (!token) return;

        const rawValue = Array.isArray(searchCriteriaValue.value) ? searchCriteriaValue.value[0] : searchCriteriaValue.value;
        const criteriaField = searchCriteriaValue.field[0];
        const criteriaValue = rawValue === "true" ? true : rawValue === "false" ? false : rawValue;
        const criteria: SearchCriteria | null = rawValue ? {
            field: criteriaField,
            operator: searchCriteriaValue.operator[0] as SearchOperator,
            value: criteriaValue
        } : null;

        const response = await administrativeOperation.searchWardWithConfig({
            addition: {
                sort: sortBy.map(({ id, desc }) => [id, desc ? "DESC" : "ASC"]),
                page: currentPage,
                size: currentSize,
                group: []
            },
            criteria: criteria ? [criteria] : []
        });

        // {
        //     "id": 5,
        //     "wardId": 8,
        //     "ward": "Phường Liễu Giai",
        //     "level": "Phường",
        //     "districtId": 1,
        //     "district": "Quận Ba Đình",
        //     "provinceId": 1,
        //     "province": "Thành phố Hà Nội",
        //     "postalCode": null,
        //     "deposit": 12000,
        //     "agencyId": null,
        //     "services": [
        //         {
        //             "id": 46,
        //             "wardId": 5,
        //             "serviceName": "SR",
        //             "createdAt": "2025-03-26T10:19:24.000Z",
        //             "updatedAt": "2025-03-26T10:19:24.000Z"
        //         }
        //     ]
        // }

        if (response.success) {
            const configs = response.data.map((config: any) => {
                if (config) {
                    return {
                        ...config, services: config.services.map((service: any) => {
                            console.log(service); return service.serviceName
                        })
                    }
                }
            }) as ConfigData[];
            setConfigs(configs);
            // setConfigs([]);
            console.log(configs)
        }
        console.log(response);
    }, [currentPage, currentSize, sortBy, searchCriteriaValue]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
            <AddContent openAdd={addConfig} setOpenAdd={setAddConfig} />
            <UpdateContent openAdd={openUpdate} setOpenAdd={setOpenUpdate} locations={selectedRows.map((row) => {
                return {
                    district: row.district,
                    province: row.province,
                    ward: row.ward
                }
            })} />
            {/* {shipmentInfo && <UpdateContent setOpenUpdateStatus={setOpenUpdateStatus} openUpdate={openUpdate} reloadData={fetchData} setOpenUpdate={setOpenUpdate} setShipmentInfo={setShipmentInfo} shipmentInfo={shipmentInfo} setOpenAddOrders={setOpenAddOrders}/>} */}
            <TableSwitcher
                primaryKey="id"
                tableData={configs}
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
                // openAdd={() => setAddConfig(true)}
                customButton={
                    <CustomButton fetchData={fetchData} selectedRows={selectedRows}
                        extraButton={
                            <>
                                <SearchPopUp fields={searchFields} searchCriteriaValue={searchCriteriaValue} setSearchCriteriaValue={setSearchCriteriaValue} />
                                <div className="mr-4">
                                    <RenderCase condition={!!selectedRows}>
                                        <Button className={`${selectedRows ? "col-span-2" : " col-span-1"} w-full lg:w-fit flex items-center text-md hover:cursor-pointer bg-lightPrimary p-2 hover:bg-gray-100 dark:bg-darkContainerPrimary dark:hover:bg-white/20 dark:active:bg-white/10
          linear justify-center rounded-lg font-medium dark:font-base transition duration-200`}
                                            onPress={() => setOpenUpdate(true)}>
                                            <MdAutorenew className="mr-2" />{intl("Update")} ({selectedRows?.length})
                                        </Button>
                                    </RenderCase>
                                </div>
                            </>
                        } />}
                containerClassname="!rounded-xl p-4"
                selectType="multi"
                setPageSize={{
                    setCurrentSize,
                    sizeOptions: [10, 20, 30]
                }}
                customSearch={true}
            // onRowClick={(value: Shipment) => {
            //     setShipmentInfo(value);
            //     setOpenUpdate(true);
            // }}
            />
        </>
    );
}

export default ConfigMain;