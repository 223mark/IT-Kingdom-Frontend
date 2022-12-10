<template>
    <div class="toast-wrapper">
        <div class=" bg-primary  text-center rounded-1 px-3 py-2">
            <p class=" h6 text-white "> Added to Cart </p>
        </div>
    </div>

</template>

<script>
export default {
    name: "AddCartAlert",
    data() {
        return {
           
        }
    },
}
</script>

<style  scoped>
.toast-wrapper {
    position: fixed;
    top: 200px;
    left: 0px;
}
</style>
