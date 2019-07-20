<template>
    <div class="authorinfo">
          <!--在数据未返回的时候，显示这个正在加载的gif-->
            <div class="loading" v-if="isLoading">
              <img src="../assets/loading.gif" >
            </div>

    <div v-else>
        <div class="authorsummary">
            <div class="topbar">个人信息</div>
                                <router-link :to="{
                                  name: 'user_info',
                                  params:{
                                    name: userinfo.loginname
                                  }
                                }">
                                    <img :src="userinfo.avatar_url" alt="">
                                </router-link>

                          <router-link :to="{
                                  name: 'user_info',
                                  params:{
                                    name: userinfo.loginname
                                  }
                                }">
                                    {{userinfo.loginname}}
                                </router-link>

                                <div class="score">积分: {{userinfo.score}}</div>

        </div>

        <div class="recent_topics">
            <div class="topbar">作者其它话题</div>
            <ul>
                <li v-for="list in topiclimit" :key="list.id">
                    <router-link :to="{
                        name: 'post_content',
                        params: {
                            id: list.id,
                            name: list.author.loginname
                        }
                    }">
                        {{list.title}}
                    </router-link>
                </li>
            </ul>
        </div>
      </div>     
    </div>
</template>


<script>
export default {
    name: "SlideBar",
    data(){
        return{
            isLoading: false,
            userinfo: {}
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

    // 只显示5条
    computed:{
        topiclimit(){
            if(this.userinfo.recent_topics){
                return this.userinfo.recent_topics.slice(0,5)
            }
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
  .authersummary, .recent_replies, .recent_topics {
    background-color: #fff;
  }
  .authorinfo {
    width: 328px;
    float: right;
    margin-top: 0;
  }
  li{
    padding: 3px 0 ;

/* 过长省略 */
    line-height: 30px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

  }
  .recent_replies ul, .recent_topics ul {
    margin-top: 0px;
    margin-bottom: 0px;
    list-style: none;
    padding-left: 14px;
  }

  ul a {
    font-size: 14px;
    text-decoration: none;
    color: #778087;
  }

  .topbar {
    padding: 10px;
    background-color: #f6f6f6;
    height: 16px;
    font-size: 13px;
    margin-top: 10px;
  }

  img {
    height: 48px;
    width: 48px;
    border-radius: 3px;
    margin: 10px;
  }

  .loginname {
    width: 100px;
    float: right;
    margin-top: 22px;
    margin-right: 159px;
    font-size: 14px;
  }

  .loginname a {
    text-decoration: none;
    color: #778087;
  }

  .authersummary .topbar {
    margin-top: 0px;
  }



/* 再次添加 */
  .authorsummary a {
    text-decoration: none;
    color: #778087;
    display: inline-block;
    vertical-align: middle;
  }
  .score{
    font-size: 14px;
    color: #333;
    padding-left: 10px
  }

</style>
