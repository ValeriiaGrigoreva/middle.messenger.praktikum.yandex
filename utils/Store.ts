import { IUser } from '../src/api/AuthApi';
import { EventBus } from './EventBus';
import { set } from './set';
import { IChat } from '../src/api/ChatsApi';
import { Socket } from '../src/api/socket';

export interface State {
    user?: IUser
    chats?: IChat[]
    activeChat?: IChat,
    activeSocket?: Socket
    activeChatMessages?: {}[],
    sockets?: {id: number, socket: Socket}[]
    unreadMessages?: any,
  }
  
  class Store extends EventBus {
    private state: State = {};
  
    getState() {
      return this.state;
    }
  
    set(path: string, value: unknown) {
      set(this.state, path, value);
  
      this.emit('update', this.state);
    }
  }
  
  const store = new Store();
  
  export function withStore(mapStateToProps: any) {
    return (Component: any) => {
      return class extends Component {
        constructor(props: any) {
          super({ ...props, ...mapStateToProps(store.getState()) });
    
          store.on('update', () => {
            const propsFromState = mapStateToProps(store.getState());
            this.setProps(propsFromState);
          });
        }
      }
    }
  }
  
  export default store;
