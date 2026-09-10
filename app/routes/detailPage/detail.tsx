import { useEffect, useState } from "react";
import type { Product } from "../../../types";
import { Link, useParams } from "react-router";
import { ImSpinner2 } from "react-icons/im";


const  DetailPage = () => {
   const {id} = useParams();
   const [loading, setLoading] = useState(true);
   const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [product, setProduct] = useState<Product | null>(null);

    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:8001/Products/${id}`);
        const data = await res.json();
        setProduct(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }

    const fetchRelatedProducts = async () => {
      try {
        const res = await fetch(`http://localhost:8001/Products`);
        const data: Product[] = await res.json();
       if(product) {
        const related = data.filter((item) => 
            item.productType === product.productType && String(item.id) !== String(product.id))
        .slice(0, 12);
        setRelatedProducts(related);
       }
        
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    }

  useEffect(() => {
      fetchProduct();
    }, [id]);

    useEffect(() => {
      if (product) {
    fetchRelatedProducts();
      }
    }, [product]);

  


    return (
      
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
     <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
       &larr; Back to Home
     </Link>
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
     ) : !product ? (
       <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
         <h2 className="mb-2 text-xl font-bold text-gray-800">
           Product not found
         </h2>
         <p className="text-gray-500">
           The requested product could not be found.
         </p>
       </div>
     ) : ( product &&
       <div>
         <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
         <p className="mt-2 text-lg text-gray-700">{product.description}</p>
         <p className="mt-4 text-xl font-semibold text-blue-600">${product.price.toFixed(2)}</p>
       </div>
     )}

     <div>
      {loading ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl bg-white shadow-sm">
                        <ImSpinner2
                          className="animate-spin text-blue-600"
                          size={40}
                        />
        
                        <p className="mt-4 text-sm font-medium text-gray-500">
                          Loading related products...
                        </p>
                      </div>
      ) : relatedProducts.length > 0 ? (
        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Related Products</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {relatedProducts.map((item) => (
              <div key={item.id} className="rounded-lg bg-white p-4 shadow-sm hover:shadow-md">
                <Link to={`/detailPage/${item.id}`} className="block">
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                
                <p className="text-gray-500">{item.description}</p>
                <p className="mt-2 text-xl font-bold text-blue-600">${item.price.toFixed(2)}</p>
             </Link>
              </div>
            ))}
          </div>
        </div>
      ) : null}
     </div>
    </div>

    
     
    
);
}
export default DetailPage;

