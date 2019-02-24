<template>
    <div>
        <div class="infobox">Timer: {{timePlayed}}</div>
        <div class="infobox">Log: {{lastAction}}</div>
        <ul>
            <li v-for="(boat, index) in boatsStatus" :key="index">{{boat}}</li>
        </ul>
         <div>
            <button class="btn btn-success" @mousedown="cheatMouseDown" @mouseup="cheatMouseUp">Cheat!</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "SidePanel",
    props: {
        timePlayed: {
            type: String,
            required: true
        },
        lastAction: {
            type: String,
            default: "Game Started!"
        },
        boatsStatus: {
            type: Array,
            required: true
        }
    },
    methods: {
        cheatMouseDown: function () {
            this.$emit('cheating' , true);
        },
        cheatMouseUp: function () {
            this.$emit('cheating' , false);
        }
    }
}
</script>

<style>
.infobox {
    margin: 15px;
}
</style>
