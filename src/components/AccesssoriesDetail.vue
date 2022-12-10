<template>
    <div class="card " id="cart" style="height:400px">
        <div class="card-header d-flex justify-content-between">
            <h5>Information <h5></h5>
            </h5>
            <button class="btn btn-danger btn-sm" @click="closeBtn()">Close</button>
        </div>
        <div class="card-body">
            <div class="row" >
                <div class="col-lg-4" style="height:240px">
                    <img :src="ProductDetailData.image" alt="" class=" img-thumbnail w-100 h-100">
                </div>
                <div class="col-lg-8">
                    <div class="row">
                        <div class="col-12">
                        <h4>{{ ProductDetailData.product_name }}</h4>
                        </div>
                        <div class="col-12 my-2">
                            <h5 class="bold">{{ ProductDetailData.brand }}</h5>
                        </div>
                        <div class="col-6 my-2">
                            <small><span class="me-2 text-muted">Product</span> {{ ProductDetailData.productType_name }}</small>
                        </div>
                        <div class="col-6 my-2">
                            <small class="bold"><span class="me-2 text-danger">PRICE: </span> {{ ProductDetailData.price }}
                                Kyats</small>
                        </div>
                        <div class="col-12 my-2">
                            <small class="bold"><span class="me-2 text-danger">Description: </span> <span class="text-muted">{{ ProductDetailData.description }}</span>
                                </small>
                        </div>
                        <div class="col-5 mt-2 ">
                            <small>Quantity</small>
                            <input type="number" class="form-control mt-2 " v-model="myCart.quantity">
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="card-footer">
            <div class="row">
                <div class="col-6 px-4">
                    <button class="btn btn-sm btn-primary w-100" @click="addtoCart" >Add to
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
    name: 'AccessoriesDetail',
    data() {
        return {
            ProductDetailData: {},
            productId: this.id,
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
        ...mapActions(['addingCart', 'orderedItem']),
        getProductDetail() {
            console.log(this.id, 'id is');
            let detailId = {
                productId: this.id,   
            };
             axios.post('http://127.0.0.1:8000/api/get/productDetail/', detailId).then((response) => {
                response.data.productDetail.image = "http://localhost:8000/accressoriesImage/" + response.data.productDetail.image;
                let productDetail = response.data.productDetail;
                 this.ProductDetailData = productDetail;
                 console.log(this.ProductDetailData);
            });
        },
        //from detail
        addtoCart() {
            console.log(this.ProductDetailData);
            let productData = this.ProductDetailData;
            this.myCart.product_id = productData.id;
            this.myCart.product_name = productData.product_name;
            this.myCart.image = productData.image;
            this.myCart.price = productData.price;
            this.myCart.total = this.myCart.price * this.myCart.quantity
            let cartData = this.myCart;
            console.log(cartData);
            this.closeBtn();
            this.addingCart(cartData);
        }, 
        addOrder() {
            let productData = this.ProductDetailData;
            this.myCart.product_id = productData.id;
            this.myCart.product_name = productData.product_name;
            this.myCart.image = productData.image;
            this.myCart.price = productData.price;
            this.myCart.total = this.myCart.price * this.myCart.quantity
            let orderData = this.myCart;
            this.closeBtn();
            this.orderedItem(orderData);
        },
        setUserId() {
            let data = localStorage.getItem("userData")
            let datafromlocal = JSON.parse(data);
            this.myCart.user_id = datafromlocal.id;
        }

    },
        mounted() {
            this.getProductDetail();
            this.setUserId();
            console.log(this.myCart.user_id);
        }

    }
</script>
<style scoped>
#cart {
    position: fixed;
    left: 300px;
    right: 300px;
    top: 200px;
    bottom: 200px;
    margin: auto;
    z-index: 99;
}
</style>
