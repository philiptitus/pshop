const loginForm = document.querySelector('#two-factor-auth-login-form');
const toggleButton = document.querySelector('.two-factor-auth__toggle-btn');

function handleSubmit(event) {
  event.preventDefault();

  // Basic form validation to check a value has been added to inputs
  const submitButton = loginForm.querySelector('button[type="submit"]')
  const requiredFields = loginForm.querySelectorAll('[data-required]');
  const hasValue = value => value !== '';
  let totalErrors = 0;

  submitButton.disabled = true;
  requiredFields.forEach(field => {
    field.parentElement.classList.remove('form-field-error');

    if (!hasValue(field.value)) {
      field.parentElement.classList.add('form-field-error');
      totalErrors++;
    }
  });

  if (totalErrors === 0) {
    loginForm.submit();
  } else {
   submitButton.disabled = false;
  }
}

function handleToggle(event) {
  event.preventDefault();
  toggleButton.parentElement.classList.toggle('is-visible');
}

if (loginForm) {
  loginForm.addEventListener('submit', event => handleSubmit(event));
}

if (toggleButton) {
  toggleButton.addEventListener('click', event => handleToggle(event));
}

// QR Auth Code Input Form
const authCodeForm = document.querySelector('#two-factor-auth-code-form');
const formElements = document.querySelectorAll('input[name="authcode[]"]');

function handleAuthCodeSubmit(event) {
  event.preventDefault();
  const formArray = [];
  const submitButton = authCodeForm.querySelector('button[type="submit"]')

  submitButton.disabled = true;
  // creates array of all 6 inputs, combines and adds to hidden input
  formElements.forEach(input => {
    if (input.value) {
      formArray.push(input.value);
    }
  });

  if (formArray.length === 6) {
    authCodeForm.querySelector(
      'input[name="SubmittedCode"]'
    ).value = formArray.join('');
    authCodeForm.submit();
  } else {
    submitButton.disabled = false;
    authCodeForm.classList.add('form-field-error');
  }
}

function goToNextElement(nextInput) {
  nextInput.focus();
}

function goToPreviousElement(previousInput) {
  previousInput.focus();
}

if (authCodeForm) {
  authCodeForm.addEventListener('submit', event => handleAuthCodeSubmit(event));

  // move to next input on keyup and to previous when pressing backspace
  if (formElements) {
    formElements.forEach(input => {
      
      input.onkeydown = event => {
        const { keyCode } = event;
        const previousInput = input.previousElementSibling;
        const nextInput = input.nextElementSibling;
        const inputLength = input.value.length;
        console.log(inputLength)
        if(keyCode === 8 || keyCode === 46){
          if(inputLength === 1) {
            input.value = '';
          } else if(previousInput) {
            goToPreviousElement(previousInput)
          }     
        } else if ((event.shiftKey && keyCode === 9) ||
            keyCode === 37
          ) {
            goToPreviousElement(previousInput)
          } else if  (
            inputLength >= 1 ||
            (inputLength >= 1 && keyCode === 9) ||
            keyCode === 39
          )  {
              goToNextElement(nextInput);
          }
        
        if(keyCode === 13) {
          handleAuthCodeSubmit(event);
        }
      }
      
//       input.onkeyup = event => {
//         event.preventDefault();
//         const { keyCode } = event;
//         const previousInput = input.previousElementSibling;
//         const nextInput = input.nextElementSibling;
//         const inputLength = input.value.length;
             
//         if(keyCode !== 8){
//           if ((event.shiftKey && keyCode === 9) ||
//             keyCode === 37
//           ) {
//             goToPreviousElement(previousInput)
//           } else if (
//             inputLength >= 1 ||
//             (inputLength >= 1 && keyCode === 9) ||
//             keyCode === 39
//           ) {
//             if (nextInput) {
//               goToNextElement(nextInput);
//             }
//           }
//         }

//         // if (
//         //   keyCode === 8 ||
//         //   (event.shiftKey && keyCode === 9) ||
//         //   keyCode === 37
//         // ) {
//         //   goToPreviousElement(previousInput)
//         // } else if (
//         //   inputLength >= 1 ||
//         //   (inputLength >= 1 && keyCode === 9) ||
//         //   keyCode === 39
//         // ) {
//         //   if (nextInput) {
//         //     goToNextElement(nextInput);
//         //   }
//         // }
        
//         if(keyCode === 13) {
//           handleAuthCodeSubmit(event);
//         }
//       };
    });
  }
}