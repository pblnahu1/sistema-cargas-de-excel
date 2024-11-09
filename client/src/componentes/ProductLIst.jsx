import "../App.css"

/* eslint-disable react/prop-types */
export function ProductList({ productsData }) {
  if (!productsData || productsData.length === 0) {
    return (
      <p className="nothing-products-element">No hay productos para mostrar.</p>
    );
  }

  return (
    <div className="container-products">
      {productsData.map((product, index) => (
        <div key={index} className="child-products">
          <h3 className="product-name-element">{product.name}</h3>{" "}
          <p className="product-price-element">Precio: {product.price}</p>{" "}
          <p className="product-description-element">
            Descripción: {product.description}
          </p>{" "}
        </div>
      ))}
    </div>
  );
}
