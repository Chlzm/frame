import BaseFetch from 'BaseFetch'
import app from './app'
import {getCookie} from 'cookieUtils'
import {message} from './utils-fn'
let lodingNode=null;
class Fetch extends BaseFetch{
	constructor(...args){
		super(...args)
	}

	checkCode(response){
		//可以根据后端返回的code 进行处理
		switch(response.Code*1){
			case 4://code=401代表未登录，调用登陆方法
				this.login(response);
				return Promise.reject(response);
			case 200://code=200成功 调用resolve
				return Promise.resolve(response);
			case 202:
				if(response.Msg)
					message(response.Msg);
				return Promise.resolve(response);
			case 400:
			case 500://code=500提示返回的message
			case 201:
				if(response.BCode==501)return Promise.reject(response);
				if(response.BCode==999){ 
					if(response.Msg)
						message(response.Msg);
					return Promise.resolve(response);
				}
				if(response.Msg)
					message(response.Msg);
				return Promise.reject(response);
		}
		return Promise.resolve(response);

		console.log(response);
	}

	login(response){
		if(app.isInApp())
		 	app.hybirdLogin(location.href);
	 	else{
	 		let {Data:{LoginUrl}={}}=response;
	 		if(LoginUrl){
				let c=getCookie('c')||'';
				if(c=='01201'){
					LoginUrl=app.extendUrlParams(LoginUrl,{
						channel:'DSGS',
						area:'CEAIR_'+c
					})
				}
				location.replace(LoginUrl);
			} 	
	 	}
	}

	/*@description 添加url参数,此方法需子类重写*/
	addParams(option){
		let RedirectUrl;
		if(!app.isInApp()&&option.method=='GET')
			RedirectUrl=location.href;
		option.params=option.params||{};
		Object.assign(option.params,{p:app.getP(),RedirectUrl});
	}
	/*@description 添加body参数,此方法需子类重写*/
	addData(option){
		let RedirectUrl;
		if(!app.isInApp()&&option.method=='POST')
			RedirectUrl=location.href;

		option.data=option.data||{};
		Object.assign(option.data,{RedirectUrl});
	}
	/*@description 对url进行处理,此方法需子类重写*/
	handleUrl(url){
		url=(window.apiBase||'')+url;
		return url;
	}


	showLoading(){
		let index=randomInt(0,window.loadingText.length);
		let text= window.loadingText[index];
		if(lodingNode){
			lodingNode.style.display='';	
		}else{
			lodingNode= document.createElement('div');
			lodingNode.className='refreshLayer'
			lodingNode.innerHTML=` 
				<div>
					<span class="loadingImage"></span>
					<span class='loadingAnimate'></span>
					<p id='messageText'></p>
				</div>
			`
			lodingNode.addEventListener('touchmove',function(e){
				e.preventDefault();
			},false)
			document.body.appendChild(lodingNode);
		}
		let textNode= document.querySelector('#messageText');
		textNode.innerHTML=text;
	}

	hideLoading(){
		if(lodingNode)
			lodingNode.style.display='none';
	}

}

function randomInt(start,end){
	let min= end-start;
	Math.random()*min
	let num = Math.random()*min + start;
	return parseInt(num, 10);
}

const fetchInstance=new Fetch({
	configs:{
		credentials:'include',//cookies是否发送服务端 "omit"（默认）,"same-origin"以及"include"
		mode:"cors",//是否跨域 属性值为 same-origin ， no-cors （默认）以及 cors
		headers:{

		}//请求报文的头信息
	},
	hasLoading:false
});

export default fetchInstance;
export const post=fetchInstance.post.bind(fetchInstance);
export const get=fetchInstance.get.bind(fetchInstance);
export const fetch=fetchInstance.fetch.bind(fetchInstance);


