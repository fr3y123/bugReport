import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useEffect } from "react";
import { useState } from "react";

export default function Result() {
  interface Ticket {
    id: number;
    name: string;
    description: string;
    priority: string;
  }

  const [data, setData] = useState<Ticket[] | null>(null);

  useEffect(() => {
    fetch("/tickets.json")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!data) {
    return false;
  }

  return (
    <Row className="justify-content-center px-2 px-sm-0 mt-5">
      {data.map((ticket) => (
        <Col sm={10} className="bg-light rounded-2 shadow-lg pt-4 pb-4 mb-4">
          <div key={ticket.id} className="">
            <div className="text-center">
              <h5>{ticket.name}</h5>
              <p>{ticket.description}</p>
              <p>Priority: {ticket.priority}</p>
            </div>
            <div className="text-center">
              <button className="btn btn-primary">View Ticket</button>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
}
