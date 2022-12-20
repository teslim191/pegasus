$(document).ready(function(){
  $("#icon").click(function(){
    let input = document.getElementById('password').type
    let icon = $(this)
    if (icon.hasClass('fas fa-eye-slash') && input === 'password') {
      icon.removeClass('fas fa-eye-slash')
      icon.addClass('fas fa-eye')
      document.getElementById('password').type = 'text'   
    }
    else{
      icon.removeClass('fas fa-eye')
      icon.addClass('fas fa-eye-slash')
      document.getElementById('password').type = 'password'
    }

  })

})


// const togglePassword = document.querySelector('#togglePassword');
//   const password = document.querySelector('#id_password');

//   togglePassword.addEventListener('click', function (e) {
//     // toggle the type attribute
//     const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
//     password.setAttribute('type', type);
//     // toggle the eye slash icon
//     this.classList.toggle('fa-eye-slash');
// });