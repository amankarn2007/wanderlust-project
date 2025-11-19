// "Form submit hone se pehle check karna ki sab fields valid hain ya nahi"
(() => {
  'use strict'

  // Get all forms that need validation
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => { // Listen to form submission
      if (!form.checkValidity()) {// Agar form invalid hai to submit rok do
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated') // Add Bootstrap validation style
    }, false)
  })
})()