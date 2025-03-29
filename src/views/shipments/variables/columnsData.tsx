import { Column } from "react-table";
import { useTranslations } from "next-intl";

export const columnsData = (): Column<Shipment>[] => {
    const intl = useTranslations("ShipmentsRoute");

    return [
        {
            Header: intl("id"),
            accessor: "id",
        },
        {
            Header: intl("sourceAgency"),
            accessor: "sourceAgency",
        },
        {
            Header: intl("sourceAgencyId"),
            accessor: "sourceAgencyId",
        },
        {
            Header: intl("destinationAgency"),
            accessor: "destinationAgency",
        },
        {
            Header: intl("destinationAgencyId"),
            accessor: "destinationAgencyId",
        },
        {
            Header: intl("status"),
            accessor: "status",
        },
        {
            Header: intl("mass"),
            accessor: "mass",
        },
        {
            Header: intl("vehicleId"),
            accessor: "vehicleId",
        },
        {
            Header: intl("createdAt"),
            accessor: "createdAt",
        },
    ];
};


// {
//     "id": "9ab29f3b-45fa-4711-bce8-3bbbb4445e9c",
//     "mass": 0,
//     "sourceAgencyId": null,
//     "destinationAgencyId": "DL_78301_077204005691",
//     "vehicleId": "",
//     "status": "DECOMPOSE",
//     "createdAt": "2025-03-24T14:43:53.000Z",
//     "updatedAt": "2025-03-25T14:34:39.000Z",
//     "sourceAgency": null,
//     "destinationAgency": {
//         "name": "Bưu cục Long Mỹ - Đất Đỏ"
//     }
// }