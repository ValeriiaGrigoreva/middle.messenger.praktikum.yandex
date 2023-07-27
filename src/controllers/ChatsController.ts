import { ChatsAPI, ICreateChat } from '../api/ChatsApi';
import store from '../../utils/Store';
import { IAddUsers } from '../api/ChatsApi';
// import router from '../../utils/Router';

class ChatsController {
    private api = new ChatsAPI();

    async createChat(data: ICreateChat) {
        try {
          await this.api.createChat(data);
          this.fetchChats()
    
        } catch (error) {
          console.log(error);
        }
    }

    async fetchChats() {
        try {
            const chats = await this.api.getChats()
            store.on('update', () => {console.log('update')})
            store.set('chats', chats);

        } catch(error) {
            console.log(error)
        }
    }

    async addUsersToChat(data: IAddUsers) {
        try {
            await this.api.addUsers(data)
            this.fetchChats()

        } catch(error) {
            console.log(error)
        }
    }

    async deleteUsersFromChat(data: IAddUsers) {
        try {
            await this.api.deleteUsers(data)
            this.fetchChats()

        } catch(error) {
            console.log(error)
        }
    }

    async getChatToken(data: number) {
        try {
            const result: any = await this.api.getChatToken(data)
            const token = result.token
            return token
        } catch(error) {
            console.log(error)
        }
    }
}

export default new ChatsController();
