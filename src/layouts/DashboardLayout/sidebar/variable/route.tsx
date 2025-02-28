import { FaBox, FaUsers, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";
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
    // {
    //   name: t("shipments"),
    //   layout: "/dashboard",
    //   path: "shipments",
    //   icon: <FaShippingFast className="h-4 w-4" />,
    // },
    // {
    //   name: t("account"),
    //   layout: "/dashboard",
    //   path: "account",
    //   icon: <FaUserCircle className="h-4 w-4" />,
    // },
    {
      name: t("staffs"),
      layout: "/dashboard",
      path: "staffs",
      icon: <FaUsers className="h-4 w-4" />,
    },
    // {
    //   name: t("vehicles"),
    //   layout: "/dashboard",
    //   path: "vehicles",
    //   icon: <FaTruck className="h-4 w-4" />,
    // },
    {
      name: t("agencies"),
      layout: "/dashboard",
      path: "agencies",
      icon: <FaMapMarkerAlt className="h-4 w-4" />,
    },
    // {
    //   name: t("partners"),
    //   layout: "/dashboard",
    //   path: "partners",
    //   icon: <FaHandshake className="h-4 w-4" />,
    // },
    // {
    //   name: t("business"),
    //   layout: "/dashboard",
    //   path: "business",
    //   icon: <FaBuilding className="h-4 w-4" />,
    // },
    {
      name: t("tasks"),
      layout: "/dashboard",
      path: "tasks",
      icon: <FaBriefcase className="h-4 w-4" />,
    },
  ];
};

export default useRoutes;