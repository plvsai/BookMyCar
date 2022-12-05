//@ts-nocheck
import { Button, Container, Heading, Table, Th, Tr } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

const ViewComplaints = ({ setComponentName }: any) => {
  const [complaints, setComplaints] = useState([]);
  useEffect(() => {
    const getComplaints = async () => {
      const { data }: any = await axios.get(
        "http://localhost:8010/proxy/api/complaintses"
      );
      let Complaints = data._embedded.complaintses;
      setComplaints(Complaints);
    };
    getComplaints();
  }, []);
  return (
    <Container>
      <Heading my={5}>Complaints Section</Heading>
      <Table>
        <Tr>
          <Th color="blue.500" style={{ border: "1px solid black" }}>
            User ID
          </Th>
          <Th color="blue.500" style={{ border: "1px solid black" }}>
            Complaint
          </Th>
        </Tr>
        {complaints.map(comp => (
          <Tr>
            <Th style={{ border: "1px solid black" }}>{comp.user_id}</Th>
            <Th style={{ border: "1px solid black" }}>{comp.complaint}</Th>
          </Tr>
        ))}
      </Table>
      <Button mt={2} onClick={() => setComponentName("home")}>
        Back
      </Button>
    </Container>
  );
};
export default ViewComplaints;
