import { UserAPI, IUserChangeData, IUserChangePassword } from '../api/UserApi';
import router from '../../utils/Router';
import AuthController from './AuthController';

class UserController {
    private api = new UserAPI();

    async changeProfile(data: IUserChangeData) {
        try {
          await this.api.changeProfile(data);
          
          await AuthController.fetchUser();
    
          router.go('/settings');
        } catch (error) {
          console.log(error);
        }
    }

    async changePassword(data: IUserChangePassword) {
        try {
          await this.api.changePassword(data);
    
          router.go('/settings');
        } catch (error) {
          console.log(error);
        }
    }

    async changeAvatar(data: FormData) {
      try {
        await this.api.changeAvatar(data);
        await AuthController.fetchUser();
      } catch (error) {
        console.log(error);
      }
    }
}

export default new UserController();
