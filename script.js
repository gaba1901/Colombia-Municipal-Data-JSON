// Cargar datos predeterminados automáticamente
document.getElementById("loadDefault").addEventListener("click", function() {
    fetch('MunicipiosColombia.json')
        .then(response => response.json())
        .then(data => {
            loadTable(data);
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
});

// Cargar datos desde un archivo JSON subido
document.getElementById("uploadButton").addEventListener("click", function() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const jsonData = JSON.parse(event.target.result);
            loadTable(jsonData);
        };
        reader.readAsText(file);
    } else {
        alert("Por favor, selecciona un archivo JSON.");
    }
});

// Función para cargar datos en la tabla
function loadTable(data) {
    const tableBody = document.querySelector("#municipiosTable tbody");
    tableBody.innerHTML = ""; // Limpiar la tabla antes de cargar nuevos datos

    data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.REGION}</td>
            <td>${item["CÓDIGO DANE DEL DEPARTAMENTO"]}</td>
            <td>${item.DEPARTAMENTO}</td>
            <td>${item["CÓDIGO DANE DEL MUNICIPIO"]}</td>
            <td>${item.MUNICIPIO}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Filtrar los resultados de la tabla
function filterTable() {
    const regionFilter = document.getElementById("filterRegion").value.toLowerCase();
    const daneDeptFilter = document.getElementById("filterDaneDept").value;
    const deptFilter = document.getElementById("filterDept").value.toLowerCase();
    const daneMuniFilter = document.getElementById("filterDaneMuni").value;
    const muniFilter = document.getElementById("filterMuni").value.toLowerCase();

    const rows = document.querySelectorAll("#municipiosTable tbody tr");
    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        const regionMatch = cells[0].textContent.toLowerCase().includes(regionFilter);
        const daneDeptMatch = cells[1].textContent.includes(daneDeptFilter);
        const deptMatch = cells[2].textContent.toLowerCase().includes(deptFilter);
        const daneMuniMatch = cells[3].textContent.includes(daneMuniFilter);
        const muniMatch = cells[4].textContent.toLowerCase().includes(muniFilter);

        if (regionMatch && daneDeptMatch && deptMatch && daneMuniMatch && muniMatch) {
            row.style.display = ""; // Mostrar fila
        } else {
            row.style.display = "none"; // Ocultar fila
        }
    });
}

// Agregar event listeners para los filtros
document.querySelectorAll("#filterRegion, #filterDaneDept, #filterDept, #filterDaneMuni, #filterMuni").forEach(input => {
    input.addEventListener("input", filterTable);
});
