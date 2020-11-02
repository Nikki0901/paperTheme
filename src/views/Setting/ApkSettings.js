import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { useForm } from "react-hook-form";
import { baseUrl } from "../../components/Service/Config";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAlert } from "react-alert";

const Schema = yup.object().shape({
  p_apk: yup.string().required("required apk"),
  p_package: yup.string().required("required package"),
  p_version: yup.string().required("required version"),
  p_platform: yup.string().required("required platform"),
  p_size: yup.string().required("required size"),
  p_type: yup.string().required("required type"),
  p_path: yup.string().required("required path"),
  p_description: yup.string().required("required description"),
});

const ApkSettings = () => {
  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(Schema),
  });
  const alert = useAlert();

  const [settings, setSettings] = useState({
    id: "",
    packages: "",
    version: "",
    path: "",
    type: "",
    description: "",
    platform: "",
    size: "",
    apk_name: "",
  });

  const {
    id,
    packages,
    version,
    path,
    type,
    description,
    platform,
    size,
    apk_name,
  } = settings;

  const auth = JSON.parse(localStorage.getItem("authToken"));

  useEffect(() => {
    const getData = () => {
      fetch(`${baseUrl}/content/getapps/token/${auth}/current_version/15`)
        .then((response) => response.json())
        .then((json) => {
          console.log("data", json);
          if (json.code === 1) {
            setSettings({
              id: json.result.apps[0].id,
              packages: json.result.apps[0].package,
              version: json.result.apps[0].version,
              path: json.result.apps[0].path,
              type: json.result.apps[0].type,
              description: json.result.apps[0].message,
              platform: json.result.apps[0].platform,
              size: json.result.apps[0].size,
              apk_name: json.result.apps[0].apk_name,
            });
          }
        })
        .catch((err) => {
          console.log("error", err);
        });
    };

    getData();
  }, [auth]);

  const onSubmit = (value) => {
    console.log("value :", value);

    let formData = new FormData();
    formData.append("id", id);
    formData.append("apk_name", value.p_apk);
    formData.append("package", value.p_package);
    formData.append("version", value.p_version);
    formData.append("platform", value.p_platform);
    formData.append("size", value.p_size);
    formData.append("type", value.p_type);
    formData.append("path", value.p_path);
    formData.append("description", value.p_description);

    axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${baseUrl}/content/updateApk/token/${auth}`,
      data: formData,
    }).then(function (response) {
      console.log("apk-submit-", response);
      if (response.data.code === 1) {
        alert.success("updated successfully");
      }
    });
  };

  return (
    <>
      <div className="content">
        <Card>
          <CardHeader>
            <Row>
              <Col md="6">
                <CardTitle tag="h4">APK Settings</CardTitle>
              </Col>
            </Row>
          </CardHeader>

          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div
                className="row"
                style={{ display: "flex", justifyContent: "start" }}
              >
                <div className="col-sm-4" style={{ marginBottom: 15 }}>
                  <label>Apk name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="p_apk"
                    defaultValue={apk_name}
                    ref={register}
                  />
                  <p className="error">
                    {errors.p_apk && errors.p_apk.message}
                  </p>
                </div>

                <div className="col-sm-4" style={{ marginBottom: 15 }}>
                  <label>Package</label>
                  <input
                    type="text"
                    className="form-control"
                    value={packages}
                    name="p_package"
                    ref={register}
                  />
                  <p className="error">
                    {errors.p_package && errors.p_package.message}
                  </p>
                </div>

                <div className="col-sm-4" style={{ marginBottom: 15 }}>
                  <label>Version</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={version}
                    name="p_version"
                    ref={register}
                  />
                  <p className="error">
                    {errors.p_version && errors.p_version.message}
                  </p>
                </div>
              </div>

              <div
                className="row"
                style={{ display: "flex", justifyContent: "start" }}
              >
                <div className="col-sm-4" style={{ marginBottom: 15 }}>
                  <label>Platform</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={platform}
                    name="p_platform"
                    ref={register}
                  />
                  <p className="error">
                    {errors.p_platform && errors.p_platform.message}
                  </p>
                </div>

                <div className="col-sm-4" style={{ marginBottom: 15 }}>
                  <label>Size</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={size}
                    name="p_size"
                    ref={register}
                  />
                  <p className="error">
                    {errors.p_size && errors.p_size.message}
                  </p>
                </div>

                <div className="col-sm-4" style={{ marginBottom: 15 }}>
                  <label>Type</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={type}
                    name="p_type"
                    ref={register}
                  />
                  <p className="error">
                    {errors.p_type && errors.p_type.message}
                  </p>
                </div>
              </div>

              <div
                className="row"
                style={{ display: "flex", justifyContent: "start" }}
              >
                <div className="col-sm-4" style={{ marginBottom: 15 }}>
                  <label>Path</label>
                  <textarea
                    type="text"
                    className="form-control"
                    defaultValue={path}
                    name="p_path"
                    ref={register}
                  />
                  <p className="error">
                    {errors.p_path && errors.p_path.message}
                  </p>
                </div>
                <div className="col-sm-8" style={{ marginBottom: 15 }}>
                  <label>Description</label>
                  <textarea
                    type="text"
                    className="form-control"
                    defaultValue={description}
                    name="p_description"
                    ref={register}
                    rows="3"
                  />
                  <p className="error">
                    {errors.p_description && errors.p_description.message}
                  </p>
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </form>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default ApkSettings;
