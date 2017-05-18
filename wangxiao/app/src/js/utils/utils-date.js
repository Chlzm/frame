//日期转换为时间戳
export function formatToTime(date,divisor=1000){	
    if(date==undefined)
        return;
    else if(typeof date=='number')
        return Math.floor(date/divisor);
    else if(typeof date=='string'){
        var strs=date.split(/[^0-9]/);
        return Math.floor(+new Date(strs[0]||0,(strs[1]||0)-1,strs[2]||0,strs[3]||0,strs[4]||0,strs[5]||0)/divisor);
    }else if(Date.prototype.isPrototypeOf(date)){
        return Math.floor(+date/divisor);
    }			
}
//字符串转换为Date对象
export function formatToDate(date){	
    return new Date(formatToTime(date,1));		
}      

//时分秒清零
export function initTime(date){
    if(!date)return date;
    if(typeof date=='number'||typeof date=='string')
        date=new formatToDate(date);			
    var year=date.getFullYear();
    var month=date.getMonth();
    var day=date.getDate();
    return new Date(year,month,day);
} 
//比较天数
export function compareDay(startDate,endDate){
    startDate=initTime(startDate);
    endDate=initTime(endDate);
    var days = endDate.getTime() - startDate.getTime();
    var day = parseInt(days / (1000 * 60 * 60 * 24));
    return day;
}

export function compareYear(startDate,endDate){
    startDate=initTime(startDate);
    endDate=initTime(endDate);
    var times = endDate.getTime() - startDate.getTime();
    var year = parseInt(times / (1000 * 60 * 60 * 24 * 365));
    return year;
}

// 比较两个时间点相差时间 天时分  参数为毫秒
export function compareHours(startDate,endDate){

    var surplusDate = endDate - startDate
    //计算出相差天数
    var days=Math.floor(surplusDate/(24*3600*1000))
     
    //计算出小时数
    var leave1=surplusDate%(24*3600*1000)    //计算天数后剩余的毫秒数
    var hours=Math.floor(leave1/(3600*1000))
    //计算相差分钟数
    var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
    var minutes=Math.floor(leave2/(60*1000))
    return (days ? days + 'd' : '') + (hours ? hours +'h' : '') + (minutes ? minutes + 'm' : '')
}

//获取时间picker数据
export function getDatePickerCollection(startDate,endDate,formatTypes=['yyyy年','MM月','dd日']){
	let minMonth=startDate.getMonth();
    let minDate=startDate.getDate();
    let maxMonth=endDate.getMonth();
    let maxDate=endDate.getDate();
    let startYear=startDate.getFullYear();
    let endYear=endDate.getFullYear();
    let minYear=startYear;
    let maxYear=endYear;
   
    let collection=[];
    while(startYear<=endYear){
        let value=startYear;
        let label=formatTypes[0].replace(/y+/,value);
        let children=getMonthCollection(startYear);
        if(children.length>0){
            collection.push({
                value,
                label,
                children
            })
        }
        startYear++;
    }

    return collection;

    function getMonthCollection(year){
        let monthCollection=[];
        for(let i=0;i<12;i++){
            if(!(year==minYear&&i<minMonth||year==maxYear&&i>minMonth)){
                let month=(i+1)+'';
                let label=formatTypes[1].replace(/M+/,month.length==1?("0"+ month):month)
                let children=getDateCollection(year,i);
                if(children.length>0){
                    monthCollection.push({
                        value:i,
                        label,
                        children
                    })
                }
                
            }
        }

        return monthCollection;
    }

    function getDateCollection(year,month){
        let dateCollection=[];
        let dayCount= new Date(+new Date(year,month+1,1)-1000).getDate();
        for(let i=1;i<=dayCount;i++){
            if(!(year==minYear&&month==minMonth&&i<minDate||year==maxYear&&month==maxMonth&&i>maxDate)){
                let date=i+'';
                let label=formatTypes[2].replace(/d+/,date.length==1?("0"+ date):date);
                dateCollection.push({
                    value:i,
                    label
                })
            }
        }

        return dateCollection;
    }

}