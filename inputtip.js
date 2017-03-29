/**
 
 @Name : input输入提示气泡插件
 @Author: 蔡双临
 @Date: 2017-4-1
 @QQ邮箱: 570255067@qq.com
 @Site：http://github.linxianshen.io
 
 */

;
(function() {
    function InputTip(el) {
        this.el = el;
        this.createTipDiv();
    }

    InputTip.prototype.createTipDiv = function() {
        let self = this;
        let elem = document.createElement("div");
        elem.id = 'tipwrap';
        elem.style = 'position: absolute;color: black;top:' + (self.el.offsetTop - self.el.clientHeight - 14) + 'px;left:' + self.el.offsetLeft + 'px;';
        elem.hidden = true;   //begin hidden
        elem.innerHTML = "<div id='rect' style='background: #eee;border-radius: 4px;padding: 4px;font-size:" + (self.el.size + 2) +"px;height:" + self.el.clientHeight + "px;min-width:" + self.el.clientWidth + "px;'></div><span id='triangle' style='display: block;margin-left:" + (self.el.clientWidth/10) + "px;width: 0;height: 0;border-left: 5px solid transparent;border-right: 5px solid transparent;border-top: 5px solid #eee;'></span>";
        self.el.parentElement.appendChild(elem);
        self.el.addEventListener('focus', function() {
            if(self.el.value){
                elem.hidden = false;
            }
        });
        self.el.addEventListener('blur', function() {
            elem.hidden = true;
        });
        self.el.addEventListener('keyup', function() {
            self.textShowRealTime(elem);   //实时显示
        });
    }

    InputTip.prototype.textShowRealTime = function(elem){
        let self = this;
        let tipNode = document.getElementById("triangle");
        if(self.el.value){
            elem.hidden = false;
        }else{
            elem.hidden = true;
        }
        elem.children[0].innerHTML = self.el.value;
    }

    var tipInput = function(params) {
        if(params.el.tagName == 'INPUT' && params.el.type == 'text'){   //判断元素是否为input text的
            new InputTip(params.el);
        }
        return;
    }

    // open to the world.
    // commonjs
    if (typeof exports === 'object') {
        module.exports = tipInput;
    }
    // AMD module
    else if (typeof define === 'function' && define.amd) {
        define(function() {
            return tipInput;
        });
    }
    // 浏览器window对象
    else {
        window.tipInput = tipInput;
    }

})();
