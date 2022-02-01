import react from "react";

// Table for customer-info (firstname, lastname, address)
// includes delete button
const CustomerList = ({customers,handleDelete}) => (
  <div>
    <table>
      <tbody> 
      <tr><td><b>First name</b></td><td><b>Last Name</b></td><td><b>Address</b></td><td></td></tr>
        {customers.map(customer => 
          <tr key={customer._links.self.href}><td>{customer.firstName}</td><td>{customer.lastName}</td><td>{customer.address}</td><td><button onClick={() => handleDelete(customer)}>delete</button></td></tr>
        )}
      </tbody>
    </table>
  </div>
)

export default CustomerList