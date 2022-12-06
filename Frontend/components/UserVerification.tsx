//@ts-nocheck
import { Button, Container, Heading, Table, Th, Tr } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

const UserVerification = ({ setComponentName }: any) => {
  const [users, setUsers] = useState([]);
  const [reRender, setRerender] = useState(false);
  useEffect(() => {
    getUsersData();
  }, [reRender]);
  const getUsersData = async () => {
    const { data }: any = await axios.get(
      "http://localhost:8010/proxy/api/verification_requests"
    );
    const users = data._embedded.verification_requests;
    setUsers(users);
  };
  const verifyUser = async usr => {
    const verifId = usr._links.verification_request.href.split("/").at(-1);

    const response = await axios.patch(
      `http://localhost:8010/proxy/api/customers/${usr.user_id}`,
      { verification_status: true }
    );
    const onemore = await axios.post(
      "http://localhost:8010/proxy/api/notificationses",
      {
        user_id: usr.user_id,
        title: "Verification Confirmation",
        text: `Whop Whop! You Got verified!!`,
      }
    );
    const otwomore = await axios.delete(
      `http://localhost:8010/proxy/api/verification_requests/${verifId}`
    );
    console.log({ response });
    setRerender(!reRender);
  };
  const reject = async usr => {
    const verifId = usr._links.verification_request.href.split("/").at(-1);
    const otwomore = await axios.delete(
      `http://localhost:8010/proxy/api/verification_requests/${verifId}`
    );
    // console.log({ response });
    setRerender(!reRender);
  };
  return (
    <Container>
      <Heading>User Verification Portal</Heading>

      <Table>
        <Tr>
          <Th bg="blue.500" color="white" style={{ border: "1px solid black" }}>
            User ID
          </Th>
          <Th bg="blue.500" color="white" style={{ border: "1px solid black" }}>
            Name
          </Th>
          <Th bg="blue.500" color="white" style={{ border: "1px solid black" }}>
            Type
          </Th>
          <Th bg="blue.500" color="white" style={{ border: "1px solid black" }}>
            Value
          </Th>
          <Th bg="blue.500" color="white" style={{ border: "1px solid black" }}>
            Action
          </Th>
        </Tr>
        {users.map(
          usr =>
            !usr.verification_status && (
              <Tr>
                <Th style={{ border: "1px solid black" }}>{usr.user_id}</Th>
                <Th style={{ border: "1px solid black" }}>{usr.name}</Th>
                <Th style={{ border: "1px solid black" }}>{usr.type}</Th>
                <Th style={{ border: "1px solid black" }}>{usr.value}</Th>
                {/* <Th style={{ border: "1px solid black" }}>{usr.name}</Th> */}
                {/* <Th style={{ border: "1px solid black" }}>{usr.age}</Th> */}
                <Th style={{ border: "1px solid black" }}>
                  <Button onClick={() => verifyUser(usr)}>Verify</Button>
                  <Button colorScheme="red" mt={2} onClick={() => reject(usr)}>
                    Reject
                  </Button>
                </Th>
              </Tr>
            )
        )}
      </Table>
      <Button
        colorScheme="twitter"
        onClick={() => {
          setComponentName("home");
        }}
      >
        Go Back
      </Button>
    </Container>
  );
};
export default UserVerification;
