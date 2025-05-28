import React from 'react'
import Button from '../../components/Button'

function AdminItemlists() {
  const [category, setCategory] = React.useState('');
  const [item, setItem] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [groupItems, setGroupItems] = React.useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!category || !item || !price) return;

    const newItem = {name: item, price: parseFloat(price)};

    setGroupItems(prev => ({
      ...prev,
      [category]: [...(prev[category] || []), newItem]
    }));

    setItem('')
    setPrice('')

  } 

  return (
    <>
    <div>
        Item List
      
        <div className='AddItem'>
          <form action="" onSubmit={handleSubmit}>
            <select name="" id="" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="" disabled>Select</option>
              <option value="Soap">Soap</option>
              <option value="Shampoo">Shampoo</option>
            </select>

            <input 
              type="text" 
              placeholder='Item Name'
              value={item}
              onChange={(e) => setItem(e.target.value)}            
            />

            <input 
              type="number" 
              placeholder='Price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <button type='submit'>Add</button>
            <button>Update</button>
            <button>Delete</button>
          </form>
        </div>

        <div className='border m-auto w-[50%]'>
          <h1>Items</h1>
          {Object.entries(groupItems).map(([category, item]) => (
            <div key={category} className='flex flex-col justify-center'>
              <h2 className='font-extrabold'>{category}</h2>
              <table>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {item.map((itemObj, index) => (
                    <tr key={index}>
                      <td>{itemObj.name}</td>
                      <td>₱{itemObj.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

export default AdminItemlists
