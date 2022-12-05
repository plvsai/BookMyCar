import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  Select,
  Table,
  Text,
  Th,
  toast,
  Tr,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

const EditVehicle = ({ setComponentName }: any) => {
  const toast = useToast();
  const [allVehciles, setAllVehicles] = useState([]);
  const [reRender, setReRender] = useState(false);
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
  const moveToDelete = async (vehicle: any) => {
    const carid = vehicle._links.vehicle.href.split("/").at(-1);
    try {
      const response = await axios.delete(
        `http://localhost:8010/proxy/api/vehicles/${carid}`
      );
      console.log({ response });
      toast({ title: "Success" });
      setReRender(!reRender);
    } catch (x) {
      toast({ title: "Error", status: "error" });
    }
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
  }, [isEditMode, reRender]);
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
        <Table>
          <Tr>
            <Th bg="blue.500" color="white" border="1px solid black">
              Mileage
            </Th>
            <Th bg="blue.500" color="white" border="1px solid black">
              Class
            </Th>
            <Th bg="blue.500" color="white" border="1px solid black">
              Model
            </Th>
            <Th bg="blue.500" color="white" border="1px solid black">
              Manufacturer
            </Th>
            <Th bg="blue.500" color="white" border="1px solid black">
              Capacity
            </Th>
            <Th bg="blue.500" color="white" border="1px solid black">
              Condition
            </Th>
            <Th bg="blue.500" color="white" border="1px solid black">
              Description
            </Th>
            <Th bg="blue.500" color="white" border="1px solid black">
              Availability_status
            </Th>
            <Th bg="blue.500" color="white" border="1px solid black">
              Actions
            </Th>
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
                <Flex p={4}>
                  {
                    <Button
                      colorScheme="twitter"
                      onClick={() => moveToEdit(vehicle)}
                    >
                      Edit
                    </Button>
                  }
                  {
                    <Button
                      colorScheme="red"
                      ml={2}
                      onClick={() => moveToDelete(vehicle)}
                    >
                      Delete
                    </Button>
                  }
                </Flex>
              </Th>
            </Tr>
          ))}
        </Table>
      </Box>
      <Button mt={2} onClick={() => setComponentName("home")}>
        Go Back
      </Button>
    </Container>
  );
};
export default EditVehicle;
