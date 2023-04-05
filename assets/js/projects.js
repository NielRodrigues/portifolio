function loadProjects() {
    const xhr = new XMLHttpRequest() // classe responsável por fazer chamadas remotas
    var data = null

    // xhr.open(, )
    xhr.open("GET", "./assets/js/json/list-projects.json") // Método que "abre" a conexão com os dados
    xhr.send(null) // Método que faz a chamada

    xhr.onreadystatechange = () => { // Quando terminar de fazer a requisição vai invocar a função de callback
        if(xhr.readyState === 4){ // Estado 'positivo'
            data = JSON.parse(xhr.responseText) // transformado dados da API em JSON para um Object JavaScript

            const selectYear = document.querySelector('select#select-year'),
            selectTech = document.querySelector('select#select-tech')

            selectYear.innerHTML = `<option value="y-all">Todos</option>`
            selectTech.innerHTML = `<option value="t-all">Todas</option>`
            var years = []
            for(let i = 0; i < data.length; i++){

                var date = Number(data[i].date.split('-')[2])

                if(years.includes(date)){
                    continue
                }
                else{
                    years.push(date)
                }

                years.sort((a, b) => {
                    if(a > b){
                        return -1
                    }
                    else {
                        return true
                    }
                })

            }
            for(let yearsLen = 0; yearsLen < years.length; yearsLen++){
                selectYear.innerHTML += `<option value="${years[yearsLen]}">${years[yearsLen]}</option>`
            }
            var techs = []
            for(let i = 0; i < data.length; i++){
                for(let tech_i = 0; tech_i < data[i].tech.length; tech_i++){
                    var technologie = data[i].tech[tech_i].toLowerCase()
                    if(techs.includes(technologie)){
                        continue
                    } else {
                        techs.push(technologie)
                    }
                }
            }
            for(let techLen = 0; techLen < techs.length; techLen++){
                selectTech.innerHTML += `<option value="${techs[techLen].toLowerCase()}">${techs[techLen].toUpperCase()}</option>`
            }

            addProject(data)

        }
    }
}
const addProject = (data) => {

    const addProject = document.querySelector('div.projects'),
    selectYear = document.querySelector('select#select-year'),
    selectTech = document.querySelector('select#select-tech'),
    latest = document.querySelector('input#latest'),
    oldest = document.querySelector('input#oldest')

    if(selectYear.value == 'y-all'){
        if(selectTech.value == 't-all'){
            if(latest.checked){
                addProject.innerHTML = ''
                data.sort((varLasest, varOldest) => {
                    if(new Date(varLasest.date) > new Date(varOldest.date)){
                        return -1
                    } else {
                        return true
                    }
                })
                for(let i = 0; i < data.length; i++){
                    let date = data[i].date.split('-')
                    addProject.innerHTML +=
                    `
                    <a href="./projects/${data[i].title.split(" ").join('-').toLowerCase()}.html">
                        <div class="layout-projects">

                            <div class="img-text">
                                <img src="./src/image/${data[i].img}" alt="iMAGEM DO CURSO ${data[i].title.toUpperCase()}">
                                <h1 title="${data[i].title.toUpperCase()}">${data[i].title.toUpperCase()}</h1>
                                <p>${data[i].description}</p>
                                <h5>${date[1]}/${date[0]}/${date[2]}</h5>
                            </div>
                            <div class="tech" id="course-${data[i].title.split(" ").join('-').toLowerCase()}">

                            </div>
                        </div>
                    </a>`
                for(let tech_l = 0; tech_l < data[i].tech.length; tech_l++){
                    document.querySelector(`div#course-${data[i].title.split(" ").join('-').toLowerCase()}`).innerHTML +=
                    `<img title="${data[i].tech[tech_l].toUpperCase()}" src="./src/image/${data[i].tech[tech_l].split(" ").join('-').toLowerCase()}.svg" alt="">`
                }
                }
            }
            else if(oldest.checked){
                addProject.innerHTML = ''
                data.sort((varLasest, varOldest) => {
                    if(new Date(varLasest.date) < new Date(varOldest.date)){
                        return -1
                    } else {
                        return true
                    }
                })
                for(let i = 0; i < data.length; i++){
                    let date = data[i].date.split('-')
                    addProject.innerHTML +=
                    `
                    <a href="./projects/${data[i].title.split(" ").join('-').toLowerCase()}.html">
                        <div class="layout-projects">

                            <div class="img-text">
                                <img src="./src/image/${data[i].img}" alt="iMAGEM DO CURSO ${data[i].title.toUpperCase()}">
                                <h1 title="${data[i].title.toUpperCase()}">${data[i].title.toUpperCase()}</h1>
                                <p>${data[i].description}</p>
                                <h5>${date[1]}/${date[0]}/${date[2]}</h5>
                            </div>
                            <div class="tech" id="course-${data[i].title.split(" ").join('-').toLowerCase()}">

                            </div>
                        </div>
                    </a>`
                for(let tech_l = 0; tech_l < data[i].tech.length; tech_l++){
                    document.querySelector(`div#course-${data[i].title.split(" ").join('-').toLowerCase()}`).innerHTML +=
                    `<img title="${data[i].tech[tech_l].toUpperCase()}" src="./src/image/${data[i].tech[tech_l].split(" ").join('-').toLowerCase()}.svg" alt="">`
                }
                }
            }
            else {addProject.innerHTML = ''}
        }
        else{
            if(latest.checked){
                addProject.innerHTML = ''
                data.sort((varLasest, varOldest) => {
                    if(new Date(varLasest.date) > new Date(varOldest.date)){
                        return -1
                    } else {
                        return true
                    }
                })
                for(let i = 0; i < data.length; i++){
                    let date = data[i].date.split('-')
                    var techs = data[i].tech.join('-').toLowerCase().split('-')
                    if(techs.includes(selectTech.value)){
                        addProject.innerHTML +=
                        `
                        <a href="./projects/${data[i].title.split(" ").join('-').toLowerCase()}.html">
                            <div class="layout-projects">

                                <div class="img-text">
                                    <img src="./src/image/${data[i].img}" alt="iMAGEM DO CURSO ${data[i].title.toUpperCase()}">
                                    <h1 title="${data[i].title.toUpperCase()}">${data[i].title.toUpperCase()}</h1>
                                    <p>${data[i].description}</p>
                                    <h5>${date[1]}/${date[0]}/${date[2]}</h5>
                                </div>
                                <div class="tech" id="course-${data[i].title.split(" ").join('-').toLowerCase()}">

                                </div>
                            </div>
                        </a>`
                        for(let tech_l = 0; tech_l < data[i].tech.length; tech_l++){
                            document.querySelector(`div#course-${data[i].title.split(" ").join('-').toLowerCase()}`).innerHTML +=
                            `<img title="${data[i].tech[tech_l].toUpperCase()}" src="./src/image/${data[i].tech[tech_l].split(" ").join('-').toLowerCase()}.svg" alt="">`
                        }
                    }
                }
            }
            else if(oldest.checked){
                addProject.innerHTML = ''
                data.sort((varLasest, varOldest) => {
                    if(new Date(varLasest.date) < new Date(varOldest.date)){
                        return -1
                    } else {
                        return true
                    }
                })
                for(let i = 0; i < data.length; i++){
                    let date = data[i].date.split('-')
                    var techs = data[i].tech.join('-').toLowerCase().split('-')
                    if(techs.includes(selectTech.value)){
                        addProject.innerHTML +=
                        `
                        <a href="./projects/${data[i].title.split(" ").join('-').toLowerCase()}.html">
                            <div class="layout-projects">

                                <div class="img-text">
                                    <img src="./src/image/${data[i].img}" alt="iMAGEM DO CURSO ${data[i].title.toUpperCase()}">
                                    <h1 title="${data[i].title.toUpperCase()}">${data[i].title.toUpperCase()}</h1>
                                    <p>${data[i].description}</p>
                                    <h5>${date[1]}/${date[0]}/${date[2]}</h5>
                                </div>
                                <div class="tech" id="course-${data[i].title.split(" ").join('-').toLowerCase()}">

                                </div>
                            </div>
                        </a>`
                        for(let tech_l = 0; tech_l < data[i].tech.length; tech_l++){
                            document.querySelector(`div#course-${data[i].title.split(" ").join('-').toLowerCase()}`).innerHTML +=
                            `<img title="${data[i].tech[tech_l].toUpperCase()}" src="./src/image/${data[i].tech[tech_l].split(" ").join('-').toLowerCase()}.svg" alt="">`
                        }
                    }
                }
            }
            else {addProject.innerHTML = ''}
        }
    }
    else {
        if(selectTech.value == 't-all'){
            if(latest.checked){
                addProject.innerHTML = ''
                data.sort((varLasest, varOldest) => {
                    if(new Date(varLasest.date) > new Date(varOldest.date)){
                        return -1
                    } else {
                        return true
                    }
                })
                for(let i = 0; i < data.length; i++){
                    let date = data[i].date.split('-')
                    var techs = data[i].tech.join('-').toLowerCase().split('-')
                    if(date[2] == selectYear.value){
                        addProject.innerHTML +=
                        `
                        <a href="./projects/${data[i].title.split(" ").join('-').toLowerCase()}.html">
                            <div class="layout-projects">

                                <div class="img-text">
                                    <img src="./src/image/${data[i].img}" alt="iMAGEM DO CURSO ${data[i].title.toUpperCase()}">
                                    <h1 title="${data[i].title.toUpperCase()}">${data[i].title.toUpperCase()}</h1>
                                    <p>${data[i].description}</p>
                                    <h5>${date[1]}/${date[0]}/${date[2]}</h5>
                                </div>
                                <div class="tech" id="course-${data[i].title.split(" ").join('-').toLowerCase()}">

                                </div>
                            </div>
                        </a>`
                        for(let tech_l = 0; tech_l < data[i].tech.length; tech_l++){
                            document.querySelector(`div#course-${data[i].title.split(" ").join('-').toLowerCase()}`).innerHTML +=
                            `<img title="${data[i].tech[tech_l].toUpperCase()}" src="./src/image/${data[i].tech[tech_l].split(" ").join('-').toLowerCase()}.svg" alt="">`
                        }
                    }
                }
            }
            else if(oldest.checked){
                addProject.innerHTML = ''
                data.sort((varLasest, varOldest) => {
                    if(new Date(varLasest.date) < new Date(varOldest.date)){
                        return -1
                    } else {
                        return true
                    }
                })
                for(let i = 0; i < data.length; i++){
                    let date = data[i].date.split('-')
                    var techs = data[i].tech.join('-').toLowerCase().split('-')
                    if(date[2] == selectYear.value){
                        addProject.innerHTML +=
                        `
                        <a href="./projects/${data[i].title.split(" ").join('-').toLowerCase()}.html">
                            <div class="layout-projects">

                                <div class="img-text">
                                    <img src="./src/image/${data[i].img}" alt="iMAGEM DO CURSO ${data[i].title.toUpperCase()}">
                                    <h1 title="${data[i].title.toUpperCase()}">${data[i].title.toUpperCase()}</h1>
                                    <p>${data[i].description}</p>
                                    <h5>${date[1]}/${date[0]}/${date[2]}</h5>
                                </div>
                                <div class="tech" id="course-${data[i].title.split(" ").join('-').toLowerCase()}">

                                </div>
                            </div>
                        </a>`
                        for(let tech_l = 0; tech_l < data[i].tech.length; tech_l++){
                            document.querySelector(`div#course-${data[i].title.split(" ").join('-').toLowerCase()}`).innerHTML +=
                            `<img title="${data[i].tech[tech_l].toUpperCase()}" src="./src/image/${data[i].tech[tech_l].split(" ").join('-').toLowerCase()}.svg" alt="">`
                        }
                    }
                }
            }
            else {addProject.innerHTML = ''}
        }
        else{
            if(latest.checked){
                addProject.innerHTML = ''
                data.sort((varLasest, varOldest) => {
                    if(new Date(varLasest.date) > new Date(varOldest.date)){
                        return -1
                    } else {
                        return true
                    }
                })
                for(let i = 0; i < data.length; i++){
                    let date = data[i].date.split('-')
                    var techs = data[i].tech.join('-').toLowerCase().split('-')
                    if((techs.includes(selectTech.value)) && (date[2] == selectYear.value)){
                        addProject.innerHTML +=
                        `
                        <a href="./projects/${data[i].title.split(" ").join('-').toLowerCase()}.html">
                            <div class="layout-projects">

                                <div class="img-text">
                                    <img src="./src/image/${data[i].img}" alt="iMAGEM DO CURSO ${data[i].title.toUpperCase()}">
                                    <h1 title="${data[i].title.toUpperCase()}">${data[i].title.toUpperCase()}</h1>
                                    <p>${data[i].description}</p>
                                    <h5>${date[1]}/${date[0]}/${date[2]}</h5>
                                </div>
                                <div class="tech" id="course-${data[i].title.split(" ").join('-').toLowerCase()}">

                                </div>
                            </div>
                        </a>`
                        for(let tech_l = 0; tech_l < data[i].tech.length; tech_l++){
                            document.querySelector(`div#course-${data[i].title.split(" ").join('-').toLowerCase()}`).innerHTML +=
                            `<img title="${data[i].tech[tech_l].toUpperCase()}" src="./src/image/${data[i].tech[tech_l].split(" ").join('-').toLowerCase()}.svg" alt="">`
                        }
                    }
                }
            }
            else if(oldest.checked){
                addProject.innerHTML = ''
                data.sort((varLasest, varOldest) => {
                    if(new Date(varLasest.date) < new Date(varOldest.date)){
                        return -1
                    } else {
                        return true
                    }
                })
                for(let i = 0; i < data.length; i++){
                    let date = data[i].date.split('-')
                    var techs = data[i].tech.join('-').toLowerCase().split('-')
                    if((techs.includes(selectTech.value)) && (date[2] == selectYear.value)){
                        addProject.innerHTML +=
                        `
                        <a href="./projects/${data[i].title.split(" ").join('-').toLowerCase()}.html">
                            <div class="layout-projects">

                                <div class="img-text">
                                    <img src="./src/image/${data[i].img}" alt="iMAGEM DO CURSO ${data[i].title.toUpperCase()}">
                                    <h1 title="${data[i].title.toUpperCase()}">${data[i].title.toUpperCase()}</h1>
                                    <p>${data[i].description}</p>
                                    <h5>${date[1]}/${date[0]}/${date[2]}</h5>
                                </div>
                                <div class="tech" id="course-${data[i].title.split(" ").join('-').toLowerCase()}">

                                </div>
                            </div>
                        </a>`
                        for(let tech_l = 0; tech_l < data[i].tech.length; tech_l++){
                            document.querySelector(`div#course-${data[i].title.split(" ").join('-').toLowerCase()}`).innerHTML +=
                            `<img title="${data[i].tech[tech_l].toUpperCase()}" src="./src/image/${data[i].tech[tech_l].split(" ").join('-').toLowerCase()}.svg" alt="">`
                        }
                    }
                }
            }
            else {addProject.innerHTML = ''}
        }
    }
}
loadProjects()

const orderT = document.querySelector('div.order'),
selectYear = document.querySelector('select#select-year'),
selectTech = document.querySelector('select#select-tech')

orderT.addEventListener('change', eventsSelect)

selectYear.addEventListener('change', eventsSelect)
selectTech.addEventListener('change', eventsSelect)

function eventsSelect(){
    const xhr = new XMLHttpRequest() // classe responsável por fazer chamadas remotas
    var data = null

    // xhr.open(, )
    xhr.open("GET", "./assets/js/json/list-projects.json") // Método que "abre" a conexão com os dados
    xhr.send(null) // Método que faz a chamada

    xhr.onreadystatechange = () => { // Quando terminar de fazer a requisição vai invocar a função de callback
        if(xhr.readyState === 4){ // Estado 'positivo'
            data = JSON.parse(xhr.responseText) // transformado dados da API em JSON para um Object JavaScript
            addProject(data)

        }
    }
}
