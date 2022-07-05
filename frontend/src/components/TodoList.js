import React, { useState } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdCheckBox, MdCheckBoxOutlineBlank, MdEdit, MdDelete } from "react-icons/md";


export default function TodoList({todos = [], setTodos}) {
    
    //Edit modal states
    const [show, setShow] = useState(false);
    const [todoitem, setTodoitem] = useState(null);

    //modal popoup
    const handleClose = () => { 
        setShow(false); 
    }

    const handleDelete = (id) =>{
        axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`)
        .then(()=> {
            const newTodos = todos.filter(t => {
                return t.id !== id
            });
            setTodos(newTodos);
        }).catch(()=> {
            alert("Sumfin went wrong");
        })
    }

    const handleUpdate = async (id, value) => {
        return axios.patch(`http://127.0.0.1:8000/api/todo/${id}/`, value)
        .then((res) => {
            const {data} = res;
            const newTodos = todos.map(t => {
                if(t.id === id){
                    return data
                }
                return t; 
            }) 
            setTodos(newTodos);
        }).catch(()=>{
            alert("Something went wrong")
        })
    }


    const renderListGroupItem = (t) => {
        return <ListGroup.Item key={t.id}
        className="d-flex justify-content-between align-items-center" style={{padding: "1.0rem 1rem"}}>
        <div className="d-flex justify-content-center">
            <span style={{marginRight:"12px", cursor:"pointer"}}
            onClick={()=>{handleUpdate(t.id, {
                completed: !t.completed
            })}}>
                {t.completed === true ? <MdCheckBox/> : <MdCheckBoxOutlineBlank/>}
            </span>
            <span>
                {t.title}
            </span>
        </div>
        <div>
            <MdEdit style={{ cursor: "pointer", marginRight:"12px", color:"blue"}} onClick={() =>{
                setTodoitem(t);
                setShow(true);
            }}/>
            <MdDelete style={{cursor: "pointer", color:"red", }} onClick={() => { handleDelete(t.id);}} />

        </div>

        </ListGroup.Item>
    }
   
    //Even listener
    const handleChange = (e) => {
        setTodoitem({
            ...todoitem,
            title: e.target.value
        })
    }

    //Handle submit Btn
    const handleSaveChanges = async () =>{
        await handleUpdate(todoitem.id, {title: todoitem.title});
        handleClose();
}     


    //make uncompleted todos to appear on top
    const completedTodos = todos.filter(t => t.completed === true);
    const incompletedTodos = todos.filter(t => t.completed === false); 

    return (
    <div>
    

        <div className="mb-2 mt-4" style={{ color:"grey", }}>
               <h5> Incomplete Todos ({incompletedTodos.length})</h5>
        </div>
        <ListGroup>
            {incompletedTodos.map(renderListGroupItem)}
        </ListGroup>

        <div className="mb-2 mt-4" style={{ color:"grey", }}>
                <h5>Completed Todos ({completedTodos.length})</h5>
        </div>
        <ListGroup>
            {completedTodos.map(renderListGroupItem)}
        </ListGroup>

        

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Edit
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <FormControl value={todoitem ? todoitem.title : ""} onChange={handleChange}/>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>

                <Button variant="primary" onClick={handleSaveChanges}>
                    Save 
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
    
    )
} 