import React, { useState, useEffect,useCallback } from "react";
import axios from "axios";
import { useAlert } from "react-alert";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
  Button,
} from "reactstrap";

import { baseUrl } from "../../components/Service/Config";
import Delete from "../../assets/svg/delete";
import "../../assets/css/style.css";
import AddDetails from "./AddDetails";
import EditDetails from "./EditDetails";

const SalesLoginUser = () => {
  const alert = useAlert();
  const [data, setData] = useState([]);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(0);
  const [serial, setSerial] = useState(1);
  const [limit] = useState(10);
  const [id, setId] = useState(null);

  const auth = JSON.parse(localStorage.getItem("authToken"));

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

  // add modal
  const [addModal, setAddModal] = useState(false);
  const addHandler = () => setAddModal(!addModal);

  // edit modal
  const [editModal, setEditModal] = useState(false);
  const editHandler = (id) => {
    setEditModal(!editModal);
    setId(id);
  };

  //get data
  const getData = useCallback(() => {
    fetch(`${baseUrl}/bmw/sales_list/token/${auth}/id//offset/0/limit/10`)
      .then((response) => response.json())
      .then((json) => {
        console.log("salesData", json);
        if (json.code === 1) {
          setData(json.result);
          setNext(json.offset); // offset = 4
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  },[auth]);

  useEffect(() => {
    getData();
  }, [getData]);

  // search data
  const search = (key) => {
    console.log("input--", key);
    axios
      .get(
        `${baseUrl}/bmw/sales_list/token/${auth}/search_key/${key}/offset/0/limit/10`
      )
      .then(function (response) {
        console.log("search--", response);
        if (response.data.code === 1) {
          // if(response.data.result){
          setData(response.data.result);
          setSerial(1);
          setNext(10);
          // }
        }
        // updateData(next);
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  // next
  const nextPage = (key) => {
    console.log("next", key);
    axios
      .get(`${baseUrl}/bmw/sales_list/token/${auth}/id//offset/${key}/limit/10`)
      .then(function (response) {
        console.log("next-data", response);
        if (response.data.code === 1) {
          // console.log(response.data.offset)
          setData(response.data.result);
          setNext(response.data.offset); // get offset = 8
          setPrev(response.data.offset - limit * 2);
          setSerial(key + 1);
        } else {
          alert.show("no data !");
        }
        console.log("offset :", response.data.offset);
      })

      .catch(function (error) {
        alert.error("request error ! check it", error);
      });
  };

  //prev
  const prevPage = (key) => {
    console.log("prev", key);
    axios
      .get(`${baseUrl}/bmw/sales_list/token/${auth}/id//offset/${key}/limit/10`)
      .then(function (response) {
        console.log("prev-data", response);
        if (response.data.code === 1) {
          setData(response.data.result);
          setPrev(response.data.offset - limit * 2); // c = 0 , 4
          setNext(response.data.offset);
          setSerial(key + 1);
        } else {
          alert.show("no data !");
        }
      })
      .catch(function (error) {
        alert.error("request error ! check it", error);
      });
  };

  // delete data
  const del = (id) => {
    // console.log("del", id);
    axios
      .get(`${baseUrl}/Bmw/sales_person/delete/token/${auth}/user_id/${id}`)
      .then(function (response) {
        // console.log("delete-", response);
        alert.success("successfully deleted ");
        updateData(next);
      })
      .catch((err) => {
        alert.error("request error ! not deleted", err);
      });
  };

  return (
    <>
      <div className="content">
        <Card>
          <CardHeader>
            <Row>
              <Col md="6" className="sales_header">
                <CardTitle tag="h4">Sales User</CardTitle>
              </Col>
              <Col md="6" className="search_head">
                <input
                  type="text"
                  className="form-control"
                  style={{ width: "240px" }}
                  placeholder="search by name"
                  onChange={(event) => search(event.target.value)}
                />
                <button
                  style={{ marginLeft: 20, padding: 10, borderRadius: 2 }}
                  type="button"
                  className="btn btn-info btn-sm"
                  onClick={addHandler}
                >
                  Add User
                  <i
                    className="fa fa-plus-square"
                    style={{ marginLeft: 5, fontSize: 14 }}
                  ></i>
                </button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Table responsive="sm">
              <thead>
                <tr>
                  <th>S.no</th>
                  <th>Name</th>
                  <th>Passcode</th>
                  <th>Phone No</th>
                  <th>Location</th>
                  <th>Pin</th>
                  <th>Date</th>
                  <th style={{ textAlign: "center" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((p, i) => (
                    <tr key={i}>
                      <td>{i + serial}</td>
                      <td>{p.dealer_name}</td>
                      <td>{p.passcode}</td>
                      <td>{p.phone}</td>
                      <td>{p.city}</td>
                      <td>{p.pincode}</td>
                      <td>{p.created}</td>
                      <td
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-around",
                        }}
                      >
                        <i
                          className="fa fa-edit"
                          style={{ fontSize: 18, cursor: "pointer" }}
                          onClick={() => editHandler(p.id)}
                        ></i>
                        <Delete onClick={() => del(p.id)} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No Records</td>
                  </tr>
                )}
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

        <AddDetails
          addModal={addModal}
          addHandler={addHandler}
          getData={updateData}
          next={next}
        />

        <EditDetails
          editModal={editModal}
          editHandler={editHandler}
          id={id}
          getData={updateData}
          next={next}
        />
      </div>
    </>
  );
};

export default SalesLoginUser;

// const updateData = () => {
//   setData(data.filter((c) => c.id != id));
// };

// fetch(`${baseUrl}/bmw/sales_list/token/5eee167482092/id/${id}/offset/0/limit/10`)
// .then((response) => response.json())
// .then((json) => {
//   console.log("salesData", json);
//     setUser({
//       name : json.result[0].first_name,
//     });
// })
