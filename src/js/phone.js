import axios from 'axios'
import { mapActions } from 'vuex'
import HeaderConponent from '../views/HomePage/HomeConponents/HeaderConpo.vue'
import PhoneDetail from '../components/PhoneDetail.vue'
import AddCartAlert from '../components/AlertMessages/AddCartAlert.vue'
export default {
    name: "PhonePage",
    components: {
        HeaderConponent,
        PhoneDetail,
        AddCartAlert,
    },
    data() {
        return {
            phoneId: '',
            phoneDetail: false,
            addCartAlert: false,
            orderStatus: false,
            searchStatus: false,
            userActive: false,
            phoneData: [],
            phoneCategory: {},
            myCart: {
                product_id: '',
                user_id: '',
                product_name: '',
                image: '',
                price: '',
                total: '',
                quantity: '1',
            }
        }
    },
    methods: {
        ...mapActions(['addingCart']),
        // activeAlert(alertText) {

        // },
        phoneDetailStatus() {
            this.phoneDetail = !this.phoneDetail
        },
        setPhoneId(id) {
            this.phoneId = id;
        },
        confirmUser() {
            let localStorageData = localStorage.getItem('userData');
            if (localStorageData != null)
                this.userActive = true
        },
        //search
        productSearch(event) {
            this.searchStatus = false;
            const product = this.phoneData;
            const searchText = event.target.value.toLowerCase();
            // console.log(product, searchText);
            let filteredProduct = product.filter((x => x.model.toLowerCase().includes(searchText)));
            const hasProduct = filteredProduct.length > 0;
            if (filteredProduct.length == 0) {
                this.searchStatus = true;
            }
            if (searchText.length == 0) {
                this.getAllPhone();
            }
            if (hasProduct) {
                this.searchStatus = false
                this.phoneData = filteredProduct;

            }


        },
        //for cart
        addtoCart(id) {
            this.addCartAlert = true;
            setTimeout(() => {
                this.addCartAlert = false
            }, 2000);
            let detailId = {
                phoneId: id
            }
            axios.post('http://127.0.0.1:8000/api/phoneDetail/', detailId).then((response) => {
                response.data.phoneData.image = "http://localhost:8000/phoneImage/" + response.data.phoneData.image;
                let phoneData = response.data.phoneData;
                this.myCart.product_id = phoneData.phone_id;
                this.myCart.product_name = phoneData.model;
                this.myCart.image = phoneData.image;
                this.myCart.price = phoneData.price;
                this.myCart.total = phoneData.price;
                //this.$store.dispatch("setMyCart", this.myCart);
                this.addingCart(this.myCart);
                console.log(this.$store.state.myCart);
            })

        },
        getAllPhone() {
            axios.get('http://127.0.0.1:8000/api/allPhone').then((response) => {
                //localhost: public hti hthout
                for (let i = 0; i < response.data.phoneData.length; i++) {
                    response.data.phoneData[i].image = "http://localhost:8000/phoneImage/" + response.data.phoneData[i].image;
                }
                this.phoneData = response.data.phoneData;
            })
        },
        getPhoneCategory() {
            axios.get('http://127.0.0.1:8000/api/phoneCategories').then((response) => {
                this.phoneCategory = response.data.phoneCategory;

            })
        },
        setUserId() {
            let localStorageData = localStorage.getItem('userData');
            if (localStorageData != null) {

                let data = localStorage.getItem("userData")
                let datafromlocal = JSON.parse(data);
                this.myCart.user_id = datafromlocal.id;
            }

        }

    },

    mounted() {
        this.getAllPhone();
        this.getPhoneCategory();
        this.setUserId();
        this.confirmUser();
        console.log(this.myCart.user_id);
        console.log(this.userActive);
    }



}