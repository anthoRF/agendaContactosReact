function FormularioContacto({
  nombre,
  correo,
  telefono,
  mensajeError,
  estaEditando,
  alCambiarNombre,
  alCambiarCorreo,
  alCambiarTelefono,
  alGuardar,
  alCancelar,
}) {
  return (
    <section className="seccion">
      <h2>{estaEditando ? "Editar contacto" : "Registrar contacto"}</h2>

      <form onSubmit={alGuardar} noValidate>
        <label htmlFor="nombre">Nombre completo</label>
        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={(evento) => alCambiarNombre(evento.target.value)}
        />

        <label htmlFor="correo">Correo electrónico</label>
        <input
          id="correo"
          type="email"
          value={correo}
          onChange={(evento) => alCambiarCorreo(evento.target.value)}
        />

        <label htmlFor="telefono">Teléfono</label>
        <input
          id="telefono"
          type="tel"
          value={telefono}
          onChange={(evento) => alCambiarTelefono(evento.target.value)}
        />

        {mensajeError !== "" && <p className="mensaje-error">{mensajeError}</p>}

        <div className="acciones-formulario">
          <button type="submit">
            {estaEditando ? "Actualizar" : "Guardar"}
          </button>

          {estaEditando && (
            <button type="button" className="boton-secundario" onClick={alCancelar}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default FormularioContacto;