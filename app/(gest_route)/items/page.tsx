'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Item } from '@/types/Item';
import { AppDispatch, RootState } from '@/lib/store';
import { clearSelectedItem, createItem, deleteItem, fetchItems, getAllItems, setSelectedItem, updateItem } from '@/lib/features/itemSlice';

const ItemsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { 
    items, 
    loading, 
    error, 
    selectedItem, 
    pagination 
  } = useSelector((state: RootState) => state.items);

  console.log(items, 'items in the page.tsx')

  const [newItem, setNewItem] = useState<Partial<Item>>({
    name: '',
    description: ''
  });

  // Fetch items when component mounts
  useEffect(() => {
    dispatch(getAllItems({}));
  }, [dispatch]);

  // Handle form submission for creating/updating item
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedItem) {
      // Update existing item
      dispatch(updateItem({
        ...selectedItem,
        ...newItem
      }));
    } else {
      // Create new item
      dispatch(createItem(newItem as Omit<Item, 'id'>));
    }
    
    // Reset form
    setNewItem({ name: '', description: '' });
  };

  // Handle item deletion
  const handleDelete = (id: string) => {
    dispatch(deleteItem(id));
  };

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    dispatch(fetchItems({ 
      page: newPage, 
      size: pagination.size 
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Items Management</h1>

      {/* Error Handling */}
      {error && (
        <div className="bg-red-100 text-red-700 p-2 mb-4">
          {error}
        </div>
      )}

      {/* Item Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name || ''}
          onChange={(e) => setNewItem({ 
            ...newItem, 
            name: e.target.value 
          })}
          className="border p-2 mr-2"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newItem.description || ''}
          onChange={(e) => setNewItem({ 
            ...newItem, 
            description: e.target.value 
          })}
          className="border p-2 mr-2"
        />
        <button 
          type="submit" 
          className="bg-blue-500 text-white p-2"
        >
          {selectedItem ? 'Update' : 'Create'}
        </button>
        {selectedItem && (
          <button 
            type="button" 
            onClick={() => dispatch(clearSelectedItem())}
            className="bg-gray-500 text-white p-2 ml-2"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Items List */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {items.map((item) => (
            <div 
              key={item.id} 
              className="flex justify-between items-center border p-2 mb-2"
            >
              <div>
                <h3 className="font-bold">{item.name}</h3>
                <p>{item.description}</p>
              </div>
              <div>
                <button 
                  onClick={() => dispatch(setSelectedItem(item))}
                  className="bg-yellow-500 text-white p-1 mr-2"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(item.id || '')}
                  className="bg-red-500 text-white p-1"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: pagination.totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`mx-1 p-2 ${
              pagination.page === i 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ItemsPage;