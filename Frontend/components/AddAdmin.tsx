import {
  Button,
  Container,
  Heading,
  Input,
  toast,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const AddAdmin = ({ setComponentName }: any) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    email_id: "",
    password: "",

    name: "",
    age: 0,
  });
  const createUser = async () => {
    try {
      console.log({ formData });
      const Response = await axios.post(
        "http://localhost:8010/proxy/api/admins",
        formData
      );
      toast({ title: "ADMIN CREATED" });
      setComponentName("home");
      console.log({ Response });
    } catch (x) {
      toast({ title: x, status: "error" });
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
      <Heading>Create Admin</Heading>
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
      <Button
        width="100%"
        colorScheme="blackAlpha"
        onClick={() => createUser()}
      >
        Create Admin
      </Button>
      <Button
        width="100%"
        mt="5px"
        colorScheme="twitter"
        onClick={() => setComponentName("home")}
      >
        Go Back
      </Button>
    </Container>
  );
};
export default AddAdmin;
