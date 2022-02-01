import axios from 'axios'
//const baseUrlCompanies = 'http://localhost:8080/api/companies'
//const baseUrlCustomers = 'http://localhost:8080/api/customers'

const baseUrlCompanies = 'https://registry-back-end.herokuapp.com/api/companies'
const baseUrlCustomers = 'https://registry-back-end.herokuapp.com/api/customers'

const getAll = (companyId) => {
    const request = axios.get(`${baseUrlCompanies}/${companyId}/customers`)
    return request.then(response => response.data._embedded.customers)
}
  
const create = (newObject) => {
  const request = axios.post(`${baseUrlCustomers}`, newObject)
  return request.then(response => response.data)
}

const deleteObject = (customer) => {
    const urlCustomerToDelete = customer._links.self.href
    const request = axios.delete(urlCustomerToDelete)
    return request.then(response => response.data)
}

const exportedObj = { getAll, create, deleteObject }
export default exportedObj