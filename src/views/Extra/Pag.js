import React, { useEffect } from "react";
import { CardBody, Table } from "reactstrap";
import axios from "axios";
import ReactPaginate from "react-paginate";


const Pag = () => {
  const [postData, setPostData] = React.useState([]);

  const [orgtableData, setOrgTableData] = React.useState([]);
  const [offset, setOffset] = React.useState(0);
  const [perPage, setPerPage] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [pageCount, setPageCount] = React.useState(0);
  const [serial, setSerial] = React.useState(1);

  const receivedData = () => {
    axios.get(`https://jsonplaceholder.typicode.com/posts`).then((res) => {
      console.log(res);
      const data = res.data;
      const slice = data.slice(offset, offset + perPage); //0,3
      console.log("slice", slice);

      setOrgTableData(res.data);
      setPageCount(Math.ceil(data.length / perPage));
      setPostData(slice);
    });
  };

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
    console.log("offset", offset);
    const slice = data.slice(offset, offset + perPage); // 4,8
    console.log("loadslice", slice);
    setPageCount(Math.ceil(data.length / perPage));
    setPostData(slice);
  };

  useEffect(() => {
    receivedData();
  }, []);

  return (
    <div>
      <CardBody>
        {/* {postData} */}
        <Table responsive="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Room Name</th>
            </tr>
          </thead>
          <tbody>
            {postData.map((p, i) => (
              <tr key={i}>
                <td>{i + serial}</td>
                <td>{p.title}</td>
                <td>{p.body}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div>
          <ReactPaginate
            previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
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
    </div>
  );
};

export default Pag;
