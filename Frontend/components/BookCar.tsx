import { Box, Button, Heading, useSafeLayoutEffect } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

const BookCar = ({ setComponentName }: any) => {
  const [allVehciles, setAllVehicles] = useState([]);
  useEffect(() => {
    const getVehicles = async () => {
      const { data }: any = await axios.get(
        "http://localhost:8010/proxy/api/vehicles"
      );
      let vehicles = data._embedded.vehicles;
      setAllVehicles(vehicles);
    };
    getVehicles();
  }, []);
  return (
    <>
      <Button colorScheme="twitter" onClick={() => setComponentName("home")}>
        Go Back
      </Button>
      <Heading>User Bookings</Heading>
      <Box>
        <table>
          <tr>
            <th style={{ border: "1px solid black" }}>v_mileage</th>
            <th style={{ border: "1px solid black" }}>v_class</th>
            <th style={{ border: "1px solid black" }}>v_model</th>
            <th style={{ border: "1px solid black" }}>v_manufacturer</th>
            <th style={{ border: "1px solid black" }}>v_capacity</th>
            <th style={{ border: "1px solid black" }}>v_condition</th>
            <th style={{ border: "1px solid black" }}>v_description</th>
            <th style={{ border: "1px solid black" }}>v_availability_status</th>
            <th style={{ border: "1px solid black" }}>Actions</th>
          </tr>
          {allVehciles.map((vehicle: any, id) => (
            <tr key={id}>
              <th style={{ border: "1px solid black" }}>{vehicle.v_mileage}</th>
              <th style={{ border: "1px solid black" }}>{vehicle.v_class}</th>
              <th style={{ border: "1px solid black" }}>{vehicle.v_model}</th>
              <th style={{ border: "1px solid black" }}>
                {vehicle.v_manufacturer}
              </th>
              <th style={{ border: "1px solid black" }}>
                {vehicle.v_capacity}
              </th>
              <th style={{ border: "1px solid black" }}>
                {vehicle.v_condition}
              </th>
              <th style={{ border: "1px solid black" }}>
                {vehicle.v_description}
              </th>
              <th style={{ border: "1px solid black" }}>
                {vehicle.v_availability_status ? "YES" : "NO"}
              </th>
              <th style={{ border: "1px solid black" }}>
                {vehicle.v_availability_status && (
                  <Button colorScheme="twitter">Book</Button>
                )}
              </th>
            </tr>
          ))}
        </table>
      </Box>
    </>
  );
};
export default BookCar;
