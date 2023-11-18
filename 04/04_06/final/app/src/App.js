import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState("");

  useEffect(() => {
    // Fetch all items from the API when the component mounts
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:4000/items");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleAddItem = async () => {
    try {
      const response = await axios.post("http://localhost:4000/items", {
        name: newItemName,
        completed: false,
      });
      setItems(response.data);
      setNewItemName("");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleToggleComplete = async (itemId) => {
    try {
      await axios.put(`http://localhost:4000/items/${itemId}`);
      fetchItems(); // Fetch updated items after the toggle
    } catch (error) {
      console.error("Error toggling item completion:", error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:4000/items/${itemId}`);
      fetchItems(); // Fetch updated items after deletion
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="container" style={{ marginTop: "2rem" }}>
      <h1>Item Manager</h1>
      <div>
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <button className="add-btn" onClick={handleAddItem}>
          Add Item
        </button>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <span
              style={{
                textDecoration: item.completed ? "line-through" : "none",
              }}
              onClick={() => handleToggleComplete(item.id)}
            >
              {item.name}
            </span>
            <button
              className="delete-btn"
              onClick={() => handleDeleteItem(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
