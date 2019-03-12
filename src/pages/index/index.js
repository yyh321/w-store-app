import Taro, { Component } from '@tarojs/taro'
import { View} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtList,AtListItem } from 'taro-ui'
import { add, minus, asyncAdd } from '../../actions/counter'

import './index.scss'


@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {

    config = {
    navigationBarTitleText: '产品列表'
  }
  state = {
    products: []
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  async componentWillMount() {
    const response = await Taro.request({
      url: `${API_WS}/products`
    })
    this.setState({
      products: response.data
    })
    console.log(response)
  }

  render () {
    const { products } = this.state
    return (
      <View className='index'>
        <AtList>
          {
            products.map(product =>
              <AtListItem
                key={product.id}
                arrow='right'
                title={product.name}
                note={'￥'+product.price}
              />
            )
          }
        </AtList>
      </View>
    )
  }
}

export default Index
