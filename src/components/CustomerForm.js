import react from "react";

// Form for firsname, lastname and address
const CustomerForm = ({handleChange, newCustomer, addCustomer}) => {
  return (
    <div>
      <form autoComplete="off" onSubmit={addCustomer}>
        <div>First name: <input name="firstName" value = {newCustomer.firstName} onChange={handleChange}/></div>
        <div>Last name: <input name="lastName" value = {newCustomer.lastName} onChange={handleChange}/></div>
        <div>Address: <input name="address" value = {newCustomer.address} onChange={handleChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default CustomerForm