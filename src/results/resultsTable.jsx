import React from "react";

export function ResultsTable(props) {
  const [results, setResults] = React.useState([]);
  const [tableRows, setTableRows] = React.useState([]);

  const responses = props.responses;
  let results_request = "/api/results/" + props.sessionID;
  // Demonstrates calling a service asynchronously so that
  // React can properly update state objects with the results.

  React.useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(() => {
      fetch(results_request)
        .then((response) => response.json())
        .then((results) => {
          setResults([results[0], results[1], results[2], results[3]]);
          localStorage.setItem("responses", JSON.stringify(results));
        })
        .catch(() => {
          const responsesText = localStorage.getItem("results");
          if (responsesText) {
            setResults(JSON.parse(responsesText));
          }
        });

      // Demonstrates rendering an array with React
      const resultRows = [];
      let total = 0;
      if (results.length) {
        for (const [i, result] of results.entries()) {
          total += result;
          resultRows.push(
            <tr key={i}>
              <td>{responses[i]}</td>
              <td>{result}</td>
            </tr>
          );
        }
        resultRows.push(
          <tr key="4">
            <td>Total:</td>
            <td>{total}</td>
          </tr>
        );
      } else {
        resultRows.push(
          <tr key="0">
            <td colSpan="4">Loading Results...</td>
          </tr>
        );
      }

      setTableRows(resultRows);
    }, 1000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [tableRows]);

  return (
    <div>
      <table className="table table-secondary table-striped-columns">
        <thead className="table-light">
          <tr>
            <th>Responses</th>
            <th>Results</th>
          </tr>
        </thead>
        <tbody id="results">{tableRows}</tbody>
      </table>
    </div>
  );
}
