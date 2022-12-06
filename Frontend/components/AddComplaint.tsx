import {
  Button,
  Container,
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

const AddComplaint = ({ setComponentName, user }: any) => {
  const [complaint, setComplaint] = useState("Enter");
  const [userComplaints, setUserComplaints] = useState([]);
  const [value, setValue] = useState("");
  const [comments, setComments] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedComplaint, setselecComplaint] = useState({
    user_id: 1,
    complaint: "aksndaks",
  });
  useEffect(() => {
    const getComms = async () => {
      const { data }: any = await axios.get(
        "http://localhost:8010/proxy/api/comments"
      );
      let Comments = data._embedded.comments;
      const complaintId = selectedComplaint._links.complaints.href
        .split("/")
        .at(-1);
      Comments = Comments.filter(com => com.complaint_id == complaintId);
      setComments(Comments);
    };
    if (selectedComplaint.user_id === 1) {
      return;
    }
    getComms();
  }, [selectedComplaint]);
  const toast = useToast();
  const submitComplaint = async () => {
    const userId = user._links.customer.href.split("/").at(-1);
    try {
      const { data } = await axios.post(
        "http://localhost:8010/proxy/api/complaintses",
        {
          user_id: userId,
          complaint: complaint,
        }
      );
      toast({ title: "Success" });
      setComponentName("home");
    } catch (x) {
      toast({ title: "Error", status: "error" });
    }
  };
  useEffect(() => {
    const getComplaints = async () => {
      const userId = user._links.customer.href.split("/").at(-1);
      try {
        const { data } = await axios.get(
          "http://localhost:8010/proxy/api/complaintses"
        );

        const complaintss = data._embedded.complaintses;
        //console.log({ complaintss });
        const result = complaintss.filter(
          (complaint: any) => complaint.user_id == userId
        );
        setUserComplaints(result);
      } catch (x) {
        toast({ title: "Error", status: "error" });
      }
    };
    getComplaints();
  }, []);
  return (
    <Container>
      <Heading my={5}>Complaint Portal</Heading>
      <Textarea
        value={complaint}
        onChange={({ target }) => setComplaint(target.value)}
      />
      <Flex flexDir="column">
        <Button mt={5} colorScheme="twitter" onClick={() => submitComplaint()}>
          Submit Complaint
        </Button>
        <Button mt={2} onClick={() => setComponentName("home")}>
          Go Back
        </Button>
      </Flex>
      <Text fontWeight="semibold" my={5}>
        Previous Complaints
      </Text>
      <Table>
        <Tr>
          <Th style={{ border: "1px solid black" }}>User ID</Th>
          <Th style={{ border: "1px solid black" }}>Complaint</Th>
        </Tr>
        {userComplaints.map(comp => (
          <Tr>
            <Th style={{ border: "1px solid black" }}>{comp.user_id}</Th>
            <Th
              onClick={() => {
                setselecComplaint(comp);
                onOpen();
              }}
              _hover={{ bg: "blue.500" }}
              style={{ border: "1px solid black" }}
            >
              {comp.complaint}
            </Th>
          </Tr>
        ))}
      </Table>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Complaint Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Divider mb={5} />
            {/* <Text>Feedback:</Text> */}

            <Text p={2} bg="twitter.200" rounded="md">
              Original Complaint: {selectedComplaint.complaint}
            </Text>
            {comments.map(com => (
              <Text>{com.comment}</Text>
            ))}
            <Input
              value={value}
              onChange={({ target }) => setValue(target.value)}
              mt={2}
              placeholder="Add Comment"
            />
            <Divider my={5} />
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={async () => {
                //@ts-ignore
                const complaintId = selectedComplaint._links.complaints.href
                  .split("/")
                  .at(-1);
                try {
                  await axios.post("http://localhost:8010/proxy/api/comments", {
                    complaint_id: complaintId,
                    comment: `User: ${value}`,
                  });
                  toast({ title: "Done" });
                } catch (x) {
                  toast({
                    title: "Errorrrr",
                    status: "error",
                  });
                }
                onClose();
              }}
              colorScheme="green"
              mr={3}
            >
              Add Comment
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};
export default AddComplaint;
