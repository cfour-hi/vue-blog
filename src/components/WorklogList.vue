<template>
  <div v-if="Object.keys(timelines).length" class="page__worklog-timeline">
    <ul class="timeline-list">
      <li v-for="timeline in sortTimelineYear(timelines)" :key="timeline.year">
        <dl class="timeline-bar" :style="{ color: timeline.color }">
          <dt class="timeline-year" :style="{ 'background-color': timeline.color }">{{ timeline.year }}</dt>
          <template v-for="(worklog, index) in timeline.worklog">
            <dd v-if="inMobile" :key="worklog.id" class="timeline-month--mobile">
              <router-link :to="'/worklog/' + worklog.number" :style="{ color: worklog.activeStyle.color }" class="timeline-month-link--mobile">{{ worklog.month }}</router-link>
              <article class="timeline-article--mobile">
                <blockquote v-html="worklog.quote" class="timeline-quote--mobile"></blockquote>
              </article>
            </dd>
            <dd v-else :key="worklog.id" :class="{ active: timeline.activeIndex === index }" :style="[ timeline.activeIndex === index ? worklog.activeStyle : '' ]" class="timeline-month" @mouseover="toggleTimelineMonth(timeline, index)">
              <router-link :to="'/worklog/' + worklog.number" :style="{ color: timeline.activeIndex === index ? '#fff' : timeline.color }" class="timeline-month-link">{{ worklog.month }}</router-link>
            </dd>
          </template>
        </dl>
        <article v-if="!inMobile" class="timeline-article">
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
  name: 'worklog-list',
  data () {
    return {
      inMobile: this.$store.state.inMobile,
      timelines: {},
      hasMoreWorklog: hasMoreWorklog
    }
  },
  created () {
    this.getWorklogList()
  },
  methods: {
    getWorklogList () {
      this.$store.commit('setProgress', { step: 'loading' })

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
      vm.inMobile ? vm.timelines[worklog.year].worklog.push(worklog) : vm.timelines[worklog.year].worklog.unshift(worklog)
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
.page__worklog-timeline {
  padding: 2em;
  background-color: rgba(255, 255, 255, .8);
}

.in-mobile .page__worklog-timeline {
  padding: 1em;
  font-size: 14px;
}

.timeline-list {
  padding-left: 0;
  list-style: none;
}

.in-mobile .timeline-list {
  position: relative;
}

.timeline-bar {
  overflow: hidden;
  position: relative;
}

.in-mobile .timeline-bar {
  margin: 0;
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

.in-mobile .timeline-bar::before {
  top: 0;
  left: 1.5em;
  right: 50%;
  bottom: 0;
  border-top: 0;
  border-left: 1px solid currentColor;
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

.in-mobile .timeline-year {
  float: none;
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

.timeline-month--mobile {
  position: relative;
  margin-left: 0;
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

.timeline-month-link--mobile {
  position: absolute;
  top: 50%;
  width: 1.5em;
  height: 1.5em;
  border: 1px solid currentColor;
  margin-top: -.75em;
  margin-left: .75em;
  line-height: 1.5;
  border-radius: 50%;
  text-align: center;
  text-decoration: none;
  background-color: #fff;
}

.timeline-article {
  overflow: hidden;
  position: relative;
  top: -1.2em;
  height: 7em;
  margin-left: 3em;
  font-size: 14px;
  border: 1px solid #e9e9e9;
  border-radius: .5em;
}

.timeline-quote {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  position: absolute;
  width: 100%;
  padding: 0 1em;
  margin: 0;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  color: #404040;
}

.timeline-quote--mobile {
  position: relative;
  padding: 0 1em;
  border-bottom: 1px dashed #bfbfbf;
  margin-right: 0;
  margin-left: 3.5em;
  font-size: 12px;
  color: #404040;
  opacity: .6;
}

.timeline-quote--mobile::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  height: 35%;
  border-left: 1px dashed #bfbfbf;
  transform-origin: right bottom;
  transform: skewX(15deg)
}
</style>

<style>
.page__worklog-timeline .timeline-quote--mobile p {
  margin-bottom: .5em;
}
</style>
