import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';

function ClientDebtlist() {
  const [groupedDebts, setGroupedDebts] = useState({});

  useEffect(() => {
    fetch('http://localhost:8080/debts')
      .then(res => res.json())
      .then(data => {
        const grouped = {};
        data.forEach(debt => {
          if (!grouped[debt.name]) {
            grouped[debt.name] = {};
          }
          if (!grouped[debt.name][debt.category]) {
            grouped[debt.name][debt.category] = [];
          }
          grouped[debt.name][debt.category].push(debt);
        });
        setGroupedDebts(grouped);
      })
      .catch(err => console.error('Error fetching debts', err));
  }, []);

  return (
    <div className='global-holder'>
      <Button to="/client" label="Return To Customer Page" classname="btn" />
      <h1 className="">DEBT LIST</h1>

      {Object.keys(groupedDebts).length === 0 ? (
        <p>No debts found.</p>
      ) : (
        Object.entries(groupedDebts).map(([name, categories]) => (
          <div key={name} className="debt-holder">
            <h2>{name}</h2>
            {Object.entries(categories).map(([category, debts]) => (
              <div key={category} className="">
                <h3 className="debt-category">{category}</h3>
                <ul className="">
                  {debts.map((debt, index) => (
                    <li key={index}>
                      <strong>{debt.item}</strong> - ₱{debt.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default ClientDebtlist;
