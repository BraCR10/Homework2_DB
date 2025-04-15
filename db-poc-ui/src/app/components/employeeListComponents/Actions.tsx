"use client";

import React from 'react';

interface ActionsProps {
  empleado: {
    id: number;
    nombre: string;
    documento: string;
    nombrePuesto: string;
    saldoVacaciones: number;
  };
  handleDelete: (id: number) => void;
  handleQuery: (empleado: {
    id: number;
    nombre: string;
    documento: string;
    nombrePuesto: string;
    saldoVacaciones: number;
  }) => void;
  handleEdit: (empleado: {
    id: number;
    nombre: string;
    documento: string;
    nombrePuesto: string;
    saldoVacaciones: number;
  }) => void;
  handleMovementList: (empleado: {
    id: number;
    nombre: string;
    documento: string;
    nombrePuesto: string;
    saldoVacaciones: number;
  }) => void;
  handleInsertMovement: (empleado: {
    id: number;
    nombre: string;
    documento: string;
    nombrePuesto: string;
    saldoVacaciones: number;
  }) => void;
}

const Actions: React.FC<ActionsProps> = ({ empleado, handleDelete, handleQuery, handleEdit, handleMovementList, handleInsertMovement }) => {
  return (
    <>
      <button onClick={() => handleQuery(empleado)}>
        Consultar
      </button>
      <button onClick={() => handleEdit(empleado)}>
        Modificar
      </button>
      <button onClick={() => handleMovementList(empleado)}>
        Listar Movimientos
      </button>
      <button onClick={() => handleInsertMovement(empleado)}>
        Insertar Movimientos
      </button>
      <button onClick={() => handleDelete(empleado.id)}>Eliminar</button>
    </>
  );
};

export default Actions;