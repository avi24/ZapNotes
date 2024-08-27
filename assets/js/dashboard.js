import { isValidNoteTitle, isValidNoteMessage } from './validators/validation-helpers.js';

const addNoteForm = document.querySelector("#addNoteForm");
const saveNoteBtn = document.querySelector("#btn-save-new-note");
const closeNoteBtn = document.querySelector("#btn-close-new-note");
const cancelNoteBtn = document.querySelector("#btn-cancel-new-note");
const divResponseMsg = document.querySelector("#response-message");

saveNoteBtn.addEventListener('click', async (e) => {
    // Prevent any default action
    e.preventDefault();

    const noteTitle = document.querySelector("#noteTitle").value.trim();
    const noteMessage = document.querySelector("#noteMessage").value.trim();
    const notePriority = document.querySelector("#notePriority").value.toLowerCase();

    // Reset error messages
    divResponseMsg.style.display = 'none';
    divResponseMsg.className = 'container alert';
    divResponseMsg.textContent = '';

    // use validity flag to show all consolidated errors at once
    let validFlag = true;

    // data validation
    if(!isValidNoteTitle(noteTitle)) {
        const divNewError = document.createElement("div");
        divNewError.innerHTML = `Error: Title cannot be blank and cannot exceed 100 characters`;
        divResponseMsg.classList.add("alert-danger");
        divResponseMsg.appendChild(divNewError);

        validFlag = false;
    }

    if(!isValidNoteMessage(noteMessage)) {
        const divNewError = document.createElement("div");
        divNewError.innerHTML = `Error: Message cannot be blank and cannot exceed 5000 characters`;
        divResponseMsg.classList.add("alert-danger");;
        divResponseMsg.appendChild(divNewError);

        validFlag = false;
    }

    if(!validFlag) {
        // display error message in modal
        divResponseMsg.style.display = 'block';
        return;
    }

// debug
    console.log(`Note Priority: ${notePriority}`);

    // if all good, add note to user document
    const noteResponse = await handleAddNote({
        title: noteTitle,
        message: noteMessage,
        priority: notePriority,
    });

    if(noteResponse !== '') {
        if(noteResponse.includes('Error')){
            divResponseMsg.classList.add("alert-danger");
            divResponseMsg.textContent =`${noteResponse}`;
            divResponseMsg.style.display = 'block';
        } else {
            divResponseMsg.classList.add("alert-success");
            divResponseMsg.textContent =`${noteResponse}`;
            divResponseMsg.style.display = 'block';

            // formSignup.reset(); // Clear form on successful account creation

            // Re-direct after a 1s delay
            setTimeout(() => {
                window.location.href = '/api/user/66c25f240a8a26a066e8b608/notes';
            }, 1000);
        }
    }

    // find out if need to refresh /dashboard to 
    // show the new note right away

})

// Closing a new note dialog does not reset the form
closeNoteBtn.addEventListener('click', (e) => {
    
    // Reset error messages (if any)
    divResponseMsg.style.display = 'none';
    divResponseMsg.className = 'container alert';
    divResponseMsg.textContent = '';
})

// Canceling a new note dialog resets the form
cancelNoteBtn.addEventListener('click', (e) => {
    addNoteForm.reset();
    
    // Reset error messages (if any)
    divResponseMsg.style.display = 'none';
    divResponseMsg.className = 'container alert';
    divResponseMsg.textContent = '';
})

async function handleAddNote(inputs) {
    try{
        await axios.post('/api/user/66c25f240a8a26a066e8b608/note', inputs);
        return 'New note has been successfully added';
    } catch(err) {
        return `Error: ${err.message}`;
    }
}