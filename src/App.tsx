import { useState, useEffect } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Result from "./components/Result";

interface Ticket {
  id: number;
  title: string;
  description: string;
  priority: string;
}

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTicketId, setCurrentTicketId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
  });

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = () => {
    fetch("http://localhost:3000/tickets")
      .then((response) => response.json())
      .then((data) => setTickets(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleEditClick = (ticket: Ticket) => {
    setIsEditing(true);
    setCurrentTicketId(ticket.id);
    setFormData({
      title: ticket.title,
      description: ticket.description,
      priority: ticket.priority,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = isEditing
      ? `http://localhost:3000/tickets/${currentTicketId}`
      : "http://localhost:3000/tickets";

    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isEditing
            ? formData
            : {
                ...formData,
                id: tickets.length > 0 ? tickets[tickets.length - 1].id + 1 : 1,
              }
        ),
      });

      if (!response.ok)
        throw new Error("Network response was not ok, try again!");

      alert(`Ticket ${isEditing ? "updated" : "created"} successfully!`);
      setIsEditing(false);
      setCurrentTicketId(null);
      setFormData({ title: "", description: "", priority: "" });
      fetchTickets();
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Our server is down, please try again later.");
    }
  };

  return (
    <Container fluid>
      <Row className="justify-content-center mt-sm-5 body">
        <Col sm={10} md={8} className="bg-light rounded-2 shadow-sm pt-5 pb-5">
          <Form id="bugform" onSubmit={handleSubmit}>
            <Form.Group className="mb-3 shadow-sm" controlId="name">
              <Form.Label>Name the bug</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Project Name"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3 shadow-sm" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                as="textarea"
                placeholder="Project's description"
                rows={5}
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </Form.Group>

            <Card className="shadow-sm">
              <div className="text-center my-2">
                {["low", "medium", "high"].map((priority) => (
                  <Form.Check
                    key={priority}
                    inline
                    label={`${
                      priority.charAt(0).toUpperCase() + priority.slice(1)
                    } Priority`}
                    value={priority}
                    name="prioritygroup"
                    type="radio"
                    id={`priority-${priority}`}
                    required
                    checked={formData.priority === priority}
                    onChange={(e) =>
                      setFormData({ ...formData, priority: e.target.value })
                    }
                  />
                ))}
              </div>
            </Card>

            <div className="text-center">
              <Button
                className="mt-2 px-4"
                variant={isEditing ? "primary" : "success"}
                type="submit"
              >
                {isEditing ? "Update Ticket" : "Submit Ticket"}
              </Button>
              <Button
                className="mt-2 ms-2 px-4"
                variant="secondary"
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({ title: "", description: "", priority: "" });
                }}
              >
                Cancel
              </Button>
            </div>
          </Form>

          <div className="text-center mt-5">
            <h3>Result</h3>
            <Result tickets={tickets} onEditClick={handleEditClick} gettickets={fetchTickets} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
