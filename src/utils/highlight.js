// highlight.js  代码高亮指令
import Hljs from 'highlight.js';
import 'highlight.js/styles/tomorrow-night.css';

// 自定义指令 v-highlight
let Highlight = {};
Highlight.install = function (Vue) {
    // 先有数据再绑定，调用highlight
    Vue.directive('highlight', {
        inserted: function(el) {
            let blocks = el.querySelectorAll('pre code');
            for (let i = 0; i < blocks.length; i++) {
                const block = blocks[i];
                Hljs.highlightBlock(block);
            }
        }
    })
};
 
export default Highlight;