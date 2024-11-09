/* eslint-disable react/prop-types */
import { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import "../App.css"

export function ExcelUpload({ onFileLoaded }) {
  const [file, setFile] = useState(null);

  const URL = `${import.meta.env.VITE_BACKEND_URL}` || "http://localhost:3001";

  const transformExcelData = (d) => {
    const keys = d[0];
    const rows = d.slice(1);

    return rows.map((row) => {
      let obj = {};
      row.forEach((v, i) => {
        obj[keys[i]] = v;
      });

      return obj;
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (!file) {
      alert("Por favor seleccioná un archivo...");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const d = new Uint8Array(e.target.result);
      const workbook = XLSX.read(d, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const filteredData = jsonData.filter((row) => row[0] && row[1]);

      const transformedData = transformExcelData(filteredData);

      onFileLoaded(transformedData);

      axios
        .post(`${URL}/save-json`, { data: transformedData })
        .then((res) => {
          console.log("Datos guardados exitosamente: ", res.data);
        })
        .catch((err) => {
          console.error("Error al guardar los datos: ", err);
        });
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="container-file-change">
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        className="input-file-change"
      />
      <button className="btn-file-upload" onClick={handleFileUpload}>
        Subir y procesar el Excel
      </button>
    </div>
  );
}
