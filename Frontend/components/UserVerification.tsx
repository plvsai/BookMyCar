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
      "http://localhost:8010/proxy/api/customers"
    );
    const users = data._embedded.customers;
    setUsers(users);
  };
  const verifyUser = async usr => {
    const usrId = usr._links.customer.href.split("/").at(-1);
    console.log({ usrId });
    const response = await axios.patch(
      `http://localhost:8010/proxy/api/customers/${usrId}`,
      { verification_status: true }
    );
    console.log({ response });
    setRerender(!reRender);
  };
  return (
    <Container>
      <Heading>User Verification Portal</Heading>

      <Table>
        <Tr>
          <Th style={{ border: "1px solid black" }}>Name</Th>
          <Th style={{ border: "1px solid black" }}>Email</Th>
          <Th style={{ border: "1px solid black" }}>Age</Th>
          <Th style={{ border: "1px solid black" }}>Action</Th>
        </Tr>
        {users.map(
          usr =>
            !usr.verification_status && (
              <Tr>
                <Th style={{ border: "1px solid black" }}>{usr.email_id}</Th>
                <Th style={{ border: "1px solid black" }}>{usr.name}</Th>
                <Th style={{ border: "1px solid black" }}>{usr.age}</Th>
                <Th style={{ border: "1px solid black" }}>
                  <Button onClick={() => verifyUser(usr)}>Verify</Button>
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
