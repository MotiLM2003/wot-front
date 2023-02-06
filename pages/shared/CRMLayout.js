import { useEffect } from "react";
import Footer from "@components/CRM/Footer/Footer";
import Header from "@components/CRM/Header/Header";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Sidebar from "@components/CRM/Sidebar/Sidebar";
const Layout = ({ children, className = "" }) => {
  const router = useRouter();
  const { isLogged } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (!isLogged) {
      router.push("/");
    }
  }, [isLogged]);

  return !isLogged ? (
    "loading"
  ) : (
    <>
      <Header />
      <div className={`flex ${className} `}>
        <Sidebar />
        <div className="grow">
          <div className="">
            <div className="grow">{children}</div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
