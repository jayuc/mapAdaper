
/**
 * 定义一个图盟地图
 * Yu Jie
 * 2018-07-05
 */

'use strict';

var AhMap = {};

(function($, AhMap){
	
	//默认配置
	var default_options = {
		minZoom: 3,
		maxZoom: 23,
    	zoom : 14,//设置地图初始化级别
		center : new IMAP.LngLat(116.484101,39.989996),//设置地图中心点坐标
    	animation : true//设置地图缩放动画效果	
	};
	
	AhMap.Map = map;
	
	//map核心对象
	function map(domElement, _options){
		
		this.options = default_options;
		$.extend(this.options, _options);
		
		this.map =  new IMAP.Map(domElement, this.options);
		
	}
	
	
})(jQuery, AhMap);