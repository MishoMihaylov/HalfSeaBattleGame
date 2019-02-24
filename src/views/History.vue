<template>
  <div>
    <h2>History of the Last Games</h2>
    <div v-if="getGames.length == 0">No games are played yet.</div>
    <div class="game-info" v-else v-for="(game, index) in getGames" :key="index">
      <span>Player Name: {{game.playerName}}</span> |
      <span>Time Played: {{game.timePlayed}}</span> |
      <span>BoatsStatus: {{game.boatStatus}}</span> |
      <span>History: It is saved but not displayed</span>
    </div>
  </div>
</template>
<script>

export default {
  name: "History",
  computed: {
    getGames () {
      return this.$store.state.gamesPlayed.reverse();
    }
  }
};
</script>

<style>
.game-info{
  width: 75vw;
  margin: 0 auto;
  border: 1px solid #4CAF50;
  background-color: white;
}
</style>
