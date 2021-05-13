import React, { useState, useEffect,useCallback } from "react";
import axios from "axios";
import { useAlert } from "react-alert";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";

import {baseUrl} from "../../components/Service/Config";
import Delete from "../../assets/svg/delete";
import "../../assets/css/style.css";

const UserManagement = () => {
  const alert = useAlert();

  const [data, setData] = useState([]);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  const [serial, setSerial] = useState(1);
  const [limit] = useState(10);

    //update data
    const updateData = (id) => {
      var a = id;
      var nt = id - 10; // 8 - 4
  
      if (a === next) {
        nextPage(nt); // key = 4 , 8
      } else if (nt === prev) {
        prevPage(nt); // key = 0 , 4
      } else {
        getData();
      }
    };

  const auth = JSON.parse(localStorage.getItem("authToken"));

  const getData = useCallback(() => {
    fetch(`${baseUrl}/user/list/offset/0/limit/10/token/${auth}`)
      .then((response) => response.json())
      .then((json) => {
        console.log("data", json);
        if (json.code === 1) {
          setData(json.result);
          setNext(json.offset); // offset = 2
        } else {
          alert.show("result not found !");
        }
      })
      .catch((err) => {
        console.log(err);
        alert.show("request error ! check it");
      });
  },[auth,alert]);

  
  useEffect(() => {
    getData();
  }, [getData]);

 

  const search = (key) => {
    console.log("input--", key);
    axios
      .get(`${baseUrl}/user/search/value/${key}/role/user/token/${auth}`)
      .then(function (response) {
        console.log("code---", response.data.result);
        setData(response.data.result);
        setSerial(1)
        setNext(10)
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  const nextPage = (key) => {
    console.log("next", key);
    axios
      .get(`${baseUrl}/user/list/offset/${key}/limit/10/token/${auth}`)
      .then(function (response) {
        console.log(response);
        if (response.data.code === 1) {
          if (response.data.offset !== 0) {
            setData(response.data.result);
            setNext(response.data.offset); // get offset
            setPrev(response.data.offset - limit * 2);
            setSerial(key + 1);
          } else {
            alert.show(" no data !");
          }
        }
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  const prevPage = (key) => {
    console.log("prev", key);
    axios
      .get(`${baseUrl}/user/list/offset/${key}/limit/10/token/${auth}`)
      .then(function (response) {
        console.log(response);
        if (response.data.code === 1) {
          setData(response.data.result);
          setPrev(response.data.offset - limit * 2);
          setNext(response.data.offset);
          setSerial(key + 1);
        } else {
          alert.show("no data !");
        }
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  const del = (id) => {
    // console.log("del", id);
    let formData = new FormData();
    formData.append("user_id", id);
    axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${baseUrl}/auth/attendee/delete/token/${auth}`,
      data: formData,
    }).then(
      (response) => {
        console.log("res-", response);
        alert.success("successfully deleted ");
        updateData(next);
      },
      (err) => {
        console.log("error - ", err);
      }
    );
  };


  return (
    <>
      <div className="content">
        <Card>
          <CardHeader>
            <Row>
              <Col md="7">
                <CardTitle tag="h4">User Management</CardTitle>
              </Col>
              <Col md="5" className="search_head">
                <input
                  type="text"
                  className="form-control"
                  style={{ width: "240px" }}
                  placeholder="search"
                  onChange={(event) => search(event.target.value)}
                />
              </Col>
            </Row>
          </CardHeader>

          <CardBody>
            <Table responsive="sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Phone No</th>
                  <th>Location</th>
                  <th>Pin</th>
                  <th>Date</th>
                  <th style={{ textAlign: "center" }}>Action</th>
                </tr>
              </thead>
              <tbody>            
                { data.length > 0
                  ? data.map((p, i) => (
                      <tr key={i}>
                       <td>{i + serial}</td>
                        <td>{p.first_name}</td>
                        <td>{p.phone}</td>
                        <td>{p.city}</td>
                        <td>{p.pin_code}</td>
                        <td>{p.created}</td>
                        <td
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <Delete onClick={() => del(p.id)} />
                        </td>
                      </tr>
                    ))
                  :    <tr>
                        <td colSpan="7">No Records</td>
                      </tr>
                  }
              </tbody>
            </Table>
            <div className="pagination_btn">
              <Button color="success" onClick={() => prevPage(prev)}>
                Prev
              </Button>
              <Button
                style={{ marginLeft: 10 }}
                color="success"
                onClick={() => nextPage(next)}
              >
                Next
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default UserManagement;

// const headers = [
//   { name: "ID", field: "id" },
//   { name: "Name", field: "name" },
//   { name: "Phone No", field: "phone_no" },
//   { name: "Location", field: "location" },
//   { name: "Pin", field: "pin" },
//   { name: "Date", field: "date" },
//   { name: "Action", field: "action" },
// ];
