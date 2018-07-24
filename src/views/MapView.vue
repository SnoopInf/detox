<template>
  <div class="item-view">
    <iframe src="https://www.google.com/maps/d/embed?mid=1ihIhi0TnUxN4ktx7VC3Pz109nQ5qJt_D" v-bind:width="windowWidth" v-bind:height="windowHeight"></iframe>
  </div>
</template>

<script>
import Spinner from '../components/Spinner.vue'
import Comment from '../components/Comment.vue'

export default {
  name: 'map-view',
  components: { Spinner, Comment },

  data: () => ({
    loading: true,
    windowHeight: window.innerHeight - 55,
    windowWidth: window.innerWidth
  }),

  computed: {
    item () {
      return this.$store.state.items[this.$route.params.id]
    },

  },

  // We only fetch the item itself before entering the view, because
  // it might take a long time to load threads with hundreds of comments
  // due to how the HN Firebase API works.
  asyncData ({ store, route: { params: { id }}}) {
    return store.dispatch('FETCH_ITEMS', { ids: [id] })
  },

  title () {
    return 'Map'
  },

  // Fetch comments when mounted on the client
  beforeMount () {
    this.fetchComments();
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.windowHeight = window.innerHeight - 55;
        this.windowWidth = window.innerWidth
      });
    })
  },

  // refetch comments if item changed
  watch: {
    item: 'fetchComments'
  },

  methods: {
    fetchComments () {
      if (!this.item || !this.item.kids) {
        return
      }

      this.loading = true
      fetchComments(this.$store, this.item).then(() => {
        this.loading = false
      })
    }
  }
}

// recursively fetch all descendent comments
function fetchComments (store, item) {
  if (item && item.kids) {
    return store.dispatch('FETCH_ITEMS', {
      ids: item.kids
    }).then(() => Promise.all(item.kids.map(id => {
      return fetchComments(store, store.state.items[id])
    })))
  }
}
</script>

<style lang="stylus">
.item-view-header
  background-color #fff
  padding 1.8em 2em 1em
  box-shadow 0 1px 2px rgba(0,0,0,.1)
  h1
    display inline
    font-size 1.5em
    margin 0
    margin-right .5em
  .host, .meta, .meta a
    color #828282
  .meta a
    text-decoration underline

.item-view-comments
  background-color #fff
  margin-top 10px
  padding 0 2em .5em

.item-view-comments-header
  margin 0
  font-size 1.1em
  padding 1em 0
  position relative
  .spinner
    display inline-block
    margin -15px 0

.comment-children
  list-style-type none
  padding 0
  margin 0

@media (max-width 600px)
  .item-view-header
    h1
      font-size 1.25em
</style>
