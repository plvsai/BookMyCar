import {
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Table,
  Text,
  Textarea,
  Th,
  Tr,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

const AddComplaint = ({ setComponentName, user }: any) => {
  const [complaint, setComplaint] = useState("Enter");
  const [userComplaints, setUserComplaints] = useState([]);
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
  useEffect(() => {
    const getComplaints = async () => {
      const userId = user._links.customer.href.split("/").at(-1);
      try {
        const { data } = await axios.get(
          "http://localhost:8010/proxy/api/complaintses"
        );

        const complaintss = data._embedded.complaintses;
        //console.log({ complaintss });
        const result = complaintss.filter(
          (complaint: any) => complaint.user_id == userId
        );
        setUserComplaints(result);
      } catch (x) {
        toast({ title: "Error", status: "error" });
      }
    };
    getComplaints();
  }, []);
  return (
    <Container>
      <Heading my={5}>Complaint Portal</Heading>
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
      <Text fontWeight="semibold" my={5}>
        Previous Complaints
      </Text>
      <Table>
        <Tr>
          <Th style={{ border: "1px solid black" }}>User ID</Th>
          <Th style={{ border: "1px solid black" }}>Complaint</Th>
        </Tr>
        {userComplaints.map(comp => (
          <Tr>
            <Th style={{ border: "1px solid black" }}>{comp.user_id}</Th>
            <Th style={{ border: "1px solid black" }}>{comp.complaint}</Th>
          </Tr>
        ))}
      </Table>
    </Container>
  );
};
export default AddComplaint;
