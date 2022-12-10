import { createStore } from 'vuex'
import axios from 'axios';
export default createStore({
  state: {
    userData: {
      'id': '',
      'name': '',
      'email': '',
      'address': '',
      'token': '',
      'userStatus': false
    },
    orderedItem: {},
    myCart: {},
  },
  getters: {
    getUserData: state => state.userData,
    getCartData: state => state.myCart,
    getOrderedData: state => state.orderedItem,
  },
  mutations: {
    //user register
    setUser(state, userData) {
      state.userData = userData
    },
    //set cart
    setMyCart(state, productData) {
      state.myCart = productData
      console.log('success', state.myCart);

    },
    //set order
    setOrderedData(state, setOrder) {
      state.orderedItem = setOrder
    }
  },
  actions: {
    async register({ commit }, registerData) {
      // console.log(registerData, 'regi');
      await axios.post('http://127.0.0.1:8000/api/register', registerData).then((response) => {
        console.log(response.data);
        const setData = response.data.userData;
        const userData = this.state.userData;
        userData.id = setData.id;
        userData.name = setData.name;
        userData.email = setData.email;
        userData.address = setData.address;
        userData.token = response.data.token;
        userData.userStatus = true;

        commit('setUser', userData)
        localStorage.setItem('userData', JSON.stringify(userData))


      }).catch((e) => {
        console.log(e);

      });
    },
    //add cart 
    async addingCart({ commit }, cartData) {
      await axios.post('http://127.0.0.1:8000/api/addCart', cartData).then((response) => {
        const productData = response.data.myCart;
        commit('setMyCart', productData)
        console.log(productData, 'data is');
      }).catch((e) => {
        console.log(e);

      })
    },
    //get cart
    async getCart({ commit }, userId) {
      await axios.post('http://127.0.0.1:8000/api/getMyCart', userId).then((response) => {
        const productData = response.data.cart;
        commit('setMyCart', productData);
      })
    },
    //order from cart
    async orderedItem({ commit }, orderData) {
      console.log(orderData, 'direct');
      const res = await axios.post('http://127.0.0.1:8000/api/add/order', orderData);
      const setOrder = res.data.orderedData;
      commit('setOrderedData', setOrder)
      console.log(setOrder, 'sent');

    },
  },

  modules: {
  }
})
