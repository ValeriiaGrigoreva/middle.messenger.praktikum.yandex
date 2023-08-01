import { API } from './api';

export interface ICreateChat {
    title: string,
}

export interface IChat {
    id: number,
    title: string,
    avatar: string,
    unread_count: number,
    token?: string,
    last_message: {
        user: {
            first_name: string,
            second_name: string,
            avatar: string,
            login: string,
            email: string,
            phone: string
        },
        time: string,
        content: string,
    }

}

export interface IAddUsers {
    users: number[],
    chatId: number | undefined,
}

export class ChatsAPI extends API {
    constructor() {
      super('/chats');
    }

    createChat(data: ICreateChat): Promise<unknown> {
        return this.http.post('', {data});
    }

    getChats(): Promise<unknown> {
        return this.http.get('')
    }

    addUsers(data: IAddUsers): Promise<unknown> {
        return this.http.put('/users', {data})
    }

    deleteUsers(data: IAddUsers): Promise<unknown> {
        return this.http.delete('/users', {data})
    }

    getChatToken(data: number) {
        return this.http.post(`/token/${data}`)
    }
}
