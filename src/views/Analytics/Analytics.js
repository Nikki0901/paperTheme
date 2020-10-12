import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useAlert } from "react-alert";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

import baseUrl from "../../components/Service/Config";

const Analytics = () => {
  const alert = useAlert();
  const [data, setData] = useState({});

  const auth = JSON.parse(localStorage.getItem("authToken"));

  useEffect(() => {
    // console.log("useeffect")
    const getData = () => {
      fetch(`${baseUrl}/analytics/user/monthly/count/token/${auth}`)
        .then((response) => response.json())
        .then((json) => {
          console.log("data", json);
          if (json.code === 1) {
            setData(json.result);
          } else {
            alert.show("result not found !");
          }
        })
        .catch((err) => {
          alert.error("request error ! check it");
        });
    };
    getData();
  }, [auth,alert]);


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

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card className="card-chart">
            <CardHeader>
              <CardTitle tag="h5">Monthly Users Report</CardTitle>
              <p className="card-category">Line Chart with Points</p>
            </CardHeader>

            <CardBody>
              <Line
                data={dataItem}
                width={400}
                height={100}
                options={options}
              />
            </CardBody>

            <CardFooter>
              <div className="chart-legend">
                <i className="fa fa-circle text-warning" /> Users
              </div>
              <hr />
              <div className="card-stats">
                <i className="fa fa-check" /> Data information certified
              </div>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Analytics;
