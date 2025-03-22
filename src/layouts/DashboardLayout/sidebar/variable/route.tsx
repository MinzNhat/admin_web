import { FaBox, FaUsers, FaMapMarkerAlt, FaShippingFast, FaTruck, FaUserCircle, FaMotorcycle, FaTicketAlt, FaCog, FaFileInvoice } from "react-icons/fa";
import { useTranslations } from 'next-intl';

const useRoutes = () => {
  const t = useTranslations('Routes');

  return [
    {
      name: t("orders"),
      layout: "/dashboard",
      path: "orders",
      icon: <FaBox className="h-4 w-4" />,
    },
    {
      name: t("shipments"),
      layout: "/dashboard",
      path: "shipments",
      icon: <FaShippingFast className="h-4 w-4" />,
    },
    {
      name: t("vouchers"),
      layout: "/dashboard",
      path: "vouchers",
      icon: <FaTicketAlt className="h-4 w-4" />,
    },
    {
      name: t("customers"),
      layout: "/dashboard",
      path: "customers",
      icon: <FaUserCircle className="h-4 w-4" />,
    },
    {
      name: t("staffs"),
      layout: "/dashboard",
      path: "staffs",
      icon: <FaUsers className="h-4 w-4" />,
    },
    {
      name: t("agencies"),
      layout: "/dashboard",
      path: "agencies",
      icon: <FaMapMarkerAlt className="h-4 w-4" />,
    },
    {
      name: t("shipper_tasks"),
      layout: "/dashboard",
      path: "shipper_tasks",
      icon: <FaMotorcycle className="h-4 w-4" />,
    },
    {
      name: t("driver_tasks"),
      layout: "/dashboard",
      path: "driver_tasks",
      icon: <FaTruck className="h-4 w-4" />,
    },
    {
      name: t("shipping_bills"),
      layout: "/dashboard",
      path: "shipping_bills",
      icon: <FaFileInvoice className="h-4 w-4" />,
    },
    {
      name: t("config"),
      layout: "/dashboard",
      path: "config",
      icon: <FaCog className="h-4 w-4" />,
    },
  ];
};

export default useRoutes;