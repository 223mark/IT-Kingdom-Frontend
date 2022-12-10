<template>
  <div class="fixed-top">
    <nav class="navbar navbar-expand-lg bg-light " style="padding: 20px ;">
        <div class="container-fluid">
            <a class="navbar-brand  text-primary" href="#">IT Kingdom</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 ">
                    <li class="nav-item">
                        <a class="nav-link " :class="{ 'header-point': userActive }"
                            aria-current="page" @click="homePage()">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link " :class="{ 'header-point': userActive }" @click="goShop">Shop</a>
                    </li>
                    <li class="nav-item ">
                        <a class="nav-link " :class="{ 'header-point': userActive }" @click="mobilePage()">Mobile Phones</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link " :class="{ 'header-point': userActive }" @click="laptopPage()">Laptops </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link  " :class="{ 'header-point': userActive }" @click="newsPage()">Blog and
                            Articles</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle " role="button" data-bs-toggle="dropdown" aria-expanded="false"
                            :class="{ 'header-point': userActive }">
                            Others
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item">Accessories</a></li>
                            <li><a class="dropdown-item">Our Branches</a></li>
                            <li><a class="dropdown-item" href="#">Our Services</a></li>
                        </ul>
                    </li>
                </ul>
                <div class="d-flex justify-content-center align-items-center">
                    <!-- <button class="btn btn-sm btn-warning text-white" v-if="userActive" @click="goCart()">My Cart<i
                            class="fa-solid fa-cart-shopping mx-2"></i></button> -->
                    <button type="button" class="btn btn-sm btn-warning text-white position-relative" v-if="userActive" @click="goCart()" data-mdb-ripple-unbound="true">
                        My Cart<i class="fa-solid fa-cart-shopping mx-2"></i>
                        <span
                            class="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2">   
                                <span class="visually">{{ cartLength }}</span>
                        </span>
                    </button>
                    <button v-if="userActive" class="btn btn-sm btn-primary   ms-3 me-2" @click="goUserAccount">My Account<i
                            class="fa-solid fa-user mx-2"></i></button>
                    <button class="btn btn-sm btn-outline-danger" v-if="userActive" @dblclick="logout">Logout</button>
                    <button v-else class="btn btn-sm btn-primary mx-2" @click="loginProcess()">Login</button>
    
                </div>
    
            </div>
        </div>
    </nav>
  </div>
</template>

<script >
import {  mapActions, mapGetters } from 'vuex'
// import AboutUs from './AboutUs.vue'

export default {
    name: "HeaderConpo",
    components: {
        // AboutUs,
        
    },
    data () {
        return {
            userActive: false,
            logoutStatus: false,
            activePage: true,
        }
    },
    computed: {
        ...mapGetters(['getCartData']),
        cartLength() {
            return this.getCartData.length
        }
    },
    methods: {
        ...mapActions(["getCart"]),
        confirmUser() {
            let localStorageData = localStorage.getItem('userData');
            if(localStorageData != null)
            this.userActive = true
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
        logout() {
            localStorage.removeItem('userData');
            this.$router.push('/loginPage');
            this.userActive= false;
            this.logoutStatus = true;
        },
        goUserAccount() {
            this.$router.push('/userInfo')
        },
        goCart() {
            this.$router.push('/myCart')
        },
        goShop() {
            this.$router.push('/shop');
          
        },
        homePage() {
            this.$router.push('/');
          
        },
        mobilePage() {
            this.$router.push('/phone')
          ;
        },
        laptopPage() {
            this.$router.push('/laptop');

            
        },
        newsPage() {
            this.$router.push('/news');
          
        },
        loginProcess() {
            this.$router.push('/loginPage')
        }
    },
    mounted() {
        this.confirmUser();
        this.gettingCart();
    }
}
</script>
<style scoped>
.header-point {
    cursor: pointer;
}
.header-point:hover{
    /* transition: 0.1s ease-in; */
    color: red
}
/* enter classes */
.toast-enter-from {
    opacity: 0;
    transform: translateY(-10px);
}
.toast-enter-to {
    opacity: 1;
    transform: translateY(0px);
}
.toast-enter-active {
    /*transition: all 0.1s ease; */
    animation: all 0.5s ease;
}

/* leave classes */
.toast-leave-from {
    opacity: 1;
    transform: translateY(0);
}

.toast-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.toast-leave-active {
    transition: all 0.1s ease;
}
</style>
