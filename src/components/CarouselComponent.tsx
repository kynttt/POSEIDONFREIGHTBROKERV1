import React, { useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Carousel } from 'react-responsive-carousel';

// Import images
import pic1 from '../assets/img/pic1.png';
import pic2 from '../assets/img/pic2.png';
import pic3 from '../assets/img/pic3.png';
import pic4 from '../assets/img/pic4.png';
import pic5 from '../assets/img/pic5.png';
import pic6 from '../assets/img/pic6.png';

const CarouselComponent: React.FC = () => {
    const images = [
        { src: pic1, alt: 'Image 1' },
        { src: pic2, alt: 'Image 2' },
        { src: pic3, alt: 'Image 3' },
        { src: pic4, alt: 'Image 4' },
        { src: pic5, alt: 'Image 5' },
        { src: pic6, alt: 'Image 6' },
    ];

    // State to track the focused image
    const [focusedIndex, setFocusedIndex] = useState<number>(0);

    return (
        <div className="flex flex-col items-center justify-center py-32">
            {/* Header Section */}
            <div className="text-center mb-10">
                <h1 className="xs:text-3xl md:text-6xl lg:text-4xl font-black text-rblue mb-4">Efficient Logistics Solutions</h1>
                <p className="xs:text-2xl md:text-4xl lg:text-xl font-normal  text-gray-500">Seamless shipping and logistics services tailored to meet your business needs.</p>
            </div>

            {/* Carousel with slightly smaller focused image */}
            <div className="w-full lg:w-[68rem] md:p-0 p-2 ">
                <Carousel
                    autoPlay
                    infiniteLoop
                    showThumbs={false}
                    showStatus={false}
                    selectedItem={focusedIndex}
                    onChange={(index) => setFocusedIndex(index)}
                    className="mb-4"
                >
                    {images.map((image, index) => (
                        <div key={index} className={`relative transform ${focusedIndex === index ? 'scale-100' : ''}`}>
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="rounded-lg shadow-lg transition-transform duration-300 ease-in-out w-full md:h-[38rem] object-cover" // Fixed height and consistent scaling
                            />
                        </div>
                    ))}
                </Carousel>
            </div>

            {/* Thumbnails section */}
            <div className="flex space-x-4 justify-center mt-8">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image.src}
                        alt={image.alt}
                        className={`w-[10.5rem] h-auto rounded-md object-cover transition-transform duration-300 ease-in-out cursor-pointer ${focusedIndex === index ? 'scale-100' : 'hover:scale-110'}`}
                        onClick={() => setFocusedIndex(index)} // Clicking thumbnail updates the carousel
                    />
                ))}
            </div>
        </div>
    );
};

export default CarouselComponent;
