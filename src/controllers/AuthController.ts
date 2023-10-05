import { AuthAPI, ISignUpData, ISignInData } from '../api/AuthApi';
import router from '../../utils/Router';
import store from '../../utils/Store'

class AuthController {
    private api = new AuthAPI();

    async signup(data: ISignUpData) {
        try {
          await this.api.signup(data);
          
          await this.fetchUser();
    
          router.go('/messenger');
        } catch (error) {
          console.log(error);
        }
    }

    async signin(data: ISignInData) {
      try {
        await this.api.signin(data);
  
        await this.fetchUser();
  
        router.go('/messenger');
      } catch (error) {
        console.log(error);
      }
    }

    async fetchUser() {
      try {
        const user = await this.api.getUser();

        // store.on('update', () => {console.log('update')})
  
        store.set('user', user);
  
      } catch (error) {
        console.log('userError', error);
        throw error;
      }
    }

    async logout() {
      try {
        await this.api.logout();
  
        store.set('user', undefined);
        store.set('chats', undefined)
  
        router.go('/');
  
      } catch (error) {
        console.log(error);
      }
    }
}

export default new AuthController();
