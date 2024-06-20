import React, { useEffect, useState } from "react";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import NewsItem from "./NewsItem";

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNewsData = async () => {
    axios.interceptors.request.use(
      (config) => {
        setArticles([]);
        setLoading(true);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      (config) => {
        setLoading(false);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    try {
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${
        import.meta.env.VITE_API_KEY
      }`;
      let response = await axios.get(url);
      let data = await response.data;
      let allNews = data.articles;
      setArticles(allNews);
    } catch (error) {
      console.log("Error Ouccured:", error);
    }
  };

  useEffect(() => {
    fetchNewsData();
  }, [category]);

  return (
    <>
      <h2 className="text-center mt-3">
        Latest <span className="badge bg-danger">News</span> <br />
      </h2>
      <div className="text-center">
        {loading && (
          <ColorRing
            visible={true}
            height="150"
            width="150"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        )}
      </div>
      <div className="articles text-center">
        {articles.map((news, ind) => {
          return (
            <NewsItem
              key={ind}
              title={news.title}
              description={news.description}
              src={news.urlToImage}
              url={news.url}
            />
          );
        })}
      </div>
    </>
  );
};

export default NewsBoard;
