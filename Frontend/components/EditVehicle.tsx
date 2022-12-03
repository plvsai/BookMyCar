import { Box, Button, Container, Input, Select, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

const EditVehicle = ({ setComponentName }: any) => {
  const [allVehciles, setAllVehicles] = useState([]);
  const [isEditMode, setEditMode] = useState(false);
  const [carId, setCarId] = useState(0);
  const [vehicleData, setVehicleData] = useState({
    v_mileage: 0,
    v_class: "",
    v_model: "",
    v_manufacturer: "",
    v_capacity: 0,
    v_condition: 0,
    v_description: "",
    v_availability_status: true,
  });
  const onChangeFunction = ({
    target,
  }: {
    target: { name: string; value: string };
  }) => {
    setVehicleData({
      ...vehicleData,
      [target.name]: target.value,
    });
  };
  useEffect(() => {
    const getVehicles = async () => {
      const { data }: any = await axios.get(
        "http://localhost:8010/proxy/api/vehicles"
      );
      let vehicles = data._embedded.vehicles;
      setAllVehicles(vehicles);
    };
    getVehicles();
  }, [isEditMode]);
  const moveToEdit = (gaddi: any) => {
    const carid = gaddi._links.vehicle.href.split("/").at(-1);
    setCarId(carid);
    setVehicleData({
      ...vehicleData,
      v_availability_status: gaddi.v_availability_status,
      v_capacity: gaddi.v_capacity,
      v_class: gaddi.v_class,
      v_condition: gaddi.v_condition,
      v_description: gaddi.v_description,
      v_manufacturer: gaddi.v_manufacturer,
      v_mileage: gaddi.v_mileage,
      v_model: gaddi.v_model,
    });
    setEditMode(true);
  };
  const editCar = async () => {
    const response = await axios.patch(
      `http://localhost:8010/proxy/api/vehicles/${carId}`,
      vehicleData
    );
    console.log({ response });
    setEditMode(false);
  };
  if (isEditMode)
    return (
      <Container>
        <Text>Mileage</Text>
        <Input
          name="v_mileage"
          onChange={onChangeFunction}
          value={vehicleData.v_mileage}
        />
        <Text>Class</Text>
        <Input
          name="v_class"
          onChange={onChangeFunction}
          value={vehicleData.v_class}
        />
        <Text>Model</Text>

        <Input
          name="v_model"
          onChange={onChangeFunction}
          value={vehicleData.v_model}
        />
        <Text>Manufacturer</Text>
        <Input
          name="v_manufacturer"
          onChange={onChangeFunction}
          value={vehicleData.v_manufacturer}
        />
        <Text>Capacity</Text>
        <Input
          name="v_capacity"
          onChange={onChangeFunction}
          value={vehicleData.v_capacity}
        />
        <Text>Condition</Text>
        <Input
          type="number"
          name="v_condition"
          onChange={onChangeFunction}
          value={vehicleData.v_condition}
        />
        <Text>Description</Text>
        <Input
          name="v_description"
          onChange={onChangeFunction}
          value={vehicleData.v_description}
        />
        <Text>Availibility</Text>
        <Select
          onChange={({ target }) => {
            target.value.toString() === "1"
              ? setVehicleData({
                  ...vehicleData,
                  v_availability_status: true,
                })
              : setVehicleData({
                  ...vehicleData,
                  v_availability_status: false,
                });
          }}
        >
          <option value="0">FALSE</option>
          <option value="1">TRUE</option>
        </Select>
        <Button onClick={() => editCar()}> Confirm Edit</Button>
      </Container>
    );
  return (
    <Container>
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
                {
                  <Button
                    colorScheme="twitter"
                    onClick={() => moveToEdit(vehicle)}
                  >
                    Edit
                  </Button>
                }
              </th>
            </tr>
          ))}
        </table>
      </Box>
      <Button onClick={() => setComponentName("home")}>Go Back</Button>
    </Container>
  );
};
export default EditVehicle;
