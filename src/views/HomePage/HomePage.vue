<template>
    <div class="">
        <HeaderConponent></HeaderConponent>
        
        <section id="hero" style="padding: 10px 200px;margin-top: 80px;">
            <div class="" style="width:250px ">
                <div class="">
                    <h6>You can get you need</h6>
                    <h5>From your <span class="text-primary">home</span></h5>
                </div>
                <button class="btn btn-outline-warning  mt-4" style="width:150px" @click="shopBtn">Shop</button>
            </div>
        </section>
        <!-- features -->
        <section class="contatiner-fluid " style="padding:50px ">
            <div class="row d-flex justify-content-evenly ">
                <div class="col-2  py-3 d-flex justify-content-center" style="border:1px solid lightgreen;border-radius:5px"
                    id="feacture-box">
                    <div class="">
                        <img src="../../../public/img/features/f1.png" alt="" class="w-100 mb-3" height="100px">
                        <small>Free Shipping</small>
                    </div>
                </div>
                <div class="col-2  py-3 d-flex justify-content-center" style="border:1px solid lightgreen;border-radius:5px"
                    id="feacture-box">
                    <div class="">
                        <img src="../../../public/img/features/f2.png" alt="" class="w-100 mb-3" height="100px">
                        <small>Online Order</small>
                    </div>
                </div>
                <div class="col-2  py-3 d-flex justify-content-center" style="border:1px solid lightgreen;border-radius:5px"
                    id="feacture-box">
                    <div class="">
                        <img src="../../../public/img/features/f4.png" alt="" class="w-100 mb-3" height="100px">
                        <small>Promotions</small>
                    </div>
                </div>
                <div class="col-2  py-3 d-flex justify-content-center" style="border:1px solid lightgreen;border-radius:5px"
                    id="feacture-box">
                    <div class="">
                        <img src="../../../public/img/features/f5.png" alt="" class="w-100 mb-3" height="100px">
                        <small>Review</small>
                    </div>
                </div>
                <div class="col-2  py-3 d-flex justify-content-center" style="border:1px solid lightgreen;border-radius:5px"
                    id="feacture-box">
                    <div class="">
                        <img src="../../../public/img/features/f6.png" alt="" class="w-100 mb-3" height="100px">
                        <small>24/7 Support</small>
                    </div>
                </div>
        
            </div>
        
        </section>
        <!-- features end -->
        <!-- products category -->
        <section class="bg-light" id="category-section">
            <div class="container" style="padding: 50px 10px">
                <div class="row">
                    <div class="col-12 text-center mb-4">
                        <small class="text-danger ">Product Category Collection</small>
                        <h4 class="bold mt-2 ">Explore What You Need!</h4>
                    </div>
        
                    <div class="row">
                        <div class="col-6  ">
                            <div class=" ">
                                <img src="../../../public/img/apple.jpg " alt=" " class="w-100 image" height="300px">
                            </div>
                        </div>
                        <div class="col-6 ">
                            <div class="row ">
                                <div class="col-6 ">
                                    <div class=" ">
                                        <img src="../../../public/img/laptop.png " alt=" " class="w-100 image" height="140px">
                                    </div>
                                </div>
                                <div class="col-6 ">
                                    <div class=" ">
                                        <img src="../../../public/img/earph.png " alt=" " class="w-100 image" height="140px">
                                    </div>
                                </div>
                                <div class="col-12 ">
                                    <div class=" ">
                                        <img src="../../../public/img/newsbanner.jpg" alt=" " class="w-100 image"
                                            height="160px">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- products category end -->
        
        <!-- user review -->
        <!-- user review -->
    </div>
</template>

<script src="../../js/home.js">
</script>