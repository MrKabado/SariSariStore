import React, { useEffect, useState } from 'react'
import Button from '../../components/Button'

function ClientDebtlist() {
  const [debts, setDebts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/debts')
      .then(res => res.json())
      .then(data => setDebts(data))
      .catch(err => console.error('Error fetching debts', err));
}, []);
  return (
    <>
    <div>
        Client Debt

        <h1>Debt List</h1>
        {debts.length === 0 ? <p>No debts found</p> : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Item</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {debts.map((debt, index) => (
                <tr key={index}>
                  <td>{debt.name}</td>
                  <td>{debt.category}</td>
                  <td>{debt.item}</td>
                  <td>{debt.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Button 
          to='/client'  
          label='Return To Customer Page'      
        /> 
    </div>
    </>
  )
}

export default ClientDebtlist
