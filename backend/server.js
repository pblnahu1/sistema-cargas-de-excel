
import express from "express"
import bodyParser from "body-parser"
import fs from "fs"
import { fileURLToPath } from "url"
import path, {dirname} from "path"
import cors from "cors"
import { FRONTEND_URL, PORT } from "./config.js"

// hago esto por el tipo (type:module)
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

app.use(cors({
    origin: FRONTEND_URL,
}))

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

app.listen(PORT, () => {
    console.log("Servidor corriendo en puerto 3001")
})