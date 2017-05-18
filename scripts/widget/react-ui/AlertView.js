
class AlertView extends React.Component{
    constructor(...args) {
        super(...args);
        this.state = {
            isOpen:false,
            height:0
        }
    }
    componentWillMount(){
        this.state.warpStyle ={
            position:"fixed",
            left:"0px",
            right:"0px",
            bottom:"0px",
            top:"0px",
            zIndex:"999",
            visibility:"hidden"
        }

        this.state.backgroundStyle ={
            position:"absolute",
            left:"0px",
            right:"0px",
            bottom:"0px",
            top:"0px",
            opacity:0,
            backgroundColor:"#000",
            transition:".3s",
        }
    }
    componentDidMount(){
        this.state.height = this.refs.child.offsetHeight;
        
        this.setState({
            alertStyle:{
                width:"100%",
                zIndex:"1000",
                backgroundColor:"#fff",
                visibility:"hidden",

                position:"absolute",
                bottom:"0px",
                left:"0px",
                transition:".3s",
                transform : `translate3d(0,${this.state.height}px,0)`
            }
        })

      
    }
    componentDidUpdate(){
        this.state.height = this.refs.child.offsetHeight;


    }

    clearEvent(event){
        event.preventDefault();
    }
    checkClose(ev){

        //console.log(ev.target.parentNode.parentNode,this.refs.child);
        var target = this.getClass(ev.target,"close");
        while(target){
            if(target == this.refs.child){
                return
            }
            target = this.getClass(target.parentNode,"close");
        }
        this.close();
    }

    getClass(children,className){
        var classAll = children.className.split(" ");
        for(var i=0;i<classAll.length;i++){
            if(classAll[i] == className){
                return false;
            }
        }

        return children;
    }


    open(){
        this.setState({
            isOpen : true
        })
        
        this.refs.warp.style.visibility="visible";
        this.refs.warp.style.opacity = "0.5";
        this.refs.child.style.visibility = "visible";
        this.refs.child.style.transform = "translate3d(0,0px,0)";
        document.addEventListener('touchmove', this.clearEvent,{passive:false});
    }

    close(){
        this.setState({
            isOpen : false
        })
        this.refs.warp.style.visibility="hidden";
        this.refs.warp.style.opacity = "0";
        this.refs.child.style.visibility = "hidden";
        this.refs.child.style.transform = `translate3d(0,${this.state.height}px,0)`;
        document.removeEventListener('touchmove', this.clearEvent,{passive:false});
    }

    render(){

        return (
            <div style={this.state.warpStyle  } >
                <div style={this.state.backgroundStyle} ref="warp" onClick={this.close.bind(this)}>

                </div>
                <div style={this.state.alertStyle} ref="child" onClick={this.checkClose.bind(this)}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}


export default AlertView;
