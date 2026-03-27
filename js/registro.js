document.addEventListener("DOMContentLoaded", () => {
    // 1. Configuración de la Salida Rápida (Botón X)
    const botonX = document.querySelector(".btn-x-salir");
    if (botonX) {
        botonX.addEventListener("click", salidaRapida);
    }

    // Función de salida rápida (botón X)
    
    function salidaRapida() {
        // Redirige en la misma pestaña
        window.location.replace("https://www.google.com");
        // Abre una nueva como medida extra
        window.open("https://www.google.com", "_newtab");
    }
        // 2. Configuración del Modo Discreto
    const btnModo = document.querySelector(".btn-modo-discreto");
    
    // Función para activar/desactivar el modo
    const toggleModoDiscreto = () => {
        document.body.classList.toggle("modo-discreto");
        localStorage.setItem("modoDiscreto", document.body.classList.contains("modo-discreto"));
    };

    if (btnModo) {
        btnModo.addEventListener("click", toggleModoDiscreto);
    }


    // 2. LÓGICA DEL FORMULARIO CON VALIDACIÓN DE BOOTSTRAP
    const form = document.getElementById("registroForm");
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Verificar la validación nativa de Bootstrap
        if (!form.checkValidity()) {
            form.classList.add('was-validated'); // Muestra los mensajes invalid-feedback
            return; // Detiene el envío
        }

        form.classList.add('was-validated'); // Asegura que se marquen los campos válidos si lo son

        // Obtener valores de forma más segura con IDs
        const email = document.getElementById("emailRegistro").value;
        const pass = document.getElementById("passRegistro").value;
        const passConfirm = document.getElementById("passConfirmRegistro").value;

        // Validación personalizada de coincidencia de contraseñas (con SweetAlert2)
        if (pass !== passConfirm) {
            Swal.fire({
                title: 'Error',
                text: 'Las contraseñas no coinciden.',
                icon: 'error',
                confirmButtonColor: '#6f42c1'
            });
            return;
        }

        // Si todo está bien, guardar datos
        localStorage.setItem("emailRegistrado", email);
        localStorage.setItem("passRegistrada", pass);
        localStorage.setItem("usuario", "Patrii"); 

        Swal.fire({
            title: '¡Buen trabajo!',
            text: 'Cuenta creada con éxito.',
            icon: 'success',
            confirmButtonColor: '#6f42c1'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "login.html";
            }
        });
    }, false);

    // 3. BOTÓN VOLVER (Mantenido)
    document.getElementById("btnVolverLogin").addEventListener("click", () => {
        window.location.href = "login.html";
    });
});