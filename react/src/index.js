import './index.less'
import dva from 'dva'
import createLoading from 'dva-loading'

import fetch from 'dva/fetch'
import AppModel from './models/app'

// 1. Initialize
const app = dva()

// 2. Plugins
app.use(createLoading({effects: true}))

// 3. Model
//app.model(require('./models/example'))
app.model(require('./models/app'))
app.model(require('./models/article'))
app.model(require('./models/keyword'))
app.model(require('./models/media'))
app.model(require('./models/archive'))

// 4. Router
app.router(require('./router'))

// 5. Start
app.start('#root')
