 class NativeScrollView extends React.Component{
    constructor(...args) {
        super(...args);
        this.state = {
            scrollStatus : 0
        }
    }
    componentDidMount(){
        document.addEventListener('scroll', this.orderScroll.bind(this));

        //浏览器视口高度
        this.windowHeight = document.documentElement.clientHeight ;
    }

    componentDidUpdate(){
        this.state.scrollStatus = 0;
        //内容总高度
        this.scrollHeight = document.body.offsetHeight;
        this.checkup = this.scrollHeight-this.props.updateLine;
        

    }

    orderScroll(ev){

        this.scrollTop = document.body.scrollTop;
        //console.log("滚动区间:"+this.scrollTop+",浏览器视窗:"+this.windowHeight+",滚动触发线:"+this.scrollHeight+","+this.props.updateLine);
        //当清空该滚动视图的数据时,没有数据支撑, 高度为0 , 这时滚动触发点会小于当前的视窗,则满足update方法的触发条件,  
        //需要判断当前如果在最上部则视为不需要进行滚动加载
        if(this.scrollTop!=0){
            if(this.scrollTop+this.windowHeight >= this.checkup){
                if(this.state.scrollStatus == 0){
                    this.props.onDownReresh();
                    this.state.scrollStatus = 1;
                }
            };
        }
        
    }
    render(){


        return (
                <div className={this.props.className}>
                    {this.props.children}
                </div>
        )
    }
}


export default NativeScrollView;
