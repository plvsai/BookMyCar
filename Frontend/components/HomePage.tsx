import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Router from "next/router";

import { Card, CardBody, CardHeader } from "@chakra-ui/card";
import { useEffect, useState } from "react";
import AddComplaint from "./AddComplaint";
import BookCar from "./BookCar";
import EditUser from "./EditUser";
import ViewBookings from "./ViewBookings";
import axios from "axios";

const HomePage = ({ user }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [type, setType] = useState("State ID");
  const [reRender, setReRender] = useState(false);
  const [verifValue, setVerifValue] = useState("");
  const [isApplied, setIsApplied] = useState(false);
  const [otherSpecified, setOtherSpecified] = useState("");
  useEffect(() => {
    const getVerifications = async () => {
      const userId = user._links.customer.href.split("/").at(-1);
      const { data } = await axios.get(
        "http://localhost:8010/proxy/api/verification_requests"
      );
      let verif_list = data._embedded.verification_requests;
      verif_list = verif_list.find((v: any) => v.user_id == userId);
      if (verif_list) {
        setIsApplied(true);
      }
    };
    getVerifications();
  }, [reRender]);
  const toast = useToast();
  const [userNotifications, setNotifications] = useState<
    Array<{ title: String; text: String }>
  >(new Array(0));
  const [componentName, setComponentName] = useState("home");
  useEffect(() => {
    const getNotifications = async () => {
      const userId = user._links.customer.href.split("/").at(-1);
      const { data }: any = await axios.get(
        "http://localhost:8010/proxy/api/notificationses"
      );
      const notifications = data._embedded.notificationses;
      const result = notifications.filter(
        (notification: any) => notification.user_id == userId
      );
      console.log(result);
      if (result) {
        setNotifications(result);
      }
    };
    getNotifications();
  }, [componentName]);

  useEffect(() => {
    console.log({ userNotifications });
  }, [userNotifications]);
  return (
    <Flex pt={10}>
      <Container w="full">
        {componentName === "home" && (
          <>
            <Card minW="max-content" bg="blue.100" p={5} rounded="lg">
              <CardHeader>
                <Heading color="twitter">User Home</Heading>
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

                    {user.verification_status ? (
                      <Text pt="2" fontSize="sm">
                        Verified
                      </Text>
                    ) : (
                      <Stack>
                        {isApplied ? (
                          <Text>Pending</Text>
                        ) : (
                          <>
                            <Text>Not Applied</Text>
                            <Button onClick={() => onOpen()} bg="twitter.300">
                              Apply Verification
                            </Button>
                          </>
                        )}
                      </Stack>
                    )}
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
      {componentName === "home" && (
        <Container bg="twitter.50" p={5} rounded="md">
          <Heading mb={4} size="md">
            Notifications
          </Heading>
          {userNotifications.map(noti => (
            <Box
              my={2}
              bg={noti.title === "Booking Cancelled" ? "red.200" : "green.200"}
              p={3}
              rounded="md"
            >
              <Text fontWeight="semibold" fontSize="lg">
                {noti.title}
              </Text>
              <Text>{noti.text}</Text>
            </Box>
          ))}
        </Container>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Verification Request</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Divider mb={5} />
            {/* <Text>Feedback:</Text> */}

            <Input
              onChange={({ target }) => setVerifValue(target.value)}
              value={verifValue}
              placeholder="value"
            />
            <Select
              value={type}
              onChange={({ target }) => setType(target.value)}
              mt={2}
            >
              <option value="State ID">State ID</option>
              <option value="License ID">License ID</option>
              <option value="SSN">SSN</option>
              <option value="Others">Others</option>
            </Select>
            {type === "Others" && (
              <Input
                mt={2}
                placeholder="Specifiy"
                value={otherSpecified}
                onChange={({ target }) => setOtherSpecified(target.value)}
              />
            )}
            {/* <Input
              value={value}
              onChange={({ target }) => setValue(target.value)}
              mt={2}
              placeholder="Add Comment"
            /> */}
            <Divider my={5} />
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={async () => {
                //@ts-ignore
                const userId = user._links.customer.href.split("/").at(-1);

                try {
                  await axios.post(
                    "http://localhost:8010/proxy/api/verification_requests",
                    {
                      user_id: userId,
                      type: otherSpecified === "" ? type : otherSpecified,
                      value: verifValue,
                      name: user.name,
                    }
                  );
                  toast({ title: "Done" });
                } catch (x) {
                  toast({
                    title: "Errorrrr",
                    status: "error",
                  });
                }
                setReRender(!reRender);
                onClose();
              }}
              colorScheme="green"
              mr={3}
            >
              Apply Verification
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
export default HomePage;
