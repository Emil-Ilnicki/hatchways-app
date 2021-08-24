import React, { useState, useEffect } from "react";
import Student from "./Component/student";
import { getStudents } from "./Network/API";
import { studentJSON } from "./interface";
import "./Styles/App.css";

const App = () => {
  const [data, setData] = useState<Array<studentJSON>>([]);
  const [filteredData, setFilteredData] = useState<Array<studentJSON>>(data);
  // used to conditionally render results from filtered search
  const [results, setResults] = useState<Boolean>(true);

  useEffect(() => {
    async function fetchData() {
      const res = await getStudents();
      console.log(res);
      let tagData: studentJSON[] = [];
      res.students.map((student: studentJSON) => {
        let addTagToStudent = student;
        addTagToStudent.tags = [""];
        tagData.push(addTagToStudent);
      });

      setData(tagData);
      setFilteredData(tagData);
    }

    fetchData();
  }, []);

  const filterStudents = (search: string) => {
    let filter = search.toLowerCase();
    let result = [];
    result = data.filter((studentRecord: studentJSON) => {
      return (
        studentRecord.firstName.toLowerCase().search(filter) !== -1 ||
        studentRecord.lastName.toLowerCase().search(filter) !== -1
      );
    });

    const addStudentTag = (tag: string, index: number) => {
      const studentsTag = [...data];
      studentsTag[index].tags.push(tag);
      setData(studentsTag);
    };

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
          className="name-filter"
          type="text"
          placeholder="Search by name"
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
            filterStudents(event.target.value)
          }
        />
        <input className="tag filter" type="text" placeholder="Search by tag" />
      </form>
      <section className="student-records">
        {results ? (
          filteredData.map((student: studentJSON) => (
            <Student info={student} key={student.id} />
          ))
        ) : (
          <p className="no-records"> no results </p>
        )}
      </section>
    </div>
  );
};

export default App;
