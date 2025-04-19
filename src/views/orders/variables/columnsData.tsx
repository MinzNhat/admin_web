import { Column } from "react-table";
import { OrderData } from "@/types/views/orders/orders-config";
import { useTranslations } from "next-intl";

export const columnsData = (): Column<OrderData>[] => {
    const intl = useTranslations("OrdersRoute");

    return [
        { Header: intl("agencyId"), accessor: "agencyId" },
        { Header: intl("cod"), accessor: "cod" },
        { Header: intl("createdAt"), accessor: "createdAt" },
        { Header: intl("customerId"), accessor: "customerId" },
        { Header: intl("deliverDoorToDoor"), accessor: "deliverDoorToDoor" },
        { Header: intl("detailDest"), accessor: "detailDest" },
        { Header: intl("detailSource"), accessor: "detailSource" },
        { Header: intl("districtDest"), accessor: "districtDest" },
        { Header: intl("districtSource"), accessor: "districtSource" },
        { Header: intl("fee"), accessor: "fee" },
        { Header: intl("fromMass"), accessor: "fromMass" },
        { Header: intl("goodType"), accessor: "goodType" },
        { Header: intl("height"), accessor: "height" },
        { Header: intl("id"), accessor: "id" },
        { Header: intl("isBulkyGood"), accessor: "isBulkyGood" },
        { Header: intl("latDestination"), accessor: "latDestination" },
        { Header: intl("latSource"), accessor: "latSource" },
        { Header: intl("length"), accessor: "length" },
        { Header: intl("longDestination"), accessor: "longDestination" },
        { Header: intl("longSource"), accessor: "longSource" },
        { Header: intl("mass"), accessor: "mass" },
        { Header: intl("miss"), accessor: "miss" },
        { Header: intl("nameReceiver"), accessor: "nameReceiver" },
        { Header: intl("nameSender"), accessor: "nameSender" },
        { Header: intl("note"), accessor: "note" },
        { Header: intl("orderCode"), accessor: "orderCode" },
        { Header: intl("paid"), accessor: "paid" },
        { Header: intl("parent"), accessor: "parent" },
        { Header: intl("phoneNumberReceiver"), accessor: "phoneNumberReceiver" },
        { Header: intl("phoneNumberSender"), accessor: "phoneNumberSender" },
        { Header: intl("provinceDest"), accessor: "provinceDest" },
        { Header: intl("provinceSource"), accessor: "provinceSource" },
        { Header: intl("qrcode"), accessor: "qrcode" },
        { Header: intl("receiverWillPay"), accessor: "receiverWillPay" },
        { Header: intl("serviceType"), accessor: "serviceType" },
        { Header: intl("shipper"), accessor: "shipper" },
        { Header: intl("signature"), accessor: "signature" },
        { Header: intl("statusCode"), accessor: "statusCode" },
        { Header: intl("takingDescription"), accessor: "takingDescription" },
        { Header: intl("toMass"), accessor: "toMass" },
        { Header: intl("trackingNumber"), accessor: "trackingNumber" },
        { Header: intl("updatedAt"), accessor: "updatedAt" },
        { Header: intl("wardDest"), accessor: "wardDest" },
        { Header: intl("wardSource"), accessor: "wardSource" },
        { Header: intl("width"), accessor: "width" },
        { Header: intl("isThirdPartyDelivery"), accessor: "isThirdPartyDelivery" },
    ];
};

