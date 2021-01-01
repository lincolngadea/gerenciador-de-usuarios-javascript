// var nome = document.querySelector('#exampleInputName')
// var genero = document.querySelector('#form-user-create [name=gender]:checked')
// var nascimento = document.querySelector('#exampleInputBirth')
// var pais = document.querySelector('#exampleInputCountry')
// var email = document.querySelector('#exampleInputEmail')
// var senha = document.querySelector('#exampleInputPassword')
// var admin = document.querySelector("#exampleInputAdmin")

var fields = document.querySelectorAll("#form-user-create [name]")
user = {}

function addline(dataUser){

  document.getElementById("table-users").innerHTML =`
    <tr>
      <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
      <td>${dataUser.name}</td>
      <td>${dataUser.email}</td>
      <td>${dataUser.admin}</td>
      <td>${dataUser.birth}</td>
      <td>
        <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
        <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
      </td>
    </tr>  
  `
}

document.getElementById("form-user-create").addEventListener("submit",event=>{
  event.preventDefault()

  fields.forEach((item,index)=>{
    if(item.name == "gender"){
      if(item.checked) user[item.name] = item.value      
    }else{
      user[item.name] = item.value
    }
  })

  var objectUser = new User(
    user.name,
    user.gender,
    user.birth,
    user.country,
    user.email,
    user.password,
    user.photo,
    user.admin
  )
  addline(objectUser)
})