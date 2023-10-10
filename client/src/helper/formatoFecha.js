export const formatearFecha = (fecha) => {
    const fechaObj = new Date(fecha);
    const dia = fechaObj.getDate();
    const mes = fechaObj.getMonth() + 1; // Los meses comienzan desde 0, así que sumamos 1
    const anio = fechaObj.getFullYear();

    // Asegurémonos de que los componentes de la fecha tengan dos dígitos
    const diaStr = dia < 10 ? `0${dia}` : dia.toString();
    const mesStr = mes < 10 ? `0${mes}` : mes.toString();

    // Formateamos la fecha en el formato "dd/mm/yyyy"
    const fechaFormateada = `${diaStr}/${mesStr}/${anio}`;

    return fechaFormateada;
};  