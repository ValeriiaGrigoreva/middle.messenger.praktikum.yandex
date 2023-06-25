import Handlebars from 'handlebars'

import button from './src/partials/button/button.tmpl'
import input from './src/partials/input/input.tmpl'
import error from './src/partials/error/error.tmpl'

import mainPage from './src/pages/mainPage/mainPage.tmpl'
import chats from './src/pages/chats.tmpl'
import registration from './src/pages/registration/registration.tmpl'
import profile from './src/pages/profile/profile.tmpl'
import changePassword from './src/pages/profile/changePassword.tmpl'
import errorPage from './src/pages/error/error.tmpl'

Handlebars.registerPartial('button', button)
Handlebars.registerPartial('input', input)
Handlebars.registerPartial('error', error)

const mainPageTemplate = Handlebars.compile(mainPage)
const chatsTemplate = Handlebars.compile(chats)
const registrationTemplate = Handlebars.compile(registration)
const profileTemplate = Handlebars.compile(profile)
const errorTemplate = Handlebars.compile(errorPage)
const changePasswordTemplate = Handlebars.compile(changePassword)


document.addEventListener('DOMContentLoaded', () => {  
    const root = document.querySelector('#app')
    let template

    switch(window.location.pathname) {
        case '/': 
            template = mainPageTemplate()
            break
        case '/chats': 
            template = chatsTemplate()
            break
        case '/registration': 
            template = registrationTemplate()
            break
        case '/profile': 
            template = profileTemplate()
            break
        case '/error': 
            template = errorTemplate()
            break
        case '/profile/changePassword': 
            template = changePasswordTemplate()
            break
    }

    root.innerHTML = template
    
})
