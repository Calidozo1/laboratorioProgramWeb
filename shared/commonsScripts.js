function manejarFormulario(formId, storageKey) {
    const form = document.getElementById(formId);
    if (!form) return;

    console.log(`✅ Formulario "${formId}" encontrado`);

    form.addEventListener("submit", function(e) {
        e.preventDefault(); // Evita el envío tradicional

        const formData = new FormData(form);
        const datos = {};

        // Recoger todos los campos
        formData.forEach((value, key) => {
            datos[key] = value;
        });

        console.log('🔍 Datos recolectados:', datos);

        // Enviar con fetch
        fetch('https://jsonplaceholder.typicode.com/posts ', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        })
        .then(response => {
            if (!response.ok) throw new Error('Error en la respuesta');
            return response.json();
        })
        .then(data => {
            console.log('✅ Respuesta del servidor:', data);

            let registros = JSON.parse(localStorage.getItem(storageKey)) || [];
            registros.push(data);
            localStorage.setItem(storageKey, JSON.stringify(registros));

            alert('✅ Datos guardados correctamente.');
            form.reset();
        })
        .catch(error => {
            console.error('❌ Error:', error);
            alert('Hubo un problema al enviar los datos.');
        });
    });
}