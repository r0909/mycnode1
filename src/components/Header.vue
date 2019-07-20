<template>
  <div class="header" >
    <router-link :to="{name: 'root'}">
      <img src="../assets/cnodejs_light.svg" alt="">
    </router-link>
    
      <ul>
        <li><a href="#">首页</a></li>
        <li><a href="#">新手入门</a></li>
        <li><a href="#">API</a></li>
        <li><a href="#">关于</a></li>
        <li><a href="#">注册</a></li>
        <li><a href="#">登录</a></li>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'Header',
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.header{
  margin:-10px;
  background-color: rgb(68, 68,68);
  height: 52px;
}
img{
  width: 120px;
  margin-left: 69px;
  margin-top: 10px;
}
ul{
    list-style: none;
    float: right;
    margin: 5px 85px;
  }
li{
    display: inline-block;
    padding: 10px 15px;
}
a{
    text-decoration: none;
    color:rgb(204, 204, 204);
    font-size: 13px;
    
}
</style>
