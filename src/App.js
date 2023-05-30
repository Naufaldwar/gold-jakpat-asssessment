// import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [loadMoreError, setLoadMoreError] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const getData = async (page) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character?page=${page}`
      );
      setLoading(false);
      setShowSuccessPopup(true);
      return response.data.results;
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  };

  const handleLoadMore = async (event) => {
    event.preventDefault();
    setLoadMoreLoading(true);
    const nextPage = currentPage + 1;
    try {
      const newData = await getData(nextPage);
      setData((prevData) => [...prevData, ...newData]);
      setCurrentPage(nextPage);
      setShowSuccessPopup(true);
      setLoadMoreLoading(false);
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      }, 0);
    } catch (error) {
      setLoadMoreError(true);
      console.log(error);
      setLoadMoreLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const newData = await getData(currentPage);
        setData(newData);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (showSuccessPopup) {
      const timer = setTimeout(() => {
        setShowSuccessPopup(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showSuccessPopup]);
  return (
    <div className="flex flex-col justify-between gap-20">
      <header className="sticky top-0">
        <Header />
      </header>
      <div className="mb-auto px-10 justify-center text-center content-center">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error occurred.</p>
        ) : (
          <div
            className="
          md:grid md:grid-cols-4 gap-4 flex flex-col justify-center items-center"
          >
            {data.map((item) => (
              <div key={item.id}>
                <img src={item.image} alt={item.name} />
                <p className="text-md font-semibold">Character Name</p>
                <p className="text-sm">{item.name}</p>
                <p className="text-md font-semibold">Character Species</p>
                <p className="text-sm">{item.species}</p>
              </div>
            ))}
          </div>
        )}
        {loadMoreLoading ? (
          <p>Loading more...</p>
        ) : loadMoreError ? (
          <p>Error occurred while loading more.</p>
        ) : (
          <button type="button" onClick={handleLoadMore}>
            Load More
          </button>
        )}
        {showSuccessPopup && (
          <div className="fixed bottom-10 right-10 bg-green-400 text-white p-3">
            Data Load Successful!
          </div>
        )}
      </div>
      <footer className="sticky bottom-0">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
