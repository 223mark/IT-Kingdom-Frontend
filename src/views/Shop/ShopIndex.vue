<template>
    <div class="">
        <Header />
        <transition name="dtalert">
            <ProductDetail v-if="productDetail" :closeBtn="productDetailStatus" :id="productId" />
        </transition>
        <section id="shopHero" style="margin-top: 80px;">

        </section>
        <div class="container py-4 border-bottm">
            <div class="row">
                <div class="col-lg-4 col-sm-12 col-md-6">
                    <span class="h5">Expore What You Need at One Store</span>
                </div>
                <div class="col-lg-8 col-sm-12 col-md-6 ">
                    <input type="text" placeholder="Search Product and Product Type" class=" w-100 form-control " 
                        @keyup="productSearch"> 
                </div>
                

            </div>
        </div>
        <div class="container pt-4">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12">
                    <div class="row">
                            <h5 class="text-primary px-2">Accessories</h5>
                            <hr>
                            <div class="row ">
                                <div class="col-12 text-center p-5" v-if="searchStatus">
                                    <h4 class="text-muted">There is no Items </h4>
                                </div>
                                <div class="col-lg-3 col-md-4 col-sm-6 mt-3" v-for="(product, index) in accessories"
                                    :key="index">
                                    <div class="card" style="height:300px">
                                        <div class=" hover-zoom" style="height:120px">
                                            <img :src="product.image" class="card-img-top h-100 w-100  px-2 py-1">
                                        </div>
                                        <div class="card-body">
                                            <h6 class="card-title text-primary">{{ product.product_name }}</h6>
                                            <small class="card-text ">
                                                {{ product.description }}
                                            </small>
                                        </div>
                                        <span class="text-primary bold text-center pb-2">{{ product.price }}
                                            Kyats</span>
                                        <div class="card-footer d-flex justify-content-around" v-if="userActive">
                                            <button class="btn btn-sm btn-primary" @click="addtoCart(product.id)">Add to
                                                Cart</button>
                                            <button class="btn btn-sm btn-warning text-white"
                                                @click="(productDetailStatus(), setProductId(product.id))">Quick
                                                View</button>
                                        </div>
                                        <div class="card-footer d-flex justify-content-around" v-else>
                                            <h6 class="text-muted">Please Login First to Shop</h6>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        
                    </div>
                </div>
            </div>
        </div>
        <transition name="cart-toast">
            <AddCartAlert v-if="addCartAlert"></AddCartAlert>
        </transition>
    </div>

</template>

<script src="../../js/shop.js">
</script>
<style scoped>
#shopHero {
    background-image: url('../../../public/img/ep\ banner.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: top 30% right 10%;
    height: 50vh;
}

/* enter classes */
.dtalert-enter-from {
    opacity: 0;
    transform: scale(0.5);
}

.dtalert-enter-to {
    opacity: 1;
    transform: scale(1);
}

.dtalert-enter-active {
    transition: all 0.3s ease-in;
}

.dtalert-leave-to {
    opacity: 0;
    transform: scale(0.5);
}

.dtalert-leave-active {
    transition: all 0.2s ease-out;
}
.cart-toast-enter-from {
    opacity: 0;
    transform: translateX(-150px);
}

.cart-toast-enter-toW {
    opacity: 1;
    transform: translateX(0);
}

.cart-toast-enter-active {
    transition: all 0.3s ease;
}

.cart-toast-leave-from {
    opacity: 1;
    transform: translateX(0);
}

.cart-toast-leave-to {
    opacity: 0;
    transform: translateX(-150px);
}

.cart-toast-leave-active {
    transition: all 0.3s ease;
}
</style>
