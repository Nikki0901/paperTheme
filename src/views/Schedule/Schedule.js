import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import axios from "axios";
import { useAlert } from "react-alert";
import "../../assets/css/style.css";
import DatePicker from "react-date-picker";
import baseUrl from "../../components/Service/Config";

const Schedule = () => {
  const alert = useAlert();
  const [data, setData] = useState([]);
  const [value, setValue] = useState(null);
  const [date, setDate] = useState(new Date());

  const auth = JSON.parse(localStorage.getItem("authToken"));

  const getData = useCallback(() => {
    fetch(`${baseUrl}/get/schedule/token/${auth}`)
      .then((response) => response.json())
      .then((json) => {
        console.log("getdata", json);
        if (json.code === 1) {
          setData(json.result);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [auth]);

  useEffect(() => {
    getData();
  }, [getData]);


  const onChange = (date) => {
      if(date === null){
        getData();
      }
        setDate(date);
        function convert(e) {     
        var date = new Date(e),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
        }
        setValue(convert(date));
  };

//   console.log("date ---", date);


  const searchHandler = () => {
    axios
      .get(
        `https://vride.multitvsolution.com:7001/vrideapi/v1/get/schedule/token/5eee167482092/date/${value}`
      )
      .then(function (response) {
        // console.log("search-data", response);
        if (response.data.code === 1) {
            setData(response.data.result);
          }
          else{
           alert.show("Sorry, No data  !");
           getData();
          }
      });
  };

  return (
    <>
      <div className="content">
        <Card>
          <CardHeader>
            <Row>
              <Col md="6" className="sales_header">
                <CardTitle tag="h4">List of Schedule</CardTitle>
              </Col>
              <Col md="6" className="search_head">
                <DatePicker 
                onChange={onChange}
                 value={date}
                 className="date_picker" 
                  />

                <button
                  style={{ marginLeft: 20, padding: 10, borderRadius: 2 }}
                  type="button"
                  className="btn btn-info btn-sm"
                  onClick={searchHandler}
                >
                  Search
                </button>
              </Col>
            </Row>
          </CardHeader>

          <CardBody>
            <Table responsive="sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Sales User Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((p, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{p.name}</td>
                      <td>{p.sales_user_name}</td>
                      <td>{p.date}</td>
                      <td>{p.time}</td>
                      <td>{p.email}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No Records</td>
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

export default Schedule;

// console.log("date-format :", date.getFullYear() + '-' + Number(date.getMonth() + 1) + '-' + date.getDate() ) ;
