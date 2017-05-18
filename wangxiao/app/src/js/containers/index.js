import {connect} from 'react-redux';
import * as indexAction from '../actions/index';
export const config = {title: '高顿', isFirst: true};

function matchStateToProps(state) {
    return {
        state: state.indexReducer
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        ...indexAction
    }, dispatch);
}

@connect(matchStateToProps, matchDispatchToProps)
class Index extends React.Component {
    constructor(...props) {
        super(...props);

    }
    componentWillMount() {

    }
    render() {

        return (
                <div >
                    hello world!
                </div>
        )
  
  }

}

export default Index
