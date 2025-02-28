"use client";

import { useTranslations } from "next-intl";
import TableSwitcher from "@/components/table";
import { OrdersOperation } from "@/services/main";
import { getTokenFromCookie } from "@/utils/token";
import CustomButton from "@/views/customTableButton";
import { columnsData } from "../variables/columnsData";
import { useCallback, useEffect, useState } from "react";
import { OrderData } from "@/types/views/orders/orders-config";
import RenderCase from "@/components/render";
import DetailContent from "./detailContent";

const OrdersMain = () => {
    const orderOp = new OrdersOperation();
    const intl = useTranslations("OrdersRoute");
    const [orders, setOrders] = useState<OrderData[]>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentSize, setCurrentSize] = useState<number>(10);
    const [openDetail, setOpenDetail] = useState<boolean>(false);
    const [selectedOrder, setSelectedOrder] = useState<OrderData>();
    const [selectedRows, setSelectedRows] = useState<OrderData[]>([]);

    const renderHeader = (cellHeader: string): string => {
        if (cellHeader == intl("statusCode")) {
            return "!text-end !pr-2"
        } else if (cellHeader == intl("trackingNumber")) {
            return "!pl-2"
        }
        return "";
    }

    const renderCell = (cellHeader: string, cellValue: string | number | boolean, rowValue: OrderData) => {
        if (cellHeader === intl("statusCode")) {
            return <div className="w-full h-full text-end whitespace-nowrap pr-2">{intl(cellValue)}</div>
        } else if (cellHeader === intl("serviceType")) {
            return <div className="w-full h-full text-center">{rowValue.serviceType}</div>
        } else if (cellHeader === intl("detailSource")) {
            return <div className="w-full h-full line-clamp-4">{`${rowValue.detailSource}, ${rowValue.wardSource}, ${rowValue.districtSource}, ${rowValue.provinceSource}`}</div>
        } else if (cellHeader === intl("detailDest")) {
            return <div className="w-full h-full line-clamp-4">{`${rowValue.detailDest}, ${rowValue.wardDest}, ${rowValue.districtDest}, ${rowValue.provinceDest}`}</div>
        } else if (cellHeader === intl("trackingNumber")) {
            return <div className="w-full h-full pl-2">{rowValue.trackingNumber}</div>
        }
    };

    const onRowClick = (value: OrderData) => {
        setOpenDetail(true);
        setSelectedOrder(value);
    };

    const reloadData = useCallback(async () => {
        const token = getTokenFromCookie();
        setOrders(undefined);
        if (token) {
            const response = await orderOp.search({
                addition: {
                    sort: [],
                    page: currentPage,
                    size: currentSize,
                    group: []
                },
                criteria: []
            }, token)
            if (response.success) {
                setOrders(response.data as OrderData[])
            }
        }
    }, [currentPage, currentSize]);

    useEffect(() => {
        reloadData();
    }, []);

    return (
        <>
            <DetailContent openDetail={openDetail} setOpenDetail={setOpenDetail} selectedOrder={selectedOrder} />
            <TableSwitcher
                primaryKey="id"
                tableData={orders}
                isPaginated={true}
                renderCell={renderCell}
                currentPage={currentPage}
                currentSize={currentSize}
                fetchPageData={reloadData}
                columnsData={columnsData()}
                renderHeader={renderHeader}
                selectedRows={selectedRows}
                setCurrentPage={setCurrentPage}
                setSelectedRows={setSelectedRows}
                customButton={<CustomButton fetchData={reloadData} selectedRows={selectedRows} />}
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