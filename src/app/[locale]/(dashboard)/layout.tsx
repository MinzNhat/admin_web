import DashboardLayout from "@/layouts/DashboardLayout";

const Dashboard = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <section className="h-screen w-screen bg-lightPrimary dark:bg-darkContainerPrimary relatived">
            <DashboardLayout>
                {children}
            </DashboardLayout>
        </section>
    );
}

export default Dashboard;