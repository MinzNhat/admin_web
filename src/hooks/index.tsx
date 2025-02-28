"use client";

import Image from "next/image";
import { store } from "@/store";
import { useEffect } from "react";
import { Provider } from "react-redux";
import SidebarProvider from "./SidebarProvider";
import { LoadScript } from "@react-google-maps/api";
import overrideConsole from "@/utils/consoleOverride";
import { ScreenViewProvider } from "./ScreenViewProvider";
import { NotificationsProvider } from "./NotificationsProvider";
import { SubmitNotificationProvider } from "./SubmitNotificationProvider";
import { DefaultNotificationProvider } from "./DefaultNotificationProvider";

export const CustomLoadingElement = () => {
    return (
        <div className="w-screen h-screen flex flex-col gap-4 justify-center place-items-center bg-lightContainer bg-clip-border
            shadow-shadow-500 dark:!bg-darkContainer">
            <Image src="/Logo.png" alt="Your image" width={150} height={150} />
        </div>
    );
};

export default function ProviderWrapper({ children }: Readonly<{ children: React.ReactNode }>) {
    useEffect(() => {
        overrideConsole();
    }, []);

    return (
        <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? ""}
            libraries={["places"]}
            loadingElement={<CustomLoadingElement />}
        >
            <Provider store={store}>
                <ScreenViewProvider>
                    <NotificationsProvider>
                        <SubmitNotificationProvider>
                            <DefaultNotificationProvider>
                                <SidebarProvider>
                                    {children}
                                </SidebarProvider>
                            </DefaultNotificationProvider>
                        </SubmitNotificationProvider>
                    </NotificationsProvider>
                </ScreenViewProvider>
            </Provider>
        </LoadScript>
    );
};