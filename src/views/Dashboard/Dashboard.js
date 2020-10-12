import React, { useState, useEffect } from "react";
import { Card, CardTitle, Row, Col, Spinner } from "reactstrap";
import baseUrl from "../../components/Service/Config";
import { useAlert } from "react-alert";
import '../../assets/css/style.css';

function Dashboard() {
  const alert = useAlert();
  const [user, setUser] = useState("");
  const [sales, setSales] = useState("");
  const [recording, setRecording] = useState("");
  const [dealership, setDealerShip] = useState("");


  const auth = JSON.parse(localStorage.getItem("authToken"));

  

  useEffect(() => {
    const getUser = () => {
      fetch(`${baseUrl}/user/count/token/${auth}`)
        .then((response) => response.json())
        .then((json) => {
          console.log("data", json);
          if (json.code === 1) {
            setUser(json);
          }
        })
        .catch((err) => {
           alert.error("User ,request error ! check it");
        });
    };
    const getSales = () => {
      fetch(`${baseUrl}/sales_users/count/token/${auth}`)
        .then((response) => response.json())
        .then((json) => {
          // console.log("data", json);
          if (json.code === 1) {
            setSales(json);
          }
        })
        .catch((err) => {
           alert.error("Sales ,request error ! check it");
        });
    };
    const getRecording = () => {
      fetch(`${baseUrl}/users/recording/list/offset/0/limit/10/token/${auth}`)
        .then((response) => response.json())
        .then((json) => {
          console.log("data", json);
          if (json.code === 1) {
            setRecording(json);
          }
        })
        .catch((err) => {
           alert.error("Recording ,request error ! check it");
        });
    };

    const getDealership = () => {
      fetch(`${baseUrl}/dealership/list/offset/0/limit/10/token/${auth}`)
        .then((response) => response.json())
        .then((json) => {
          console.log("data", json);
          if (json.code === 1) {
            setDealerShip(json);
          }
        })
        .catch((err) => {
           alert.error("dealership ,request error ! check it");
        });
    };
    
    getUser();
    getSales();
    getRecording();
    getDealership();
  }, [alert,auth]);

 
 
 

  return (
    <>
      <div className="content">
        <Row>
          <Col lg="4" sm="6">
            <Card
              body
              className="total_user"
            >
              <div className="numbers">
                <CardTitle>Total User</CardTitle>
                <CardTitle tag="h4">
                  {user.count ? (
                    user.count
                  ) : (
                    <Spinner type="grow" color="primary" />
                  )}
                </CardTitle>
              </div>
            </Card>
          </Col>

          <Col lg="4" sm="6">
            <Card body className="total_sales">
              <div className="numbers">
                <CardTitle>Total Sales Person</CardTitle>
                <CardTitle tag="h4">
                  {sales.count ? (
                    sales.count
                  ) : (
                    <Spinner type="grow" color="danger" />
                  )}
                </CardTitle>
              </div>
            </Card>
          </Col>

          <Col lg="4" sm="6">
            <Card
              body
              className="total_recording"
            >
              <div className="numbers">
                <CardTitle>Total Recording </CardTitle>
                <CardTitle tag="h4">
                  {recording.count ? (
                    recording.count
                  ) : (
                    <Spinner type="grow" color="danger" />
                  )}
                </CardTitle>
              </div>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg="4" sm="6">
            <Card
              body
              className="total_dealership"
            >
              <div className="numbers">
                <CardTitle>Total Dealership</CardTitle>
                <CardTitle tag="h4">
                  {dealership.count ? (
                    dealership.count
                  ) : (
                    <Spinner type="grow" color="primary" />
                  )}
                </CardTitle>
              </div>
            </Card>
          </Col>

        
        </Row>
      </div>
    </>
  );
}

export default Dashboard;

