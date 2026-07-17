import { useState } from "react";
import Buscador from "./componentes/Buscador";
import FormularioContacto from "./componentes/FormularioContacto";
import ListaContactos from "./componentes/ListaContactos";

function App() {

  const [contactos, setContactos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [idEditando, setIdEditando] = useState(null);
  const [mensajeError, setMensajeError] = useState("");

  function validarFormulario() {

    if (
      nombre.trim() === "" ||
      correo.trim() === "" ||
      telefono.trim() === ""
    ) {
      return "Complete todos los campos.";
    }

    if (
      !correo.includes("@") ||
      !correo.includes(".")
    ) {
      return "Ingrese un correo válido.";
    }

    if (isNaN(telefono)) {
      return "El teléfono debe contener solo números.";
    }

    return "";
  }

  function limpiarFormulario() {
    setNombre("");
    setCorreo("");
    setTelefono("");
    setIdEditando(null);
    setMensajeError("");
  }

  function guardarContacto(evento) {

    evento.preventDefault();

    const error = validarFormulario();

    if (error !== "") {
      setMensajeError(error);
      return;
    }


    if (idEditando === null) {

      const nuevoContacto = {
        id: Date.now(),
        nombre: nombre,
        correo: correo,
        telefono: telefono
      };

      setContactos([
        ...contactos,
        nuevoContacto
      ]);

    } else {

      const contactosActualizados = contactos.map((contacto) => {

        if (contacto.id === idEditando) {

          return {
            id: contacto.id,
            nombre: nombre,
            correo: correo,
            telefono: telefono
          };

        } else {

          return contacto;

        }
      });

      setContactos(contactosActualizados);
    }

    limpiarFormulario();
  }

  function editarContacto(contacto) {

    setNombre(contacto.nombre);
    setCorreo(contacto.correo);
    setTelefono(contacto.telefono);
    setIdEditando(contacto.id);
    setMensajeError("");
  }

  function eliminarContacto(id) {

    const confirmar = window.confirm(
      "¿Desea eliminar este contacto?"
    );

    if (confirmar === true) {

      const contactosRestantes = contactos.filter((contacto) => {
        return contacto.id !== id;
      });

      setContactos(contactosRestantes);

      if (idEditando === id) {
        limpiarFormulario();
      }
    }
  }

  const contactosFiltrados = contactos.filter((contacto) => {

    return contacto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());

  });


  return (
    <main className="contenedor">

      <h1>Agenda de contactos de empleados</h1>

      <Buscador
        busqueda={busqueda}
        alCambiarBusqueda={setBusqueda}
      />

      <FormularioContacto
        nombre={nombre}
        correo={correo}
        telefono={telefono}
        mensajeError={mensajeError}
        estaEditando={idEditando !== null}
        alCambiarNombre={setNombre}
        alCambiarCorreo={setCorreo}
        alCambiarTelefono={setTelefono}
        alGuardar={guardarContacto}
      />

      <ListaContactos
        contactos={contactosFiltrados}
        alEditar={editarContacto}
        alEliminar={eliminarContacto}
      />

    </main>
  );
}

export default App;