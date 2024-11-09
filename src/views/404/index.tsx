import Link from "next/link";
import { useTranslations } from "next-intl";
import DashboardLayout from "@/layouts/DashboardLayout";
import CustomButton from "@/components/button";

const NotFoundContent = () => {
    const intl = useTranslations("NotFound")
    return (
        <DashboardLayout>
            <div className='h-full w-full flex justify-center place-items-center text-center flex-col gap-2'>
                <h2 className='text-xl font-bold'>{intl("Title")}</h2>
                <p className="pb-2">{intl("Subtitle")}</p>
                <Link href="/orders">
                    <CustomButton color="error">
                        {intl("Goback")}
                    </CustomButton>
                </Link>
            </div>
        </DashboardLayout>
    );
}

export default NotFoundContent;