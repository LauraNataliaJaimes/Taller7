document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("formulario").addEventListener('submit', validarFormulario);
  });


  $(document).ready(function () {
    $('#DateOfBirth').change(function () {
      var now = new Date();   //Current Date
      var past = new Date($('#DateOfBirth').val());  //Date of Birth
      if (past >= now) {
        alert('ERROR: La fecha que ingreso es MAYOR a la fecha actual');
      return false;
      }
      var nowYear = now.getFullYear();  //Get current year
      var pastYear = past.getFullYear();//Get Date of Birth year
      var age = nowYear - pastYear;  //calculate the difference
  $('#Age').val(age);
  if (age < 18){
        alert('Debe ser Mayor de Edad para completar este formulario');
      return false;
      }
})
})


 //Select Json
 $.ajax({
  url: 'https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.min.json',
  type: 'GET',
  dataType: 'json',

  success: function (json) {
    var departmento = `<option value="" disabled selected>Departamento</option>`;
    for (let item of json) {
      departmento += `<option value="${json.indexOf(item)}">${item.departamento}</option>`;
    }

    $('#departamentos').html(departmento);
    $('select').formSelect();
    $('#departamentos').on('change', function () {
      var municipio = '<option value="" disabled selected>Municipio</option>';
      for (let item of json[$(this).val()].ciudades) {
        municipio += `<option value="${json[$(this).val()].ciudades.indexOf(item)}">${item}</option>`;
      }
      $('#municipios').html(municipio);
      $('select').formSelect();
    });
  }
})


  function validarFormulario(evento) {
    evento.preventDefault(); 

    var nombre, apellido, email, emailValidator, password, confirm_password, user, passwordValidator, phoneValidator, phone;

    user = document.getElementById('user').value;
    phone = document.getElementById('phone').value;
    email = document.forms["formulario"]["mail"].value;
    nombre = document.getElementById('nombre').value;
    apellido = document.getElementById('apellido').value;
    password = document.getElementById('password').value;
    confirm_password = document.getElementById('confirm_password').value;
    emailValidator = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/;
    passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    phoneValidator = /^\(?([0-9]{1})\)?[-. ]?([0-9]{7})$/;
  
    //Valido Nombre
    if(nombre.length == 0) {
      alert("Ingrese su Nombre completo");
      return;
    }
    //Valido Apellido
    else if(apellido.length == 0) {
      alert('Ingrese sus Apellidos completos');
      return;
    }   
    else if(email.length == 0) {
      alert('Ingrese un Correo Electrónico');
      return;
    }   
    else if (!(email.match(emailValidator)))
    {
      alert('CORREO ELECTRONICO INVALIDO. Recuerde que el formato para el correo es email@ejemplo.com - No debe contener caracteres extraños: (! # $ % & * + / = ? ^ { | } ~)');
      return;
    }
    else if(phone.value.length == 0) {
      alert('Ingrese un nombre de Usuario');
      return;
    }
    else if (!(phone.match(phoneValidator))) {
      alert('TELÉFONO INVALIDA. Recuerde digitar su número de la siguiente manera: (Indicativo) + 7 dígitos de su residencia');
      return;
    }
    else if(user.length == 0) {
      alert('Ingrese un nombre de Usuario');
      return;
    }
    else if((user.length < 5) || (user.length > 15)) {
      alert('El Usuario debe tener entre 5 y 15 caracteres');
      return;
    }
    else if (password.length == 0) {
      alert('Ingrese una Contraseña');
      return;
    }
    else if(password.length < 7 ){
        alert('La Contraseña debe tener más de 8 caracteres');
      return;
    }
    else if (!(password.match(passwordValidator))){
      alert('CONTRASEÑA INVALIDA. Recuerde que la contraseña debe tener 1 Mayuscula, 1 Minuscula, 1 Número y 1 Caracter extraño: (! # $ % & * + / = ? ^ { | } ~)');
      return;
    }
    else if (confirm_password != password) {
      alert('La Contraseña que esta Validando no coincide con la previamente escrita');
      return;
    }
    

 //El formulario se envia
 alert("Muchas gracias por completar el formulario");
 document.formulario.post();
} 

function updateTextInput(val) {
  document.getElementById('textInput').value=val; 
}