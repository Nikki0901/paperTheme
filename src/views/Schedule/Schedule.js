import React, { useState, useEffect } from "react";
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
import DatePicker from "react-date-picker";
import { baseUrl } from "../../components/Service/Config";
import ReactPaginate from "react-paginate";
import "../../assets/css/style.css";
import "../../assets/css/Pagination.css";

const Schedule = () => {
  const alert = useAlert();
  const [data, setData] = useState([]);
  const [value, setValue] = useState(null);
  const [date, setDate] = useState(new Date());

  const [orgtableData, setOrgTableData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [serial, setSerial] = useState(1);

  const auth = JSON.parse(localStorage.getItem("authToken"));

  const receivedData = () => {
    axios.get(`${baseUrl}/get/schedule/token/${auth}`).then((res) => {
      console.log(res);
      const data = res.data.result;
      const slice = data.slice(offset, offset + perPage); //0,3
      setOrgTableData(res.data.result);
      setPageCount(Math.ceil(data.length / perPage));
      setData(slice);
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
    const data = orgtableData;
    const slice = data.slice(offset, offset + perPage); // 4,8
    setPageCount(Math.ceil(data.length / perPage));
    setData(slice);
  };

  const onChange = (date) => {
    if (date === null) {
      receivedData();
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

  const searchHandler = () => {
    axios
      .get(`${baseUrl}/get/schedule/token/${auth}/sales_user_id//date/${value}`)
      .then(function (response) {
        console.log("search-data", response);
        if (response.data.code === 1) {
          setData(response.data.result);
        } else {
          alert.show(" No data  !");
          receivedData();
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
            <Table responsive="sm" className="table table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Room Name</th>
                  <th>Sales User Name</th>
                  <th>Dealership Name</th>
                  <th>City</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((p, i) => (
                    <tr key={i}>
                      <td>{i + serial}</td>
                      <td>{p.name}</td>
                      <td>{p.room_id}</td>
                      <td>{p.sales_user_name}</td>
                      <td>{p.dealer_name}</td>
                      <td>{p.city}</td>
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

            <div>
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
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Schedule;



// constructor() {
//   super();

//   this.state = {
//     offset: 0,
//     tableData: [],
//     orgtableData: [],
//     perPage: 10,
//     currentPage: 0,
//     serial: 1,
//     value: null,
//     date: new Date(),
//   };
//   this.handlePageClick = this.handlePageClick.bind(this);
// }

// handlePageClick = (e) => {
//   const selectedPage = e.selected;
//   const offset = selectedPage * this.state.perPage;

//   this.setState(
//     {
//       currentPage: selectedPage,
//       offset: offset,
//       serial: offset + 1,
//     },
//     () => {
//       this.loadMoreData();
//     }
//   );
// };

// loadMoreData() {
//   const data = this.state.orgtableData;

//   const slice = data.slice(
//     this.state.offset,
//     this.state.offset + this.state.perPage
//   );
//   this.setState({
//     pageCount: Math.ceil(data.length / this.state.perPage),
//     tableData: slice,
//   });
// }
// componentDidMount() {
//   this.getData();
// }

// getData() {
//   axios.get(`${baseUrl}/get/schedule/token/${auth}`).then((res) => {
//     console.log("schedule :", res);
//     var data = res.data.result;
//     var slice = data.slice(
//       this.state.offset,
//       this.state.offset + this.state.perPage
//     );

//     this.setState({
//       pageCount: Math.ceil(data.length / this.state.perPage),
//       orgtableData: res.data.result,
//       tableData: slice,
//     });
//   });
// }

// const alert = useAlert();
// const [data, setData] = useState([]);
// const [value, setValue] = useState(null);
// const [date, setDate] = useState(new Date());

// const getData = useCallback(() => {
//   axios
//     .get(`${baseUrl}/get/schedule/token/${auth}`)
//     .then((response) => {
//       console.log("code---", response);
//       if (response.data.code === 1) {
//         setData(response.data.result);
//       }
//     })
//     .catch((error) => {
//       console.log("error", error);
//     });
// }, [auth]);

// useEffect(() => {
//   getData();
// }, [getData]);
