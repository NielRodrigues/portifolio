// ============================= MENU HABILITIES ============================= //
function menu_habilities(){
    const input_tecnologies = document.querySelector('input#tecnologies'),
    input_courses = document.querySelector('input#courses'),
    input_certificates = document.querySelector('input#certificates')


    if(window.innerWidth <= '750'){
        var numPercent = 30
    }else{
        var numPercent = 16
    }



    if(input_tecnologies.checked){

        document.querySelector('div.tecnologies').classList.remove('hidden')
        document.querySelector('div.tecnologies').classList.add('show')

        document.querySelector('div.courses').classList.add('hidden')
        document.querySelector('div.courses').classList.remove('show')
        document.querySelector('div.certificates').classList.add('hidden')
        document.querySelector('div.certificates').classList.remove('show')

        document.querySelector('div.l16').style.marginLeft = '0%'
        document.querySelector('div.l32').style.marginLeft = '0%'

    } else if(input_courses.checked){



        document.querySelector('div.courses').classList.remove('hidden')
        document.querySelector('div.courses').classList.add('show')

        document.querySelector('div.tecnologies').classList.add('hidden')
        document.querySelector('div.tecnologies').classList.remove('show')
        document.querySelector('div.certificates').classList.add('hidden')
        document.querySelector('div.certificates').classList.remove('show')


        document.querySelector('div.l16').style.marginLeft = '16%'
        document.querySelector('div.l32').style.marginLeft = '32%'

    } else if(input_certificates.checked){



        document.querySelector('div.certificates').classList.remove('hidden')
        document.querySelector('div.certificates').classList.add('show')

        document.querySelector('div.tecnologies').classList.add('hidden')
        document.querySelector('div.tecnologies').classList.remove('show')
        document.querySelector('div.courses').classList.add('hidden')
        document.querySelector('div.courses').classList.remove('show')

        document.querySelector('div.l16').style.marginLeft = '32%'
        document.querySelector('div.l32').style.marginLeft = '64%'


    } else {

        document.querySelector('div.tecnologies').classList.add('hidden')
        document.querySelector('div.tecnologies').classList.remove('show')
        document.querySelector('div.courses').classList.add('hidden')
        document.querySelector('div.courses').classList.remove('show')
        document.querySelector('div.certificates').classList.add('hidden')
        document.querySelector('div.certificates').classList.remove('show')

        document.querySelector('div.line-purple-menu').style.display = 'none'
    }

}
menu_habilities()

document.querySelector('div.menu-habilities').addEventListener('change', menu_habilities)
// =========================================================================== //


// =============================== TECNOLOGIES =============================== //
const tecnologies_list = ['html5.svg', 'css3.svg', 'javascript.svg', 'typescript.svg', 'react.svg', 'node js.svg', 'bootstrap.svg', 'postgresql.svg', 'sass.svg', 'python.png', 'c sharp.png']

const div_techs = document.querySelector('div.techs'),
link_techs = document.querySelector('p#link-techs')


function see_techs(){
    if(link_techs.textContent.toLowerCase() == 'ver todas'){
        div_techs.innerHTML = ''
        for(let i = 0; i < 8; i++){
            div_techs.innerHTML +=
            `<div class="bg-tech-learned">
                <img title="${tecnologies_list[i].replace('.svg', '').replace('.png', '').toUpperCase()}" src="./src/image/${tecnologies_list[i].split(' ').join('-')}" alt="LOGO ${tecnologies_list[i].replace('.svg', '').replace('.png', '').toUpperCase()}">
            </div>
           `
        }
    }
    else{
        div_techs.innerHTML = ''
        for(let i = 0; i < tecnologies_list.length; i++){
            div_techs.innerHTML +=
            `<div class="bg-tech-learned">
                <img title="${tecnologies_list[i].replace('.svg', '').replace('.png', '').toUpperCase()}" src="./src/image/${tecnologies_list[i].split(' ').join('-')}" alt="LOGO ${tecnologies_list[i].replace('.svg', '').replace('.png', '').toUpperCase()}">
            </div>
           `
        }
    }
}
see_techs()
link_techs.addEventListener('click', () =>{
    if(link_techs.textContent.toLocaleLowerCase() == 'ver todas'){
        link_techs.textContent = 'Ocultar'
        see_techs()
    }
    else if(link_techs.textContent.toLocaleLowerCase() == 'ocultar'){
        link_techs.textContent = 'Ver todas'
        see_techs()
    }
})
// =========================================================================== //




// ===================================== COURSES ====================================== //


function loadCourses(){
    const xhr = new XMLHttpRequest() // classe responsável por fazer chamadas remotas


    // xhr.open(, )
    xhr.open("GET", "./assets/js/json/list-courses.json") // Método que "abre" a conexão com os dados
    xhr.send(null) // Método que faz a chamada

    xhr.onreadystatechange = () => { // Quando terminar de fazer a requisição vai invocar a função de callback
        if(xhr.readyState === 4){ // Estado 'positivo'
            var courses = JSON.parse(xhr.responseText) // transformado dados da API em JSON para um Object JavaScript

            for(let i = 0; i < courses.length; i++){
                document.querySelector('div.owl-carousel').innerHTML +=
                `<div class="item">
                    <a href="./courses/${courses[i].title.split(" ").join('-').toLowerCase()}.html">
                        <div class="layout-courses">

                            <div class="img-text">
                                <img src="./src/image/${courses[i].img}" alt="iMAGEM DO CURSO ${courses[i].title.toUpperCase()}">
                                <h1>${courses[i].title.toUpperCase()}</h1>
                                <p>${courses[i].description}</p>
                            </div>
                            <div class="tech" id="course-${courses[i].title.split(" ").join('-').toLowerCase()}">

                            </div>
                        </div>
                    </a>
                </div>`
                for(let tech_l = 0; tech_l < courses[i].tech.length; tech_l++){
                    document.querySelector(`div#course-${courses[i].title.split(" ").join('-').toLowerCase()}`).innerHTML +=
                    `<img title="${courses[i].tech[tech_l].toUpperCase()}" src="./src/image/${courses[i].tech[tech_l].split(" ").join('-').toLowerCase()}.svg" alt="">`
                }
            }

        }
    }
}

loadCourses()

// =========================================================================== //



// ====================================== CERTIFICATES ===================================== //



function loadCertificates(){
    const xhr = new XMLHttpRequest() // classe responsável por fazer chamadas remotas


    // xhr.open(, )
    xhr.open("GET", "./assets/js/json/list-certificates.json") // Método que "abre" a conexão com os dados
    xhr.send(null) // Método que faz a chamada

    xhr.onreadystatechange = () => { // Quando terminar de fazer a requisição vai invocar a função de callback
        if(xhr.readyState === 4){ // Estado 'positivo'
            var certificates = JSON.parse(xhr.responseText) // transformado dados da API em JSON para um Object JavaScript

            for(let i = 0; i < 6; i++){
                document.querySelector('div.certificates-conquered').innerHTML +=
                `<a href="./certificates/${certificates[i].link}.pdf" target="_blank">
                    <div class="layout-certificate">
                        <img src="./src/image/${certificates[i].img}" alt="">
                        <div class="text">
                            <h1>${certificates[i].title.toUpperCase()}</h1>
                            <p title="${certificates[i].description}">${certificates[i].description}</p>
                        </div>
                    </div>
                </a>
                `
            }

        }
    }
}

loadCertificates()
// ========================================================================================= //



// ====================================== PROJECTS ===================================== //

function loadProjects(){
    const xhr = new XMLHttpRequest() // classe responsável por fazer chamadas remotas


    // xhr.open(, )
    xhr.open("GET", "./assets/js/json/list-projects.json") // Método que "abre" a conexão com os dados
    xhr.send(null) // Método que faz a chamada

    xhr.onreadystatechange = () => { // Quando terminar de fazer a requisição vai invocar a função de callback
        if(xhr.readyState === 4){ // Estado 'positivo'
            var projects = JSON.parse(xhr.responseText) // transformado dados da API em JSON para um Object JavaScript

            for(let i = 0; i < projects.length; i++){
                document.querySelector('div.oc-2').innerHTML +=

                `<div class="item">
                    <a href="./projects/${projects[i].title.split(' ').join('-').toLowerCase()}.html">
                        <div class="layout-project">
                            <div class="img-text">
                                <img src="./src/image/${projects[i].img}" alt="Imagem do Projeto '${projects[i].title}'">
                                <h1>${projects[i].title.toUpperCase()}</h1>
                                <p>${projects[i].description}</p>
                            </div>
                            <div class="tech" id="project-${projects[i].title.split(" ").join('-').toLowerCase()}">

                            </div>
                        </div>
                    </a>
                </div>
                `
                for(let project_tech_l = 0; project_tech_l < projects[i].tech.length; project_tech_l++){
                    document.querySelector(`div#project-${projects[i].title.split(" ").join('-').toLowerCase()}`).innerHTML +=
                    `<img title="${projects[i].tech[project_tech_l].toUpperCase()}" src="./src/image/${projects[i].tech[project_tech_l].split(" ").join('-').toLowerCase()}.svg" alt="">`
                }
            }

        }
    }
}

loadProjects()

// ===================================================================================== //
