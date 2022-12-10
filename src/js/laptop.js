import axios from 'axios'
import HeaderConponent from '../views/HomePage/HomeConponents/HeaderConpo.vue'
import laptopDetail from '../components/LaptopDetail.vue'
import AddCartAlert from '../components/AlertMessages/AddCartAlert.vue'
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            LaptopData: [],
            laptopBrand: {},
            addCartAlert: false,
            laptopDetail: false,
            searchStatus: false,
            userActive: false,
            laptopId: '',
            myCart: {
                product_id: '',
                user_id: '1',
                product_name: '',
                image: '',
                price: '',
                total: '',
                quantity: '1',
            }

        }
    },
    components: {
        HeaderConponent,
        laptopDetail,
        AddCartAlert

    },
    methods: {
        ...mapActions(['addingCart']),
        toggleDetail() {
            this.laptopDetail = !this.laptopDetail

        },
        setLaptopId(id) {
            this.laptopId = id
        },
        confirmUser() {
            let localStorageData = localStorage.getItem('userData');
            if (localStorageData != null)
                this.userActive = true
        },
        //search
        productSearch(event) {
            this.searchStatus = false;
            const product = this.LaptopData;
            const searchText = event.target.value.toLowerCase();
            // console.log(product, searchText);
            let filteredProduct = product.filter((x => x.model.toLowerCase().includes(searchText)));
            const hasProduct = filteredProduct.length > 0;
            if (filteredProduct.length == 0) {
                this.searchStatus = true;
            }
            if (searchText.length == 0) {
                this.getAllLaptops();
            }
            if (hasProduct) {
                this.searchStatus = false
                this.LaptopData = filteredProduct;

            }


        },
        //for cart
        addtoCart(id) {
            this.addCartAlert = true;
            setTimeout(() => {
                this.addCartAlert = false
            }, 2000);
            let detailId = {
                laptopId: id
            }
            axios.post('http://127.0.0.1:8000/api/laptopDetail/', detailId).then((response) => {
                response.data.laptopDetail.image = "http://localhost:8000/laptopImage/" + response.data.laptopDetail.image;
                let LaptopData = response.data.laptopDetail;
                this.myCart.product_id = LaptopData.laptop_id;
                this.myCart.product_name = LaptopData.model;
                this.myCart.image = LaptopData.image;
                this.myCart.price = LaptopData.price;
                this.myCart.total = LaptopData.price;
                console.log(this.myCart)
                    //this.$store.dispatch("setMyCart", this.myCart);
                this.addingCart(this.myCart);
                console.log(this.$store.state.myCart);
            })

        },
        getCategory() {
            axios.get('http://127.0.0.1:8000/api/laptopBrands').then((response) => {
                this.laptopBrand = response.data.brand;
                console.log(this.laptopBrand)
            })

        },
        getAllLaptops() {
            axios.get('http://127.0.0.1:8000/api/allLaptop').then((response) => {
                for (let i = 0; i < response.data.laptopData.length; i++) {
                    // response.data.laptopData[i].image = "http://localhost:8000/laptopImage/" + response.data.laptopData[i].image;
                    response.data.laptopData[i].image = "http://localhost:8000/laptopImage/" + response.data.laptopData[i].image;
                }
                this.LaptopData = response.data.laptopData;
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
        this.getAllLaptops();
        this.getCategory()
        this.setUserId();
        this.confirmUser();
    }
}