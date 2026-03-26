// Función de salida rápida (botón X)
function salidaRapida() {
  // 1. Redirige a una página de Google
  window.location.replace("https://www.google.com");
  // 2. Como medida extra, abre una pestaña nueva con google para que la usuaria pueda cerrar la anteriors
  window.open("https://www.google.com", "_newtab");
}

// CHATBOT
let especialidadActual = "";
let esperandoDecision = false;
const menus = {
  psicologa:
    "Elige una opción escribiendo el número:\n1. Técnicas de calma\n2. ¿Cómo gestionar el miedo?\n3. Redes de apoyo",
  abogada:
    "Elige una opción escribiendo el número:\n1. Tipos de trámites\n2. Sobre mis derechos\n3. Orden de protección",
};

const respuestasDetalladas = {
  psicologa: {
    1: `Técnicas de calma: Para reducir la ansiedad y el estrés, puedes probar la respiración 4-7-8: inhala contando hasta 4, mantén la respiración 7 segundos, exhala lentamente 8 segundos. 
Combina esto con relajación muscular progresiva y meditación guiada. Practicar estas técnicas 10-15 minutos al día mejora tu bienestar emocional.`,
    2: `Gestión del miedo: Sentir miedo es natural ante situaciones inciertas. Identifica lo que realmente te preocupa y cuestiona pensamientos irracionales. Combina con respiración y relajación, habla con alguien de confianza y mantén rutinas de autocuidado.<br><br>
<button onclick="window.open('guiasYrecursosdeapoyo.html', '_blank')" style="padding:5px 10px; cursor:pointer;">Ver guías y recursos de apoyo</button>`,
    3: `Redes de apoyo: No estás sola. Busca grupos de apoyo locales, asociaciones o comunidades en línea. Participar en actividades sociales y voluntariado ayuda a crear conexiones. También puedes acudir a psicólogos especializados.<br><br>
<button onclick="window.open('testimonios.html', '_blank')" style="padding:5px 10px; cursor:pointer;">Ver testimonios</button>`,
  },
  abogada: {
    1: `Tipos de trámites legales: Divorcio, custodia, pensiones alimenticias, adopciones, herencias, denuncias o ayudas sociales. Infórmate siempre en comisarías, juzgados o servicios legales gratuitos.`,
    2: `Tus derechos: Derecho a asistencia jurídica gratuita, información, representación legal y protección en situaciones de vulnerabilidad. Conoce tus derechos laborales y familiares.`,
    3: `Orden de protección: Recurso legal para protegerte de violencia o acoso. Incluye medidas como prohibición de acercamiento, alejamiento del hogar y asistencia social.<br><br>
<button onclick="window.open('ayudaLegal.html', '_blank')" style="padding:5px 10px; cursor:pointer;">Acceder a ayuda legal</button>`,
  },
};

const perfiles = {
  psicologa: [
    {
      nombre: "Ana Martínez",
      especialidad: "ansiedad y estrés",
      lugar: "Madrid",
    },
    {
      nombre: "Lucía Gómez",
      especialidad: "terapia familiar",
      lugar: "Barcelona",
    },
    { nombre: "María López", especialidad: "depresión", lugar: "Valencia" },
    { nombre: "Sara Torres", especialidad: "autoestima", lugar: "Sevilla" },
    { nombre: "Elena Ruiz", especialidad: "trauma infantil", lugar: "Bilbao" },
  ],
  abogada: [
    {
      nombre: "Laura Sánchez",
      especialidad: "derecho familiar",
      lugar: "Madrid",
    },
    {
      nombre: "Carmen Díaz",
      especialidad: "violencia de género",
      lugar: "Barcelona",
    },
    {
      nombre: "Isabel Fernández",
      especialidad: "divorcios y custodia",
      lugar: "Valencia",
    },
    {
      nombre: "Patricia Morales",
      especialidad: "herencias y testamentos",
      lugar: "Sevilla",
    },
    {
      nombre: "Marta González",
      especialidad: "asistencia legal gratuita",
      lugar: "Bilbao",
    },
  ],
};

function addMessage(text, type, isHTML = false) {
  const chatBox = document.getElementById("chatBox");
  const msgDiv = document.createElement("div");
  msgDiv.className = `message ${type}`;
  if (isHTML) {
    msgDiv.innerHTML = text;
  } else {
    msgDiv.innerText = text;
  }
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function activarInput() {
  const input = document.getElementById("userInput");
  const btn = document.getElementById("sendBtn");

  input.disabled = false;
  btn.disabled = false;
  input.placeholder = "Escribe aquí...";
  input.focus();
}

function perfilAleatorio(especialidad) {
  const lista = perfiles[especialidad];
  const index = Math.floor(Math.random() * lista.length);
  return lista[index];
}

function mensajeBienvenida(perfil, especialidad) {
  return especialidad === "psicologa"
    ? `Ahora estás hablando con ${perfil.nombre}, Psicóloga, especializada en ${perfil.especialidad} en ${perfil.lugar}.`
    : `Ahora estás hablando con ${perfil.nombre}, Abogada, especializada en ${perfil.especialidad} en ${perfil.lugar}.`;
}

function iniciarChat(opcion) {
  especialidadActual = opcion;
  const perfil = perfilAleatorio(opcion);

  addMessage(
    opcion === "psicologa"
      ? `Has elegido Psicóloga. ${mensajeBienvenida(perfil, opcion)}`
      : `Has elegido Abogada. ${mensajeBienvenida(perfil, opcion)}`,
    "received",
  );

  activarInput();

  setTimeout(() => {
    addMessage(menus[opcion], "received");
  }, 600);
}

function cambiarEspecialidad() {
  especialidadActual =
    especialidadActual === "psicologa" ? "abogada" : "psicologa";
  const perfil = perfilAleatorio(especialidadActual);

  addMessage(mensajeBienvenida(perfil, especialidadActual), "received");

  setTimeout(() => {
    addMessage(menus[especialidadActual], "received");
  }, 600);
}

function procesarEnvio() {
  const input = document.getElementById("userInput");
  let mensaje = input.value.trim().toLowerCase();

  if (mensaje === "") return;

  addMessage(mensaje, "sent");
  input.value = "";

  setTimeout(() => {
    if (esperandoDecision) {
      if (mensaje === "sí" || mensaje === "si") {
        addMessage("Perfecto, aquí tienes más opciones:", "received");

        setTimeout(() => {
          addMessage(menus[especialidadActual], "received");
        }, 600);

        esperandoDecision = false;
      } else if (mensaje === "hablar") {
        cambiarEspecialidad();
        esperandoDecision = false;
      } else if (mensaje === "no") {
        addMessage("De acuerdo. Ha sido un placer ayudarte. 💜", "received");

        document.getElementById("userInput").disabled = true;
        document.getElementById("sendBtn").disabled = true;
      } else {
        addMessage("Responde con: sí / hablar / no", "received");
      }
      return;
    }

    if (!especialidadActual) {
      addMessage("Selecciona primero Psicóloga o Abogada.", "received");
      return;
    }

    if (!["1", "2", "3"].includes(mensaje)) {
      addMessage("Escribe solo 1, 2 o 3.", "received");
      return;
    }

    if (
      (especialidadActual === "psicologa" &&
        (mensaje === "2" || mensaje === "3")) ||
      (especialidadActual === "abogada" && mensaje === "3")
    ) {
      const chatBox = document.getElementById("chatBox");
      const msgDiv = document.createElement("div");
      msgDiv.className = "message received";
      msgDiv.innerHTML = respuestasDetalladas[especialidadActual][mensaje];
      chatBox.appendChild(msgDiv);
      chatBox.scrollTop = chatBox.scrollHeight;
    } else {
      const respuesta = respuestasDetalladas[especialidadActual][mensaje];
      addMessage(respuesta, "received");
    }

    setTimeout(() => {
      const otraEspecialidad =
        especialidadActual === "psicologa" ? "abogada" : "psicologa";

      addMessage(
        `¿Necesitas algo sí o prefieres hablar con una ${otraEspecialidad}? (sí / hablar / no)`,
        "received",
      );
      esperandoDecision = true;
    }, 600);
  }, 600);
}

// Eventos
document.getElementById("sendBtn").addEventListener("click", procesarEnvio);

document.getElementById("userInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    procesarEnvio();
  }
});

// MODO DISCRETO
document.addEventListener("DOMContentLoaded", () => {
  const btnModo = document.querySelector(".btn-modo-discreto");

  if (btnModo) {
    btnModo.addEventListener("click", () => {
      document.body.classList.toggle("modo-discreto");
      localStorage.setItem(
        "modoDiscreto",
        document.body.classList.contains("modo-discreto"),
      );
    });
  }

  if (localStorage.getItem("modoDiscreto") === "true") {
    document.body.classList.add("modo-discreto");
  }

  // Atajo con control + D
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === "d") {
      e.preventDefault();
      document.body.classList.toggle("modo-discreto");
      localStorage.setItem(
        "modoDiscreto",
        document.body.classList.contains("modo-discreto"),
      );
    }
  });
});
