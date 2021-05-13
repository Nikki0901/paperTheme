import React, { useState, useEffect,useCallback } from "react";
import axios from "axios";
import { useAlert } from "react-alert";
import ModalVideo from "react-modal-video";
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

import {baseUrl} from "../../components/Service/Config";
import Delete from "../../assets/svg/delete";
import "../../assets/css/style.css";

const Recording = () => {
  const alert = useAlert();
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [videoid, setVideoId] = useState(null);
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
        console.log("getdata fn");
        getData();
      }
    };

  const openModal = (videoContent) => {
    setIsOpen(true);
    setVideoId(videoContent);
  };

  const auth = JSON.parse(localStorage.getItem("authToken"));

  const getData = useCallback(() => {
    fetch(`${baseUrl}/users/recording/list/offset/0/limit/10/token/${auth}`)
      .then((response) => response.json())
      .then((json) => {
        console.log("data", json);
        if (json.code === 1) {
          setData(json.result);
          setNext(json.offset); // offset = 2
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  },[auth]);

  useEffect(() => {
    getData();
  }, [getData]);

 

  const search = (key) => {
    console.log("input--", key);
    axios
      .get(`${baseUrl}/user/search/recording/value/${key}/token/${auth}`)
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
      .get(
        `${baseUrl}/users/recording/list/offset/${key}/limit/10/token/${auth}`
      )
      .then(function (response) {
        console.log(response);
        if (response.data.code === 1) {
          if (response.data.offset !== 0) {
          setData(response.data.result);
          setNext(response.data.offset); // get offset
          setPrev(response.data.offset - limit * 2);
          setSerial(key + 1);
          }else {
            alert.show(" no data !");
          }
        } 
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  const prevPage = (key) => {
    // console.log("prev", key);
    axios
      .get(
        `${baseUrl}/users/recording/list/offset/${key}/limit/10/token/${auth}`
      )
      .then(function (response) {
        console.log(response);
        if (response.data.code === 1) {
          if (response.data.code === 1) {
            setData(response.data.result);
            setPrev(response.data.offset - limit * 2);
            setNext(response.data.offset);
            setSerial(key + 1);
          } else {
            alert.show("no data !");
          }
        }
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  const del = (id) => {
    // console.log("del", id);
    let formData = new FormData();
    formData.append("id", id);
    axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${baseUrl}/auth/recording_data/delete/token/${auth}`,
      data: formData,
    }).then(
      (response) => {
        console.log("del-", response);
        alert.success("successfully deleted ");
        updateData(next);
      },
      (error) => {
        console.log("error", error);
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
                <CardTitle tag="h4">Recording Videos</CardTitle>
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
                  <th>UserID</th>
                  <th>Created</th>
                  <th style={{ textAlign: "center" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((p, i) => (
                    <tr key={i}>
                      <td>{i + serial}</td>
                      <td>{p.user_name}</td>
                      <td>{p.user_id}</td>
                      <td>{p.created}</td>
                      <td
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <i
                          className="material-icons"
                          style={{
                            cursor: "pointer",
                            color: "red",
                            fontSize: "25px",
                          }}
                          onClick={() => openModal(p.video_url)}
                        >
                          play_circle_outline
                        </i>

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
        <ModalVideo
          channel="custom"
          isOpen={isOpen}
          // videoId={videoid}
          onClose={() => setIsOpen(false)}
          url={videoid}
        />
      </div>
    </>
  );
};

export default Recording;
