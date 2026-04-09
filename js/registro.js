document.addEventListener("DOMContentLoaded", () => {
    const btnModo = document.querySelector(".btn-modo-discreto");
    if (btnModo) {
        btnModo.addEventListener("click", () => {
            document.body.classList.toggle("modo-discreto");
            localStorage.setItem("modoDiscreto", document.body.classList.contains("modo-discreto"));
        });
    }

    const botonX = document.querySelector(".btn-x-salir");
    if (botonX) {
        botonX.addEventListener("click", () => {
            window.location.replace("https://www.google.com");
            window.open("https://www.google.com", "_newtab");
        });
    }

    const checkMostrar = document.getElementById("checkMostrar");
    const passInput = document.getElementById("passRegistro");
    const passConfirmInput = document.getElementById("passConfirmRegistro");

    checkMostrar.addEventListener("change", () => {
        const tipo = checkMostrar.checked ? "text" : "password";
        passInput.type = tipo;
        passConfirmInput.type = tipo;
    });

    const form = document.getElementById("registroForm");
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const email = document.getElementById("emailRegistro").value;
        const pass = passInput.value;
        const passConfirm = passConfirmInput.value;

        if (localStorage.getItem("emailRegistrado") === email && email !== "") {
            Swal.fire({ title: 'Error', text: 'Este correo electrónico ya existe.', icon: 'error', confirmButtonColor: '#6f42c1' });
            return;
        }

        if (pass === "") {
            Swal.fire({ title: 'Atención', text: 'Tienes que poner una contraseña.', icon: 'warning', confirmButtonColor: '#6f42c1' });
            return;
        }
        if (passConfirm === "") {
            Swal.fire({ title: 'Atención', text: 'Tienes que volver a verificar la contraseña.', icon: 'warning', confirmButtonColor: '#6f42c1' });
            return;
        }

        let errorSeguridad = "";
        if (pass.length < 8) {
            errorSeguridad = "La contraseña debe tener al menos 8 caracteres.";
        } else if (!/[A-Z]/.test(pass)) {
            errorSeguridad = "La contraseña debe incluir al menos una letra mayúscula.";
        } else if (!/[a-z]/.test(pass)) {
            errorSeguridad = "La contraseña debe incluir al menos una letra minúscula.";
        } else if (!/[0-9]/.test(pass)) {
            errorSeguridad = "La contraseña debe incluir al menos un número.";
        } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?·]/.test(pass)) {
            errorSeguridad = "La contraseña debe incluir al menos un símbolo.";
        }

        if (errorSeguridad !== "") {
            Swal.fire({ title: 'Seguridad insuficiente', text: errorSeguridad, icon: 'warning', confirmButtonColor: '#6f42c1' });
            return;
        }

        if (pass !== passConfirm) {
            Swal.fire({ title: 'Error', text: 'Las contraseñas no coinciden.', icon: 'error', confirmButtonColor: '#6f42c1' });
            return;
        }

        if (!form.checkValidity()) {
            form.classList.add('was-validated'); 
            return; 
        }

        form.classList.add('was-validated'); 

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

    document.getElementById("btnVolverLogin").addEventListener("click", () => {
        window.location.href = "login.html";
    });
});