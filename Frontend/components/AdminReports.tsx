import {
  Button,
  Container,
  Divider,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Text,
  Th,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

const AdminReports = ({ setComponentName }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [allUsers, setAllUsers] = useState([]);
  const [reRender, setReRender] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const toast = useToast();
  const [selectedUser, setUser] = useState({
    email_id: "",
    password: "",
    _links: {
      customer: {
        href: "asd/asd",
      },
    },
    name: "",
    age: 0,
  });
  const delBooking = async (id: any, vehicle_id: any) => {
    const { data }: any = await axios.delete(
      `http://localhost:8010/proxy/api/bookings/${id}`
    );
    console.log({ data });
    const response = await axios.patch(
      `http://localhost:8010/proxy/api/vehicles/${vehicle_id}`,
      {
        v_availability_status: true,
      }
    );
    toast({ title: "Success" });
    getBookings();
  };
  const completeBook = async (id: any, vehicle_id: any) => {
    const { data }: any = await axios.patch(
      `http://localhost:8010/proxy/api/bookings/${id}`,
      {
        status: "complete",
      }
    );
    console.log({ data });
    const response = await axios.patch(
      `http://localhost:8010/proxy/api/vehicles/${vehicle_id}`,
      {
        v_availability_status: true,
      }
    );
    toast({ title: "Success" });
    setReRender(!reRender);
    getBookings();
  };
  const getBookings = async () => {
    const { data }: any = await axios.get(
      "http://localhost:8010/proxy/api/bookings"
    );
    let Bookings = data._embedded.bookings;
    const userId = selectedUser._links.customer.href.split("/").at(-1);
    Bookings = Bookings.filter((booking: any) => booking.user_id == userId);
    //console.log({ Bookings });
    setBookings(Bookings);
    //--
    try {
      const { data } = await axios.get(
        "http://localhost:8010/proxy/api/reviews"
      );

      const reviewss = data._embedded.reviews;
      setReviews(reviewss);
    } catch (x) {
      toast({ title: "Error", status: "error" });
    }

    //console.log({ userId });
  };
  useEffect(() => {
    getBookings();
  }, [selectedUser, reRender]);
  const getUsers = async () => {
    const { data }: any = await axios.get(
      "http://localhost:8010/proxy/api/customers"
    );
    const users: Array<any> = data._embedded.customers;
    //@ts-ignore
    setAllUsers(users);
    // console.log({ users });
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <Container ml={0}>
      <Heading>Reports</Heading>
      <Table>
        <Tr>
          <Th style={{ border: "1px solid black" }}>Name</Th>
          <Th style={{ border: "1px solid black" }}>Email</Th>
          <Th style={{ border: "1px solid black" }}>Age</Th>
          <Th style={{ border: "1px solid black" }}>Action</Th>
        </Tr>
        {allUsers.map(usr => (
          <Tr>
            <Th style={{ border: "1px solid black" }}>{usr.email_id}</Th>
            <Th style={{ border: "1px solid black" }}>{usr.name}</Th>
            <Th style={{ border: "1px solid black" }}>{usr.age}</Th>
            <Th style={{ border: "1px solid black" }}>
              <Button
                onClick={() => {
                  setUser(usr);
                  onOpen();
                }}
              >
                View Bookings
              </Button>
            </Th>
          </Tr>
        ))}
      </Table>
      <Button
        colorScheme="twitter"
        mt={2}
        onClick={() => {
          setComponentName("home");
        }}
      >
        Go Back
      </Button>
      {/* //----- */}
      <Modal size="6xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>User: {selectedUser.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Divider mb={5} />
            <Table>
              <Tr>
                <Th color="blue.500" style={{ border: "1px solid black" }}>
                  vehicle_id
                </Th>
                <Th color="blue.500" style={{ border: "1px solid black" }}>
                  booking start date
                </Th>
                <Th color="blue.500" style={{ border: "1px solid black" }}>
                  booking end date
                </Th>
                <Th color="blue.500" style={{ border: "1px solid black" }}>
                  cost
                </Th>
                <Th color="blue.500" style={{ border: "1px solid black" }}>
                  Status
                </Th>
                <Th color="blue.500" style={{ border: "1px solid black" }}>
                  Actions
                </Th>
              </Tr>
              {bookings.map((booking: any, id) => (
                <Tr key={id}>
                  <Th style={{ border: "1px solid black" }}>
                    {booking.vehicle_id}
                  </Th>
                  <Th style={{ border: "1px solid black" }}>
                    {booking.booking_start_date}
                  </Th>
                  <Th style={{ border: "1px solid black" }}>
                    {booking.booking_end_date}
                  </Th>
                  <Th style={{ border: "1px solid black" }}>{booking.cost}</Th>
                  <Th style={{ border: "1px solid black" }}>
                    {booking.status}
                  </Th>
                  <Th style={{ border: "1px solid black" }}>
                    {booking.status === "complete" ? (
                      <>
                        {reviews.map(rev => {
                          const bookingId = booking._links.booking.href
                            .split("/")
                            .at(-1);
                          const userId = selectedUser._links.customer.href
                            .split("/")
                            .at(-1);
                          if (
                            rev.booking_id == bookingId &&
                            booking.user_id == userId
                          ) {
                            return (
                              <span>
                                <Text>Comment:{rev.review_text}</Text>
                                {/* <Text>Rating:{[...Array(parseInt(rev.stars)).map)]}</Text> */}
                                <Text>
                                  Rating:
                                  {Array.from(
                                    { length: parseInt(rev.stars) },
                                    (_, i) => "⭐️"
                                  )}
                                </Text>
                              </span>
                            );
                          }
                        })}
                      </>
                    ) : (
                      <>
                        <Button
                          colorScheme="red"
                          onClick={() => {
                            const bookingId = booking._links.booking.href
                              .split("/")
                              .at(-1);
                            delBooking(bookingId, booking.vehicle_id);
                          }}
                        >
                          Delete
                        </Button>
                        <Button
                          colorScheme="twitter"
                          ml={1}
                          onClick={() => {
                            const bookingId = booking._links.booking.href
                              .split("/")
                              .at(-1);
                            completeBook(bookingId, booking.vehicle_id);
                          }}
                        >
                          Set Complete
                        </Button>
                      </>
                    )}
                  </Th>
                </Tr>
              ))}
            </Table>
            <Divider my={5} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};
export default AdminReports;
