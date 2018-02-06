import React from 'react'

import {
    View,
    Text,
    ActivityIndicator,
    Image,
    FlatList,
    TouchableOpacity
} from 'react-native'

import { Actions } from 'react-native-router-flux'
export default class Movie extends React.Component {
    // 和constructor 作用一致 添加实例属性 this.state = {}
    state = {
        // 交换数据
        isLoading: true,
        // 业务数据
        list: [],
        hasMore : true
    }

    // 关键的指针数据
    // 这个 setState() 是异步的 所以放在state里更新 再取的话 还是旧值
    currPage = 1
    // 判断是否有更多数据

    componentDidMount() {
        this.fetchData()
    }

    render() {
        // UI 状态配置
        if (this.state.isLoading) {
            return (
                <ActivityIndicator color="orange" size="large"></ActivityIndicator>
            )
        }

        return (
            <FlatList 
                data={this.state.list}
                renderItem={ this.renderMovieItem }
                keyExtractor={ item => item.id }
                ItemSeparatorComponent = {() => (<View
                    style={{height: 1, backgroundColor: '#ccc'}}
                ></View>)}

                //距离页面底部的高度
                onEndReachedThreshold={0.3}
                onEndReached={this.getMoreData}

                // 尾部组件
                ListFooterComponent={this._renderFooter}
            >
            </FlatList>
        )
    }

    // 触底加载更多数据
    // 这里定义成  箭头函数  防止this指向问题
    getMoreData = () => {
        // console.warn('触底了')
        
        this.currPage++
        
        this.fetchData()
    }

    // 通用的fetchData
    fetchData() {
        // 没有更多数据 不再请求
        if ( ! this.state.hasMore) return 

        // 找到关键的监听的变量 page
        const start = (this.currPage - 1) * 10
        fetch(`https://api.douban.com/v2/movie/coming_soon?start=${start}&count=10`)
            .then(res => res.json())
            .then(data => {
                if (this.currPage >= Math.ceil(data.total / 10)) {
                    this.setState({
                        hasMore: false
                    })
                }

                const list = data.subjects
                this.setState({
                    isLoading: false,
                    list: [...this.state.list, ...list]
                })
                // console.log(list)
            })
    }

    // 跳转到详情页
    goDetail(id) {
        // 路由跳转 
        Actions.detail({id})
    }

    renderMovieItem({ item }) {
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                    Actions.detail({id: item.id})
                    }}>

                <View style={{flexDirection: 'row', padding: 10}} >
                    <Image 
                        source={{ uri: item.images.small}} 
                        style={{width: 105, height: 150, marginRight: 10}} 
                    />
                    <View style={{justifyContent: 'space-around'}}>
                        <Text>电影名称：{ item.title }</Text>
                        <Text>电影类型：{ item.genres.join(', ')} </Text>
                        <Text>上映年份：{ item.year }</Text>
                        <Text>豆瓣评分：{ item.rating.average }分 </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    _renderFooter = () => {
        if ( ! this.state.hasMore) {
            return (
                <View style={{ alignItems: 'center'}}>
                    <Text>亲，没有更多数据了！</Text>
                </View>
            )
        } 

        return null
    }
}