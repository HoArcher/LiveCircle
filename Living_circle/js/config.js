//主域名
//var url = 'http://iyanxi.wang';
var url = 'http://www.tuwoer.com';
var NOWconf = 'tuwoer';
//名称
var name = '兔窝儿';

//上传图片的压缩率
var pic_post_condense = 100;

//当前版本号
var now_v = '2.3.3';

//分享简介
var share_text = '我发现了一款超级有趣的图片社交APP,可以点赞,评论,关注,聊天还有更多好玩的,快来体验吧~ ' + url;

//开发者微博
var weibo_username = 'ourxzhang';

//高德web服务key
var map_key = 'd3fac536961f5c5125791133855c9df0';

//其他配置
var public_config = {

	tuwoer: {
		QQqun: 'http://shang.qq.com/wpa/qunwpa?idkey=adf16aae7feea7281a64d8a2fc30316e7bc21abd91e2c4d67e843ae60cbd8d72',
		tongji: '',
		alipay_url: ''

	},

	iyanxi: {
		QQqun: 'shang.qq.com/wpa/qunwpa?idkey=5da9a7a0c68f01fafaede0e51f09f49c86f769f08d2d46e65afb03e6beec3b1e',
		tongji: 'var _mtac={};(function(){var mta=document.createElement("script");mta.src="http://pingjs.qq.com/h5/stats.js?v2.0.2";mta.setAttribute("name","MTAH5");mta.setAttribute("sid","500402812");var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(mta,s);})();',
		alipay_url: 'https://qr.alipay.com/stx043409gd0beuotqtrs89'

	}

}

//窗口
var windows = {

	'pages': {
		//我的个人中心
		'mine': {

			'login': {
				'url': './login.html',
				'size': '0 0 0 0', //左上右下 ,空格分开
				'opacity': 1, //透明度
				'show': 0,
			},
			'user': {
				'url': './mine.html',
				'size': '0 0 0 40px', //左上右下 ,空格分开
				'opacity': 1, //透明度
				'show': 0,
			},

			'reg': {
				'url': './reg.html',
				'size': '0 0 0 0', //左上右下 ,空格分开
				'opacity': 1, //透明度
				'show': 0,
			},

			//钱包
			'wallets': {
				'url': '/html/accounts/wallets.html',
				'size': '0 0 0 0', //左上右下 ,空格分开
				'opacity': 1, //透明度
				'show': 0,
			},

			//修改资料
			'edit': {
				'url': '/html/accounts/edit.html',
				'size': '0 0 0 0', //左上右下 ,空格分开
				'opacity': 1, //透明度
				'show': 0,
			},

		},

		//用户
		'user': {
			'user': {
				'url': '/html/accounts/user.html',
				'size': '0 0 0 0', //左上右下 ,空格分开
				'opacity': 1, //透明度
				'show': 0,
			},

			'explore': {
				'url': '/html/common/explore.html',
				'size': '0 0px 0 40px', //左上右下 ,空格分开
				'opacity': 1, //透明度
				'show': 0,
			},

			//粉丝列表
			'fans_list': {
				'url': '/html/accounts/fans_list.html',
				'size': '0 0 0 0', //左上右下 ,空格分开
				'opacity': 1, //透明度
				'show': 0,
			},

			//聊天
			'chat': {
				'url': '/html/accounts/chat.html',
				'size': '0 0 0 0', //左上右下 ,空格分开
				'opacity': 1, //透明度
				'show': 0,
			},
		},

		//图片
		'picture': {
			'list': {
				'url': '/html/picture/list.html',
				'size': '0px 0px 0px 40px', //左上右下 ,空格分开
				'show': 0,
			},

			'read': {
				'url': '/html/picture/read.html',
				'size': '0px 0px 0px 0px', //左上右下 ,空格分开
				'show': 0,
			},

			//上传图片/视频
			'add': {
				'url': '/html/picture/add.html',
				'size': '0px 0px 0px 0px', //左上右下 ,空格分开
				'show': 0,
			},

		},

		//文章
		'article': {
			'list': {
				'url': '/html/article/list.html',
				'size': '0px 0px 0px 40px', //左上右下 ,空格分开
				'show': 0,
			},

			'read': {
				'url': '/html/article/read.html',
				'size': '0px 0px 0px 0px', //左上右下 ,空格分开
				'show': 0,
			},

			'add': {
				'url': '/html/article/add.html',
				'size': '0px 0px 0px 0px', //左上右下 ,空格分开
				'show': 0,
			},

		},

		//消息
		'message': {
			'nearest': {
				'url': '/html/message/index.html',
				'size': '0px 0px 0px 40px', //左上右下 ,空格分开
				'show': 0,
			},

		},

		//系统
		'system': {

			//底部
			'bottom': {
				'url': '/html/common/bottom.html',
				'show': 1,
				'height': '40px',
				'id': 'bottom'
			},

			//分享
			'share': {
				'url': '/html/common/share.html',
				'show': 1,
				'height': '100px',
				'id': 'share'
			},

			//添加
			'plus': {
				'url': '/html/common/plus.html',
				'show': 1,
				'height': '100px',
				'id': 'plus'
			},

			//搜索
			'search': {
				'url': '/html/common/search.html',
				'size': '0px 0px 0px 40px', //左上右下 ,空格分开
				'show': 0,
			},

			//设置
			'setting': {
				'url': '/html/common/setting.html',
				'size': '0px 0px 0px 0px', //左上右下 ,空格分开
				'show': 0,
			},

		},

	},

	//启动时需要创建的窗口
	'create': [

		//系统底部栏
		'system.bottom',

		//文章列表
		'article.list',

		//用户主页
		'user.user',

		//文章阅读
		'article.read',

		//图片列表
		'picture.list',

		//图片详情页面
		'picture.read',

		//发现页面
		'explore.index',

		//发布内容选项页面
		'home.add',

		//注册
		'user.reg',

		//登录页面
		'user.login',

		/*//首页
		'home.index',

		//消息页面
		'message.index',
		//发布文章(动态)页面
		'article.edit',

		//底部栏
		'system.bottom',*/

	]

}