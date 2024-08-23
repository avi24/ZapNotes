// Select DOM elements
const username = document.querySelector("#userName");
const email = document.querySelector("#userEmail");
const age = document.querySelector("#userAge");
const userInfo = document.querySelector("#userInfo");
const notesList = document.querySelector("#notesList");

// Add event listener to the fetch button
fetchButton.addEventListener("click", () => {
    // Set endpoint url
    const url = "http://localhost:9000/notes/";

    // Fetch data from endpoint
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Clear the userInfo panel
            userInfo.innerHTML = '';
            notesList.innerHTML = '';

            // Loop through the data and append to the userInfo panel
            data.forEach(note => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                <h4>${note.title}</h4>
                <p>${note.message}</p>
                `
                notesList.appendChild(listItem);
            })

            userInfo.appendChild(notesList);

            // const userElement = document.createElement("div");

            // userElement.innerHTML = `
            // <h2>Name: ${data.name.title} ${data.name.first} ${data.name.last}</h2>
            // <p>Email: ${data.email}</p>
            // <p>Age: ${data.dob.age}</p>
            // `;
            // userInfo.appendChild(userElement);
        })
        .catch(error => {
            console.log(`Error: ${error.message}`);
            userInfo.innerHTML = `<h2>Error: ${error.message}</h2>`;
        });
});