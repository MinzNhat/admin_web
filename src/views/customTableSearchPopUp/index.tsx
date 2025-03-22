"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import RenderCase from "@/components/render";
import DetailPopup from "@/components/popup";
import { BiSearchAlt2 } from "react-icons/bi";
import Container from "@/components/container";
import CustomButton from "@/components/button";
import CustomInputField from "@/components/input";
import { SearchCriteria } from "@/services/interface";

const searchOperators = ['~', '!~', '=', '!=', 'isSet', 'isNotSet', '<', '<=', '>', '>='] as const;

export type DetailFields = {
    label: string,
    label_value: string,
    type?: InputTypes,
    select_type?: SelectInputType,
    options?: SelectInputOptionFormat[],
    dropdownPosition?: DropdownPosition;
    hideOperator?: boolean;
}

type Props = {
    searchCriteriaValue: SearchCriteria;
    setSearchCriteriaValue: React.Dispatch<React.SetStateAction<SearchCriteria>>;
    fields: DetailFields[];
}

const SearchPopUp = ({ setSearchCriteriaValue, fields, searchCriteriaValue }: Props) => {
    const intl = useTranslations("SearchPopUp");
    const [openSearch, setOpenSearch] = useState<boolean>(false);
    const [triggerClose, setTriggerClose] = useState<boolean>(false);
    const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
        field: [fields[0].label_value],
        operator: ["~"],
        value: null
    });

    const options: SelectInputOptionFormat[] = fields.map(({ label, label_value }) => ({
        label: label,
        value: label_value
    }));

    const opOptions: SelectInputOptionFormat[] = searchOperators.map((op) => ({
        label: intl(op),
        value: op
    }));

    const handleSubmitSearch = () => {
        if (searchCriteria.value && searchCriteria.value !== "") {
            setSearchCriteriaValue(searchCriteria);
            setTriggerClose(true);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                handleSubmitSearch();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [searchCriteria]);

    return (
        <>
            <div
                onClick={() => setOpenSearch(true)}
                className="relative flex items-center h-10 min-h-10 px-12 justify-start bg-lightPrimary
                rounded-full text-navy-700 dark:bg-darkContainerPrimary dark:text-white w-full lg:mr-4 mb-3 lg:mb-0"
            >
                <motion.div
                    className="absolute text-xl transition-all duration-500 transform flex"
                    initial={{ right: "100%" }}
                    animate={{ right: !!searchCriteriaValue.value ? "4px" : "calc(100% - 2rem - 6px)" }}
                >
                    <div onPointerDown={(e) => e.stopPropagation()}>
                        <Button
                            onPress={() => {
                            if (!!searchCriteriaValue.value) {
                                setSearchCriteria({
                                field: [fields[0].label_value],
                                operator: ["~"],
                                value: null
                                });
                                setSearchCriteriaValue({
                                field: [fields[0].label_value],
                                operator: ["~"],
                                value: null
                                });
                            }
                            }}
                            className="!bg-red-500 dark:!bg-darkContainer shadow-sm h-8 min-w-8 px-2 flex justify-center
                            gap-1 rounded-full place-items-center flex-shrink-0 text-white"
                        >
                            {!!searchCriteriaValue.value ? (
                                <>
                                    <p className="pt-0.5">{fields.find(f => f.label_value === searchCriteriaValue.field[0])?.label}</p>
                                    <MdClose className="h-4 w-4" />
                                </>
                            ) : (
                                <FiSearch className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                </motion.div>

                <div className={`transition-all duration-500 transform pt-0.5 ${!!searchCriteriaValue.value ? "-ml-8" : "pl-2"}`}>
                    {intl('Title')}
                </div>
            </div>

            <RenderCase condition={openSearch}>
                <DetailPopup
                    customWidth="w-full md:w-fit"
                    title={intl("Title")}
                    onClose={() => setOpenSearch(false)}
                    icon={<BiSearchAlt2 className="h-5 w-5" />}
                    noPadding
                    triggerClose={triggerClose}
                    setTriggerClose={setTriggerClose}
                >
                    <div className="relative">
                        <div className="flex flex-col gap-2 pb-8 md:grid grid-cols-2 md:w-[700px] px-2">
                            <CustomInputField
                                id="Search_label"
                                key="Search_label"
                                type="select"
                                dropdownPosition="top"
                                isClearable={false}
                                options={options}
                                select_type="single"
                                setValue={(value: string | string[]) => setSearchCriteria({ ...searchCriteria, field: value })}
                                value={searchCriteria.field}
                                className="w-full"
                                containerClassName={`flex flex-col gap-1 ${fields.find(f => f.label_value === searchCriteria.field[0])?.hideOperator ? "col-span-2" : ""}`}
                                inputClassName="bg-lightContainer dark:!bg-darkContainerPrimary border border-gray-200 dark:border-white/10"
                                label={intl("Field")}
                            />
                            <RenderCase condition={!!searchCriteria.field[0] && !fields.find(f => f.label_value === searchCriteria.field[0])?.hideOperator}>
                                <CustomInputField
                                    id="Search_op"
                                    key="Search_op"
                                    type="select"
                                    dropdownPosition="top"
                                    isClearable={false}
                                    options={opOptions}
                                    select_type="single"
                                    setValue={(value: SearchOperator | SearchOperator[]) => setSearchCriteria({ ...searchCriteria, operator: value })}
                                    value={searchCriteria.operator}
                                    className="w-full"
                                    containerClassName="flex flex-col gap-1"
                                    inputClassName="bg-lightContainer dark:!bg-darkContainerPrimary border border-gray-200 dark:border-white/10"
                                    label={intl("Method")}
                                />
                            </RenderCase>

                            {fields.map(({ label, label_value, type, dropdownPosition, options, select_type }: DetailFields) => (
                                <RenderCase condition={searchCriteria.field[0] === label_value}>
                                    <CustomInputField
                                        id={label}
                                        key={label}
                                        type={type ?? "text"}
                                        dropdownPosition={dropdownPosition}
                                        options={options}
                                        value={searchCriteria.value}
                                        select_type={select_type}
                                        isClearable={false}
                                        setValue={(value: string | string[]) => setSearchCriteria({ ...searchCriteria, value: value })}
                                        containerClassName="col-span-2 flex flex-col gap-1"
                                        className="w-full"
                                        inputClassName="bg-lightContainer dark:!bg-darkContainerPrimary border border-gray-200 dark:border-white/10"
                                        label={intl("Value")}
                                    />
                                </RenderCase>
                            ))}
                        </div>
                        <Container className="sticky bottom-0 w-full p-2 !rounded-none flex gap-1.5">
                            <CustomButton
                                onClick={handleSubmitSearch}
                                version="1"
                                color={searchCriteria.value && searchCriteria?.value !== "" ? "error" : "gray"}
                                disabled={!(searchCriteria.value && searchCriteria?.value !== "")}
                                className={`linear w-full rounded-md h-10 text-base font-medium text-white transition duration-200 
                                ${searchCriteria.value && searchCriteria?.value !== "" ? "!bg-red-500 dark:!bg-red-500" : ""}
                                dark:text-white dark:hover:bg-red-400 dark:active:bg-red-300 flex justify-center place-items-center`}
                            >
                                {searchCriteria.value ? intl("Search") : intl("Disable")}
                            </CustomButton>
                        </Container>
                    </div>
                </DetailPopup>
            </RenderCase>
        </>
    );
};

export default SearchPopUp;