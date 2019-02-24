<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/history">History</router-link>|
      <router-link to="/about">About the Game</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
body {
  margin: 0px;
}
button {
  cursor: pointer;
  background-color: white;
  color: black;
  border: 2px solid #4CAF50;
  min-width: 75px;
  height: 47px;
}
button:hover {
  color: #4CAF50;
}
ul{
  list-style-type: none;
  width: 150px;
  text-align: left;
  margin: 0 auto;
  margin-top: 15px;
  margin-bottom: 15px;
}
input{
  padding: 0px;
  height: 45px;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: url("./assets/background.jpg");
  background-repeat : no-repeat;
  width: 100vw;
  height: 100vh;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
