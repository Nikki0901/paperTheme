import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAlert } from "react-alert";
import "./login-form.css";
import { baseUrl } from "../components/Service/Config";
import clip from "../../src/assets/video/clip.mp4";

const Login = (props) => {
  const { handleSubmit, register, errors, reset } = useForm();
  const alert = useAlert();

  const onSubmit = (value) => {
    let formData = new FormData();
    formData.append("email", value.email);
    formData.append("password", value.password);

    axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${baseUrl}/auth/admin_login`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          alert.success("You have successfully Login!");
          localStorage.setItem(
            "authToken",
            JSON.stringify(response.data.result.token)
          );
          localStorage.setItem(
            "userName",
            JSON.stringify(response.data.result.name)
          );
          props.history.push("/admin/dashboard");
          reset();
        } else {
          alert.error("login failed, invalid password !");
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
        alert.show("request error !");
      });
  };

  return (
    <>
      <div>
        <video id="background-video" loop autoPlay muted>
          <source src={clip} type="video/mp4" />
        </video>

        <div className="login">
          <h1>Vride</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input_Field"
              ref={register({
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            <p className="error">{errors.email && errors.email.message}</p>
            <input
              type="password"
              name="password"
              className="input_Field"
              placeholder="password"
              ref={register({
                required: "required",
              })}
            />
            {errors.password && <p className="error">Password is required</p>}

            <button
              type="submit"
              className="btn btn-primary
                 btn-block btn-large"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
