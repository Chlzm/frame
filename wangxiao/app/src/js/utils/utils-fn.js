import 'layerApp';
import 'layerAppCss';
import {DEST_PROD,FREE_PROD,MIN_PROD,PACKAGE_PROD} from './utils-key'

export function message(txt,time=2000){
	layerApp.open({
        content: txt,
        skin: 'msg',
        time: time
    });
}

export function confirm(option={}){
	layerApp.open(Object.assign({
		 content:''
        ,btn: ['确定', '取消']
	},option));
}

export function alert(msg){
	layerApp.open({
		 content:msg
        ,btn: ['确定']
	});
}


export function parse_url(url) {
    var pattern = /(\w+)=([^\#&]*)/ig;
    var parames = {};
    url.replace(pattern, function (attr, key, value) {
        parames[key] = decodeURIComponent(value);
    });
    return parames;
};

export function num2type(num){
	switch (num) {
		case 5:
			return '豪华型/五钻'
			break;
		case 4:
			return '高档型/四钻'
			break;
		case 3:
			return '舒适型/三钻'
			break;
		default:
			return '经济型/二钻'
	}
}

export function reachBottom(){
	let re;
	if (document.compatMode === "CSS1Compat") {
		re = document.documentElement.scrollHeight - (document.documentElement.scrollTop + document.body.scrollTop) - document.documentElement.clientHeight;
	} else {
		re = document.body.scrollHeight - document.body.scrollTop - document.body.clientHeight;
	};
	return re;
}

//获取床型
export function getBedType(type){
	let bedType=['','大床','双床','单人床','多床','大床/双床','圆床','榻榻米','水床'];
	return bedType[type]||'';
}
//获取早餐类型
export function getBreackfastType(type) {
	let types=['无早','单早','双早','三早','四早'];
	return types[type]||'';
}
//解析productKey获取儿童成人数量
export function getProductKeyInfo(productKey,productType){
	let reg=/([0-9]+)_([0-9]+)$/;
	let strs=productKey.match(reg)||[];
	return {
		adultNum:strs[1]*1||0,//成人人数
		childrenNum:DEST_PROD==productType?0:(strs[2]*1||0)//儿童人数,目的地儿童0
	}
}
//判断是否是儿童
export function isChild(birthday,relativeDate){
	var year=birthday.getFullYear(),
		month=birthday.getMonth(),
		day=birthday.getDate(),
		nowDate=relativeDate?new Date(relativeDate):new Date(),
		nowYear=nowDate.getFullYear(),
		nowMonth=nowDate.getMonth(),
		nowDay=nowDate.getDate(),
		initDate=new Date(nowYear,nowMonth,nowDay);
	return (new Date(year+12,month,day)-initDate>0)&&(new Date(year+2,month,day)-initDate<=0);
}
//判断是否是成人
export function isAdult(birthday,relativeDate){
	var year=birthday.getFullYear(),
		month=birthday.getMonth(),
		day=birthday.getDate(),
		nowDate=relativeDate?new Date(relativeDate):new Date(),
		nowYear=nowDate.getFullYear(),
		nowMonth=nowDate.getMonth(),
		nowDay=nowDate.getDate(),
		initDate=new Date(nowYear,nowMonth,nowDay);
	return new Date(year+12,month,day)-initDate<=0;
}

//处理乘客信息
export function getName(item){
	var nameEn=item.PassengerNameEN,
		name=item.PassengerName,
		pName='';
	if(name)
		pName=name+' ';
	if(nameEn&&nameEn!='/'){
		pName+=nameEn;
	}
	return pName;
}

//获取套餐标题
export function getPriceTitle(productType,hasTax) {
    let title='';
    if(productType==FREE_PROD) title='自由行套餐';
    else if(productType==DEST_PROD) title='目的地套餐';
    else  if(productType==MIN_PROD) title='小众游套餐';
    else if(productType==PACKAGE_PROD) title='机票套餐';
    return hasTax?`${title}(含税)`:title;
}
 
