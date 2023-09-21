document.addEventListener("DOMContentLoaded", function() {
    console.log("Document is ready");  // Debug: Check if DOM is ready

    document.getElementById("btnLocal").addEventListener("click", function() {
        console.log("Button clicked");  // Debug: Check if button is clicked
        
        fetch('https://raw.githubusercontent.com/KaelLim/country-by-continent/main/affiliate_modified.json')
        .then(response => {
            console.log("Fetch response received");  // Debug: Check if fetch receives a response
            return response.json();
        })
        .then(data => {
            console.log("Data received:", data);  // Debug: Check the fetched data

            const localEntries = data.filter(entry => entry.continents === '本會');
            console.log("Filtered local entries:", localEntries);  // Debug: Check the filtered local entries

            // Clear existing content
            const contentDiv = document.getElementById("content");
            contentDiv.innerHTML = "";

            // Generate a special table for "花蓮本會" and place it at the top
            const hualienEntry = localEntries.find(entry => entry.affiliateName === "花蓮本會");
            if (hualienEntry) {
                const specialTable = document.createElement("table");
                specialTable.innerHTML = "<tr><th>志業體名稱</th><th>志業體</th><th>志業體電話</th><th>志業體地址</th><th>志業體地圖</th></tr>";
                const specialRow = specialTable.insertRow(-1);
                specialRow.insertCell(0).innerHTML = hualienEntry.affiliateName;
                specialRow.insertCell(1).innerHTML = hualienEntry.mission;
                specialRow.insertCell(2).innerHTML = hualienEntry.phone1;
                specialRow.insertCell(3).innerHTML = hualienEntry.fullAddress;
                specialRow.insertCell(4).innerHTML = `<a href="https://www.google.com.tw/maps/place/${hualienEntry.fullAddress}" target="_blank">Google 地圖</a>`;
                const specialTitle = document.createElement("h2");
                specialTitle.innerHTML = "花蓮本會";
                specialTitle.className = "specialAccordion";  // 新增這一行
                contentDiv.appendChild(specialTitle);
                contentDiv.appendChild(specialTable);
            }

            // Group by province
            const groupedByProvince = localEntries.reduce((acc, entry) => {
                const province = entry.province;
                if (!acc[province]) {
                    acc[province] = [];
                }
                acc[province].push(entry);
                return acc;
            }, {});

            console.log("Grouped by province:", groupedByProvince);  // Debug: Check the grouping result

            // Generate tables for each province
            for (const [province, entries] of Object.entries(groupedByProvince)) {
                console.log(`Generating table for province: ${province}`);  // Debug: Check which province is currently being processed
                
                const table = document.createElement("table");
                table.className = "panel";  // Add the class here
                table.innerHTML = "<tr><th>志業體名稱</th><th>志業體</th><th>志業體電話</th><th>志業體地址</th><th>志業體地圖</th></tr>";
                
                entries.forEach(entry => {
                    const row = table.insertRow(-1);
                    row.className = "myTableRowClass";  // Add the class here
                    row.insertCell(0).innerHTML = entry.affiliateName;
                    row.insertCell(1).innerHTML = entry.mission;
                    row.insertCell(2).innerHTML = entry.phone1;
                    row.insertCell(3).innerHTML = entry.fullAddress;
                    row.insertCell(4).innerHTML = `<a href="https://www.google.com.tw/maps/place/${entry.fullAddress}" target="_blank">Google 地圖</a>`;
                });

                const provinceTitle = document.createElement("h2");
                provinceTitle.className = "accordion";  // Add the class here
                provinceTitle.innerHTML = province;

                contentDiv.appendChild(provinceTitle);
                contentDiv.appendChild(table);
            }

            // Add accordion event listeners AFTER all the accordions have been created
            addAccordionEventListeners();
        })
        .catch(error => {
            console.error('Error:', error);  // Debug: Check any errors
        });
    });
});

// This function is defined to add accordion functionality
function addAccordionEventListeners() {
    const accordions = document.querySelectorAll('.accordion');
    accordions.forEach(accordion => {
        accordion.addEventListener('click', function() {
            this.classList.toggle('active');
            const panel = this.nextElementSibling;
            if (panel.style.display === 'block') {
                panel.style.display = 'none';
            } else {
                panel.style.display = 'block';
            }
        });
    });
}
