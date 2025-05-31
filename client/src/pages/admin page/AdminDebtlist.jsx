import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';

function AdminDebtlist() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [groupItems, setGroupItems] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    try {
      const res = await fetch('http://192.168.0.112:8080/debts');
      const data = await res.json();

      const grouped = {};
      data.forEach(i => {
        if (!grouped[i.name]) grouped[i.name] = {};
        if (!grouped[i.name][i.category]) grouped[i.name][i.category] = [];
        grouped[i.name][i.category].push(i);
      });
      setGroupItems(grouped);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !category || !item || !price) return;

    const newDebt = {
      name,
      category,
      item,
      price: parseFloat(price),
    };

    try {
      const res = await fetch('http://192.168.0.112:8080/debts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDebt),
      });

      if (!res.ok) throw new Error('Failed to add item');

      const savedDebt = await res.json();

      setGroupItems(prev => ({
        ...prev,
        [name]: {
          ...(prev[name] || {}),
          [category]: [
            ...(prev[name]?.[category] || []),
            savedDebt
          ],
        },
      }));

      setMessage(`Debt added successfully for ${name}! ✅`);
      setTimeout(() => setMessage(''), 2000);

      setName('');
      setCategory('');
      setItem('');
      setPrice('');
    } catch (error) {
      console.error('Error submitting debt:', error);
    }
  };

  const handleClearDebt = async (name) => {
    const clearConfirmation = window.confirm("Are you sure to clear the debt?");
    if (!clearConfirmation) return;

    try {
      const res = await fetch(`http://192.168.0.112:8080/debts/name/${name}`, { 
        method: 'DELETE',
       });
      
      if (!res.ok) throw new Error('Failed to delete debts');
      
      setGroupItems(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });

      setMessage(`Successfully Cleared ${name} Debt! ✅`);
      setTimeout(() => setMessage(''), 2000);
    } catch (error) {
      console.error('Error clearing debt:', error);
      setMessage('Failed to clear debt');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  return (
    <div className='global-holder'>
      <header className='border p-2'>
        <div className='AddDebt'>
          <form onSubmit={handleSubmit}>
            {/* Person Name */}
            <select value={name} onChange={(e) => setName(e.target.value)}>
              <option value="" disabled>Select Person</option>
              <option value="Jers">Jers</option>
              <option value="Maricar">Maricar</option>
            </select>

            {/* Item Category */}
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="" disabled>Select Item</option>
              <option value="Soap">Soap</option>
              <option value="Shampoo">Shampoo</option>
            </select>

            {/* Item Name */}
            <input 
              type="text" 
              placeholder="Item" 
              value={item}
              onChange={(e) => { 
                const value = e.target.value;
                const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
                setItem(capitalized);
              }} 
            />

            {/* Price */}
            <input 
              type="number" 
              placeholder="Price" 
              value={price}
              onChange={(e) => setPrice(e.target.value)} 
            />

            {/* Add Button */}
            <button className='btn' type='submit'>Add</button>
          </form>
          <Button classname='btn' to='/admin' label='Return To Admin Page' />
        </div>
      </header>

      <div className='debt-holder m-auto w-[50%]'>
        <h1>Debt</h1>
        <div>{message}</div>
        {Object.entries(groupItems).map(([name, categories]) => (
          <div key={name} className='flex flex-col justify-center'>
            <h2 className='font-extrabold'>{name}</h2>

            <button onClick={() => handleClearDebt(name)} className='btn inline-block'>
              Clear Debt
            </button>

            {Object.entries(categories).map(([categoryName, items]) => (
              <div className='debt-item-holder' key={categoryName}>
                <h3>{categoryName}</h3>
                <table className='debt-item-table'>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th className='debt-item-price'>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((itemObj, index) => (
                      <tr key={index}>
                        <td>{itemObj.item}</td>
                        <td className='debt-item-price'> ₱{itemObj.price.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDebtlist;
