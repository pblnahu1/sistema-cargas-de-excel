/* eslint-disable react/prop-types */
export function ProductList({ productsData }) {
  if (!productsData || productsData.length === 0) {
    return <p>No hay productos para mostrar.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {productsData.map((product, index) => (
        <div key={index} className="p-4 bg-white shadow-lg">
          <h3 className="text-lg font-bold">{product.name}</h3> {/* Nombre */}
          <p>Precio: {product.price}</p> {/* Precio */}
          <p>Descripción: {product.description}</p> {/* Descripción opcional */}
        </div>
      ))}
    </div>
  );
}
