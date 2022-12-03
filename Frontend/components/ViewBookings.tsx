import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Th,
  Tr,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

const ViewBookings = ({ setComponentName, user }: any) => {
  const [bookings, setBookings] = useState([]);
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
    </>
  );
};
export default ViewBookings;
