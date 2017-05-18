/**
 * Created by 000144 on 2016/11/23.
 */
//公用方法部分

//loading
import * as config from './mod-public-config';
import * as md5 from '../control/md5';
import 'layerPc301';
/**
 * 回到顶部和底部
 * **/
;(function (w, d, j) {
    var $dom = $("<div>", {"class": "return"});
    var returnAry=[];
    //只有订单详情有意见建议
    //if($("body").data("page")=="hotelDetailStatic"||$("body").data("page")=="hotelDetail"){
    returnAry.push('<div id="gotoFeedBack" class="gotoBtn"><a target="_blank" href="http://eb.ceair.com/feedback/pc/index.html"><span>意见建议</span><i class="i_top"></i></a></div>');
    //}
    returnAry.push('<div id="gotoTop" class="gotoBtn"><a href="javascript:;"><span>返回顶部</span><i class="i_top"></i></a></div>');
    returnAry.push('<div id="gotoBottom" class="gotoBtn"><a href="javascript:;"><span>回到底部</span><i class="i_top"></i></a></div>');
    $dom.html(returnAry.join(""));
    var $bodyHtml = $('body, html');
    $('#gotoTop', $dom).click(function () {
        $bodyHtml.stop().animate({
            scrollTop: '0px'
        }, 500);
    });

    $('#gotoBottom', $dom).click(function () {
        $bodyHtml.stop().animate({
            scrollTop: $(document).height() + 'px'
        }, 500);
    });

    $(window).resize(function () {
        resized();
    }).resize();

    $(window).scroll(function () {
        resized();
    });
    function resized() {
        var top = $(window).scrollTop() + 500;
        var _wWidth = $(window).width();
        if (_wWidth > 1280 && top > 560) {
            $dom.stop().animate({right: "0"}, 200);
        } else {
            $dom.stop().animate({right: "-100px"}, 200);
        }
    };
    $("body").append($dom);
})(window, document, jQuery);

;(function () {
    function ajaxLoading() {
        this.pageContent="努力加载中，请稍候...";
    };
    ajaxLoading.prototype.open = function (fng) {
        if(window.loadingMessege&&window.loadingMessege.length>0){
            var messageArr=loadingMessege.split("|");
            var showMsg=messageArr[parseInt(Math.random()*messageArr.length)];
            if(messageArr.length>0){
                this.pageContent=showMsg;
            }
        };
        var sImg = config._CONFIG_[config.__webState].HOST_URL + "images/common/loadingB.gif";
        var dImg = config._CONFIG_[config.__webState].HOST_URL + "images/common/loadingD.gif";
        var options = $.extend(true, {
            target: "body",//容器id
            maskClass: "",
            content: this.pageContent,
            isLoading: true,
            maskStyle: "" //bigLoding为大的loading
        }, fng);
        this.dom = $("<div>", {
            "class": "ajax_loading ajax_loading2 " + options.maskStyle,
            "id": "ajax_loading"
        }).html('<div class="info"><div class="imgArea"><img class="simg" src="' + sImg + '" />' + (options.isLoading ? '<img class="dimg" src="' + dImg + '" />' : '') + '</div></div><div class="tipContent">' + options.content + '</div>');
        options.target != "body" ? this.dom.addClass("absolute") : "";
        $(options.target).append(this.dom);
    };
    ajaxLoading.prototype.remove = function (fng, callback) {
        //this.dom.remove()
        if (fng == "hide") {
            this.dom.remove();
            if (typeof callback !== "undefined") {
                callback();
            }
        } else {
            this.dom.fadeOut(300, function () {
                $(this).remove();
                if (typeof callback !== "undefined") {
                    callback();
                }
            });
        }
    };
    window.AjaxLoading = ajaxLoading;
}());
//页面没有数据显示
;(function () {
    function noData() {
    };
    noData.prototype.commonShow = function (e, box) {
        this.option = $.extend(true, {
            noDataTitle: "很抱歉 !123123123",//指定宽度,默认100%
            noDataTip: "没有找到符合您产品，请重新搜索！",//指定高度,默认500
            btnShow: false, //是否显示按钮
            btnText: "返回首页", //按钮文本
            btnUrl: null //按钮链接
        }, e);
        var _this = this;
        var noDataHtmlCommon = '<div class="noData">';
        noDataHtmlCommon += '<div class="noDataImg"></div>';
        noDataHtmlCommon += '<div class="noDataTitle">&nbsp;' + _this.option.noDataTitle + '</div>';
        noDataHtmlCommon += '<div class="noDataTip">' + _this.option.noDataTip + '</div>';
        if (_this.option.btnShow) {
            if (_this.option.btnUrl) {
                noDataHtmlCommon += '<div class="noDataBtn"><a class="blueBtn" href="' + _this.option.btnUrl + '">';
            } else {
                noDataHtmlCommon += '<div class="noDataBtn"><a class="blueBtn">';
            }
            noDataHtmlCommon += _this.option.btnText;
            noDataHtmlCommon += '</a></div>';
        }
        noDataHtmlCommon += '</div>';
        $(box).html(noDataHtmlCommon);
        if (typeof _this.option.showInt == "function") {
            _this.option.showInt();
        }
    };
    window.noDataShow = noData;
}());

var show_live = function () {
    var sBody = $(this).parents("li").find("ol");
    if (sBody.is(':visible')) {
        sBody.slideUp("normal");
        $(this).find("mark.arrow-order-down").removeClass("active");
    } else {
        sBody.slideDown("normal");
        $(this).find("mark.arrow-order-down").addClass("active");
    }
};
$('body').undelegate('#myceair .menu li b', 'clcik');
$('body').delegate('#myceair .menu li b', 'click', show_live);

//时间转换
var dataOption = {
    timestamp: function (e) {//获取时间戳
        if (e) {
            var dateStart = e;
            if (!Date.parse(dateStart)) { //ie8及以下不支持1920-02-01的Dat
                dateStart = new Date(e.replace("-", "/").replace("-", "/"));
            }
            var timestamp2 = Date.parse(dateStart);
            timestamp2 = timestamp2 / 1000;
            return timestamp2;
        }
        else {
            return null;
        }
    },
    DateFormat:function(dateStr){
        if (!dateStr) {
            return null;
        }
        var dt = dateStr.split(/[^0-9]/);
        var timestamp2 = new Date(dt[0],dt[1]-1,dt[2],0,0,0);
        timestamp2 = timestamp2 / 1000;
        return timestamp2;
    },
    timestampToData: function (e, midSign) { //获取年月日 midSign 中间符号
        midSign = midSign ? midSign : "-";
        var dateStart = new Date(e * 1000);
        var month = dateStart.getMonth() + 1, date = dateStart.getDate();
        if (month < 10) {
            month = "0" + month;
        }
        ;
        if (date < 10) {
            date = "0" + date;
        }
        return dateStart.getFullYear() + midSign + month + midSign + date;
    },
    getTime: function (e) {//获取时分
        var e = dataOption.timestamp(e);
        var dateStart = new Date(e * 1000);
        var hours = parseInt(dateStart.getHours()), minites = parseInt(dateStart.getMinutes());
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minites < 10) {
            minites = "0" + minites;
        }
        return hours + ':' + minites;
    },
    timestampToTime: function (e) {//获取时分
        var dateStart = new Date(e * 1000);
        var hours = parseInt(dateStart.getHours()), minites = parseInt(dateStart.getMinutes());
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minites < 10) {
            minites = "0" + minites;
        }
        return hours + ':' + minites;
    },
    getMonthDay: function (e) { //获取月日
        var e = dataOption.timestamp(e);
        var dateStart = new Date(e * 1000);
        var month = dateStart.getMonth() + 1, date = dateStart.getDate();
        if (month < 10) {
            month = "0" + month;
        }
        ;
        if (date < 10) {
            date = "0" + date;
        }
        return month + '月' + date + '日';
    },
    getYearMonth: function (e, addMonth) { //获取年月
        var addMonth = addMonth ? addMonth : 0;
        var e = dataOption.timestamp(e);
        var dateStart = new Date(e * 1000);
        var month = dateStart.getMonth() + 1, date = dateStart.getDate();
        var year = dateStart.getFullYear();
        var realMonth = month + addMonth;
        if (realMonth > 12) {
            realMonth = realMonth - 12;
            year = year + 1;
        } else if (realMonth < 1) {
            realMonth = 12 + realMonth;
            year = year - 1;
        }
        if (realMonth < 10) {
            realMonth = "0" + realMonth;
        }
        return year + '-' + realMonth;
    },
    getYearMonthDay: function (e) { //获取年月日
        var e = dataOption.timestamp(e);
        return dataOption.timestampToData(e);
    },
    addYear: function (e, n) {
        var e = new Date(e);
        e.setFullYear(e.getFullYear() + n);
        return e;
    },
    addPlusTime: function (e, dotype, miniteNum) {
        var curTime = dataOption.timestamp(new Date());
        if (miniteNum < 0) {
            alert("加减分钟不能为负数");
            return;
        }
        var myDate = {};
        var e = dataOption.timestamp(e) * 1000;
        var ms = miniteNum * 60 * 1000;
        var re_ms;
        if (dotype == "add") {
            re_ms = (e + ms) / 1000;
        }
        else if (dotype == "plus") {
            re_ms = (e - ms) / 1000;
            if (curTime > re_ms) {
                re_ms = curTime + 60 * 60;
            }
        }
        var dateStart = new Date(re_ms * 1000);
        myDate.date = dataOption.timestampToData(re_ms);
        myDate.time = dataOption.timestampToTime(re_ms);
        myDate.hours = parseInt(dateStart.getHours());
        if (dotype == "add") {
            myDate.minites = Math.ceil(dateStart.getMinutes() / 10) * 10;
            var plusValue = (myDate.minites - dateStart.getMinutes()) * 60;
            plusValue = plusValue + re_ms;
            var dateStatrt02 = new Date(plusValue * 1000);
            myDate.date = dataOption.timestampToData(plusValue);
            myDate.time = dataOption.timestampToTime(plusValue);
            myDate.hours = parseInt(dateStatrt02.getHours());
            myDate.minites = parseInt(dateStatrt02.getMinutes() / 10) * 10;
        }
        else if (dotype == "plus") {
            myDate.minites = parseInt(dateStart.getMinutes() / 10) * 10;

        }
        return myDate;
    },
    getFlyingTime: function (date1) {//根据分钟数计算成时分
        var returnTime = "";
        if (date1 && date1 > 0) {
            var hours = parseInt(date1 / 60);
            var minites = parseInt(date1 % 60);
            hours = hours == 0 ? '' : (hours + "小时");
            minites = minites == 0 ? '' : (minites + "分钟");
            returnTime = hours + minites;
        }
        return returnTime;
    },
    getFlyingPlusTime: function (date1, date2, isInter) {//根据毫秒时间差计算成时分
        if (isInter) {
            return "";
        }
        var flyingTime = date2 - date1;
        if (flyingTime < 0) {
            return '';
        } else {
            var hours = Math.floor(flyingTime / (60 * 1000 * 60));
            var minites = (flyingTime - hours * 60 * 1000 * 60) / (1000 * 60);
            hours = hours == 0 ? '' : (hours + "小时");
            minites = minites == 0 ? '' : (minites + "分钟");
            return hours + minites;
        }
    },
    textReplace: function (text) {
        if (!text) {
            return "";
        }
        else {
            var reg = new RegExp(" ", "g");
            var str = text.replace(reg, "&nbsp;");
            var reg1 = new RegExp("\n", "g");
            str = text.replace(reg1, "<br />");
            return encodeURI(str);
        }
    },
    getHotelNightDay: function (date1, date2) {//获取客户住酒店的晚数
        var hotelStart = new Date(date1.toString().replace(/\-/g, "/"));
        var hotelEnd = new Date(date2.toString().replace(/\-/g, "/"));
        var iNight = parseInt(Math.abs(hotelEnd - hotelStart) / 1000 / 60 / 60 / 24);
        return iNight;
    }
}
window.dataOption = dataOption;

export var cookieFun = {
    //写cookies
    setCookie: function (name, value, Days) {
        var exp = new Date();
        var expires="";
        if(Days){
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
            expires=";expires=" + exp.toGMTString();
        }
        document.cookie = name + "=" + encodeURIComponent(value) + expires + ";path=/";
    },
    getCookie: function (name) {
        var strCookie = document.cookie;
        var arrCookie = strCookie.split("; ");
        for (var i = 0; i < arrCookie.length; i++) {
            var arr = arrCookie[i].split("=");
            if (arr[0] == name) {
                return decodeURIComponent(arr[1]);
            }
        }
        return null;
    },
    delCookie: function (name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = cookieFun.getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString()+";path=/";
    }
}

//默认无图片处理
export function isNullImg(img) {
    var def = _CONFIG_.searchDef;
    if (img != null) {
        var defimg = img.match(/(\.(\w+))$/);
        if (defimg == null) {
            return def;
        } else if (defimg[2].length > 0) {
            return img;
        } else {
            return def;
        }
    } else {
        return def;
    }
}

//下拉菜单
function selectdownList() {
    $('.selectModel .select').off("click").on("click", function () {
        $('.selectModel .downList').not($(this).siblings('.downList')).hide();
        if ($(this).siblings('.downList').is(":hidden")) {
            $(this).siblings('.downList').slideDown('fast');
        }
        else {
            $(this).siblings('.downList').slideUp('fast');
        }
    })
    $('.selectModel .downList li').off("click").on("click", function () {
        if ($(this).hasClass("disabled")) {
            return;
        }
        var liParent = $(this).parent();
        var valueBox = liParent.siblings('input[type=hidden]');
        var valueShow = liParent.siblings('.select');
        valueBox.val(this.getAttribute('value'));
        valueShow.text($(this).text());
        valueShow.val($(this).val());
        liParent.hide();
    })
    $("body").on("click", function (e) {
        var tar = e.srcElement || e.target;
        if ($(tar).hasClass("selectModel") || $(tar).parents().is(".selectModel") || $(tar).parents().is(".downList")) {
        } else {
            $('.selectModel .downList').hide();
        }
    });
}
window.selectdownList = selectdownList;

//页面未登录跳转curHref为当前页面地址
function LoginJump(curHref) {
    window.location.href = config._CONFIG_[config.__webState].login + encodeURIComponent(curHref);
}
window.LoginJump = LoginJump;

//图片懒加载
;(function ($) {
    $.fn.extend({
        lazyload: function (Options) {
            var gThis = $(this),
                win = $(window),

                throttle = function (fn, delay) {    //函数节流，【执行函数，延迟时间】
                    var timer,
                        startTime = new Date();

                    return function () {
                        clearTimeout(timer);

                        if (!delay && new Date() - startTime > 100) {    //没有延迟，并判断延迟滚动时间的必须的时间
                            startTime = new Date();
                            fn()

                        } else if (delay) {
                            timer = setTimeout(function () {
                                startTime = new Date();
                                fn()
                            }, delay)
                        }
                    }
                },

                settings = $.extend({
                    effect: 'fadeIn',
                    fadeTime: 300,
                    delay: 200,
                    range:new Date().getTime()
                }, Options);

            loading();    //开始便加载已经出现在可视区的图片
            win.on('scroll.lazyload'+settings.range, throttle(loading, settings.delay));

            function loading() {
                if (!gThis.length) return win.off('scroll.lazyload'+settings.range);    //当所有的图片都加载完，移除窗口滚动事件

                gThis.each(function () {
                    var _this = $(this),
                        top = win.scrollTop(),
                        imgTop = _this.offset().top,
                        imgHeight = _this.outerHeight(true);

                    if (top + win.height() > imgTop && imgTop + imgHeight > top) {
                        gThis = gThis.not(_this);    //删除jQuery选择好的元素集合中已经被加载的图片元素

                        var dSrc = _this.attr('data-src');
                        // console.log(dSrc);
                        $(new Image()).prop('src', dSrc).load(function () {    //替换图片URL
                            _this.attr('src', dSrc);
                            _this.removeAttr('data-src');
                            settings.effect == 'fadeIn' && _this.css('opacity', 0).animate({opacity: 1}, settings.fadeTime)
                        })
                    }
                })
            }

            return $(this)
        }
    })
})(jQuery);

//ajax 通用方法
/**
 * Ajax通用方法
 * @param {object} option
 * @param {function} success
 * @param {function} error
 */
window.layerIndex = -1;
export function ajax(option, success, error) {
    let _this = this;
    if (option.loading != false) {
        layerIndex = layer.load(1, {
            shade: [0.3, '#000']
        });
    }
    $.ajax($.extend({
        "type": "get",
        "async": true,
        "case": false,
        "dataType": "json",
        "complete": function () {
            if (option.loading != false) {
                layer.close(layerIndex);
            }
            option.remove && option.remove();
        },
        "error": function (err) {
            layer.msg("服务器出了点小问题，请稍后再试。");
        }
    }, option)).success(function (result) {
        if (result.Code != undefined) {
            switch (result.Code) {
                case 200:
                    success && success(result.Data, result);
                    break;
                case 400:
                    error && error(result.Data, result);
                    break;
                case 401:
                    let url = window.location.href;
                    LoginJump(url);
                    break;
                default :
                    layer.msg(result.Message);
            }
        }
    });
}

//首付游公用数据及方法
export let stagesData = {
    dataText: "<h3><b>使用条件说明:</b></h3><p> 1.18-55岁的中国大陆公民可以使用</p><p> 2.购买人必须为出行人之一</p><p>3.出行人数及订单额度根据用户的信用状况调整</p><p>4.支付时无需注册，秒级审核</p><p>5.用户可选择3、6、12期分期付款</p><p>6.本服务由信用飞|京东金融提供</p><p>以上文本仅供参考，具体以产品提供为准</p>",
    stagesHTML: function (price) {
        var stagesLowPrice = parseInt(price / 12);
        return '仅需首付<span class="price"><i>￥</i><em class="num">' + stagesLowPrice + '</em></span><em class="tooptip" data-trigger="hover" id="ga_pcjselect_icon" data-class="newStyle" data-place="top" data-bottom="40px" data-right="" data-width="370px" data-text="' + this.dataText + '"></em>'
    }
};
//html转义
export function html_decode(str) {
    var s = "";
    if (str) {
        if (str.length == 0) return "";
        s = str.replace(/&amp;/g, "&");
        s = s.replace(/&lt;/g, "<");
        s = s.replace(/&gt;/g, ">");
        s = s.replace(/&nbsp;/g, " ");
        s = s.replace(/&#39;/g, "\'");
        s = s.replace(/&quot;/g, "\"");
        s = s.replace(/<br\s?\/?>/g, "\n");
        s = s.replace(/<\/?p>/g, " ");
        s = s.replace(/<b>/g, "【");
        s = s.replace(/<\/b>/g, "】");
    }
    return s;
}
//产品详情页页面跳转
function DetailJump(produceID) {
    if (config._CONFIG_[config.__webState].staticDetail) {
        return config._CONFIG_[config.__webState].travelDetail + produceID + ".html";
    }
    else {
        return config._CONFIG_[config.__webState].travelDetail + "?ProductID=" + produceID;
    }
}
window.DetailJump = DetailJump;

//标签提示
export function layerTips(obj,tips,time){
    let mytips=tips||1;
    let mytime=time||8000;
    $(obj).hover(function () {
        layer.tips(decodeURI($(this).attr("data-text")), this,{tips:mytips,time:mytime}); //在元素的事件回调体中，follow直接赋予this即可
    },function () {
        layer.closeAll();
    })
};
//根据URL得到想对应的旅游类型
function parse_url_my(url) {
    var pattern = /(\w+)=([^\#&]*)/ig;
    var parames = {};
    url.replace(pattern, function (attr, key, value) {
        parames[key] = value;
    });
    return parames;
}
window.parse_url_my=parse_url_my;
//渠道号设置cookie
function setChannel() {
    var locationHref = window.location.href;
    var paramArray = parse_url_my(locationHref);
    var channelNum = $.trim(paramArray['c']);
    var tracking_id = $.trim(paramArray['tracking_id']);
    var u_id = $.trim(paramArray['u_id']);
    var target_url = $.trim(paramArray['target_url']);
    var tracking_code = $.trim(paramArray['tracking_code']);
    var OutsideChanne = $.trim(paramArray['D']);
    if (channelNum) {
        cookieFun.setCookie("channel",channelNum);
        cookieFun.setCookie("tracking_id",tracking_id);
        cookieFun.setCookie("u_id",u_id);
        cookieFun.setCookie("target_url",target_url);
        cookieFun.setCookie("tracking_code",tracking_code);
    }
    if(OutsideChanne){
        if(!cookieFun.getCookie("OutsideSaleChannelCode")){
            cookieFun.setCookie("OutsideSaleChannelCode",OutsideChanne,30);//新增D渠道号
        }
    }
}
window.setChannel=setChannel;
//手机打开跳转APP
function detectUserAgent(url, params) {
    var userAgent = window.navigator.userAgent.toLowerCase();
    var flag;
    if (userAgent.match(/iphone/i) == 'iphone' || userAgent.match(/ipod/i) == 'ipod') {
        flag = 'app';
    } else if (userAgent.match(/android/i) == 'android') {
        flag = 'app';
    } else if (userAgent.match(/micromessenger/i) == 'micromessenger') {
        flag = 'app';
    } else {
        flag = 'pc';
    }
    //url跳转
    if (flag == 'app') {
        if (!params) {
            window.location.href = url;
        } else {
            window.location.href = url + '?ProductID=' + params.id;
        }
    }
}
window.detectUserAgent=detectUserAgent;
//获取url参数
function parseCommonurl(url){
    var pattern = /(\w+)=([^\#&]*)/ig;
    var parames = {};
    url.replace(pattern, function(attr, key, value){
        parames[key] = decodeURI(value);
    });
    return parames;
}
window.parseCommonurl=parseCommonurl;
window.parseUrl = function parseUrl(url) {
    var r = {
        protocol: /([^\/]+:)\/\/(.*)/i,
        host: /(^[^\:\/]+)((?:\/|:|$)?.*)/,
        port: /\:?([^\/]*)(\/?.*)/,
        pathname: /([^\?#]+)(\??[^#]*)(#?.*)/
    };
    var tmp, res = {};
    res["href"] = url;
    for (var p in r) {
        tmp = r[p].exec(url);
        res[p] = tmp[1];
        url = tmp[2];
        if (url === "") {
            url = "/";
        }
        if (p === "pathname") {
            res["pathname"] = tmp[1];
            res["search"] = tmp[2];
            res["hash"] = tmp[3];
        }
    }
    return res;
};
function GetUserLoginInfo(curHref,callBack){
    cookieFun.setCookie("jumpIco","playHappy");
    var key="f79c8b5002e9c99207fcd6827f5f5c93";//力行提供
    $.ajax({
        type: "post",
        xhrFields: {
            withCredentials: true
        },
        url: config.API.baseUrl +"common/ceairuser/user/GetUserLoginInfo",
        async: true,
        dataType: "json",
        success: function (data){
            if(data.ReturnCode=="004"){
                var urlHost = parseUrl(window.location),urlOrigin = urlHost.protocol +"//"  +urlHost.host+":" +urlHost.port;
                var homeUrl=config._CONFIG_[config.__webState].travelIndex;
                if(homeUrl.indexOf("http")==-1){
                    homeUrl=urlOrigin+homeUrl;
                }
                $("#playHappy").attr("href",config._CONFIG_[config.__webState].login + encodeURIComponent(homeUrl+"?from=playHappy"));
            }
            else{
                var ouid = md5.hex_md5(data.ReturnContent.Ouid+key);
                var nickName = encodeURI(encodeURI(data.ReturnContent.Name));
                var jumpHref =curHref+"?userCode="+data.ReturnContent.Ouid+"&sign="+ouid+"&nickName="+nickName+"&redirect=location.ceair.com";
                cookieFun.delCookie("jumpIco");
                $("#playHappy").attr("href",jumpHref);
            }
            if(typeof callBack=="function"){
                callBack();
            }
        },
        error:function(e){
        }
    })

}
//跳转当地玩乐页面
function playHappyInt(){
    var locationHref = window.location.href;
    var curHref= "http://ceair.lixing.biz/tcas/third/login.sb";
    var myForm = parseCommonurl(locationHref);
    if(myForm.from&&cookieFun.getCookie("jumpIco")){
        var loading = new AjaxLoading();
        loading.open({"maskClass": "hide"});
        GetUserLoginInfo(curHref,function(){
            window.location.href=$("#playHappy").attr("href");
        });
    }else{
        GetUserLoginInfo(curHref,function(){
            if(myForm.c&&myForm.c=="70116"){
                window.location.href=$("#playHappy").attr("href");
            }
        });
    }
}
window.playHappyInt=playHappyInt;

//js去掉所有html标记的函数
function delHtmlTag(str) {
    if (str) {
        return str.replace(/<[^>]+>/g, "");//去掉所有的html标记
    }
}
window.delHtmlTag=delHtmlTag;