import React from "react";
import image from "../assets/images/img.jpg";
const NewsItem = ({ title, description, src, url }) => {
  return (
    <>
      <div
        className="card d-inline-block m-3"
        id="card"
        style={{ maxWidth: "280px" }}
      >
        <img
          src={src ? src : image}
          className="card-img-top"
          style={{ height: "200px" }}
          alt="no-image"
        />
        <div className="card-body">
          <h5 className="fs-5">{title.slice(0, 30)}...</h5>
          <p className="fs-6">
            {description
              ? description.slice(0, 50)
              : "The decription for the specfic news is missing"}
            ...
          </p>
          <a href={url} target="_blank" className="btn btn-dark">
            Read more
          </a>
        </div>
      </div>
    </>
  );
};

export default NewsItem;
