import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { useForm } from "react-hook-form";
import {baseUrl} from "../../components/Service/Config";
import axios from "axios";
import { useAlert } from "react-alert";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const Schema = yup.object().shape({
  p_title: yup.string().required('required title'),
  p_email: yup.string().email('invalid email').required('required email'),
  p_fname: yup.string().required('required first name'),
  // p_lname: yup.string().required('required last name'),
  p_city: yup.string().required('required city'),
  p_phone:yup.string()
            .required('required phone no')
            .matches(/^[0-9]+$/, "Must be only digits")
            .min(10, 'Must be exactly 10 digits')
            .max(20, 'max 20 digits'),
  p_pin:yup.string()
            .required('required pincode no')
            .matches(/^[0-9]+$/, "Must be only digits no")
            .max(20, 'max 15 digits'),
});

const EditDetails = ({ editModal, editHandler, id, getData ,next }) => {
  const alert = useAlert();
  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(Schema)
  });

  const auth = JSON.parse(localStorage.getItem("authToken"));
   //user name
   const userName = JSON.parse(localStorage.getItem("userName"));

  const [user, setUser] = useState({
    // title: "",
    fname: "",
    lname: "",
    email: "",
    phone: "",
    city: "",
    pin: "",
  });

  const {  fname, lname, email, city,phone, pin } = user;

  useEffect(() => {
    console.log("call edit use effect");
    axios
      .get(`${baseUrl}/bmw/sales_list/token/${auth}/id/${id}/offset/0/limit/10`)
      .then(function (response) {
        // console.log("data with id-", response);
        setUser({
          // title: response.data.result[0].title,
          fname: response.data.result[0].first_name,
          lname: response.data.result[0].last_name,
          email: response.data.result[0].email,
          phone: response.data.result[0].phone,
          city: response.data.result[0].city,
          pin: response.data.result[0].pincode,
        });
      });
  }, [id,auth]);

  const onSubmit = (value) => {
    console.log("value :", value);

    let formData = new FormData();
    formData.append("title", value.p_title);
    formData.append("first_name", value.p_fname);
    formData.append("last_name", value.p_lname);
    formData.append("email", value.p_email);
    formData.append("phone", value.p_phone);
    formData.append("city", value.p_city);
    formData.append("pin_code", value.p_pin);

    axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${baseUrl}/Bmw/edit_sales_person/token/${auth}/user_id/${id}`,
      data: formData,
    }).then(function (response) {
      // console.log("edit-submit-", response);
      alert.success("Updated Successfully ");
      getData(next);
      editHandler();
    });
  };

  return (
    <div>
      <Modal isOpen={editModal} toggle={editHandler} size="lg">
        <ModalHeader toggle={editHandler}>Edit User</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              className="row"
              style={{ display: "flex", justifyContent: "start" }}
            >
              <div className="col-sm-5" style={{ marginBottom: 15 }}>
                <label>Add title *</label>
                <input
                  type="text"
                  className="form-control"
                  value={userName}
                  name="p_title"
                  ref={register}
                />
                <p className="error">{errors.p_title && errors.p_title.message}</p>
              </div>

              <div className="col-sm-5" style={{ marginBottom: 15 }}>
                <label>Email Id *</label>
                <input
                  type="email"
                  className="form-control"
                  defaultValue={email}
                  name="p_email"
                  ref={register}
                />
                <p className="error">{errors.p_email && errors.p_email.message}</p>
              </div>
            </div>
            <div
              className="row"
              style={{ display: "flex", justifyContent: "start" }}
            >
              <div className="col-sm-5" style={{ marginBottom: 15 }}>
                <label>First Name *</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={fname}
                  name="p_fname"
                  ref={register}
                />
                <p className="error">{errors.p_fname && errors.p_fname.message}</p>
              </div>
              <div className="col-sm-5" style={{ marginBottom: 15 }}>
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={lname}
                  name="p_lname"
                  ref={register}
                />
              </div>
            </div>
            <div
              className="row"
              style={{ display: "flex", justifyContent: "start" }}
            >
              <div className="col-sm-5" style={{ marginBottom: 15 }}>
                <label>Phone *</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={phone}
                  name="p_phone"
                  ref={register}
                />
                <p className="error">{errors.p_phone && errors.p_phone.message}</p>
              </div>

              <div className="col-sm-5" style={{ marginBottom: 15 }}>
                <label>City *</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={city}
                  name="p_city"
                  ref={register}
                />
                <p className="error">{errors.p_city && errors.p_city.message}</p>
              </div>
            </div>

            <div
              className="row"
              style={{ display: "flex", justifyContent: "start" }}
            >
              <div className="col-sm-5" style={{ marginBottom: 15 }}>
                <label>Pin Code *</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={pin}
                  name="p_pin"
                  ref={register}
                />
                <p className="error">{errors.p_pin && errors.p_pin.message}</p>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default EditDetails;



// const loadUser = async () => {
//   console.log("id loadUser :", id);
//   const response = await axios.get(`${baseUrl}/bmw/sales_list/token/5eee167482092/id/${id}/offset/0/limit/10`);
//     setUser({
//       name : response.data.result[0].first_name,
//   })
//   console.log(user);
// };

// console.log("id :", id);
// const [title, setTitle] = useState("");
// const [fname, setFname] = useState("");
// const [lname, setLname] = useState("");
// const [email, setEmail] = useState("");
// const [phone, setPhone] = useState("");
// const [city, setCity] = useState("");
// const [pin, setPin] = useState("");

// axios
//   .get(
//     `${baseUrl}/bmw/sales_list/token/5eee167482092/id/${id}/offset/0/limit/10`
//   )
//   .then(function (response) {
//     // console.log("res-", response);
//     if (response.data.code === 1) {
//       setTitle(response.data.result[0].title);
//       setFname(response.data.result[0].first_name);
//       setLname(response.data.result[0].last_name);
//       setEmail(response.data.result[0].email);
//       setPhone(response.data.result[0].phone);
//       setCity(response.data.result[0].city);
//       setPin(response.data.result[0].pincode);
//     }
//   });
