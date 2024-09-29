import React, { useState, useRef, useEffect } from 'react';
import pic1 from '../assets/img/pic1.png';
import pic2 from '../assets/img/pic2.png';
import pic3 from '../assets/img/pic3.png';
import pic4 from '../assets/img/pic4.png';
import pic5 from '../assets/img/pic5.png';
import pic6 from '../assets/img/pic6.png';
import './HorizontalScrollSection.css'; // Import the CSS file for animation

interface ScrollSectionProps {
    title: string;
    description: string;
    image: string;
}

const ScrollSection: React.FC<ScrollSectionProps> = ({ title, description, image }) => (
    <div className="scroll-section flex-none w-full md:w-[calc(100vw-2rem)] lg:w-[calc(65vw-4rem)] p-6 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 py-4 items-start text-left lg:pl-16">
            <h2 className="text-3xl font-medium text-rblue">{title}</h2>
            <p className="mt-4 text-nblue font-normal">{description}</p>
        </div>
        <div className="md:w-1/2 p-4">
            <img src={image} alt={title} className="rounded-lg shadow-lg w-full h-4/5 object-cover shadow-3xl" />
        </div>
    </div>
);

const HorizontalScrollSection: React.FC = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        if (scrollContainerRef.current) {
            setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
            setScrollLeft(scrollContainerRef.current.scrollLeft);
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging || !scrollContainerRef.current) return;
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        container?.addEventListener('mousemove', handleMouseMove);
        container?.addEventListener('mouseup', handleMouseUp);
        container?.addEventListener('mouseleave', handleMouseUp);

        return () => {
            container?.removeEventListener('mousemove', handleMouseMove);
            container?.removeEventListener('mouseup', handleMouseUp);
            container?.removeEventListener('mouseleave', handleMouseUp);
        };
    }, [isDragging, startX, scrollLeft]);

    return (
        <div className="relative overflow-hidden pb-16">
            <div className="scroll-container" ref={scrollContainerRef} onMouseDown={handleMouseDown}>
                <div className="scroll-wrapper">
                    {/* First set of ScrollSection */}
                    <ScrollSection 
                        title="Machine Manufacturers" 
                        description="Optimize your supply chain with our reliable freight solutions. Ensure timely delivery of your machinery components and streamline your production processes."
                        image={pic1} 
                    />
                    <ScrollSection 
                        title="Part Suppliers" 
                        description="Benefit from our efficient logistics to get your parts to manufacturers quickly. Our services help you maintain a steady supply and meet production demands."
                        image={pic2} 
                    />
                    <ScrollSection 
                        title="Hardware Manufacturers" 
                        description="Reduce downtime and improve inventory management with our tailored freight services. We ensure your hardware products reach their destinations on schedule."
                        image={pic3} 
                    />
                    <ScrollSection 
                        title="Warehouses" 
                        description="Enhance your warehousing operations with our flexible freight solutions. We help you manage inventory and ensure seamless distribution to meet customer demands."
                        image={pic4} 
                    />
                    <ScrollSection 
                        title="Farmers" 
                        description="Transport your produce with care and efficiency. Our services support farmers in getting fresh goods to market swiftly and maintaining the quality of perishable items."
                        image={pic5} 
                    />
                    <ScrollSection 
                        title="Fish Companies" 
                        description="Ensure the freshness of your seafood with our specialized freight services. We provide temperature-controlled transportation to preserve quality from catch to market."
                        image={pic6} 
                    />
                    {/* Duplicated set of ScrollSection */}
                    <ScrollSection 
                        title="Machine Manufacturers" 
                        description="Optimize your supply chain with our reliable freight solutions. Ensure timely delivery of your machinery components and streamline your production processes."
                        image={pic1} 
                    />
                    <ScrollSection 
                        title="Part Suppliers" 
                        description="Benefit from our efficient logistics to get your parts to manufacturers quickly. Our services help you maintain a steady supply and meet production demands."
                        image={pic2} 
                    />
                    <ScrollSection 
                        title="Hardware Manufacturers" 
                        description="Reduce downtime and improve inventory management with our tailored freight services. We ensure your hardware products reach their destinations on schedule."
                        image={pic3} 
                    />
                    <ScrollSection 
                        title="Warehouses" 
                        description="Enhance your warehousing operations with our flexible freight solutions. We help you manage inventory and ensure seamless distribution to meet customer demands."
                        image={pic4} 
                    />
                    <ScrollSection 
                        title="Farmers" 
                        description="Transport your produce with care and efficiency. Our services support farmers in getting fresh goods to market swiftly and maintaining the quality of perishable items."
                        image={pic5} 
                    />
                    <ScrollSection 
                        title="Fish Companies" 
                        description="Ensure the freshness of your seafood with our specialized freight services. We provide temperature-controlled transportation to preserve quality from catch to market."
                        image={pic6} 
                    />
                </div>
            </div>
        </div>
    );
};

export default HorizontalScrollSection;
