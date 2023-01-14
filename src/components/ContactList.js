import React, { useState } from "react";
import "./ContactList.css";

// ContactList component
const ContactList = () => {
  // State for controlling visibility of edit form
  const [showEditForm, setShowEditForm] = useState(false);
  // State for controlling visibility of table
  const [showTable, setShowTable] = useState(true);
  // State for tracking index of contact being edited
  const [editIndex, setEditIndex] = useState(null);
  // State for storing input fields for email
  const [inputListEmail, setInputListEmail] = useState([]);
  // State for storing input fields for phone number
  const [inputListNumber, setInputListNumber] = useState([]);
  // State for storing list of contacts
  const [contacts, setContacts] = useState([
    {
      name: "test1",
      lastname: "test1",
      address: "test1",
      city: "test1",
      country: "test1",
      email: "test1@test1.com",
      number: "111111",
    },
    {
      name: "test2",
      lastname: "test2",
      address: "test2",
      city: "test2",
      country: "test2",
      email: "test2@test2.com",
      number: "222222",
    },
    {
      name: "test3",
      lastname: "test3",
      address: "test3",
      city: "test3",
      country: "test3",
      email: "test3@test3.com",
      number: "333333",
    },
  ]);

  // Function for editing a contact
  const handleEditContact = (index) => {
    setEditIndex(index);
    const emailValues = contacts[index].email.split(" ");
    setInputListEmail(
      emailValues.map((email, idx) => (
        <Input idx={idx} type="email" key={idx} defaultValue={email} />
      ))
    );

    const nameValues = contacts[index].number.split(" ");
    setInputListNumber(
      nameValues.map((number, idx) => (
        <Input idx={idx} type="number" key={idx} defaultValue={number} />
      ))
    );
    setShowEditForm(true);
    setShowTable(false);
  };

  const handleDeleteContact = (index) => {
    const newContacts = [...contacts];
    newContacts.splice(index, 1);
    setContacts(newContacts);
  };

  // Component for creating input fields
  const Input = ({ type, defaultValue }) => {
    return (
      <input
        type={type}
        placeholder={`Enter the ${type}`}
        name={type}
        defaultValue={defaultValue}
      />
    );
  };

  // Function for adding an email input field
  const addInputEmailClick = () => {
    setInputListEmail(
      inputListEmail.concat(<Input type="email" key={inputListEmail.length} />)
    );
  };

  // Function for adding a phone number input field
  const addInputNumberClick = () => {
    setInputListNumber(
      inputListNumber.concat(
        <Input type="number" key={inputListNumber.length} />
      )
    );
  };

  // Function for saving changes after editing
  const handleSaveEdit = (e) => {
    e.preventDefault();
    // Creating an updated contact object

    const emailValues = [
      ...document.querySelectorAll("input[name='email']"),
    ].map((input) => input.value);

    const numberValues = [
      ...document.querySelectorAll("input[name='number']"),
    ].map((input) => input.value);

    const updatedContact = {
      name: e.target.name.value,
      lastname: e.target.lastname.value,
      address: e.target.address.value,
      city: e.target.city.value,
      country: e.target.country.value,
      email: emailValues.map((elem) => elem).join(" "),
      number: numberValues.map((elem) => elem).join(" "),
    };

    // Copying the contacts array to a new variable
    const newContacts = [...contacts];
    // Checking if editing an existing contact or adding a new one
    if (editIndex != null) {
      // Updating existing contact
      newContacts[editIndex] = updatedContact;
    } else {
      // Adding new contact
      newContacts.push(updatedContact);
    }
    setContacts(newContacts);
    setShowEditForm(false);
    setShowTable(true);
    setEditIndex(null);
  };

  return (
    <div>
      <div className="container">
        <div className="contact">
          <div className="contact--items">
            {showTable && (
              <div>
                <div className="contact--header">
                  <h2 className="contact--header--title">Contacts</h2>
                  <button
                    className="contact--header--button"
                    onClick={() => {
                      setShowEditForm(true);
                      setShowTable(false);
                      setEditIndex(null);
                      setInputListEmail([]);
                      setInputListNumber([]);
                    }}
                    type="submit"
                  >
                    Add Contact
                  </button>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Last Name</th>
                      <th>Address</th>
                      <th>City</th>
                      <th>Country</th>
                      <th>Email</th>
                      <th>Number</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact, index) => (
                      <tr key={index}>
                        <td>{contact.name}</td>
                        <td>{contact.lastname}</td>
                        <td>{contact.address}</td>
                        <td>{contact.city}</td>
                        <td>{contact.country}</td>
                        <td>{contact.email}</td>
                        <td>{contact.number}</td>
                        <td>
                          <button
                            className="contact--edit--button"
                            onClick={() => handleEditContact(index)}
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          <button
                            className="contact--delete--button"
                            onClick={() => handleDeleteContact(index)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      {showEditForm && (
        <form onSubmit={handleSaveEdit}>
          <h2 className="register--title">Register new contact</h2>
          <label>Name:</label>
          <input
            required
            type="text"
            placeholder="Enter the Name"
            name="name"
            defaultValue={editIndex !== null ? contacts[editIndex].name : ""}
          />
          <label>Last Name:</label>
          <input
            required
            type="text"
            placeholder="Enter Last Name"
            name="lastname"
            defaultValue={
              editIndex !== null ? contacts[editIndex].lastname : ""
            }
          />
          <label>Address:</label>
          <input
            required
            type="text"
            placeholder="Enter Address"
            name="address"
            defaultValue={editIndex !== null ? contacts[editIndex].address : ""}
          />
          <label>City:</label>
          <input
            required
            type="text"
            placeholder="Enter City"
            name="city"
            defaultValue={editIndex !== null ? contacts[editIndex].city : ""}
          />
          <label>Country:</label>
          <input
            required
            type="text"
            placeholder="Enter country"
            name="country"
            defaultValue={editIndex !== null ? contacts[editIndex].country : ""}
          />

          <label>Email:</label>
          <div
            className={
              inputListEmail.length ? "add--input--col" : "add--input--row"
            }
          >
            {inputListEmail}
            <div>
              <button
                onClick={addInputEmailClick}
                type="button"
                className="register--button"
              >
                Add
              </button>
            </div>
          </div>

          <label>Number:</label>
          <div
            className={
              inputListNumber.length ? "add--input--col" : "add--input--row"
            }
          >
            {inputListNumber}

            <div>
              <button
                onClick={addInputNumberClick}
                type="button"
                className="register--button"
              >
                Add
              </button>
            </div>
          </div>
          <div className="register--buttons">
            <button className="register--button" type="submit">
              Save
            </button>
            <button
              className="register--button"
              type="button"
              onClick={() => {
                setShowEditForm(false);
                setShowTable(true);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactList;
