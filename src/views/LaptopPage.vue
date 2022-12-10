<template>
    <div class="">
        <HeaderConponent></HeaderConponent>
        <transition name="dtalert">
            <laptopDetail v-if="laptopDetail" :id="laptopId" :closeBtn="toggleDetail"></laptopDetail>
        </transition>
        <section id="laptopHero" style="padding: 10px 200px;margin-top: 80px;">
        
        </section>
        <!-- hero end -->
        <!-- shop section  -->
        
        <!-- shop section  -->
        <div class="container">
            <div class="row">
                <!-- <div class="col-2 px-3 ">
                    
                    <div class="row">
                        <div class="col-12 my-4">
                            <h5 class="text-muted ">Mobile Section</h5>
                        </div>
                        <hr>
                        <div class="row my-2 ms-2">
                            <ul class="list-group">
                                <li class="list-group-item d-flex justify-content-between align-items-center"
                                    v-for="(brand, index) in laptopBrand" :key="index">
                                    {{ brand.brand_name }}
                                    <span class="badge badge-primary badge-pill">14</span>
                                </li>
        
                            </ul>
                        </div>
                    </div>
        
                </div> -->
                <div class="col">
                    <!-- trending  -->
                    <div class="row">
                       <div class="row my-4">
                        <div class="col-lg-3 col-md-3 col-sm-12 ">
                            <h5 class="text-primary bold">Laptops</h5>                          
                        </div>
                        <div class="col-lg-9 col-md-9 col-sm-12">
                                <input type="text" class="form-control w-100 d-inline-block" @keyup="productSearch" placeholder="Search Product..">     
                        </div>
                       </div>
                        <hr>
                        <!-- laptop start -->
                        <div class="row">
                            <div class="col text-center p-5" v-if="searchStatus">
                                <h4 class="text-muted">There is no Items </h4>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 mt-3" v-for="(laptop, index) in LaptopData" :key="index">
                                <div class="card">
                                    <div class="bg-image hover-zoom" style="height:150px">
                                        <img :src="laptop.image" alt="" class="card-img-top h-100 w-100 px-3 py-2">
                                    </div>
                                    <div class="card-body">
                                        <h5 class="card-title text-primary">{{ laptop.model }}</h5>
                                        <p class="card-text">
                                            Screen-Size : {{ laptop.screen_size }}" Cpu : {{ laptop.cpu }}
                                            <span class="text-primary bold pt-1 d-block">{{ laptop.price }} Kyats</span>
                                        </p>
        
                                    </div>
                                    <div class="card-footer d-flex justify-content-around" v-if="userActive">
                                        <button class="btn btn-sm btn-primary" @click="addtoCart(laptop.laptop_id)">Add to
                                            Cart</button>
                                        <button class="btn btn-sm btn-dark text-white"
                                            @click="(toggleDetail)(), setLaptopId(laptop.laptop_id)">Quick View</button>
                                    </div>
                                    <div class="card-footer d-flex justify-content-around" v-else>
                                        <h6 class="text-muted">Please Login First to Shop</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- laptop end -->
        
                    </div>
        
                    <!-- trending endd -->
                </div>
            </div>
        </div>
        <!-- shop section end -->
        <!-- transition -->
        <transition name="cart-toast">
            <AddCartAlert v-if="addCartAlert"></AddCartAlert>
        </transition>
    </div>
</template>
<script  src="../js/laptop.js">
</script>
<style scoped>
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