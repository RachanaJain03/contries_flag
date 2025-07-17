import React, { useState, useEffect } from "react";

function CountryCard({ name, flag, abbr }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
        border: "1px solid grey",
        borderRadius: "4px",
        height: "200px",
        width: "200px",
      }}
    >
      <img
        src={flag}
        alt={`flag of ${abbr}`}
        style={{ height: "100px", width: "100px" }}
      />
      <h2>{name}</h2>
    </div>
  );
}

const API_ENDPOINT = "https://xcountries-backend.azurewebsites.net/all";

const Countries = () => {
  const [countryData, setCountryData] = useState([]);
  const [error, setError] = useState(null); // ✅ Added

  useEffect(() => {
    fetch(API_ENDPOINT)
      .then((res) => res.json())
      .then((data) => setCountryData(data))
      .catch((err) => {
        console.error("Error fetching data:", err.message); // ✅ Cypress expects this
        setError(err.message);
      });
  }, []);

  // Optional: display loading/error state
  if (error) return <p>Error: {error}</p>;
  if (countryData.length === 0) return <p>Loading...</p>;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        alignItems: "center",
      }}
    >
      {countryData.map((item) => (
        <CountryCard
          name={item.name}
          flag={item.flag}
          abbr={item.abbr}
          key={item.abbr}
        />
      ))}
    </div>
  );
};

export default Countries;