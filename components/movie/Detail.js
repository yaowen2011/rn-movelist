import React from 'react'
import {
    View,
    Text,
    Image,
    ActivityIndicator,
    StyleSheet
} from 'react-native'
// 获取路由参数方式  this.props.id
export default class Detail extends React.Component {
    state = {
        movieInfo: {},
        isLoading: true
    }
    componentDidMount() {
        fetch(`https://api.douban.com/v2/movie/subject/${this.props.id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    movieInfo: data,
                    isLoading: false
                })
            })
    }
    render() {
        const { movieInfo, isLoading } = this.state
        if (isLoading) {
            return (
                <ActivityIndicator color="orange" size="large"></ActivityIndicator>
            )
        }
        return (
            <View>
                <Text style={styles.title}>{movieInfo.title}</Text>
                <View style={styles.imgWrap}>
                    <Image style={styles.mainImg} source={{ uri: movieInfo.images.large }} ></Image>
                </View>
                <Text style={{ fontSize: 20, margin: 10}}>主要演员：</Text>
                <View style={{flexDirection: 'row'}}>
                    {
                        // 可以用个函数提取下
                        movieInfo.casts.map(item => (<View key={item.id}>
                            <Image  source={{ uri: item.avatars.small }} style={{
                                width: 56, height: 80
                            }}></Image>   
                            <Text>{item.name}</Text> 
                        </View>))
                    }
                </View>
                <Text style={{ fontSize: 20, margin: 10}}>剧情介绍：</Text>
                <Text>{movieInfo.summary}</Text>
            </View>
        )
        
    }
}

var styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 26
    },
    imgWrap: {
        alignItems: 'center'
    },
    mainImg: {
        width: 175,
        height: 250
    }
})