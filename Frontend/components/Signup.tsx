import {
  Button,
  Container,
  Input,
  toast,
  useTab,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const Signup = ({ setIsLogin }: { setIsLogin: Function }) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    email_id: "",
    password: "",
    name: "",
    age: 0,
  });
  const createUser = async () => {
    console.log({ formData });
    try {
      const Response = await axios.post(
        "http://localhost:8010/proxy/api/customers",
        formData
      );
      toast({ title: "user created" });
      console.log({ Response });
    } catch (x) {
      toast({ title: "error", status: "error" });
    }
  };
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
  return (
    <Container>
      <Input
        onChange={onFormDataChange}
        name="email_id"
        value={formData.email_id}
        placeholder="email"
        type="email"
      />
      <Input
        name="password"
        placeholder="password"
        value={formData.password}
        type="password"
        onChange={onFormDataChange}
      />
      <Input
        onChange={onFormDataChange}
        name="name"
        placeholder="name"
        value={formData.name}
      />
      <Input
        onChange={onFormDataChange}
        name="age"
        placeholder="age"
        type="number"
        value={formData.age}
      />
      <Button colorScheme="blackAlpha" onClick={() => createUser()}>
        Signup
      </Button>
      <Button colorScheme="twitter" onClick={() => setIsLogin(true)}>
        Login
      </Button>
    </Container>
  );
};
export default Signup;
