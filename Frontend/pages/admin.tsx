import { Container } from "@chakra-ui/react";
import { useState } from "react";
import AdminHomePage from "../components/AdminHome";
import AdminLoginPage from "../components/AdminLogin";

const Admin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  if (!loggedIn) {
    if (isLogin)
      return (
        <AdminLoginPage
          setIsLogin={setIsLogin}
          setLoggedIn={setLoggedIn}
          setUserData={setUserData}
        />
      );
    // else return <Signup setIsLogin={setIsLogin} />;
  }
  return (
    <>
      <AdminHomePage user={userData} />
    </>
  );
};
export default Admin;
