<template>
    <h1>Reitti {{ workout_id }}</h1>
</template>

<script>
export default {
    name: 'Workout',
    data() {
        return {
            workout_id: this.$route.params.workout_id
        }
    }
}
</script>

<style>

</style>
