import React, { useState, useEffect,useMemo }  from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
    Table
  } from "reactstrap";

 import Pagination from '../Datatable/Pagination'
 import Search from '../Datatable/Search'
 import HeaderComp from '../Datatable/Header'



const SalesLoginUser =() => {
 
  const [comments, setComments] = useState([]);
  const [totalItems, setTotalitems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  const ITEM_PER_Page = 20;



    const headers =[
      {name:"no#", field:"id"},
      {name:"Name", field:"name"},
      {name:"Email", field:"email"},
      {name:"Comment", field:"body"},

    ]

  useEffect( () =>{

    const getData = () => {
      fetch("https://jsonplaceholder.typicode.com/comments")
      .then(response => response.json())
      .then(json => {
        setComments(json)
      });
    }

    getData();
  },[])
 

  const commentsData = useMemo( () => {
    let computeComments = comments;
    console.log(computeComments)

    if(search){
      computeComments = computeComments.filter(p =>
        p.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
        p.email.toLowerCase().includes(search.toLocaleLowerCase())
      );
    }

    setTotalitems(computeComments.length)
    return computeComments.slice( 
      (currentPage - 1) * ITEM_PER_Page, 
      (currentPage - 1) * ITEM_PER_Page + ITEM_PER_Page);
      
  },[comments,currentPage, search])

 
        return (
      <>
        <div className="content">
          <Row>        
            <Col md="12">
              <Card className="card-plain">
                <CardHeader>
                  <CardTitle tag="h4">Sales User List</CardTitle>
                  <p className="card-category">
                    Here is a subtitle for this table
                  </p>
                </CardHeader>
                <CardHeader>
              
                  <Pagination total={totalItems} itemsPerPage={ITEM_PER_Page} currentPage={currentPage} 
                  onPageChange={page => setCurrentPage(page)}
                  />
                 
                  
                  <Search onSearch={(value) => { 
                    setSearch(value); 
                    setCurrentPage(1); 
                   }}                 
                  />
           

                  

                </CardHeader>
                <CardBody>
                  <Table responsive >
                  <HeaderComp  headers={headers}/>
                    <tbody>
                      {
                       commentsData.map((p,i) =>(
                          <tr key={i}>
                          <td>{p.id}</td>
                          <td>{p.name}</td>
                          <td>{p.email}</td>
                          <td>{p.body}</td>
                                       
                        </tr>
                        ))
                      }            
                    </tbody>
                  </Table>
                
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
        );
  
}

export default SalesLoginUser;












//   handlePageClick = (e) => {
//     const selectedPage = e.selected;
//     const offset = selectedPage * this.state.perPage;

//     this.setState({
//         currentPage: selectedPage,
//         offset: offset
//     }, () => {
//         this.loadMoreData()
//     });

// };

// loadMoreData() {
//   const data = this.state.orgtableData;
  
//   const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
//   this.setState({
//     pageCount: Math.ceil(data.length / this.state.perPage),
//     tableData:slice
//   })

//   }


//   componentDidMount(){
//     this.getData();
//   }

//   getData(){
//     axios
//     .get("https://jsonplaceholder.typicode.com/comments")
//     .then(res =>{
//       var data = res.data;
//       var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)

//       this.setState({
//         pageCount:Math.ceil(data.length / this.state.perPage),
//         orgtableData : res.data,
//         tableData:slice
//       })
//     })
//   }

  {/* <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                  /> */}