import React, {useState, useEffect} from "react";
import './App.css';
import Navbar  from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import TodoList from "./components/TodoList"
import TodoForm from "./components/TodoForm";
import axios from "axios";

function App() {

    const [todos, setTodos] = useState([]);

    useEffect(() => {
      axios.get("http://127.0.0.1:8000/api/todo/")
      .then((res)=>{
        console.log(res)
        setTodos(res.data.reverse())
      }).catch(()=>{
        alert("Something went wrong")
      })
    }, [])


  return (
    <div className="App">
      <Navbar bg="light" style={{marginBottom: "20px"}}> 
        <Container>
          <Navbar.Brand href="#">
            Todo Application
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Container>
        <TodoForm todos={todos} setTodos={setTodos} />
        <TodoList todos={todos} setTodos={setTodos} />
      </Container>
      
    </div>
  );
}

export default App;
