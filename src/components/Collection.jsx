import ProductCard from './ProductCard';
import { PRODUCTS } from '../data';

export default function Collection() {
  return (
    <section className="collection" id="collection">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow">The Collection</span>
            <h2>Six weaves, chosen with care</h2>
          </div>
          <p>
            Prices shown are starting prices per piece. Message us on WhatsApp
            for size, colour options and current availability.
          </p>
        </div>

        <div className="grid">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
