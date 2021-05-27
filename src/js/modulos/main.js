const abrirMenu = () => {
    document.getElementById("mySidenav").style.width = "250px";
   // document.querySelector(".main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    localStorage.setItem('m','2');
}

const cerrarMenu = () => {
    document.getElementById("mySidenav").style.width = "0";
    //document.querySelector(".main").style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
    localStorage.setItem('m','1');
  }

const botonAbrirMenu = document.querySelector('.botonAbrirMenu');
if(botonAbrirMenu){
    botonAbrirMenu.addEventListener('click', async e=>{ 
        abrirMenu();
    });
}


const botonCerrarMenu = document.querySelector('.botonCerrarMenu');
if(botonCerrarMenu){
    botonCerrarMenu.addEventListener('click', async e=>{ 
        cerrarMenu();
    });
}


const main = document.querySelector('.main');
if(main){
    localStorage.setItem('m','1');
    main.addEventListener('click', async e=>{ 
        
        const valor = localStorage.getItem('m');
        if(valor === '2'){
            cerrarMenu();
        }
    });
}

const dropdown = document.getElementsByClassName("dropdown-btn");
if(dropdown){
    for (let i = 0; i < dropdown.length; i++) {
        dropdown[i].addEventListener("click", function() {
          this.classList.toggle("active");
          var dropdownContent = this.nextElementSibling;
          if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
          } else {
            dropdownContent.style.display = "block";
          }
        });
      }
}

