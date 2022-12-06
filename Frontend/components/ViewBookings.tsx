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
    const userId = user._links.customer.href.split("/").at(-1);
    const onemore = await axios.post(
      "http://localhost:8010/proxy/api/notificationses",
      {
        user_id: userId,
        title: "Booking Cancelled",
        text: `Booking ID: ${id} Cancelled`,
      }
    );
    toast({ title: "Success" });

    setRerender(!reRender);
  };
  return (
    <>
      <Heading>User Bookings</Heading>
      <Box>
        <table>
          <tr>
            <th
              style={{
                border: "1px solid black",
                padding: "10px",
                backgroundColor: "green",
                color: "white",
              }}
            >
              vehicle_id
            </th>
            <th
              style={{
                border: "1px solid black",
                padding: "10px",
                backgroundColor: "green",
                color: "white",
              }}
            >
              booking_start_date
            </th>
            <th
              style={{
                border: "1px solid black",
                padding: "10px",
                backgroundColor: "green",
                color: "white",
              }}
            >
              booking_end_date
            </th>
            <th
              style={{
                border: "1px solid black",
                padding: "10px",
                backgroundColor: "green",
                color: "white",
              }}
            >
              cost
            </th>
            <th
              style={{
                border: "1px solid black",
                padding: "10px",
                backgroundColor: "green",
                color: "white",
              }}
            >
              Status
            </th>
            <th
              style={{
                border: "1px solid black",
                padding: "10px",
                backgroundColor: "green",
                color: "white",
              }}
            >
              Actions
            </th>
          </tr>
          {bookings.map((booking: any, id) => (
            <tr key={id}>
              <th style={{ border: "1px solid black" }}>
                {booking.vehicle_id}
              </th>
              <th style={{ border: "1px solid black" }}>
                {booking.booking_start_date}
              </th>
              <th style={{ border: "1px solid black" }}>
                {booking.booking_end_date}
              </th>
              <th style={{ border: "1px solid black" }}>{booking.cost}</th>
              <th style={{ border: "1px solid black" }}>{booking.status}</th>
              <th style={{ border: "1px solid black", padding: "20px" }}>
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
              </th>
            </tr>
          ))}
        </table>
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
