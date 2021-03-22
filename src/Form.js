import React, { useState, useReducer } from 'react'
import Modal from "./Modal"


function Form() {
    function reducer(state, action) {

        if (action.type === "add_item") {
            const newPeople = [...state.people, action.payLoad]
            return { ...state, people: newPeople, isModal: true, modalContent: "Item Added" }
        }
        if (action.type === "remove_item") {
            const newPeople = state.people.filter((person) => person.id !== action.payLoad)
            return { ...state, people: newPeople, isModal: true, modalContent: "Item Removed" }
        }
        if (action.type === "close_modal") {
            return { ...state, isModal: false }
        }

    }
    function closeModal() {
        dispatch({ type: "close_modal" })
    }
    function handleSubmit(e) {
        e.preventDefault()
        if (name && email) {
            const newItem = { id: new Date().getTime().toString(), name: name, email: email }
            dispatch({ type: "add_item", payLoad: newItem })
            setName("")
            setEmail("")
        }
    }
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [state, dispatch] = useReducer(reducer, { people: [], isModal: false, modalContent: "" })
    return (
        <React.Fragment>
            {state.isModal && (<Modal modalContent={state.modalContent} closeModal={closeModal}></Modal>)}
            <form class="form" onSubmit={handleSubmit}>
                <div class="form-control">
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="text" value={name} onChange={(e) => setName(e.target.value)}></input>
                </div>
                <div class="form-control">
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <button class="btn" type="submit">Submit</button>

            </form>
            {
                state.people.map((person) => {
                    return (
                        <div class="item" key={person.id}>
                            <h1>{person.name}</h1>
                            <p>{person.email}</p>
                            <button type="submit" onClick={() => { dispatch({ type: "remove_item", payLoad: person.id }) }}>remove </button>

                        </div>)
                })
            }
        </React.Fragment>
    )
}
export default Form