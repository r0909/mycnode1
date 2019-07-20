<template>
    <div class="UserInfo">
        <!-- 数据未加载完前显示gif动画 -->
        <div class="loading" v-if="isLoading">
            <img src="../assets/loading.gif" alt="">
        </div>
        <div class="userInformation" v-else>
            
            <!-- 新加的userHeader -->
            <div class="userHeader">
                <p>
                    <router-link :to="{name: 'root'}">
                        主页 /
                    </router-link>
                </p>
            </div>
            
            <section>
                <img :src="userinfo.avatar_url" alt="">
                <span>{{userinfo.loginname}}</span>
                <p>{{userinfo.score}} 积分</p>
                <p class="time">注册时间{{userinfo.create_at | formatDate}}</p>
            </section>

            <div class="topics">
                <p>最近创建的话题</p>
                <ul>
                    <li v-for="item in userinfo.recent_topics" :key="item.id">
                            <router-link :to="{
                                name:'post_content',
                                params:{
                                    id:item.id
                                }
                                }">

                                <img :src="item.author.avatar_url" alt="">

                                {{item.title}}

                                    <span class="lastReply">{{item.last_reply_at | formatDate}}</span>
                                
                        </router-link>
                    </li>
                </ul>
            </div>

            <div class="replies">
                <p>最近参与的话题</p>
                <ul>
                    <li v-for="item in userinfo.recent_replies" :key="item.id">
                            <router-link :to="{
                                name:'post_content',
                                params:{
                                    id:item.id
                                }
                                }">

                                <img :src="item.author.avatar_url" alt="">

                                {{item.title}}

                                <span class="lastReply">{{item.last_reply_at | formatDate}}</span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>

            

    </div>
    
</template>

<script>

export default {
    name: "UserInfo",
    data(){
        return{
            isLoading: false,
            userinfo:{}
        }
    },

    methods:{
        getData(){
            this.axios.get('https://cnodejs.org/api/v1/user/' + this.$route.params.name)
            .then(res=>{
                //加载成功，去除动画
                this.isLoading = false
                this.userinfo = res.data.data
                
            })
            .catch(err=>{
                console.log(err)
            }) 
        }
    },
    beforeMount(){
        // 数据未加载完前显示gif动画
        this.isLoading = true
        // 在页面加载之前获取数据
        this.getData()
    },
}
</script>


<style scoped>

  .time{
    color: #ababab 
}

  .userInformation {
    background: white;
    width: 75%;
    margin: 10px auto;
  }
  .userInformation section {
    padding: 12px;
  }
  .userInformation img {
    width: 40px;
  }
  .userInformation li {
    list-style:none;
  }
  .userInformation .replies,
  .userInformation .topics {
    font-size: 0.72rem;
    
  }
  .userInformation > div > p {
    padding: 12px 0 12px 12px;
    background-color: rgba(212, 205, 205, 0.17);
    font-size: 14px;
    margin: 0;
  }
  .userInformation > div > ul > li {
    padding: 4px 0 4px 12px;
    white-space: nowrap;
    font-size: 0.72rem;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 30px;
    vertical-align: middle;

    border-top: 1px solid #f0f0f0;
  }
  .userInformation > div > ul > li > a {
    color: #08c;
    text-decoration: none;
    font-size: 16px;

  }


/* 再次添加 */
  section span {
    font-size: 14px;
    padding-left: 5px;
    color: #778087;
  }
  section p {
    font-size: 14px;
  }
  .userHeader{
      margin-top: 30px
  }
  .userHeader a {
      color: #80bd01;
      text-decoration: none;
  }
  ul{
      margin-left: -50px
  }
  .lastReply{
      float: right;
      font-size: 0.8em;
      color: #777;
      
  }
</style>