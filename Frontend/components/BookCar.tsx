import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Th,
  Tr,
  useSafeLayoutEffect,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

const BookCar = ({ setComponentName, user }: any) => {
  const [allVehciles, setAllVehicles] = useState([]);
  const [reRender, setRerender] = useState(false);
  const toast = useToast();
  useEffect(() => {
    const getVehicles = async () => {
      const { data }: any = await axios.get(
        "http://localhost:8010/proxy/api/vehicles"
      );
      let vehicles = data._embedded.vehicles;
      setAllVehicles(vehicles);
    };
    getVehicles();
  }, [reRender]);
  const BookCar = async (carid: any) => {
    const userId = user._links.customer.href.split("/").at(-1);
    try {
      const { data } = await axios.post(
        "http://localhost:8010/proxy/api/bookings",
        {
          user_id: userId,
          vehicle_id: carid,
          booking_start_date: new Date().toISOString(),
          booking_end_date: null,
          status: "NOT COMPLETED",
        }
      );
      const response = await axios.patch(
        `http://localhost:8010/proxy/api/vehicles/${carid}`,
        {
          v_availability_status: false,
        }
      );
      toast({ title: "Success" });
      setRerender(!reRender);
    } catch (x) {
      toast({ title: "Error", status: "error" });
    }
  };
  return (
    <>
      <Flex>
        <Heading>Book A Car</Heading>
      </Flex>
      <Box>
        <Table variant="stiped">
          <Tr>
            <Th style={{ border: "1px solid black" }}>v_mileage</Th>
            <Th style={{ border: "1px solid black" }}>v_class</Th>
            <Th style={{ border: "1px solid black" }}>v_model</Th>
            <Th style={{ border: "1px solid black" }}>v_manufacturer</Th>
            <Th style={{ border: "1px solid black" }}>v_capacity</Th>
            <Th style={{ border: "1px solid black" }}>v_condition</Th>
            <Th style={{ border: "1px solid black" }}>v_description</Th>
            <Th style={{ border: "1px solid black" }}>v_availability_status</Th>
            <Th style={{ border: "1px solid black" }}>Actions</Th>
          </Tr>
          {allVehciles.map((vehicle: any, id) => (
            <Tr key={id}>
              <Th style={{ border: "1px solid black" }}>{vehicle.v_mileage}</Th>
              <Th style={{ border: "1px solid black" }}>{vehicle.v_class}</Th>
              <Th style={{ border: "1px solid black" }}>{vehicle.v_model}</Th>
              <Th style={{ border: "1px solid black" }}>
                {vehicle.v_manufacturer}
              </Th>
              <Th style={{ border: "1px solid black" }}>
                {vehicle.v_capacity}
              </Th>
              <Th style={{ border: "1px solid black" }}>
                {vehicle.v_condition}
              </Th>
              <Th style={{ border: "1px solid black" }}>
                {vehicle.v_description}
              </Th>
              <Th style={{ border: "1px solid black" }}>
                {vehicle.v_availability_status ? "YES" : "NO"}
              </Th>
              <Th style={{ border: "1px solid black" }}>
                {vehicle.v_availability_status && (
                  <Button
                    colorScheme="green"
                    onClick={() => {
                      const carid = vehicle._links.vehicle.href
                        .split("/")
                        .at(-1);
                      BookCar(carid);
                    }}
                  >
                    Book
                  </Button>
                )}
              </Th>
            </Tr>
          ))}
        </Table>
        <Button
          w="100%"
          my={5}
          ml={5}
          colorScheme="twitter"
          onClick={() => setComponentName("home")}
        >
          Go Back
        </Button>
      </Box>
    </>
  );
};
export default BookCar;
