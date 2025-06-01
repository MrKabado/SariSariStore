import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';

function AdminItemlists() {
  const [category, setCategory] = useState('');
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [groupItems, setGroupItems] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null); // to track _id from DB
  const [message, setMessage] = useState('');

  // Fetch items on mount
  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    try {
      const res = await fetch('http://192.168.0.112:8080/items');
      const data = await res.json();

      // Group items by category
      const grouped = {};
      data.forEach(i => {
        if (!grouped[i.category]) grouped[i.category] = [];
        grouped[i.category].push(i); // keep whole object including _id
      });
      setGroupItems(grouped);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !item || !price) return;

    try {
      const res = await fetch('http://192.168.0.112:8080/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, name: item, price: parseFloat(price) }),
      });

      if (!res.ok) throw new Error('Failed to add item');

      const savedItem = await res.json();

      setGroupItems(prev => ({
        ...prev,
        [category]: [...(prev[category] || []), savedItem],
      }));

      setItem('');
      setPrice('');
      setSelectedIndex(null);
      setSelectedItemId(null);
      setMessage('Item added successfully!');
      setTimeout(() => setMessage(''), 2000);
    } catch (error) {
      console.error(error);
      setMessage('Failed to add item');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (selectedIndex === null || !category || !item || !price || !selectedItemId) return;

    try {
      const res = await fetch(`http://192.168.0.112:8080/items/${selectedItemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: item, price: parseFloat(price) }),
      });

      if (!res.ok) throw new Error('Failed to update item');

      const updatedItem = await res.json();

      setGroupItems(prev => {
        const updatedItems = [...(prev[category] || [])];
        updatedItems[selectedIndex] = updatedItem;
        return {
          ...prev,
          [category]: updatedItems,
        };
      });

      setItem('');
      setPrice('');
      setSelectedIndex(null);
      setSelectedItemId(null);
      setMessage('Item updated successfully!');
      setTimeout(() => setMessage(''), 2000);
    } catch (error) {
      console.error(error);
      setMessage('Failed to update item');
    }
  };

  const handleDelete = async (indexToDelete) => {
    const deleteConfirmation = window.confirm('Are you sure to delete the item?');
    if (!deleteConfirmation) return;

    const itemToDelete = groupItems[category][indexToDelete];
    if (!itemToDelete?._id) return;

    try {
      const res = await fetch(`http://192.168.0.112:8080/items/${itemToDelete._id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete item');

      setGroupItems(prev => {
        const updatedItems = [...(prev[category] || [])];
        updatedItems.splice(indexToDelete, 1);
        return {
          ...prev,
          [category]: updatedItems,
        };
      });

      if (selectedIndex === indexToDelete) {
        setItem('');
        setPrice('');
        setSelectedIndex(null);
        setSelectedItemId(null);
      }

      setMessage('Item deleted successfully!');
      setTimeout(() => setMessage(''), 2000);
    } catch (error) {
      console.error(error);
      setMessage('Failed to delete item');
    }

  };

  return (
    <div className="global-holder border m-0">
      <header className="border p-2 sticky">
        <div className="AddItem">
          <form onSubmit={handleSubmit}>
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="" disabled>Select Item</option>
              <option value="Soap">Soap</option>
              <option value="Shampoo">Shampoo</option>
              <option value="Soap Panlaba">Soap-pablaba</option>
              <option value="Dishwashing">Diswashing</option>
              <option value="Cigarretes">Cigarretes</option>
              <option value="Softdrinks">Softdrinks</option>
              <option value="Canned Goods">Canned Goods</option>
              <option value="Noodles">Noodles</option>
              <option value="UNKNOWN">WAKO KIBAW</option>
            </select>

            <input
              type="text"
              placeholder="Item Name"
              required
              value={item}
              onChange={(e) => { 
                const value = e.target.value;
                const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
                setItem(capitalized);
              }}
            />

            <input
              type="number"
              placeholder="Price"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <button type="submit" className='btn'>Add</button>
            <button type="button" className='btn' onClick={handleUpdate} disabled={selectedIndex === null}>
              Update
            </button>
          </form>
          <Button to="/admin" label="Return To Admin Page" classname='btn'/>
        </div>
        <br />
        <p className='text-green-500'>{message}</p>
      </header>

      <div className="admin-list-holder border m-auto w-[50%]">
        <h2 className=''>ITEMS</h2>
        {Object.entries(groupItems).map(([categoryName, items]) => (
          <div key={categoryName} className="flex flex-col justify-center">
            <h3 className="font-extrabold">{categoryName}</h3>
            <table className=''>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Price</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {items.map((itemObj, index) => (
                  <tr
                    key={itemObj._id}
                    onClick={() => {
                      setCategory(categoryName);
                      setItem(itemObj.name);
                      setPrice(itemObj.price);
                      setSelectedIndex(index);
                      setSelectedItemId(itemObj._id);
                    }}
                    className="hover:cursor-pointer"
                  >
                    <td>{itemObj.name}</td>
                    <td>₱{itemObj.price.toFixed(2)}</td>
                    <td className="w-5">
                      <button
                        className="hover:cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(index);
                        }}
                      >
                        ❌
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminItemlists;
