import { Outlet } from "react-router-dom"

export const RootLayout = () => {
    return (
        <div className=" hide-scrollbar root-layout h-screen min-h-screen w-full flex justify-center items-center">
            <section className="h-full w-full max-w-250">
                {<Outlet />}
            </section>
        </div>
    )
}