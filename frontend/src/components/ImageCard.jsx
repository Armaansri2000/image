import React from 'react';

const ImageCard = React.memo(({ image }) => {
  return (
    <div className="card">
      <div className="card-image-wrapper">
        <img src={image.image} alt={image.imageName} loading="lazy" />
      </div>
      <div className="card-body">
        <h3>{image.imageName}</h3>
        <span className="badge">{image.heading}</span>
        <p>{image.description}</p>
      </div>
    </div>
  );
});

ImageCard.displayName = 'ImageCard';

export default ImageCard;
