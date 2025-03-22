"use client";

import { RootState } from "@/store";
import { useSelector } from "react-redux";
import DetailContent from "./detailContent";
import { useTranslations } from "next-intl";
import RenderCase from "@/components/render";
import TableSwitcher from "@/components/table";
import { OrdersOperation } from "@/services/main";
import CustomInputField from "@/components/input";
import { getTokenFromCookie } from "@/utils/token";
import CustomButton from "@/views/customTableButton";
import { columnsData } from "../variables/columnsData";
import { useCallback, useEffect, useState } from "react";
import SearchPopUp, { DetailFields } from "@/views/customTableSearchPopUp";
import { OrderData, OrderState } from "@/types/views/orders/orders-config";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import { OrderStatus, SearchCriteria, SearchOperator, ServiceType } from "@/services/interface";


const OrdersMain = () => {
    const orderOp = new OrdersOperation();
    const intl = useTranslations("OrdersRoute");
    const [orders, setOrders] = useState<OrderData[]>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentSize, setCurrentSize] = useState<number>(10);
    const [openDetail, setOpenDetail] = useState<boolean>(false);
    const [selectedOrder, setSelectedOrder] = useState<OrderData>();
    const [selectedRows, setSelectedRows] = useState<OrderData[]>([]);
    const userInfo = useSelector((state: RootState) => state.auth.userInfo);
    const [sortBy, setSortBy] = useState<{ id: string; desc: boolean }[]>([]);
    const [currentOrderState, setCurrentOrderState] = useState<OrderState[]>(['ALL']);
    const orderStateOptions: OrderState[] = ['ALL', 'PROCESSING', 'NTHIRD_PARTY_DELIVERY'];
    const [searchCriteriaValue, setSearchCriteriaValue] = useState<SearchCriteria>({
        field: [],
        operator: [],
        value: null
    });

    const changeStateOptions: SelectInputOptionFormat[] = orderStateOptions.map(type => ({
        label: intl(type),
        value: type
    }));

    const statusCodeOptions: SelectInputOptionFormat[] = Object.values(OrderStatus).map(type => ({
        label: intl(type),
        value: type
    }));

    const serviceTypeOptions: SelectInputOptionFormat[] = Object.values(ServiceType).map(type => ({
        label: type,
        value: type
    }));

    const agencyId2TypeOptions: SelectInputOptionFormat[] = ["yes", "no"].map(type => ({
        label: intl(type),
        value: type
    }));

    const searchFields: Array<DetailFields> = [
        { label: intl("id"), label_value: "id", type: "text" },
        { label: intl("agencyId2"), label_value: "agencyId2", type: "select", options: agencyId2TypeOptions, select_type: "single", dropdownPosition: "top", hideOperator: true },
        { label: intl("trackingNumber"), label_value: "trackingNumber", type: "text" },
        { label: intl("statusCode"), label_value: "statusCode", type: "select", options: statusCodeOptions, select_type: "single", dropdownPosition: "top" },
        { label: intl("serviceType"), label_value: "serviceType", type: "select", options: serviceTypeOptions, select_type: "single", dropdownPosition: "top" },
        { label: intl("nameSender"), label_value: "nameSender", type: "text" },
        { label: intl("nameReceiver"), label_value: "nameReceiver", type: "text" },
        { label: intl("phoneNumberSender"), label_value: "phoneNumberSender", type: "text" },
        { label: intl("phoneNumberReceiver"), label_value: "phoneNumberReceiver", type: "text" },
    ];

    const renderHeader = (cellHeader: string): string => {
        if (cellHeader === intl("agencyId2")) {
            return "!text-end !pr-2"
        } else if (cellHeader === intl("trackingNumber")) {
            return "!pl-2"
        }
        return "";
    }

    const renderCell = (cellHeader: string, cellValue: string | number | boolean, rowValue: OrderData) => {
        if (cellHeader === intl("statusCode")) {
            return <div className="w-full h-full whitespace-nowrap">{intl(cellValue)}</div>
        } else if (cellHeader === intl("serviceType")) {
            return <div className="w-full h-full text-center">{rowValue.serviceType}</div>
        } else if (cellHeader === intl("detailSource")) {
            return <div className="w-full h-full line-clamp-4">{`${rowValue.detailSource}, ${rowValue.wardSource}, ${rowValue.districtSource}, ${rowValue.provinceSource}`}</div>
        } else if (cellHeader === intl("detailDest")) {
            return <div className="w-full h-full line-clamp-4">{`${rowValue.detailDest}, ${rowValue.wardDest}, ${rowValue.districtDest}, ${rowValue.provinceDest}`}</div>
        } else if (cellHeader === intl("trackingNumber")) {
            return <div className="w-full h-full pl-2">{rowValue.trackingNumber}</div>
        } else if (cellHeader === intl("agencyId2")) {
            return (
                <div className="flex justify-center pt-1">
                    <RenderCase condition={userInfo && userInfo.agencyId ? userInfo.agencyId === cellValue : false}>
                        <MdRadioButtonChecked />
                    </RenderCase>
                    <RenderCase condition={!(userInfo && userInfo.agencyId ? userInfo.agencyId === cellValue : false)}>
                        <MdRadioButtonUnchecked />
                    </RenderCase>
                </div>
            )
        }
    };

    const onRowClick = (value: OrderData) => {
        const newValue = { ...value, statuscode: [value.statusCode] };
        setSelectedOrder(newValue);
        setOpenDetail(true);
    };

    const fetchData = useCallback(async () => {
        const token = getTokenFromCookie();
        setOrders(undefined);
        setSelectedRows([]);

        if (!token) return;
        const testData = await orderOp.downloadImage({fileId:"23e71e57-dade-4998-b171-318090042c1e"} , token);
        console.log(testData)

        const rawValue = Array.isArray(searchCriteriaValue.value) ? searchCriteriaValue.value[0] : searchCriteriaValue.value;
        const criteria: SearchCriteria | null = rawValue ? {
            field: searchCriteriaValue.field[0] === "agencyId2" ? "agencyId" : searchCriteriaValue.field[0],
            operator: searchCriteriaValue.field[0] === "agencyId2"
                ? (rawValue === "yes" ? "=" : "!=")
                : searchCriteriaValue.operator[0] as SearchOperator,
            value: searchCriteriaValue.field[0] === "agencyId2" ?
                (userInfo?.agencyId ?? "This account has no agencyId") :
                (rawValue === "true" ? true : rawValue === "false" ? false : rawValue)
        } : null;

        const response = await orderOp.search({
            addition: {
                sort: sortBy.map(({ id, desc }) => [id, desc ? "DESC" : "ASC"]),
                page: currentPage,
                size: currentSize,
                group: []
            },
            criteria: [
                ...(currentOrderState[0] !== 'ALL' ? [{
                    field: currentOrderState[0] === 'NTHIRD_PARTY_DELIVERY' ? "isThirdPartyDelivery" : "statusCode",
                    operator: "=" as SearchOperator,
                    value: currentOrderState[0] === 'NTHIRD_PARTY_DELIVERY' ? true : "PROCESSING"
                }] : []),
                ...(criteria ? [criteria] : [])
            ]
        }, token);

        console.log(response)

        if (response.success) {
            setOrders(response.data as OrderData[]);
        }
    }, [currentPage, currentSize, sortBy, currentOrderState[0], searchCriteriaValue]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
            <DetailContent openDetail={openDetail} setOpenDetail={setOpenDetail} selectedOrder={selectedOrder} updatePermission={userInfo && userInfo.agencyId ? userInfo.agencyId === selectedOrder?.agencyId : false} setSelectedOrder={setSelectedOrder} reloadData={fetchData} />
            <TableSwitcher
                sortBy={sortBy}
                primaryKey="id"
                tableData={orders}
                isPaginated={true}
                setSortBy={setSortBy}
                renderCell={renderCell}
                currentPage={currentPage}
                currentSize={currentSize}
                fetchPageData={fetchData}
                fetchSearchSortData={true}
                columnsData={columnsData()}
                renderHeader={renderHeader}
                selectedRows={selectedRows}
                setCurrentPage={setCurrentPage}
                setSelectedRows={setSelectedRows}
                customSearch={true}
                customButton={
                    <CustomButton fetchData={fetchData} selectedRows={selectedRows} extraButton={
                        <div className="flex flex-col lg:flex-row w-full">
                            <SearchPopUp fields={searchFields} searchCriteriaValue={searchCriteriaValue} setSearchCriteriaValue={setSearchCriteriaValue} />
                            <CustomInputField
                                id="ChangeState"
                                key="ChangeState"
                                type="select"
                                select_type="single"
                                isClearable={false}
                                className="w-full lg:w-52"
                                options={changeStateOptions}
                                value={currentOrderState}
                                setValue={setCurrentOrderState}
                                containerClassName="w-full lg:w-fit mb-3 lg:mb-0 lg:mr-3"
                                inputClassName="bg-lightPrimary dark:!bg-darkContainerPrimary !rounded-lg border-none"
                            />
                        </div>

                    } />
                }
                containerClassname="!rounded-xl p-4"
                selectType="none"
                setPageSize={{
                    setCurrentSize,
                    sizeOptions: [10, 20, 30]
                }}
                onRowClick={onRowClick}
            />
        </>
    );
}

export default OrdersMain;