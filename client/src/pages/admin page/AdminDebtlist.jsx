import React from 'react'
import Button from '../../components/Button'

function AdminDebtlist() {
  const [name, setName] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [item, setItem] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [groupItems, setGroupItems] = React.useState({});
  const [message, setMessage] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, category, item, price);

    if (!name || !category || !item || !price) return;

    const newItem = {
      item,
      price:parseFloat(price)
    }

    // create structure for person who debts
    setGroupItems(prev => ({ 
      ...prev,
      [name]: {
        ...(prev[name] || {}), //check if naay existing name
          [category]: [
            ...(prev[name]?.[category] || []), //if naay existing nga category if yes e add ra
            newItem //if naa e dungag ang bagong item
          ]
      },
    }));

    setName('');
    setCategory('');
    setItem('');
    setPrice('');
  };

  const handleClearDebt = (name) => {
    const clearConfirmation = window.confirm("Are you sure to clear the debt?");

    if (!clearConfirmation) return;

    setGroupItems(prev => {
      const updatedGroupItems = {...prev};
      delete updatedGroupItems[name];
      return updatedGroupItems;
    });

      setMessage(`Successfully Cleared ${name} Debt! ✅`);

    setTimeout(() => {
      setMessage('')
     }, 2000);
  };

  return (
    <>
    <div>
        <header className='border p-2'>
          <div className='AddDebt'>
            <form onSubmit={handleSubmit}>
              {/* For Ngalan */}
              <select name="name" id="" value={name} onChange={(e) => setName(e.target.value)}>
                <option value="" disabled>Select Person</option>
                <option value="Jers">Jers</option>
                <option value="Maricar">Maricar</option>
              </select>
              
              {/* For Item Category */}
              <select name="category" id="" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="" disabled>Select Item</option>
                <option value="Soap">Soap</option>
                <option value="Shampoo">Shampoo</option>
              </select>

              {/* For Item */}
              <input 
                type="text" 
                value={item}
                onChange={(e) => setItem(e.target.value)}
              />
              
              {/* For Price */}
              <input 
                type="number" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              {/* BUTTONS */}
              <button type='submit'>Add</button> 
            </form>
          </div>
        </header>

        <div className='border m-auto w-[50%]'>
          <h1>Debt</h1>
          {message}
          {Object.entries(groupItems).map(([name, category]) => (
            
            <div key={name} className='flex flex-col justify-center'>
                <h2 className='font-extrabold'>{name}</h2>
                {/* deletion of utang*/}
                <button 
                  onClick={() => handleClearDebt(name)}
                  className='inline-block'
                  >
                  Clear Debt
                </button>

              {Object.entries(category).map(([category, item]) => (
                <div key={category}>
                  <h3>{category}</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.map((itemObj, index) => (
                        <tr key={index}>
                          <td>{itemObj.item}</td>
                          <td>{itemObj.price.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
                  ))}
        </div>
        
        <Button 
          to='/admin'  
          label='Return To Admin Page'      
        />
    </div>
    </>
  )
}

export default AdminDebtlist
