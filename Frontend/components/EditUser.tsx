import {
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

const EditUser = ({ setComponentName, user }: any) => {
  const toast = useToast();
  const [usr, setUsr] = useState({
    email_id: "",
    name: "",
    password: "",
    age: 0,
  });
  useEffect(() => {
    setUsr({
      email_id: user.email_id,
      name: user.name,
      age: user.age,
      password: user.password,
    });
  }, []);
  const submitEdit = async () => {
    const userId = user._links.customer.href.split("/").at(-1);
    try {
      const { data } = await axios.patch(
        `http://localhost:8010/proxy/api/customers/${userId}`,
        usr
      );
      toast({ title: "Success" });
      setComponentName("home");
    } catch (x) {
      toast({ title: "Error", status: "error" });
    }
  };
  return (
    <Container>
      <Heading>Edit Profile</Heading>
      <Text>Email</Text>
      <Input
        value={usr.email_id}
        onChange={({ target }) => setUsr({ ...usr, email_id: target.value })}
      />
      <Text>Age</Text>
      <Input
        onChange={({ target }) =>
          setUsr({ ...usr, age: parseInt(target.value) })
        }
        type="number"
        value={usr.age}
      />
      <Text>Name</Text>
      <Input
        onChange={({ target }) => setUsr({ ...usr, name: target.value })}
        value={usr.name}
      />
      <Text>Password</Text>
      <Input
        onChange={({ target }) => setUsr({ ...usr, password: target.value })}
        type="password"
        value={usr.password}
      />
      <Flex justify="center" align="center">
        <Button w="100%" onClick={() => submitEdit()} colorScheme="twitter">
          Submit
        </Button>
        <Button w="100%" onClick={() => setComponentName("home")}>
          Back
        </Button>
      </Flex>
    </Container>
  );
};
export default EditUser;
