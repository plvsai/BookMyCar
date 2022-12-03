import { Button, Container } from "@chakra-ui/react";
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
      <table>
        <tr>
          <th style={{ border: "1px solid black" }}>User ID</th>
          <th style={{ border: "1px solid black" }}>Complaint</th>
        </tr>
        {complaints.map(comp => (
          <tr>
            <th style={{ border: "1px solid black" }}>{comp.user_id}</th>
            <th style={{ border: "1px solid black" }}>{comp.complaint}</th>
          </tr>
        ))}
      </table>
      <Button onClick={() => setComponentName("home")}>Back</Button>
    </Container>
  );
};
export default ViewComplaints;
