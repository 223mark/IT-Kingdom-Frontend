<template>
    <div class="toast-wrapper">
        <div class=" bg-danger  text-center rounded-1 pe-3 ps-2 py-2">
            <p class=" h6 text-white ">Deleted Successfully</p>
        </div>
    </div>

</template>

<script>
export default {
    name: "AddOrderAlert",
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
