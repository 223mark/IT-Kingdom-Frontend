import axios from 'axios'
import { mapActions } from 'vuex'
import Header from '../views/HomePage/HomeConponents/HeaderConpo.vue'
import ProductDetail from '../components/AccesssoriesDetail.vue'
import AddCartAlert from '../components/AlertMessages/AddCartAlert.vue'
export default {
    name: "ShopIndex",
    components: {
        Header,
        ProductDetail,
        AddCartAlert
    },
    data() {
        return {
            productId: '',
            productTypes: {},
            accessories: {},
            productDetail: false,
            addCartAlert: false,
            searchStatus: false,
            userActive: false,
            // productDetail: {},
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
        productDetailStatus() {
            this.productDetail = !this.productDetail
        },
        setProductId(id) {
            this.productId = id
        },
        confirmUser() {
            let localStorageData = localStorage.getItem('userData');
            if (localStorageData != null)
                this.userActive = true
        },
        //search
        productSearch(event) {
            this.searchStatus = false;
            const product = this.accessories;
            const searchText = event.target.value.toLowerCase();
            let filteredProduct = product.filter((x => x.product_name.toLowerCase().includes(searchText) || x.productType_name.toLowerCase().includes(searchText)));
            const hasProduct = filteredProduct.length > 0;
            if (filteredProduct.length == 0) {
                this.searchStatus = true;
            }
            if (searchText.length == 0) {
                this.getAccessories();
            }
            if (!hasProduct) {
                this.searchStatus = true;
                this.accessories = [];
            }
            if (hasProduct) {
                this.searchStatus = false
                this.accessories = filteredProduct;

            }
        },
        //direct
        addtoCart(id) {
            this.addCartAlert = true;
            setTimeout(() => {
                this.addCartAlert = false
            }, 2000);
            let detailId = {
                productId: id
            }
            axios.post('http://127.0.0.1:8000/api/get/productDetail/', detailId).then((response) => {
                response.data.productDetail.image = "http://localhost:8000/accressoriesImage/" + response.data.productDetail.image;
                let productDetail = response.data.productDetail;
                this.myCart.product_id = productDetail.id;
                this.myCart.product_name = productDetail.product_name;
                this.myCart.image = productDetail.image;
                this.myCart.price = productDetail.price;
                this.myCart.total = productDetail.price;
                //this.$store.dispatch("setMyCart", this.myCart);
                this.addingCart(this.myCart);
                console.log('success', this.myCart);
            })

        },
        getProductType() {
            axios.get('http://127.0.0.1:8000/api/get/productType').then((response) => {
                this.productTypes = response.data.productType
                console.log(this.productTypes, 'type');
            })
        },
        getAccessories() {
            axios.get('http://127.0.0.1:8000/api/get/accerrories').then((response) => {
                for (let i = 0; i < response.data.accessories.length; i++) {
                    response.data.accessories[i].image = "http://localhost:8000/accressoriesImage/" + response.data.accessories[i].image

                }
                this.accessories = response.data.accessories
            })
        },
        goPhone() {
            this.$router.push('/phone')
        },
        goLaptop() {
            this.$router.push('/laptop')
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
        this.getProductType();
        this.getAccessories();
        this.setUserId();
        this.confirmUser();
        console.log(this.productTypes);

    }

}