import {
  Button,
  Container,
  Flex,
  Heading,
  Input,
  toast,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import Router from "next/router";
import { useState } from "react";

const LoginPage = ({
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
      "http://localhost:8010/proxy/api/customers"
    );
    const users: Array<{ email_id: string; password: string }> =
      data._embedded.customers;
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
      <Heading mb="10px" textAlign="center">
        User Login
      </Heading>
      <Input name="email_id" onChange={onFormDataChange} placeholder="email" />
      <Input
        mt="5px"
        name="password"
        onChange={onFormDataChange}
        placeholder="password"
        type="password"
      />
      <Flex flexDir="column">
        <Button mt="5px" onClick={() => loginTime()} colorScheme="blackAlpha">
          Login
        </Button>
        <Button
          mt="5px"
          colorScheme="twitter"
          onClick={() => setIsLogin(false)}
        >
          Signup
        </Button>
        <Button
          mt="5px"
          colorScheme="blackAlpha"
          onClick={() => Router.push("/admin")}
        >
          Admin Login
        </Button>
      </Flex>
    </Container>
  );
};
export default LoginPage;
