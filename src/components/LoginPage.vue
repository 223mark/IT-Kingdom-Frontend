<template>
  <div class="">
    <Header></Header>
    <div class="container" style="padding: 50px;margin-top: 80px;">
        <div class="row">
            <!-- <div class="">
            <i class="fa-sharp fa-solid fa-square-arrow-left"></i><button class="btn btn-sm btn-success" @click="goHome" >Back</button>
            </div> -->
            <div class="card w-50 mx-auto">
                <div class="card-header">
                    <h4 class="text-primary">Login Information</h4>
                </div>
                <div class="card-body">
                    <div class="form-group my-2">
                        <label for="">Email</label>
                        <input type="email" class="form-control mt-2" placeholder="Enter Email" v-model="userData.email">
                        <small class="text-danger mx-1 mt-1" v-if="notMatchStatus">Not Match Email Please Try
                            Again..</small>
                        <small class="text-danger mx-1 mt-1" v-if="valEmail">Plese Fill Your Email</small>
    
                    </div>
                    <div class="form-group my-2">
                        <label for="">Password</label>
                        <input type="password" v-model="userData.password" class="form-control mt-2"
                            placeholder="Enter Password">
                        <small class="text-danger mx-1 mt-1" v-if="notMatchStatus">Not Match Password!Please Try
                            Again..</small>
                        <small class="text-danger mx-1 mt-1" v-if="valPassword">Please Fill Password</small>
    
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-around py-4 px-2">
                    <button class="btn btn-sm btn-danger " @click="validationCheck">Login</button>
                    <div class="d-flex">
                        <small class="me-2 text-primary">Don't have a account? -></small>
                        <button class="btn btn-sm bg-warning" @click="registerPage">Register</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script >
import axios from 'axios'
import Header from '../views/HomePage/HomeConponents/HeaderConpo.vue'
export default {
    name: "LoginPage",
    data() {
        return {
            notMatchStatus :false,
            valEmail: false,
            valPassword: false,
            userData: {
                email: '',
                password: ''
            },
            userId :''
        }
    },
    components: {
        Header
    },
    methods: {
        validationCheck() {
            if (this.userData.email == '') {
                this.valEmail = true
            } else {
                this.valEmail = false
            }
            if (this.userData.password == '') {
                this.valPassword = true
            } else {
                this.valPassword= false
            }
            if (!this.valEmail && !this.valPassword) {
                this.login(this.userData)
            }
        },
        login(loginData) {
            axios.post('http://127.0.0.1:8000/api/login', loginData).then((response) => {
                console.log(response.data);
                if (response.data == null) {
                    this.notMatchStatus = false
                } else {
                    const userData = response.data.userData;
                    console.log(userData);
                    localStorage.setItem('userData', JSON.stringify(userData));
                    this.$router.push('/shop')
                }
                
            })
        },
        userInfo() {
            this.$router.push('/userInfo/')
        },
        registerPage() {
            this.$router.push('/registerPage')
        },

    }
}   
</script>

