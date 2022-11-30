import { Box, Button, Container, Text } from "@chakra-ui/react";
import { useState } from "react";
import BookCar from "./BookCar";
import ViewBookings from "./ViewBookings";

const HomePage = ({ user }: any) => {
  const [componentName, setComponentName] = useState("home");
  return (
    <Container>
      <Box>
        <Text>Name:{user.name}</Text>
        <Text>Email:{user.email_id}</Text>
        <Text>Age:{user.age}</Text>
      </Box>
      {componentName === "home" && (
        <Box>
          <Button ml="2px" colorScheme="twitter">
            Update Profile
          </Button>
          <Button
            onClick={() => setComponentName("book")}
            ml="2px"
            colorScheme="twitter"
          >
            Book Car
          </Button>
          <Button
            onClick={() => setComponentName("view")}
            ml="2px"
            colorScheme="twitter"
          >
            View Bookings
          </Button>
        </Box>
      )}
      {componentName === "view" && (
        <ViewBookings setComponentName={setComponentName} user={user} />
      )}
      {componentName === "book" && (
        <BookCar setComponentName={setComponentName} />
      )}
    </Container>
  );
};
export default HomePage;
