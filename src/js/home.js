import HeaderConponent from '../views/HomePage/HomeConponents/HeaderConpo.vue'
export default {
    name: "HomePage",
    components: {
        HeaderConponent,

    },
    methods: {
        shopBtn() {
            this.$router.push('/shop')
        }
    }
}