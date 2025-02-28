"use client";

import { RootState } from "@/store";
import { Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import DetailPopup from "@/components/popup";
import RenderCase from "@/components/render";
import darkTheme from "@/maptheme/dark.json";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FiZoomIn, FiZoomOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, MarkerF, DirectionsRenderer, OverlayViewF, OverlayView } from "@react-google-maps/api";

type Props = {
    openMap: boolean;
    setOpenMap: React.Dispatch<React.SetStateAction<boolean>>;
    journey?: string[][];
};

const MapPopup = ({ openMap, setOpenMap, journey }: Props) => {
    const dispatch = useDispatch();
    const intl = useTranslations("TasksRoute");
    const locale = useSelector((state: RootState) => state.language.locale);
    const [map, setMap] = React.useState<google.maps.Map | null>(null);
    const theme = useSelector((state: { theme: ThemeState }) => state.theme.theme);
    const [directionRoutePoints, setDirectionRoutePoints] = useState<google.maps.DirectionsResult | null>(null);

    const center = {
        lat: 10.816360162758764,
        lng: 106.62860159222816,
    };

    const containerStyle = {
        width: "100%",
        height: "100%",
    };

    const mapOptions = {
        disableDefaultUI: true,
        minZoom: 4,
        maxZoom: 18,
        styles: theme == "dark" ? darkTheme : null,
    };

    const onLoad = useCallback((mapInstance: google.maps.Map) => {
        setMap(mapInstance);
    }, []);

    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);

    const zoomIn = useCallback(() => {
        if (map) {
            const currentZoom = map.getZoom();
            if (currentZoom !== undefined && currentZoom < 18) {
                map.setZoom(currentZoom + 1);
            }
        }
    }, [map]);

    const zoomOut = useCallback(() => {
        if (map) {
            const currentZoom = map.getZoom();
            if (currentZoom !== undefined && currentZoom > 4) {
                map.setZoom(currentZoom - 1);
            }
        }
    }, [map]);

    useEffect(() => {
        if (!journey || journey.length < 2 || !map) return;

        const directionsService = new google.maps.DirectionsService();
        const waypoints = journey.slice(1, journey.length - 1).map((point) => ({
            location: new google.maps.LatLng(parseFloat(point[0]), parseFloat(point[1])),
            stopover: true,
        }));

        directionsService.route(
            {
                origin: new google.maps.LatLng(parseFloat(journey[0][0]), parseFloat(journey[0][1])),
                destination: new google.maps.LatLng(parseFloat(journey[journey.length - 1][0]), parseFloat(journey[journey.length - 1][1])),
                waypoints,
                travelMode: google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    setDirectionRoutePoints(result);
                } else {
                    console.error("Directions request failed due to " + status);
                }
            }
        );
    }, [journey, map]);

    useEffect(() => {
        if (!openMap) {
            setDirectionRoutePoints(null);
        }
    }, [openMap]);

    return (
        <RenderCase condition={openMap}>
            <DetailPopup
                customWidth="w-full h-full"
                title={intl("journey")}
                onClose={() => setOpenMap(false)}
                icon={<FaMapMarkedAlt className="h-4 w-4" />}
                noPadding
            >
                <div className="relative w-full h-[calc(100dvh-56px)]">
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        options={mapOptions}
                        center={center}
                        zoom={7}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                    >
                        {journey && journey.map((point, index) => {
                            const position = {
                                lat: parseFloat(point[0]),
                                lng: parseFloat(point[1]),
                            };
                            return (
                                <MarkerF
                                    key={index}
                                    position={position}
                                    icon={{
                                        url: theme == "dark" ? "/placeHolder2.png" : "/placeHolder.png",
                                        scaledSize: new google.maps.Size(theme == "dark" ? 45 : 50, theme == "dark" ? 45 : 50),
                                    }}
                                >
                                    <OverlayViewF
                                        position={position}
                                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                                    >
                                        <div className="absolute top-2 right-0 translate-x-1/2 p-2 text-[#000000] dark:bg-[#3a3b3c] dark:text-gray-300 bg-white border-[#000000] border-2 dark:border-gray-300
                                        transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 shadow-xl rounded-xl font-semibold text-xs truncate w-fit">
                                            <p>{new Intl.DateTimeFormat(locale, {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                                hour: "numeric",
                                                minute: "numeric",
                                                second: "numeric"
                                            }).format(new Date(point[2])).replace(/^\w/, (c) => c.toUpperCase())}</p>
                                        </div>
                                    </OverlayViewF>
                                </MarkerF>
                            );
                        })}

                        {directionRoutePoints && <DirectionsRenderer
                            directions={directionRoutePoints}
                            options={{
                                suppressMarkers: true,
                                polylineOptions: {
                                    strokeColor: "#F53939",
                                    strokeWeight: 4,
                                },
                            }} />}

                        <div className="absolute bottom-8 right-5 flex gap-1 items-center flex-col">
                            <Button
                                className="linear mt-1 flex items-center justify-center gap-2 rounded-full bg-white !p-2 dark:text-white text-red-500 border-2 border-red-500 dark:border-white
                                transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-[#242526] dark:hover:opacity-90 dark:active:opacity-80 w-8 h-8 min-w-0 min-h-0 shadow-xl"
                                onPress={zoomIn}
                            >
                                <FiZoomIn />
                            </Button>
                            <Button
                                className="linear mt-1 flex items-center justify-center gap-2 rounded-full bg-white !p-2 dark:text-white text-red-500 border-2 border-red-500 dark:border-white
                                transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-[#242526] dark:hover:opacity-90 dark:active:opacity-80 w-8 h-8 min-w-0 min-h-0 shadow-xl"
                                onPress={zoomOut}
                            >
                                <FiZoomOut />
                            </Button>
                        </div>
                    </GoogleMap>
                </div>
            </DetailPopup>
        </RenderCase>
    );
};

export default MapPopup;