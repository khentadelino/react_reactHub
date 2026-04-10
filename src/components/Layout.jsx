import { Outlet } from "react-router-dom";
import SideFooter from "./SideFooter";
import TopNav from "./TopNav";

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#080810] text-white flex overflow-hidden">
      <SideFooter />

      <div className="flex-1 flex flex-col ml-14">
        <TopNav />
        <main className="flex-1 overflow-y-auto relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
