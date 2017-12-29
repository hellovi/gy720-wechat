/*
 * 上拉刷新|下拉加载
 * @Author: chenliangshan
 * @Date: 2017-12-29 09:52:26
 * @Last Modified by: chenliangshan
 * @Last Modified time: 2017-12-29 13:42:52
 */

 export default {

   data() {
     return {
       page: 0,
       lastPage: 1,
       tagField: 'tag_id',
     }
   },

   methods: {
     /**
      * 选中标签更新路由
      * @param {Object} item 当前选中的标签数据
      */
     tagUpdate(item) {
       this.$router.push({
         query: {
           ...this.$route.query,
           [this.tagField]: item.id,
           per_page: 10,
         },
       })
     },

     /**
      * 转换数据格式
      * @param {Object} query 路由参数
      */
     parse(query) {
       return Object.keys(query)
        .reduce((result, key) => {
          const value = query[key]
          return `${result}&${key}=${value}`
        }, '')
     },

     /**
      * 下拉刷新
      * @param {Function} done 加载完成回调
      */
     refresh(done) {
       this.getPageData()
        .then(() => {
          done()
        })
     },

     /**
      * 上拉加载
      * @param {Function} done 加载完成回调
      */
     infinite(done) {
       if (this.lastPage !== this.page) {
         this.getPageData(this.page += 1, true)
          .then((res) => {
            done(!res.total || this.lastPage === this.page)
          })
          .catch(() => {
            done()
          })
       } else {
         done(true)
       }
     },


     /**
      * @param {Number} page 页码
      * @param {Boolean} status 是否上拉加载
      * @param {Function} callback 加载完成回调
      */
     getPageData(page = 1, status = false) {
       this.page = +page
       const query = {
         ...this.$route.query,
       }
       return this.getListData(this.parse(query), status)
     },
   },

   beforeRouteEnter(to, from, next) {
     next((vm) => {
       vm.getTagData()
     })
   },

   beforeRouteUpdate(to, from, next) {
     this.$nextTick(() => {
       this.page = to.query.page || 1
       this.$refs.scrollerList.triggerPullToRefresh()
     })
     next()
   },
 }
