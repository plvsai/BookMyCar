import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Table,
  Text,
  Textarea,
  Th,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

const ViewBookings = ({ setComponentName, user }: any) => {
  const [bookings, setBookings] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [stars, setStars] = useState("1");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedBooking, setBooking] = useState({
    user_id: 1,
    vehicle_id: 1,
    booking_start_date: "",
    booking_end_date: "endDate",
    status: "NOT COMPLETED",
  });
  const [reRender, setRerender] = useState(false);

  const toast = useToast();
  useEffect(() => {
    const getBookings = async () => {
      const { data }: any = await axios.get(
        "http://localhost:8010/proxy/api/bookings"
      );
      let Bookings = data._embedded.bookings;
      const userId = user._links.customer.href.split("/").at(-1);
      Bookings = Bookings.filter((booking: any) => booking.user_id == userId);
      console.log({ Bookings });
      setBookings(Bookings);
      console.log({ userId });
    };
    getBookings();
  }, [reRender]);
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

    setRerender(!reRender);
  };
  return (
    <>
      <Heading>User Bookings</Heading>
      <Box>
        <Table>
          <Tr>
            <Th style={{ border: "1px solid black" }}>vehicle_id</Th>
            <Th style={{ border: "1px solid black" }}>booking_start_date</Th>
            <Th style={{ border: "1px solid black" }}>booking_end_date</Th>
            <Th style={{ border: "1px solid black" }}>cost</Th>
            <Th style={{ border: "1px solid black" }}>Status</Th>
            <Th style={{ border: "1px solid black" }}>Actions</Th>
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
              <Th style={{ border: "1px solid black" }}>{booking.status}</Th>
              <Th style={{ border: "1px solid black" }}>
                {booking.status === "complete" && (
                  <Button
                    colorScheme="twitter"
                    onClick={() => {
                      setBooking(booking);
                      onOpen();
                    }}
                  >
                    Give Feedback
                  </Button>
                )}
                {booking.status === "NOT COMPLETED" && (
                  <Button
                    colorScheme="red"
                    onClick={() => {
                      const bookingId = booking._links.booking.href
                        .split("/")
                        .at(-1);
                      delBooking(bookingId, booking.vehicle_id);
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </Th>
            </Tr>
          ))}
        </Table>
        <Flex justify="center" align="center">
          <Button
            width="100%"
            mt="5px"
            colorScheme="twitter"
            onClick={() => setComponentName("home")}
          >
            Go Back
          </Button>
        </Flex>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Review For Vehicle ID: {selectedBooking.vehicle_id}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Divider mb={5} />
            <Text>Feedback:</Text>
            <Textarea
              value={feedback}
              onChange={({ target }) => setFeedback(target.value)}
            />
            <Text>Rating</Text>
            <Select
              onChange={({ target }) => {
                setStars(target.value);
              }}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Select>
            <Divider my={5} />
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={async () => {
                //@ts-ignore
                const bookingId = selectedBooking._links.booking.href
                  .split("/")
                  .at(-1);
                try {
                  await axios.post("http://localhost:8010/proxy/api/reviews", {
                    booking_id: bookingId,
                    review_text: feedback,
                    stars: stars,
                  });
                  toast({ title: "Done" });
                } catch (x) {
                  toast({
                    title: "You Have Already Reviewed This Car",
                    status: "error",
                  });
                }
                onClose();
              }}
              colorScheme="green"
              mr={3}
            >
              Review
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ViewBookings;
