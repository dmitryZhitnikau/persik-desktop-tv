<template>
  <div class="p-speed-test" data-xy-group-vertical data-xy-open-left>

      <div class="group">
          <img class="group__img" src="../../../assets/tv.png" alt="">

          <div class="load-area">
            
            <div class="loading-line">
              <div class="loading-line__dot"></div>
              <div class="loading-line__dot"></div>
              <div class="loading-line__dot"></div>
              <div class="loading-line__dot"></div>
              <div class="loading-line__dot"></div>
              <div class="loading-line__dot"></div>
            </div>

          </div>

          <img class="group__img" src="../../../assets/server.png" alt="">
      </div>

      <div class="button-group" data-xy-group-vertical>

        <div class="button-group__ceil">
          <div class="button-group__ceil-button" data-xy-focusable tabindex="-1" v-if="!sendWay.by && !isSendData" v-on:click="startTest('by')">Тест для РБ</div>
          <div class="button-group__ceil-button" data-xy-focusable tabindex="-1" v-if="isSendData && !sendWay.by" v-on:click="showAlert">Тест для РБ</div>
          <div class="button-group__ceil-button button-group__ceil-button_active" data-xy-focusable tabindex="-1" v-if="sendWay.by">В процессе</div>
          <div class="button-group__ceil-info" v-if="speed.by">
            <span>{{ speed.by }} Мбит/сек</span>
            <img v-if="speed.by >= 10" src="../../../assets/check_green.png" alt="">
            <img v-if="speed.by < 10 && speed.by >= 5" src="../../../assets/check_yellow.png" alt="">
            <img v-if="speed.by < 5" src="../../../assets/cancel.png" alt="">
          </div>
        </div>
        
        <div class="button-group__ceil">
          <div class="button-group__ceil-button" data-xy-focusable tabindex="-1" v-if="!sendWay.other && !isSendData" v-on:click="startTest('other')">Тест для других регионов (кроме РБ)</div>
          <div class="button-group__ceil-button" data-xy-focusable tabindex="-1" v-if="isSendData && !sendWay.other" v-on:click="showAlert">Тест для других регионов (кроме РБ)</div>
          <div class="button-group__ceil-button button-group__ceil-button_active" data-xy-focusable tabindex="-1" v-if="sendWay.other">В процессе</div>
          <div class="button-group__ceil-info" v-if="speed.other">
            <span>{{ speed.other }} Мбит/сек</span>
            <img v-if="speed.other >= 10" src="../../../assets/check_green.png" alt="">
            <img v-if="speed.other < 10 && speed.other >= 5" src="../../../assets/check_yellow.png" alt="">
            <img v-if="speed.other < 5" src="../../../assets/cancel.png" alt="">
          </div>
        </div>

        <div class="button-group__ceil">
          <div class="button-group__ceil-button" data-xy-focusable tabindex="-1" v-if="!sendWay.internet && !isSendData" v-on:click="startTest('internet')">Тест сети Интернет</div>
          <div class="button-group__ceil-button" data-xy-focusable tabindex="-1" v-if="isSendData && !sendWay.internet" v-on:click="showAlert">Тест сети Интернет</div>
          <div class="button-group__ceil-button button-group__ceil-button_active" data-xy-focusable tabindex="-1" v-if="sendWay.internet">В процессе</div>
          <div class="button-group__ceil-info" v-if="speed.internet">
            <span>{{ speed.internet }} Мбит/сек</span>
            <img v-if="speed.internet >= 10" src="../../../assets/check_green.png" alt="">
            <img v-if="speed.internet < 10 && speed.internet >= 5" src="../../../assets/check_yellow.png" alt="">
            <img v-if="speed.internet < 5" src="../../../assets/cancel.png" alt="">
          </div>
        </div>
        
      </div>          

  </div>
</template>

<script>

  import WButton from '@/components/widgets/WButton';

  export default {
    name: 'p-speed-test',
    props: [],
    components: { WButton },
    data() {
      return {
        timeInterval: null,
        dots: null,
        sendWay: {
          by: false,
          other: false,
          internet: false,
        },
        activeDotPosition: 0,
        downloadSize: 1986284,
        speed: {
          by: null,
          other: null,
          internet: null,
        },
        countryCode: null,
      };
    },
    computed: {
      curLang() {
        return this.$lang.getLang();
      },
      isSendData() {
        if (!this.sendWay.by && !this.sendWay.other && !this.sendWay.internet) return false;
        return true;
      },
    },
    async created() {
      this.dots = document.getElementsByClassName('loading-line__dot');
    },
    methods: {
      getImageUrl(loc) {
        const urlBy = 'https://sttv.persik.by/speedtest/random1000x1000.jpg';
        const urlOther = 'http://vod.persik.by/speedtest/random1000x1000.jpg';
        const urlInt = 'http://sttv.persik.tv/speedtest/random1000x1000.jpg';
        switch (loc) {
          case 'by':
            return urlBy;

          case 'other':
            return urlOther;

          case 'internet':
            return urlInt;

          default:
            return urlInt;
        }
      },
      startTest(loc) {
        this.initiateSpeedDetection(loc);
      },
      initiateSpeedDetection(loc) {
        this.startDotCounter();
        this.sendWay[loc] = true;
        setTimeout(() => {
          this.measureConnectionSpeed(loc);
        }, 1);
      },
      showAlert() {
        this.$nm.showMessage('Дождитесь завершения теста', 5000);
      },
      measureConnectionSpeed(loc) {
        let endTime;
        const download = new Image();
        const startTime = (new Date()).getTime();
        download.onload = () => {
          endTime = (new Date()).getTime();
          this.showResults(endTime, startTime, loc);
          this.sendWay[loc] = false;
          this.stopDotCounter();
        };
        const cacheBuster = '?'.concat(startTime);
        download.src = this.getImageUrl(loc) + cacheBuster;
      },
      showResults(endTime, startTime, loc) {
        const duration = (endTime - startTime) / 1000;
        const bitsLoaded = this.downloadSize * 8;
        const speedBps = (bitsLoaded / duration).toFixed(2);
        const speedKbps = (speedBps / 1024).toFixed(2);
        const speedMbps = (speedKbps / 1024).toFixed(2);
        this.speed[loc] = speedMbps;
      },
      startDotCounter() {
        this.downLoading();
      },
      stopDotCounter() {
        clearInterval(this.timeInterval);
        for (let i = 0; i < this.dots.length; i += 1) {
          this.dots[i].className = 'loading-line__dot';
        }
      },
      upLoading() {
        this.timeInterval = setInterval(() => {
          if (this.activeDotPosition > 0) {
            if (this.dots[this.activeDotPosition + 1]) {
              this.dots[this.activeDotPosition + 1].className = 'loading-line__dot loading-line__dot_active';
            }
            this.dots[this.activeDotPosition].className = 'loading-line__dot loading-line__dot_active checked';
            this.activeDotPosition -= 1;
          } else {
            clearInterval(this.timeInterval);
            this.downLoading();
          }
        }, 100);
      },
      downLoading() {
        this.timeInterval = setInterval(() => {
          if (this.activeDotPosition < this.dots.length - 1) {
            if (this.dots[this.activeDotPosition - 1]) {
              this.dots[this.activeDotPosition - 1].className = 'loading-line__dot loading-line__dot_active';
            }
            this.dots[this.activeDotPosition].className = 'loading-line__dot loading-line__dot_active checked';
            this.activeDotPosition += 1;
          } else {
            clearInterval(this.timeInterval);
            this.upLoading();
          }
        }, 150);
      },
    },
  };
</script>

<style scoped lang="scss">

  .p-speed-test {
  width: 60rem;
  padding-top: 3rem;
  padding-left: 4rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;

  .button-group {
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    height: 12rem;
    -ms-flex-pack: distribute;
        justify-content: space-around;
    -webkit-box-align: start;
        -ms-flex-align: start;
            align-items: flex-start;
    margin-top: 4rem;

    &__ceil {
      width: 90%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
          -ms-flex-pack: justify;
              justify-content: space-between;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
      color: white;

      &-info {
          width: 20%;
          height: 100%;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: justify;
              -ms-flex-pack: justify;
                  justify-content: space-between;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;

          img {
            width: 2rem;
          }
      }

      &-button {
        height: 3rem;
        padding: 0 1.5rem;
        color: white;
        border: 1px solid #393939;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
        -webkit-box-pack: center;
            -ms-flex-pack: center;
                justify-content: center;

        &_active {
          border: 1px solid #67b437;
        }

        &[data-xy-focus] {
          background-color: rgb(224, 95, 32)
        }
      }
    }        
  }

  .group {
      margin-top: 5rem;
      width: 35rem;
      height: 10rem;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
          -ms-flex-pack: justify;
              justify-content: space-between;
      -webkit-box-align: end;
          -ms-flex-align: end;
              align-items: flex-end;

    &__img {
        width: 10rem;
    }

    .load-area {
      height: 100%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
          -ms-flex-direction: column;
              flex-direction: column;
      -webkit-box-pack: end;
          -ms-flex-pack: end;
              justify-content: flex-end;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;

      &__info {
        color: white;
        font-size: 1.2rem;
        margin-top: 2rem;

        &-speed {
          font-size: 1.6rem;
          font-weight: 700;
          color: white;

          &_bad {
            color: red;
          }

          &_midi {
            color: yellow;
          }

          &_good {
            color: #67b437;
          }
        }
      }
    }

    .loading-line {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-pack: distribute;
            justify-content: space-around;
        -webkit-box-align: end;
            -ms-flex-align: end;
                align-items: flex-end;
        width: 15rem;

        &__dot {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
            -webkit-transition: .1s;
            transition: .1s;
            border: 1px solid lightgrey;

            &_active {
              border: 1px solid rgb(224, 95, 32);
              -webkit-box-shadow: 0 0 10px 0 rgba(224, 95, 32, .6);
                      box-shadow: 0 0 10px 0 rgba(224, 95, 32, .6);
            }
        }
    }
  }

  .checked {
      background-color: #67b437;
  }

  &__button {
    margin-top: 3rem;
  }

  .info-text {
    color: white;
    margin-top: 3rem;

    &_bad {
            color: red;
          }

    &_good {
      color: #67b437;
    }
  }
}

</style>
