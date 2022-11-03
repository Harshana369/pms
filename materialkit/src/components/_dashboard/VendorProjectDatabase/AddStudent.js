import react, { useState } from 'react';
import axios from 'axios';
// -----------------{/* eslint jsx-a11y/label-has-associated-control: ["error", { assert: "either" } ] */}

export default function AddStudent() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  function sendData(e) {
    e.preventDefault();
    const newStudent = {
      name,
      age,
      gender
    };
    axios
      .post('/student/add', newStudent)
      .then(() => {
        alert('Student Added');
        setName('');
        setAge('');
        setGender('');
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div>
      <form onSubmit={sendData}>
        <div className="form-group">
          <label htmlFor="name">Student Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Student Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Student Age</label>
          <input
            type="text"
            className="form-control"
            id="age"
            placeholder="Student Age"
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Student Gender</label>
          <input
            type="text"
            className="form-control"
            id="gender"
            placeholder="Student Gender"
            onChange={(e) => {
              setGender(e.target.value);
            }}
          />
        </div>
        <div>
          <br />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
