import { MainPage } from './src/pages/mainPage/index'
import { RegistrationPage } from './src/pages/registration/index'
import { ProfilePage } from './src/pages/profile/index'
import { ChangePasswordPage } from './src/pages/profile/changePassword'
import { ChatsPage } from './src/pages/chats/index'
import { ErrorPage } from './src/pages/error/index'

const mainPage = new MainPage({
    title: 'Вход'
})

const registrationPage = new RegistrationPage({
    title: 'Регистрация'
})

const profilePage = new ProfilePage({
    name: 'Иван'
})

const changePasswordPage = new ChangePasswordPage({
    name: 'Иван'
})

const chatsPage = new ChatsPage({
})

const errorPage = new ErrorPage({
    number: '500',
    text: 'Скоро будет работать',
    link: 'chats',
})


document.addEventListener('DOMContentLoaded', () => {  
    const root = document.querySelector('#app')
    let template: HTMLElement 
    

    switch(window.location.pathname) {
        case '/': 
            template = mainPage.getContent()!
            break
        case '/chats': 
            template = chatsPage.getContent()!
            break
        case '/registration': 
            template = registrationPage.getContent()!
            break
        case '/profile': 
            template = profilePage.getContent()!
            break
        case '/error': 
            template = errorPage.getContent()!
            break
        case '/profile/changePassword': 
            template = changePasswordPage.getContent()!
            break
    }

    if (root !== null) {
        root.append(template!)
    }
    
})
