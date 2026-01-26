import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setEroors] = useState(false)
  const navigate = useNavigate()
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userData = {
      username,
      password,
    };
    console.log(userData);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/token/",
        userData,
      );
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      setIsLoggedIn(true)
      console.log("Login successfull..");
      navigate('/dashboard')
    } catch (error) {
      setEroors(true)
      console.error("Invalid Creadentials..");
    } finally {
      setLoading(false); 
    }
  };
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 bg-light-dark rounded">
            <h3 className="text-light text-center m-4">Login To Our Portal</h3>

            {/* Form */}
            <form action="" onSubmit={handleLogin}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <small>{ errors && <div className="text-danger">Invalid Credentials</div>}</small>

              {loading ? (
                <button
                  type="submit"
                  className="btn btn-info d-block mx-auto m-3"
                  disabled
                >
                  <FontAwesomeIcon icon={faSpinner} spin />
                  Logging in ......
                </button>
              ) : ( 
                <button
                  type="submit"
                  className="btn btn-info d-block mx-auto m-3"
                >
                  Login
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

export default Login;
