import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Button, Cell, CellGroup, NavBar, Tabbar, TabbarItem, List, PullRefresh, Toast } from 'vant'
import 'vant/lib/index.css'

const app = createApp(App)

app.use(router)
app.use(Button)
app.use(Cell)
app.use(CellGroup)
app.use(NavBar)
app.use(Tabbar)
app.use(TabbarItem)
app.use(List)
app.use(PullRefresh)
app.use(Toast)

app.mount('#app')
