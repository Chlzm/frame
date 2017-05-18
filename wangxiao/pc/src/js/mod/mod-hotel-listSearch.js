/**
 * Created by Alan(000058) on 2017/01/03.
 * Email: 1480801@qq.com
 */
import {searchPrice,searchStar,searchBrand} from './mod-public-template';

export default class search{
    constructor(...param){
        $.extend(this,...param);
        this.loading=new AjaxLoading();//实例化加载
        this.queryData();
        this.selectedHandle();
    }

    /**
     *   获取查询条件数据
     */
    queryData(){
        this.props.filterMore.empty();
        this.loading.open({"maskClass": "hide","target":this.props.filterMore});
        this.ajax({
            url: this.props.config.API.baseUrl + this.props.config.API.hotel.filterMore + this.props.query.CityCode,
            loading:false,
            remove:()=>{
                this.loading.remove();
            }
        },data => {
            this.props.filterMore.find('>.filterItem').remove();
            data.map((k,n)=>{
                let condition = [];
                switch (k.ConditionTypeName){
                    case "价格":
                        condition = $(searchPrice({keyName:k.ConditionTypeName, data:k.SubQueryConditionList[0].ConditionItemList}));
                        this.bindHandle(condition, "Price");
                        break;
                    case "钻级":
                        condition = $(searchStar({keyName:k.ConditionTypeName, data:k.SubQueryConditionList[0].ConditionItemList}));
                        this.bindHandle(condition, "Star");
                        break;
                    case "品牌":
                        condition = $(searchBrand({keyName:k.ConditionTypeName, data:k.SubQueryConditionList}));
                        this.bindHandle(condition, "Brand");
                        break;
                }

                this.props.filterMore.append(condition);
            });
            this.checkMore(this.props.filterMore);
        });
    }

    /**
     * 搜索列表事件绑定
     * @param element
     * @param type
     */
    bindHandle(element, type){
        let tmpValue = new Array(),tmpText = new Array(), that = this;
        element.on('click','.checkboxGroup li:not(.customPrice)',function(){
            let value = $(this).data("value"),
                text = $(this).text(),
                index = $(this).index();
            if($(this).hasClass('not')){
                if($(this).hasClass('checked')) return;
                $(this).addClass('checked').siblings('li').removeClass('checked');
                tmpValue.length = 0;
                tmpText.length = 0;
            }else if($(this).hasClass('checked') && !$(this).hasClass('not')){
                $(this).removeClass('checked');
                !element.find('.checkboxGroup li.checked').length && element.find('.checkboxGroup li.not').addClass('checked');
                tmpValue.map((k,n)=>{
                    if(k == value){
                        tmpValue.splice(n,1);
                        tmpText.splice(n,1);
                    }
                   return false;
                });
            }else{
                if(/^z/i.test(tmpValue[0])) {
                    that.setChecked('clear', 'Price');
                    tmpValue.length = 0;
                    tmpText.length = 0;
                    that.props.setQuery(type, false, [], [])
                }
                $(this).addClass('checked').siblings('li.not').removeClass('checked');
                tmpValue.push(value);
                tmpText.push(text);
                if($(this).parent().hasClass('checkboxGroup')){
                    $(this).parent().parent().prev('.tabGroup').find('li').eq($(this).parent().index()+1).addClass('checked').siblings('li').removeClass('checked');
                }
            }

            if(type == 'Price') {
                let min = element.find('input[name=min]'),
                    max = element.find('input[name=max]');
                min.val('');
                max.val('');
            }
            that.props.setQuery(type, true, tmpValue, tmpText)
        }).on('click','.tabGroup li',function(){
            let value = $(this).data("value"),
                text = $(this).text(),
                index = $(this).index();
            if($(this).hasClass('not')) {
                tmpValue.length = 0;
                tmpText.length = 0;
                if($(this).parent().hasClass('tabGroup')){
                    $(this).parent().next('.tabItems').find('li.checked').removeClass('checked');
                }
                that.props.setQuery(type, true, tmpValue, tmpText)
            }else if(!$(this).hasClass('checked')){
                $(this).parent().next('.tabItems').find('.checkboxGroup').eq(index-1).addClass('show').siblings().removeClass('show');
            }
            that.checkMore(element);
            $(this).addClass('checked').siblings('li').removeClass('checked');
        });
        if(type == 'Price') {
            let min = element.find('input[name=min]'),
                max = element.find('input[name=max]');
            element.on('click','.confirm',function(){
                if(min.val()=='' && max.val()==''){
                    return ;
                }
                that.setChecked('clear', 'Price');
                tmpValue.length = 0;
                tmpText.length = 0;
                if((min.val()!='' && !/^[0-9]*$/gi.test(min.val()))||(max.val()!='' && !/^[0-9]*$/gi.test(max.val()))){
                    layer.open({
                        content:"请输入正确的价格区间数值."
                    });
                    return;
                }
                if(min.val()=='' && max.val()!=''){
                    tmpValue.push('z0-'+max.val());
                    tmpText.push('￥0-'+max.val());
                }else if(min.val()!='' && max.val()==''){
                    tmpValue.push('z'+min.val()+'-');
                    tmpText.push('￥'+min.val()+'以上');
                }else if(min.val()!='' && max.val()!=''){
                    if(min.val() >= max.val()){
                        max.val('');
                    }
                    tmpValue.push('z'+min.val()+'-'+max.val());
                    tmpText.push('￥'+min.val()+(min.val() < max.val()?('-'+ max.val()):'以上'));
                }
                that.props.setQuery(type, true, tmpValue, tmpText);
                element.find('li.not.checked').removeClass('checked')
            }).on('click','.cancel',function(){
                element.find('.checkboxGroup li.not').addClass('checked');
                min.val('');
                max.val('');
                tmpValue.length = 0;
                tmpText.length = 0;
                that.props.setQuery(type, false, [], []);
                that.setChecked('clear', 'Price');
                that.props.setQuery(type, true, tmpValue, tmpText);
            });
        }else if(type == 'Brand'){
            element.on('click','.moreBrand',function(){
                if($(this).hasClass('open')) {
                    $(this).removeClass('open').prevAll().removeAttr('style');
                }else{
                    $(this).addClass('open').prevAll().css('height', 'auto');
                }
            });
        }

        that.props.filterSelected.on('click','.clearAll',function(){
            tmpValue.length = 0;
            tmpText.length = 0;
        });
    }

    checkMore(element){
        if(element.find('.tabItems>.show>.checkbox').size()>14){
            element.find('.moreBrand').show();
        }else{
            element.find('.moreBrand').hide();
        }
    }
    /**
     * 选中数据渲染
     */
    selectedDom(){
        let querySelected = this.props.queryShow,
            label = [];
        this.props.filterSelected.find('label').remove();
        for(var k in querySelected){
            querySelected[k].map((item,n)=>{
                label.push(`<label>${item}<em data-key="${k}" data-text="${item}">×</em></label>`);
            });
        }
        if(label.length) {
            label.push('<span class="clearAll">清除全部</span>');
        }
        this.props.filterSelected.html(label);
    }

    /**
     * 绑定选中事件操作
     */
    selectedHandle(){
        let that = this,
            query = that.props.query,
            queryShow = that.props.queryShow;
        that.props.filterSelected.on('click','label>em',function(){
            let key = $(this).attr('data-key'),
                text = $(this).attr('data-text');
            queryShow[key].map((k,n)=>{
                if(k == text){
                    query[key].splice(n,1);
                    queryShow[key].splice(n,1);
                    that.props.setQuery(key, true, query[key],queryShow[key]);
                }
                return false;
            });
            that.setChecked(key,text);
        }).on('click','.clearAll',function(){
            that.props.setQuery('Price',false,[],[]);
            that.props.setQuery('Star',false,[],[]);
            that.props.setQuery('Brand',true,[],[]);
            that.setChecked('clearAll');
        });
    }

    /**
     * 设置选中状态
     * @param key
     * @param text
     */
    setChecked(key,text){
        let wrapper = this.props.filterMore;
        if(key == 'clearAll') {
            wrapper.find('.checked').removeClass('checked');
            wrapper.find('.not').addClass('checked');
            wrapper.find('input').val('');
        }else if(key == 'clear'){
            wrapper.find('[key='+text+'] .checkbox.checked').each(function(){
                $(this).removeClass('checked');
            });
        }else{
            wrapper.find('[key='+key+'] .checkbox.checked').each(function(){
                if($(this).text() == text){
                    $(this).removeClass('checked');
                    return false;
                }
            });
        }
        if(key == 'Price'){
            wrapper.find('[key='+key+'] input').val('');
            wrapper.find('.not').addClass('checked');
        }
    }
}