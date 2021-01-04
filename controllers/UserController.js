class UserController{

  constructor(formId,tableId){
    this.formEl= document.getElementById(formId)
    this.tableEl= document.getElementById(tableId)

    this.onSubmit();
    this.onEditCancel();
  }

  onEditCancel(){
    document.querySelector("#box-user-update .btn-cancel").addEventListener("click", e=>{

      this.showPanelCreate();

    })
  }

  onSubmit(){

    this.formEl.addEventListener("submit",event=>{
      event.preventDefault()

      let btn = this.formEl.querySelector("[type=submit]")

      btn.disabled = true;

      let values = this.getValues()

      if(!values) return false;

      this.getPhotos().then((content)=>{
        values.photo = content;
                  
        this.addLine(values);

        this.formEl.reset()

        btn.disabled = false;  

      },
        (e)=>{
          console.error(e);
        }
      );

      this.getPhotos((content)=>{

      

      });      
    });
  }

  getValues(){
    let user = {};
    let isValid = true;
  
    [...this.formEl.elements].forEach((item,index)=>{

      if(['name','email','password'].indexOf(item.name) >= 0 && !item.value){
         
        item.parentElement.classList.add('has-error');
        isValid = false
      }

      if(item.name == "gender"){

        if(item.checked) user[item.name] = item.value  

      }else if(item.name =="admin"){

        user[item.name] = item.checked ? 'SIM' : 'NÃO';

      }else{

        user[item.name] = item.value

      }
    });

    if(!isValid){
      return false;
    }
  
    return new User(
      user.name,
      user.gender,
      user.birth,
      user.country,
      user.email,
      user.password,
      user.photo,
      user.admin
    )
  }

  getPhotos(callback){

    return new Promise((resolve, reject)=>{
      let fileReader = new FileReader();

      let elements = [...this.formEl.elements].filter(item=>{
        if(item.name === 'photo'){
          return item;
        }
      });

      let file = elements[0].files[0];
      // console.log(file)
      fileReader.onload = ()=>{
        resolve(fileReader.result);
      }

      fileReader.onerror = (e)=>{
        reject(e)
      }

      if(file){
        fileReader.readAsDataURL(file)
      }else{
        resolve('dist/img/boxed-bg.jpg');
      }
    });
    
  }

  addLine(dataUser){

    let tr = document.createElement('tr');

    tr.dataset.user = JSON.stringify(dataUser);

    tr.innerHTML =
      `
        <td><img src=${dataUser.photo} alt="User Image" class="img-circle img-sm"></td>
        <td>${dataUser.name}</td>
        <td>${dataUser.email}</td>
        <td>${dataUser.admin}</td>
        <td>${Utils.dateFormat(dataUser.register)}</td>
        <td>
          <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
          <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
        </td>
      `

    tr.querySelector(".btn-edit").addEventListener("click",e =>{
        // JSON.parse(tr.dataset.user)
        this.showPanelUpdate();
    });
  this.tableEl.appendChild(tr);

  this.updateCount();
  
  }

  showPanelCreate(){
    document.getElementById("box-user-create").style.display="block";
    document.getElementById("box-user-update").style.display="none";
  }

  showPanelUpdate(){
    document.getElementById("box-user-create").style.display="none";
    document.getElementById("box-user-update").style.display="block";
  }

  updateCount(){

    let numberUsers = 0;
    let numberAdmin = 0;

    [...this.tableEl.children].forEach(tr=>{
      numberUsers++;

      let user = JSON.parse(tr.dataset.user);

      if(user._admin) numberAdmin++;
    })

    document.querySelector("#number-users").innerHTML = numberUsers;
    document.querySelector("#number-users-admin").innerHTML = numberAdmin;

  }
}