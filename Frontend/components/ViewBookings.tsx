import { Box, Button, Heading } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

const ViewBookings = ({ setComponentName, user }: any) => {
  const [bookings, setBookings] = useState([]);
  const [reRender, setRerender] = useState(false);
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
  const delBooking = async (id: any) => {
    const { data }: any = await axios.delete(
      `http://localhost:8010/proxy/api/bookings/${id}`
    );
    console.log({ data });
    setRerender(!reRender);
  };
  return (
    <>
      <Button colorScheme="twitter" onClick={() => setComponentName("home")}>
        Go Back
      </Button>
      <Heading>User Bookings</Heading>
      <Box>
        <table>
          <tr>
            <th style={{ border: "1px solid black" }}>vehicle_id</th>
            <th style={{ border: "1px solid black" }}>booking_start_date</th>
            <th style={{ border: "1px solid black" }}>booking_end_date</th>
            <th style={{ border: "1px solid black" }}>cost</th>
            <th style={{ border: "1px solid black" }}>Status</th>
            <th style={{ border: "1px solid black" }}>Actions</th>
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
              <th style={{ border: "1px solid black" }}>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    const bookingId = booking._links.booking.href
                      .split("/")
                      .at(-1);
                    delBooking(bookingId);
                  }}
                >
                  Cancel
                </Button>
              </th>
            </tr>
          ))}
        </table>
      </Box>
    </>
  );
};
export default ViewBookings;
