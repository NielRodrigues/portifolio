// ================================ MENU ICON ================================ //
const button_menu = document.querySelector('button#menu-mobile')
button_menu.addEventListener('click', menu)
function menu(){
    
    if (button_menu.classList.value === 'menu-icon'){
        button_menu.classList = 'x-icon'
        document.querySelector('div.bg-menu').style.marginLeft = '0px'
        document.querySelector('nav').style.marginLeft = '0px'
    } else {
        button_menu.classList = 'menu-icon'
        document.querySelector('div.bg-menu').style.marginLeft = '-240px'
        document.querySelector('nav.mobile').style.marginLeft = '-240px'


    }
}
document.querySelector('div.bg-menu').addEventListener('click', () => {

    console.log(window.innerWidth)
    if(window.innerWidth <= '650'){
        button_menu.classList = 'x-icon'
        menu()
    }
})
document.querySelector('nav.mobile').addEventListener('click', () => {
    console.log(window.innerWidth)
    if(window.innerWidth <= '650'){
        button_menu.classList = 'x-icon'
        menu()
    }
})

// =========================================================================== //



