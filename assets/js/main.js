const finderForm = document.querySelector('.finder-form');
const finderInput = document.querySelector('.finder-input');

const messageWrapper = document.querySelector('.message-wrapper');
const message = messageWrapper.querySelector('span');
const resultsTableBody = document.querySelector('.main-table-body');




finderForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const finderInputValue = finderInput.value;

  try {
    const response = await fetch('/find-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({number: finderInputValue})
    });

    const data = await response.json();

    if (!data.ok) {
      messageWrapper.classList.remove('d-none');
      messageWrapper.classList.add('fail-message');
      message.textContent = "Бундай номерли вагон топилмади";
      clearResults();
      return;
    }

    if (messageWrapper.classList.contains('fail-message')) {
      messageWrapper.classList.remove('fail-message');
    }
    await messageWrapper.classList.add('d-none');
    messageWrapper.classList.add('success-message');
    message.textContent = ''
    finderInput.value = '';
    displayResults(data)

  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
});



function clearResults() {
  resultsTableBody.innerHTML = ''; // Clear the table
}


function displayResults(data) {
  const resultsTableBody = document.querySelector('.main-table-body');
  resultsTableBody.innerHTML = ''; // Clear previous results
  [data].forEach((item, index) => {
    const row = document.createElement('tr');
    const cell1 = document.createElement('td');
    const cell2 = document.createElement('td');
    let parsedIndex = +item.index;
    cell1.style.textAlign = 'center';
    cell2.style.textAlign = 'center';
    cell1.textContent = parsedIndex + 1;
    cell2.textContent = item.data.number; // Adjust according to your data structure

    row.appendChild(cell1);
    row.appendChild(cell2);
    resultsTableBody.appendChild(row);
  });

}



