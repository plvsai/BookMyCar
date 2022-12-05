import { Card, CardBody, CardHeader } from "@chakra-ui/card";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import Router from "next/router";
import { useState } from "react";
import AddAdmin from "./AddAdmin";
import AddVehicle from "./AddVehicle";
import AdminReports from "./AdminReports";
import BookCar from "./BookCar";
import EditVehicle from "./EditVehicle";
import UserVerification from "./UserVerification";
import ViewBookings from "./ViewBookings";
import ViewComplaints from "./ViewComplaints";

const AdminHomePage = ({ user }: any) => {
  const [componentName, setComponentName] = useState("home");
  return (
    <Container ml={0} p={5}>
      {componentName === "home" && (
        <>
          <Box>
            {/* <Heading>RANK: ADMIN</Heading> */}
            {/* <Text>Name:{user.name}</Text>
            <Text>Email:{user.email_id}</Text>
            <Text>Age:{user.age}</Text> */}
            <Card my={5} bg="blue.100" p={5} rounded="lg">
              <CardHeader>
                <Heading textAlign="center" size="md">
                  ADMIN
                </Heading>
              </CardHeader>

              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Name
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {user.name}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Email
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {user.email_id}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Age
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {user.age}
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          </Box>
          <Flex flexDir="column">
            <Button
              onClick={() => setComponentName("addv")}
              mt="5px"
              colorScheme="twitter"
            >
              Add Vehicle
            </Button>
            <Button
              onClick={() => setComponentName("editv")}
              mt="5px"
              colorScheme="twitter"
            >
              Edit Vehicle
            </Button>
            <Button
              onClick={() => setComponentName("retrc")}
              mt="5px"
              colorScheme="twitter"
            >
              Retrieve Complaints
            </Button>
            <Button
              onClick={() => setComponentName("uvp")}
              mt="5px"
              colorScheme="twitter"
            >
              User Verification Portal
            </Button>
            <Button
              onClick={() => setComponentName("adda")}
              mt="5px"
              colorScheme="twitter"
            >
              Add An Admin
            </Button>
            <Button
              onClick={() => setComponentName("viewv")}
              mt="5px"
              colorScheme="twitter"
            >
              View Reports
            </Button>
            <Button
              mt="5px"
              onClick={() => Router.reload()}
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
      {componentName === "adda" && (
        <AddAdmin setComponentName={setComponentName} />
      )}
      {componentName === "viewv" && (
        <AdminReports setComponentName={setComponentName} />
      )}
    </Container>
  );
};
export default AdminHomePage;
