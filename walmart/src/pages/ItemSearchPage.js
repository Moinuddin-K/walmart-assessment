import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import ItemCard from "../components/ItemCard";
import "./ItemSearchPage.css";

const ItemSearchPage = () => {
  const [allItems, setAllItems] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchAllItems = () => {
      fetch("http://localhost:8080/items")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setAllItems(data.items);
          setDisplayItems(data.items); 
          setLoading(false); 
        })
        .catch((err) => {
          console.error("Error fetching all items:", err);
          setLoading(false); 
        });
    };

    fetchAllItems();
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setDisplayItems(allItems);
    } else {
      const filteredItems = allItems.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.price.toString().includes(searchQuery) ||
          item.image.toString().toLowerCase().includes(searchQuery)
      );
      setDisplayItems(filteredItems);
    }
  }, [searchQuery, allItems]);

  return (
    <div>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ul className="ItemGrid">
        {displayItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </ul>
      {loading && <p>Loading items...</p>}
    </div>
  );
};

export default ItemSearchPage;
