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
      <img src={flag} alt={`flag of ${abbr}`} style={{
        height: "100px", width:"100px", alignContent:"center", textAlign:"center"
      }} /> {/* ✅ src fixed */}
      <h2>{name}</h2>
    </div>
  );
}

const API_ENDPOINT = "https://xcountries-backend.azurewebsites.net/all";

const Countries = () => {
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    fetch(API_ENDPOINT)
      .then((res) => res.json())
      .then((data) => setCountryData(data))
      .catch((error) => console.error("Error Fetching Data:", error));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        alignItems: "center",
        border:"10px"
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

export default Countries; // ✅ export Countries not CountryCard