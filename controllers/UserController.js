class UserController{

  constructor(formId,tableId){
    this.formEl= document.getElementById(formId)
    this.tableEl= document.getElementById(tableId)

    this.onSubmit()
  }

  onSubmit(){

    this.formEl.addEventListener("submit",event=>{
      event.preventDefault()

      let values = this.getValues()

      this.getPhotos().then((content)=>{
        values.photo = content;
        // console.log('Photo', values.photo)            
        this.addLine(values);
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
  
    [...this.formEl.elements].forEach((item,index)=>{
      if(item.name == "gender"){
        if(item.checked) user[item.name] = item.value      
      }else if(item.name =="admin"){
        user[item.name] = item.checked ? 'SIM' : 'NÃO';
      }else{
        user[item.name] = item.value
      }
    })
  
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

    tr.innerHTML =
      `
        <td><img src=${dataUser.photo} alt="User Image" class="img-circle img-sm"></td>
        <td>${dataUser.name}</td>
        <td>${dataUser.email}</td>
        <td>${dataUser.admin}</td>
        <td>${dataUser.birth}</td>
        <td>
          <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
          <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
        </td>
      `

  this.tableEl.appendChild(tr);
  
  }
}