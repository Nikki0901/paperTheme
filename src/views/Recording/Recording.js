import React from "react";
import ModalVideo from "react-modal-video";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

const data = [
  {
    videoId: "kkvzHjuZAb8",
    name: "rajiv kumar",
    img: require("../../assets/img/faces/ayo-ogunseinde-2.jpg"),
  },
  {
    videoId: "5pt_igBTCsI",
    name: "ashok nath",
    img: require("../../assets/img/faces/clem-onojeghuo-1.jpg"),
  },
  {
    videoId: "tCAt8eEKPDc",
    name: "ranjit singh",
    img: require("../../assets/img/faces/erik-lucatero-1.jpg"),
  },
];

export default class Recording extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      videoid: "",
    };
  }

  openModal(videoContent) {
    this.setState({
      videoid: videoContent,
      isOpen: true,
    });
  }

  render() {
    // console.log("data",data);
    // console.log("videoid: ",this.state.videoid);

    return (
      <>
        <div className="content">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Recording Videos</CardTitle>
            </CardHeader>

            <CardBody>
              <ul className="list-unstyled team-members">
                {data.map((p, i) => (
                  <li key={i}>
                    <Row>
                      <Col md="2" xs="2">
                        <div className="avatar">
                          <img
                            alt="..."
                            className="img-circle img-no-padding img-responsive"
                            src={p.img}
                          />
                        </div>
                      </Col>
                      <Col md="7" xs="7">
                        {p.name}
                        <br />
                        <span className="text-success">
                          <small>Online</small>
                        </span>
                      </Col>
                      <Col  md="3" xs="3">
                        <Button
                          className="btn-round btn-icon"
                          color="success"
                          // outline
                          size="md"
                          onClick={() => this.openModal(p.videoId)}
                        >
                          <i className="fa fa-play" />
                        </Button>
                      </Col>
                    </Row>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
          <ModalVideo
            channel="youtube"
            isOpen={this.state.isOpen}
            // url="https://www.youtube.com/watch?v=kkvzHjuZAb8"
            videoId={this.state.videoid}
            onClose={() => this.setState({ isOpen: false })}
          />
        </div>
      </>
    );
  }
}
