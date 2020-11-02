import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardTitle, Row, Col } from "reactstrap";
import { baseUrl } from "../../components/Service/Config";
import "../../assets/css/style.css";
// import { connect } from "react-redux";
// import { getDealership } from "../../action";

function Dashboard() {
  const [user, setUser] = useState("");
  const [sales, setSales] = useState("");
  const [recording, setRecording] = useState("");
  const [dealership, setDealerShip] = useState("");
  const [rating, setRating] = useState("");
  const [schedule, setSchedule] = useState("");

  const auth = JSON.parse(localStorage.getItem("authToken"));
  //user name
  const userName = JSON.parse(localStorage.getItem("userName"));

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
          console.log("errror", err);
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
          console.log("errror", err);
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
          console.log("errror", err);
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
          console.log("errror", err);
        });
    };

    const getRatingList = () => {
      axios
        .get(`${baseUrl}/content/get/rating_list/roomid//token/${auth}`)
        .then((response) => {
          console.log("getRating---", response);
          if (response.data.code === 1) {
            setRating(response.data.total_average_rating);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    const getSchedule = () => {
      axios
        .get(`${baseUrl}/get/schedule/token/${auth}`)
        .then((response) => {
          console.log("code---", response);
          if (response.data.code === 1) {
            setSchedule(response.data.result);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    getUser();
    getSales();
    getRecording();
    getDealership();
    getRatingList();
    getSchedule();
  }, [auth]);

  // console.log("Mycount",props.mydealership.myCount);
  return (
    <>
      <div className="content">
        {userName === "BMW" && (
          <Row>
            <Col lg="4" sm="6">
              <Card body className="total_schedule">
                <div className="numbers">
                  <CardTitle>Total Schedule</CardTitle>
                  <CardTitle tag="h4">
                    {schedule.length ? schedule.length : "0"}
                  </CardTitle>
                </div>
              </Card>
            </Col>

            <Col lg="4" sm="6">
              <Card body className="total_dealership">
                <div className="numbers">
                  <CardTitle>Total Dealership</CardTitle>
                  <CardTitle tag="h4">
                    {dealership.count ? dealership.count : "0"}
                  </CardTitle>
                </div>
              </Card>
            </Col>

            <Col lg="4" sm="6">
              <Card body className="total_rating">
                <div className="numbers">
                  <CardTitle>Video Rating</CardTitle>
                  <CardTitle tag="h4">{rating ? rating : "0"}</CardTitle>
                </div>
              </Card>
            </Col>
          </Row>
        )}

        <Row>
          <Col lg="4" sm="6">
            <Card body className="total_sales">
              <div className="numbers">
                <CardTitle>Total Sales Person</CardTitle>
                <CardTitle tag="h4">
                  {sales.count ? sales.count : "0"}
                </CardTitle>
              </div>
            </Card>
          </Col>
          {userName === "BMW" ? null : (
            <Col lg="4" sm="6">
              <Card body className="total_recording">
                <div className="numbers">
                  <CardTitle>Total Recording </CardTitle>
                  <CardTitle tag="h4">
                    {recording.count ? recording.count : "0"}
                  </CardTitle>
                </div>
              </Card>
            </Col>
          )}

          {userName === "BMW" ? null : (
            <Col lg="4" sm="6">
              <Card body className="total_user">
                <div className="numbers">
                  <CardTitle>Total User</CardTitle>
                  <CardTitle tag="h4">
                    {user.count ? user.count : "0"}
                  </CardTitle>
                </div>
              </Card>
            </Col>
          )}
        </Row>
      </div>
    </>
  );
}


export default Dashboard;


   // {
            //   props.submit(json);
            // }
// get the data from store & display
// const mapStateToProps = (state) => {
//   return {
//     mydealership: state.dealership,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     submit: (json) => {
//       dispatch(getDealership(json));
//     },
//   };
// };
