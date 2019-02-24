<template>
  <div>
    <div v-if="getGameStatus == 'OnStart'">
        <input v-model="playerName" type="text" placeholder="Enter your name bomber!"/>
        <button class="btn btn-success" @click="startGame">Start to Bomb!</button>
    </div>
    <div v-else-if="getGameStatus == 'Started'">
        <BoardPanel @boardAction="onAction" @boatsStatusChanged="onBoatsStatusChange" :showBoats="cheating"/>
        <SidePanel @cheating="(value) => cheating = value" :lastAction="lastAction" :timePlayed="getTimePlayed" :boatsStatus="boatsStatus"/>
    </div>
    <div v-else-if="getGameStatus == 'Ended'">
        <div>Congratz! You finished the game!</div>
        <div>Time Played: {{getTimePlayed}}</div>
        <button @click="restartGame">New Game</button>
    </div>
  </div>
</template>

<script>
import BoardPanel from "@/components/BoardPanel.vue";
import SidePanel from "@/components/SidePanel.vue";

export default {
  name: "Home",
  components: {
    BoardPanel,
    SidePanel
  },
  data () {
    return {
        playerName: "",
        gameState: "OnStart",
        timer: null,
        secondsPlayed: 0,
        boatsStatus: [],
        lastAction: "Game Started!",
        cheating: false,
        history: []
    }
  },
  methods: {
    restartGame: function () {
        this.timer = null,
        this.secondsPlayed = 0,
        this.boatsStatus = [],
        this.lastAction = "Game Started!",
        this.cheating = false,
        this.history = []

        this.startGame();
    },
    startGame: function () {
        if (this.playerName == "") this.playerName = "Unknown";
        this.gameState = "Started";
        this.timer = setInterval(() => this.secondsPlayed++, 1000);
        this.history.push("Game Started!");
        console.log("Game Started!");
    },
    endGame: function () {
        this.gameState = "Ended";
        clearInterval(this.timer);
        this.history.push("Game Started!");
        console.log("Game Ended!");

        let gameInformation = {};
        gameInformation.playerName = this.playerName;
        gameInformation.timePlayed = this.getTimePlayed;
        gameInformation.boatStatus = this.boatsStatus;
        gameInformation.history = this.history;

        this.$store.commit('saveGame', gameInformation);
    },
    onAction: function (lastAction, position, boatSinking) {
        this.lastAction = `At ${position}: ${lastAction}`;
        this.history.push(`Shot at ${position}: ${lastAction}`);
        console.log(`Shot at ${position}: ${lastAction}`);
        if (boatSinking) {
          this.history.push(`${boatSinking} sinking!`);
          console.log(`${boatSinking} sinking!`);
        }
    },
    onBoatsStatusChange: function (boatsStatus, allDestroyed) {
        this.boatsStatus = boatsStatus;

        if (allDestroyed) {
          this.endGame();
        }
    }
  },
  computed: {
    getTimePlayed: function () {
        let seconds = (this.secondsPlayed % 60) + "";
        let minutes = ((this.secondsPlayed - (this.secondsPlayed % 60)) / 60) + "";

        if(seconds.length == 1) seconds = "0" + seconds;
        if(minutes.length == 1) minutes = "0" + minutes; 

        return minutes + ":" + seconds;
    },
    getGameStatus: function () {
      return this.gameState;
    }
  }
};
</script>
