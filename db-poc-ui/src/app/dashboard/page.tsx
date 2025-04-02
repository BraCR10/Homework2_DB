"use client";

import React, { useState } from "react";
import Board from "../components/Board";
import Button from "../components/Button";
import RowCard from "../components/RowCard";
import InsertEmployeePopup from "../components/InsertEmployeePopup";
import { insertEmployee } from "../services/insertEmployee";
import Github from "../assets/Github.png";
export default function Dashboard() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleInsertEmployee = async (name: string, salary: number) => {
    await insertEmployee(name, salary);
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="dashboard">
      <h1>Plantilla de Empleados</h1>
      <RowCard id="ID" name="Nombre" salary="Salario" className="dashboard" />
      <Board key={refreshTrigger} />
      <div className="button-container">
        <Button label="Insertar" onClick={handleOpenPopup} />
        <a href="https://github.com/BraCR10/POC-DB1-Homework1" target="_blank">
          <img src={Github.src} alt="Go to GitHub" />
        </a>
      </div>
      <InsertEmployeePopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onSubmit={handleInsertEmployee}
      />  
    </div>
  );
}
