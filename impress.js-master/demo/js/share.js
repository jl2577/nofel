function doLoadShare(shareAPIUrl,openId ,appId,shareData,sCallback,eCallback) {
	$.ajax({
				//url : 'http://eim-talk-stg.dmzstg.pingan.com.cn/pack-pir/getSignature',
				url:shareAPIUrl,
				data : {
					openid : openId,
					weappNo : 'PACK95511_01',
				// shareUrl:window.location.href
				},
				type : 'GET',
				dataType : 'jsonp',
				error : function() {
				},
				success : function(data) {
					data = eval('(' + data + ')');
					wx.config({
						debug : true, // 弄1¤7启调试模弄1¤7,调用的所有api的返回傱¤7¼会在客户端alert出来，若要查看传入的参数，可以在pc端打弄1¤7，参数信息会通过log打出，仅在pc端时才会打印〄1¤7
						appId : appId, // 必填，公众号的唯丄1¤7标识
						timestamp : data.timestamp, // 必填，生成签名的时间戄1¤7
						nonceStr : data.nonce, // 必填，生成签名的随机丄1¤7
						signature : data.signature,// 必填，签名，见附彄1¤7
						jsApiList : [ 'onMenuShareTimeline',
								'onMenuShareAppMessage', 'onMenuShareQQ',
								'onMenuShareWeibo', 'startRecord',
								'stopRecord', 'onVoiceRecordEnd', 'playVoice',
								'pauseVoice', 'stopVoice', 'onVoicePlayEnd',
								'uploadVoice', 'downloadVoice', 'chooseImage',
								'previewImage', 'uploadImage', 'downloadImage',
								'translateVoice', 'getNetworkType',
								'openLocation', 'getLocation',
								'hideOptionMenu', 'showOptionMenu',
								'hideMenuItems', 'showMenuItems',
								'hideAllNonBaseMenuItem',
								'showAllNonBaseMenuItem', 'closeWindow',
								'scanQRCode', 'chooseWXPay',
								'openProductSpecificView', 'addCard',
								'chooseCard', 'openCard' ]
					// 必填，需要使用的JS接口列表，所有JS接口列表见附彄1¤7
					});
					wx.ready(function() {
								onMenuShareAppMessage(shareData.title,
									shareData.desc, shareData.link+'&needShow=0',
									shareData.imgUrl.replace(/&amp;/g,'&').replace('http://test-pacz.pa18.com//','http://test-pacz.pa18.com/'), shareData.type,
									shareData.dataUrl,sCallback,eCallback);
								onMenuShareTimeline(shareData.title, shareData.link+'&needShow=0', shareData.imgUrl.replace(/&amp;/g,'&').replace('http://test-pacz.pa18.com//','http://test-pacz.pa18.com/'),sCallback,eCallback)
								onMenuShareQQ(shareData.title, shareData.desc, shareData.link+'&needShow=0', shareData.imgUrl.replace(/&amp;/g,'&').replace('http://test-pacz.pa18.com//','http://test-pacz.pa18.com/'),sCallback,eCallback)
								onMenuShareWeibo(shareData.title, shareData.desc, shareData.link+'&needShow=0', shareData.imgUrl.replace(/&amp;/g,'&').replace('http://test-pacz.pa18.com//','http://test-pacz.pa18.com/'),sCallback,eCallback)

					});
				}
			})
}
// 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接叄1¤7
function onMenuShareAppMessage(title, desc, link, imgUrl, type, dataUrl,sCallback,eCallback) {
	wx.onMenuShareAppMessage({
		title : title, // 分享标题
		desc : desc, // 分享描述
		link : link || window.location.href, // 分享链接
		imgUrl : imgUrl || '', // 分享图标
		type : type || 'link', // 分享类型,music、video或link，不填默认为link
		dataUrl : dataUrl || '', // 如果type是music或video，则要提供数据链接，默认为空
		success : function(res) {
			sCallback && sCallback();
		},
		cancel : function(res) {
			eCallback && eCallback();
		}
	});
}
// 监听“分享到朋友圈₱¤7按钮点击ケ¤7自定义分享内容及分享结果接叄1¤7
function onMenuShareTimeline(title, link, imgUrl,sCallback,eCallback) {
	wx.onMenuShareTimeline({
		title : title, // 分享标题
		link : link || window.location.href, // 分享链接
		imgUrl : imgUrl || '', // 分享图标
		success : function(res) {
			sCallback && sCallback();
		},
		cancel : function(res) {
			eCallback && eCallback();
		}
	});
}
// 监听“分享到QQ”按钮点击ケ¤7自定义分享内容及分享结果接叄1¤7
function onMenuShareQQ(title, desc, link, imgUrl,sCallback,eCallback) {
	wx.onMenuShareQQ({
		title : title, // 分享标题
		desc : desc, // 分享描述
		link : link || window.location.href, // 分享链接
		imgUrl : imgUrl || '', // 分享图标
		success : function(res) {
			sCallback && sCallback();
		},
		cancel : function(res) {
			eCallback && eCallback();
		}
	});
}
// 监听“分享到QQ”按钮点击ケ¤7自定义分享内容及分享结果接叄1¤7
function onMenuShareWeibo(title, desc, link, imgUrl,sCallback,eCallback) {
	wx.onMenuShareWeibo({
		title : title, // 分享标题
		desc : desc, // 分享描述
		link : link || window.location.href, // 分享链接
		imgUrl : imgUrl || '', // 分享图标
		success : function(res) {
			sCallback && sCallback();
		},
		cancel : function(res) {
			eCallback && eCallback();
		}
	});
}


