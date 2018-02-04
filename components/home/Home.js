import React from 'react'
import {
    View, 
    Text,
    StyleSheet
} from 'react-native'

import { Actions } from 'react-native-router-flux'

import Swiper  from 'react-native-swiper'




var styles = StyleSheet.create({
  wrapper: {
      height: 300
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  category: {
      flexDirection: 'row',
      height: 50,
      alignItems: 'center',
      backgroundColor: 'orange'
  },
  item: {
    width: '33.3333%',
    textAlign: 'center',
    fontSize: 24
  }
})

export default class Home extends React.Component {
    render() {
        return (
            <View>

                <View style={styles.wrapper}>

                    <Swiper style={styles.wrapper} showsButtons={true} 
                        autoplay={true}
                        activeDotColor={'orange'}    
                    >
                        <View style={styles.slide1}>
                        <Text style={styles.text}>Hello Swiper</Text>
                        </View>
                        <View style={styles.slide2}>
                        <Text style={styles.text}>Beautiful</Text>
                        </View>
                        <View style={styles.slide3}>
                        <Text style={styles.text}>And simple</Text>
                        </View>
                    </Swiper>
                </View>
                <View style={styles.category}>
                    <Text style={styles.item} >首页</Text>
                    <Text style={styles.item} onPress={Actions.movie}>电影列表</Text>
                    <Text style={styles.item} onPress={Actions.about}>关于</Text>
                </View>
            </View>
        )
    }
}