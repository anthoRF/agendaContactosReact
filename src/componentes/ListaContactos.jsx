function ListaContactos({ contactos, alEditar, alEliminar }) {
  return (
    <section className="seccion">
      <h2>Lista de contactos</h2>

      {contactos.length === 0 ? (
        <p>No se encontraron contactos.</p>
      ) : (
        <div className="lista-contactos">
          {contactos.map((contacto) => (
            <article className="contacto" key={contacto.id}>
              <div>
                <h3>{contacto.nombre}</h3>
                <p><strong>Correo:</strong> {contacto.correo}</p>
                <p><strong>Teléfono:</strong> {contacto.telefono}</p>
              </div>

              <div className="acciones-contacto">
                <button type="button" onClick={() => alEditar(contacto)}>
                  Editar
                </button>
                <button
                  type="button"
                  className="boton-eliminar"
                  onClick={() => alEliminar(contacto.id)}
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default ListaContactos;