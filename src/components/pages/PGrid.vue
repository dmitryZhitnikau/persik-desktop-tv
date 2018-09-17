<template>
    <div class="main-grid">

        <div class="grid">
            <div class="grid__channel-list" v-bind:style="{transform: 'translate(' + (0) + 'rem,' + (translate.y) + 'rem)'}">
                 <div class = "grid__channel-list-item" v-for="channel in channelsForShow" v-bind:class="{'grid__channel-list-item_active': checkChannel(channel)}" v-bind:style="{ height: cursor.height + 'rem'}">
                   <div class="channel-list-item_logo">logo</div>
                   <div class="channel-list-item_name">{{channel.name}}</div>
                  </div>
            </div>
             <div class="grid__time-line" v-bind:style="{transform: 'translate(' + (translate.x) + 'rem,' + (0) + 'rem)', left: (timeScale.left) + 'rem'}" >
                <div v-for="hour in timeScale.scale" class="grid__time-point">{{hour}}:00</div>
              </div>
            <div class="grid__tvshows-group" v-bind:style="{ transform: 'translate(' + (translate.x) + 'rem,' + (translate.y) + 'rem)'}">

                <div class="grid__time-marker"  v-bind:style="{ left: timelinePosition + 'rem'}"></div>             

                <div v-for="channel in channelsForShow" class="grid__tvshows-row" v-bind:style="{ height: cursor.height + 'rem' }">
                    <div v-for="tvshow in channel.tvshows" class="grid__tvshow-item" v-bind:class="{ 'grid__tvshow-item_active': checkCursor(tvshow.tvshow_id), 'grid__tvshow-item_current': checkTimeLineHover(tvshow) }" v-bind:style = "getDomPosition(tvshow)">{{tvshow.title}}</div>
                </div>
            </div>
        </div>

      <div class="show-details">
        <div class="show-details__thumb"></div>
        <div class="show-details__info">
          <span class="info_name">{{cursor.title}}</span>
          <span class="info_description">Some water text</span>
        </div>
      </div>

    </div>

      

</template>

<script>

  // eslint-disable-next-line
  import Epg from '@core/Epg';
  import Metric from '@/persik/platform/Metric';

  const epg = Epg.getInstance();

  export default {
    name: 'p-grid',
    props: [],
    data() {
      return {
        channels: [],
        channelsForShow: [],
        channelRange: 10,
        timeScale: {
          scale: [],
          left: 0,
        },
        time: 0,
        timeShift: 6,
        curDate: {
          time: Math.round((new Date().getTime() / 1000), 0),
          hours: new Date().getHours(),
          minutes: new Date().getMinutes(),
          seconds: new Date().getSeconds(),
        },
        timelinePosition: 0,
        cursor: {
          init: false,
          id: 0,
          tvshowid: 0,
          start: 0,
          stop: 0,
          posX: 0,
          row: 0,
          height: 3,
        },
        translate: {
          x: 0,
          y: 0,
        },
      };
    },
    computed: {
    },
    watch: {
      time(value) {
        if (value > 0) {
          this.moveTimeLine(value);
        }
      },
    },
    methods: {
      focusHandler(event) {
        this.$emit('focus', event);
      },
      moveTimeLine() {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes() * 60;
        const seconds = date.getSeconds();
        this.timelinePosition = (((hours - this.curDate.hours) * 3600) + minutes + seconds) * 0.005;
      },
      async getChannelList() {
        const channelList = await this.$backend.content.getChannels();
        channelList.sort((a, b) => a.channel_id - b.channel_id);
        channelList.forEach((elem, index) => {
          const a = 'http://persik.by/images/channels/logos/';
          const b = elem.channel_id;
          const c = '.png';
          const picture = a.concat(b, c);
          this.channels.push(
            { id: parseInt(elem.channel_id, 10),
              num: index + 1,
              name: elem.name,
              logo: picture,
              tvshows: [],
            });
          if (index < this.channelRange) {
            this.channelsForShow.push(
              { id: elem.channel_id,
                num: index + 1,
                name: elem.name,
                logo: picture,
                tvshows: [],
              });
          }
        });
        this.getTvShowsList();
      },
      getTvShowsList() {
        const hours = this.curDate.time - (this.curDate.minutes * 60);
        const start = hours - (this.timeShift * 3600);
        const stop = hours + (this.timeShift * 3600);
        this.channelsForShow.forEach(async (channel, index) => {
          const tvshows = await epg.getTvshowsRange(channel.id, start, stop);
          this.channelsForShow[index].tvshows = tvshows;
        });
      },
      initCursor() {
        const date = Math.round(new Date().getTime() / 1000, 0);
        this.channelsForShow[0].tvshows.forEach((tvshow, index) => {
          if (date > tvshow.start && date < tvshow.stop) {
            const d = Math.round(((parseInt(tvshow.stop, 10) - parseInt(tvshow.start, 10))) / 2, 0);
            const tvshowPosX = parseInt(tvshow.start, 10) + d;
            this.cursor = {
              init: true,
              id: index,
              start: parseInt(tvshow.start, 10),
              stop: parseInt(tvshow.stop, 10),
              posX: tvshowPosX,
              row: 0,
              tvshowid: parseInt(tvshow.tvshow_id, 10),
              height: this.cursor.height,
              title: tvshow.title,
            };
          }
        });
      },
      checkCursor(tvshowId) {
        if (parseInt(tvshowId, 10) === this.cursor.tvshowid) {
          return true;
        }
        return false;
      },
      checkChannel(channel) {
        if (channel.num - 1 === this.cursor.row) {
          return true;
        }
        return false;
      },
      checkTimeLineHover(tvshow) {
        const width = (tvshow.stop - tvshow.start) * 0.005;
        const left = (tvshow.start - (this.curDate.time
        - (this.curDate.minutes * 60) - this.curDate.seconds)) * 0.005;
        if (this.timelinePosition > left && this.timelinePosition < (left + width)) {
          return true;
        }
        return false;
      },
      initTimeScale() {
        for (let i = this.curDate.hours - 4; i < this.curDate.hours + 5; i += 1) {
          this.timeScale.scale.push(i);
        }
        this.timeScale.left = -54;
      },
      horizontalMoving(index) {
        const tvshow = this.channelsForShow[this.cursor.row].tvshows[index];
        if (tvshow !== undefined) {
          const d = Math.round(((parseInt(tvshow.stop, 10) - parseInt(tvshow.start, 10))) / 2, 0);
          const tvshowPosX = parseInt(tvshow.start, 10) + d;
          this.cursor = {
            init: true,
            id: index,
            start: parseInt(tvshow.start, 10),
            stop: parseInt(tvshow.stop, 10),
            posX: tvshowPosX,
            row: this.cursor.row,
            tvshowid: parseInt(tvshow.tvshow_id, 10),
            height: this.cursor.height,
            title: tvshow.title,
          };
          this.moveChannelsGrid('horizontal');
        }
      },
      verticalMoving(row) {
        const channel = this.channelsForShow[row];
        let result = false;
        if (channel !== undefined) {
          for (let i = 0; i < channel.tvshows.length; i += 1) {
            const tvshow = channel.tvshows[i];
            if (tvshow.start <= this.cursor.posX && tvshow.stop >= this.cursor.posX) {
              this.cursor = {
                init: true,
                id: i,
                start: parseInt(tvshow.start, 10),
                stop: parseInt(tvshow.stop, 10),
                posX: this.cursor.posX,
                row,
                tvshowid: parseInt(tvshow.tvshow_id, 10),
                height: this.cursor.height,
                title: tvshow.title,
              };
              i = channel.tvshows.length;
              result = true;
            }
          }
          this.moveChannelsGrid('vertical');
        }
        return result;
      },
      getDomPosition(tvshow) {
        const width = (tvshow.stop - tvshow.start) * 0.005;
        const left = (tvshow.start - (this.curDate.time
        - (this.curDate.minutes * 60) - this.curDate.seconds)) * 0.005;
        return {
          left: `${left}rem`,
          width: `${width}rem`,
        };
      },
      async addRow() {
        const newRowIndex = this.channelsForShow.length;
        this.channelsForShow.push(this.channels[newRowIndex]);
        const hours = this.curDate.time - (this.curDate.minutes * 60);
        const start = hours - (this.timeShift * 3600);
        const stop = hours + (this.timeShift * 3600);
        const tvshows = await epg.getTvshowsRange(this.channels[newRowIndex].id, start, stop);
        this.channelsForShow[newRowIndex].tvshows = tvshows;
        if (this.cursor.row >= this.channelRange) {
          this.channelsForShow[this.cursor.row - this.channelRange].tvshows = [];
        }
      },
      async deleteRow() {
        if (this.cursor.row >= this.channelRange - 1) {
          const indx = this.cursor.row - (this.channelRange - 1);
          this.channelsForShow[indx] = this.channels[indx];
          const hours = this.curDate.time - (this.curDate.minutes * 60);
          const start = hours - (this.timeShift * 3600);
          const stop = hours + (this.timeShift * 3600);
          const tvshows = await epg.getTvshowsRange(this.channels[indx].id, start, stop);
          this.channelsForShow[indx].tvshows = tvshows;
          this.channelsForShow.length -= 1;
        }
      },
      loadPartNext() {
        this.channelsForShow.forEach(async (channel, index) => {
          const tvshows = channel.tvshows;
          const lastTvShow = tvshows[tvshows.length - 1];
          const start = parseInt(lastTvShow.stop, 10);
          const stop = start + (this.timeShift * 3600);
          const nextTvShows = await epg.getTvshowsRange(channel.id, start, stop);
          this.channelsForShow[index].tvshows =
          this.channelsForShow[index].tvshows.concat(nextTvShows);
        });
      },
      loadPartPrev() {
        this.channelsForShow.forEach(async (channel, index) => {
          const tvshows = channel.tvshows;
          const firstTvShow = tvshows[0];
          const stop = parseInt(firstTvShow.start, 10);
          const start = stop - (this.timeShift * 3600);
          const nextTvShows = await epg.getTvshowsRange(channel.id, start, stop);
          if (this.cursor.row === index) {
            this.cursor.id += nextTvShows.length;
          }
          this.channelsForShow[index].tvshows =
          nextTvShows.concat(this.channelsForShow[index].tvshows);
        });
      },
      refreshTimeScale(vector) {
        const scale = this.timeScale.scale;
        switch (vector) {
          case 'left': {
            if (scale[0] > 0) {
              scale.unshift(scale[0] - 1);
            } else {
              scale.unshift(23);
            }
            scale.length -= 1;
            this.timeScale.left -= 18;
            break;
          }
          case 'right': {
            if (scale[scale.length - 1] < 23) {
              scale[scale.length] = scale[scale.length - 1] + 1;
            } else {
              scale[scale.length] = 0;
            }
            this.timeScale.scale.shift();
            this.timeScale.left += 18;
            break;
          }
          default: {
            break;
          }
        }
      },
      moveChannelsGrid(vector) {
        switch (vector) {
          case 'vertical': {
            const step = 3;
            if (this.cursor.row - step > 0) {
              if ((this.cursor.height * this.cursor.row) + this.translate.y
              > (this.cursor.height * step)) {
                this.translate.y -= step * this.cursor.height;
              }
              if ((this.cursor.height * this.cursor.row) + this.translate.y
              < (this.cursor.height * step)) {
                this.translate.y += step * this.cursor.height;
              }
            }
            break;
          }
          case 'horizontal': {
            const startTime = this.curDate.time - (this.curDate.minutes * 60);
            const delta = ((this.cursor.posX - startTime - 4) * 0.005) + this.translate.x;
            if (delta < 5) {
              this.translate.x += ((this.cursor.stop - this.cursor.start) * 0.005) + 5;
              this.loadPartPrev();
            }
            if (delta > 40) {
              this.translate.x -= ((this.cursor.stop - this.cursor.start) * 0.005) + 5;
              this.loadPartNext();
            }
            break;
          }
          default: {
            break;
          }
        }
      },
    },
    mounted() {
      Metric.getInstance().screenView('tv-grid');
      this.$emit('focusMe', this.$el);
      this.getChannelList();
      this.initTimeScale();
      setInterval(() => {
        this.time = new Date().getSeconds();
      }, 4000);
    },
  };
</script>
<style scoped lang="scss">     
        
        
        .grid{
          position: relative;
          overflow: auto;
          height: 100%;
          width: 100%;
          background-color: lightgray;
          left: 4em;
          top: 2rem;

          .grid__channel-list{
            position: absolute;
            transition: transform 1s;
            width: 15rem;
            left: 0em;
            top: 2em;
            z-index: 1;
            background-color: $color-gray-dark;
            color: $color-text-simple;

            
              &-item{
                box-sizing: border-box;
                border-bottom: 1px solid $color-gray-light;
                font-size: .7rem;

                .channel-list-item_logo{
                  display: flex;
                  justify-content: center;
                  align-items: center; 
                  height: 100%;
                  width: 20%;
                  float: left;
                }
                .channel-list-item_name{
                  display: flex;
                  align-items: center;               
                  height: 100%;
                  width: 80%;
                  float: left;                
                }
              }
            }

          .grid__channel-list-item_active{
            color: $color-hover !important;
          }

          .grid__time-line{
            position: absolute;
            transition: transform 1s;
            height: 2em;
            white-space: nowrap;
            top: 0;
            z-index: 1;
            background-color: $color-gray-dark;
            color: $color-text-simple;
            overflow: hidden;

            .grid__time-point{
              display: inline-block;
              width: 0;
              margin-left: 18rem;
            }
            .grid__time-point:first-child{
              margin-left: 0;
            }
          }    

          .grid__tvshows-group{
            position: absolute;
            transition: transform 1s;
            top: 2em;
            margin: 0;
            padding: 0;
            left: 18rem;
            .grid__tvshows-row{
              .grid__tvshow-item{
                display: flex;
                padding-left: .5rem;
                align-items: center;
                box-sizing: border-box;
                position: absolute;
                background-color: $color-gray-medium;
                color: $color-text-simple;
                height: inherit;
                border: 1px solid $color-gray-light;
                font-size: 0.6em;
              }
              
              .grid__tvshow-item_active{
                background-color: $color-hover !important;
              }
            }
          }

          .grid__time-marker{
            width: 0;
            height: 100%;
            position: absolute;
            top: 0;
            border: 1px solid $color-glow;
            box-shadow: $shadow-glow;
            z-index: 150;
        }

      }
    
    .main-grid {
        background: $color-gray-dark;
        position: absolute;
        overflow: hidden;
        top: 0;
        left: 3rem;
        height: 100%;
        width: 77rem;

        .show-details{
          width: 100%;
          margin-left: 6rem;
          position: fixed;
          left: 0;
          bottom: 0;
          height: 40vh;
          border-top: 1px solid $color-gray-light;
          background-color: $color-gray-dark;
          z-index: 1;
          &__thumb{
            width: 25%;
            height: 80%;
            margin: 1rem 1rem;
            background-color: $color-gray-light;
            float: left;
          }

          &__info{
            width: 60%;
            height: 80%;
            margin: 1rem;  
            float: left;
            span{
              display: block;
              color: $color-hover ;
              margin: 1rem 0;
            }
            .info_description{
              color: $color-text-muted;
            }
          }
        }
    }
    
</style>
