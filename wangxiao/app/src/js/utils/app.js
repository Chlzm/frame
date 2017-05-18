import Base from 'base'
import ReactDOM from 'react-dom'
import fastclick from 'fastclick'
import {combineReducers} from 'redux'
import creactStore from './store'
import {Provider} from 'react-redux'
import './polyfill'
import './utils-config'

class App extends Base{
    constructor(props) {
        super(props);
        this.hasInit=false;
    }

    init(Container,{isFirst,title},reducers){
        if(this.hasInit)return;
        this.hasInit=true;
        this.store=creactStore(combineReducers(reducers));//创建store
        /*let url=location.href,
            params=this.parse_url(url);*/
        // this.saveAppParam(params);//保存app 参数值
        document.addEventListener('DOMContentLoaded', ()=> {
            fastclick.attach(document.body);
        }, false);

        window.addEventListener('load', ()=> {
            this.bindBack(isFirst);
            //title&&this.setHeader(title);
            if(Container){
                ReactDOM.render(
                    <Provider store={this.store}>
                        <Container></Container>
                    </Provider>
                    ,document.querySelector('.container'));
            }
        }, false);

    }

}

const app= new App();

export default app;

