"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useTranslations } from "next-intl";
import { useHandleClickOutsideAlerter } from "@/utils/handleClickOutside";

const Search = () => {
    const intl = useTranslations("Navbar");
    const [search, setSearch] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    useHandleClickOutsideAlerter({ ref: containerRef, setState: setIsSearchFocused })

    return (
        <div
            ref={containerRef}
            onClick={() => setIsSearchFocused(true)}
            className={`relative flex h-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-darkContainerPrimary dark:text-white w-full`}
        >
            <motion.button
                className={`absolute text-xl h-8 w-8 px-2 flex justify-center rounded-full place-items-center transition-all duration-500  ${isSearchFocused ? "bg-red-500 dark:bg-darkContainer shadow-sm" : ""
                    } transform`}
                initial={{ left: 2 }}
                animate={{
                    left: isSearchFocused ? "calc(100% - 2rem - 6px)" : "4px",
                }}
            >
                <FiSearch
                    className={`h-4 w-4 dark:text-white ${isSearchFocused ? "text-white" : "text-gray-400"
                        }`}
                />
            </motion.button>
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder={intl("Search")}
                className={`block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-[#3a3b3c] dark:text-white dark:placeholder:!text-white transition-all duration-500 ${isSearchFocused ? "pl-4" : "pl-10"
                    }`}
            />
        </div>
    );
}

export default Search;