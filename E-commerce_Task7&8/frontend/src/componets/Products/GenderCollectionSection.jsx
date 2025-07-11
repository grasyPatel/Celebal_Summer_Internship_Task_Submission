import React from 'react';
import { Link } from 'react-router-dom';

const GenderCollectionSection = () => {
  const womenImages = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4hTJkduOfjH29kmES6pwXMXtk2qdXICP1dw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCEWnDcEsBgcOe8Hw-2hgmfrkXztAAj6IW5Q&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR18QTLQldr1Zct8F_y9fORjGbw-ClP_P7xvg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP3CrGsSEHs5Hv6vQzieOwRYE8ES7pxukPOA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpeJgWufYozfufbc0bbajdLcmDhpiTFt7rmwPPiN-RW7vmz3eKA1Qo_El0gIre3uuTPps&usqp=CAU"
  ];

  const menImages = [
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4hTJkduOfjH29kmES6pwXMXtk2qdXICP1dw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCEWnDcEsBgcOe8Hw-2hgmfrkXztAAj6IW5Q&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR18QTLQldr1Zct8F_y9fORjGbw-ClP_P7xvg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP3CrGsSEHs5Hv6vQzieOwRYE8ES7pxukPOA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpeJgWufYozfufbc0bbajdLcmDhpiTFt7rmwPPiN-RW7vmz3eKA1Qo_El0gIre3uuTPps&usqp=CAU"
  ];

  const renderCollage = (images) => (
    <div className="absolute inset-0 z-0 grid grid-cols-3 gap-1">
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt=""
          className="w-full h-full object-cover"
          style={{ gridRow: i % 3 === 0 ? 'span 2' : 'span 1' }}
        />
      ))}
    </div>
  );

  return (
    <section className="grid md:grid-cols-2 gap-0 mt-7">
      {/* Women Side */}
      <div className="relative h-[60vh] md:h-[80vh] overflow-hidden m-7">
        {renderCollage(womenImages)}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-10">
          <div className="text-center text-white px-6 z-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Women's Collection</h2>
            <p className="mb-4 text-sm md:text-base">Elegant. Confident. Comfortable.</p>
            <Link to="/shop?category=women">
              <button className="bg-white text-black px-6 py-3 rounded hover:bg-gray-200 transition font-medium">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Men Side */}
      <div className="relative h-[60vh] md:h-[80vh] overflow-hidden m-7">
        {renderCollage(menImages)}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-10">
          <div className="text-center text-white px-6 z-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Men's Collection</h2>
            <p className="mb-4 text-sm md:text-base">Bold. Stylish. Built for Comfort.</p>
            <Link to="/shop?category=men">
              <button className="bg-white text-black px-6 py-3 rounded hover:bg-gray-200 transition font-medium">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;
