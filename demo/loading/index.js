let myPlugin = {
  install: function (Vue, options) {
    Vue.component('load', {
      props: ['text'],
      data: function() {
        return {};
      },
      template: `
        <div class='wrapper'>
          <div class='loading'>
            <span style='width:20px' v-for='char in text'>{{char}}</span>
          </div>
        </div>
      `
    });
    Vue.mixin({
      mounted:function(){
        var cssFlag = false;
        return function(){
          if (cssFlag) {
            return;
          }
          var head = document.querySelector('head');
          var style = document.createElement('style');
          style.type='text/css';
          style.innerHTML = `
          .wrapper{
            display: flex;
            justify-content: center;
          }
          .loading {
            display: flex;
            text-align: center;
            padding-top: 30px;
            height: 50px;
            width: 100px;
            justify-content: space-between;
          }
          .loading span {
            margin-top: 0;
            animation: 1s ease infinite move;
            display: block;
          }

          .loading span:first-child {
            animation-delay: 0s;
          }

          .loading span:nth-child(2) {
            animation-delay: 0.2s
          }

          .loading span:nth-child(3) {
            animation-delay: 0.4s
          }

          .loading span:nth-child(4) {
            animation-delay: 0.6s
          }

          .loading span:last-child {
            animation-delay: 0.8s
          }

          @keyframes move {
            0% {
              margin-top: -10px;
              border-bottom: 1px solid;
            }
            50% {
              margin-top: 10px;
              border-bottom: none;
            }
            100% {
              margin-top: -10px;
            }
          }`;
          head.appendChild(style);
          cssFlag = true;
        };
      }()
    });
  }
};
