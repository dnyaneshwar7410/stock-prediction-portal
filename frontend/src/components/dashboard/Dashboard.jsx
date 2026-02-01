
import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const [ticker, setTicker] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [plot, setPlot] = useState(null);
  const [ma100, setMa100] = useState(null);
  const [ma200, setMa200] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const [mse, setMse] = useState(null);
  const [rmse, setRmse] = useState(null);
  const [r2, setR2] = useState(null);
  const [tomorrowPrice, setTomorrowPrice] = useState(null);

  useEffect(() => {
    axiosInstance.get("/protected-view/").catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Reset previous state
    setError(null);
    setPlot(null);
    setMa100(null);
    setMa200(null);
    setPrediction(null);
    setTomorrowPrice(null);

    try {
      const response = await axiosInstance.post("/predict/", { ticker });

      if (response.data.error) {
        setError(response.data.error);
        return;
      }

      const backendRoot = import.meta.env.VITE_BACKEND_ROOT;

      setPlot(`${backendRoot}${response.data.plot_img}`);
      setMa100(`${backendRoot}${response.data.plot_100_dma}`);
      setMa200(`${backendRoot}${response.data.plot_200_dma}`);
      setPrediction(`${backendRoot}${response.data.plot_prediction}`);

      setMse(response.data.mse);
      setRmse(response.data.rmse);
      setR2(response.data.r2);
      setTomorrowPrice(response.data.tomorrow_prediction);
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container text-light">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Stock Ticker"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
            />

            {error && <div className="text-danger mt-2">{error}</div>}

            <button
              type="submit"
              className="btn btn-info mt-3"
              disabled={loading}
            >
              {loading ? (
                <span>
                  <FontAwesomeIcon icon={faSpinner} spin /> Please wait...
                </span>
              ) : (
                "See Prediction"
              )}
            </button>
          </form>

          {/* Prediction Section */}
          
          {prediction && !error && (
            <div className="prediction mt-4">
              <img src={plot} className="img-fluid mb-3" />
              <img src={ma100} className="img-fluid mb-3" />
              <img src={ma200} className="img-fluid mb-3" />
              <img src={prediction} className="img-fluid mb-3" />

              <h4>Model Evaluation</h4>
              <p>MSE: {mse}</p>
              <p>RMSE: {rmse}</p>
              <p>R² Score: {r2}</p>
              <p>
                Tomorrow’s predicted price of <b>{ticker}</b>:{" "}
                <b>{tomorrowPrice}</b>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
