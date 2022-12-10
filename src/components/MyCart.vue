<template>
    <div class="">
        <HeaderConpo></HeaderConpo>
        <div class="container mt-4 " style="padding:90px 0px">
            <div class="row">
                <div class="col">
                    <table class="table mt-3">
                        <thead>
                            <tr class="text-center bg-dark text-white">
                                <th scope="col">Products</th>
                                <th scope="col">Image</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total</th>
                                <th scope="col">Order</th>
                                <th scope="col">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-muted text-center" v-if="(myCart.length == 0)">
                                <th colspan="7" class="pt-4">
                                    <h5>There is no <span class="text-danger">item</span> in your cart</h5>
                                </th>
                            </tr>
                            <tr class="text-center" v-for="(myCart) in myCart" :key="myCart.id">
                                <th scope="row">{{ myCart.product_name }}</th>
                                <td class="col-2" style="height:70px">
                                    <img :src="myCart.image" class=" img-thumbnail w-75 h-100">
                                </td>
                                <td>{{ myCart.price }} Kyats</td>
                                <td class="col-2 ">
                                    <input type="number" class="form-control w-75 h-50" v-model="myCart.quantity"
                                        @change="getTotal(myCart.price, myCart.quantity, myCart.id)">
                                </td>
                                <td class="col-2">{{ myCart.total }} Kyats</td>
                                <td>
                                    <button class="btn btn-sm btn-success" @click="cartAddOrder(myCart.id)">Order</button>
                                </td>
                                <td>
                                    <button class="btn btn-sm btn-danger"
                                        @click="(deleteCart(myCart.id), removeItem(myCart.id))">X</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <transition name="order-toast">
                <OrderAlert v-if="orderStatus"></OrderAlert>
            </transition>
            <transition name="delete-toast">
                <DeleteAlert v-if="deleteAlert"></DeleteAlert>
            </transition>
        </div>
    </div>
</template>

<script >
import axios from 'axios'
//import axios from 'axios'
import {  mapActions, mapGetters } from 'vuex'
import HeaderConpo from '../views/HomePage/HomeConponents/HeaderConpo.vue'
import OrderAlert from '../components/AlertMessages/AddOrderAlert.vue'
import DeleteAlert from '../components/AlertMessages/DeleteAlert.vue'
import { onUpdated } from '@vue/runtime-core'
export default {
    name: 'MyCart',
    components: {
        HeaderConpo,
        OrderAlert,
        DeleteAlert
    },

    data() {
        return {
            myCart: [],
            orderStatus: false,
            deleteAlert: false,
        }
    },
    computed: {
        ...mapGetters(["getCartData"]),
        cartData() {
            return this.getCartData;
        },
    },
    methods: {
        ...mapActions(["cartDelete", "orderedItem", "getCart"]),
        //remove items from vuex cart
         removeItem(id) {
             const filteredCart = this.myCart.filter((x => x.id != id));
             this.myCart = filteredCart
             console.log(this.myCart,'after remove');
         },
         getTotal(price, quantity,id) {
             let arr = this.myCart
             let filteredCart = arr.filter((x => x.id == id));
             filteredCart[0].total = filteredCart[0].price * filteredCart[0].quantity         
        },
        gettingCart() {
            let localStorageData = localStorage.getItem('userData');
            if (localStorageData != null) {

                let data = localStorage.getItem("userData");
                let datafromlocal = JSON.parse(data);
                let id = datafromlocal.id;
                let userId = {
                    userId: id
                };
                this.getCart(userId)   
            }
                
        },
        gotCart() { 
             this.myCart = this.cartData
        },
         
        cartAddOrder(id) {
            this.orderStatus = true;
            setTimeout(() => {
                this.orderStatus = false
            }, 2000);
            let order = this.myCart.filter((x => x.id == id));
            console.log(order, 'orderhere');
            this.orderedItem(order[0])
        },
        async  deleteCart(id) {
            this.deleteAlert = true;
            setTimeout(() => {
                this.deleteAlert =false
            }, 2000);
            localStorage.getItem('userData');
            let data = localStorage.getItem("userData");
            let datafromlocal = JSON.parse(data);
            let user_id = datafromlocal.id;
             //delete cart
            const productId = {
                cartId: id,
                userId: user_id
            }
            await axios.post('http://127.0.0.1:8000/api/delete/cart', productId).then((response) => {
                console.log(response.data.cartData);
                let data = response.data.cartData;
                this.myCart = data;
            })
            
        },

    },
    mounted() {
        console.log(this.getCartData);
        this.myCart = this.cartData;
        this.gettingCart();
        console.log(this.myCart, 'mycart compo');
    }
}
</script>
<style  scoped>
#quantity {
    cursor: pointer;
}
.order-toast-enter-from,
.delete-toast-enter-from {
    opacity: 0;
    transform: translateX(-150px);
}

.order-toast-enter-to,
.delete-toast-enter-to {
    opacity: 1;
    transform: translateX(0);
}

.order-toast-enter-active ,
.delete-toast-enter-active{
    transition: all 0.3s ease;
}


.order-toast-leave-from,
.delete-toast-leave-from {
    opacity: 1;
    transform: translateX(0);
}


.order-toast-leave-to ,
.delete-toast-leave-to{
    opacity: 0;
    transform: translateX(-150px);
}

.order-toast-leave-active,
.delete-toast-leave-active {
    transition: all 0.3s ease;
}
</style>
