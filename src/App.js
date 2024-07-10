import React, { useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [performanceMetrics, setPerformanceMetrics] = useState({
    firstContentfulPaint: "",
    largestContentfulPaint: "",
    cumulativeLayoutShift: "",
    totalBlockingTime: "",
  });
  const [loading, setLoading] = useState(false);
  const getPageSpeedInsights = async () => {
    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      alert("Please enter a valid URL.");
      return;
    }

    const apiKey = "AIzaSyCHhvIvFoyATIwow71aP3qRde_b1LWtY54"; // Replace with your actual PageSpeed Insights API key
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${trimmedUrl}&key=${apiKey}&strategy=mobile`;
    setLoading(true);
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const lighthouseResult = data.lighthouseResult;

      setPerformanceMetrics({
        firstContentfulPaint:
          lighthouseResult.audits["first-contentful-paint"].displayValue,
        largestContentfulPaint:
          lighthouseResult.audits["largest-contentful-paint"].displayValue,
        cumulativeLayoutShift:
          lighthouseResult.audits["cumulative-layout-shift"].displayValue,
        totalBlockingTime:
          lighthouseResult.audits["total-blocking-time"].displayValue,
      });
    } catch (error) {
      console.error("Error fetching PageSpeed Insights:", error);
      alert("Error fetching PageSpeed Insights. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h2>Page Speed Insights</h2>
        <label htmlFor="urlInput">Enter URL:</label>
        <input
          type="text"
          id="urlInput"
          placeholder="Enter your website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={getPageSpeedInsights}>Get Insights</button>
        {loading ? (
          <div className="loader"></div>
        ) : (
          <div id="result">
            <h3>Performance Metrics:</h3>
            <p>
              <strong>First Contentful Paint:</strong>{" "}
              <span id="firstContentfulPaint">
                {performanceMetrics.firstContentfulPaint}
              </span>
            </p>
            <p>
              <strong>Largest Contentful Paint:</strong>{" "}
              <span id="largestContentfulPaint">
                {performanceMetrics.largestContentfulPaint}
              </span>
            </p>
            <p>
              <strong>Cumulative Layout Shift:</strong>{" "}
              <span id="cumulativeLayoutShift">
                {performanceMetrics.cumulativeLayoutShift}
              </span>
            </p>
            <p>
              <strong>Total Blocking Time:</strong>{" "}
              <span id="totalBlockingTime">
                {performanceMetrics.totalBlockingTime}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
