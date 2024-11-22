'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './page.module.css';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [action, setAction] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get('http://localhost:5000/products');
    setProducts(response.data);
  };

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAction = async () => {
    if (action === 'delete') {
      await axios.post('http://localhost:5000/products/delete', { ids: selectedIds });
    } else if (action === 'update') {
      alert('Update action triggered');
    }
    setSelectedIds([]);
    setAction('');
    fetchProducts();
  };

  return (
    <div className={styles.container}>
      
      <nav className={styles.navbar}>
        <select
          value={action}
          onChange={(e) => setAction(e.target.value)}
          className={styles.dropdown}
        >
          <option value="">Select Action</option>
          <option value="delete">Delete</option>
          <option value="update">Update</option>
        </select>
        <button
          onClick={handleAction}
          className={styles.actionButton}
          disabled={!action || selectedIds.length === 0}
        >
          Apply
        </button>
      </nav>

      
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Select</th>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className={styles.checkboxWrapper}>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(product.id)}
                  onChange={() => handleCheckboxChange(product.id)}
                />
              </td>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
