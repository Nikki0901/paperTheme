import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { useForm } from "react-hook-form";
import {baseUrl} from "../../components/Service/Config";
import { useAlert } from "react-alert";

const Setting = () => {
  const { handleSubmit, register } = useForm();
  const alert = useAlert();

  const [productId, setProductId] = useState("");
  const [video, setVideo] = useState("");
  const [broucher, setBroucher] = useState("");
  const [specification, setSpecification] = useState("");

  const auth = JSON.parse(localStorage.getItem("authToken"));

  useEffect(() => {
    const getData = () => {
      fetch(`${baseUrl}/get/Product/settings/token/${auth}`)
        .then((response) => response.json())
        .then((json) => {
          console.log("data", json);
          if (json.code === 1) {
            console.log("video", json.result[0].id);
            setProductId(json.result[0].id);
            setVideo(json.result[0].product_video_url);
            setBroucher(json.result[0].product_brochure_url);
            setSpecification(json.result[0].product_specification);
          } else {
            console.log("no data");
          }
        })
        .catch((err) => {
          console.log("error",err);
        });
    };
    getData();
  }, [auth,alert]);

 

  const onSubmit = (value) => {
    console.log("value :", value);
    let formData = new FormData();
    formData.append("product_video_url", value.p_video);
    formData.append("product_brochure_url", value.p_broucher);
    formData.append("product_specification", value.p_specification);
    formData.append("product_id", productId);

    axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${baseUrl}/post/edit/product/settings/token/${auth}`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          alert.success("updated successfully");
        } else {
          alert.show("result not found!");
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <>
      <div className="content">
        <Card>
          <CardHeader>
            <Row>
              <Col md="6">
                <CardTitle tag="h4">Product Settings</CardTitle>
              </Col>
            </Row>
          </CardHeader>

          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label className="col-sm-4 col-form-label">Product Video</label>
                <div className="col-sm-10">
                  <input
                    className="form-control"
                    name="p_video"
                    defaultValue={video}
                    ref={register({
                      required: "required",
                    })}
                  />
                </div>

                <label className="col-sm-4 col-form-label">
                  Product Broucher
                </label>
                <div className="col-sm-10">
                  <input
                    className="form-control"
                    name="p_broucher"
                    defaultValue={broucher}
                    ref={register({
                      required: "required",
                    })}
                  />
                </div>

                <label className="col-sm-4 col-form-label">
                  Product Specification
                </label>
                <div className="col-sm-10">
                  <input
                    className="form-control"
                    name="p_specification"
                    defaultValue={specification}
                    ref={register({
                      required: "required",
                    })}
                  />
                </div>
              </div>

              <div className="col-sm-8">
                <button type="submit" className="btn btn-primary">
                  update
                </button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Setting;
