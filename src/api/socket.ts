import store from "../../utils/Store";
import { State } from "../../utils/Store";
import ChatsController from "../controllers/ChatsController";

export class Socket {
    state: State
    chatId: number 
    token: string | undefined
    userId: number | undefined
    socket: WebSocket

    constructor(id: number, token: string) {
        this.chatId = id
        this.state = store.getState()
        this.userId = this.state.user?.id
        this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${this.userId}/${id}/${token}`)

        this.addListeners()
        setInterval(() => this.socket.send(''), 3000)
    }

    addListeners() {
        this.socket.addEventListener('open', () => {
            console.log('Соединение установлено');
        });
          
        this.socket.addEventListener('close', event => {
            
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
            }
        
            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });
          
        this.socket.addEventListener('message', event => {
            const data = JSON.parse(event.data)
            if (data.content === "Something's wrong. Try again" || data.type === "user connected") return
            

            if (Array.isArray(data)) {
                store.set('activeChatMessages', data)
            } else {
                ChatsController.fetchChats()
                this.getMessages()

                console.log(JSON.parse(event.data))

                if (JSON.parse(event.data).user_id !== store.getState().user?.id) {
                    const unreadMessages = store.getState().unreadMessages
                    if (unreadMessages && unreadMessages[this.chatId as keyof typeof unreadMessages]) {
                        unreadMessages[this.chatId] = unreadMessages[this.chatId as keyof typeof unreadMessages] + 1
                    } 

                    if (unreadMessages && !unreadMessages[this.chatId as keyof typeof unreadMessages]) {
                        unreadMessages[this.chatId] = 1
                    }

                    store.set('unreadMessages', unreadMessages)
                    localStorage.setItem('unreadMessages', JSON.stringify(unreadMessages))
                }
            }
        });
          
        this.socket.addEventListener('error', error => {
            console.log('Ошибка', error);
        });
    }

    sendMessage(message: string) {
        this.socket.send(JSON.stringify({
            content: message, 
            type: 'message'
        }))
    }

    getMessages() {
        this.socket.send(JSON.stringify({
            content: '0',
            type: 'get old',
          })); 
    }
   
}
