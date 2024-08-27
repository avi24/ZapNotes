const formSignup = document.querySelector("form");
const btnSubmitSignup = document.querySelector('#btn-sbmt-signup');

btnSubmitSignup.addEventListener('click', async (e) => {
    e.preventDefault();

    const name = document.querySelector('#floatingName').value;
    const dob = document.querySelector('#floatingDob').value;
    const phone = document.querySelector('#floatingPhone').value;
    const email = document.querySelector('#floatingEmail').value;
    const pw = document.querySelector('#floatingPassword').value;

    const divResponseMsg = document.querySelector("#response-message");

    // use a flag to display all errors together rather than sequential
    // for a better user experience
    let invalidFieldFlag;

    // Reset error messages
    divResponseMsg.style.display = 'none';
    divResponseMsg.className = 'container alert';
    divResponseMsg.textContent = '';

    // Front-end data validation
    // Validate name
    const validateNameMsg = validateName(name);
    if(validateNameMsg !== '') {
        const divNewError = document.createElement("div");
        divNewError.innerHTML = `Error: ${validateNameMsg}`;
        divResponseMsg.classList.add("alert-danger");
        divResponseMsg.appendChild(divNewError);
        invalidFieldFlag = true;
    }

    // Validate email
    const validateEmailMsg = validateEmail(email);
    if(validateEmailMsg !== '') {
        const divNewError = document.createElement("div");
        divNewError.innerHTML = `Error: ${validateEmailMsg}`;
        divResponseMsg.classList.add("alert-danger");
        divResponseMsg.appendChild(divNewError);
        invalidFieldFlag = true;
    }

    // Validate password according to app logic
    const validatePwMsg = validatePassword(pw);
    if(validatePwMsg !== '') {
        const divNewError = document.createElement("div");
        divNewError.innerHTML = `Error: ${validatePwMsg}`;
        divResponseMsg.classList.add("alert-danger");
        divResponseMsg.appendChild(divNewError);
        invalidFieldFlag = true;
    }

    if(invalidFieldFlag) {
        divResponseMsg.style.display = 'block';
        return;
    }

    // Attempt login if all validation is clear
    // Rememebr to match Schema fields if directly sending this object
    const signupResponse = await handleSignup({
        name, dob, phone, email, password:pw
    });

    if(signupResponse !== '') {
        if(signupResponse.includes('Error')){
            divResponseMsg.classList.add("alert-danger");
            divResponseMsg.textContent =`${signupResponse}`;
            divResponseMsg.style.display = 'block';
        } else {
            divResponseMsg.classList.add("alert-success");
            divResponseMsg.textContent =`${signupResponse}`;
            divResponseMsg.style.display = 'block';

            formSignup.reset(); // Clear form on successful account creation

            // Re-direct after a 1s delay
            setTimeout(() => {
                window.location.href = '/login';
            }, 1000);
        }
    }
});

async function handleSignup(inputs) {
    try{
        await axios.post('/api/signup', inputs);
        return 'New account has been successfully created.';
    } catch(err) {
        return `Error during signup: ${err.message}`;
    }
   

}
