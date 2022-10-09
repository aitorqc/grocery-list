import React, { useState, useEffect } from 'react';
import Alert from './Alert';
import List from './List';

import './App.css';

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if(list){
    return JSON.parse(localStorage.getItem("list"));
  }else{
    return []
  }
}

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  useEffect(()=>{
    localStorage.setItem("list", JSON.stringify(list))
  }, [list]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger",  "Please enter value");
    } else if (name && isEditing) {
      setList(list.map((item)=>{
        if(item.id === editId){
          return({id: item.id, title: name});
        }
        return item;
      }));
      setName("");
      setEditId(null);
      setIsEditing(false);
    } else {
      showAlert(true, "success", "item added to the list");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  }

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  }

  const clearList = () => {
    showAlert(true, "danger", "empty list");
    setList([]);
  }

  const removeItem = (id) => {
    console.log(id);
    showAlert(true, "danger", "item removed");
    setList(list.filter((item) => item.id !== id));
  }

  const editItem = (id) => {
    console.log(id);
    const specificItem = list.find((item) => item.id === id);
    console.log(specificItem);
    setIsEditing(true);
    setEditId(id);
    setName(specificItem.title);
  }

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert}/>}
        <h3>Grocery List</h3>
        <div className="form-control">
          <input type="text" className='grocery' placeholder='e.g. eggs' value={name} onChange={(e) => setName(e.target.value)} />
          <button type="submit" className='submit-btn'>{isEditing ? "edit" : "submit"}</button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery container">
          <List items={list} remove={removeItem} edit={editItem}></List>
          <button className='clear-btn' onClick={clearList}>Clear Items</button>
        </div>
      )}
    </section>
  );
}

export default App;
