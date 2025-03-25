import { OrdersOperation } from "@/services/main";
import { OrderImage } from "@/types/views/orders/orders-config";
import { getTokenFromCookie } from "@/utils/token";
import { useEffect, useState } from "react";

const ImageList = ({ images, noImage }: { images: OrderImage[], noImage: string }) => {
    const [fileUrls, setFileUrls] = useState<string[]>([]);
    const ordersOperation = new OrdersOperation();

    useEffect(() => {
        const fetchImages = async () => {
            const token = getTokenFromCookie();
            console.log("token", token)
            if (!token) return;

            const urls: string[] = [];
            for (const image of images) {
                try {
                    const response = await ordersOperation.downloadImage(image.id, token);
                    if (response.data) {
                        const blobUrl = URL.createObjectURL(response.data);
                        urls.push(blobUrl);
                    }
                } catch (err) {
                    console.log("Lỗi khi tải ảnh:", image.id, err);
                }
            }
            setFileUrls(urls); 
        };

        fetchImages();

        return () => {
            // Cleanup để tránh memory leak
            fileUrls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [images]);

    return (
        <div className="pl-4 pb-4">
            {fileUrls.map((url, index) => (
                <img key={index} src={url} alt={`Image ${index}`} className="w-32 h-32 object-cover rounded-md" />
            ))}
            {fileUrls.length === 0 &&
                noImage
            }
        </div>
    );
};

export default ImageList;
