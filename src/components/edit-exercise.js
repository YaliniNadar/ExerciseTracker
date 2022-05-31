import { React, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EditExercise2(props) {
  const [username, setUsername] = useState("");
  const [desc, setDesc] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);
  const { id } = useParams();
  const refTest = useRef("userInput");

  function onChangeUsername(e) {
    setUsername(e.target.value);
  }

  function onChangeDescription(e) {
    setDesc(e.target.value);
  }

  function onChangeDuration(e) {
    setDuration(e.target.value);
  }

  function onChangeDate(date) {
    setDate(date);
  }

  function onSubmit(e) {
    e.preventDefault();
    const exercise = {
      username: username,
      description: desc,
      duration: duration,
      date: date,
    };

    console.log(exercise);

    axios
      .post(`http://localhost:5000/exercises/update/${id}`, exercise)
      .then((res) => console.log(res.data));

    window.location = "/";
  }

  useEffect(() => {
    axios
      .get(`http://localhost:5000/exercises/${id}`)
      .then((res) => {
        setUsername(res.data.username);
        setDesc(res.data.description);
        setDuration(res.data.duration);
        setDate(new Date(res.data.date));
      })
      .catch(function (error) {
        console.log(error);
      });

    axios.get("http://localhost:5000/users/").then((res) => {
      if (res.data.length > 0) {
        setUsers(res.data.map((user) => user.username));
        setUsername(res.data[0].username);
      }
    });
  }, []);

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            ref={refTest}
            required
            className="form-control"
            value={username}
            onChange={onChangeUsername}
          >
            {users.map(function (user) {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={desc}
            onChange={onChangeDescription}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            value={duration}
            onChange={onChangeDuration}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={date} onChange={onChangeDate} />
          </div>
        </div>
        <br />
        <div className="form-group">
          <input
            type="submit"
            value="Edit Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default EditExercise2;
