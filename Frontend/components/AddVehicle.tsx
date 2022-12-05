import {
  Button,
  Container,
  Heading,
  Input,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const AddVehicle = ({ setComponentName }: any) => {
  const toast = useToast();
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
  const AddGaddi = async () => {
    try {
      const Response = await axios.post(
        "http://localhost:8010/proxy/api/vehicles",
        vehicleData
      );
      console.log({ Response });
      toast({ title: "Car Successfully Added" });
      setComponentName("home");
    } catch (x) {
      toast({ title: "Error", status: "error" });
    }
  };
  return (
    <Container>
      <Heading>ADD PORTAL</Heading>
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
      <Button colorScheme="twitter" mt={2} onClick={() => AddGaddi()}>
        {" "}
        Add Vehicle
      </Button>
      <Button ml={2} mt={2} onClick={() => setComponentName("home")}>
        {" "}
        Go Back
      </Button>
    </Container>
  );
};
export default AddVehicle;
