import {
  Button,
  Container,
  Divider,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Table,
  Text,
  Textarea,
  Th,
  Tr,
  useDisclosure,
  useFocusEffect,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

const ViewComplaints = ({ setComponentName }: any) => {
  const [complaints, setComplaints] = useState([]);
  const toast = useToast();
  const [value, setValue] = useState("");
  const [comments, setComments] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedComplaint, setComplaint] = useState({
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
  useEffect(() => {
    const getComplaints = async () => {
      const { data }: any = await axios.get(
        "http://localhost:8010/proxy/api/complaintses"
      );
      let Complaints = data._embedded.complaintses;
      setComplaints(Complaints);
    };
    getComplaints();
  }, []);
  return (
    <Container>
      <Heading my={5}>Complaints Section</Heading>
      <Table>
        <Tr>
          <Th bg="blue.500" color="white" style={{ border: "1px solid black" }}>
            User ID
          </Th>
          <Th bg="blue.500" color="white" style={{ border: "1px solid black" }}>
            Complaint
          </Th>
        </Tr>
        {complaints.map(comp => (
          <Tr>
            <Th style={{ border: "1px solid black" }}>{comp.user_id}</Th>
            <Th
              onClick={() => {
                setComplaint(comp);
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
      <Button mt={2} onClick={() => setComponentName("home")}>
        Back
      </Button>
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
                    comment: `Admin: ${value}`,
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
export default ViewComplaints;
