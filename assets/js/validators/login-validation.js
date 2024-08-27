const btnSubmitLogin = document.querySelector('#btn-sbmt-login');
const btnTestLogin = document.querySelector('#btn-test-login');

btnSubmitLogin.addEventListener('click', async (e) => {
    e.preventDefault();

    const emailInput = document.querySelector('#floatingInput');
    const pwInput = document.querySelector('#floatingPassword');
    const divResponseMsg = document.querySelector("#response-message");

    const email = emailInput.value;
    const pw = pwInput.value;

    // use a flag to display all errors together rather than sequential
    // for a better user experience
    let invalidFieldFlag;

    // Reset error messages
    divResponseMsg.style.display = 'none';
    divResponseMsg.textContent = '';

    // Front-end data validation
    // Validate email
    const validateEmailMsg = validateEmail(email);
    if(validateEmailMsg !== '') {
        const divNewError = document.createElement("div");
        divNewError.innerHTML = `Error: ${validateEmailMsg}`;
        // errorMsgDiv.innerHTML += `<p>Error: ${validateEmailMsg}</p>`;
        divResponseMsg.appendChild(divNewError);
        

        invalidFieldFlag = true;
    }

    // Validate password according to app logic
    const validatePwMsg = validatePassword(pw);
    if(validatePwMsg !== '') {
        const divNewError = document.createElement("div");
        divNewError.innerHTML = `Error: ${validatePwMsg}`;
        divResponseMsg.appendChild(divNewError);
        
        invalidFieldFlag = true;
    }

    if(invalidFieldFlag) {
        divResponseMsg.style.display = 'block';
        return;
    }

    // Attempt login if all validation is clear
    const loginResponse = await handleLogin(email, pw);

    if(loginResponse !== '') {
        divResponseMsg.textContent =`${loginResponse}`;
        divResponseMsg.style.display = 'block';
    }
});

btnTestLogin.addEventListener('click', async (e) => {
    e.preventDefault();

    const errorMsgDiv = document.querySelector("#error-message");

    const email = 'djokernole@example.com';
    const pw = 'Djokovic_1234';

    // Reset error messages
    errorMsgDiv.style.display = 'none';
    errorMsgDiv.textContent = '';

    // Attempt login if all validation is clear
    const loginResponse = await handleLogin(email, pw);

    if(loginResponse !== '') {
        errorMsgDiv.textContent =`${loginResponse}`;
        errorMsgDiv.style.display = 'block';
        return;
    } 
});

// User validation helper function
// Requires axios
async function handleLogin(email, password) {
    try {
        console.log('Entered try block');
        // Send POST request to authentication endpoint
        const response = await axios.post('/auth/login', {
            email: email,
            password: password
        });

        console.log('Executed axios POST');

        // Extract JWT from response
        const jwt = response.data.accessToken;

        console.log(`Successfully stored JWT access token: ${jwt}`);

        // Store JWT in local storage
        localStorage.setItem('token', jwt);

        // Handle successful response
        window.location.href = '/'; // Redirect to client-side route
        // await axios.post('/', {}, {
        //     headers: {
        //         'authorization': `Bearer ${localStorage.getItem('token')}`
        //     }  
        // }).then(() => {
        //     window.location.href='/';
        // }).catch((err) => {
        //     console.log(err);
        // })
        // await axios.get('/');

        return '';
    } catch (error) {
        // Handle 401 Unauthorized Error
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized access: ', error.response.data.message || 'Invalid credentials');
            return 'Login failed: Invalid email or password. Please try again.';
        } else {
            // Handle other errors
            console.error('Error during login: ', error.message);
            return `Login failed: ${error.message}`;
        }
    }
}