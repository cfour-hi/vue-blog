<template>
  <div v-if="Object.keys(timelines).length" class="worklog-timeline">
    <ul class="timeline-list">
      <li v-for="(timeline, index) in sortTimelineYear(timelines)" :key="timeline.year">
        <dl class="timeline-bar" :style="{ color: timeline.color }">
          <dt class="timeline-year" :style="{ 'background-color': timeline.color }">{{ timeline.year }}</dt>
          <dd class="timeline-month" v-for="(worklog, index) in timeline.worklog" :class="{ active: timeline.activeIndex === index }" :style="[ timeline.activeIndex === index ? worklog.activeStyle : '' ]" @mouseover="toggleTimelineMonth(timeline, index)">
            <router-link class="timeline-month-link" :to="'/worklog/' + worklog.number" :style="{ color: timeline.activeIndex === index ? '#fff' : timeline.color }">{{ worklog.month }}</router-link>
          </dd>
        </dl>
        <article class="timeline-article">
          <transition-group name="fade" :enter-active-class="'animated ' + timeline.enterActiveClass" :leave-active-class="'animated ' + timeline.leaveActiveClass" mode="out-in">
            <blockquote v-for="(worklog, index) in timeline.worklog" v-show="timeline.activeIndex === index" v-html="worklog.quote" class="timeline-quote" :key="worklog.id"></blockquote>
          </transition-group>
        </article>
      </li>
    </ul>
  </div>
</template>

<script>
import { getWorklogList } from '@/api'
import { converWorklogInfo } from '@/app/js/app'

const FADE_IN_LEFT = 'fadeInLeft'
const FADE_IN_RIGHT = 'fadeInRight'
const FADE_OUT_LEFT = 'fadeOutLeft'
const FADE_OUT_RIGHT = 'fadeOutRight'

const pagination = {
  page: 1,
  size: 24
}

let hasMoreWorklog = false

export default {
  data () {
    return {
      timelines: {},
      hasMoreWorklog: hasMoreWorklog
    }
  },
  created () {
    this.$store.state.articles[this.$route.meta.category]
      ? addTimelineInfo(this, this.$store.state.articles[this.$route.meta.category])
      : this.getWorklogList()
  },
  methods: {
    getWorklogList () {
      getWorklogList(pagination).then(response => {
        const worklogList = []
        response.forEach(worklog => {
          worklogList.push(converWorklogInfo(worklog))
        })

        pagination.page += 1
        this.hasMoreArticle = hasMoreWorklog = response.length === pagination.size

        addTimelineInfo(this, worklogList)
        this.$store.commit('concatArticleList', { category: this.$route.meta.category, list: worklogList })
      })
    },
    sortTimelineYear (timelines) {
      const timelineList = []
      Object.keys(timelines).forEach(year => {
        timelineList.unshift(timelines[year])
      })
      return timelineList
    },
    toggleTimelineMonth (timeline, index) {
      if (index > timeline.activeIndex) {
        timeline.enterActiveClass = FADE_IN_RIGHT
        timeline.leaveActiveClass = FADE_OUT_LEFT
      } else {
        timeline.enterActiveClass = FADE_IN_LEFT
        timeline.leaveActiveClass = FADE_OUT_RIGHT
      }

      timeline.activeIndex = index
    }
  }
}

function addTimelineInfo (vm, list) {
  list.forEach(worklog => {
    if (vm.timelines[worklog.year]) {
      vm.timelines[worklog.year].worklog.unshift(worklog)
    } else {
      vm.$set(vm.timelines, worklog.year, {
        activeIndex: 0,
        enterActiveClass: FADE_IN_RIGHT,
        leaveActiveClass: FADE_OUT_LEFT,
        color: worklog.color,
        year: worklog.year,
        worklog: [worklog]
      })
    }
  })
}
</script>


<style scoped>
.worklog-timeline {
  padding: 2em;
  background-color: rgba(255, 255, 255, .8);
}

.timeline-list {
  padding-left: 0;
  list-style: none;
}

.timeline-bar {
  overflow: hidden;
  position: relative;
}

.timeline-bar::before {
  content: '';
  position: absolute;
  top: 50%;
  right: 0;
  left: 3em;
  border-top: 1px solid currentColor;
  opacity: .2;
}

.timeline-year {
  float: left;
  width: 3em;
  line-height: 3em;
  text-align: center;
  border-radius: 50%;
  color: #fff;
  background-color: #0096ff;
}

.timeline-month {
  float: left;
  position: relative;
  width: 2em;
  height: 2em;
  margin-left: 2.5em;
  margin-top: 1em;
  font-size: 12px;
  line-height: 1.9em;
  text-align: center;
  border: 1px solid currentColor;
  border-radius: 50%;
  color: currentColor;
  background-color: #fff;
  cursor: pointer;
}

.timeline-month::after {
  content: '';
  display: none;
  position: absolute;
  bottom: -1em;
  left: 48%;
  height: 1em;
  border-left: 1px solid currentColor;
  opacity: .2;
}

.timeline-month.active::after {
  display: block;
}

.timeline-month-link {
  display: block;
  text-decoration: none;
}

.timeline-article {
  overflow: hidden;
  position: relative;
  top: -1.2em;
  height: 7.5em;
  margin-left: 3em;
  font-size: 14px;
  border: 1px solid #e9e9e9;
  border-radius: .5em;
}

.timeline-quote {
  position: absolute;
  width: 100%;
  padding: 0 1em;
  margin: 0;
}
</style>
