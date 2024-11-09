"use client";

import { store } from "@/store";
import { Provider } from "react-redux";
import SidebarProvider from "./SidebarProvider";
import { ScreenViewProvider } from "./ScreenViewProvider";
import { NotificationsProvider } from "./NotificationsProvider";
import { SubmitNotificationProvider } from "./SubmitNotificationProvider";
import { DefaultNotificationProvider } from "./DefaultNotificationProvider";

export default function ProviderWrapper({ children }: Readonly<{ children: React.ReactNode }>) {

    return (
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
    );
};