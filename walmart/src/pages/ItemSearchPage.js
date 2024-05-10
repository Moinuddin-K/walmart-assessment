import React, { useState, useEffect, useRef } from "react";
import SearchBar from "../components/SearchBar";
import ItemCard from "../components/ItemCard";
import "./ItemSearchPage.css";

const ItemSearchPage = () => {
  const [allItems, setAllItems] = useState([]); // Store all items fetched
  const [displayItems, setDisplayItems] = useState([]); // Items currently displayed
  const [page, setPage] = useState(1); // Track current page number
  const [hasMore, setHasMore] = useState(true); // Keep track of more data
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const observerRef = useRef(); // To keep track of the observer for the sentinel

  // Function to fetch items from the backend
  const fetchItems = (pageNumber = 1, limit = 8) => {
    fetch(`http://localhost:8080/items?page=${pageNumber}&limit=${limit}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.items.length < limit) {
          setHasMore(false);
        }
        setAllItems((prev) => [...prev, ...data.items]);
        setDisplayItems((prev) => [...prev, ...data.items]);
        setLoading(false); // Mark as done loading
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
        setLoading(false);
      });
  };

  // Initial load of the first 8 items
  useEffect(() => {
    fetchItems(1, 8);
  }, []);

  useEffect(() => {
    if (!hasMore) return; // Stop observing if no more items to load

    const currentObserverRef = observerRef.current; 

    const handleObserver = (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setLoading(true);
        setPage((prev) => prev + 1); // Increment page to fetch next batch
      }
    };

    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: "0px",
      threshold: 1.0, // Fully visible
    });

    if (currentObserverRef) {
      observer.observe(currentObserverRef); // Use the local variable
    }

    // Cleanup function
    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef); // Use the local variable
      }
    };
  }, [hasMore]);

  // Fetch the next batch of items whenever the page number increases
  useEffect(() => {
    if (page > 1) {
      fetchItems(page, 8);
    }
  }, [page]);

  // Update displayed items based on the search query
  useEffect(() => {
    if (searchQuery === "") {
      setDisplayItems(allItems);
    } else {
      const filteredItems = allItems.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.price.toString().includes(searchQuery) ||
          item.image.toString().toLowerCase().includes(searchQuery.toLowerCase())
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
      <div ref={observerRef} className="sentinel"></div>
      {loading && <p>Loading items...</p>}
    </div>
  );
};

export default ItemSearchPage;
