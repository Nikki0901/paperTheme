import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

const data = [
  {
    name:"Total Users",
    Total_number:1238900,
    status:"Update now",
    icon:"nc-icon nc-money-coins text-success"
  },
  {
    name:"Total Session",
    Total_number:62380,
    status:"Update now",
    icon:"nc-icon nc-globe text-warning"

  },{
    name:"Total Sales Person  ",
    Total_number:39540,
    status:"Update now",
    icon:"nc-icon nc-money-coins text-success"

  },{
    name:"Total Followers",
    Total_number:34100,
    status:"Update now",
    icon:"nc-icon nc-globe text-warning"

  },
  {
    name:"Total Users",
    Total_number:900,
    status:"Last Day",
    icon:"nc-icon nc-favourite-28 text-primary"
  },
  {
    name:"Total Session",
    Total_number:2376,
    status:"Last Day",
    icon:"nc-icon nc-globe text-warning"
  },{
    name:"Total Sales Person  ",
    Total_number:9768,
    status:"Last Day",
    icon:"nc-icon nc-favourite-28 text-primary"
  },{
    name:"Total Followers",
    Total_number:2310,
    status:"Last Day",
    icon:"nc-icon nc-globe text-warning"
  },

]


class Dashboard extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <Row>
         
              {
                data.map((p,i) => (
                 <Col lg="3" md="6" sm="6">             
                <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className={p.icon} />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">{p.name}</p>
                        <CardTitle tag="p">{p.Total_number}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fas fa-sync-alt" /> {p.status}
                  </div>
                </CardFooter>
              </Card>
              </Col>
                ))
              }
              
             
          </Row>
        
        </div>
      </>
    );
  }
}

export default Dashboard;


