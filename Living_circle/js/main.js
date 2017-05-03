mui.init()
var main = null,
	menu = null,
	network = true;
// 设置一个中间量，用于判定动画效果开始
var isInTransition = false;
// 设置变量用于判定侧滑窗口的打开/关闭状态
var showMenu = false;
mui.plusReady(function() {
		plus.screen.lockOrientation("portrait-primary");
		main = plus.webview.currentWebview();
	//底部导航Webview切换
	var title = document.querySelector(".mui-title");
	// 将子窗口的地址存在数组中，方便进行遍历，创建子窗口；
	var subpageArr = ["home.html", "circle.html", "messages.html"];
	/**
	 * 设置子窗口的样式，顶部默认44px，底部默认50px，并且设置窗口无滚动条；
	 */
	var subStyles = {
		top: "45px",
		bottom: "50px",
		
		scrollIndicator: "none"
	};
	var subpage = null;
		for(var i = 0, subLength = subpageArr.length; i < subLength; i++) {
			if(i < 1) {
				subpage = mui.openWindow(subpageArr[i], subpageArr[i], {
					styles: subStyles,
					waiting: {
						title: "正在加载..."
					}
				});
			} else {
				subpage = plus.webview.create(subpageArr[i], subpageArr[i], subStyles);
				subpage.hide("none");
			}
			main.append(subpage);
		/**
		 * 子页面切换
		 */
		var tabs = document.querySelectorAll(".mui-tab-item");

		var activeTab = subpageArr[0];
		var targetTab = "";
		var counter1=0;
		for(var j = 0, tabLength = tabs.length; j < tabLength; j++) {
			tabs[j].addEventListener("tap", function() {
				targetTab = this.getAttribute("href");
				console.log(targetTab+counter1);
				counter1+=1;
				if(targetTab === activeTab) {
					return;
				}
				title.innerHTML = this.querySelector(".mui-tab-label").innerHTML;
				plus.webview.show(targetTab, "slide-in-left", 300);
				plus.webview.hide(activeTab);
				activeTab = targetTab;
			});
		}
	}

	//侧滑
main.addEventListener("maskClick", closeMenu);
	/*
	 * 处理侧滑窗口，可以根据实际业务延时加载；
	 * 具体可以参考hello mui 的index.html部分
	 * http://dev.dcloud.net.cn/mui/window/#preload
	 */
		setTimeout(function() {
					menu = mui.preload({
						id: 'slide',
						url: 'System/setting.html',
						styles: {
							left: 0,
							width: '70%',
							zindex: 999999999
						},
						show: {
							aniShow: 'none'
						}
					});
				}, 200);
			});

	document.getElementById("sideMenu").addEventListener("tap", function() {
		//alert(menu.getURL());
		if(showMenu) {
			closeMenu();
		} else {
			openMenu();
		}
	});
	
	// 侧滑窗口触发的关闭侧滑窗口自定义事件
	window.addEventListener("swiperight", openMenu);
	window.addEventListener("swipeleft", closeMenu);
	window.addEventListener("menu:close", closeMenu);
	// 打开侧滑窗口

	function openMenu() {
		if(isInTransition) {
			return;
		}
		if(!showMenu) {
			
			// 侧滑菜单处于隐藏状态，则立即显示出来
			isInTransition = true;
			// http://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.WebviewObject.setStyle
			menu.setStyle({
				mask: "rgba(0,0,0,0)"
			}); //menu设置透明遮罩防止点击
			// http://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.WebviewObject.show
			menu.show("none", 0, function() {
				//主窗体开始侧滑并显示遮罩
				main.setStyle({
					mask: "rgba(0,0,0,0.4)",
					left: "70%",
					transition: {
						duration: 300
					}
				});
				/*
				 * mui.later()是mui封装的setTimeout()
				 * 具体更多参数，可以看下mui.js的源码；
				 */
				mui.later(function() {
					isInTransition = false;
					menu.setStyle({
						mask: "none"
					}); //移除menu的mask
				}, 310);
				showMenu = true;
			});
		}
	}
	/*
	 * 关闭侧滑窗口
	 */
	function closeMenu() {
		if(isInTransition) {
			return;
		}
		if(showMenu) {
			/*
			 * 关闭遮罩
			 * 主窗体开始侧滑
			 */
			isInTransition = true;
			main.setStyle({
				mask: "none",
				left: "0",
				transition: {
					duration: 300
				}
			});
			showMenu = false;
			// 等动画结束后，隐藏菜单webview，节省资源；
			mui.later(function() {
				isInTransition = false;
				menu.hide("none");
			}, 310);
		}
	}

	

//back 事件重写
var first = null;
mui.back = function() {
	if(!first) {
		first = new Date().getTime();
		plus.nativeUI.toast("再按一次将退出小区圈子");
		setTimeout(function() {
			first = null;
		}, 1000);
	} else {
		if(new Date().getTime() - first < 1000) {
			plus.runtime.quit();
		}
	}
}