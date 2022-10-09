import React from 'react'
import { FaEdit, FaTrash } from "react-icons/fa";

export default function List({ items, remove, edit }) {
    return (
        <div className="grocery-list">
            {items.map((item) => {
                return (
                    <article key={item.id} className="grocery-item">
                        <p className="title">{item.title}</p>
                        <div className="btn-container">
                            <button className="edit-btn" onClick={() => edit(item.id)}>
                                <FaEdit></FaEdit>
                            </button>
                            <button className="delete-btn" onClick={() => remove(item.id)}>
                                <FaTrash></FaTrash>
                            </button>
                        </div>
                    </article>)
            })}
        </div>
    )
}
