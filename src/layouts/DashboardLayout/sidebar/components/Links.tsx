"use client";

import Link from "next/link";
import useRoutes from "../variable/route";
import { usePathname } from 'next/navigation';
import { motion, Variants } from "framer-motion";
import DashIcon from "@/components/icons/DashIcon";
import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { createPortal } from "react-dom";
import { debounce } from "@/utils/debounce";

type Props = {
  onClickRoute?: (e: MouseEvent<HTMLElement>) => void;
};

const linkVariants: Variants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
};

const SidebarLinks = ({ onClickRoute }: Props) => {
  const routes = useRoutes();
  const pathname = usePathname();
  const intl = useTranslations("Routes");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [indicatorPosition, setIndicatorPosition] = useState<{ top: number; right: number } | null>(null);
  const routeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const findActiveRouteIndex = () => {
      return routes.findIndex(route => route.layout && route.path && pathname.includes(route.path));
    };
    setActiveIndex(findActiveRouteIndex());
  }, [pathname, routes]);

  const handleSetIndicatorPosition = () => {
    if (activeIndex !== null && routeRefs.current[activeIndex]) {
      const activeRoute = routeRefs.current[activeIndex]?.getBoundingClientRect();
      if (activeRoute) {
        setIndicatorPosition({ top: activeRoute.top, right: activeRoute.right });
      }
    }
  };

  const debouncedSetDropdownPosition = debounce(handleSetIndicatorPosition, 20);

  useEffect(() => {
    debouncedSetDropdownPosition();
  }, [routeRefs.current[activeIndex ?? 0], debouncedSetDropdownPosition]);

  const handleRouteClick = (index: number, e: React.MouseEvent<HTMLElement>) => {
    setActiveIndex(index);
    onClickRoute && onClickRoute(e);
  };

  const createLinks = (routes: any) => {
    const managementRoutes = routes.filter((route: { path: string }) => route.path === "orders" || route.path === "shipments");
    const interiorRoutes = routes.filter((route: { path: string }) => route.path !== "orders" && route.path !== "shipments" && route.path !== "create");

    const renderLinks = (routes: any, startIndex: number, headerText: string) => (
      <div>
        <p className="font-semibold mb-2 pl-5 pt-2">{headerText}</p>
        {routes.map((route: any, index: number) => {
          const routeIndex = index + startIndex;
          return (
            <Link key={`route-${routeIndex}`} href={route.path} onClick={(e) => handleRouteClick(routeIndex, e)}>
              <motion.div
                ref={(el) => {
                  routeRefs.current[routeIndex] = el;
                }}
                variants={linkVariants}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.3, delay: 0.1 * routeIndex }}
                className="relative mb-3 flex hover:cursor-pointer"
              >
                <li className="my-[3px] flex cursor-pointer items-center px-8">
                  <span className={`${activeIndex === routeIndex ? "font-bold text-red-500 dark:text-white" : "font-medium text-gray-400"}`}>
                    {route.icon ? route.icon : <DashIcon />}{" "}
                  </span>
                  <p className={`leading-1 ml-4 flex ${activeIndex === routeIndex ? "font-medium text-red-500 dark:text-white" : "font-medium text-gray-400"}`}>
                    {route.name}
                  </p>
                </li>
              </motion.div>
            </Link>
          );
        })}
      </div>
    );

    return (
      <>
        {renderLinks(managementRoutes, 0, intl("management"))}
        {renderLinks(interiorRoutes, managementRoutes.length, intl("interior"))}
        {indicatorPosition &&
          <div
            className="h-8 w-1 rounded-lg bg-red-500 dark:bg-red-500 transition-all duration-500 ease-in-out"
            style={{
              top: indicatorPosition.top,
              left: indicatorPosition.right - 4,
              position: "fixed",
            }}
          />
        }
      </>
    );
  };

  return createLinks(routes);
};

export default SidebarLinks;