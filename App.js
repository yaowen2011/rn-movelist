import React, { Component } from 'react'

// 导入路由组件
import { Router, Scene } from 'react-native-router-flux'

// 导入page
import Home from './components/home/Home'
import Movie from './components/movie/Movie'
import MovieDetail from './components/movie/Detail'
import About from './components/about/About'

export default class App extends Component {
    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene key="home" title="首页" component={Home} hideNavBar={true}></Scene>
                    <Scene key="movie" title="电影列表" component={Movie}></Scene>
                    <Scene key="detail" title="电影列表" component={MovieDetail}></Scene>
                    <Scene key="about" title="关于" component={About}></Scene>
                </Scene>
            </Router>
        )
    }
}