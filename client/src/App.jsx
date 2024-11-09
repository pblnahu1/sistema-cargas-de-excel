import { useState, useEffect } from "react";
import axios  from "axios";
import { ExcelUpload } from "./componentes/ExcelUploads";
import { ProductList } from "./componentes/ProductLIst";
import "./App.css"

function App(){
  const [productsData, setProductsData] = useState([])

  const URL = `${import.meta.env.VITE_BACKEND_URL}` || "http://localhost:3001"

  const handleFileLoaded = (data) => {
    setProductsData(data)
  }

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${URL}/products`)      
      setProductsData(response.data)
    } catch (error) {
      console.error("Error al cargar los productos: ", error)
    }
  }

  useEffect(()=>{
    fetchProducts()
  },[])

  return (
    <div className="App">
      <h2 className="text-main-top">¡Sube el archivo Excel de tu negocio!</h2>
      <ExcelUpload onFileLoaded={handleFileLoaded} />
      <ProductList productsData={productsData} />
    </div>
  )
}

export default App