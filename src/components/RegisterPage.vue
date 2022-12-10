<template>
    <div class="">
        <Header></Header>
        <div class="container py-5 mx-auto" style="margin-top:80px">
            <div class="row">
                <div class="card w-50 mx-auto">
                    <div class="card-header">
                        <h5 class="text-primary text-center">Create Your Own Account</h5>
                    </div>
                    <div class="card-body">
                        <div class="form-group my-2">
                            <label for="">Name</label>
                            <input type="text" name="" class="form-control mt-2" placeholder="Enter Name" required
                                v-model="userData.name">
                            <small class="text-danger mx-1 mt-1" v-if="valName">Please Fill Name</small>
                        </div>
                        <div class="form-group my-2">
                            <label for="">Email</label>
                            <input type="email" name="" class="form-control mt-2" placeholder="Enter Email"
                                v-model="userData.email">
                            <small class="text-danger mx-1 mt-1" v-if="valEmail">Please Fill Email</small>
                        </div>
                        <div class="form-group my-2">
                            <label for="">Address</label>
                            <textarea cols="10" rows="3" class="form-control" v-model="userData.address"></textarea>
                            <small class="text-danger mx-1 mt-1" v-if="valAddress">Please Fill Your Address</small>
                        </div>
                        <div class="form-group my-2">
                            <label for="">Password</label>
                            <input type="password" class="form-control mt-2" placeholder="Enter Password"
                                v-model="userData.password">
                            <small class="text-danger mx-1 mt-1" v-if="valPassword">Password must be at least 8</small>
                        </div>
                        <!-- <div class="form-group my-2">
                                <label for="">Confirm Password</label>
                                <input type="password"  class="form-control mt-2" placeholder="Enter Confirm Password" v-model.number="userData.confirmPassword">
                            </div> -->
                    </div>
                    <div class="card-footer d-flex justify-content-around py-4 px-2">
                        <button class="btn btn-sm btn-success " @click="validationCheck">Register</button>
                        <div class="d-flex">
                            <small class="me-2">Already have a account?</small>
                            <button class="btn btn-sm bg-primary" @click="loginPage">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script >
import axios from 'axios'
import { mapActions } from 'vuex'
import Header from '../views/HomePage/HomeConponents/HeaderConpo.vue'
export default {
        data () {
        return {   
            valName: false,
            valEmail: false,
            valAddress: false,
            valPassword: false,           
            userData: {
                    name: '',
                    email: '',
                    address: '',
                    role:'user',        
                    password: '',
                    //confirmPassword: ''
                }
            }
    },
    components: {
        Header
    },
    methods: {
        ...mapActions(['register']),
        validationCheck() {
            if (this.userData.name == '') {
                this.valName = true;
                
            } else {
                this.valName = false;

            }
            if (this.userData.email == '') {
                this.valEmail = true;
            } else {
                this.valEmail = false
            }
            if (this.userData.address == '') {
                this.valAddress = true;
            } else {
                this.valAddress = false;
            }
            if (this.userData.password.length < 8 ) {
                this.valPassword = true;
            } else {
                this.valPassword = true;
            }
            if (!this.valName && !this.valEmail && !this.valAddress && !this.valPassword) {
                this.register(this.userData);
                this.$router.push('/shop')
                
            }
        },
        loginPage () {
                this.$router.push('/loginPage')
            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>
