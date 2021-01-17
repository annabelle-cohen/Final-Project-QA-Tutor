import { Galleria } from "primereact/galleria";
import React, { useState, useEffect } from "react";

const GalleryPage = ({ images, responsiveOptions }) => {
  const [imagesList, setImages] = useState([]);
  console.log(images);
  useEffect(() => {
    setImages(images);
  }, []);

  const thumbnailTemplate = (item) => {
    return (
      <img
        src={item.source}
        alt=""
        style={{
          width: "50px",
          height: "50px",
          display: "block",
          position: "relative",
          zIndex: 4,
        }}
      />
    );
  };
  const itemTemplate = (item) => {
    return (
      <img
        src={item.source}
        alt=""
        style={{ width: "400px", display: "block", height: "400px" }}
      />
    );
  };

  return (
    <div>
      <Galleria
        value={imagesList}
        responsiveOptions={responsiveOptions}
        numVisible={5}
        circular
        style={{ maxWidth: "640px" }}
        showItemNavigators
        showThumbnails={false}
        showItemNavigatorsOnHover
        showIndicators
        item={itemTemplate}
        thumbnail={thumbnailTemplate}
      />
    </div>
  );
};

export default GalleryPage;
