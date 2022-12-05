import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  MenuProvider,
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
  useSafeLayoutEffect,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

const BookCar = ({ setComponentName, user }: any) => {
  const [ogArray, setogArray] = useState<any>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [allVehciles, setAllVehicles] = useState<any>([]);
  const [reRender, setRerender] = useState(false);
  const [model, setModel] = useState("");
  const [capacity, setCapacity] = useState("");
  const [cost, setCost] = useState(0);
  const [disb, setDisb] = useState(true);
  useEffect(() => {
    if (cost > 0) {
      setDisb(false);
    } else {
      setDisb(true);
    }
  }, [cost]);
  const [selectedCar, setCarSelected] = useState({
    v_mileage: 0,
    v_class: "",
    v_model: "",
    v_manufacturer: "",
    v_capacity: 0,
    v_condition: 0,
    v_description: "",
    v_availability_status: true,
  });
  const [vclass, setClass] = useState("");
  const [startDate, setStart] = useState("");
  const [endDate, setEnd] = useState("");
  const toast = useToast();
  useEffect(() => {
    const starter = startDate.split("-");
    const ender = endDate.split("-");
    let years = parseInt(ender[0]) - parseInt(starter[0]);
    let months = parseInt(ender[1]) - parseInt(starter[1]);
    let days = parseInt(ender[2]) - parseInt(starter[2]);

    if (parseInt(ender[1]) < parseInt(starter[1])) {
      years -= 1;
    } else if (days < 0) {
      years -= 1;
    }

    if (months < 0) {
      months = 12 + months;
      if (parseInt(ender[2]) < parseInt(starter[2])) {
        months -= 1;
      }
    }
    if (days < 0) {
      days = 30 + parseInt(ender[2]) - parseInt(starter[2]);
    }
    console.log({ years, months, days });
    let newCost = years * 365;
    newCost += months * 30;
    newCost += days;
    setCost(newCost * 300);
  }, [startDate, endDate]);
  useEffect(() => {
    let newResult = ogArray;
    if (vclass !== "") {
      newResult = newResult.filter(
        (v: any) => v.v_class.toLowerCase() === vclass.toLowerCase()
      );
    }
    if (model !== "") {
      newResult = newResult.filter((v: any) => v.v_model == model);
    }
    if (capacity !== "") {
      newResult = newResult.filter((v: any) => v.v_capacity == capacity);
    }
    setAllVehicles(newResult);
    // if (vclass !== "") filterclass();
    // if (model !== "") filtermodel();
    // if (capacity !== "") filtercapacity();
  }, [vclass, capacity, model]);

  useEffect(() => {
    const getVehicles = async () => {
      const { data }: any = await axios.get(
        "http://localhost:8010/proxy/api/vehicles"
      );
      let vehicles = data._embedded.vehicles;
      setAllVehicles(vehicles);
      setogArray(vehicles);
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
          booking_start_date: startDate,
          booking_end_date: endDate,
          cost: cost,
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
      <Box>
        <Heading>Book A Car</Heading>
        <Flex>
          <Input
            onChange={({ target }) => setModel(target.value)}
            mb={2}
            placeholder="model"
          />
          <Input
            onChange={({ target }) => setCapacity(target.value)}
            ml={2}
            mb={2}
            placeholder="capacity"
          />
          <Input
            onChange={({ target }) => setClass(target.value)}
            ml={2}
            mb={2}
            placeholder="class"
          />
        </Flex>
      </Box>
      <Box>
        <Table variant="stiped">
          <Tr>
            <Th style={{ border: "1px solid black" }}>Mileage</Th>
            <Th style={{ border: "1px solid black" }}>Class</Th>
            <Th style={{ border: "1px solid black" }}>Model</Th>
            <Th style={{ border: "1px solid black" }}>Manufacturer</Th>
            <Th style={{ border: "1px solid black" }}>Capacity</Th>
            <Th style={{ border: "1px solid black" }}>Condition</Th>
            <Th style={{ border: "1px solid black" }}>Description</Th>
            <Th style={{ border: "1px solid black" }}>Availability_status</Th>
            <Th style={{ border: "1px solid black" }}>Actions</Th>
          </Tr>
          {allVehciles.map((vehicle: any, id: any) => (
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
                      setCarSelected(vehicle);
                      onOpen();
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
      {
        //-------
      }
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedCar.v_manufacturer}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Divider mb={5} />
            <Text>Mileage: {selectedCar.v_mileage}</Text>
            <Text>Class: {selectedCar.v_class}</Text>
            <Text>Model: {selectedCar.v_model}</Text>
            <Text>Capacity: {selectedCar.v_capacity}</Text>
            <Text>Condition: {selectedCar.v_condition}</Text>
            <Text>Description: {selectedCar.v_description}</Text>
            <Divider my={5} />
            <Text>Start Date</Text>
            <Input
              value={startDate}
              onChange={({ target }) => {
                setStart(target.value);
                console.log(target.value);
              }}
              type="date"
            />
            <Text>End Date</Text>
            <Input
              value={endDate}
              onChange={({ target }) => setEnd(target.value)}
              type="date"
            />
            <Divider my={5} />
            <Text>Cost: {cost}</Text>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => {
                //@ts-ignore
                const carid = selectedCar._links.vehicle.href.split("/").at(-1);
                BookCar(carid);
                onClose();
              }}
              colorScheme="green"
              mr={3}
              isDisabled={disb}
            >
              Book
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
export default BookCar;
