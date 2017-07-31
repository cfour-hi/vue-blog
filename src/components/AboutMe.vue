<template>
  <div v-once class="page__about-me clearfix">
    <ul class="experience">
      <li class="joke-section" data-period="<初中>">
        <p>体育老师对我说：“女生喜欢踢足球的男生”，我信了...</p>
        <p>
          <i class="fa fa-meh-o" aria-hidden="true"></i>
          踢烂五双鞋也没有女生说喜欢我，不干了...
        </p>
      </li>
      <li class="joke-section" data-period="<高中>">
        <p>选择成为一名体育生，高考全队文化成绩第一...</p>
        <p>
          <i class="fa fa-frown-o" aria-hidden="true"></i>
          可专业成绩却因为受伤而惨不忍睹...
        </p>
      </li>
      <li class="joke-section" data-period="<大学>">
        <p>选择室内设计专业，想做一枚高冷的设计师...</p>
        <p>
          <i class="fa fa-frown-o" aria-hidden="true"></i>
          奈何“天赋“乃可望而不可即...
        </p>
      </li>
      <li class="joke-section" data-period="<工作>">
        <p>老大说：“看你对电脑挺熟悉，试试看把公司官网修改下。”</p>
        <p>
          <i class="fa fa-smile-o" aria-hidden="true"></i>
          从此踏上前端大坑...
        </p>
      </li>
    </ul>
    <div v-if="!$store.state.inMobile" class="instroduce">
      <div class="instroduce-border-top"></div>
      <!--<img class="avatar" src="https://avatars3.githubusercontent.com/u/8335856?v=3&s=240" alt="avatar">-->
      <p class="name">MONINE</p>
      <p>Front-End Developer</p>
      <p>1992</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'about-me',
  data () {
    return {}
  }
}
</script>

<style scoped>
.experience {
  float: left;
  width: 37em;
  padding: 1em 2em;
  margin: 0;
  list-style: none;
  background-color: rgba(255, 255, 255, .8);
}

.in-mobile .experience {
  width: 100%;
  padding: 1em;
}

.joke-section {
  position: relative;
  margin-left: 4em;
  border-bottom: 1px dashed #e9e9e9;
  font-size: 14px;
  color: #5a5a5a;
}

.joke-section::before {
  content: attr(data-period);
  position: absolute;
  left: -4em;
  color: #919191;
}

.instroduce {
  vertical-align: top;
  float: left;
  width: 11em;
  margin-left: 1em;
  font-family: 'HoangYen11acb2198d6177d1';
  text-align: center;
  color: #5a5a5a;
  background-color: rgba(255, 255, 255, .8);
}

.instroduce-border-top {
  height: .3em;
  background-color: #49a9ee;
  background-image: linear-gradient(to bottom right, #7265e6, #108ee9, #00a854);
}

.avatar {
  width: 100%;
}

.name {
  font-size: 20px;
}
</style>

<style>
.page__about-me .joke-section p:last-child {
  color: #919191;
}
</style>

