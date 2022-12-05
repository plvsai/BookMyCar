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

import { Card, CardBody, CardHeader } from "@chakra-ui/card";
import { useState } from "react";
import AddComplaint from "./AddComplaint";
import BookCar from "./BookCar";
import EditUser from "./EditUser";
import ViewBookings from "./ViewBookings";

const HomePage = ({ user }: any) => {
  const [componentName, setComponentName] = useState("home");
  return (
    <Container ml={0}>
      {componentName === "home" && (
        <>
          <Heading color="twitter">User Home</Heading>

          <Card my={5} bg="blue.100" p={5} rounded="lg">
            <CardHeader>
              {/* <Heading size="md">User Home</Heading> */}
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
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Verification Status
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {user.verification_status ? "Verified" : "Pending"}
                  </Text>
                </Box>
              </Stack>
            </CardBody>
          </Card>
          <Flex flexDir="column">
            <Button
              onClick={() => setComponentName("editu")}
              mt="2px"
              colorScheme="twitter"
            >
              Update Profile
            </Button>
            {user.verification_status && (
              <>
                <Button
                  onClick={() => setComponentName("book")}
                  mt="2px"
                  colorScheme="twitter"
                >
                  Book Car
                </Button>
                <Button
                  onClick={() => setComponentName("view")}
                  mt="2px"
                  colorScheme="twitter"
                >
                  View Bookings
                </Button>
                <Button
                  onClick={() => setComponentName("addc")}
                  mt="2px"
                  colorScheme="twitter"
                >
                  Complaint
                </Button>
              </>
            )}
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
      {componentName === "view" && (
        <ViewBookings setComponentName={setComponentName} user={user} />
      )}
      {componentName === "book" && (
        <BookCar setComponentName={setComponentName} user={user} />
      )}
      {componentName === "addc" && (
        <AddComplaint setComponentName={setComponentName} user={user} />
      )}
      {componentName === "editu" && (
        <EditUser setComponentName={setComponentName} user={user} />
      )}
    </Container>
  );
};
export default HomePage;
