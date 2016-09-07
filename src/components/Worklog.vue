<template>
  <section class="worklog-list-page">
    <div class="worklog-list__year-card" v-for="year in years" v-if="$route.name === 'worklog'" transition="fade">
      <p class="year-card__cur-year">{{ year }}</p>
      <div class="year-card__month-list">
        <a v-link="{ name: 'worklog-content', params: { num: 1}}" class="year-card__month-item" v-for="month in months">{{ month }}</a>
        <!-- <a class="year-card__month-item" href="#" v-for="month in months">{{ month }}</a> -->
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        years: [2016],
        months: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
      }
    }
  }
</script>

<style>
  .worklog-list-page,
  .worklog-list__year-card,
  .year-card__month-list {
    -webkit-display: flex;
            display: flex;
  }
  .worklog-list-page {
    padding: 0.3rem 0.15rem;
  }
  .worklog-list__year-card {
    flex-direction: column;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    text-align: center;
  }
  .year-card__cur-year {
    position: relative;
    left: -1px;
    width: 101%;
    margin: 0;
    border-radius: 5px 5px 0 0;
    font-size: 18px;
    line-height: 2;
    color: #fff;
    background-color: #f60;
  }
  .year-card__month-list {
    flex-wrap: wrap;
    margin: 1px;
  }
  .year-card__month-item {
    width: 33.3%;
    font-size: 14px;
    line-height: 2.5;
  }
  .year-card__month-item:hover {
    color: #f60;
    border-radius: 3px;
    -webkit-box-shadow: 0 0 3px #f60;
            box-shadow: 0 0 3px #f60;
  }
</style>