import Route from "./Route";

class Router {
    private static __instance: Router;
    private routes: Route[] = [];
    private _currentRoute: Route | null = null;
    private currentRoute: Route | null = null;
    private history = window.history;

    constructor(private readonly rootQuery: string) {
      if (Router.__instance) {
        return Router.__instance;
      }
      
      this.routes = [];
      this.history = window.history;
      this._currentRoute = null;
      this.rootQuery = rootQuery
  
      Router.__instance = this;
    }
  
    use(pathname: string, block: any, componentProps: any) {
      const route = new Route(pathname, block, {rootQuery: this.rootQuery, componentProps });
  
      this.routes.push(route);
      // Возврат this — основа паттерна "Builder" («Строитель»)
      return this;
    }
  
    start() {
      // Реагируем на изменения в адресной строке и вызываем перерисовку
      window.onpopstate = event => {
        const target = event.currentTarget as Window;
        this._onRoute(target.location.pathname);
      };
  
      this._onRoute(window.location.pathname);
    }
  
    _onRoute(pathname: string) {
      const route = this.getRoute(pathname);
      if (!route) {
        return;
      }
  
      if (this._currentRoute && this.currentRoute !== route) {
        this._currentRoute.leave();
      }

      this._currentRoute = route
  
      route.render();
      
    }
  
    go(pathname: string) {
      this.history.pushState({}, "", pathname);
      this._onRoute(pathname);
    }

    back() {
      this.history.back();
    }

    forward() {
      this.history.forward();
    }
  
    getRoute(pathname: string) {
      return this.routes.find(route => route.match(pathname));
    }
  }

  export default new Router('#app');
