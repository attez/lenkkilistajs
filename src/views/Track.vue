<template>
    <h1>Reitti {{ track_id }}</h1>
</template>

<script>
export default {
    name: 'Track',
    data() {
        return {
            track_id: this.$route.params.track_id
        }
    }
}
</script>

<style>

</style>
