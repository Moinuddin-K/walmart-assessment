import React, { useState, useEffect, useRef } from "react";
import SearchBar from "../components/SearchBar";
import ItemCard from "../components/ItemCard";
import "./ItemSearchPage.css";

const ItemSearchPage = () => {
  const [allItems, setAllItems] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const observerRef = useRef();

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
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchItems(1, 8);
  }, []);

  useEffect(() => {
    if (!hasMore) return;
    const currentObserverRef = observerRef.current;

    const handleObserver = (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setLoading(true);
        setPage((prev) => prev + 1);
      }
    };

    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: "0px",
      threshold: 1.0,
    });

    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [hasMore]);

  useEffect(() => {
    if (page > 1) {
      fetchItems(page, 8);
    }
  }, [page]);

  useEffect(() => {
    if (searchQuery === "") {
      setDisplayItems(allItems);
    } else {
      const filteredItems = allItems.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
          item.price.toString().trim().includes(searchQuery) ||
          item.image
            .toString()
            .trim()
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
      setDisplayItems(filteredItems);
    }
  }, [searchQuery, allItems]);

  return (
    <div className="container">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ul className="ItemGrid">
        {displayItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </ul>
      <div ref={observerRef}></div>
      {loading && <p>Loading items...</p>}
    </div>
  );
};

export default ItemSearchPage;
