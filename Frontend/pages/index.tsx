//npx lcp --proxyUrl http://localhost:8080
import { Flex } from "@chakra-ui/react";
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
        <Flex justify="center" align="center" minH="50vh">
          <LoginPage
            setIsLogin={setIsLogin}
            setLoggedIn={setLoggedIn}
            setUserData={setUserData}
          />
        </Flex>
      );
    else return <Signup setIsLogin={setIsLogin} />;
  }
  return (
    <>
      <Flex align="center" minH="50vh">
        <HomePage user={userData} />
      </Flex>
    </>
  );
};

export default Home;
