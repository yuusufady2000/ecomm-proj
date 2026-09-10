
import { useEffect, useState } from "react";
import type { Product } from "../../types";
import { MdGridView } from "react-icons/md";
import { ImSpinner2 } from "react-icons/im";
import {Link} from "react-router"

const Hero = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Cars");
  const [featuresProduct, setFeaturesProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    "Cars",
    "Electronics",
    "Home Appliances",
    "Lands",
    "Mobiles",
    "Motorcycles",
  ];

  const fetchProduct = async () => {
    try {
      const res = await fetch("https://ecomm-proj-2.onrender.com/Products");
      const data = await res.json();

      setFeaturesProduct(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProduct = featuresProduct.filter(
    (product) => product.productType === selectedCategory
  );

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
          <aside className="h-fit rounded-2xl bg-white p-4 shadow-sm">
            <h2 className="mb-4 px-3 text-lg font-bold text-gray-900">
              Categories
            </h2>

            <div className="flex flex-row gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap rounded-xl px-4 py-3 text-left text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </aside>

          <main>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="mb-1 text-sm font-medium text-blue-600">
                  Marketplace
                </p>

                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  {selectedCategory}
                </h1>
              </div>

              <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm">
                <MdGridView className="mr-2 inline-block h-5 w-5" />
                {filteredProduct.length}
              </span>
            </div>

            {loading ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl bg-white shadow-sm">
                <ImSpinner2
                  className="animate-spin text-blue-600"
                  size={40}
                />

                <p className="mt-4 text-sm font-medium text-gray-500">
                  Loading products...
                </p>
              </div>
            ) : filteredProduct.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProduct.map((product) => (
                  <div
                    key={product.id}
                    className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative h-52 overflow-hidden bg-gray-100">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}

                      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-700 backdrop-blur">
                        {product.productType}
                      </span>
                    </div>

                    <div className="p-5">
                      <h2 className="mb-2 line-clamp-1 text-lg font-bold text-gray-900">
                        {product.name}
                      </h2>

                      <p className="mb-5 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs text-gray-400">Price</p>

                          <p className="text-xl font-bold text-blue-600">
                            ${product.price.toFixed(2)}
                          </p>
                        </div>

                        <Link
                          to={`/detailPage/${product.id}`}
                          className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm cursor-pointer font-semibold text-white transition hover:bg-blue-600"
                        >
                          View Product
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
                <h2 className="mb-2 text-xl font-bold text-gray-800">
                  No products found
                </h2>

                <p className="text-gray-500">
                  There are currently no products in {selectedCategory}.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Hero;

