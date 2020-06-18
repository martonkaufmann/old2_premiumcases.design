import React, { ReactElement, useState } from 'react';
import { Link } from 'gatsby';
import Modal from 'react-modal';

const Navigation: React.FC = (): ReactElement => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <Modal
                isOpen={isModalOpen}
                overlayClassName="z-50"
                className="bg-white absolute inset-0 z-50 px-6 py-4 focus:outline-none"
                contentLabel="Example Modal"
            >
                <button
                    className="material-icons ml-auto block"
                    onClick={() => setIsModalOpen(!isModalOpen)}
                >
                    close
                </button>
                <ul className="text-xl text-center mt-16">
                    <li className="my-4">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="my-4">
                        <Link to="#">Latest designs</Link>
                    </li>
                    <li className="my-4">
                        <Link to="#">About our cases</Link>
                    </li>
                    <li className="my-4">
                        <Link to="#">Catalog</Link>
                    </li>
                    <li className="my-4">
                        <Link to="#">Social</Link>
                    </li>
                    <li className="my-4">
                        <Link to="#">Contact</Link>
                    </li>
                </ul>
            </Modal>
            <nav className="w-full h-16 fixed z-40 top-0 px-4 left-0 bg-white flex justify-between lg:justify-center items-center border-b">
                <Link to="/" className="lg:hidden">
                    <span
                        className="border-r border-gray-800 mr-1 pr-1"
                        style={{
                            fontFamily: 'Dancing Script',
                            fontSize: '1.2rem',
                        }}
                    >
                        Premium Cases
                    </span>
                    <span
                        style={{
                            fontFamily: 'Lexend Tera',
                            fontSize: '0.8rem',
                            letterSpacing: '.2em',
                        }}
                    >
                        DESIGN
                    </span>
                </Link>
                <ul className="items-center hidden lg:flex">
                    <li className="mx-3">
                        <Link to="/" className="animate-underline">
                            Home
                        </Link>
                    </li>
                    <li className="mx-3">
                        <Link to="#" className="animate-underline">
                            Latest designs
                        </Link>
                    </li>
                    <li className="mx-3">
                        <Link to="#" className="animate-underline">
                            About our cases
                        </Link>
                    </li>
                    <li className="mx-3">
                        <Link to="#" className="animate-underline">
                            Catalog
                        </Link>
                    </li>
                    <li className="mx-3">
                        <Link to="#" className="animate-underline">
                            Social
                        </Link>
                    </li>
                    <li className="mx-3">
                        <Link to="#" className="animate-underline">
                            Contact
                        </Link>
                    </li>
                </ul>
                <section className="flex">
                    <button className="material-icons snipcart-checkout mx-3 focus:outline-none">
                        shopping_cart
                    </button>
                    <button
                        className="material-icons mx-3 focus:outline-none lg:hidden"
                        onClick={() => setIsModalOpen(!isModalOpen)}
                    >
                        menu
                    </button>
                </section>
            </nav>
        </>
    );
};

export default Navigation;
