const form = document.getElementById('signUpForm');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent the form from submitting
    validateForm(document.querySelectorAll('form input')); // validate the form input elements

    if (!document.querySelector('.invalid')) {
        // a good form
        alert('form is good');
    }
});

function validateForm(formElements) {
    Array.from(formElements).forEach(element => { // check validity for each form element
        if (element.id === 'password' || element.id === 'confirmPassword') {
            checkPasswordValidity(element); // check password fields in a separate function
        } else if (element.checkValidity()) {
            element.classList.remove('invalid');
            clearError(element);
        } else {
            element.classList.add('invalid');
            showError(element);
        }
    });
}

function checkPasswordValidity(inputElement) {
    const errorSpan = inputElement.nextElementSibling;

    if (inputElement.checkValidity()) {
        // further check whether password field matches with confirm password field
        if (inputElement.id === 'password') {
            if (inputElement.value !== document.getElementById('confirmPassword').value) {
                inputElement.classList.add('invalid');
                errorSpan.textContent = '*passwords do not match.';
            } else {
                inputElement.classList.remove('invalid');
                clearError(inputElement);
            }
        } else if (inputElement.id === 'confirmPassword') {
            if (inputElement.value !== document.getElementById('password').value) {
                inputElement.classList.add('invalid');
                errorSpan.textContent = '';
            } else {
                inputElement.classList.remove('invalid');
                clearError(inputElement);
            }
        }
    } else {
        if (inputElement.id === 'password') {
            if (inputElement.validity.valueMissing) {
                inputElement.classList.add('invalid');
                errorSpan.textContent = '*password is required.';
            } else if (inputElement.validity.tooShort) {
                inputElement.classList.add('invalid');
                errorSpan.textContent = '*at least 8 characters is required.';
            }
        } else if (inputElement.id === 'confirmPassword') {
            if (inputElement.validity.valueMissing) {
                inputElement.classList.add('invalid');
                errorSpan.textContent = '*password confirmation is required.';
            } else if (inputElement.validity.tooShort) {
                inputElement.classList.add('invalid');
                errorSpan.textContent = '*at least 8 characters is required.';
            }
        }
    }
}

function showError(inputElement) {
    const errorSpan = inputElement.nextElementSibling;

    if (inputElement.id === 'firstName') {
        errorSpan.textContent = '*first name is required.';
    } else if (inputElement.id === 'lastName') {
        errorSpan.textContent = '*last name is required.';
    } else if (inputElement.id === 'email') {
        if (inputElement.validity.valueMissing) {
            errorSpan.textContent = '*email is required.'; 
        }
        else if (inputElement.validity.typeMismatch) {
            errorSpan.textContent = '*please provide a valid email format.'; 
        }
    } else if (inputElement.id === 'phoneNumber') {
        errorSpan.textContent = '*phone number is required.';
    }
}

function clearError(inputElement) {
    const errorSpan = inputElement.nextElementSibling;
    errorSpan.textContent = '';
}