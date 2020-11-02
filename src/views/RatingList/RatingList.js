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
import ReactPaginate from "react-paginate";
import "../../assets/css/Pagination.css";
// import ExcelCsv from "../../assets/svg/excel";
// import { CSVLink } from "react-csv";

const RatingList = () => {
  const [tabledata, setTableData] = useState([]);
  const [orgtableData, setOrgTableData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [serial, setSerial] = useState(1);

  const auth = JSON.parse(localStorage.getItem("authToken"));

  const receivedData = () => {
    axios
      .get(`${baseUrl}/content/get/rating_list/roomid//token/${auth}`)
      .then((res) => {
        console.log(res);
        const data = res.data.result;
        const slice = data.slice(offset, offset + perPage);
        setOrgTableData(res.data.result);
        setPageCount(Math.ceil(data.length / perPage));
        setTableData(slice);
      });
  };

  useEffect(() => {
    receivedData();
  }, []);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * perPage;
    setSerial(offset + 1);
    setOffset(offset);
    setCurrentPage(selectedPage);
  };

  useEffect(() => {
    loadMoreData();
  }, [offset, currentPage]);

  const loadMoreData = () => {
    console.log("loadMoreData--");
    const data = orgtableData;
    // const data = rating.myRatingList;
    const slice = data.slice(offset, offset + perPage); // 4,8
    setPageCount(Math.ceil(data.length / perPage));
    setTableData(slice);
    console.log("tabledata", data);
  };

  //filter
  const search = (key) => {
    console.log("input--", key);
    axios
      .get(`${baseUrl}/content/get/rating_list/roomid/${key}/token/${auth}`)
      .then(function (response) {
        console.log("code---", response);
        if (response.data.code === 1) {
          setTableData(response.data.result);
        }
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  return (
    <>
      <div className="content">
        <Card>
          <CardHeader>
            <Row>
              <Col md="7">
                <CardTitle tag="h4">Rating List </CardTitle>
              </Col>
              <Col md="5" className="search_head">
                <input
                  type="text"
                  className="form-control"
                  style={{ width: "240px" }}
                  placeholder="search by room id"
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
                  <th>Rating</th>
                  <th>Dealership Name</th>
                  <th>Room Id</th>
                  <th>Sales User Name</th>
                  <th>City</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {tabledata.length > 0 ? (
                  tabledata.map((p, i) => (
                    <tr key={i}>
                      <td>{i + serial}</td>
                      <td>{p.name}</td>
                      <td>{p.rating}</td>
                      <td>{p.dealer_name}</td>
                      <td>{p.room_id}</td>
                      <td>{p.sales_user_name}</td>
                      <td>{p.city}</td>
                      <td>{p.created}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No records</td>
                  </tr>
                )}
              </tbody>
            </Table>

            <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={1}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
            />
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default RatingList;
