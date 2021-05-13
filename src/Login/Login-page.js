import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAlert } from "react-alert";
import { baseUrl } from "../components/Service/Config";
import clip from "../../src/assets/video/clip.mp4";
import "./login-style.css";

const Login2 = (props) => {
  const { handleSubmit, register, errors, reset } = useForm();
  const alert = useAlert();

  const onSubmit = (value) => {
    props.history.push("/admin/dashboard");
    // let formData = new FormData();
    // formData.append("email", value.email);
    // formData.append("password", value.password);

    // axios({
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   url: `${baseUrl}/auth/admin_login`,
    //   data: formData,
    // })
    //   .then(function (response) {
    //     console.log("res-", response);
    //     if (response.data.code === 1) {
    //       alert.success("You have successfully Login!");
    //       localStorage.setItem(
    //         "authToken",
    //         JSON.stringify(response.data.result.token)
    //       );
    //       localStorage.setItem(
    //         "userName",
    //         JSON.stringify(response.data.result.name)
    //       );
    //       props.history.push("/admin/dashboard");
    //       reset();
    //     } else {
    //       alert.error("login failed, invalid password !");
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("erroror - ", error);
    //   });
  };

  return (
    <>
      <video className="background-video" loop autoPlay muted>
        <source src={clip} type="video/mp4" />
      </video>
      <div className="login_head">
        <form
          className="login_form col-lg-3 col-md-6 col-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1>Vride</h1>
          <div class="form-group">
            <input
              placeholder="Email"
              type="email"
              name="email"
              className="input_Field"
              // ref={register({
              //   required: "Email is required",
              //   pattern: {
              //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              //     message: "Invalid email address",
              //   },
              // })}
            />
            {/* <p className="error">{errors.email && errors.email.message}</p> */}
          </div>
          <div class="form-group">
            <input
              type="password"
              name="password"
              className="input_Field"
              placeholder="Password"
              // ref={register({
              //   required: "required",
              // })}
            />

            {/* {errors.password && <p className="error">Password is required</p>} */}
          </div>

          <div class="form-group">
            <button
              type="submit"
              class="btn btn-primary
                 btn-block btn-large"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login2;
