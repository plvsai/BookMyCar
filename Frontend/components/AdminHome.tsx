import { Box, Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import Router from "next/router";
import { useState } from "react";
import AddVehicle from "./AddVehicle";
import BookCar from "./BookCar";
import EditVehicle from "./EditVehicle";
import UserVerification from "./UserVerification";
import ViewBookings from "./ViewBookings";
import ViewComplaints from "./ViewComplaints";

const AdminHomePage = ({ user }: any) => {
  const [componentName, setComponentName] = useState("home");
  return (
    <Container>
      {componentName === "home" && (
        <>
          <Box>
            <Heading>RANK: ADMIN</Heading>
            <Text>Name:{user.name}</Text>
            <Text>Email:{user.email_id}</Text>
            <Text>Age:{user.age}</Text>
          </Box>
          <Flex w="100%">
            <Button
              onClick={() => setComponentName("addv")}
              ml="5px"
              colorScheme="twitter"
            >
              Add Vehicle
            </Button>
            <Button
              onClick={() => setComponentName("editv")}
              ml="5px"
              colorScheme="twitter"
            >
              Edit Vehicle
            </Button>
            <Button
              onClick={() => setComponentName("retrc")}
              ml="5px"
              colorScheme="twitter"
            >
              Retrieve Complaints
            </Button>
            <Button
              onClick={() => setComponentName("uvp")}
              ml="5px"
              colorScheme="twitter"
            >
              User Verification Portal
            </Button>
            <Button
              onClick={() => Router.reload()}
              mt="2px"
              colorScheme="twitter"
            >
              Sign Out
            </Button>
          </Flex>
        </>
      )}
      {componentName === "addv" && (
        <AddVehicle setComponentName={setComponentName} />
      )}
      {componentName === "uvp" && (
        <UserVerification setComponentName={setComponentName} />
      )}
      {componentName === "editv" && (
        <EditVehicle setComponentName={setComponentName} />
      )}
      {componentName === "retrc" && (
        <ViewComplaints setComponentName={setComponentName} />
      )}
    </Container>
  );
};
export default AdminHomePage;
