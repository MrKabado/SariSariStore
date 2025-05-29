import React from 'react'
import Button from '../../components/Button'

function AdminItemlists() {
  const [category, setCategory] = React.useState('');
  const [item, setItem] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [groupItems, setGroupItems] = React.useState({});
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [message, setMessage] = React.useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !item || !price) return;

    const newItem = { name: item, price: parseFloat(price) };

    setGroupItems(prev => ({
      ...prev,
      [category]: [...(prev[category] || []), newItem]
    }));

    setItem('');
    setPrice('');
    setSelectedIndex(null);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (selectedIndex === null || !category || !item || !price) return;

    setGroupItems(prev => {
      const updatedItems = [...(prev[category] || [])];
      updatedItems[selectedIndex] = {
        name: item,
        price: parseFloat(price),
      };

      return {
        ...prev,
        [category]: updatedItems,
      };
    });

    setItem('');
    setPrice('');
    setSelectedIndex(null);
  };

  const handleDelete = (indexToDelete) => {
    const deleteConfirmation = window.confirm('are you sure to delete the list?');

    if (!deleteConfirmation) return;

    setGroupItems(prev => {
      const updatedItems = [...(prev[category] || [])];
      updatedItems.splice(indexToDelete, 1);

      return {
        ...prev,
        [category]: updatedItems,
      }
    });

    if (selectedIndex === indexToDelete) {
      setItem('');
      setPrice('');
      setSelectedIndex(null);
    }

    setMessage('deleted successfully! ✅');

    setTimeout(() => {
      setMessage('')
    }, 2000);
  };

  return (
    <div className='border m-0'>
      <header className='border p-2 sticky'>
        <div className='AddItem'>
          <form onSubmit={handleSubmit}>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="" disabled>Select</option>
              <option value="Soap">Soap</option>
              <option value="Shampoo">Shampoo</option>
            </select>

            <input
              type="text"
              placeholder='Item Name'
              value={item ?? ''}
              onChange={(e) => setItem(e.target.value)}
            />

            <input
              type="number"
              placeholder='Price'
              value={price ?? ''}
              onChange={(e) => setPrice(e.target.value)}
            />

            <button type='submit'>Add</button>
            <button type='button' onClick={handleUpdate}>Update</button>
          </form>
        </div><br />
        <p>{message}</p>

      </header>

      <div className='border m-auto w-[50%]'>
        <h2>Items</h2>
        {Object.entries(groupItems).map(([category, items]) => (
          <div key={category} className='flex flex-col justify-center'>
            <h3 className='font-extrabold'>{category}</h3>
            <table>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {items.map((itemObj, index) => (
                  <tr 
                    key={index} 
                    onClick={() => {
                    setItem(itemObj.name ?? '');
                    setPrice(itemObj.price ?? '');
                    setSelectedIndex(index);
                  }}
                    className='hover:cursor-pointer'
                  >
                    <td>{itemObj.name}</td>
                    <td>₱{itemObj.price.toFixed(2)}</td>
                    <td className='w-5'>
                      <button 
                        className='hover:cursor-pointer'
                        onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(index);
                    }}>❌</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      <Button to='/admin' label='Return To Admin Page' />
    </div>
  );
}

export default AdminItemlists;
