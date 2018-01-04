/*
 * 上拉刷新|下拉加载
 * @Author: chenliangshan
 * @Date: 2017-12-29 09:52:26
 * @Last Modified by: chenliangshan
 * @Last Modified time: 2018-01-04 18:25:33
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
        .then((res) => {
          this.setDataEmpty(res)
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
            this.setDataEmpty(res)
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

     /**
      * 根据页面列表数据设置无数据状态
      * @param {Object} res 列表数据
      */
     setDataEmpty(res) {
       this.$nextTick(() => {
         this.$refs.scrollerList.dataEmpty = !res.total
       })
     },
   },

   beforeRouteEnter(to, from, next) {
    //  如果是不需要标签的页面，在路由的meta里面加标志
     if (to.meta.noTag) {
       next()
     } else {
       next((vm) => {
         vm.getTagData()
       })
     }
   },

   beforeRouteUpdate(to, from, next) {
     this.$nextTick(() => {
       this.page = to.query.page || 1
       this.$refs.scrollerList.triggerPullToRefresh()
     })
     next()
   },
 }
