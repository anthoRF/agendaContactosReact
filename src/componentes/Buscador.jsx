function Buscador({
  busqueda,
  alCambiarBusqueda
}) {

  return (
    <section className="seccion">

      <label htmlFor="busqueda">
        Buscar contacto por nombre
      </label>

      <input
        id="busqueda"
        type="text"
        placeholder="Ejemplo: Anthony, Ashley, Victor"
        value={busqueda}
        onChange={(evento) => {
          alCambiarBusqueda(evento.target.value);
        }}
      />

    </section>
  );
}

export default Buscador;