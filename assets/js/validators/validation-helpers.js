// This validation helper file must be loaded in the page before 
// any validation script. This file is to consolidate all helper functions.

// Email validation helper function
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // proper email format without whitespace
    const hasValidity = emailRegex.test(email);

    if(!hasValidity) {
        return 'Please enter a valid email address.'
    }

    return '';
}

// Password validation helper function
function validatePassword(password) {
    const minLength = 8;
    const maxLength = 32;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_,.?":{}|<>]/.test(password);
    const hasNoWhitespace = /^\S+$/.test(password);

    if (password.length < minLength || password.length > maxLength) {
        return `Password must be between ${minLength} and ${maxLength} characters long.`;
    }
    if (!hasUppercase || !hasLowercase || !hasNumber || !hasNumber || !hasSpecialChar || !hasNoWhitespace) {
        return `<ul>Password must contain at least:
        <li>one uppercase letter</li>
        <li>one lowercase letter</li>
        <li>one number</li>
        <li>one special character</li>
        and have no whitespace (e.g., no spacebar).
        </ul>
        `;
    }
    
    return '';
}

// Name validation helper function
function validateName(name) {
    const nameRegex = /^[a-zA-Z\s'-]{1,50}$/; // Only allow letters, spaces and apostrophes
    const hasValidity = nameRegex.test(name);
    const minLength = 1;
    const maxLength = 100;

    if (name.length < minLength || name.length > maxLength) {
        return 'Name cannot be blank.';
    }

    if (!hasValidity) {
        return 'Name must contain only letters, spaces, hyphens, or apostrophes.';
    }
    
    return '';
}

function isValidNoteTitle(noteTitle) {
    const minLength = 0;
    const maxLength = 100

    if (noteTitle.length > minLength && noteTitle.length <= maxLength) {
        return true;
    }

    return false;
}

function isValidNoteMessage(noteMessage) {
    const minLength = 0;
    const maxLength = 5000

    if (noteMessage.length > minLength && noteMessage.length <= maxLength) {
        return true;
    }

    return false;
}