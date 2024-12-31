// Fetch and display the top repositories
fetch('./data/metrics.json')
    .then(response => response.json())
    .then(data => {
        // Prepare data for Chart.js
        const labels = Object.keys(data);
        const starCounts = Object.values(data);

        // Populate the chart
        const ctx = document.getElementById('repoContributions').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Stars',
                    data: starCounts,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Populate the table
        const tableBody = document.querySelector('#data-table tbody');
        labels.forEach((repo, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${repo}</td><td>${starCounts[index]}</td>`;
            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error fetching or processing data:', error);
    });
