import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';

function ClientItemlist() {
  const [groupedItems, setGroupedItems] = useState({});

  useEffect(() => {
    fetch('http://192.168.0.112:8080/items')
      .then(res => res.json())
      .then(data => {
        const grouped = {};
        data.forEach(item => {
          if (!grouped[item.category]) {
            grouped[item.category] = [];
          }
          grouped[item.category].push(item);
        });
        setGroupedItems(grouped);
      })
      .catch(err => console.error('Error fetching items:', err));
  }, []);

  return (
    <div className='global-holder'>
      <h1 className="text-xl font-bold mb-2">Available Items</h1>
      <Button to="/client" label="Return To Customer Page" classname='btn' /><br />

      {Object.keys(groupedItems).length === 0 ? (
        <p>No items available.</p>
      ) : (
        Object.entries(groupedItems).map(([category, items]) => (
          <div key={category} className="items-holder mb-4">
            <h2 className="text-lg font-semibold">{category}</h2>
            <ul className="pl-4 list-disc">
              {items.map((item, index) => (
                <li key={index}>
                  <strong>{item.name}</strong> - ₱{item.price.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default ClientItemlist;
