<template>
    <div class=" position-relative">
        <HeaderConponent></HeaderConponent>
        <transition name="dtalert">
            <PhoneDetail v-if="phoneDetail" :closeBtn="phoneDetailStatus" :id="phoneId"></PhoneDetail>
        </transition>
        <section id="mobileHero" style="padding: 10px 200px;margin-top: 80px;">

        </section>
        <!-- hero end -->
        <!-- shop section  -->
        <div class="container">

            <div class="row">
                <div class="col">
                    <!-- trending  -->

                    <div class="row my-4">
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <h5 class="text-primary bold d-inline">Mobile Phones</h5>
                        </div>
                        <div class="col-lg-8 col-md-6 col-sm-12">
                            <input type="text" class="form-control w-100 d-inline-block" @keyup="productSearch"
                                placeholder="Search Product..">
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-12 text-center p-5" v-if="searchStatus">
                            <h4 class="text-muted">There is no Items </h4>
                        </div>
                        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 mt-3" v-for="(phone) in phoneData"
                            :key="phone.phone_id">
                            <div class="card" style="height:350px">
                                <div class="bg-image hover-zoom" style="height:150px">
                                    <img :src="phone.image" alt="" class="card-img-top h-100 img-fluid px-3 py-2">
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title text-primary">{{ phone.model }}</h5>
                                    <p class="card-text">
                                        Size : {{ phone.screen_size }}" Camera : {{ phone.front_camera }} Cpu : {{
                                                phone.cpu
                                        }}
                                        <span class="text-primary bold pt-1 d-block">{{ phone.price }} Kyats</span>
                                    </p>

                                </div>
                                <div class="card-footer d-flex justify-content-around" v-if="userActive">
                                    <button class="btn btn-sm btn-primary" @click="addtoCart(phone.phone_id)">Add to
                                        Cart</button>
                                    <button class="btn btn-sm btn-success text-white"
                                        @click="(phoneDetailStatus(), setPhoneId(phone.phone_id))">Qucik View</button>
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
        <!-- shop section end -->
        <!-- alert section -->
        <transition name="cart-toast" appear>
            <AddCartAlert v-if="addCartAlert"></AddCartAlert>
        </transition>



        <!-- alert end -->
    </div>
</template>
<script  src="../js/phone.js">
</script>
<style>
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

.cart-toast-enter-to {
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