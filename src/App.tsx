import React, { useState, useEffect } from "react";
import Student from "./Component/student";
import { getStudents } from "./Network/API";
import { studentInfo } from "./interface";
import "./Styles/App.css";

const App = () => {
  const [data, setData] = useState<Array<studentInfo>>([]);
  const [filteredData, setFilteredData] = useState<Array<studentInfo>>(data);
  const [results, setResults] = useState<Boolean>(true);

  useEffect(() => {
    async function fetchData() {
      const res = await getStudents();
      console.log(res.students);
      setData(res.students);
      setFilteredData(res.students);
    }

    fetchData();
  }, []);

  const filterStudents = (search: string) => {
    let filter = search.toLowerCase();
    let result = [];
    result = data.filter((studentRecord: studentInfo) => {
      return (
        (studentRecord.firstName.toLowerCase().search(filter) &&
          studentRecord.lastName.toLowerCase().search(filter)) !== -1
      );
    });

    console.log(result);

    if (result.length !== 0) {
      setFilteredData(result);
      setResults(true);
    } else {
      setResults(false);
    }
  };

  return (
    <div className="app-content">
      <form className="input-fields">
        <input
          type="text"
          placeholder="Search by name"
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
            filterStudents(event.target.value)
          }
        />
      </form>
      <section className="student-records">
        {results ? (
          filteredData.map((student: studentInfo) => (
            <Student info={student} key={student.id} />
          ))
        ) : (
          <p> no results </p>
        )}
      </section>
    </div>
  );
};

export default App;
