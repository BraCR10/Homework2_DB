"use client";

import React, { useState, useEffect } from "react";
import '../../styles/insertMovementModal.css'

interface Movimiento {
    NombreTipoMovimiento: string;
    Monto: number;
    IdEmpleado: number;
    UsernameUsuario: string;
  }

interface InsertMovementModalProps {
  employee: {
    id: number;
    nombre: string;
    documento: string;
    saldoVacaciones: number;
  };
  onClose: () => void;
  onSubmit: (newMovement: Movimiento) => void; // Puedes personalizar esta función si necesitas manejar el éxito
}

const InsertMovementModal: React.FC<InsertMovementModalProps> = ({ employee, onClose, onSubmit }) => {
    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
    const [tiposMovimiento, setTiposMovimiento] = useState<
    { Id: number; Nombre: string }[]
    >([]);
    const [tipoMovimiento, setTipoMovimiento] = useState("");
    const [monto, setMonto] = useState("");
    const [mensaje, setMensaje] = useState("");

  // Obtener los tipos de movimiento desde la API
  useEffect(() => {
    const fetchTiposMovimiento = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/v2/movementType");
        if (response.ok) {
          const data = await response.json();
          setTiposMovimiento(data.data.tiposMovimiento);
        } 
        else {
          console.error("Error al obtener tipos de movimiento:", response.status);
          alert("No se pudieron cargar los tipos de movimiento. Inténtalo de nuevo.");
        }
      } 
      catch (error) {
        console.error("Error al realizar la solicitud:", error);
        alert("Ocurrió un error al intentar cargar los tipos de movimiento.");
      }
    };

    fetchTiposMovimiento();
  }, []);

  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!tipoMovimiento) {
      setMensaje("❌ Debes seleccionar un tipo de movimiento.");
      return;
    }
  
    if (!monto || isNaN(Number(monto)) || Number(monto) <= 0) {
      setMensaje("❌ El monto debe ser un número mayor a 0.");
      return;
    }
  
    const newMovement = {
      NombreTipoMovimiento: tipoMovimiento,
      Monto: Number(monto),
      IdEmpleado: employee.id,
      UsernameUsuario: usuario, // Cambiar por el usuario actual si es dinámico
    };
  
    try {
      const response = await fetch("http://localhost:3001/api/v2/movement/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMovement),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert("✅ Movimiento registrado correctamente.");
        onSubmit(newMovement); // Llamar a la función onSubmit con el nuevo movimiento
        onClose(); // Cerrar el modal
      } 
      else if (response.status === 400) {
        const errorData = await response.json();
        setMensaje(`❌ Error: ${errorData.error.detail}`);
      } 
      else {
        setMensaje("❌ Ocurrió un error inesperado al registrar el movimiento.");
      }
    } catch (error) {
      console.error("Error al registrar el movimiento:", error);
      setMensaje("❌ Ocurrió un error al intentar registrar el movimiento.");
    }
  };


  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <strong>Insertar Nuevo Movimiento</strong>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Documento de Identidad:</label>
            <p>{employee.documento}</p>
          </div>
          <div className="form-group">
            <label>Nombre del Empleado:</label>
            <p>{employee.nombre}</p>
          </div>
          <div className="form-group">
            <label>Saldo de Vacaciones:</label>
            <p>{employee.saldoVacaciones}</p>
          </div>
          <div className="form-group">
            <label>Tipo de Movimiento:</label>
            <select
              value={tipoMovimiento}
              onChange={(e) => setTipoMovimiento(e.target.value)}
              required
            >
              <option value="">Selecciona un tipo de movimiento</option>
              {tiposMovimiento.map((tipo) => (
                <option key={tipo.Id} value={tipo.Nombre}>
                  {tipo.Nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Monto:</label>
            <input
              type="number"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              required
            />
          </div>
          {mensaje && <p className="error-message">{mensaje}</p>}
          <div className="form-buttons">
            <button type="submit" className="confirm-button">
              Confirmar
            </button>
            <button type="button" onClick={onClose} className="cancel-button">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InsertMovementModal;