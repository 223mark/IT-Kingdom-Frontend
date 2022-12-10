<template>
    <div class="card " id="cart" style="height:400px">
        <div class="card-header d-flex justify-content-between">
            <h5>Information <h5></h5>
            </h5>
            <button class="btn btn-danger btn-sm" @click="closeBtn" >Close</button>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-lg-4" style="height:240px">
                    <img :src="LaptopDetailData.image" alt="" class=" img-thumbnail w-100 h-100">
                </div>
                <div class="col-lg-8">
                    <div class="row">
                        <div class="col-12">
                            <h4>{{ LaptopDetailData.model }}</h4>
                        </div>
                        <div class="col-12 my-2">
                            <h5 class="bold">{{ LaptopDetailData.brand_name }}</h5>
                        </div>
                        <div class="col-4 my-2">
                            <small><span class="mx-2 text-muted">CPU</span>{{ LaptopDetailData.cpu }}</small>
                        </div>
                        <div class="col-4 my-2">
                            <small><span class="mx-2 text-muted">Selfie Camera</span> {{ LaptopDetailData.selfie_camera }}</small>
                        </div>
                        <div class="col-4 my-2">
                            <small><span class="mx-2 text-muted">Battery</span>{{ LaptopDetailData.battery }}</small>
                        </div>
                      
                        <div class="col-6 my-2">
                            <small><span class="mx-2 text-muted">Color</span>{{ LaptopDetailData.color }} </small>
                        </div>
                        <div class="col-6 my-2">
                            <small class="bold"><span class="mx-2 text-danger">PRICE: </span> {{ LaptopDetailData.price }}
                                Kyats</small>
                        </div>
                        <div class="col-5 mt-2 ">
                            <small>Quality</small>
                            <input type="number" class="form-control mt-2 " v-model="myCart.quantity">
                        </div>
    
                    </div>
                </div>
            </div>
        </div>
        <div class="card-footer">
            <div class="row">
                <div class="col-6 px-4">
                    <button class="btn btn-sm btn-primary w-100" @click="addToCart" >Add to
                        Cart</button>
                </div>
                <div class="col-6 px-4">
                    <button class="btn btn-sm btn-success w-100" @click="addOrder">Order Now</button>
                </div>
            </div>
        </div>
    
    </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';
export default {
    name: 'LaptopDetail',
    data () {
        return {
            LaptopDetailData: {},
            laptopId: this.id,
            myCart: {
                product_id: '',
                user_id: '',
                product_name: '',
                image: '',
                price: '',
                total: '',
                quantity: '',
            },
        }
    },
    props: ['closeBtn', 'id'],
    methods: {
        ...mapActions(['addingCart','orderedItem']),
         getLaptopDetail () {
              let detailId = {
                  laptopId: this.id
              };
             axios.post('http://127.0.0.1:8000/api/laptopDetail/', detailId).then((response) => {
                 response.data.laptopDetail.image = "http://localhost:8000/laptopImage/" + response.data.laptopDetail.image;
                  this.LaptopDetailData= response.data.laptopDetail
                  console.log(response.data.laptopDetail)
             })
           
        },
        addToCart() {
            console.log(this.LaptopDetailData, 'getdetail');
            let productData = this.LaptopDetailData;
            this.myCart.product_id = productData.laptop_id;
            this.myCart.product_name = productData.model;
            this.myCart.image = productData.image;
            this.myCart.price = productData.price;
            this.myCart.total = this.myCart.price * this.myCart.quantity
            let cartData = this.myCart;
            console.log(cartData,'data');
            this.closeBtn();
            this.addingCart(cartData);
        },
        addOrder() {
            let productData = this.LaptopDetailData;
            this.myCart.product_id = productData.laptop_id;
            this.myCart.product_name = productData.model;
            this.myCart.image = productData.image;
            this.myCart.price = productData.price;
            this.myCart.total = this.myCart.price * this.myCart.quantity
            let cartData = this.myCart;
            console.log(cartData, 'data');
            this.closeBtn();
            this.orderedItem(cartData)
        },
        setUserId() {
            let data = localStorage.getItem("userData")
            let datafromlocal = JSON.parse(data);
            this.myCart.user_id = datafromlocal.id;
        }
     },
     mounted () {
         this.getLaptopDetail();
         this.setUserId();
         console.log(this.myCart.user_id);
     }
        
    }
</script>
<style scoped>
#cart {
    position: fixed;
    left : 300px;
    right: 300px;
    top: 200px;
    bottom: 200px;
    margin: auto;
    z-index: 99;
}
</style>

