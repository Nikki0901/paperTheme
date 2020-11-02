import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import { baseUrl } from "../../components/Service/Config";

const DealerShipList = () => {
  const [data, setData] = useState([]);

  const auth = JSON.parse(localStorage.getItem("authToken"));

  useEffect(() => {
    const getData = () => {
      axios
        .get(`${baseUrl}/dealership/list/offset/0/limit/10/token/${auth}`)
        .then((response) => {
          console.log("code---", response);
          if (response.data.code === 1) {
            setData(response.data.result);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    getData();
  }, [auth]);

  return (
    <>
      <div className="content">
        <Card>
          <CardHeader>
            <Row>
              <Col md="7">
                <CardTitle tag="h4">List of Dealership </CardTitle>
              </Col>
              <Col md="5" className="search_head">
                {/* <input
                      type="text"
                      className="form-control"
                      style={{ width: "240px" }}
                      placeholder="search"
                    /> */}
              </Col>
            </Row>
          </CardHeader>

          <CardBody>
            <Table responsive="sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone No</th>
                  <th>City</th>
                  <th>Pincode</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((p, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{p.name}</td>
                      <td>{p.email}</td>
                      <td>{p.phone}</td>
                      <td>{p.city}</td>
                      <td>{p.pin_code}</td>
                      <td>{p.created}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No Records</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default DealerShipList;
