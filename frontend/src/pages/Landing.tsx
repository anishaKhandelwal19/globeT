import { Link } from "react-router-dom";
import ImageCarousel from "../components/ImageCarousel";


const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">


    <ImageCarousel/>
      {/* Hero Section */}
<section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white min-h-screen flex items-center justify-center">
  <div className="absolute inset-0 bg-black opacity-20"></div>

  <div className="relative z-10 text-center px-4 flex flex-col items-center space-y-8">
    <h1 className="text-4xl md:text-6xl font-bold mb-6">
      Discover Your Next
      <span className="block text-yellow-300">Adventure</span>
    </h1>

    <p className="text-lg md:text-2xl mb-10 max-w-2xl">
      Book flights, hotels, and holiday packages with ease.
      Experience travel like never before with Globetripster.
    </p>

    <Link
      to="/signup"
      className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-md text-lg transition"
    >
      Start Planning
    </Link>
  </div>
</section>
    
    </div>
  );
};

export default HomePage;
