import React, { useState, useEffect, useCallback } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";
import { useForm } from "react-hook-form";
import { baseUrl } from "../../components/Service/Config";
import { useAlert } from "react-alert";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../../assets/css/style.css";

const Schema = yup.object().shape({
  p_title: yup.string().required("required title"),
  p_email: yup.string().email("invalid email").required("required email"),
  p_fname: yup.string().required("required first name"),
  p_lname: yup.string().required("required last name"),
  p_dealer: yup.string().required("select dealer name"),
  p_city: yup.string().required("required city"),
  p_passcode: yup.string().required("required passcode"),
  p_phone: yup
    .string()
    .required("required phone no")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(20, "max 20 digits"),
  p_pin: yup
    .string()
    .required("required pincode no")
    .matches(/^[0-9]+$/, "Must be only digits no")
    .max(20, "max 15 digits"),
});

const AddDetails = ({ addModal, addHandler, getData, next }) => {
  const alert = useAlert();
  const { handleSubmit, register, reset, errors } = useForm({
    resolver: yupResolver(Schema),
  });

  const [dealer, setDealer] = useState([]);

  const auth = JSON.parse(localStorage.getItem("authToken"));
  //user name
  const userName = JSON.parse(localStorage.getItem("userName"));

  //get dealership

  const getDealerShip = useCallback(() => {
    fetch(`${baseUrl}/dealership/list/offset/0/limit/10/token/${auth}`)
      .then((response) => response.json())
      .then((json) => {
        console.log("getdealer", json.result);
        if (json.code === 1) {
          setDealer(json.result);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [auth]);

  useEffect(() => {
    getDealerShip();
  }, [getDealerShip]);

  //add data
  const onSubmit = (value) => {
    console.log("value :", value);

    let formData = new FormData();
    formData.append("title", value.p_title);
    formData.append("dealer_name", value.p_dealer);
    formData.append("first_name", value.p_fname);
    formData.append("last_name", value.p_lname);
    formData.append("email", value.p_email);
    formData.append("phone", value.p_phone);
    formData.append("city", value.p_city);
    formData.append("pin_code", value.p_pin);
    formData.append("passcode", value.p_passcode);

    axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${baseUrl}/Bmw/add/sales_person/token/${auth}`,
      data: formData,
    }).then(function (response) {
      console.log("res-", response);
      if (response.data.code === 1) {
        alert.success("Data Successfully Added ");
        reset();
        getData(next);
        addHandler();
      }
    });
  };

  return (
    <div>
      <Modal isOpen={addModal} toggle={addHandler} size="lg">
        <ModalHeader toggle={addHandler}>Add User</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              class="form-row"
            >
              <div class="form-group col-sm-4">
                <label>Add title</label>
                <input
                  type="text"
                  className="form-control"
                  name="p_title"
                  ref={register}
                  value={userName}
                />
                <p className="error">
                  {errors.p_title && errors.p_title.message}
                </p>
              </div>

              <div class="form-group col-sm-4">
                <label>Email Id</label>
                <input
                  type="email"
                  className="form-control"
                  name="p_email"
                  ref={register}
                />
                <p className="error">
                  {errors.p_email && errors.p_email.message}
                </p>
              </div>
              <div class="form-group col-sm-4">
                <label>Passcode</label>
                <input
                  type="text"
                  className="form-control"
                  name="p_passcode"
                  ref={register}
                />
                <p className="error">
                  {errors.p_passcode && errors.p_passcode.message}
                </p>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-sm-4">
                <label>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="p_fname"
                  ref={register}
                />
                <p className="error">
                  {errors.p_fname && errors.p_fname.message}
                </p>
              </div>

              <div class="form-group col-sm-4">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="p_lname"
                  ref={register}
                />
                <p className="error">
                  {errors.p_lname && errors.p_lname.message}
                </p>
              </div>

              <div class="form-group col-sm-4">
                <label>Select Dealer Name</label>
                <select className="form-control" name="p_dealer" ref={register}>
                  <option value="">--select--</option>
                  {dealer.map((p, index) => (
                    <option key={index} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
                <p className="error">
                  {errors.p_dealer && errors.p_dealer.message}
                </p>
              </div>

              
            </div>

            <div class="form-row">
              <div class="form-group col-sm-4">
                <label>Phone</label>
                <input
                  type="text"
                  className="form-control"
                  name="p_phone"
                  ref={register}
                />
                <p className="error">
                  {errors.p_phone && errors.p_phone.message}
                </p>
              </div>
              <div class="form-group col-sm-4">
                <label>Pin Code</label>
                <input
                  type="text"
                  className="form-control"
                  name="p_pin"
                  ref={register}
                />
                <p className="error">{errors.p_pin && errors.p_pin.message}</p>
              </div>

              <div class="form-group col-sm-4">
                <label>City</label>
                <input
                  type="text"
                  className="form-control"
                  name="p_city"
                  ref={register}
                />
                <p className="error">
                  {errors.p_city && errors.p_city.message}
                </p>
              </div>
            </div>


            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AddDetails;
