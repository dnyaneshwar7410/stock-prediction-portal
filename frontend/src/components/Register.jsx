import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setEroors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);
    // get data from inputs
    const userData = {
      username,
      email,
      password,
    };

    // send data to the backend using axios
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/register/",
        userData,
      );
      setEroors({});
      setSuccess(true);
      console.log("Response.data =>>", response.data);
      console.log("successfull");
    } catch (error) {
      setEroors(error.response.data);
      console.error("registration error", error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 bg-light-dark rounded">
            <h3 className="text-light text-center m-4">Create An Account</h3>

            {/* Form */}
            <form action="" onSubmit={handleRegistration}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <small>
                  {errors.username && (
                    <div className="text-danger">{errors.username}</div>
                  )}
                </small>
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <small>
                  {errors.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                </small>
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Set Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <small>
                  {errors.password && (
                    <div className="text-danger">{errors.password}</div>
                  )}
                </small>
              </div>
              {success && (
                <div className="alert alert-success">
                  Registration Successfull
                </div>
              )}

              {loading ? (
                <button
                  type="submit"
                  className="btn btn-info d-block mx-auto m-3"
                  disabled
                >
                  <FontAwesomeIcon icon={faSpinner} spin />
                  Please wait ......
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-info d-block mx-auto m-3"
                >
                  Register
                </button>
              )}
            </form>

            {/* End Form */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
