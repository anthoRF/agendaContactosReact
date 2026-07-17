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
    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const soloNumeros = /^[0-9]+$/;

    if (nombre.trim() === "" || correo.trim() === "" || telefono.trim() === "") {
      return "Complete todos los campos antes de guardar.";
    }

    if (!formatoCorreo.test(correo)) {
      return "Ingrese un correo válido, por ejemplo: tecnicas@unemi.com.";
    }

    if (!soloNumeros.test(telefono)) {
      return "El teléfono debe contener únicamente números.";
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
        nombre: nombre.trim(),
        correo: correo.trim(),
        telefono: telefono.trim(),
      };

      setContactos([...contactos, nuevoContacto]);
    } else {
      const contactosActualizados = contactos.map((contacto) => {
        if (contacto.id === idEditando) {
          return {
            ...contacto,
            nombre: nombre.trim(),
            correo: correo.trim(),
            telefono: telefono.trim(),
          };
        }

        return contacto;
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
    const deseaEliminar = window.confirm("¿Desea eliminar este contacto?");

    if (deseaEliminar) {
      const contactosRestantes = contactos.filter(
        (contacto) => contacto.id !== id,
      );

      setContactos(contactosRestantes);

      if (idEditando === id) {
        limpiarFormulario();
      }
    }
  }

  const contactosFiltrados = contactos.filter((contacto) =>
    contacto.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  );

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
        alCancelar={limpiarFormulario}
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