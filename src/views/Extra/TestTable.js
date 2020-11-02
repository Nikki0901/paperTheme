import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TablePagination, 
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import { baseUrl } from "../../components/Service/Config";

const useStyles = makeStyles({
  root: {
    border: 0,
    borderRadius: 3,
  },
});

const TestTable = () => {
  const classes = useStyles();

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);

  const auth = JSON.parse(localStorage.getItem("authToken"));

  const receivedData = () => {
    axios
      .get(`${baseUrl}/dealership/list/offset/0/limit/10/token/${auth}`)
      .then((response) => {
        console.log(response.data.result);
        const data = response.data.result;
        setUsers(data);
      });
  };

  useEffect(() => {
    receivedData();
  }, []);

  const onChangePage = (event, nextPage) => {
    setPage(nextPage);
  };

  const onChangeRowsPerPage = (e) => {
    setRowPerPage(e.target.value);
  };

  return (
    <div>
      <Container className={classes.root}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S.no </TableCell>
                <TableCell>Name </TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>city</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users
                .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                .map((user, i) => (
                  <TableRow key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.city}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPage={rowPerPage}
            rowsPerPageOptions={[5,10,15,20,50]}
            count={users.length}
            page={page}
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
          />
        </TableContainer>
      </Container>
    </div>
  );
};

export default TestTable;
