import "../App.css"

/* eslint-disable react/prop-types */
export function ProductList({ productsData }) {
  if (!productsData || productsData.length === 0) {
    return (
      <p className="nothing-products-element">No hay productos para mostrar.</p>
    );
  }

  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(productsData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "products.json";
    link.click();
    URL.revokeObjectURL(url);
  };

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

      <button
        onClick={handleDownloadJSON}
        className="btn-file-upload"
      >
        Descargar Archivo JSON con los Productos formateados
      </button>
    </div>
  );
}
