import { MainPage } from './src/pages/mainPage/index'
import { RegistrationPage } from './src/pages/registration/index'
import { ProfilePage } from './src/pages/profile/index'
import { ChangePasswordPage } from './src/pages/profile/changePassword'
import { ChangeDataPage } from './src/pages/profile/changeData'
import { ChatsPage } from './src/pages/chats/index'
import { ErrorPage } from './src/pages/error/index'
import router from './utils/Router'
import AuthController from './src/controllers/AuthController'
import ChatsController from './src/controllers/ChatsController'
import { Socket } from './src/api/socket'
import store from './utils/Store'

window.addEventListener('DOMContentLoaded', async () => {  
    router.use('/', MainPage, {})
    router.use('/sign-up', RegistrationPage, { title: 'Регистрация' })
    router.use('/settings', ProfilePage, {})
    router.use('/messenger', ChatsPage, { name: 'Иван' })
    router.use('/settings/change-password', ChangePasswordPage, {})
    router.use('/settings/change-data', ChangeDataPage, {})
    router.use('/error', ErrorPage, { 
        number: '500',
        text: 'Скоро будет работать',
        link: 'chats',
    })

    let isProtectedRoute = true;

    switch (window.location.pathname) {
        case '/':
        case '/sign-up':
        isProtectedRoute = false;
        break;
    }

    try {
        await AuthController.fetchUser();
        await ChatsController.fetchChats();


        let sockets: {id: number, socket: Socket}[] = []

        store.getState().chats?.forEach(async (item) => {
          const token = await ChatsController.getChatToken(item.id)
          const socket = new Socket(item.id, token)
          sockets.push({id: item.id, socket})
        })

        store.set('sockets', sockets)
    
        router.start();

        if (!isProtectedRoute) {
          router.go('/messenger');
        }
  
      } catch (e) {
        console.log(e, 'Here')
        router.start();

        if (isProtectedRoute) {
          router.go('/');
        }
  
      }
    
})
