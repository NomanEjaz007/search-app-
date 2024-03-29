import React, { useState } from "react";
import "./App.css";
import { metroData, projectData, productData } from "./DummyData";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (!term) {
      setResults([]);
      return;
    }

    const mergedData = productData.map((product) => {
      const project = projectData.find(
        (p) => p.ProjectGroupID === product.ProjectGroupID
      );
      const metro = metroData.find(
        (m) => m.MetroAreaID === project.MetroAreaID
      );

      return {
        ...product,
        ...project,
        ...metro,
      };
    });

    const searchResults = mergedData
      .filter((item) => {
        return Object.values(item).some((value) =>
          value?.toString().toLowerCase().includes(term)
        );
      })
      .sort((a, b) => a.ProductName.localeCompare(b.ProductName));

    setResults(searchResults);
  };

  return (
    <div className="App">
      <input
        className="SearchInput"
        type="text"
        placeholder="Search..."
        onChange={handleSearch}
        value={searchTerm}
        autoFocus
      />
      <div>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product ID</th>
              <th>Metro Area Title</th>
              <th>Full Name</th>
              <th>Project Group ID</th>
            </tr>
          </thead>
        </table>
        {results.length > 0 ? (
          <table>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td>{result.ProductName}</td>
                  <td>{result.ProductID}</td>
                  <td>{result.MetroAreaTitle}</td>
                  <td>{result.FullName}</td>
                  <td>{result.ProjectGroupID}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          searchTerm && <div className="Message">No Result Found !!</div>
        )}
      </div>
    </div>
  );
}

export default App;
