import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import { baseUrl } from "../../components/Service/Config";
// import Page from '../Pag'
// import TestTable from '../Extra/TestTable'


const Analytics = () => {
  const [data, setData] = useState({});
  const [dataSchedule, setDataSchedule] = useState([]);

  const auth = JSON.parse(localStorage.getItem("authToken"));
  //username
  const userName = JSON.parse(localStorage.getItem("userName"));

  useEffect(() => {
    const getData = () => {
      axios
        .get(`${baseUrl}/analytics/user/monthly/count/token/${auth}`)
        .then((response) => {
          // console.log("code---", response);
          if (response.data.code === 1) {
            setData(response.data.result);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    const getDataSchedule = () => {
      axios
        .get(`${baseUrl}/analytics/schedule/Daily/count/token/${auth}`)
        .then((response) => {
          console.log("code---", response);
          if (response.data.code === 1) {
            setDataSchedule(response.data.result);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    getData();
    getDataSchedule();
  }, [auth]);

  // line chart
  const dataItem = {
    labels: data.Month,
    datasets: [
      {
        label: "Line 1",
        data: data.Count,
        fill: false,
        borderColor: "#fbc658",
        backgroundColor: "transparent",
        pointBorderColor: "#fbc658",
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8,
      },
    ],
  };
  const options = {
    legend: {
      display: true,
      position: "top",
    },
  };

  // bar chart of bmw
  const dataBar = {
    labels:  dataSchedule.Day,
    datasets: [
      {
        // labels:[0,1,2,4],
        data: dataSchedule.Schedule,
        label: "Schedule",
        backgroundColor: "darkcyan",
        borderColor: "#3b3f8c",
        borderWidth: 1,
        hoverBackgroundColor: "#1ae6e6",
        hoverBorderColor: "rgba(255,99,132,1)",
        
      },
    ],
  };

  const options3 = {
    responsive: true,
    title: {
      display: true,
      position: "left",
      text: "Schedule",
    },
    legend: {
      display: false,
    },
    type: "bar",
  };

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card className="card-chart">
            <CardHeader>
              {userName === "BMW" ? (
                <CardTitle tag="h5">Monthly Schedule Report</CardTitle>
              ) : (
                <CardTitle tag="h5">Monthly User Report</CardTitle>
              )}
            </CardHeader>

            <CardBody>
              {userName === "BMW" ? (
                <p className="card-category">Bar Chart with Points</p>
              ) : (
                <p className="card-category">Line Chart with Points</p>
              )}
              {userName === "BMW" ? (
                <Bar
                  data={dataBar}
                  width={400}
                  height={100}
                  options={options3}
                />
              ) : (
                <Line
                  data={dataItem}
                  width={400}
                  height={100}
                  options={options}
                />
              )}
            </CardBody>

            {userName === "BMW" ? (
              <CardFooter>
                <div className="chart-legend">
                  <i className="fa fa-circle text-primary" />
                  Vertically : Schedule
                </div>
                <div className="chart-legend">
                  <i className="fa fa-circle text-primary" /> Horizontally :
                  Days
                </div>
                <hr />
                <div className="card-stats">
                  <i className="fa fa-check" /> Data information certified
                </div>
              </CardFooter>
            ) : (
              <CardFooter>
                <div className="card-stats">
                  <i className="fa fa-check" /> Data information certified
                </div>
              </CardFooter>
            )}
          </Card>


          {/* <Page /> */}
          {/* <TestTable /> */}
        </Col>
      </Row>
    </div>
  );
};

export default Analytics;

// line chart of bmw
// const dataItem2 = {
//   labels: dataSchedule.Day,
//   datasets: [
//     {
//       label: "Schedule",
//       data: dataSchedule.Schedule,
//       fill: false,
//       backgroundColor: "linear-gradient(to right, #20f08b, #07dfb1)",
//       borderColor: "#05deb3",
//       pointBorderColor: "#fbc658",
//       borderWidth: 5,
//       pointRadius: 4,
//       pointHoverRadius: 8,
//       pointBorderWidth: 12,
//     },
//   ],
// };

// const options2 = {
//   responsive: true,
//   title: {
//     display: true,
//     position: "left",
//     text: "Schedule",
//   },
//   legend: {
//     display: true,
//   },
// };
