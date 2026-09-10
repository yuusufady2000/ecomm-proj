import { useEffect, useState } from "react";
import type { Product } from "../../types";


const Features = () => {

const [viewProduct, setViewProduct] = useState();
    const [featuresProduct, setFeaturesProduct] = useState<Product[]>([]);

 const fetchProduct = async () => {
  const res = await fetch("http://localhost:8001/Products");
  const data = await res.json();

  setFeaturesProduct(data);
  console.log(data);
};

  const filt

useEffect(() => {
  fetchProduct();
}, []);


  return (
  <div>
    {featuresProduct.map((product) => (
      <div key={product.id}>
         <p className="text-yellow-500 text-lg">{product.productType}</p>
      </div>
    ))}
  </div>   
  
  );
};

export default Features;