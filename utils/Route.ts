import {isEqual} from './isEqual'
import { Block } from './Block';

function render(query: string, block: any) {
    const root = document.querySelector(query);
    root?.append(block.getContent())
    return root;
}

export default class Route {
    private _pathname: string
    private _blockClass: any
    private _props: {rootQuery: string, componentProps: {}}
    private _block: Block | null

    constructor(pathname:string, view: typeof Block, props: {rootQuery: string, componentProps: {}}) {
      this._pathname = pathname;
      this._blockClass = view;
      this._block = null;
      this._props = props;
    }
  
    navigate(pathname: string) {
      if (this.match(pathname)) {
        this._pathname = pathname;
        this.render();
      }
    }
  
    leave() {
      if (this._block) {
        const el = this._block.getContent()
        el?.remove()
        this._block = null
      }
    }
  
    match(pathname: any) {
      return isEqual(pathname, this._pathname);
    }

    back() {
        window.history.back();
      }
  
    forward() {
        window.history.forward();
    }
  
    render() {
      if (!this._block) {
        this._block = new this._blockClass({...this._props.componentProps});
        render(this._props.rootQuery, this._block);
        return;
      }
  
      this._block.show();
    }
  } 
