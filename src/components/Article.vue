<template>
    <div class="article">
        <!-- 数据未加载完前显示gif动画 -->
        <div class="loading" v-if="isLoading">
            <img src="../assets/loading.gif" alt="">
        </div>

        <!-- 详情页 -->
        <div v-else>
            <div class="topic_header">
                <div class="topic_title">
                    {{post.title}}
                    <ul>
                        <li>
                            发布于 {{post.create_at | formatDate}}
                        </li>
                        <li>
                            作者 {{post.author.loginname}}
                        </li>
                        <li>
                            {{post.visit_count}} 次浏览
                        </li>
                        <li>
                            来自 {{post | tabFormatter}}
                        </li>
                    </ul>
                    <div v-html="post.content" class="topic_content"></div>
                </div>
            </div>
                    <div id="reply">
                                      <div class="topbar">回复</div>
                        <div v-for="(reply,index) in post.replies" :key="reply.id">

                          <div class="singleReply">
                            <div class="replyUp">
                                <router-link :to="{
                                  name: 'user_info',
                                  params:{
                                    name: reply.author.loginname
                                  }
                                }">
                                    <img :src="reply.author.avatar_url" alt="">
                                </router-link>

                                <router-link :to="{
                                  name: 'user_info',
                                  params:{
                                    name: reply.author.loginname
                                  }
                                }">
                                    <span>{{reply.author.loginname}}</span>
                                </router-link>

                                <!-- 再次添加 -->
                                <router-link :to="{
                                  name: 'user_info',
                                  params:{
                                    name: reply.author.loginname
                                  }
                                }">
                                    <span class="spanColor">{{index + 1}}楼</span>
                                    <span class="spanColor addSpot">{{post.last_reply_at | formatDate}}</span>
                                </router-link>
                               
                                
                                <!-- <span v-if="reply.ups.length > 0" >
                                    {{reply.ups.length}}
                                </span>
                                <span v-else></span> -->
                            </div>
                                          <p v-html="reply.content"></p>
                          </div>

                            
                        </div>
                    </div>

                

          </div>
     </div>
</template>

<script>

export default {
    name:"Article",
    data(){
        return{
            // 是否正在加载
            isLoading: false,
            // 当前详情页所有内容和属性
            post:{

            }
        }
    },
    methods:{
        getArticleData(){
            this.axios.get('https://cnodejs.org/api/v1/topic/' + this.$route.params.id)
            .then(res=>{
                if(res.data.success == true){
                    this.isLoading = false
                    this.post = res.data.data
                }
            })
            .catch(err=>{
            console.log(err)
            })
        }
    },
    beforeMount(){
        this.isLoading = true
        this.getArticleData()
    },
    watch:{
      '$route'(to,from){
        this.getArticleData()
      }
    }

        
    
}
</script>


<style>
    /* 引入外部css时scoped 不生效 */
    /* 引入markdown语法css */
@import url('../assets/markdown-github.css');

/* 标题下方li前的圆点 */
  .article li::before {
      content: "•";
  }

 .topbar {
    padding: 10px;
    background-color: #f6f6f6;
    height: 16px;
    font-size: 14px;
    margin-top: 10px;
  }

  .article:not(:first-child) {
    margin-right: 340px;
    margin-top: 15px;
  }

  #reply, .topic_header {
    background-color: #fff;
  }

  #reply {
    margin-top: 15px;
  }

  #reply img {
    width: 30px;
    height: 30px;
    position: relative;
    bottom: -9px;
  }

  #reply a, #reply span {
    font-size: 13px;
    color: #666;
    text-decoration: none;
  }
  .replySec{
    border-bottom:1px solid #e5e5e5;
    padding:0 10px;
  }

  .loading {
    text-align: center;
    padding-top: 300px;
  }

  .replyUp a:nth-of-type(2) {
    margin-left: 0px;
    display: inline-block;
  }

  .topic_header {
    padding: 10px;
    margin-top:10px
  }

  .topic_title {
    font-size: 20px;
    font-weight: bold;
    padding-top: 8px;
  }

  .topic_header ul {
    list-style: none;
    padding: 0px 0px;
    margin: 6px 0px;
  }

  .topic_header li {
    display: inline-block;
    font-size: 12px;
    color: #838383;
  }

  .topic_content {
    border-top: 1px solid #e5e5e5;
    padding: 0 10px;
  }

  .markdown-text img {
    width: 92% !important;
  }


/* 再次添加 */
  ul {
    font-size: 12px;
    color: #838383;
}
  .singleReply{
    border-top: 1px solid #f0f0f0;
  }
  span{
    font-size: 12px;
    padding-left: 5px;
  }
  .spanColor{
    color: #08c !important;
  }
  .addSpot::before{
    content: "•";
  }
</style>
