import { Button, Container, Heading, Input, useToast } from "@chakra-ui/react";
import axios from "axios";
import Router from "next/router";
import { useState } from "react";

const AdminLoginPage = ({
  setIsLogin,
  setLoggedIn,
  setUserData,
}: {
  setIsLogin: Function;
  setLoggedIn: Function;
  setUserData: Function;
}) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    email_id: "",
    password: "",
  });
  const onFormDataChange = ({
    target,
  }: {
    target: { name: string; value: string };
  }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };
  const loginTime = async () => {
    const { data }: any = await axios.get(
      "http://localhost:8010/proxy/api/admins"
    );
    const users: Array<{ email_id: string; password: string }> =
      data._embedded.admins;
    const result = users.find(user => user.email_id === formData.email_id);
    if (!!result) {
      if (result.password === formData.password) {
        setUserData(result);
        setLoggedIn(true);
      } else {
        toast({ title: "Invalid Email/Pass", status: "error" });
      }
    } else {
      toast({ title: "Invalid Email/Pass", status: "error" });
    }
    console.log({ result });
    // console.log({ users });
  };
  return (
    <Container>
      <Heading mb={5}>Admin Login</Heading>
      <Input name="email_id" onChange={onFormDataChange} placeholder="email" />
      <Input
        mt={2}
        name="password"
        onChange={onFormDataChange}
        placeholder="password"
        type="password"
      />
      <Button mt={5} onClick={() => loginTime()} colorScheme="blackAlpha">
        Login
      </Button>
      <Button
        ml="5px"
        mt={5}
        colorScheme="blackAlpha"
        onClick={() => Router.push("/")}
      >
        User Login
      </Button>
      {/* <Button colorScheme="twitter" onClick={() => setIsLogin(false)}>
        Signup
      </Button> */}
    </Container>
  );
};
export default AdminLoginPage;
