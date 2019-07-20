<template>
    <div class="postList">
        <!-- 数据未加载完前显示gif动画 -->
        <div class="loading" v-if="isLoading">
            <img src="../assets/loading.gif" alt="">
        </div>
        <!-- 帖子列表 -->
        <div class="posts" v-else>
            <ul>
                <!-- 导航 -->
                <li>
                <div class="toobar">
                    <span>全部</span>
                    <span>精华</span>
                    <span>分享</span>
                    <span>问答</span>
                    <span>招聘</span>
                    <span>客户端测试</span>
                </div>
                </li>

                <!-- v-for要加key属性 -->
                <li v-for="post in posts" :key="post.id">
                    <!-- 获取头像,author属性属于cnode的api -->
                    <img :src="post.author.avatar_url" alt="">

                    <!-- 浏览,回复量 -->
                    <span>
                        <span class="reply_count">
                            {{post.reply_count}}/{{post.visit_count}}
                        </span>
                    </span>

                    <!-- 帖子分类 -->
                   <span :class="[{put_good:(post.good  == true),
                                    put_top:(post.top  == true),
                            'topiclist-tab':(post.good  != true && post.top  != true)}]">
                        <span>
                            {{post | tabFormatter}}
                        </span>
                    </span>

                    <!-- 标题 -->
                    <router-link :to="{
                      name: 'post_content',
                      params:{
                        id: post.id,
                        name: post.author.loginname
                      }
                    }">
                      <span class="titleFont">
                          {{post.title}}
                      </span>
                    </router-link>


                    <!-- 最后回复时间 -->
                    <span class="last_reply">
                        {{post.last_reply_at | formatDate}}
                    </span>
                </li>

                            <!-- 分页组件 -->
                            <li>
                              <pagination @handleList="renderList"></pagination>
                            </li>

            </ul>
        </div>    
    </div>
</template>


<script>
// 引入分页组件
import pagination from './Pagination'

export default {
    name: "PostList",
    data(){
        return{
            isLoading: false,
            //页面的列表数组
            posts: [],
            postpage: 1
        }
    },
    components: {
          pagination
    },
    methods:{
        getData(){
            this.axios.get('https://cnodejs.org/api/v1/topics',{
              params:{
                page: this.postpage,
                limit: 20
              }
            })
            .then(res=>{
                //加载成功，去除动画
                this.isLoading = false
                this.posts = res.data.data
                
            })
            .catch(err=>{
              console.log(err)
            })
        },
        renderList(value){
          this.postpage = value
          this.getData()
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
  /* body{
     background-color: #e1e1e1;
  } */
  .posts {
    margin-top: 10px;
  }
  .postList{
      margin-top:23px
  }
  .postList img {
    height: 30px;
    vertical-align: middle;
  }

  ul {
    list-style: none;
    width: 100%;
    max-width: 1344px;
    margin: 0 auto;
  }

  ul li:not(:first-child) {
    padding: 9px;
    font-size: 15px;
    font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma, "Hiragino Sans GB", STHeiti, sans-serif !important;
    font-weight: 400;
    background-color: white;
    color: #333;
    border-top: 1px solid #f0f0f0;
  }

  li:not(:first-child):hover {
    background: #f5f5f5;;
  }

  li:last-child:hover {
    background: white;
  }

  li span {
    line-height: 30px;
  }

  .allcount {
    width: 70px;
    display: inline-block;
    text-align: center;
    font-size: 12px;
  }

  .reply_count {
    color: #9e78c0;
    font-size: 14px;
  }

  .put_good, .put_top {
    background: #80bd01;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    color: #fff;
    font-size: 12px;
    margin-right: 10px;
  }

  .topiclist-tab {
    background-color: #e5e5e5;
    color: #999;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    font-size: 12px;
    margin-right: 10px;
  }

  .last_reply {
    text-align: right;
    min-width: 50px;
    display: inline-block;
    white-space: nowrap;
    float: right;
    color: #778087;
    font-size: 12px;
  }

  .toobar {
    height: 40px;
    background-color: #f5f5f5;
  }

  .toobar span {
    font-size: 14px;
    color: #80bd01;
    line-height: 40px;
    margin: 0 10px;
    cursor: pointer;
  }

  .toobar span:hover {
    color: #9e78c0;
  }

  a {
    text-decoration: none;
    color: black;
  }

  a:hover {
    text-decoration: underline;
  }

  .loading {
    text-align: center;
    padding-top: 300px;
  }


/* 再次添加 */
  .titleFont{
    font-size: 1em;
  }
</style>