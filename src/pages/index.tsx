import SEO from "@/components/SEO";
import { GetServerSideProps } from "next";
// import { useEffect, useState } from "react";

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }: HomeProps) {
  // client side fetching and rendering

  /* const [recommendedProducts, setRecommendedProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/recommended').then(response => {
      response.json().then(data => {
        setRecommendedProducts(data);
      });
    });
  }, []); */

  // dynamic import
  async function handleSum() {
    const math = (await import('../lib/math')).default;
    alert(math.sum(3, 5));
  }

  return (
    <div>
      <SEO 
        title="DevCommerce, your best e-commerce!" 
        image="Naruto_newshot.png"
        shouldExcludeTitleSufix 
      />

      <section>
        <h1>Products</h1>

        <ul>
          {recommendedProducts.map(recommendedProduct => {
            return (
              <li key={recommendedProduct.id}>
                {recommendedProduct.title}
              </li>
            );
          })}
        </ul>
      </section>

      <button onClick={handleSum}>Sum</button>
    </div>
  )
}

// server side rendering
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`);
  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts
    }
  };
}
