import Main from "./components/Main";
import Navbar from "./components/Navbar";
import { SidebarComponent } from "./components/Sidebar";

export default function Home() {
  return (
    <>
      <div className="flex flex-col">
        <Navbar></Navbar>
        <div className="flex items-center justify-center w-full h-screen">
          <SidebarComponent></SidebarComponent>
          <Main></Main>
        </div>
      </div>
    </>
  );
}
