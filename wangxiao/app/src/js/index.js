import app from './utils/app'
import * as reducer from './reducers/index'
import Container, { config } from './containers/index'
app.init( Container, config,reducer);

