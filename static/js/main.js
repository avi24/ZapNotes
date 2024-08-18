// Select DOM elements
const username = document.querySelector("#userName");
const email = document.querySelector("#userEmail");
const age = document.querySelector("#userAge");
const userInfo = document.querySelector("#userInfo")

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

            // Loop through the data and append to the userInfo panel
            data.forEach(note => {
                const noteElement = document.createElement("div");
                noteElement.innerHTML = `
                <h2>${note.title}</h2>
                <p>${note.message}</p>
                `
                userInfo.appendChild(noteElement);
            })

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