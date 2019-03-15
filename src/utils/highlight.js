// highlight.js  代码高亮指令
import Hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
 
let Highlight = {};
Highlight.install = function (Vue) {
    // 先有数据再绑定，调用highlight
    Vue.directive('highlight', {
        inserted: function(el) {
            let blocks = el.querySelectorAll('pre code');
            for (let i = 0; i < blocks.length; i++) {
                const item = blocks[i];
                Hljs.highlightBlock(item);
            }
        }
    })
};
 
export default Highlight;