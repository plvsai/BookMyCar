import {
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const AddComplaint = ({ setComponentName, user }: any) => {
  const [complaint, setComplaint] = useState("Enter");
  const toast = useToast();
  const submitComplaint = async () => {
    const userId = user._links.customer.href.split("/").at(-1);
    try {
      const { data } = await axios.post(
        "http://localhost:8010/proxy/api/complaintses",
        {
          user_id: userId,
          complaint: complaint,
        }
      );
      toast({ title: "Success" });
      setComponentName("home");
    } catch (x) {
      toast({ title: "Error", status: "error" });
    }
  };
  return (
    <Container>
      <Heading>Complaint Portal</Heading>
      <Textarea
        value={complaint}
        onChange={({ target }) => setComplaint(target.value)}
      />
      <Flex flexDir="column">
        <Button mt={5} colorScheme="twitter" onClick={() => submitComplaint()}>
          Submit Complaint
        </Button>
        <Button mt={2} onClick={() => setComponentName("home")}>
          Go Back
        </Button>
      </Flex>
    </Container>
  );
};
export default AddComplaint;
