function togglePassword(inputPasswordId, eyeToggleName) {
  var inputPassword = document.getElementById(inputPasswordId)
  var eyeToggle = document.getElementById(eyeToggleName)

  if (inputPassword.type == "password"){
      inputPassword.type = 'text'
      eyeToggle.setAttribute('data-icon', "akar-icons:eye-closed")
  } else {
      inputPassword.type = 'password'
      eyeToggle.setAttribute('data-icon', "akar-icons:eye")
  }
}
