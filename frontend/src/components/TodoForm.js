import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form  from "react-bootstrap/Form";

export default function TodoForm({ todos, setTodos }){
    const [title, setTitle] = useState(""); 

    const handleChange = (e)=> {
        setTitle(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (!title) {
            alert("Please provide a valid value for todo");
            return;
        }

        axios.post("http://127.0.0.1:8000/api/todo/", {
            title: title
        }).then((res) => {
            setTitle("");
            const { data } = res;
            setTodos([
                ...todos,
                data
            ]).catch(() => {
                alert("Something went wrong");
            })
        })
    }
     
    return(
        <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-4">
                <FormControl placeholder="New Todo"
                    onChange={handleChange}
                    value={title}
                />
                <Button type="submit">Add</Button>
            </InputGroup>
        </Form>
    )
}