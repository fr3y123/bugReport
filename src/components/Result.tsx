import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

interface Ticket {
  id: number;
  title: string;
  description: string;
  priority: string;
}

interface ResultProps {
  tickets: Ticket[];
  onEditClick: (ticket: Ticket) => void;
  gettickets: () => void;
}

export default function Result({
  tickets,
  onEditClick,
  gettickets,
}: ResultProps) {
  const handleDelete = async (id: number) => {
    try {
      fetch("http://localhost:3000/tickets/" + id, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          // Optionally, you can refresh the ticket list here
          gettickets(); // Call the function to refresh the list
        })
        .catch((error) => {
          alert(
            "There was a problem with the fetch operation:" + error.message
          );
        });
      // You might want to add a callback to refresh the list here
    } catch (error) {
      console.error("Error deleting ticket:", error);
      alert("Failed to delete ticket");
    }
  };

  return (
    <Row className="justify-content-center px-2 px-sm-0 mt-5">
      {tickets.map((ticket) => (
        <Col
          key={ticket.id}
          sm={10}
          className="bg-light rounded-2 shadow-lg pt-4 pb-4 mb-4"
        >
          <div className="text-center">
            <h5>{ticket.title}</h5>
            <p>{ticket.description}</p>
            <p>Priority: {ticket.priority}</p>
          </div>
          <div className="text-center">
            <Button
              variant="danger"
              className="me-4"
              onClick={() => handleDelete(ticket.id)}
            >
              Delete
            </Button>
            <Button variant="primary" onClick={() => onEditClick(ticket)}>
              Edit Ticket
            </Button>
          </div>
        </Col>
      ))}
    </Row>
  );
}
