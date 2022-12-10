<template>
    <div class="">
        <HeaderConponent></HeaderConponent>
        <transition name="udalert">
            <UpdateAlert v-if="updateAlert"></UpdateAlert>
        </transition>
        <transition name="udalert">
            <SuccessAlert v-if="passwordStatus.successStatus"></SuccessAlert>
        </transition>
        <div class="container" style="margin-top:110px">
            <div class="row">
                <div class="col-lg-7 col-md-8 col-sm-12" v-if="!passwrodChange">
                    <div class="card mx-auto">
                        <div class="card-header">
                            <h5 class="text-primary">Account Information</h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col">
                                    <div class="row">
                                        <div class="col-lg-6 col-md-3 col-sm-6">
                                            <div class="mb-2">
                                                <label for="" class="mb-2">Name</label>
                                                <input type="text" class="form-control" :placeholder="userData.user_name"
                                                    v-model="updateData.user_name">
                                                <small class="text-danger mx-1 mt-1" v-if="valName">You Must Fill Your
                                                    Name</small>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-md-3 col-sm-6">
                                            <div class="mb-2">
                                                <label for="" class="mb-2">Email</label>
                                                <input type="text" class="form-control" v-model="updateData.email"
                                                    :placeholder="userData.email">
                                                <small class="text-danger mx-1 mt-1" v-if="valEmail">You Must Fill Your
                                                    Email</small>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-md-3 col-sm-6">
                                            <div class="mb-2">
                                                <label for="" class="mb-2">Phone</label>
                                                <input type="number" class="form-control" :placeholder="userData.phone"
                                                    v-model="updateData.phone">
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-md-3 col-sm-6">
                                            <div class="mb-2" >
                                                <label for="" class="mb-2">Gender</label> 
                                                <select  class=" form-control " name="gender" v-model="updateData.gender">
                                                    <option value="">Choose Gender</option>
                                                    <option  value="male">Male</option>
                                                    <option value="female">Female</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-12 col-md-12 col-sm-12">
                                            <div class="mb-2">
                                                <label for="" class="mb-2">Address</label>
        
                                                <textarea cols="10" rows="3" class="form-control" v-model="updateData.address"
                                                    :placeholder="userData.address"></textarea>
                                                <small class="text-danger mx-1 mt-1" v-if="valAddress">You Must Fill Your
                                                    Address</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer d-flex justify-content-around align-items-center">
                            <button class="btn btn-sm btn-primary w-100 mx-2" @click="changePassword" >Change Password</button>
                            <button class="btn btn-sm btn-success w-100 mx-2" @click="updateUserData" >Update Account
                                </button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-7 col-md-8 col-sm-12" v-if="passwrodChange">
                    <div class="card mx-auto">
                        <div class="card-header">
                            <h5 class="text-primary">Change Password</h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col">
                                    <div class="row">
                                        <div class="col-lg-12 col-md-12 col-sm-12">
                                            <div class="mb-2">
                                                <label for="" class="mb-2">Current Password</label>
                                                <input type="password" class="form-control" v-model="passwordData.current_password"
                                                    >
                                                <small class="text-danger mx-1 mt-1" v-if="validation.currentPassword">You Must Fill Your
                                                    Current Password</small>
                                            </div>
                                        </div>
                                        <div class="col-lg-12 col-md-12 col-sm-12">
                                            <div class="mb-2">
                                                <label for="" class="mb-2">New Password</label>
                                                <input type="password" class="form-control" v-model="passwordData.new_password">
                                                <small class="text-danger mx-1 mt-1" v-if="validation.newPassword">Password must be at least 8</small>
                                                <small class="text-danger mx-1 mt-1" v-if="(passwordStatus.failStatus)">Password does not match! Try again</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer d-flex justify-content-around align-items-center">
                            <button class="btn btn-sm btn-primary w-100 mx-2" @click="change">Change Password</button>
                            <button class="btn btn-sm btn-danger w-100" @click="pswChangeBack">Back</button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-5 col-md-4 col-sm-12 mt-4" id="order-table">
                    <div class="col bg-light">
                        <h5 class="text-success bold">Order History</h5>
                    </div>
                    <hr>
                    <div class="col">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Process</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="text-muted text-center" v-if="myOrder == ''">
                                    <th colspan="7" class="pt-4">
                                        <h5>There is no <span class="text-danger">orders</span> </h5>
                                    </th>
                                </tr>
                                <tr v-for="(order, index) in myOrder" :key="index">
                                    <th scope="row">{{ order.product_name }}</th>
                                    <td>{{ order.price }} Ks</td>
                                    <td>{{ order.total_price }} Ks</td>
                                    <td class="text-center">{{ order.quantity }}</td>
                                    <td>
                                        <span v-if="order.deli_status == null" class="text-warning">Pending</span>
                                        <span class="text-success bold">{{ order.deli_status }}</span>
                                    </td>
                                </tr>
        
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script >
import axios from 'axios'
import HeaderConponent from '../HomePage/HomeConponents/HeaderConpo.vue'
import UpdateAlert from '../../components/AlertMessages/UserAlert.vue';
import SuccessAlert from '../../components/AlertMessages/SuccessAlert.vue'
export default {
    components: {
        HeaderConponent,
        UpdateAlert,
        SuccessAlert
    },
        data () {
        return {
            updateAlert: false,
            passwrodChange: false,
            passwordStatus: {
                failStatus: false,
                successStatus: false
            },
            userData: {
                    'id': '',
                    'user_name': '',
                    'address': '',
                    'phone': '',
                    'email': '',
                    'token': '',
                    //'userStatus': false
                },
            updateData: {
                    'user_id': '',
                    'user_name': '', //can keep orginal value like this 'psh'
                    'email': '',
                    'phone': '',
                    'gender': '',
                    'address': '',
                },
            passwordData: {
                'current_password': '',
                'new_password': ''
            },
            validation: {
                currentPassword: false,
                newPassword : false
            },
            myOrder: {},
            }
        },
    computed: {
        computeduserId () {
            return this.updateData.user_id
        }
    },
    methods: {
         getUserId() {
             this.updateData.user_id = this.userData.id
            //  this.updateData.token = this.userData.token
         },
         updateUserData() {
             const data = this.updateData;
             axios.post('http://127.0.0.1:8000/api/user/update', data).then((response) => {
                 let data = response.data.userData;
                //  localStorage.clear();
                localStorage.setItem("userData", JSON.stringify(data) );
                 this.getUserData();    
                 this.updateAlert = true;
                 setTimeout(() => {
                     this.updateAlert = false;
                 }, 3000);
              }).catch((e) => {
                  console.log(e);
              });  
         },
        getUserData() {
            let data = localStorage.getItem("userData")
            let datafromlocal = JSON.parse(data);
            this.userData.id = datafromlocal.id;
            this.userData.user_name = datafromlocal.name;
            this.userData.phone = datafromlocal.phone;
            this.userData.address = datafromlocal.address;
            this.userData.gender = datafromlocal.gender;
            this.userData.email = datafromlocal.email ;
            this.userData.token = datafromlocal.token ;
            this.userData.userStatus = true;
            //updateuserData
            this.updateData.user_name = datafromlocal.name;
            this.updateData.email = datafromlocal.email;
            this.updateData.address = datafromlocal.address;
            this.updateData.gender = datafromlocal.gender;
            this.updateData.phone = datafromlocal.phone
        },
        getOrderedItems() {
            let user = {
                user_id: this.userData.id
            };
            axios.post('http://127.0.0.1:8000/api/get/order', user).then((response) => {
                //
                this.myOrder = response.data.orderData;

            }).catch((e) => {
                console.log(e);
            })
        },
        changePassword() {
            this.passwrodChange = true;
        },
        //change password
        change() {
            if (this.passwordData.current_password.length == 0) {
                this.validation.currentPassword = true
            } else {
                this.validation.currentPassword = false
            }
            if (this.passwordData.new_password.length < 8) {
                this.validation.newPassword = true
            }else {
                this.validation.newPassword = false
            }
            if (!this.validation.currentPassword && !this.validation.newPassword) {
                //console.log(this.passwordData, id, 'con id');
                let id = this.computeduserId;
                let updatePassword = {
                    'user_id': id,
                    'current_password': this.passwordData.current_password,
                    'new_password': this.passwordData.new_password
                }
                axios.post('http://127.0.0.1:8000/api/user/passwrodChange', updatePassword).then((response) => {
                    console.log(response.data.userData);
                    const checkStatus = response.data.userData;
                    if (checkStatus == false ) {
                        this.passwordStatus.failStatus = true
                        console.log(this.passwordStatus.failStatus);
                    } else {
                        this.passwordStatus.failStatus = false
                    }
                    if (checkStatus == true) {
                        this.passwordStatus.successStatus = true;
                        this.passwordData.current_password = '';
                        this.passwordData.new_password = ''
                        this.passwrodChange = false
                        setTimeout(() => {
                            this.passwordStatus.successStatus = false
                        }, 2000);
                    }
                   
                 })
            }
            
        },
        //password change conponent off
        pswChangeBack() {
            this.passwrodChange= false
        }
    },
    mounted() {
       this.getUserData();
       this.getOrderedItems();
       this.getUserId();     
    }
}
</script>

<style scoped>
.udalert-enter-from {
    opacity: 0;
    transform: translateX(-150px);
}

.udalert-enter-toW {
    opacity: 1;
    transform: translateX(0);
}

.udalert-enter-active {
    transition: all 0.3s ease;
}

.udalert-leave-from {
    opacity: 1;
    transform: translateX(0);
}

.udalert-leave-to {
    opacity: 0;
    transform: translateX(-150px);
}

.udalert-leave-active {
    transition: all 0.3s ease;
}
</style>