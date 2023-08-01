import { EventBus } from './EventBus'
import Handlebars from 'handlebars';
import { nanoid } from 'nanoid'

type Meta = {
    tagName: string,
    props: object
}

export class Block<P extends Record<string, any> = any> {
    static EVENTS = {
      INIT: "init",
      FLOW_CDM: "flow:component-did-mount",
      FLOW_CDU: "flow:component-did-update",
      FLOW_RENDER: "flow:render"
    };
    
    public id = 'k' + nanoid(6)
    private _element: HTMLElement | null = null;
    private _meta: Meta
    props: P
    private eventBus: () => EventBus
    public children: Record<string, any>
  
    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor(tagName: string = "div", propsWithChildren: P) {
      const eventBus = new EventBus();

      const {props, children} = this._getPropsAndChildren(propsWithChildren)
      this._meta = {
        tagName,
        props
      };

      this.children = children
  
      this.props = this._makePropsProxy(props);
  
      this.eventBus = () => eventBus;
  
      this._registerEvents(eventBus);
      eventBus.emit(Block.EVENTS.INIT);
    }

    _getPropsAndChildren(propsWithChildren: P) {
        const props: Record<string, unknown> = {}
        const children: Record<string, Block> ={}
        Object.entries(propsWithChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key as string] = value
            } else {
                props[key] = value
            }
        })
        return {props, children}
    }
  
    _registerEvents(eventBus: EventBus) {
      eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
      eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }
  
    _createResources() {
      const { tagName } = this._meta;
      this._element = this._createDocumentElement(tagName);
    }
  
    private _init() {
      this._createResources();

      this.init();
  
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    protected init() {}
  
    _componentDidMount() {
      this.componentDidMount();
    }
  
    componentDidMount() {}
  
    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);

        Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
    }
  
    _componentDidUpdate() {
      const response = this.componentDidUpdate();
      if (!response) {
        return;
      }
      this.init()
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  
    componentDidUpdate() {
      return true;
    }
  
    setProps = (nextProps: any) => {
      if (!nextProps) {
        return;
      }
  
      Object.assign(this.props, nextProps);
    };
  
  
    _render() {
      const block = this.render();
      this._removeEvents()
      this._element!.innerHTML = ''
      this._element!.append(block);
      this._addEvents()
      this._addAttributes()
      this.addOtherListeners()
    }

    protected addOtherListeners() {}

    protected compile(template: string, propsData: any) {
        const propsAndStubs = {...propsData}

        Object.entries(this.children).forEach( ([name, component]) => {
          if (Array.isArray(component)) {
            propsAndStubs[name] = `<div data-id="array_${name}"></div>`
          } else {
            propsAndStubs[name] = `<div data-id=${component.id}></div>`
          }
        })

        const html = Handlebars.compile(template)(propsAndStubs)
        const temp = document.createElement('template')
        temp.innerHTML = html
        
        // eslint-disable-next-line
        Object.entries(this.children).forEach( ([name, component]) => {
          if (Array.isArray(component)) {
            const stub = temp.content.querySelector(`[data-id=array_${name}]`)

            if (!stub) {
              return
            }

            const divContainer = document.createElement('div')

            component.forEach((item) => {
              divContainer.append(item.getContent())
            })

            stub.replaceWith(divContainer)
          } else {
            const stub = temp.content.querySelector(`[data-id=${component.id}]`)

            if (!stub) {
              return
            }

            // component.getContent()?.append
            stub.replaceWith(component.getContent()!)
          }
          
        })
        return temp.content
    }
  
    protected render() {
        return new DocumentFragment()
    }

    _addEvents() {
        let events: object
        if (this.props.events) {
          events = this.props.events

          Object.keys(events).forEach(event => {
            this._element?.addEventListener(event, events[event as keyof typeof events])
          })
        }
    }

    _removeEvents() {
        let events: object
        if (this.props.events) {
          events = this.props.events

          Object.keys(events).forEach(event => {
            this._element?.removeEventListener(event, events[event as keyof typeof events])
          })
        }
    }

    _addAttributes() {
      let attributes: object
        if (this.props.attributes) {
          attributes = this.props.attributes

          Object.keys(attributes).forEach(attribute => {
            this._element?.setAttribute(attribute, attributes[attribute as keyof typeof attributes])
        })
        }
    }
  
    getContent() {
      return this.element;
    }

    get element() {
        return this._element;
      }
  
    _makePropsProxy(props: any) {
      const self = this;
      
      // eslint-disable-next-line
      return new Proxy(props, {
        get(target, prop) {
          const value = target[prop];
          return typeof value === "function" ? value.bind(target) : value;
        },
        set(target, prop, value) {
            const oldTarget = {...target}
          target[prop] = value;
          
          self.eventBus().emit(Block.EVENTS.FLOW_CDU, [oldTarget, target]);
          return true;
        },
        deleteProperty() {
          throw new Error("Нет доступа");
        }
      });
    }
  
    _createDocumentElement(tagName: string) {
      // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
      return document.createElement(tagName);
    }
  
    show() {
      this.getContent()!.style.display = "block";
    }
  
    hide() {
      this.getContent()!.style.display = "none";
    }
  }
