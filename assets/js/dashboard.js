import { isValidNoteTitle, isValidNoteMessage } from './validators/validation-helpers.js';

const addNoteForm = document.querySelector("#addNoteForm");
const saveNewNoteBtn = document.querySelector("#btn-save-new-note");
const closeNewNoteBtn = document.querySelector("#btn-close-new-note");
const cancelNewNoteBtn = document.querySelector("#btn-cancel-new-note");
const divResponseMsg = document.querySelector("#response-message");

document.addEventListener("DOMContentLoaded", () => {
    // Store the user ID from the dashboard to be used in this script
    const userId = document.getElementById('userInfo').getAttribute('data-user-id');

    // Handle Edit button click
    document.querySelectorAll('.edit-note-btn').forEach(button => {
        button.addEventListener('click', function() { 
            const noteId = this.getAttribute('data-note-id'); 
            const modal = document.getElementById(`noteModal-${noteId}`);
            modal.querySelector('.note-title').classList.add('d-none');
            modal.querySelector('.edit-title').classList.remove('d-none');
            modal.querySelector('.note-message').classList.add('d-none');
            modal.querySelector('.edit-message').classList.remove('d-none');

            modal.querySelector('.edit-note-btn').classList.add('d-none');
            modal.querySelector('.delete-note-btn').classList.add('d-none');
            modal.querySelector('.save-note-btn').classList.remove('d-none');
            modal.querySelector('.cancel-edit-btn').classList.remove('d-none');
        });
    });

    // Handle Save button click
    document.querySelectorAll('.save-note-btn').forEach(button => {
        button.addEventListener('click', function() {
            const noteId = this.getAttribute('data-note-id'); 
            const modal = document.getElementById(`noteModal-${noteId}`);
            const updatedTitle = modal.querySelector('.edit-title').value;
            const updatedMessage = modal.querySelector('.edit-message').value;

            axios.patch(`/api/user/${userId}/note/${noteId}`, {
                title: updatedTitle,
                message: updatedMessage
            })
            .then(response => {
                // Update UI with new values
                modal.querySelector('.note-title').textContent = updatedTitle;
                modal.querySelector('.note-message').textContent = updatedMessage;

                // Hide inputs and show static text again
                modal.querySelector('.note-title').classList.remove('d-none');
                modal.querySelector('.edit-title').classList.add('d-none');
                modal.querySelector('.note-message').classList.remove('d-none');
                modal.querySelector('.edit-message').classList.add('d-none');

                modal.querySelector('.edit-note-btn').classList.remove('d-none');
                modal.querySelector('.delete-note-btn').classList.remove('d-none');
                modal.querySelector('.save-note-btn').classList.add('d-none');
                modal.querySelector('.cancel-edit-btn').classList.add('d-none');
            })
            .catch(error => {
                console.error('There was an error updating the note:', error);
            });
        });
    });

    // Handle Cancel button click
    document.querySelectorAll('.cancel-edit-btn').forEach(button => {
        button.addEventListener('click', function() { 
            const noteId = this.getAttribute('data-note-id'); // this refers to the clicked button
            const modal = document.getElementById(`noteModal-${noteId}`);

            // Reset the input fields to original values
            modal.querySelector('.edit-title').value = modal.querySelector('.note-title').textContent;
            modal.querySelector('.edit-message').value = modal.querySelector('.note-message').textContent;

            // Hide inputs and show static text again
            modal.querySelector('.note-title').classList.remove('d-none');
            modal.querySelector('.edit-title').classList.add('d-none');
            modal.querySelector('.note-message').classList.remove('d-none');
            modal.querySelector('.edit-message').classList.add('d-none');

            modal.querySelector('.edit-note-btn').classList.remove('d-none');
            modal.querySelector('.delete-note-btn').classList.remove('d-none');
            modal.querySelector('.save-note-btn').classList.add('d-none');
            modal.querySelector('.cancel-edit-btn').classList.add('d-none');
        });
    });

    // Handle Delete button click
    document.querySelectorAll('.delete-note-btn').forEach(button => {
        button.addEventListener('click', function() { 
            const noteId = this.getAttribute('data-note-id');
            if (confirm('Are you sure you want to delete this note?')) {
                axios.delete(`/api/user/${userId}/note/${noteId}`)
                    .then(response => {
                        // Hide the modal
                        const modal = document.getElementById(`noteModal-${noteId}`);
                        const bootstrapModal = bootstrap.Modal.getInstance(modal);
                        bootstrapModal.hide();

                        // Remove the note card from the DOM
                        document.getElementById(`noteModal-${noteId}`).remove();
                    })
                    .catch(error => {
                        console.error('There was an error deleting the note:', error);
                    });
            }
        });
    });
});

saveNewNoteBtn.addEventListener('click', async (e) => {
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

});

// Closing a new note dialog does not reset the form
closeNewNoteBtn.addEventListener('click', (e) => {
    
    // Reset error messages (if any)
    divResponseMsg.style.display = 'none';
    divResponseMsg.className = 'container alert';
    divResponseMsg.textContent = '';
})

// Canceling a new note dialog resets the form
cancelNewNoteBtn.addEventListener('click', (e) => {
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