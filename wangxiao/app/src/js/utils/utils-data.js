//证件类型
export const cardTypes={
	0:'身份证',
	1:'护照',
	2:'军官证',
	3:'港澳通行证',
	4:'回乡证',
	99:'其他'
}
//获取证件类型
export function getCardType(type){
	return cardTypes[type];
}

export const invoiceTypes=[
    {value:1,text:'旅游费'},
    {value:2,text:'代订住宿费'},
    {value:3,text:'代订机票住宿费'}
]

export const customerOption=[
	{value:1,label:'在职'},
	{value:2,label:'自由职业'},
	{value:3,label:'学生'},
]

// 香港迪士尼资源ID
export const hkResourceId = {
  '1':{'Child':'310000011015','Adult':'310000011014','Old':'310000012649'},
  '2':{'Child':'310000012651','Adult':'310000012652','Old':'310000012650'},
  '3':{'TP16':'310000012653','KP16':'310000012654','BP16':'310000012655'}
}


