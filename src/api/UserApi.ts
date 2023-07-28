import { API } from './api';

export interface IUserChangeData {
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string
}

export interface IUserChangePassword {
    oldPassword: string,
    newPassword: string,
}

export class UserAPI extends API {
    constructor() {
      super('/user');
    }

    changeProfile(data: IUserChangeData): Promise<unknown> {
        return this.http.put('/profile', {data});
    }

    changePassword(data: IUserChangePassword): Promise<unknown> {
        return this.http.put('/password', {data});
    }

    changeAvatar(data: FormData): Promise<unknown> {
        return this.http.put('/profile/avatar', {data});
    }
}
