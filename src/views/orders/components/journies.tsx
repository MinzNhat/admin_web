"use client";

import { useEffect, useState } from "react";
import { RootState } from "@/store";
import { LuBox } from "react-icons/lu";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import LoadingUI from "@/components/loading";
import { JourneyData } from "@/types/views/orders/orders-config";

const JourneyTimeline = ({ journey, order }: { journey?: JourneyData[], order?: boolean }) => {
    const intl = useTranslations("OrdersRoute");
    const locale = useSelector((state: RootState) => state.language.locale);
    const [translatedMessages, setTranslatedMessages] = useState<string[]>([]);

    useEffect(() => {
        if (!journey) return;

        const translateText = async (text: string, toLang: string) => {
            const url = `https://lingva.ml/api/v1/vi/${toLang}/${encodeURIComponent(text)}`;
            const response = await fetch(url);
            const data = await response.json();
            return data.translation || text;
        };

        const translateJourneyMessages = async () => {
            const translations = await Promise.all(journey.map(item => translateText(item.message, locale)));
            setTranslatedMessages(translations);
        };

        translateJourneyMessages();
    }, [journey, locale]);

    return (
        <div className="pl-4 pb-4">
            {journey ? (
                <ol className="relative border-s border-gray-200 dark:border-gray-500">
                    {journey.length !== 0 && journey.map((item, index) => (
                        <li key={index} className={`ms-6 ${order ? "mb-10" : (index === journey.length - 1 ? "-mb-4" : "mb-10")}`}>
                            <span className="absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 text-red-500 dark:text-white bg-red-100 dark:bg-red-500">
                                <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 1 1 0 2H5a1 1 0 1 1 0-2Z" />
                                </svg>
                            </span>
                            {index === 0 && (
                                <>
                                    <span className="absolute flex items-center justify-center w-2.5 h-2.5 bg-green-500 rounded-full start-2 animate-ping" />
                                    <span className="absolute flex items-center justify-center w-2.5 h-2.5 border-[1px] bg-green-500 dark:border-[#242526] border-white rounded-full start-2" />
                                </>
                            )}
                            <h3 className="flex items-center mb-1 pt-1 font-semibold text-gray-900 dark:text-white">
                                {translatedMessages[index] || item.message}
                            </h3>
                            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                {new Intl.DateTimeFormat(locale, {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                    second: "numeric"
                                }).format(new Date(item.time)).replace(/^\w/, (c) => c.toUpperCase())}
                            </time>
                        </li>
                    ))}
                    {order && (
                        <li className="ms-6">
                            <span className="absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 text-red-500 dark:text-white bg-red-100 dark:bg-red-500">
                                <LuBox />
                            </span>
                            {journey.length === 0 && (
                                <>
                                    <span className="absolute flex items-center justify-center w-2.5 h-2.5 bg-green-500 rounded-full start-2 animate-ping" />
                                    <span className="absolute flex items-center justify-center w-2.5 h-2.5 border-[1px] bg-green-500 dark:border-[#242526] border-white rounded-full start-2" />
                                </>
                            )}
                            <h3 className="flex items-center mb-1 pt-1 font-semibold text-gray-900 dark:text-white">{intl("CreateOrder")}</h3>
                        </li>
                    )}
                </ol>
            ) : (
                <div className="flex justify-center place-items-center w-full h-full gap-2 p-4 rounded-xl">
                    <LoadingUI />
                </div>
            )}
        </div>
    );
};

export default JourneyTimeline;