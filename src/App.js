import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CustomerForm from './components/CustomerForm'
import CustomerList from './components/CustomerList'
import customerService from './services/customers'

function App() {

  // States
  const [customers, setCustomers] = useState([])
  const [company, setCompany] = useState([])
  const [newCustomer, setNewCustomer] = useState({
    firstName : "",
    lastName : "",
    address : ""
  })
  const companyId = 1  // In the future we could add some way to change company in our website. Now you can change this id here for showing customers from other company.
  //const companyUrl = `http://localhost:8080/api/companies/${companyId}`
  const companyUrl = `https://registry-back-end.herokuapp.com/api/companies/${companyId}` 
  

  // effect-hook for fetching customers from server
  useEffect(() => {
    customerService
      .getAll(companyId)
      .then(customers => {
        setCustomers(customers)
      })
  }, [])

  // effect-hook for fetching company from server
  useEffect(() => {
    axios
      .get(`${companyUrl}`)
      .then(response => {
        setCompany(response.data)
      })
  }, [])


  // Event handler for a "add new customer" fields
  const handleCustomerChange = (event) => {
    const value = event.target.value
    setNewCustomer({
      ...newCustomer, 
      [event.target.name]: value
    })
  }

  // Event handler for button "add" customer
  const addCustomer = (event) => {
    event.preventDefault()
    const customerObj = {...newCustomer, "company": `${companyUrl}`}
    console.log(customerObj.address)
    if (customerObj.firstName === '' || customerObj.lastName === '' || customerObj.address === '') {           // checking if there is empty fields in customer form
      alert('enter the information in all fields')
    }
    else if (customers.filter(customer => `${customer.firstName}${customer.lastName}${customer.address}` ===   // Checking there is no customer with the same info
        `${customerObj.firstName}${customerObj.lastName}${customerObj.address}`).length === 0 ) {
      customerService
        .create(customerObj)
        .then(returnedCustomer => {
          setCustomers(customers.concat(returnedCustomer))
        })
    }
    else {
      alert("There is already customer with the same information")
    }
    setNewCustomer({
      firstName : "",
      lastName : "",
      address : ""
    })
  }

  // Handle customer delete
  const handleDelete = (customer) => {
    const result = window.confirm(`Delete ${customer.firstName} ${customer.lastName}?`)
    if (result) { // delete if ok
      customerService
      .deleteObject(customer)
      .then(() => {
        setCustomers(customers.filter(c => c._links.self.href !== customer._links.self.href))
      })
    }
  }

  return (
    <div>
      <h1>{company.name} registry</h1>
      <h2>Add new customer</h2>
      <CustomerForm addCustomer = {addCustomer} handleChange={handleCustomerChange} newCustomer = {newCustomer} />
      <h2>Customers</h2>
      <button type="button" onClick={(e) => { e.preventDefault(); window.location.href=`${companyUrl}/export`; }}>Download CSV</button>
      <CustomerList customers = {customers} handleDelete = {handleDelete} />
    </div>
  );
}
  
export default App;
