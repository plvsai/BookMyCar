//npx lcp --proxyUrl http://localhost:8080
import { ClientRequest } from "http";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import HomePage from "../components/HomePage";
import LoginPage from "../components/LoginPage";
import Signup from "../components/Signup";

const Home: NextPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  // const [statee, setStatee] = useState([]);
  // useEffect(() => {
  //   const GetData = async () => {
  //     const response = await fetch("http://localhost:8010/proxy/api/vehicles");
  //     const JSON = await response.json();
  //     console.log({ JSON });
  //     setStatee(JSON._embedded.vehicles);
  //   };
  //   GetData();
  // }, []);
  if (!loggedIn) {
    if (isLogin)
      return (
        <LoginPage
          setIsLogin={setIsLogin}
          setLoggedIn={setLoggedIn}
          setUserData={setUserData}
        />
      );
    else return <Signup setIsLogin={setIsLogin} />;
  }
  return (
    <>
      <HomePage user={userData} />
    </>
  );
};

export default Home;
