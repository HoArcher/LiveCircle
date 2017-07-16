//这是项目封装的JS工具文件
var Tool = {
	//初始化
	init: function() {
		console.log('初始化成功');
		plus.key.addEventListener("backbutton", function() {
			//按下返回后执行的代码
			Tool.backbutton();
		});

		//检测是否存在自定义的状态栏
		if($('.top').length > 0) {
			//停用自定义状态栏

			//			$('.top_right').text(plus.device.vendor);
			//			var types = {};
			//			types[plus.networkinfo.CONNECTION_UNKNOW] = "未知";
			//			types[plus.networkinfo.CONNECTION_NONE] = "离线";
			//			types[plus.networkinfo.CONNECTION_ETHERNET] = "有线网络";
			//			types[plus.networkinfo.CONNECTION_WIFI] = "WiFi";
			//			types[plus.networkinfo.CONNECTION_CELL2G] = "2G";
			//			types[plus.networkinfo.CONNECTION_CELL3G] = "3G";
			//			types[plus.networkinfo.CONNECTION_CELL4G] = "4G";
			//
			//			$('.top_left').text(types[plus.networkinfo.getCurrentType()]);
			//			//监控流量状况
			//			net = $('.top_left').text();
			//
			//			TrafficStats = plus.android.importClass("android.net.TrafficStats");
			//			total_data = TrafficStats.getTotalRxBytes();
			//			intervalId = window.setInterval("Tool.getNetSpeed()", 1000);
			//
			//			//动态显示时间
			//			window.t = null;
			//			t = setTimeout(Tool.time(), 1000 * 60); //开始执行

		}

		if($(window).height() >= 200) {

			ws = plus.webview.currentWebview();
			ws.setPullToRefresh({
				support: true,
				//				style: 'circle',
				height: "80px",
				range: "80px",
				contentdown: {
					caption: "你敢拉我就敢刷新"
				},
				contentover: {
					caption: "你敢松手我就敢刷新"
				},
				contentrefresh: {
					caption: "好吧你赢了,刷新中..."
				}
			}, Tool.onRefresh);

		}

		//判断是否为沉浸式
		if(plus.navigator.isImmersedStatusbar()) {

		} else {
			//不是沉浸式则全屏运行
			//plus.navigator.setFullscreen(true);
			Tool.hide_top()
		}

	},

	time: function() {
		clearTimeout(t); //清除定时器
		dt = new Date();
		var h = dt.getHours();
		var m = dt.getMinutes();
		var s = dt.getSeconds();
		document.getElementById("timeShow").innerHTML = h + ":" + m;
		t = setTimeout(Tool.time, 1000 * 60); //设定定时器，循环执行             
	},

	getNetSpeed: function() {
		traffic_data = TrafficStats.getTotalRxBytes() - total_data;
		total_data = TrafficStats.getTotalRxBytes();

		$('.top_left').text(net + '　' + Tool.bytesToSize(traffic_data));

		//console.log(bytesToSize(traffic_data));
	},

	//将byte自动转换为其他单位
	bytesToSize: function(bytes) {
		//if(bytes === 0) return '0 B/s';
		if(bytes === 0) return '　';
		var k = 1000, // or 1024
			sizes = ['B/s', 'KB/s', 'MB/s', 'GB/s', 'TB/s', 'PB/s', 'EB/s', 'ZB/s', 'YB/s'],
			i = Math.floor(Math.log(bytes) / Math.log(k));
		return(bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
	},

	//APP启动开始
	begin: function() {

		//向用户提示网络状态
		var types = {};
		types[plus.networkinfo.CONNECTION_UNKNOW] = "未知";
		types[plus.networkinfo.CONNECTION_NONE] = "离线";
		types[plus.networkinfo.CONNECTION_ETHERNET] = "有线网络";
		types[plus.networkinfo.CONNECTION_WIFI] = "WiFi";
		types[plus.networkinfo.CONNECTION_CELL2G] = "2G";
		types[plus.networkinfo.CONNECTION_CELL3G] = "3G";
		types[plus.networkinfo.CONNECTION_CELL4G] = "4G";
		plus.nativeUI.toast('当前为 ' + types[plus.networkinfo.getCurrentType()] + ' 网络');

		//创建窗口
		if(windows['create']) {
			console.log('读取配置文件 config.js -> windows["create"] 的参数成功 : ');
			for(i in windows['create']) {

				console.log(windows['create'][i]);

				Tool.create(windows['create'][i]);
			}

		} else {
			Tool.error('读取配置文件 config.js -> windows["create"] 的参数失败');

		}

	},

	//抛出错误信息
	error: function(message, run_function) {
		if(message) {
			Tool.toast(message);
			console.error(message);

			if(run_function) {
				run_function();
			}

			if($('.getting').length > 0) {
				$('.getting').html('<i class="iconfont">&#xe767;</i>' + message);
			}

		} else {
			console.error('未传入message信息给Tool.error()');
		}

	},

	//取随机数
	rand: function(min, max) {
		if(min && max) {
			var x = max;
			var y = min;
			var rand = parseInt(Math.random() * (x - y + 1) + y);
			return rand;
		} else {
			console.log('随机数未传入')
		}

	},

	//提示toast
	toast: function(text, closetime) {
		if(text) {

			var _closetime = closetime ? closetime : 5000;

			if($('.toast').length > 0) {
				$('.toast').remove();
			}

			var _html = '<div class="toast">' + text + '</div>';
			$('body').append(_html);

			$('.toast').toggle();

			setTimeout("$('.toast').remove()", _closetime);

		} else {
			console.log('未传入必要参数');
		}
	},

	//下拉刷新执行
	onRefresh: function() {
		ws.endPullToRefresh()
		plus.webview.currentWebview().reload(true);

	},

	//创建或重载(刷新)窗口
	create: function(page_name) {
		if(page_name) {
			//首先查找窗口是否存在,不存在则创建,存在则重载
			if(plus.webview.getWebviewById(page_name)) {
				//窗口存在,重载窗口
				plus.webview.getWebviewById(page_name).reload(false);

			} else {
				//窗口不存在,创建

				var _name = page_name.split('.')[0];
				var _page = page_name.split('.')[1];

				if(windows['pages'][_name] == undefined) {

					return false;
				}

				//文件路径
				var _local_url = windows['pages'][_name][_page] ? windows['pages'][_name][_page]['url'] : null;

				//alert(JSON.stringify(_local_url))

				if(_local_url == null) {

					Tool.error('系统错误');
					return false;

				}

				if(windows['pages'][_name][_page]['size']) {
					var _size = windows['pages'][_name][_page]['size'].split(' ');
				} else {
					var _size = null;
				}
				var styles = {};

				switch(windows['pages'][_name][_page]['id']) {
					case 'bottom':
						styles = {
							left: 0,
							right: 0,
							bottom: 0
						}

						break;
					case 'share':
						styles = {
							left: 0,
							right: 0,
							bottom: 0
						}
						break;
					case 'plus':
						styles = {
							left: 0,
							right: 0,
							bottom: 40
						}
						break;
					default:

						(_size[0] != null) ? styles.left = _size[0]: styles.left = "0";
						(_size[1] != null) ? styles.top = _size[1]: styles.top = "0";
						(_size[2] != null) ? styles.right = _size[2]: styles.right = "0";
						(_size[3] != null) ? styles.bottom = _size[3]: styles.bottom = "0";

						break;

				}

				(windows['pages'][_name][_page]['height'] != null) ? styles.height = windows['pages'][_name][_page]['height']: styles.height;

				(windows['pages'][_name][_page]['opacity'] != null) ? styles.opacity = windows['pages'][_name][_page]['opacity']: null;
				//				(mask != null) ? styles.mask = mask: null;
				//

				styles.bounce = "vertical"; //可取值：none表示没有反弹效果；vertical表示垂直方向有反弹效果；horizontal表示水平方向有反弹效果；all表示垂直和水平方向都有反弹效果。

				styles.hardwareAccelerated = true;
				styles.render = 'always';
				styles.scrollIndicator = "none";
				//				styles.softinputMode = "adjustResize";

				styles.popGesture = "none";
				/*styles.navigationbar ={
					
					'backgroundcolor':'#FFFFFF',
					'titletext':'标题',
					'titlecolor':'#000000',
				}*/

				plus.webview.create(_local_url, page_name, styles);

				//是否立即显示
				if(windows['pages'][_name][_page]['url'] == 1) {
					Tool.show(page_name);
				}
			}

		} else {
			//未传值
			Tool.error('未传入需要创建的窗体必要参数.');

		}

	},

	//显示窗口
	show: function(page_name, options, show_type) {
		if(show_type) {
			show_type = show_type;
		} else {
			var show_type = 'fade-in';
		}

		if(page_name) {
			//首先查找窗口是否存在,不存在则创建,存在则直接显示
			if(plus.webview.getWebviewById(page_name)) {
				//窗口存在

			} else {
				//不存在
				plus.nativeUI.showWaiting();
				Tool.create(page_name);

			}

			if(options) {
				var refreshing = plus.webview.getWebviewById(page_name);
				refreshing.loadURL(Tool.page_get_url(page_name) + '?' + options);
			}

			plus.webview.show(page_name, show_type, 300, plus.nativeUI.closeWaiting());

			//执行统计信息
			plus.webview.getWebviewById(page_name).evalJS(public_config[NOWconf]['tongji']);

		} else {
			Tool.error('打开显示失败,未传入必要参数.');
		}

	},

	//关闭窗口
	close: function(page_name) {
		if(page_name) {
			//关闭指定窗口
			plus.webview.close(plus.webview.getWebviewById(page_name), 'slide-out-left', 300);

		} else {
			//关闭当前窗口
			plus.webview.close(plus.webview.currentWebview(), 'slide-out-left', 300);

		}

	},

	//隐藏窗口
	hide: function(page_name) {
		if(page_name) {
			plus.webview.hide(plus.webview.getWebviewById(page_name), 'slide-out-left', 300);
		} else {
			plus.webview.hide(plus.webview.currentWebview(), 'slide-out-left', 300);

		}

	},

	//监听返回键被按下
	backbutton: function() {
		if($('.head_left').length > 0) {

			if($('.head_left').data('do') == 'hide') {
				Tool.hide();
				return false;
			}

			if($('.head_left').data('do') == 'close') {
				Tool.close();
				return false;
			}

			if($('.head_left').data('do') == 'back') {
				Tool.back();
				return false;
			}

			console.error('返回键点击后未作出任何回应');
			return false;
		}

		if(plus.webview.currentWebview()['id'] == 'HBuilder') {
			//不关闭主窗口
			console.error('开发阶段不允许关闭主窗口');
			return false;
		}

		if(plus.webview.currentWebview()['id'] == 'system.bottom') {
			//不关闭

			return false;
		}

		Tool.hide();
		return false;
	},

	//开发工具,列出当前未被销毁的所有窗口列表
	dev_show_windows_list: function() {
		var wvs = plus.webview.all();
		for(var i = 0; i < wvs.length; i++) {
			console.debug(wvs[i]['id'] + " : " + wvs[i].getURL());
		}
	},

	//检查图片缓存&缓存图片

	has_cache: function(pid, yp_cloud_url, url_end) {
		if(pid && yp_cloud_url) {
			plus.io.resolveLocalFileSystemURL("_downloads/pic/cache/" + pid + '.jpg', function(entry) {
				//缓存存在
				//console.log("缓存图片存在 ");
				$('#pic_pic_' + pid).attr('src', plus.io.convertLocalFileSystemURL("_downloads/pic/cache/" + pid + '.jpg'));

			}, function(e) {

				console.error("缓存图片不存在 " + e.message);

				//缓存图片
				//创建下载任务

				var _url_end = url_end ? url_end : '';
				//console.log(yp_cloud_url + '!thumb' + _url_end)
				dtask = plus.downloader.createDownload(yp_cloud_url + '!thumb' + _url_end, {
					filename: '_downloads/pic/cache/' + pid + '.jpg'
				}, function(d, status) {
					// 下载完成 
					if(status == 200) {
						console.log("Download success: " + d.filename);
						//缓存成功,则显示缓存
						$('#pic_pic_' + pid).attr('src', plus.io.convertLocalFileSystemURL("_downloads/pic/cache/" + pid + '.jpg'));
					} else {
						console.error("Download failed: " + status);
						//缓存失败,则显示网络图片
						$('#pic_pic_' + pid).attr('src', yp_cloud_url + '!thumb' + url_end);
					}
				});
				//dtask.addEventListener( "statechanged", onStateChanged, false );
				dtask.start();
			});

		}
	},

	//登录
	login: function(userName,pw) {
		plus.nativeUI.showWaiting();
		if(type == 'no_md5') {
			//no_md5 方式登录,提交  md5 过后的 password 和uid 
			window.login_url = url + '/login?userName='+userName+'&password='+pw;
			data = {
				uid: plus.storage.getItem('uid'),
				password: plus.storage.getItem('password'),
				username: 'no_md5'
			}

		} else {
			//api 登录 提交 password 和username
			window.login_url = url + '/login?api=1';
			data = {
				username: $('#username').val(),
				password: $('#password').val()
			}

		}

		//登录请求
		$.ajax({
			type: "post",
			url: window.login_url,
			data: data,
			dataType: "json",
			success: function(data) {
				if(data.code == 1) {
					//登录成功
					Tool.toast('登录成功');
					plus.nativeUI.closeWaiting();
					//调试 console.log(JSON.stringify(data.data));

					//首先将返回数据的 data 值 转换为文本 , 再缓存到本地
					plus.storage.setItem("get_userinfo_logined", JSON.stringify(data.data));

					plus.nativeUI.toast(Tool.GUI('username'));
					//刷新页面
					Tool.show('mine.user', 'refreshing', 'fade-in');
					Tool.show('system.bottom');
					Tool.hide();

					var getui_info = plus.push.getClientInfo().clientid; //CID

					$.ajax({
						type: "post",
						url: url + '/api/add_getui_info',
						data: {
							uid: Tool.GUI('uid'),
							sid: Tool.GUI('sid'),
							getui_info: getui_info
						},
						dataType: "json",
						success: function(data) {
							if(data.code == 1) {
								console.log('更新个推推送权限成功');

							} else {
								Tool.error('发生了一点小错误,你可能收不到服务器发送给你的消息推送:' + data.content)

							}

						},
						error: function() {

							Tool.error('发生了一点小错误,你可能收不到服务器发送给你的消息推送')

						}
					});

				} else {
					//登录失败
					plus.nativeUI.closeWaiting();

					alert(data.content)

				}

			},
			error: function() {
				Tool.error('网络不给力,登录失败');

			}
		});

	},

	//获取登录后缓存的用户数据 (get_userinfo_logined)
	GUI: function GUI(name) {
		if(name != null) {
			//首先读取缓存的数据.其次将文本文档转换为对象

			if(plus.storage.getItem('get_userinfo_logined')) {
				var userinfo = JSON.parse(plus.storage.getItem('get_userinfo_logined'));

				return str = userinfo[name];

			} else {
				return null;

			}

		} else {
			return str = '获取失败,没有传参';

		}

	},

	//更改GUI内容
	edit_GUI: function(name, value) {
		if(name && value) {
			if(plus.storage.getItem('get_userinfo_logined')) {
				var userinfo = JSON.parse(plus.storage.getItem('get_userinfo_logined'));

				userinfo[name] = value;

				plus.storage.setItem("get_userinfo_logined", JSON.stringify(userinfo));

				if(Tool.GUI(name) == value) {
					return 1;

				} else {
					return 0;

				}

			} else {
				return 0;

			}
		} else {
			return 0;

		}

	},

	//获取缓存的用户数据 (get_userinfo_uid_用户的UID)   one 为查询的元素内容
	GUU: function(uid, one) {
		if(uid != null && one != null) {
			//首先读取缓存的数据.其次将文本文档转换为对象
			if(plus.storage.getItem("get_userinfo_uid_" + uid)) {

				var userinfo = JSON.parse(plus.storage.getItem("get_userinfo_uid_" + uid));

				return str = userinfo[one];

			} else {
				return null;
			}

		} else {
			return str = '获取失败,没有传参';

		}

	},

	//通过page_name读取配置 url完整路径值;
	page_get_url: function(page_name) {
		if(page_name) {
			var _name = page_name.split('.')[0];
			var _page = page_name.split('.')[1];

			if(windows['pages'][_name] == undefined) {

				return false;
			}

			//文件路径
			var _local_url = windows['pages'][_name][_page] ? windows['pages'][_name][_page]['url'] : null;

			return _local_url;
		} else {
			Tool.error('无法获取url路径,未传入参数');
		}

	},

	//返回顶部
	returnTop: function() {

		$('body,html').css({
			scrollTop: 0
		}, 1000);

	},

	//向下滚动指定像素
	runPx: function(number) {
		if(number) {

			$('body,html').animate({
				scrollTop: $(document).height() + number
			}, 0);
		}

	},

	//询问是否后台运行
	Q_close: function() {

		plus.nativeUI.confirm("你要后台运行吗？(可在设置中终止运行)", function(e) {
			if(e.index == 0) {
				//后台运行
				var main = plus.android.runtimeMainActivity();
				main.moveTaskToBack(false);
			} else {

			}

		}, "后台运行", ["确定", "取消"]);
	},
	//调用原生分享

	share: function(shareTip, shareText) {
		//导入Java类对象
		var Context = plus.android.importClass("android.content.Intent");
		//获取应用主Activity
		var Main = plus.android.runtimeMainActivity();
		//将类Context的这个行为(Action)ACTION_SEND，赋给shareIntent
		var shareIntent = new Context(Context.ACTION_SEND);
		//***以下两种写法是一样的
		//plus.android.invoke(shareIntent,"setType","text/plain");
		//plus.android.invoke(shareIntent,"putExtra",Context.EXTRA_TEXT,shareText);
		//设置分享类型
		shareIntent.setType("text/plain");
		//设置分享文本
		shareIntent.putExtra(Context.EXTRA_TEXT, shareText);
		//***以上两种写法是一样的
		//指定分享的包名
		//shareIntent.setPackage('com.tencent.mm',);
		Main.startActivity(Context.createChooser(shareIntent, shareTip));
	},

	//使用微博客户端打开个人主页
	weibo_user_home: function(name) {

		if(name) {
			var url = 'http://weibo.com/' + name;

		} else {
			var url = 'http://weibo.com/ourxzhang';

		}

		//判断是否安装了微博客户端,有则使用微博客户端打开,没有则使用默认浏览器打开

		plus.runtime.getProperty('com.sina.weibo', function(wgtinfo) {
			if(wgtinfo.name) {

				plus.runtime.openURL(url, plus.nativeUI.toast('打开微博客户端失败'), 'com.sina.weibo');

			} else {
				Tool.openURL(url);
			}
		});

	},

	//使用浏览器打开URL
	openURL: function(url) {
		if(url) {
			plus.runtime.openURL(url);
		} else {
			plus.nativeUI.toast('没有传递参数,打开浏览器进行跳转失败')

		}

	},

	//在当前窗口跳转url
	goUrl: function(url) {
		if(url) {
			plus.webview.currentWebview().loadURL(url);
		} else {
			Tool.error('打开失败');
		}
	},

	//窗口后退
	back: function() {

		plus.webview.currentWebview().back();
	},

	//使用QQ发起临时会话
	chat_qq: function(number) {

		if(number) {
			var url = 'http://wpa.qq.com/msgrd?v=3&uin=' + number + '&site=qq&menu=yes';

		} else {
			var url = 'http://wpa.qq.com/msgrd?v=3&uin=1281696031&site=qq&menu=yes';
		}

		plus.runtime.openURL(url, plus.nativeUI.toast('跳转失败'));

	},

	//使用QQ打开加入QQ群链接,安卓有效
	join_qq_club: function() {
		plus.runtime.openURL(public_config[NOWconf]['QQqun'], plus.nativeUI.toast('打开浏览器进行跳转失败' + public_config[NOWconf]['QQqun']));
	},

	//上传图片页面
	add_pic: function(path) {
		if(path) {
			Tool.show('picture.add', 'path=' + path)
		} else {
			Tool.show('picture.add', 'type=pics')
		}

	},

	//检测是否登录,若未登录则直接弹出登录页面
	is_logined: function(times) {

		if(Tool.GUI('username')) {

		} else {
			//未登录

			if(times) {
				setTimeout(function() {
					Tool.show('mine.login', '', 'none')
				}, times);
			} else {
				Tool.show('mine.login', '', 'none')
			}

		}
	},

	//隐藏top组件
	hide_top: function() {
		if($('.top').length > 0) {
			$('.top').hide();
			console.log('Top组件已隐藏');
			$('body').css('padding-top', '40px');
		}

		if($('.head_box').length > 0) {
			$('.head_box').css('top', '0');

		}
	},
	//设置系统壁纸(安卓)
	setwallpaper: function(local) {
		if(local) {
			plus.nativeUI.showWaiting()
			var WallpaperManager = plus.android.importClass("android.app.WallpaperManager");
			var Main = plus.android.runtimeMainActivity();
			var wallpaperManager = WallpaperManager.getInstance(Main);
			plus.android.importClass(wallpaperManager);
			var BitmapFactory = plus.android.importClass("android.graphics.BitmapFactory");
			var url = local; // 换成要设置的壁纸图片路径
			var path = plus.io.convertLocalFileSystemURL(url);
			var bitmap = BitmapFactory.decodeFile(path);
			try {
				plus.nativeUI.closeWaiting()
				plus.nativeUI.toast('设置成功')
				wallpaperManager.setBitmap(bitmap);
				bitmap.recycle(); // 设置完毕桌面要进行 原生层的BITMAP回收 减少内存压力

			} catch(e) {
				//TODO handle the exception
			}

		} else {
			plus.nativeUI.closeWaiting()
			plus.nativeUI.toast('设置失败')
		}

	},

	//播放音频
	playAudio: function(url) {
		if(url) {
			if(plus.audio == undefined) {
				Tool.error('播放失败,设备没有准备好或没有权限.');
				return false;
			}

			p = plus.audio.createPlayer(url);
			p.play(function() {
				console.log("Audio play success!");
				p = null;
				Tool.playSuccess();
			}, function(e) {
				Tool.error('播放失败,' + e.message);
			});

		} else {
			Tool.error('播放失败,没有播放源');
		}

	},

	//完毕后的音效
	playSuccess: function() {
		/*var __p = plus.audio.createPlayer("_www/music/due.wav");

		__p.play(function() {
			
		});*/
		plus.device.vibrate(50);

	},

}

//常用网络请求
var Network = {
	//添加关注
	following_add: function(fuid) {
		if(fuid) {

			if($('#button_user_uid_' + fuid).length > 0) {
				var _objDOM = $('#button_user_uid_' + fuid);
				var _where = '1'
			} else {
				var _objDOM = $('.following_text');
				var _where = '2'

			}

			_objDOM.html('<b>请求中</b>');

			$.ajax({
				type: "POST",
				url: url + "/following/add",
				dataType: "json",
				data: {
					uid: Tool.GUI('uid'),
					sid: Tool.GUI('sid'),
					fuid: fuid
				},
				success: function(data) {

					if(data.code == 1) {
						//成功
						_objDOM.html('<b>已关注</b>');

						if(_where == 1) {
							_objDOM.addClass('button');
							_objDOM.removeClass('button_fff');

						} else {
							$('.following').attr('onclick', '');
							$('.following_text').css('background-color', '#1E90FF');
						}

						plus.nativeUI.toast('关注成功');
					} else {
						//失败
						_objDOM.html('<b>关注失败</b>');
						Tool.is_logined();
					}
				},
				error: function() {
					//关注失败
					_objDOM.html('<b>关注失败</b>');
				}
			});
		} else {
			//抱歉系统错误
			Tool.error('关注失败');
		}

	},

	//点赞
	add_like: function(pid) {
		if(pid) {
			$('#button_like_pid_' + pid).html('请求中');
			$.ajax({
				type: "POST",
				url: url + "/like/add",
				dataType: "json",
				data: {
					uid: Tool.GUI('uid'),
					sid: Tool.GUI('sid'),
					pid: pid
				},
				success: function(data) {
					if(data.code == 1) {
						//成功
						$('#button_like_pid_' + pid).html('已赞');
						$('#iconfont_like_pid_' + pid).css('color', 'red');
						$('#button_like_pid_' + pid).addClass('button');
						$('#button_like_pid_' + pid).removeClass('button_fff');

					} else {
						//失败
						$('#button_like_pid_' + pid).html('失败');
						Tool.is_logined();

					}
				},
				error: function() {
					//失败
					$('#button_like_pid_' + pid).html('失败');

				}
			});

		} else {
			Tool.error('点赞失败,系统错误');
		}

	},
	//设置头像
	setHeadPic: function(pid) {
		if(pid) {
			plus.nativeUI.showWaiting('设置中,请稍候...');
			$.ajax({
				type: "get",
				url: url + "/user/edit/uploadpic/uid/" + Tool.GUI('uid') + "/sid/" + Tool.GUI('sid') + "/pid/" + pid + "/api/1",
				dataType: "json",
				success: function(data) {
					plus.nativeUI.closeWaiting();
					if(data.code == 1) {
						if(Tool.edit_GUI('head_pic', data.data)) {
							plus.nativeUI.toast('恭喜你,头像修改成功');
							Tool.create('mine.user');
						} else {
							plus.nativeUI.toast('设置成功,但你可能需要重新登录帐号才能查看到新的头像.')
						}
					} else {
						plus.nativeUI.toast('设置头像失败');

					}

				},
				error: function() {
					plus.nativeUI.closeWaiting();
					plus.nativeUI.toast('设置头像失败');
				}
			});

		} else {
			plus.nativeUI.toast('设置头像失败,系统错误');
		}
	},

	//添加评论
	add_comment: function(pid, value) {
		if(pid && value) {
			//显示等待雪花
			plus.nativeUI.showWaiting();

			if($(".article_bottom .like").length > 0) {
				$(".article_bottom .like").hide();
			}

			var content = value;
			$.ajax({
				type: "post",
				url: url + "/comment/add",
				dataType: "json",
				data: {
					uid: Tool.GUI('uid'),
					sid: Tool.GUI('sid'),
					pid: pid,
					content: content
				},
				success: function(data) {
					plus.nativeUI.closeWaiting()

					if($(".article_bottom .like").length > 0) {
						$(".article_bottom .like").show();
					}

					if(data.code == 1) {
						//SUC

						if($(".article_bottom input").length > 0) {
							$('.article_bottom input').val('');
							$('.article_bottom input').attr('placeholder', '评论成功!');

							setTimeout(function() {
								$('.article_bottom input').attr('placeholder', '请输入评论内容');
							}, 3000);
						}

						var c_txt =
							'<div class="comment_content">' +
							'<span class="username">' + data['content']['username'] + '</span>' +
							'<span class="content">' + data['content']['content'] + '(刚刚)</span>' +
							'</div>';

						$('#comment_list_id_' + pid).prepend(c_txt);

						//滚动屏幕
						//Tool.runPx(50)
					} else {
						alert(data.content);

						Tool.is_logined();

					}
				},
				error: function() {
					plus.nativeUI.closeWaiting()
					if($(".article_bottom .like").length > 0) {
						$(".article_bottom .like").show();
					}

					alert('抱歉,评论失败!');
				}
			});

		} else {
			Tool.error('你遇到了百年不遇的一个系统错误~')
		}

	},

	//提交搜索记录
	add_search_key: function(key) {
		if(key) {
			$.ajax({
				type: "post",
				url: url + "/api/search_kay",
				dataType: 'json',
				data: {
					name: key,
					add_uid: Tool.GUI('uid') ? Tool.GUI('uid') : '',
					openkey: '20170218'
				},

			}).fail(function() {
				console.log('搜索记录提交失败');
			}).done(function(data) {

				if(data.code != 1) {
					console.log('搜索记录提交失败');

					return false;
				}

			});

		}

	}

}

//这里是监听点击事件
$('.head_left').on('click', function() {

	switch($(this).data('do')) {
		case 'hide':
			//隐藏窗口
			Tool.hide();
			break;
		case 'close':
			//关闭窗口
			Tool.close();
			break;
		default:
			Tool.show($(this).data('do'));
			break
	}

	return false;
});

//点击返回顶部
$('.head_center').on('click', function() {
	Tool.returnTop();
	return false;
});

/*模拟PHP的GET , 使用时, 可以直接 $_GET['get参数'], 就直接获得GET参数的值*/
var $_GET = (function() {
	var url = window.document.location.href.toString();
	var u = url.split("?");
	if(typeof(u[1]) == "string") {
		u = u[1].split("&");
		var get = {};
		for(var i in u) {
			var j = u[i].split("=");
			get[j[0]] = j[1];
		}
		return get;
	} else {
		return {};
	}
})();