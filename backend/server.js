const express = require("express")
const bodyParser = require("body-parser")
const fs = require("fs")
const path = require("path")
const cors = require("cors")

const app = express()
const port = 3001

app.use(cors())

app.use(bodyParser.json())

app.post("/save-json", (req,res)=>{
    const productsData = req.body.data

    const jsonFilePath = path.join(__dirname, "data/products.json")
    
    if(!fs.existsSync(path.join(__dirname, "data"))){
        fs.mkdirSync(path.join(__dirname, "data"))
    }

    fs.writeFile(jsonFilePath, JSON.stringify(productsData, null, 2), (err) => {
        if(err) {
            console.error("Error al guardar el archivo JSON: ", err)
            return res.status(500).json({
                message: "Error al guardar el archivo JSON"
            })
        }

        res.json({
            message: "Datos guardados exitosamente"
        })
    })
})

app.get("/products", (req,res) => {
    const jsonFilePath = path.join(__dirname, "data/products.json")

    if(fs.existsSync(jsonFilePath)){
        const products = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"))
        res.json(products)
    }else{
        res.status(404).json({
            message: "No hay datos disponibles"
        })
    }
})

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`)
})