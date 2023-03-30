function loadCertificates() {
    const xhr = new XMLHttpRequest() // classe responsável por fazer chamadas remotas
    var data = null

    // xhr.open(, )
    xhr.open("GET", "./assets/js/json/list-certificates.json") // Método que "abre" a conexão com os dados
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
            
            addCertificate(data)
            
        }
    }   
}
const addCertificate = (data) => {

    const addCertificate = document.querySelector('div.certificates-conquered'),
    selectYear = document.querySelector('select#select-year'),
    selectTech = document.querySelector('select#select-tech'),
    latest = document.querySelector('input#latest'),
    oldest = document.querySelector('input#oldest')
    console.log(`===== ${selectTech.value.toUpperCase()} ==== \n\n`)

    if(selectYear.value == 'y-all'){
        if(selectTech.value == 't-all'){
            if(latest.checked){
                addCertificate.innerHTML = ''
                data.sort((varLasest, varOldest) => {
                    if(new Date(varLasest.date) > new Date(varOldest.date)){
                        return -1
                    } else {
                        return true
                    }
                })
                for(let i = 0; i < data.length; i++){
                    let date = data[i].date.split('-')
                    addCertificate.innerHTML +=

                    `<a href="./certificates/${data[i].link}.pdf" target="_blank">
                        <div class="layout-certificate">
                            <img src="./src/image/${data[i].img}" alt="">
                            <div class="text">
                                <h1>${data[i].title.toUpperCase()}</h1>
                                <p title="${data[i].description}">${data[i].description}</p>
                                <h5>${date[1]}/${date[0]}/${date[2]}</h5>
                            </div>
                        </div>
                    </a>`
                
                }
            }
            else if(oldest.checked){
                addCertificate.innerHTML = ''
                data.sort((varLasest, varOldest) => {
                    if(new Date(varLasest.date) < new Date(varOldest.date)){
                        return -1
                    } else {
                        return true
                    }
                })
                for(let i = 0; i < data.length; i++){
                    let date = data[i].date.split('-')
                    addCertificate.innerHTML +=

                    `<a href="./certificates/${data[i].link}.pdf" target="_blank">
                        <div class="layout-certificate">
                            <img src="./src/image/${data[i].img}" alt="">
                            <div class="text">
                                <h1>${data[i].title.toUpperCase()}</h1>
                                <p title="${data[i].description}">${data[i].description}</p>
                                <h5>${date[1]}/${date[0]}/${date[2]}</h5>
                            </div>
                        </div>
                    </a>`
                
                }
            }
            else {addCertificate.innerHTML = ''}
        }
        else{
            if(latest.checked){
                addCertificate.innerHTML = ''
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
                        addCertificate.innerHTML +=

                        `<a href="./certificates/${data[i].link}.pdf" target="_blank">
                            <div class="layout-certificate">
                                <img src="./src/image/${data[i].img}" alt="">
                                <div class="text">
                                    <h1>${data[i].title.toUpperCase()}</h1>
                                    <p title="${data[i].description}">${data[i].description}</p>
                                    <h5>${date[1]}/${date[0]}/${date[2]}</h5>
                                </div>
                            </div>
                        </a>`
                    }
                }
            }
            else if(oldest.checked){
                addCertificate.innerHTML = ''
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
                        addCertificate.innerHTML +=

                        `<a href="./certificates/${data[i].link}.pdf" target="_blank">
                            <div class="layout-certificate">
                                <img src="./src/image/${data[i].img}" alt="">
                                <div class="text">
                                    <h1>${data[i].title.toUpperCase()}</h1>
                                    <p title="${data[i].description}">${data[i].description}</p>
                                    <h5>${date[1]}/${date[0]}/${date[2]}</h5>
                                </div>
                            </div>
                        </a>`
                        }
                }
            }
            else {addCertificate.innerHTML = ''}
        }
    }
    else {
        if(selectTech.value == 't-all'){
            if(latest.checked){
                addCertificate.innerHTML = ''
                data.sort((varLasest, varOldest) => {
                    if(new Date(varLasest.date) > new Date(varOldest.date)){
                        return -1
                    } else {
                        return true
                    }
                })
                for(let i = 0; i < data.length; i++){
                    let date = data[i].date.split('-')
                    console.log(`${date[2]} =? ${selectYear.value}`)
                    var techs = data[i].tech.join('-').toLowerCase().split('-')
                    if(date[2] == selectYear.value){
                        addCertificate.innerHTML +=

                        `<a href="./certificates/${data[i].link}.pdf" target="_blank">
                            <div class="layout-certificate">
                                <img src="./src/image/${data[i].img}" alt="">
                                <div class="text">
                                    <h1>${data[i].title.toUpperCase()}</h1>
                                    <p title="${data[i].description}">${data[i].description}</p>
                                    <h5>${date[1]}/${date[0]}/${date[2]}</h5>
                                </div>
                            </div>
                        </a>`
                        }
                }
            }
            else if(oldest.checked){
                addCertificate.innerHTML = ''
                data.sort((varLasest, varOldest) => {
                    if(new Date(varLasest.date) < new Date(varOldest.date)){
                        return -1
                    } else {
                        return true
                    }
                })
                for(let i = 0; i < data.length; i++){
                    let date = data[i].date.split('-')
                    console.log(`${date[2]} =? ${selectYear.value}`)
                    var techs = data[i].tech.join('-').toLowerCase().split('-')
                    if(date[2] == selectYear.value){
                        addCertificate.innerHTML +=

                        `<a href="./certificates/${data[i].link}.pdf" target="_blank">
                            <div class="layout-certificate">
                                <img src="./src/image/${data[i].img}" alt="">
                                <div class="text">
                                    <h1>${data[i].title.toUpperCase()}</h1>
                                    <p title="${data[i].description}">${data[i].description}</p>
                                    <h5>${date[1]}/${date[0]}/${date[2]}</h5>
                                </div>
                            </div>
                        </a>`
                        }
                }
            }
            else {addCertificate.innerHTML = ''}
        }
        else{
            if(latest.checked){
                addCertificate.innerHTML = ''
                data.sort((varLasest, varOldest) => {
                    if(new Date(varLasest.date) > new Date(varOldest.date)){
                        return -1
                    } else {
                        return true
                    }
                })
                for(let i = 0; i < data.length; i++){
                    let date = data[i].date.split('-')
                    console.log(`${date[2]} =? ${selectYear.value}`)
                    var techs = data[i].tech.join('-').toLowerCase().split('-')
                    if((techs.includes(selectTech.value)) && (date[2] == selectYear.value)){
                        addCertificate.innerHTML +=

                        `<a href="./certificates/${data[i].link}.pdf" target="_blank">
                            <div class="layout-certificate">
                                <img src="./src/image/${data[i].img}" alt="">
                                <div class="text">
                                    <h1>${data[i].title.toUpperCase()}</h1>
                                    <p title="${data[i].description}">${data[i].description}</p>
                                    <h5>${date[1]}/${date[0]}/${date[2]}</h5>
                                </div>
                            </div>
                        </a>`
                        }
                }
            }
            else if(oldest.checked){
                addCertificate.innerHTML = ''
                data.sort((varLasest, varOldest) => {
                    if(new Date(varLasest.date) < new Date(varOldest.date)){
                        return -1
                    } else {
                        return true
                    }
                })
                for(let i = 0; i < data.length; i++){
                    let date = data[i].date.split('-')
                    console.log(`${date[2]} =? ${selectYear.value}`)
                    var techs = data[i].tech.join('-').toLowerCase().split('-')
                    if((techs.includes(selectTech.value)) && (date[2] == selectYear.value)){
                        addCertificate.innerHTML +=

                        `<a href="./certificates/${data[i].link}.pdf" target="_blank">
                            <div class="layout-certificate">
                                <img src="./src/image/${data[i].img}" alt="">
                                <div class="text">
                                    <h1>${data[i].title.toUpperCase()}</h1>
                                    <p title="${data[i].description}">${data[i].description}</p>
                                    <h5>${date[1]}/${date[0]}/${date[2]}</h5>
                                </div>
                            </div>
                        </a>`
                        }
                }
            }
            else {addCertificate.innerHTML = ''}
        }  
    }
}
loadCertificates()

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
    xhr.open("GET", "./assets/js/json/list-certificates.json") // Método que "abre" a conexão com os dados
    xhr.send(null) // Método que faz a chamada

    xhr.onreadystatechange = () => { // Quando terminar de fazer a requisição vai invocar a função de callback 
        if(xhr.readyState === 4){ // Estado 'positivo'
            data = JSON.parse(xhr.responseText) // transformado dados da API em JSON para um Object JavaScript 
            addCertificate(data)
            
        }
    } 
}

