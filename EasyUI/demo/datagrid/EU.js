(function ($) {
	
	window['EU'] = {};
	
	/**
	 * 获取宽度百分比
	 */
	EU.fixWidth = function(percent) {
		
		return ($(window).width()) * percent;
	}
	
	/**
	 * 获取高度百分
	 */
	EU.fixHeight = function(percent) {
		
		return ($(window).height()) * percent;
	}
	
	/**
	 * 弹出层
	 */
	EU.dialog = function(_id, options) {
		/* Dialog属性参数 */
		var id = _id; 
		var title       = (options && undefined != options.title)?options.title:'新窗口';
		var collapsible = (options && undefined != options.collapsible)?options.collapsible:false;
		var minimizable = (options && undefined != options.minimizable)?options.minimizable:false;
		var maximizable = (options && undefined != options.maximizable)?options.maximizable:false;
		var resizable   = (options && undefined != options.resizable)?options.resizable:false;
		var toolbar     = (options && undefined != options.toolbar)?options.toolbar:null;
		var buttons     = (options && undefined != options.buttons)?options.buttons:null;
		var width       = (options && undefined != options.width)?options.width:400;
		var height      = (options && undefined != options.height)?options.height:200;
		var closed      = (options && undefined != options.closed)?options.closed:false;
		var closable    = (options && undefined != options.closable)?options.closable:true;
		var draggable   = (options && undefined != options.draggable)?options.draggable:true;
		var href        = (options && undefined != options.href)?options.href:'';
		var modal       = (options && undefined != options.modal)?options.modal:true;
		var iframe      = (options && undefined != options.iframe)?options.iframe:false;
		var onClose     = (options && undefined != options.onClose)?options.onClose:null;
		
		/* 创建DIV */
		var layer = document.createElement('div');
		layer.setAttribute('id', id + '_modal');
		document.body.appendChild(layer);
		
		if (iframe) {
			layer.innerHTML = '<iframe id="' + id + '_ifr" src="' + href+ '" frameborder="no" border="0" marginwidth="0" marginheight="0" width="100%" scrolling="no" allowtransparency="yes" height="100%" />';
		}
		
		$('#' + id + '_modal').dialog({
			title:title, 
		    collapsible:collapsible, 
		    minimizable:minimizable, 
		    maximizable:maximizable, 
		    resizable:resizable, 
		    toolbar:toolbar, 
		    buttons:buttons, 
		    width:width, 
		    height:height, 
		    closed:closed, 
		    closable:closable, 
		    draggable:draggable, 
		    href:(iframe)?null:href, 
		    modal:modal,
		    onClose:onClose
		});
	}
	
	/**
	 * 关闭Dialog
	 */
	EU.dialog.close = function(id) {
		$('#' + id + '_modal').dialog('close');
	}
	
	/**
	 * 显示提示框 Info
	 */
	EU.showInfo = function(content) {
		$.messager.alert('信息提示', content, 'info');
	}
	
	/**
	 * 显示提示框 Info 回调方法
	 */
	EU.showInfo = function(content, callback) {
		$.messager.alert('信息提示', content, 'info', callback);
	}
	
	
	/**
	 * 显示提示框 Error
	 */
	EU.showError = function(content) {
		$.messager.alert('错误提示', content, 'error');
	}
	
	/**
	 * 显示提示框 Error 回调方法
	 */
	EU.showError = function(content, callback) {
		$.messager.alert('错误提示', content, 'error', callback);
	}
	
	/**
	 * 显示提示框 Warning
	 */
	EU.showWarning = function(content) {
		$.messager.alert('警告提示', content, 'warning');
	}
	
	/**
	 * 显示提示框 Warning 回调方法
	 */
	EU.showWarning = function(content, callback) {
		$.messager.alert('警告提示', content, 'warning', callback);
	}
	
	/**
	 * 显示提示框 Question
	 */
	EU.showQuestion = function(content) {
		$.messager.alert('问题提示', content, 'question');
	}
	
	/**
	 * 显示Confirm
	 */
	EU.confirm = function(content, callback) {
		$.messager.confirm('提示', content, callback);
	}
	
	$.extend($.fn.validatebox.defaults.rules, {
		
		/**
		 * 手机号码验证
		 */
		phone:{
			validator:function(value) {
				
				return /^(13|15|18|14|17)\d{9}$/i.test(value);
			}, message:"请输入有效的手机号码！"
		},
		
		/**
		 * 数字验证(包括整数和小数)
		 */
		number:{
			validator:function(value) {
				
				return  /^\d+(\.\d+)?$/i.test(value);
			}, message:"请输入有效的数字！"
		},
		
		/**
		 * 整数验证
		 */
		integer:{
			validator:function(value) {
				
				return /^[+]?[1-9]+\d*$/i.test(value);
			}, message:"请输入有效的整数！"
		},
		
		/**
		 * 密码验证
		 */
		passwd:{
			validator:function(value, param) {
				if($("#" + param[0]).val() != "" && value != "") {
					return $("#" + param[0]).val() == value;
				} else {
					return true;
				}
			}, message:"两次输入的密码不一致！"
		}
	});
	
})(jQuery);