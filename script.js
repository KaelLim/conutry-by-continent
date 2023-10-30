const buttonContainer = document.getElementById('contact-n-buttonContainer');
const accordionContainer = document.getElementById('contact-n-accordionContainer');

// Fetch the data from the provided JSON URL
fetch('https://raw.githubusercontent.com/KaelLim/country-by-continent/main/affiliate_modified.json')
    .then(response => response.json())
    .then(data => {
        const uniqueContinents = [...new Set(data.map(item => item.continents))];

        uniqueContinents.forEach(continent => {
            const btn = document.createElement('button');
            btn.className = "contact-n-button";
            btn.innerText = continent;

            btn.addEventListener('click', () => {
                // 移除所有按鈕的 active 狀態
                document.querySelectorAll('.contact-n-button').forEach(b => {
                    b.classList.remove('contact-n-active');
                });
                // 將被點擊的按鈕設為 active
                btn.classList.add('contact-n-active');
                displayData(data, continent);
            });
            
            buttonContainer.appendChild(btn);
        });
        
        // 將「本會」的按鈕設為 active
        const benhuiButton = Array.from(document.querySelectorAll('.contact-n-button')).find(btn => btn.innerText === '本會');
        if (benhuiButton) {
            benhuiButton.classList.add('contact-n-active');
            displayData(data, '本會');
        }
    });



function displayData(data, continent) {
    accordionContainer.innerHTML = ''; // Clear previous content

    const filteredData = data.filter(item => item.continents === continent);
    let uniqueCategories = [];

    if (continent === '本會') {
        uniqueCategories = [...new Set(filteredData.map(item => item.province))].filter(province => province !== "未知");
    } else {
        uniqueCategories = [...new Set(filteredData.map(item => item.nation))];
    }
    

    uniqueCategories.forEach(category => {
        const categoryData = (continent === '本會')
            ? filteredData.filter(item => item.province === category)
            : filteredData.filter(item => item.nation === category);

        const button = document.createElement('button');
        button.className = 'contact-n-accordion';
        button.innerText = category;

        const div = document.createElement('div');
        div.className = 'contact-n-panel';

        const table = document.createElement('table');
        table.className = 'contact-n-table';

        // Add table header
        const thead = table.createTHead();
        const headerRow = thead.insertRow();
        ["志業體名稱", "志業體", "志業體電話", "志業體地址", "志業體地圖"].forEach(header => {
            const th = document.createElement('th');
            th.innerText = header;
            th.className = 'contact-n-th';
            headerRow.appendChild(th);
        });

        // Add table body based on the nation
        categoryData.forEach(entry => {
            const row = table.insertRow();
            row.insertCell(0).innerText = entry.affiliateName;
            row.insertCell(1).innerText = entry.mission;
            row.insertCell(2).innerText = entry.phone1;

            if (continent === '本會') {
                row.insertCell(3).innerText = entry.fullAddress;
            } else {
                row.insertCell(3).innerText = entry.address || ''; // Handle null values
            }

            const mapCell = row.insertCell(4);
            const mapLink = document.createElement('a');
            mapLink.href = `https://www.google.com/maps/place/${entry.fullAddress || entry.address}`;
            mapLink.innerText = 'Google 地圖';
            mapLink.target = '_blank';
            mapLink.className = 'contact-n-link';
            mapCell.appendChild(mapLink);
        });

        div.appendChild(table);

        accordionContainer.appendChild(button);
        accordionContainer.appendChild(div);
    });

    // Accordion functionality
    const acc = document.getElementsByClassName("contact-n-accordion");
    for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("contact-n-active");
            const panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }
}
