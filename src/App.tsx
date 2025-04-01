// import { useState } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Result from "./components/result";

function App() {
  const saveToServer = async (data: FormData) => {
    try {
      const response = await fetch("/tickets.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.get("name"),
          description: data.get("description"),
          priority: data.get("priority"),
        }),
      });
      if (!response.ok) throw new Error("Save failed");
      alert("Saved successfully");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save");
    }
  };

  return (
    <Container fluid>
      <Row className="justify-content-center mt-sm-5 body">
        <Col sm={10} md={8} className="bg-light rounded-2 shadow-sm pt-5 pb-5">
          <Form>
            <Form.Group
              className="mb-3 shadow-sm"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Name the bug</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group
              className="mb-3 shadow-sm"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={5} />
            </Form.Group>
            <Card className="shadow-sm">
              <div className="text-center my-2">
                <Form.Check
                  inline
                  label="Low Priority"
                  name="prioritygroup"
                  type="radio"
                  id={`inline-$radio-1`}
                />
                <Form.Check
                  inline
                  label="Medium Priority"
                  name="prioritygroup"
                  type="radio"
                  id={`inline-$radio-2`}
                />
                <Form.Check
                  inline
                  label="High Priority"
                  name="prioritygroup"
                  type="radio"
                  id={`inline-$radio-3`}
                />
              </div>
            </Card>
          </Form>

          <div className="text-center mt-5">
            <h3>Result</h3>
            <Result></Result>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
