"use client";

import { useCallback, useEffect, useState } from "react";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import DetailPopup from "@/components/popup";
import RenderCase from "@/components/render";
import { FaShippingFast, FaUserCircle } from "react-icons/fa";
import CustomButton from "@/views/customTableButton";
import { OrdersOperation, StaffOperation, TaskOperation } from "@/services/main";
import { getTokenFromCookie } from "@/utils/token";
import { useNotifications } from "@/hooks/NotificationsProvider";
import { RoleValue, StaffInfo, StaffInfoUpdate } from "@/types/store/auth-config"
import { useSubmitNotification } from "@/hooks/SubmitNotificationProvider";
import { SearchCriteria, OrderStatus, ServiceType } from "@/services/interface";
import { UUID } from "crypto";
import { OrderData, OrderState } from "@/types/views/orders/orders-config";
import SearchPopUp, { DetailFields } from "@/views/customTableSearchPopUp";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import { Button } from "@nextui-org/react";
import { BiTrash } from "react-icons/bi";
import TableSwitcher from "@/components/table";
import { columnsData } from "../variables/columnsData3";
import { TaskData } from "@/types/views/tasks/tasks-config";
import CustomInputField from "@/components/input";

type UpdateFields = {
    id: keyof StaffInfoUpdate,
    type: InputTypes,
    important?: boolean,
    version?: TextInputVersion | SelectInputVersion,
    select_type?: SelectInputType,
    options?: SelectInputOptionFormat[],
    isClearable?: boolean,
    state?: InputState,
    dropdownPosition?: DropdownPosition;
}

type Props = {
    openOrders: boolean;
    setOpenOrders: React.Dispatch<React.SetStateAction<boolean>>;
    reloadData: () => void;
    userId: string;
}

const UpdateContent = ({ openOrders, setOpenOrders, reloadData, userId }: Props) => {
    const orderOp = new OrdersOperation();
    const taskOp = new TaskOperation();
    const intl = useTranslations("OrdersRoute");
    const [orderId, setOrderId] = useState<UUID>();
    const { addNotification } = useNotifications();
    const [orders, setOrders] = useState<OrderData[]>();
    const { addSubmitNotification } = useSubmitNotification();
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
        if (cellHeader === intl("delete")) {
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
        } else if (cellHeader === intl("delete")) {
            return (
                <div className="flex justify-center whitespace-nowrap">
                    <RenderCase condition={userInfo && userInfo.agencyId ? userInfo.agencyId === rowValue.agencyId : false}>
                        <Button className="min-h-5 min-w-5 w-5 h-5 p-0 rounded-full bg-lightContainer dark:!bg-darkContainer" onPress={() => { setOrderId(cellValue as UUID); addSubmitNotification({ message: intl("Submit"), submitClick: handleDelete }) }}>
                            <BiTrash className="min-h-5 min-w-5" />
                        </Button>
                    </RenderCase>
                    <RenderCase condition={!(userInfo && userInfo.agencyId ? userInfo.agencyId === rowValue.agencyId : false)}>
                        {intl("permission2")}
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
        console.log(searchCriteriaValue);
        let criterias: SearchCriteria[] = [
            {
                field: "customerId",
                operator: "=",
                value: userId
            }
        ];

        (searchCriteriaValue.field as string[]).forEach((field, index) => {
            console.log(`Field: ${field}, Value: ${searchCriteriaValue.value[index]}`);
            const value = Array.isArray(searchCriteriaValue.value[index]) ? searchCriteriaValue.value[index][0] : searchCriteriaValue.value[index];
            criterias.push({
                field: field,
                operator: value === "yes" ? "=" : value === "no" ? "!=" :
                    (field === "id" || field === "trackingNumber" || field === "agencyId2") ? "=" : "~",
                value: value === "yes" ? true : value === "no" ? false : value
            })
        });


        // const rawValue = Array.isArray(searchCriteriaValue.value) ? searchCriteriaValue.value[0] : searchCriteriaValue.value;
        // const criteria: SearchCriteria | null = rawValue ? {
        //     field: searchCriteriaValue.field[0] === "agencyId2" ? "agencyId" : searchCriteriaValue.field[0],
        //     operator: searchCriteriaValue.field[0] === "agencyId2"
        //         ? (rawValue === "yes" ? "=" : "!=")
        //         : searchCriteriaValue.operator[0] as SearchOperator,
        //     value: searchCriteriaValue.field[0] === "agencyId2" ?
        //         (userInfo?.agencyId ?? "This account has no agencyId") :
        //         (rawValue === "true" ? true : rawValue === "false" ? false : rawValue)
        // } : null;

        const response = await orderOp.search({
            addition: {
                sort: sortBy.map(({ id, desc }) => [id, desc ? "DESC" : "ASC"]),
                page: currentPage,
                size: currentSize,
                group: []
            },
            criteria: criterias
            // [
            //     ...(currentOrderState[0] !== 'ALL' ? [{
            //         field: currentOrderState[0] === 'NTHIRD_PARTY_DELIVERY' ? "isThirdPartyDelivery" : "statusCode",
            //         operator: "=" as SearchOperator,
            //         value: currentOrderState[0] === 'NTHIRD_PARTY_DELIVERY' ? true : "PROCESSING"
            //     }] : []),
            //     ...(criteria ? [criteria] : [])
            // ]
        }, token);

        if (response.success) {
            const fetchEdOrders = response.data as OrderData[];
            console.log(fetchEdOrders);
            setOrders(fetchEdOrders);
        }
    }, [currentPage, currentSize, sortBy, currentOrderState[0], searchCriteriaValue]);

    const handleDelete = async () => {
        // const token = getTokenFromCookie();
        // if (!token) return;
        // if (!orderId) return;

        // const response = await taskOp.deleteOrder(orderId, token);
        // if (response.success) {
        //     addNotification({ message: response.message ?? intl("Success2"), type: "success" });
        // } else {
        //     addNotification({ message: response.message ?? intl("Fail2"), type: "error" });
        // }

        // setSearchCriteriaValue(prev => prev);
    }

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <RenderCase condition={openOrders}>
            <DetailPopup
                customWidth="w-full md:w-fit"
                title={intl("OrdersList")}
                onClose={() => setOpenOrders(false)}
                icon={<FaShippingFast className="w-full h-full" />}
                noPadding
            >
                <div className="relative flex flex-col gap-2 p-2">
                    <TableSwitcher
                        primaryKey="id"
                        tableData={orders}
                        isPaginated={true}
                        renderCell={renderCell}
                        currentPage={currentPage}
                        currentSize={currentSize}
                        fetchPageData={fetchData}
                        fetchSearchSortData={true}
                        columnsData={columnsData()}
                        renderHeader={renderHeader}
                        selectedRows={selectedRows}
                        customSearch={true}
                        setCurrentPage={setCurrentPage}
                        setSelectedRows={setSelectedRows}
                        customButton={
                            <CustomButton fetchData={fetchData} selectedRows={selectedRows} extraButton={
                                <div className="flex flex-col lg:flex-row w-full">
                                    <SearchPopUp fields={searchFields} searchCriteriaValue={searchCriteriaValue} setSearchCriteriaValue={setSearchCriteriaValue} />
                                </div>
                            } />
                        }
                        containerClassname="!rounded-xl p-4"
                        selectType="none"
                        setPageSize={{
                            setCurrentSize,
                            sizeOptions: [10, 20, 30]
                        }}
                    />
                </div>
            </DetailPopup>
        </RenderCase>
    );
};

export default UpdateContent;