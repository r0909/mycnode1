<template>
    <div class="pagination">
        <!-- 首页 -->
        <button @click="changeBtn">首页</button>
        <!-- 上一页 -->
        <button @click="changeBtn">上一页</button>
        <button v-if="judge" class="pagebtn">...</button>
        <!-- 页码 -->
        <button v-for="btn in pagebtns" :key="btn.id" :class="[{currentPage:btn == currentPage},'pagebtn']"
        @click="changeBtn(btn)">
            {{btn}}
        </button>

        <!-- 下一页 -->
        <button @click="changeBtn">下一页</button>
    </div>
</template>


<script>
import $ from 'jquery'

export default {
    name: "Pagination",
    data(){
        return{
            pagebtns: [1,2,3,4,5,'...'],
            currentPage: 1,
            judge: false
        }
    },
    methods:{
        changeBtn(page){
          //点击上一页,下一页,首页
          if(typeof page != 'number'){
            switch(page.target.innerText){
              case '上一页':
                $('button.currentPage').prev().click();
                break;
              case '下一页':
                $('button.currentPage').next().click();
                break;
              case '首页':
                this.pagebtns = [1,2,3,4,5,'...'];
                this.changeBtn(1);
                break;
              default:
                break;
            }
            return
          }

            this.currentPage = page

            if (page > 4) {
                this.judge = true
            }else{
                this.judge = false
            }

            if (page == this.pagebtns[4]) {
                // 点第五项时移除第一项
                this.pagebtns.shift()
                // 第四项后面加一项
                this.pagebtns.splice(4,0,this.pagebtns[3] + 1)
            }
            else if (page == this.pagebtns[0] && page != 1) {
                // 第一项前面加一项并且当第一项是第一页时前面不能再加
                this.pagebtns.unshift(this.pagebtns[0] - 1)
                // 第一项前面加一项后移除第六项保证只有五项
                this.pagebtns.splice(5,1)
            }
                this.$emit('handleList',this.currentPage)
        }

    }

}
</script>

<style scoped>
  .pagination {
    margin-top: 5px;
    margin-bottom: 20px;
    background-color: white;
    padding: 6px 20px;
    border-radius: 5px;
    /*box-shadow: 0px 2px 9px #888888;*/
    border: 1px solid #888888;
  }

  button {
    background-color: #fff;
    border: 1px solid #ddd;
    color: #778087;
    border-radius: 3px;
    outline: none;
    height: 21px;
    cursor: pointer;
    padding: 0 2px;
    width: 55px;
    height: 29px;
  }

  .pagebtn {
    position: relative;
    bottom: 1px;
    width: 40px;
    margin: 0 4px;
  }

  .currentPage {
    color: white;
    background-color: #1f1b1b;

  }
</style>
