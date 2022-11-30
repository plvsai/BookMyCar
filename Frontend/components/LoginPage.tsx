import { Button, Container, Input } from "@chakra-ui/react";
import axios from "axios";
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
      }
    }
    console.log({ result });
    // console.log({ users });
  };
  return (
    <Container>
      <Input name="email_id" onChange={onFormDataChange} placeholder="email" />
      <Input
        name="password"
        onChange={onFormDataChange}
        placeholder="password"
        type="password"
      />
      <Button onClick={() => loginTime()} colorScheme="blackAlpha">
        Login
      </Button>
      <Button colorScheme="twitter" onClick={() => setIsLogin(false)}>
        Signup
      </Button>
    </Container>
  );
};
export default LoginPage;
