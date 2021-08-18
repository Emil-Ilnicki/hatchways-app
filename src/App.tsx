import React, { useState, useEffect } from "react";
import Student from "./Component/student";
import { getStudents } from "./Network/API";
import { studentInfo } from "./interface";

const App = () => {
  const [data, setData] = useState<Array<studentInfo>>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await getStudents();
      console.log(res.students);
      setData(res.students);
    }

    fetchData();
  }, []);

  return (
    // Add id its in the JSON
    <section className="student-records">
      {data.map((student: studentInfo) => (
        <Student info={student} key={student.id} />
      ))}
    </section>
  );
};

export default App;
