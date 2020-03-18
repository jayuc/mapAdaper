
/**
 * 适配 openLayers2 地图api,定义接口(兼容其他的地图api)
 * Yu Jie
 * 2018-10-09
 */

/**
 *
 * 名称: mapAdapter
 * 说明：依赖jquery
 *
 * ========= 定义实体 ===========
 * Constants 对象 ： {
 *                  //事件类型
 *                  CLICK: 'click',  //单击事件
 *                  DBLCLICK: '',   //双击事件
 *                  MOUSE_OVER: '',   //鼠标悬停事件
 * 
 *                  //线类型
 *                  SOLID: '',  //实线
 *                  DASHED: '',  //虚线
 *              }
 * 
 * ========= 初始化方法 =========
 * 目的：绑定map对象，从而为map对象添加下列方法
 * 方法名：init
 * 参数： 1.map对象 2.地图事件对象（暂支持单击事件） 例如：{
 *          									'click': function(event){}   //事件类型：暂支持单击事件 
 *          																   //event表示事件本身，
 *      									}
 *      3.options 更多参数（用于扩展参数） {auto: ture}
 * 返回： 内部封装了map的对象(mapWapper)，拥有下列方法
 * 
 * ======== mapWapper定义 =======
 * function
 * map属性：map
 * layer: 抽象图层属性，包含了所有图层；默认有个默认图层
 * 
 * ======= 覆盖物对象说明（抽象概念） ==========
 * 抽象概念并不等于具体覆盖物，比如打单点返回值，
 * 此覆盖物包括下列方法：
 *  
 *  ----getData  获取覆盖物数据
 *  ----getId   获取覆盖物id
 *  
 * ======= 信息窗口对象 ========
 * 生成信息窗口返回值
 * 包括如下方法：
 * 
 * ----setContext  更新内容 参数：html片段
 * ----setPosition  更新位置  参数：[lon, lat]
 * ----setSize   改变窗口大小
 * 
 * ========= 定义接口(mapWapper的公用方法) ===========
 * 
 * ----打单点：
 * 方法名：addPoint
 * 参数：
 *    1.经纬度数组(必填)； [180.12, 23.1245]
 *    2.图层名(默认defaultlayer)：''
 *    3.其他参数对象(选填，不填则使用默认值): {
 *                      imgUrl: '',  图片地址
 *                      size: [30, 30], 图片大小，宽和高
 *                      text: '显示文字', ,  //显示文字
 *                      textStyle: {},   //显示文字的css样式，
 *                      offset: [-30, -10]   //偏移距离（单位像素)
 *                  }
 *    4.事件对象： {
 *          		'click': function(a, b, c){}   //事件类型：回调函数,类型从自定义对象 Constants中选择, 
 *          										 //a表示数据，b表示图盟的事件本身，c表示覆盖物本身
 *      		}
 *    5.数据data : {
 *          title: ''  //标题，鼠标移动上面会显示
 *          titleWidth: ,  //标题宽度（有默认值）
 *          titleHeight: 20, // 标题高度 （默认20）
 *          titleStyle: {}  //标题css 样式（有默认值）
 *          extendWidth: 0,  //扩充宽度
 *    }
 *    6.扩展参数{}
 * 返回：覆盖物（单点）对象
 * 
 * ----打闪烁的点
 * 方法名：addFlickeringPoint
 * 参数：
 * 	  1.经纬度数组(必填)； [180.12, 23.1245]
 *    2.图层名(默认defaultlayer)：''
 *    3.其他参数对象(选填，不填则使用默认值): {
 *                      background: ''  //闪烁颜色 例如 'rgba(255, 0, 0, 1)'   ,最后一个表示透明度
 *                  }
 *    4.事件对象： {
 *          		'click': function(a, b, c){}   //事件类型：回调函数,类型从自定义对象 Constants中选择, 
 *          										 //a表示数据，b表示图盟的事件本身，c表示覆盖物本身
 *      		}
 *    5.数据data : {
 *          title: ''  //标题，鼠标移动上面会显示
 *    }
 *    6.扩展参数{}
 * 返回：闪烁的点
 * 
 * ---删除闪烁的点
 * 方法名：removeFlickeringPoint
 * canshu：闪烁的点
 * 返回：无
 * 
 * ----根据覆盖物ID获取覆盖物
 * 方法名：getOverLayById
 * 参数：覆盖物id
 * 返回：覆盖物
 * 
 * ----根据覆盖物id移动覆盖物
 * 方法名：moveTo
 * 参数：1.覆盖物id 2.经纬度数组
 * 返回：
 * 
 * ----使覆盖物运动到某点
 * 方法名：moveToLonlat
 * 参数：1.覆盖物  2、移动到的点[x, y]  3、参数 {
 * 									speed: 80,  //速度 单位（km/h）
 * 									isRotate: true  //是否自适应角度
 * 								}
 * 返回：
 * 
 * ----使覆盖物运动到某点（通过覆盖物id）
 * 方法名：moveToLonlatById
 * 参数：1、覆盖物id  2、移动到的点[x, y]  3、参数 {
 * 									speed: 80,  //速度 单位（km/h）
 * 									isRotate: true  //是否自适应角度
 * 								}
 * 
 * ----使覆盖物沿某线段运动
 * 方法名：moveAlong
 * 参数：1.覆盖物  2、线段（用点[x,y]数组表示）  3、参数 {
 * 									speed: 80,  //速度 单位（km/h）
 * 									loop: true, //是否循环；
 * 									isRotate: true  //是否自适应角度
 * 								}
 * 返回：
 * 
 * ----使覆盖物沿某线段运动
 * 方法名：moveAlongById
 * 参数：1.覆盖物  2、线段（用点[x,y]数组表示）  3、参数 {
 * 									speed: 80,  //速度 单位（km/h）
 *  								loop: true, //是否循环；
 * 									isRotate: true  //是否自适应角度
 * 								}
 * 返回：
 * 
 * ----改变覆盖物图标
 * 方法名：setOverlayIcon
 * 参数：1.覆盖物 2.图标url 3.图标大小size
 * 返回：
 * 
 * ----根据覆盖物id改变icon（图标）
 * 方法名：changeIconById
 * 参数：1.覆盖物id 2.图标url 3.图标大小size
 * 返回：
 * 
 * ----根据数据生成覆盖物(点)：
 * 方法名：createOverLay
 * 参数：
 *    1.经纬度数组(必填)； [180.12, 23.1245]
 *    2.图层名(默认defaultlayer)：''
 *    3.其他参数对象(选填，不填则使用默认值): {
 *                      imgUrl: '',  图片地址
 *                      size: [30, 30], 图片大小，宽和高
 *                      
 *                  }
 *    4.事件对象： {
 *          		'click': function(a, b, c){}   //事件类型：回调函数,类型从自定义对象 Constants中选择, 
 *          										 //a表示数据，b表示图盟的事件本身，c表示覆盖物本身
 *      		}
 *    5.数据data : {
 *          title: ''  //标题，鼠标移动上面会显示
 *    }
 * 返回：覆盖物（单点）对象
 * 
 * ----根据wkt数据生成覆盖物：
 * 方法名：createOverLayByWkt
 * 参数：
 *    1.wkt 字符串； 
 *    2.图层名(默认defaultlayer)：''
 *    3.其他参数对象(选填，不填则使用默认值): {
 *                      imgUrl: '',  图片地址
 *                      size: [30, 30], 图片大小，宽和高
 *                      
 *                  }
 *    4.事件对象： {
 *          		'click': function(a, b, c){}   //事件类型：回调函数,类型从自定义对象 Constants中选择, 
 *          										 //a表示数据，b表示图盟的事件本身，c表示覆盖物本身
 *      		}
 *    5.数据data : {
 *          title: ''  //标题，鼠标移动上面会显示
 *    }
 * 返回：覆盖物对象
 * 
 * ----根据wkt数据添加覆盖物：
 * 方法名：addOverLayByWkt
 * 参数：
 *    1.wkt 字符串； 
 *    2.图层名(默认defaultlayer)：''
 *    3.其他参数对象(选填，不填则使用默认值): {
 *                      imgUrl: '',  图片地址
 *                      size: [30, 30], 图片大小，宽和高
 *                      
 *                  }
 *    4.事件对象： {
 *          		'click': function(a, b, c){}   //事件类型：回调函数,类型从自定义对象 Constants中选择, 
 *          										 //a表示数据，b表示图盟的事件本身，c表示覆盖物本身
 *      		}
 *    5.数据data : {
 *          title: ''  //标题，鼠标移动上面会显示
 *    }
 * 返回：覆盖物对象
 * 
 * ----添加覆盖物
 * 方法名：addOverLay
 * 参数：1. 覆盖物 overlay 2. 扩展参数 {}
 * 返回：覆盖物
 * 
 * ----添加覆盖物集合
 * 方法名：addOverLays
 * 参数：1. 覆盖物集合  2.扩展参数 {}
 * 返回：覆盖物集合
 * 
 * ----打多点
 * 方法名：addPoints
 * 参数：
 *    1.经纬度数组(必填)； [[180.12, 23.1245], [180.12, 23.1245]]
 *    2.图层名(默认defaultlayer)：''
 *    3.其他参数对象(选填，不填则使用默认值): {
 *                      imgUrl: '',  图片地址
 *                      size: [30, 30], 图片大小，宽和高
 *                      
 *                  }
 *    4.事件对象： {
 *          'click': function(a, b, c){}   //事件类型：回调函数,类型从自定义对象 Constants中选择
 *      }
 *    5.数据数组data[{
 *          title: ''  //标题，鼠标移动上面会显示
 *    }]
 * 返回：覆盖物对象数组
 * 
 * ----根据数据生成点覆盖物集合
 * 方法名：createPointOverlays
 * 参数：
 *    1.经纬度数组(必填)； [[180.12, 23.1245], [180.12, 23.1245]]
 *    2.图层名(默认defaultlayer)：''
 *    3.其他参数对象(选填，不填则使用默认值): {
 *                      imgUrl: '',  图片地址
 *                      size: [30, 30], 图片大小，宽和高
 *                      
 *                  }
 *    4.事件对象： {
 *          		'click': function(a, b, c){}   //事件类型：回调函数,类型从自定义对象 Constants中选择, 
 *          										 //a表示数据，b表示图盟的事件本身，c表示覆盖物本身
 *      		}
 *    5.数据数组data[{
 *          title: ''  //标题，鼠标移动上面会显示
 *    }]
 * 返回：覆盖物对象集合
 *
 * ----生成线覆盖物
 * 方法名：createPoline
 * 参数：
 *    1.经纬度数据（必填）：[[180.12, 23.1245], [180.12, 23.1245]]
 *    2.图层名(默认defaultlayer)：''
 *    3.其他参数对象（选填，不填则使用默认值）：{
 *                              strokeColor: '#ff0000', //折线颜色
 *                              strokeWeight: '2',   //折线宽度
 *                              strokeOpacity: 1,  //折线透明度，范围在 0~1 之间
 *                              strokeStyle： ''   //线类型，实线、虚线，类型从自定义对象 Constants中选择
 *                          }
 *    4.事件对象： {
 *          		'click': function(a, b, c){}   //事件类型：回调函数,类型从自定义对象 Constants中选择, 
 *          										 //a表示数据，b表示图盟的事件本身，c表示覆盖物本身
 *      		}
 *    5.数据data
 * 返回：覆盖物对象
 * 
 * ----画线
 * 方法名：addPoline
 * 参数：
 *    1.经纬度数据（必填）：[[180.12, 23.1245], [180.12, 23.1245]]
 *    2.图层名(默认defaultlayer)：''
 *    3.其他参数对象（选填，不填则使用默认值）：{
 *                              strokeColor: '#ff0000', //折线颜色
 *                              strokeWeight: '2',   //折线宽度
 *                              strokeOpacity: 1,  //折线透明度，范围在 0~1 之间
 *                              strokeStyle： ''   //线类型，实线、虚线，类型从自定义对象 Constants中选择
 *                          }
 *    4.事件对象： {
 *          		'click': function(a, b, c){}   //事件类型：回调函数,类型从自定义对象 Constants中选择, 
 *          										 //a表示数据，b表示图盟的事件本身，c表示覆盖物本身
 *      		}
 *    5.数据 data
 *    6.扩展参数 {}
 * 返回：覆盖物对象
 * 
 * ----生成多边形覆盖物
 * 方法名：createPolygon
 * 参数：
 *    1.经纬度数据（必填）：[[180.12, 23.1245], [180.12, 23.1245]]
 *    2.图层名(默认defaultlayer)：''
 *    3.其他参数对象（选填，不填则使用默认值）：{
 *                              fillColor: '',     //填充颜色
 *                              fillOpacity: '',   //填充透明度
 *                              strokeColor: '#ff0000', //折线颜色
 *                              strokeWeight: '2',   //折线宽度
 *                              strokeOpacity: 1,  //折线透明度，范围在 0~1 之间
 *                              strokeStyle： ''   //线类型，实线、虚线，类型从自定义对象 Constants中选择
 *                          }
 *    4.事件对象： {
 *          		'click': function(a, b, c){}   //事件类型：回调函数,类型从自定义对象 Constants中选择, 
 *          										 //a表示数据，b表示图盟的事件本身，c表示覆盖物本身
 *      		}
 *    5.数据data
 * 返回：覆盖物对象
 *
 * ----画多边型
 * 方法名：addPolygon
 * 参数：
 *    1.经纬度数据（必填）：[[180.12, 23.1245], [180.12, 23.1245]]
 *    2.图层名(默认defaultlayer)：''
 *    3.其他参数对象（选填，不填则使用默认值）：{
 *                              fillColor: '',     //填充颜色
 *                              fillOpacity: '',   //填充透明度
 *                              strokeColor: '#ff0000', //折线颜色
 *                              strokeWeight: '2',   //折线宽度
 *                              strokeOpacity: 1,  //折线透明度，范围在 0~1 之间
 *                              strokeStyle： ''   //线类型，实线、虚线，类型从自定义对象 Constants中选择
 *                          }
 *    4.事件对象： {
 *          		'click': function(a, b, c){}   //事件类型：回调函数,类型从自定义对象 Constants中选择, 
 *          										 //a表示数据，b表示图盟的事件本身，c表示覆盖物本身
 *      		}
 *    5.数据data
 *    6.扩展参数 {}
 * 返回：覆盖物对象
 * 
 *  ----生成矩形覆盖物
 * 方法名：createRectangle
 * 参数：
 *    1.经纬度数据（必填且只有两个点）：[[180.12, 23.1245], [180.12, 23.1245]]
 *    2.图层名(默认defaultlayer)：''
 *    3.其他参数对象（选填，不填则使用默认值）：{
 *                              fillColor: '',     //填充颜色
 *                              fillOpacity: '',   //填充透明度
 *                              strokeColor: '#ff0000', //折线颜色
 *                              strokeWeight: '2',   //折线宽度
 *                              strokeOpacity: 1,  //折线透明度，范围在 0~1 之间
 *                              strokeStyle： ''   //线类型，实线、虚线，类型从自定义对象 Constants中选择
 *                          }
 *    4.事件对象： {
 *          		'click': function(a, b, c){}   //事件类型：回调函数,类型从自定义对象 Constants中选择, 
 *          										 //a表示数据，b表示图盟的事件本身，c表示覆盖物本身
 *      		}
 *    5.数据data
 * 返回：覆盖物对象
 *
 * ----画矩形
 * 方法名：addRectangle
 * 参数：
 *    1.经纬度数据（必填且只有两个点）：[[180.12, 23.1245], [180.12, 23.1245]]
 *    2.图层名(默认defaultlayer)：''
 *    3.其他参数对象（选填，不填则使用默认值）：{
 *                              fillColor: '',     //填充颜色
 *                              fillOpacity: '',   //填充透明度
 *                              strokeColor: '#ff0000', //折线颜色
 *                              strokeWeight: '2',   //折线宽度
 *                              strokeOpacity: 1,  //折线透明度，范围在 0~1 之间
 *                              strokeStyle： ''   //线类型，实线、虚线，类型从自定义对象 Constants中选择
 *                          }
 *    4.事件对象： {
 *          		'click': function(a, b, c){}   //事件类型：回调函数,类型从自定义对象 Constants中选择, 
 *          										 //a表示数据，b表示图盟的事件本身，c表示覆盖物本身
 *      		}
 *    5.数据data
 *    6.扩展参数 {}
 * 返回：覆盖物对象
 * 
 * ----生成圆形覆盖物
 * 方法名：createCircle
 * 参数：
 *    1.经纬度数据（必填）：[180.12, 23.1245]
 *    2.图层名(默认defaultlayer)：''
 *    3.园半径(必填): 5000
 *    4.其他参数对象（选填，不填则使用默认值）：{
 *                              fillColor: '',     //填充颜色
 *                              fillOpacity: '',   //填充透明度
 *                              strokeColor: '#ff0000', //折线颜色
 *                              strokeWeight: '2',   //折线宽度
 *                              strokeOpacity: 1,  //折线透明度，范围在 0~1 之间
 *                              strokeStyle： ''   //线类型，实线、虚线，类型从自定义对象 Constants中选择
 *                          }
 *    5.事件对象： {
 *          		'click': function(a, b, c){}   //事件类型：回调函数,类型从自定义对象 Constants中选择, 
 *          										 //a表示数据，b表示图盟的事件本身，c表示覆盖物本身
 *      		}
 *    6.数据data
 * 返回：覆盖物对象
 *
 * ----画圆形
 * 方法名：addCircle
 * 参数：
 *    1.经纬度数据（必填）：[180.12, 23.1245]
 *    2.图层名(默认defaultlayer)：''
 *    3.园半径(必填): 5000
 *    4.其他参数对象（选填，不填则使用默认值）：{
 *                              fillColor: '',     //填充颜色
 *                              fillOpacity: '',   //填充透明度
 *                              strokeColor: '#ff0000', //折线颜色
 *                              strokeWeight: '2',   //折线宽度
 *                              strokeOpacity: 1,  //折线透明度，范围在 0~1 之间
 *                              strokeStyle： ''   //线类型，实线、虚线，类型从自定义对象 Constants中选择
 *                          }
 *    5.事件对象： {
 *          		'click': function(a, b, c){}   //事件类型：回调函数,类型从自定义对象 Constants中选择, 
 *          										 //a表示数据，b表示图盟的事件本身，c表示覆盖物本身
 *      		}
 *    6.数据data
 *    7.扩展参数 {}
 * 返回：覆盖物对象
 * 
 ----创建label
 * 方法名：createLabel
   备注:这里的监听事件使用的是jq的监听
 * 参数：
 *     1.html :显示的html字段
       2.center  {lng,lat}
       3._options label的属性
	   4.图层名称
	   5.数据
	   6，事件，类似 addWindowInfo 里面的事件
 * 返回：label

 ----删除label
 * 方法名：removeLabel
 * 参数：label窗口
 * 返回：

 ----根据Keywods 绘制行政区划
 * 方法名：boundary
 * 参数：
 *     1.keyword :要搜索的区划关键字  eg:合肥市
       2._options  行政区划的样式属性 参考polygon
       3._areaOption 行政区划的属性  layerName，data()，auto（是否直接定位到这里），labelObj:{这里属性可以参考creatLabel的参数}
       4.areaCallback：点击行政区划的回调,
       5.centerCallback 有请求结果返回的时候 回调
 * 返回：null
 * 
 * ----删除指定覆盖物
 * 方法名：removeOverlay
 * 参数：覆盖物
 * 返回：是否成功删除(boolean)
 * 
 * ----删除指定覆盖物
 * 方法名：removeOverlayById
 * 参数：覆盖物id
 * 返回：是否成功删除(boolean)
 * 
 * ----删除一组覆盖物
 * 方法名：removeOverlays
 * 参数：覆盖物数组
 * 返回：是否成功删除(boolean)
 * 
 * ----获取指定图层上的全部覆盖物
 * 方法名：getLayerOverlays
 * 参数：图层名称layerName
 * 返回：
 * 
 * ----通过id隐藏某个覆盖物
 * 方法名：hideOverlayById
 * 参数：覆盖物id
 * 返回：无
 * 
 * ----通过id显示某个覆盖物
 * 方法名：showOverlayById
 * 参数：覆盖物id
 * 返回：无
 * 
 * ----隐藏某个覆盖物
 * 方法名：hideOverlay
 * 参数：覆盖物
 * 返回：无
 * 
 * ----显示某个覆盖物
 * 方法名：showOverlay
 * 参数：覆盖物
 * 返回：无
 * 
 * ----隐藏指定图层的全部覆盖物
 * 方法名：hideLayerOverLays
 * 参数：图层名称
 * 返回：
 * 
 * ----显示指定图层的全部覆盖物
 * 方法名：showLayerOverLays
 * 参数：图层名称
 * 返回：
 * 
 * ========== 绘制点线面 ==========
 * 方法名： drawPoint 绘制点
 * 		 drawPolyline 绘制折线
 * 		 drawRect  绘制矩形
 * 		 drawCircle  绘制园
 * 		 drawPolygon  绘制多边形
 * 参数：
 * 	   1.第一个参数为  {
 * 					layer: '',   图层名称（将覆盖物绘制在哪个图层上，默认值为默认图层）
 *					imgUrl: '',  图片地址
 *                  size: [30, 30], 图片大小，宽和高
 * 					arrow: true,   //是否带箭头
 * 					autoClose: true,  //是否自动关闭
 * 					fillColor: 'red',  //填充颜色
 * 					fillOpacity: 0.1, //填充透明度
 * 					strokeColor： 'red',  //边框颜色
 * 					strokeOpacity: 0.1, //边框透明度
 * 					strokeWeight: '2',  //边框宽度
 * 				}
 * 		2.第二个参数 ： 添加完成后的调方法 function(a, b, c){
 * 							a:表示经纬度或经纬度数组，如果是园就是园心，如果是矩形就是矩形的范围,  注意：矩形按照多边形为经纬度数组（类似多边形），抛弃以前只有左上点和右下点集合
 * 							b:代表覆盖物本身，如果是园则是圆半径
 * 							c:如果是园，就是园本身，其他无，
 * 						}
 * 		3.第三个参数： {
 *          		'click': function(a, b, c){}   //事件类型：回调函数,类型从自定义对象 Constants中选择, 
 *          										 //a表示数据，b表示图盟的事件本身，c表示覆盖物本身
 *      		}
 * 返回： 绘制对象本身
 * 
 * ----清除绘制
 * 方法名：clearDrawControl
 * 参数：绘制对象本身
 * 返回：无
 * 
 * ----删除指定图层的全部覆盖物
 * 方法名：removeLayerOverLays
 * 参数：图层名称
 * 返回：
 * 
 * ----初始化聚合图层
 * 方法名：initClusterLayer
 * 参数：1.覆盖物集合(初始化可以添加覆盖物，可以为空集合), 
 * 		2.点击聚合图标回调事件（参考上面事件） {
 * 						 				'click': function(lonlat, data){}  //lonlat经纬度对象 {
 * 																						lng: 118.13545,   //经度
 * 																						lat: 32.2555      //维度
 * 																					}
 * 																		   //data 聚合的覆盖物集合
 *									}
 * 		 3. 扩展参数对象 {}
 * 返回：
 * 
 * ----向聚合图层上添加覆盖物点集合
 * 方法名：addOverLaysToCluster
 * 参数：1.覆盖物集合 2. 扩展参数对象 {}
 * 返回：
 * 
 * ----向聚合图层上删除覆盖物集合
 * 方法名：removeOverlaysFromCluster
 * 参数：1. 覆盖物集合 2. 扩展参数对象 {}
 * 返回：
 * 
 * ----添加图层
 * 方法名：addLayerByUrlFun
 * 参数：function(x, y, z){}  //具体x,y,z可参数图盟api
 * 返回：图层对象本身（注意图层对象对于我们来说是个抽象的概念）
 * 
 * ----添加图层
 * 方法名：addLayerByUrl
 * 参数：1.url地址 2.扩展参数 {visible:true, type:'arcgisService'}  visible:是否立马显示，默认显示   type说明：arcgisServicearcgis服务方式, 默认为图片（切片）方式 值为：xyz
 * 返回：图层对象本身（注意图层对象对于我们来说是个抽象的概念）
 * 
 * ----删除图层
 * 方法名：removeLayer
 * 参数：图层对象本身
 * 返回：
 * 
 * ----叠加实时交通图层
 * 方法名：addTrafficLayer
 * 参数： 无
 * 返回：
 * 
 * ----属性实时交通图层
 * 方法名：refreshTrafficLayer
 * 参数：1.时间间隔，用来消除刷屏感
 * 返回：
 * 
 * ----删除实时交通图层
 * 方法名：removeTrafficLayer
 * 参数：无
 * 返回：
 * 
 * ----生成信息窗口
 * 方法名：addWindowInfo
 * 参数：1.经纬度数组 2.内容  3.size 数组 [width, height] 4.events 事件对象 {
 * 																	'close': function(){}
 * 																}
 * 		5.扩展参数 {} 具体见代码里面
 * 返回：信息窗口对象
 * 
 * ----删除信息窗口
 * 方法名：removeWindowInfo
 * 参数：信息窗口
 * 返回：
 * 
 * ----向地图中添加html
 * 方法名：addHtml
 * 参数：1.经纬度 2.html内容 3.size 数组 [width, height] 4.参数 {
 * 															closeShow: true,      //是否显示关闭按钮
											        		offset: [0, 0],      //偏移参数
											        		imgUrl: null,         //正常情况下不使用此参数
											        		autoPan: false,       //是否自动移动到窗口的可见区域
											        		padding: 10,
											        		style: {				// css样式
											        					
											        			}
 * 														}
 * 		5.事件对象：{
 * 						'click':function(){},    //点击窗口事件
 * 						'close':function(){}	 //点击关闭按钮后触发事件
 * 					}
 * 		6.数据: data
 * 返回：html对象
 * 
 * ----删除向地图中添加的html
 * 方法名：removeHtml
 * 参数：html对象
 * 返回：无
 * 
 * ----获取几个点的中心
 * 方法名：getCenterByBound
 * 参数：经纬度数组
 * 返回：中心点经纬度数组
 * 
 * ----将某经纬度在中心点显示
 * 方法名：setCenter
 * 参数：1.经度 2.纬度 ,
 * 返回：无
  * ----地图按照像素平移
 * 方法名：togglePanBy
 * 参数：1.偏移左距离 2.移动的纵距离 ,
 * 返回：无
 * ----将某经纬度在中心点显示（不转化的）
 * 方法名：setCenterNoTransform
 * 参数：1.经度 2.纬度 , zoom
 * 返回：无
 * 
 * ----将某经纬度在中心点显示（wkt格式数据）
 * 方法名：setCenterByWkt
 * 参数：wkt字符串
 * 返回： 无
 * 
 * -----回到初始化地图的位置和中心点上
 * 方法名：toInitPositionAndZoom
 * 参数： 无
 * 返回：无

 * 
 * ----删除所有覆盖物
 * 方法名：clearOverlays
 * 参数：无
 * 返回： 无

 *
 * ----创建折线绘制工具
 * 方法名：intPolylineTool
 * 参数：callback：初始化polyLineTool后回调方法
 * 返回：无
 * 解释说明：在工具类初始化过程中，该方法异步执行，针对绘制工具类的参数和时间绑定都需要在此设置
 *           如果参数和事件不需要在初始化后立即执行，则在此可以不用
 *
 * ----工具类绑定事件方法：add,remove
 * 方法名：addEventListenerForTool
 * 参数：typeStr:add 添加覆盖物后触发事件，remove 移除覆盖物后触发事件
 *       fun:事件方法
 * 返回：无
 *
 * ----地图加载工具类
 * 方法名：addTool
 * 参数：无
 * 返回：无
 *
 * ----打开工具，工具类开始绘制
 * 方法名：openTool
 * 参数：无
 * 返回：无
 *
 * ----关闭工具，工具类绘制结束
 * 方法名：closeTool
 * 参数：无
 * 返回：无
 *
 * ----地图删除所有覆盖物
 * 方法名：clearMap
 * 参数：无
 * 返回：无
 * 
 * ----根据行政区划名字画行政区划
 * 方法名：addDistrictShowByName
 * 参数：1.行政区划名称， 2.样式参数  {
								fillOpacity: 0.5,   //透明度
								strokeStyle: IMAP.Constants.OVERLAY_LINE_DASHED,  //边框实线、虚线
								strokeWeight: 2     //边框粗细
							}
 * 返回：无
 * 
 * ----路线规划（步行）
 * 方法名：walkPlan
 * 参数：1、起点经纬度 2、终点经纬度 3、规划完成后回调函数  function(result){
 * 												//其中result结构为  图盟路径规划数据结构（详细见：图盟api）
 * 											}
 * 		4、其他参数：{
 * 				tactics: 默认值：LEAST_TIME（用时最少）  //规划策略  可选策略：LEAST_DISTANCE（距离最短）
 * 				coordType： // gcj02（国测局加密坐标）、wgs84（gps设备获取的坐标）
 * 				clear: true  //是否清楚路线，默认不删除
 * 			}
 * 返回：
 * 
 * ----路线规划（驾车）
 * 方法名：drivePlan
 * 参数：1、起点经纬度 2、终点经纬度 3、规划完成后回调函数  function(result){
 * 												//其中result结构为  图盟路径规划数据结构（详细见：图盟api）
 * 											}
 * 		4、其他参数：{
 * 				tactics: 默认值：LEAST_TIME（用时最少）  //规划策略  可选策略：LEAST_DISTANCE（距离最短）,还有更多策略，请关注图盟api
 * 				coordType： // gcj02（国测局加密坐标）、wgs84（gps设备获取的坐标）
 * 				clear: true  //是否清楚路线，默认不删除
 * 			}
 * 返回：
 * 
 * 
 */

'use strict';

//定义核心对象
window.mapAdapter = {};

(function(mapAdapter){   //说明：依赖jquery
	
	//定义常量对象
    var constants = {  //支持扩展属性
        CLICK: 'click',      //单击
        DBLCLICK: 'dblclick',  //双击
        RIGHT_CLICK: 'rightclick',     //右击事件
        MOUSE_OVER: 'mouseover',  //鼠标悬停
        MOUSE_OUT: 'mouseout',    //鼠标离开
        SOLID: 'solid',   //实线
        DASHED: 'dash',  //虚线
        //LABELDEFAULT:IMAP.Constants. OVERLAY_LABEL_DEFAULT ,//label 默认展示类型
        //LABELHTML:IMAP.Constants.OVERLAY_LABEL_HTML ,//label 支持HTML标签类型
        TIP_CLOSE: 'close',    //窗口关闭事件
    };
    //暴露常量
    mapAdapter.constants = constants;
    
    //事件映射对象
    var eventMap = {
    	'click': 'clickFeature',
    	'rightclick': 'rightClickFeature',
    	'mouseover': 'overFeature',
    	'mouseout': 'outFeature'
    };
    
    //定义单点默认配置项
    var defaultPointOptions = function(){
        return {
        	size: [36, 36],
			cursor : "pointer",
			imgUrl : "frameworks/Openlayers/img/marker.png"
        };
    };
    
    //定义线默认配置项
    var defaultLineOptions = function(){
        return {
            strokeColor: '#ff0000', //折线颜色
            strokeWeight: 2,   //折线宽度
            strokeOpacity: 1,  //折线透明度，范围在 0~1 之间
            strokeStyle: constants.SOLID,  //线类型，实线、虚线，类型从自定义对象 Constants中选择
            cursor : "pointer",
        };
    };
    
    //定义多边形默认配置项
    var defaultPolygonOptions = function(){
        return {
            fillColor: '#ff0000',     //填充颜色
            fillOpacity: 0.7,   //填充透明度
            strokeColor: '#ff0000', //折线颜色
            strokeWeight: 2,   //折线宽度
            strokeOpacity: 1,  //折线透明度，范围在 0~1 之间
            cursor : "pointer",
            strokeStyle: constants.SOLID   //线类型，实线、虚线，类型从自定义对象 Constants中选择    
        };
    };
    
    //定义矩形默认配置
    var defaultRectangleOptions = function(){
        return defaultPolygonOptions();
    };
    
    //定义圆默认配置项
    var defaultCircleOptions = function(){
        return defaultPolygonOptions();
    };
    
    //定义图层默认样式
    var defaultLayerStyle = function(){
    	var style = {
			externalGraphic : 'frameworks/Openlayers/img/marker.png',
            graphicWidth : 18,
            graphicHeight : 18,
    	};
    	$.extend(style, defaultPolygonOptions());
    	style.strokeDashstyle = style.strokeStyle;
    	return style;
    };
    
    //定义聚合图层默认样式
    var defaultClusterStyle = new OpenLayers.Style({
		cursor : "pointer",
		label : "${name}",
		fontColor : "blue",
		pointRadius : "${radius}",
		fillColor : "#ffcc66",
		fillOpacity : 0.8,
		strokeColor : "#cc6633",
		strokeWidth : 2,
		strokeOpacity : 0.8
	}, {
		context : {
			radius : function(feature) {
				var pix = 2;
				if (feature.cluster) {
					pix = Math.min(feature.attributes.count, 7) + 6;
				}
				return pix;
			},
			name : function(feature) {
				var name;
				if (feature.attributes.count > 1) {
					name = feature.attributes.count;
				} else {
					name = 1;
				}
				return name;
			}
		}
	});
    
    //定义拥堵级别
    var jamLevelColor = {
    	1: '#ffcc00',
    	2: '#f52d26',
    	3: '#870a03',
    };
    
    //定义地图级别对应路宽
    var mapLevelRoadWidth = {
    	1: 3,
    	2: 3,
    	3: 3,
    	4: 3,
    	5: 3,
    	6: 3,
    	7: 3,
    	8: 3,
    	9: 3,
    	10: 3,
    	11: 3,
    	12: 3,
    	13: 3
    };
    //暴露数据
    mapAdapter.jamLevelColor = jamLevelColor;
    mapAdapter.mapLevelRoadWidth = mapLevelRoadWidth;
	
    //初始化方法
    mapAdapter.init = function(map, events, options){
        return new mapWapper(map, events, options);
    };
    
    //map core
    function mapWapper(map, events, _options){
    	
    	if(typeof map != 'object'){
            throw new Error('非法map对象');
        }
        this.map = map;    //地图对象
        
        var options = {  //默认参数
        	style: defaultClusterStyle,
        	distance: 70,   // 聚合的最小像素
        	threshold: 2    // 聚合的最小数量
        };
        this.options = $.extend(options, _options);  //扩展参数对象
        
        //加载路况图层
        this.roadDeafultStateLayer = this.addLayerByUrl(GISConfig.roadDeafultStateUrl, {visible:false});
        
        this.trafficVectorLayer = new OpenLayers.Layer.Vector('trafficVectorLayer');   //路况拥堵图层
        this.map.addLayer(this.trafficVectorLayer);
        this.trafficModel = 1;       //1 --> 互联网模型   2 --> 卡口模型   3 --> 双模融合模型
        this.isLiveTraffic = false;    //是否是实时路况
        
        this.markLayer = new OpenLayers.Layer.Markers('mark');   //mark图层
        //this.map.addLayer(this.markLayer);
        
        this.layers = {'defaultLayer': 'defaultLayer'};    //图层集合对象
        this.overLayer = new OpenLayers.Layer.Vector('overLayer', {styleMap: createStyleMap(defaultLayerStyle())});   //覆盖物图层
        
        var strategy = new OpenLayers.Strategy.Cluster();
		strategy.distance = options.distance;
		strategy.threshold = options.threshold;
		this.clusterLayer = new OpenLayers.Layer.Vector('clusterLayer', {   //聚合图层
			strategies : [strategy],
			styleMap : new OpenLayers.StyleMap({
				"default" : options.style,
				"select" : {
					cursor : "pointer"
				}
			})
		});
        this.map.addLayers([this.overLayer, this.clusterLayer, this.markLayer]);
        this.markLayer.setZIndex(2000);   //将marker图层浮顶
        this.markLayer.fixIndex = true;
        
        this.clusterEvent = null;   //聚合图层事件对象
        
        this.clusterFeatures = {};    //聚合图层覆盖物集合对象
        
        var that = this;
        var control = new OpenLayers.Control.SelectFeature([this.clusterLayer, this.overLayer], {
        	clickFeature : function(feature){
        		var xy = feature.geometry.getCentroid();
        		if(feature.events && typeof feature.events['click'] == 'function'){
        			feature.events['click'](feature.data, {lonlat: [xy.x, xy.y]}, feature);
        		}
        		if(feature.cluster && that.clusterEvent && typeof that.clusterEvent['click'] == 'function'){
        			that.clusterEvent['click']({lng: xy.x, lat: xy.y}, feature.cluster);
        		}
			},
			hover : true,
			overFeature : function(feature){
				var xy = feature.geometry.getCentroid();
				if(feature.data.title){
					that.addTitleTip([xy.x, xy.y], feature.data);
				}
				if(feature.events && typeof feature.events['mouseover'] == 'function'){
        			feature.events['mouseover'](feature.data, {lonlat: [xy.x, xy.y]}, feature);
        		}
				if(feature.cluster && that.clusterEvent && typeof that.clusterEvent['mouseover'] == 'function'){
        			that.clusterEvent['mouseover']({lng: xy.x, lat: xy.y}, feature.cluster);
        		}
			},
			outFeature : function(feature){
				var xy = feature.geometry.getCentroid();
				if(feature.data.title && that.popup){
					that.removePopup();
				}
				if(feature.events && typeof feature.events['mouseout'] == 'function'){
        			feature.events['mouseout'](feature.data, {lonlat: [xy.x, xy.y]}, feature);
        		}
				if(feature.cluster && that.clusterEvent && typeof that.clusterEvent['mouseout'] == 'function'){
        			that.clusterEvent['mouseout']({lng: xy.x, lat: xy.y}, feature.cluster);
        		}
			},
			onRightSelect : function(feature){
				var xy = feature.geometry.getCentroid();
				if(feature.events && typeof feature.events['rightclick'] == 'function'){
        			feature.events['rightclick'](feature.data, {lonlat: [xy.x, xy.y]}, feature);
        		}
				if(feature.cluster && that.clusterEvent && typeof that.clusterEvent['rightclick'] == 'function'){
        			that.clusterEvent['rightclick']({lng: xy.x, lat: xy.y}, feature.cluster);
        		}
			},
        });
        control.hover = false;
        this.map.addControl(control);
        control.activate();
        
        this.drawControls = {};    //绘制control集合对象
        this.fightMap = {};    //实时拥堵闪烁点集合
        this.data = {};
        this.popupArr = [];   //所有气泡的集合

		this.bottom_level1 = 110;
		this.bottom_level2 = 200;
        
        //给地图绑定事件
        bindMapEvents(this.map.events, this.map, events);
        
        this.map.events.register('zoomend', this.map, function(data){   //地图放缩结束响应事件
        	var zoom = this.zoom;
        	//console.log(zoom);
        	if(that.isLiveTraffic){   //当为实时路况时，才更新
        		that.refreshTrafficLayer(that.trafficModel, that.getData('isShowFlight'));
        	}
        	
        	if(events && events['zoom']){
        		for(var index in events['zoom']){
        			if(that.data[index] && typeof events['zoom'][index] == 'function'){
        				events['zoom'][index](zoom, that.getBounds(), data);
        			}
        		}
        	}
			
		});

        // 注册地图拖动事件
        if(events && typeof events['moveend'] === 'function'){
            this.map.events.register('moveend', this.map, function(data){
                events['moveend'](that.map.zoom, that.getBounds(), data);
            });
        }
        if(events && typeof events['movestart'] === 'function'){
            this.map.events.register('movestart', this.map, function(data){
                events['movestart'](that.map.zoom, that.getBounds(), data);
            });
        }

        //earsure foo
        this.map.setLayerZIndex = function(layer, zIdx){
        	if(!layer.fixIndex){
        		layer.setZIndex(
                        this.Z_INDEX_BASE[layer.isBaseLayer ? 'BaseLayer' : 'Overlay']
                        + zIdx * 5 );
        	}
        };
        
    }
    //map core prototype
    mapWapper.prototype = {  //所有方法参数可参照上面定义的接口
    	
    	setData: function(key, value){
    		this.data[key] = value;
    	},
    	
    	getData: function(key){
    		return this.data[key];
    	},
    		
    	//设置是否是实时路况(废弃此方法，已经不再需要)
    	setLiveTraffic: function(isLive){
    		//this.isLiveTraffic = !!isLive;
    	},

		// 获取地图范围
		getBounds: function () {
			var extent = this.map.getExtent();
			return extent;
        },
    		
		//打单点
        addPoint: function(lonlat, layerName, options, events, data, _opt){
        	if(!$.isArray(lonlat)) return null;
        	if(options && (options.text || options.offset)){  //有文字
        		var marker = this.addHtml(lonlat, options.text, options.size, {
        			offset: options.offset,
        			closeShow: false,
        			imgUrl: options.imgUrl,
        			style: {
        				cursor: 'pointer'
        			}
        		}, events, data);
        		if(options.textStyle){
        			$(marker.contentDiv).children('div').children('span').css(options.textStyle);
        		}
        		return marker;
        	}
        	var feature = this.createOverLay(lonlat, layerName, options, events, data);
        	if(feature){
        		this.addOverLay(feature, _opt);
        	}
        	return feature;
        },
        
        //打闪烁的点
        addFlickeringPoint: function(lonlat, layerName, _options, events, data){
        	if(!$.isArray(lonlat)) return;
        	var options = {
    			closeShow: false,     
        		autoPan: false,      
        		padding: 0,
        		offset: [-15, -15],
        		style: {
        			
        		}
        	};
        	$.extend(options, _options);
        	var that = this;
        	var marker = this.addHtml(lonlat, "<div class='case-address-animation'></div>", [30, 30], options);
        	if(options && options.background){
    			$(marker.div).find('.case-address-animation').css({
    				background: options.background
    			});
    		}
        	if(events && typeof events['click'] == 'function'){
    			marker.events.register('click', marker, function(e){
    				events['click'](data, e);
    	    	});
    		}
        	marker.events.register('mouseover', marker, function(e){
        		if(data && data.title){
					that.addTitleTip(lonlat, data);
				}
        		if(events && typeof events['mouseover'] == 'function'){
        			events['mouseover'](data, e);
        		}
	    	});
        	marker.events.register('mouseout', marker, function(e){
        		if(data && data.title && that.popup){
					that.removePopup();
				}
        		if(events && typeof events['mouseout'] == 'function'){
        			events['mouseout'](data, e);
        		}
	    	});
    		return marker;
        },
        
        //删除闪烁的点
        removeFlickeringPoint: function(point){
        	this.removeHtml(point);
        },

        //根据wkt数据添加覆盖物
        addOverLayByWkt: function(wkt, layerName, options, events, data){
        	var overlay = this.createOverLayByWkt(wkt, layerName, options, events, data);
        	if(overlay){
        		this.addOverLay(overlay);
        	}else {
        		console.error("空间数据异常, wkt: " + wkt);
			}
            return overlay;
        },

        //根据wkt数据生成覆盖物
        createOverLayByWkt: function(wkt, layerName, options, events, data){
        	var lonlat = this.wktToLonlat(wkt);
        	var overlay;
        	if(lonlat){
        		switch (lonlat.type){
		        	case 'point':
		        		overlay = this.createOverLay(lonlat.lonlat, layerName, options, events, data);
		        		break;
		        	case 'polyline':
		        		overlay = this.createPoline(lonlat.lonlat, layerName, options, events, data);
		        		break;
					case 'multilinestring':
						overlay = this.createMultiPoline(lonlat.lonlat, layerName, options, events, data);
						break;
		        	case 'polygon':
		        		overlay = this.createPolygon(lonlat.lonlat, layerName, options, events, data);
		        		break;
	        	}
        	}
        	return overlay;
        },
    	
    	//生成单点覆盖物
    	createOverLay: function(lonlat, layerName, options, events, data){
    		return this.createFeature('point', lonlat, data, options, layerName, events);
    	},
    	
    	//打多点
        addPoints: function(lonlatArr, layerName, options, events, dataArr, _opt){
        	var featureArr = this.createPointOverlays(lonlatArr, layerName, options, events, dataArr);
        	this.addOverLay(featureArr, _opt);
        	return featureArr;
        },
    	
    	//生成覆盖物集合
        createPointOverlays: function(lonlatArr, layerName, options, events, dataArr){
        	var markerArr = [];
            if($.isArray(lonlatArr)){
                var d_a = false;
                if(dataArr){
                    if($.isArray(dataArr)){
                        d_a = true;
                    }else{
                        console.warn('dataArr需为数组');
                    }
                }
                var that = this;
                for(var i=0; i<lonlatArr.length; i++){
                    var mark = that.createOverLay(lonlatArr[i], layerName, options, events, d_a ? dataArr[i] : {});
                    if(mark){
                        markerArr.push(mark);
                    }
                }
            }else{
                console.warn('lonlatArr需为数组');
            }
            return markerArr;
        },
    	
    	//画线
    	addPoline: function(lonlatArr, layerName, options, events, data, _opt){
    		var feature = this.createPoline(lonlatArr, layerName, options, events, data);
    		if(feature){
    			this.addOverLay(feature, _opt);
    		}
    		return feature;
    	},
    	
    	//生成线覆盖物
    	createPoline: function(lonlatArr, layerName, options, events, data){
    		if(!$.isArray(lonlatArr)){
    			throw new Error('参数必须为数组');
    			return;
    		}
    		return this.createFeature('line', lonlatArr, data, options, layerName, events);
    	},

		// 生成多条线覆盖物
		createMultiPoline: function (lonlatArr, layerName, options, events, data) {
            if(!$.isArray(lonlatArr)){
                throw new Error('参数必须为数组');
                return;
            }
            return this.createFeature('multilinestring', lonlatArr, data, options, layerName, events);
        },
    	
    	//画多边型
        addPolygon: function(lonlatArr, layerName, options, events, data, _opt){
        	var feature = this.createPolygon(lonlatArr, layerName, options, events, data);
    		if(feature){
    			this.addOverLay(feature, _opt);
    		}
    		return feature;
        },
    	
    	//生成多边形覆盖物
		createPolygon: function(lonlatArr, layerName, options, events, data){
			if(!$.isArray(lonlatArr)){
    			throw new Error('参数必须为数组');
    			return;
    		}
			return this.createFeature('polygon', lonlatArr, data, options, layerName, events);
		},
		
		//画矩形
        addRectangle: function(lonlatArr, layerName, options, events, data, _opt){
        	var feature = this.createRectangle(lonlatArr, layerName, options, events, data);
    		if(feature){
    			this.addOverLay(feature, _opt);
    		}
    		return feature;
        },
    	
    	//生成矩形覆盖物
		createRectangle: function(lonlatArr, layerName, options, events, data){
			return this.createPolygon(rectConvertToPolygn(lonlatArr), layerName, options, events, data);
		},
		
		//画圆
        addCircle: function(lonlat, layerName, radius, options, events, data, _opt){
        	var feature = this.createCircle(lonlat, layerName, radius, options, events, data);
    		if(feature){
    			this.addOverLay(feature, _opt);
    		}
    		return feature;
        },
		
		//生成圆形覆盖物
		createCircle: function(lonlat, layerName, radius, options, events, data){
			return this.createFeature('circle', lonlat, data, options, layerName, events, radius);
		},
		
		//清除绘制对象
		clearDrawControl: function(control){
			if(control){
				control.deactivate();
			}
		},
		
		//绘制点
        drawPoint: function(_options, addFun, _event){
			var isChange = false;
        	if(_options){
        		isChange = true;
        	}
			var options = {
				autoClose: true
			};
        	$.extend(options, _options);
        	options.layer = this.handleLayer(options.layer);
        	if(isChange){
        		options.externalGraphic = options.imgUrl;
        		if($.isArray(options.size)){
        			options.graphicWidth = options.size[0];
        			options.graphicHeight = options.size[1];
        		}
        	}
			var control = this.getDrawControl('point', options, _event, addFun, isChange);
			if(control){
				control.activate();
			}
			return control;
		},
		
		//绘制线
        drawPolyline: function(_options, addFun, _event){
			var isChange = false;
        	if(_options){
        		isChange = true;
        	}
			var options = {
				autoClose: true
			};
        	$.extend(options, _options);
        	options.layer = this.handleLayer(options.layer);
        	if(isChange){
        		options.strokeDashstyle = options.strokeStyle;
        	}
			var control = this.getDrawControl('line', options, _event, addFun, isChange);
			if(control){
				control.activate();
			}
			return control;
		},
		
		//绘制多边形
        drawPolygon: function(_options, addFun, _event){
        	var isChange = false;
        	if(_options){
        		isChange = true;
        	}
			var options = {
				autoClose: true
			};
        	$.extend(options, _options);
        	options.layer = this.handleLayer(options.layer);
        	if(isChange){
        		options.strokeDashstyle = options.strokeStyle;
        	}
			var control = this.getDrawControl('polygon', options, _event, addFun, isChange);
			if(control){
				control.activate();
			}
			return control;
        },
        
        //绘制矩形
        drawRect: function(_options, addFun, _event){
        	var isChange = false;
        	if(_options){
        		isChange = true;
        	}
			var options = {
				autoClose: true
			};
        	$.extend(options, _options);
        	options.layer = this.handleLayer(options.layer);
        	if(isChange){
        		options.strokeDashstyle = options.strokeStyle;
                var opts = defaultLayerStyle();
                $.extend(opts, options);
                this.overLayer.styleMap = createStyleMap(opts);
        	}
			var control = this.getDrawControl('rect', options, _event, addFun, isChange);
			if(control){
				control.activate();
			}
			return control;
        },
        
        //绘制园
        drawCircle: function(_options, addFun, _event){
        	var isChange = false;
        	if(_options){
        		isChange = true;
        	}
			var options = {
				autoClose: true
			};
        	$.extend(options, _options);
        	options.layer = this.handleLayer(options.layer);
        	if(isChange){
        		options.strokeDashstyle = options.strokeStyle;
        	}
			var control = this.getDrawControl('circle', options, _event, addFun, isChange);
			if(control){
				control.activate();
			}
			return control;
        },
		
		//获取绘制control
		getDrawControl: function(type, options, events, addFun, isChange){
			var control;
			if(this.drawControls[type]){
				control = this.drawControls[type];
			}else{
				control = this.createDrawControl(type);
				this.drawControls[type] = control;
				this.map.addControl(this.drawControls[type]);
			}
			control.featureAdded = function(feature){
				if(options.autoClose){
					this.deactivate();
				}
				feature.events = events;
				feature.data = createFeatureDataFromFeature(feature);
				feature.data.layer = options.layer;
				feature.attributes.layer = options.layer;
				feature.getId = function(){
					return feature.id;
				};
				feature.getData = function(){
					return feature.data;
				};
				if(typeof addFun == 'function'){
					if(feature.data.radius){
						addFun(feature.data.path, feature.data.radius, feature);
					}else{
						addFun(feature.data.path, feature);
					}
				}
			};
			if(isChange){
				var opts = defaultLayerStyle();
				$.extend(opts, options);
				this.overLayer.styleMap = createStyleMap(opts);
			}
			return control;
		},
		
		//创建绘制control
		createDrawControl: function(type){
			var handler;
			var options;
			switch (type){
				case 'point':
					handler = OpenLayers.Handler.Point;
					break;
				case 'line':
					handler = OpenLayers.Handler.Path;
					break;
				case 'polygon':
					handler = OpenLayers.Handler.Polygon;
					break;
				case 'rect':
					handler = OpenLayers.Handler.RegularPolygon;
					options = {
                        handlerOptions: {
                            sides: 4,
                            irregular: true
                        }
                    };
					break;
				case 'circle':
					handler = OpenLayers.Handler.RegularPolygon;
					options = {
                        handlerOptions: {
                            sides: 64,
                            irregular: true
                        }
                    };
					break;
			}
			return new OpenLayers.Control.DrawFeature(this.overLayer, handler, options);
		},
    	
    	//添加覆盖物
        addOverLay: function(feature, _options){
        	var options = {
        		auto: true	
        	};
        	$.extend(options, _options);
        	try{
        		this.overLayer.addFeatures(feature, options);
        	}catch(e){
        		throw new Error('添加覆盖物失败');
        	}
        	return feature;
        },
        
        //添加覆盖物集合
        addOverLays: function(feature, _options){
        	return this.addOverLay(feature, _options);
        },

        //根据覆盖物id移动覆盖物
        moveTo: function(id, lonlat){
        	if(!$.isArray(lonlat)) return;
        	var feature = this.getOverLayById(id);
        	var longlat = createLonlat(lonlat[0], lonlat[1]);
        	if(feature && longlat){
        		feature.move(longlat);
        	}
        },

        //使覆盖物运动到某点
        moveToLonlat: function(mark, lonlat, _options){
        	if(!$.isArray(lonlat) || !mark) return;
        	var options = {
        		speed: 100	    //速度
        	};
        	$.extend(options, _options);
        	var geometry = mark.geometry;
        	var currentPoint = {
        		x: geometry.x,
        		y: geometry.y
        	};
        	var stopPoint = {
        		x: lonlat[0],
        		y: lonlat[1]
        	};
        	if(currentPoint.x == stopPoint.x && currentPoint.y == stopPoint.y){
        		return ;
        	}
        	function move(){
        		var nextPoint = getNextPoint(currentPoint, stopPoint);
        		var longlat = createLonlat(nextPoint.x, nextPoint.y);
        		currentPoint = nextPoint;
        		if(longlat){
            		mark.move(longlat);
            	}
        	}
        	var terval = setInterval(function(){
        		if(currentPoint.x == stopPoint.x && currentPoint.y == stopPoint.y){
        			clearInterval(terval);
            	}else{
            		move();
            	}
        	}, 2000/options.speed);
        },

        //使覆盖物运动到某点
        moveToLonlatById: function(id, lonlat, _options){
        	if(!$.isArray(lonlat)) return;
        	var feature = this.getOverLayById(id);
        	this.moveToLonlat(feature, lonlat, _options);
        },

        //使覆盖物沿某线段运动
        moveAlong: function(mark, lonlatArr, _options){
        	if(!$.isArray(lonlatArr) || !mark || lonlatArr.length < 2) return;
        	var options = {
        		speed: 100	
        	};
        	$.extend(options, _options);
        	var i = 1;
        	var geometry = mark.geometry;
        	var currentPoint = {
        		x: geometry.x,
        		y: geometry.y
        	};
        	function stopPoint(){
        		return {
            		x: lonlatArr[i][0],
            		y: lonlatArr[i][1]
            	};
        	}
        	if(currentPoint.x == stopPoint().x && currentPoint.y == stopPoint().y){
        		i ++;
        	}
        	function move(){
        		var nextPoint = getNextPoint(currentPoint, stopPoint());
        		var longlat = createLonlat(nextPoint.x, nextPoint.y);
        		currentPoint = nextPoint;
        		if(longlat){
            		mark.move(longlat);
            	}
        	}
        	var terval = setInterval(function(){
        		if(currentPoint.x == stopPoint().x && currentPoint.y == stopPoint().y){
        			i ++;
        			if(i == lonlatArr.length){
        				clearInterval(terval);
        			}
            	}else{
            		move();
            	}
        	}, 2000/options.speed);
        },

        //使覆盖物沿某线段运动
        moveAlongById: function(id, lonlatArr, _options){
        	if(!$.isArray(lonlatArr)) return;
        	var feature = this.getOverLayById(id);
        	this.moveAlong(feature, lonlatArr, _options);
        },
        
        //根据覆盖物id获取覆盖物
        getOverLayById: function(id){
        	var feature = this.overLayer.getFeatureById(id);
        	if(!feature){
        		feature = this.clusterLayer.getFeatureById(id);
        	}
        	return feature;
        },
        
        //更改图标
        setOverlayIcon: function(marker, imgUrl, imgSize){
        	if(!$.isArray(imgSize)) return;
        	var style = {
        		externalGraphic: imgUrl,
        		graphicWidth: imgSize[0],
        		graphicHeight: imgSize[1]
        	};
        	$.extend(marker.style, style);
        	if(marker.layer){
        		marker.layer.redraw();
        	}
        },
        
        //根据覆盖物id改变icon
        changeIconById: function(id, imgUrl, imgSize){
            var marker = this.getOverLayById(id);
            this.setOverlayIcon(marker, imgUrl, imgSize);
        },

		// 获取地图的dom元素
		getMapDiv: function () {
			return this.map.div;
        },

		// 获取覆盖物jquery对象
		getOverlayDiv: function (overlay) {
			return $(this.getMapDiv()).find("#" + overlay.geometry.id);
        },
        
        //删除指定覆盖物
        removeOverlay: function(overlay){
        	if(overlay && overlay.layer){
        		overlay.layer.removeFeatures(overlay);
        	}
            // if(overlay){
			// 	this.getOverlayDiv(overlay).remove();
			// }
        },

        //删除指定覆盖物通过覆盖物id
        removeOverlayById: function(id){
        	this.removeOverlay(this.getOverLayById(id));
        },

        //删除一组指定覆盖物
        removeOverlays: function(overlays){
        	this.overLayer.removeFeatures(overlays);
        	this.clusterLayer.removeFeatures(overlays);
        },

        //获得指定图层全部覆盖物
        getLayerOverlays: function(layerName){
        	var overfs = this.overLayer.getFeaturesByAttribute('layer', layerName);
        	var cluseterfs = this.clusterLayer.getFeaturesByAttribute('layer', layerName);
        	return overfs.concat(cluseterfs);
        },

        //删除指定图层的全部覆盖物
        removeLayerOverLays: function(layerName){
            var ols = this.getLayerOverlays(layerName);
            this.removeOverlays(ols);
        },
        
        //隐藏覆盖物通过id
        hideOverlayById: function(id){
        	var overlay = this.getOverLayById(id);
        	if(overlay){
        		this.hideOverlay(overlay);
        	}
        },
        
        //显示覆盖物通过id
        showOverlayById: function(id){
        	var overlay = this.getOverLayById(id);
        	if(overlay){
        		this.showOverlay(overlay);
        	}
        },
        
        //隐藏某个覆盖物
        hideOverlay: function(overlay){
        	this.getOverlayDiv(overlay).hide();
        },
        
        //显示某个覆盖物
        showOverlay: function(overlay){
        	this.getOverlayDiv(overlay).show();
        },

        //隐藏指定图层的全部覆盖物
        hideLayerOverLays: function(layerName){
        	var ols = this.getLayerOverlays(layerName);
            for(var i=0; i<ols.length; i++){
                this.hideOverlay(ols[i]);
            }
        },

        //显示指定图层的全部覆盖物
        showLayerOverLays: function(layerName){
        	var ols = this.getLayerOverlays(layerName);
            for(var i=0; i<ols.length; i++){
            	this.showOverlay(ols[i]);
            }
        },
        
        //根据图层url添加图层
        addLayerByUrl: function(url, _options){
        	var options = {
        		visible: true,
				layerLevel: false,   // 是否是底部图层
        		type: 'xyz'      //默认xyz方式   arcgisService表示arcgis服务方式
        	};
        	$.extend(options, _options);
        	var id = getId();
        	var layer;
        	switch (options.type){
	        	case 'xyz':
	        		layer = new OpenLayers.Layer.ArcGISTileMapLayer(id,
	        				url, {
								isBaseLayer : false,
								visibility: options.visible
							});
	        		break;
	        	case 'arcgisService':
	        		layer = new OpenLayers.Layer.ArcGIS93Rest( id,  
	                		url, 
	                {
	                	layers: "show:0,1,2",
	        			transparent:true
	        		}, {
	        			visibility: options.visible
	        		});
	        		break;
        	}
        	if(layer){
        		this.map.addLayer(layer);
        		var levelNumber = options.layerLevel;
        		if(levelNumber){
        			var layerNumber = this['bottom_' + levelNumber];
        			if(layerNumber && typeof layerNumber === 'number'){
                        layer.setZIndex(layerNumber++);
					}
				}
        	}
            return layer;
        },
        
        //删除图层
        removeLayer: function(layer){
        	if(layer){
        		this.map.removeLayer(layer);
        	}
        },
        
        //初始化聚合图层
        initClusterLayer: function(feature, events, _options){
        	this.clusterEvent = events;
        	this.addOverLaysToCluster(feature, _options);
        },
        
        //将覆盖物集合添加到聚合图层上
        addOverLaysToCluster: function(feature, _options){
        	var options = {
        		
        	};
        	$.extend(options, _options);
        	var allFeatures = objToArray(this.clusterFeatures);
        	if($.isArray(feature)){
        		allFeatures = allFeatures.concat(feature);
        	}else{
        		allFeatures.push(feature);
        	}
        	try{
        		this.removeAllOverlaysFromCluster();
        		this.clusterLayer.addFeatures(allFeatures, options);
        		var that = this;
        		if($.isArray(feature)){
        			for(var i=0; i<feature.length; i++){
        				feature[i].attributes.real_layer = 'clusterLayer';
        				that.clusterFeatures[feature[i].id] = feature[i];
        			}
        		}else{
        			feature.attributes.real_layer = 'clusterLayer';
        			that.clusterFeatures[feature.id] = feature;
        		}
        	}catch(e){
        		throw new Error('添加覆盖物失败');
        	}
        },
        
        //移除所有聚合图层上的覆盖物
        removeAllOverlaysFromCluster: function(){
        	try{
        		this.clusterLayer.removeAllFeatures();
        	}catch(e){
        		throw new Error('删除覆盖物失败');
        	}
        },
        
        //从聚合图层上删除覆盖物集合
        removeOverlaysFromCluster: function(feature, _options){
        	var options = {
        		
        	};
        	$.extend(options, _options);
        	var that = this;
        	if($.isArray(feature)){
        		for(var i=0; i<feature.length; i++){
        			if(that.clusterFeatures[feature[i].id]){
            			delete that.clusterFeatures[feature[i].id];
            		}
        		}
        	}else{
        		if(this.clusterFeatures[feature.id]){
        			delete this.clusterFeatures[feature.id];
        		}
        	}
        	try{
        		this.removeAllOverlaysFromCluster();
        		this.clusterLayer.addFeatures(objToArray(this.clusterFeatures), options);
        	}catch(e){
        		throw new Error('删除覆盖物失败');
        	}
        },
        
        //清空地图
        clearMap: function(){
        	this.clusterLayer.removeAllFeatures();
        	this.overLayer.removeAllFeatures();
        },
        
        //清空地图
        clearOverlays: function(){
        	this.clearMap();
        },
        
        //获取聚合图层所有覆盖物
        getAllOverlaysFromCluster: function(){
        	return this.clusterLayer.getFeaturesByAttribute('real_layer', 'clusterLayer');
        },
        
        //找到几个点的中心点
        getCenterByBound: function(lonlatArr){
        	if(!$.isArray(lonlatArr)) return;
        	var geo = this.createPolygonGeometry(lonlatArr);
        	var bounds = geo.getBounds();
        	if(bounds){
                var center = bounds.getCenterLonLat();
                return [center.lon, center.lat];
			}
			return null;
        },

        //将某点设置成中心
        setCenter: function(lon, lat, zoom){
        	var lonlat = createLonlat(lon, lat);
        	if(lonlat){
        		this.map.setCenter(lonlat, zoom || GISConfig.positionLevel);
        	}
        },
        
        //回到初始化地图的位置和中心点上
        toInitPositionAndZoom: function(){
        	this.setCenter(GISConfig.openlayers2Config.defaultCenterLon, GISConfig.openlayers2Config.defaultCenterLat, GISConfig.openlayers2Config.defaultZoom);
        },

        //根据wkt找到中心点
        getCenterByWkt: function(wkt){
        	var lonlat = this.wktToLonlat(wkt);
        	var center;
        	if(lonlat && lonlat.type && lonlat.lonlat){
        		if(lonlat.type == 'point'){
        			center = lonlat.lonlat;
        		}else if(lonlat.type == 'multilinestring'){
					var arr = [];
					for(var index in lonlat.lonlat){
						arr = arr.concat(lonlat.lonlat[index]);
					}
					center = this.getCenterByBound(arr);
				}else {
        			center = this.getCenterByBound(lonlat.lonlat);
        		}
        	}
        	return center;
        },
        
        //将wkt数据设置中心
        setCenterByWkt: function(wkt, zoom){
        	var center = this.getCenterByWkt(wkt);
        	if(center){
    			this.setCenter(center[0], center[1], zoom);
    		}else{
        		console.error("空间数据异常，wkt: " + wkt);
			}
        },
        
        //将某点设置成中心 不需要转换坐标系
        setCenterNoTransform: function(lng, lat, zoom){
        	this.setCenter(lng, lat, zoom);
        },
        
        //设置zoom
        setZoom: function(zoomLv){
        	this.map.zoomTo(zoomLv);
        },
        
        //按照像素平移
        togglePanBy:function(x, y){
        	this.map.pan(x, y);
        },

        //添加实时交通图层
        addTrafficLayer: function(_type, isShowFlight){   //type:  1 -->  互联网模型          2 --> 卡口模型       3 -->  三网融合模型
        	this.showTrafficLayer();
        	this.trafficModel = _type || 1;
        	this.isLiveTraffic = true;
        	this.setData('isShowFlight', isShowFlight);
        	this.refreshTrafficLayer(this.trafficModel, isShowFlight);
        },

        //刷新实时交通图层
        refreshTrafficLayer: function(_type, isShowFlight){
        	if(this.isTrafficLayerShow()){
        		this.trafficVectorLayer.removeAllFeatures();
        		this.trafficModel = _type || 1;
            	var that = this;
            	getTrafficDataByExtent({key: $rootScope.liveTrafficMap[_type]}, function(result){
            		var data = result.result;
            		var trafficJamArr = [];
            		var live_time = new Date().getTime();
            		if($.isArray(data)){
            			for(var i=0; i<data.length; i++){
            				if(!data[i].jamLongLat){
            					continue;
            				}
            				var jam = WKTUtil.read(data[i].jamLongLat);
            				var style = getTrafficJamStyle(that.map.zoom, data[i].jamLevel);
            				var currentLonlat;
            				if(jam.type == "multilinestring"){
            					if($.isArray(jam.longLat)){
            						for(var j=0,j_a=jam.longLat; j<j_a.length; j++){
            							var feature = that.createPoline(tumengToArr(j_a[j]), null, style);
            							if(feature){
            								trafficJamArr.push(feature);
            							}
            						}
            					}
            					currentLonlat = jam.longLat[0][0];
            				}else if(jam.type == 'polyline'){
            					var feature = that.createPoline(tumengToArr(jam.longLat), null, style);
    							if(feature){
    								trafficJamArr.push(feature);
    							}
    							currentLonlat = jam.longLat[0];
            				}
            				if(currentLonlat && data[i].jamLevel && !isShowFlight && false){
            					var id = currentLonlat.lng + '_' + currentLonlat.lat + '_' + data[i].jamLevel;
            					if(that.fightMap[id]){
            						that.fightMap[id].live = live_time;
            					}else{
            						var fi = that.addFlickeringPoint([currentLonlat.lng, currentLonlat.lat], null, {background: style.strokeColor});  //闪烁的点
            						/*
            						var fi = that.addPoint([currentLonlat.lng, currentLonlat.lat], null, {
            							imgUrl: 'themes/map/image/map/jam.gif',
            							size: [36, 36]
            						}); 
            						*/
            						that.fightMap[id] = new fight(fi, live_time);
            					}
            				}
            			}
            		}
            		that.trafficVectorLayer.addFeatures(trafficJamArr);
            		for(var index in that.fightMap){
            			if(that.fightMap[index].live != live_time){
            				that.removeFlickeringPoint(that.fightMap[index].fight);   //闪烁的点
            				//that.removeOverlay(that.fightMap[index].fight);
            				delete that.fightMap[index];
            			}
            		}
            	});
        	}
        },

        //删除实时交通图层 
        removeTrafficLayer: function(){
        	this.trafficVectorLayer.removeAllFeatures();
        	this.hideTrafficLayer();
        	this.isLiveTraffic = false;
        	var that = this;
        	for(var index in that.fightMap){
				that.removeFlickeringPoint(that.fightMap[index].fight);   //闪烁的点
				//that.removeOverlay(that.fightMap[index].fight);
				delete that.fightMap[index];
    		}
        },
        
        //隐藏实时路况图层（私有）
        hideTrafficLayer: function(){
        	this.trafficVectorLayer.setVisibility(false);
        	this.roadDeafultStateLayer.setVisibility(false);
        },
        
        //显示实时路况图层（私有）
        showTrafficLayer: function(){
        	this.trafficVectorLayer.setVisibility(true);
        	this.roadDeafultStateLayer.setVisibility(true);
        },
        
        //判断实时路况图层是否显示 (私有)
        isTrafficLayerShow: function(){
        	return this.trafficVectorLayer.getVisibility();
        },
        
        //添加行政区划并显示label数据
        boundary:function(keyword,_options,_areaOption,areaCallback,centerCallback){
        	console.log('此方法暂不支持，建议使用 createLabel 和 addDistrictShowByName 替代');
        },
        
        //添加label
        createLabel:function(html,center,_options,layerName,data, events){
        	var options = {
        		size: [400, 300]	
        	};
            var position = createLonlat(parseFloat(center.lng),parseFloat(center.lat));
            $.extend(options, _options);
            options.position = position;
            var labelData={layer:this.handleLayer(layerName)};
            $.extend(labelData, data);
            var label = this.addWindowInfo([position.lon, position.lat], html, options.size, events, options);
            label.getData = function(){
            	return labelData;
            };
            return label;
        },

        //删除label
        removeLabel:function (win) {
            this.removeWindowInfo(win);
        },

        /**
		 * 正式删除dom
         * @param win
         */
		realRemoveLabel: function(win) {
			if(win.div){
				$(win.div).remove();
			}
		},
        
        //生成信息窗口
        addWindowInfo: function(lonlat, content, size, events, _options){
        	if(!$.isArray(size)) return;
        	var options = {
        		offsetWidth: 12,     //偏移
        		offsetHeight: 0,      //偏移
        		region: 'left',     //窗口在中心点的左侧 可选值 top right
        		arrowShow: true,      //是否显示箭头
        		closeShow: true,      //是否显示关闭按钮
        		arrorBackgroundImage: null,   //箭头的背景图片，图片大小必须为 17*14
        		cursor: 'default',       //
        		backgroundColor: 'rgba(0, 51, 106, .8)',
        		boxShadow: 'inset 0 0 5px 1px #1E78FD',
        		border: '1px solid #1e78fd',   //注意边框宽度为1，如果改变宽度，必须改变 borderWidth 
        		borderWidth: 1,        //边框宽度
        		borderRadius: '3px',
        		padding: 10
        	};
        	$.extend(options, _options);
        	var offset = [0, 0];
        	var _of = 7;
        	var real_width = size[0] + options.padding*2 + 2*options.borderWidth;    //真实窗口宽度
    		var real_height = size[1] + options.padding*2 + 2*options.borderWidth;    //真实窗口高度
    		var arrow_style = {};
        	switch (options.region){
	        	case 'left':
	        		offset = [(real_width + options.offsetWidth)*(-1), (real_height/2 + options.offsetHeight)*(-1)];
	        		arrow_style = {
	        			top: real_height/2 - _of,
	        			right: -11
	        		};
	        		break;
	        	case 'top':
	        		offset = [(real_width/2 + options.offsetHeight)*(-1), (real_height + options.offsetWidth)*(-1)];
	        		arrow_style = {
	        			left: real_width/2 - _of - 2,
	        			bottom: -9,
	        			transform: 'rotate(90deg)'
	        		};
	        		break;
	        	case 'right':
	        		offset = [options.offsetWidth, (real_height/2 + options.offsetHeight)*(-1)];
	        		arrow_style = {
	        			top: real_height/2 - _of,
	        			left: -11,
	        			transform: 'rotate(180deg)'
	        		};
	        		break;
        	}
        	var html_options = {
        		closeShow: options.closeShow,
        		offset: offset,
        		padding: options.padding,
        		autoPan: true,
        		style: {
        			backgroundColor: options.backgroundColor,
        			boxShadow: options.boxShadow,
        			border: options.border,
        			borderRadius: options.borderRadius,
        			cursor: options.cursor
        		}
        	};
        	var win = this.addHtml(lonlat, content, size, html_options, events);
        	if(options.arrowShow){   //显示箭头
        		var arrow_div = $("<div style='position:absolute;width:17px;height:14px;background:url(themes/map/image/window/map-window-arrow.png) no-repeat;'></div>");
        		if(options.arrorBackgroundImage){
        			$.extend(arrow_style, {
        				background: 'url(' + options.arrorBackgroundImage + ') no-repeat'
        			});
        		}
        		arrow_div.css(arrow_style);
        		$(win.contentDiv).append(arrow_div);
        		win.arrowDiv = arrow_div[0];
        	}
        	return win;
        },

        //生成信息窗口（不予支持）
        addWindowInfo_back: function(lonlat, content, size, events, _options){
        	if(!$.isArray(size)) return;
        	var options = {
        		offsetWidth: 12,     //偏移
        		offsetHeight: 0,      //偏移
        		region: 'left',     //窗口在中心点的左侧 可选值 top right
        		arrowShow: true,      //是否显示箭头
        		closeShow: true,      //是否显示关闭按钮
        		arrorBackgroundImage: null,   //箭头的背景图片，图片大小必须为 17*14
        		backgroundColor: 'rgba(0, 51, 106, .8)',
        		boxShadow: 'inset 0 0 5px 1px #1E78FD',
        		border: '1px solid #1e78fd',
        		borderRadius: '3px',
        		padding: 10
        	};
        	$.extend(options, _options);
        	var lngla = createLonlat(lonlat[0], lonlat[1]);
        	var win = new OpenLayers.Popup(null, lngla, createSize(size[0], size[1]), content, options.closeShow);
        	this.map.addPopup(win);
        	var left = parseInt($(win.div).css('left').replace('px', ''));
    		var top = parseInt($(win.div).css('top').replace('px', ''));
    		var divActualWidth = size[0] + 20 + 2*options.padding;   //div真实宽度
    		var divActualHeight = size[1] + 13 + 2*options.padding;    //div真实高度
    		var divLeft, divTop, arrowStyle;
    		var view = this.map.getViewPortPxFromLonLat(lngla);
    		var mapSize = this.map.size;
    		var x = 0,
    			y = 0;
    		switch (options.region){
	    		case 'left':
	    			var topOffsetY = divActualHeight/2 + options.offsetHeight;
	    			var leftOffsetX = divActualWidth + options.offsetWidth;
	    			divLeft = (left - leftOffsetX);
	    			divTop = (top - topOffsetY);
	    			arrowStyle = {
	    				top: divActualHeight/2 - 7,
	    				right: 0
	    			};
	    			x = leftOffsetX > view.x ? view.x - leftOffsetX : 0;
	    			if((topOffsetY + options.padding) > view.y){
	    				y = view.y - (topOffsetY + options.padding);
	    			}else{
	    				y = topOffsetY > (mapSize.h - view.y) ? topOffsetY - (mapSize.h - view.y) : 0;
	    			}
	    			break;
	    		case 'top':
	    			var topOffsetY = divActualHeight + options.offsetWidth - 4;
	    			var leftOffsetX = divActualWidth/2 + options.offsetHeight;
	    			divLeft = (left - leftOffsetX);
	    			divTop = (top - topOffsetY);
	    			arrowStyle = {
	    				bottom: 0,
	    				left: divActualWidth/2 - 8,
	    				transform: 'rotate(90deg)'
	    			};
	    			y = (topOffsetY + options.padding) > view.y ? view.y - (topOffsetY + options.padding) : 0;
	    			if(leftOffsetX > view.x){
	    				x = view.x - leftOffsetX;
	    			}else{
	    				x = leftOffsetX > (mapSize.w - view.x) ? leftOffsetX - (mapSize.w - view.x) : 0;
	    			}
	    			break;
	    		case 'right':
	    			var topOffsetY = divActualHeight/2 + options.offsetHeight;
	    			var leftOffsetX = options.offsetWidth;
	    			divLeft = (left + leftOffsetX);
	    			divTop = (top - topOffsetY);
	    			arrowStyle = {
	    				left: 0,
	    				top: divActualHeight/2 - 7,
	    				transform: 'rotate(180deg)'
	    			};
	    			x = divActualWidth > (mapSize.w - view.x - leftOffsetX) ? divActualWidth - (mapSize.w - view.x - leftOffsetX) : 0;
	    			if((topOffsetY + options.padding) > view.y){
	    				y = view.y - (topOffsetY + options.padding);
	    			}else{
	    				y = topOffsetY > (mapSize.h - view.y) ? topOffsetY - (mapSize.h - view.y) : 0;
	    			}
	    			break;
    		}
    		$(win.div).css({
    			top: divTop,
    			left: divLeft,
    			width: divActualWidth,
    			height: divActualHeight - 4
    		});
    		$(win.div).children().css({
    			width: divActualWidth,
    			height: divActualHeight - 4
    		});
    		$(win.contentDiv).css({
    			padding: options.padding,
    			border: options.border,
    			boxShadow: options.boxShadow,
    			borderRadius: options.borderRadius,
    			backgroundColor: options.backgroundColor,
    			left: 9
    		});
    		var arrow = $("<div style='position:absolute;width:17px;height:14px;background:url(themes/map/image/window/map-window-arrow.png) no-repeat;'></div>");
    		if(options.arrorBackgroundImage){
    			$.extend(arrowStyle, {
    				background: 'url(' + options.arrorBackgroundImage + ') no-repeat'
    			});
    		}
    		arrow.css(arrowStyle);
    		win.arrow = arrow[0];
    		if(options.arrowShow){
    			$(win.div).children().append(arrow);
    		}
    		$(win.closeDiv).css({
    			background: 'url(themes/map/image/window/windowClose1.png) no-repeat',
    			top: options.padding,
    			right: options.padding + 11
    		});
    		win.setBackgroundColor('rgba(255, 255, 255, .0)');
    		this.togglePanBy(x, y);
    		win.setContext = win.setContentHTML;
    		win.setPosition = function(lonlat){
    			if(!$.isArray(lonlat)) return;
    			win.lonlat = createLonlat(lonlat[0], lonlat[1]);
    			win.updatePosition();
    		};
    		if(events && typeof events['close'] == 'function'){
    			$(win.closeDiv).click(function(){
    				events['close']();
    			});
    		}
    		if(events && typeof events['click'] == 'function'){
    			$(win.contentDiv).click(function(){
    				events['click']();
    			});
    		}
        	return win;
        },

        //删除信息窗口
        removeWindowInfo: function(win){
        	this.removeHtml(win);
        },
        
        //将html内容添加到地图上
        addHtml: function(lonlat, html, size, _options, events, data){
        	if(!$.isArray(size)) return;
        	var options = {
        		closeShow: true,      //是否显示关闭按钮
        		offset: [0, 0],      //偏移参数
        		imgUrl: null,         //正常情况下不使用此参数
        		autoPan: true,       //是否自动移动到窗口的可见区域
        		padding: 10,
        		style: {				//默认样式     建议覆盖
        			backgroundColor: '#666666',
        			//cursor: 'pointer',
            		//boxShadow: 'inset 0 0 5px 1px #1E78FD',
            		//border: '1px solid #1e78fd',
            		//borderRadius: '3px',
        		}
        	};
        	$.extend(options, _options);
        	var icon = createIcon("<div class='_marker_content_' style='padding:" + options.padding + "px'>" + html + "</div>", options.imgUrl, size, options.offset, options.padding);
    		var lg = createLonlat(lonlat[0], lonlat[1]);
    		var marker = new OpenLayers.Marker(lg, icon);
    		var that = this;
    		this.markLayer.addMarker(marker);
    		if(events && typeof events['click'] == 'function'){
    			marker.events.register('click', marker, function(e){
    				events['click'](data, e);
    	    	});
    		}
    		if(events && typeof events['mouseover'] == 'function'){
    			marker.events.register('mouseover', marker, function(e){
    				events['mouseover'](data, e);
    	    	});
    		}
    		if(events && typeof events['mouseout'] == 'function'){
    			marker.events.register('mouseout', marker, function(e){
    				events['mouseout'](data, e);
    	    	});
    		}
    		marker.contentDiv = marker.icon.imageDiv;
    		marker.div = marker.icon.imageDiv;
    		$(marker.contentDiv).css(options.style);
    		if(options.closeShow){   //是否隐藏窗口的关闭按钮
    			var close_div = $("<div style='position:absolute;right:10px;top:10px;width:17px;height:17px;background:url(themes/map/image/window/windowClose1.png) no-repeat;cursor:pointer;'></div>");
    			$(marker.contentDiv).append(close_div);
    			close_div.click(function(){
    				that.removeHtml(marker);
    				if(events && typeof events['close'] == 'function'){
    					events['close']();
    	    		}
    			});
    			marker.closeDiv = close_div[0];
    		}
    		if(options.autoPan){   //自动移动到窗口的可见区域
    			var view = this.map.getViewPortPxFromLonLat(lg);
        		var mapSize = this.map.size;
        		var real_width = size[0] + options.padding*2;    //真实窗口宽度
        		var real_height = size[1] + options.padding*2;    //真实窗口高度
        		var _top = parseInt(view.y + options.offset[1]);
        		var _left = parseInt(view.x + options.offset[0]);
        		var _bottom = parseInt(mapSize.h - _top - real_height); 
        		var _right = parseInt(mapSize.w - _left - real_width);
        		var x_pan = 0;
        		var y_pan = 0;
        		if(_top*_bottom < 0){
        			y_pan = _top > _bottom ? (Math.abs(_bottom) + 10) : (_top - 10);
        		}
        		if(_left*_right < 0){
        			x_pan = _left > _right ? (Math.abs(_right) + 10) : (_left - 10);
        		}
        		if(x_pan || y_pan){
        			that.togglePanBy(x_pan, y_pan);
        		}
    		}
    		marker.setPosition = function(lonlat){
    			return;
    			try{
    				this.moveTo(that.map.getPixelFromLonLat(createLonlat(lonlat[0], lonlat[1])));
    			}catch(e){
    				throw e;
    			}
    		};
    		marker.setContext = function(html){
    			try{
    				$(icon.imageDiv).find('._marker_content_').empty().append(html);
    			}catch(e){
    				throw e;
    			}
    		};
    		return marker;
        },
        
        //将html从地图上移除
        removeHtml: function(html){
        	if(html){
        		this.markLayer.removeMarker(html);
        		html.destroy();
        	}
        },
        
        //添加标题提示
        addTitleTip: function(lonlat, data){
        	var titleOnLent = getBLen(data.title);
			this.addPopup(lonlat, [data.titleWidth || titleOnLent*10 + 8 + (data.extendWidth || 0), data.titleHeight || 20], data.title, data.titleStyle || {
				backgroundColor: '#ffffff',
        		border: '0px solid #0067fe',
        		fontSize: '16px',
        		height: '24px',
        		left: '10px',
        		lineHeight: '24px',
        		borderRadius: '3px',
        		padding: '3px 0px 0px 4px'
			});
        },
        
        //添加气泡
        addPopup: function(lonlat, size, content, _style){
        	var style = {
        		
        	};
        	$.extend(style, _style);
        	var popup = new OpenLayers.Popup(null, createLonlat(lonlat[0], lonlat[1]), createSize(size[0], size[1]), "<div>" + content + "</div>", false);
        	this.popup = popup;
        	this.popup.backgroundColor = null;
        	this.map.addPopup(this.popup);
        	this.popup.panIntoView();
        	var left = parseInt($(this.popup.div).css('left').replace('px', ''));
        	var top = parseInt($(this.popup.div).css('top').replace('px', ''));
        	$(this.popup.div).css({
        		left: left + (style.left ? parseInt(style.left.replace('px', '')) : 0) + 'px',
        		top: top + (style.top ? parseInt(style.top.replace('px', '')) : 0) + 'px',
        		backgroundColor: style.backgroundColor,
        		border: style.border,
        		borderRadius: style.borderRadius
        	});
        	$(this.popup.contentDiv).css({
        		fontSize: style.fontSize,
        		height: style.height,
        		lineHeight: style.lineHeight,
        		padding: style.padding
        	});
        	this.popupArr.push(popup);
        },
        
        //移除气泡
        removePopup: function(){
        	if(this.popup){
        		try{
        			this.map.removePopup(this.popup);
        			this.popup.destroy();
        			this.popup = null;
        		}catch(e){
        			
        		}
        	}
        	var pops = this.popupArr;
        	var that = this;
        	if($.isArray(pops)){
        		for(var i=0; i<pops.length; i++){
        			if(pops[i]){
        				try{
            				that.map.removePopup(pops[i]);
            				pops[i].destroy();
            				pops[i] = null;
                		}catch(e){
                			//throw e;
                		}
        			}
        		}
        	}
        },
        
        //根据行政区划名字画行政区划
        addDistrictShowByName: function(cityName, _layer, _events, _data, _options){
        	console.log('等待实现中');
        },

        //路线规划（步行）
        walkPlan: function(start, end, callback, _options){
        	console.log('等待实现中');
        },

        //路线规划（驾车）
        drivePlan: function(start, end, callback, _options){
        	console.log('等待实现中');
        },
        
        //创建公里桩div(保护)
        createStakeDiv: function(lonlat, number){
        	var html = 'K' + number;
        	var icon = createIcon(html, null, [getStakeWidth(number), 18]);
    		var lg = createLonlat(lonlat[0], lonlat[1]);
    		var marker = new OpenLayers.Marker(lg, icon);
    		return marker;
        },
        
        //把公里桩添加到地图上(保护)
        addStakeDivToMap: function(markers){
        	for(var i=0; i<markers.length; i++){
        		var marker = markers[i];
        		if(marker){
        			this.markLayer.addMarker(marker);
        			$(marker.icon.imageDiv).children('div').css({
        				background: '#1e78fd',
        				borderRadius: '1px',
        				fontSize: '10px',
        				lineHeight: '18px',
        				textAlign: 'center'
        			});
        		}
        	}
        },
        
        //从地图上移除公里桩(保护)
        removeStakeDivFormMap: function(markers){
        	for(var i=0; i<markers.length; i++){
        		var marker = markers[i];
        		if(marker){
        			this.markLayer.removeMarker(marker);
        		}
        	}
        },
        
        //处理图层（私有）
        handleLayer: function(layerName, events){
            var layN = createLayer(layerName);
            if(!this.layers[layN]){
                this.layers[layN] = layN;
            }
            return layN;
        },
        
        //wkt格式转化为经纬度数据
        wktToLonlat: function(wkt){
        	var mark = WKTUtil.read(wkt);
            if(mark){
            	var type = mark.type;
                if(!type){
                	console.log('wkt数据无效');
                	return;
                }
                var lonlatArr;
                switch (type) {
                    case 'point':
                    	var lo = mark.longLat.lng;
                    	var la = mark.longLat.lat;
                    	if(!isNaN(lo) && !isNaN(la)){
                    		lonlatArr = [lo, la];
                    	}else{
                    		lonlatArr = [];
                    	}
                        break;
                    case 'polygon':
                        lonlatArr = this.handleLonlatArr(mark.longLat);
                        break;
                    case 'polyline':
                    	lonlatArr = this.handleLonlatArr(mark.longLat);
                        break;
					case 'multilinestring':
                        lonlatArr = [];
                        var longLat = mark.longLat;
                        for(var index in longLat){
                        	lonlatArr.push(this.handleLonlatArr(longLat[index]));
						}
						break;
                }
                return {
                	type: type,
                	lonlat: lonlatArr
                };
            }else{
                console.warn('数据无效');
                return undefined;
            }
        },

		// 处理点数组数据
		handleLonlatArr: function (arr) {
        	var result = [];
            for(var i=0; i<arr.length; i++){
                var lo = arr[i].lng;
                var la = arr[i].lat;
                if(!isNaN(lo) && !isNaN(la)){
                    result.push([lo, la]);
                }
            }
            return result;
        },
    	
    	//create feature
    	createFeature: function(type, lonlat, data, options, layerName, events, radius){
    		var style, geometry, feature;
    		var attr = {layer: this.handleLayer(layerName)};
    		switch (type){
    			case 'point':
    				geometry = this.createPointGeometry(lonlat);
    				var _style = defaultPointOptions();
    				$.extend(_style, options);
    				style = proPointStyle(_style);
    				break;
    			case 'line':
    				geometry = this.createLineGeometry(lonlat);
    				var style = defaultLineOptions();
    				$.extend(style, options);
    				break;
				case 'multilinestring':
					geometry = this.createMultiLineGeometry(lonlat);
                    var style = defaultLineOptions();
                    $.extend(style, options);
					break;
    			case 'polygon':
    				geometry = this.createPolygonGeometry(lonlat);
    				var style = defaultPolygonOptions();
    				$.extend(style, options);
    				break;
    			case 'circle':
    				geometry = this.createCircleGeometry(lonlat, radius);
    				var style = defaultCircleOptions();
    				$.extend(style, options);
    				break;
    		}
    		$.extend(attr, data);
    		if(type != 'point'){
    			style.strokeDashstyle = style.strokeStyle;
    			style.strokeWidth = style.strokeWeight;
    		}
    		if(geometry){
    			try{
    				geometry.transform(this.map.displayProjection, this.map.getProjectionObject());
    			}catch(e){
    				throw new Error('地物转换出错');
    			}
    			feature = new OpenLayers.Feature.Vector(geometry, attr, style);
    		}
    		if(feature){
    			feature.getId = function(){
        			return feature.id;
        		};
        		feature.getData = function(){
        			return feature.data;
        		};
        		feature.events = events;
    		}
    		return feature;
    	},
    	
    	//创建经纬度对象
        createLonlat: createLonlat,
        
        //创建size对象
        getReturnSize: createSize,
        
        //创建偏移量点
        createPixel: createPixel,
        
        //创建一个圆形
        createCircleGeometry: function(lonlat, radius){
        	return new OpenLayers.Geometry.Polygon.createRegularPolygon(this.createPointGeometry(lonlat), radius/111194.872221777, 40, 0);
        },
        
        //创建一个多边形
        createPolygonGeometry: function(lonlatArr){
        	var linear = new OpenLayers.Geometry.LinearRing(this.createPointGeometryArr(lonlatArr));
        	return new OpenLayers.Geometry.Polygon([linear]);
        },
        
        //创建一个线
        createLineGeometry: function(lonlatArr){
        	return new OpenLayers.Geometry.LineString(this.createPointGeometryArr(lonlatArr));
        },

		// 创建一个多线
		createMultiLineGeometry: function (lonlatArr) {
			var components = [];
			for(var index in lonlatArr){
				components.push(this.createLineGeometry(lonlatArr[index]));
			}
			if(components.length === 0){
				console.error("数据异常， lonlatArr: " + lonlatArr);
			}
			return new OpenLayers.Geometry.MultiLineString(components);
        },
    	
    	//create point grometry
    	createPointGeometry: function(lonlat){
        	if(!$.isArray(lonlat) || lonlat.length < 2 || typeof lonlat[0] != 'number' || typeof lonlat[1] != 'number'){
        		console.warn('经纬度数据无效');
        		return null;
        	}
        	return new OpenLayers.Geometry.Point(lonlat[0], lonlat[1]);
        },
        
        createPointGeometryArr: function(lonlatArr){
        	var arr = [];
        	var that = this;
        	for(var i=0; i<lonlatArr.length; i++){
        		arr.push(that.createPointGeometry(lonlatArr[i]));
        	}
        	return arr;
        }
    	
    };
    
    //闪烁点标识对象
    function fight(fight, live){
    	this.fight = fight;
    	this.live = live;
    }
    
    //获取样式
    function getTrafficJamStyle(mapLevel, jamLevel){
    	return {
    		strokeColor: jamLevelColor[jamLevel] || jamLevelColor[1], //折线颜色
    		strokeWeight: mapLevelRoadWidth[mapLevel] || mapLevelRoadWidth[1],   //折线宽度
            strokeOpacity: 1,  //折线透明度，范围在 0~1 之间
            strokeStyle: constants.SOLID,  //线类型，实线、虚线，类型从自定义对象 Constants中选择
    	}
    }
    
    //根据范围获取路况数据
    function getTrafficDataByExtent(param, callback){
    	$.ajax({
    		url: $rootScope.$restRoot + 'traffic/section/flow/getCurrentTrafficJam',
    		data: param,
            success: function(data){
            	if(typeof callback == 'function' && data && $.isArray(data.result)){
            		callback(data);
            	}
            }
    	});
    }
    
    function createFeatureDataFromFeature(feature){
    	var type = feature.geometry.CLASS_NAME;
    	var data = {};
    	switch (type){
	    	case 'OpenLayers.Geometry.Point':
	    		var xy = feature.geometry.getCentroid();
	    		data.path = {lng: xy.x, lat: xy.y};
	    		break;
	    	case 'OpenLayers.Geometry.LineString':
	    		data.path = createDataPathByGeo(feature.geometry);
	    		break;
	    	case 'OpenLayers.Geometry.Polygon':
	    		data.path = createDataPathByGeo(feature.geometry.components[0]);
	    		break;
    	}
    	return data;
    }
    
    function createDataPathByGeo(feature){
    	var arr = feature.components;
    	var result = [];
    	for(var i=0; i<arr.length; i++){
    		result.push({lng: arr[i].x, lat: arr[i].y});
    	}
    	return result;
    }
    
    function createStyleMap(options){
    	return new OpenLayers.StyleMap({
            "default": new OpenLayers.Style(options),
            "select": new OpenLayers.Style(options),
            "temporary": new OpenLayers.Style(options)
        });
    }
    
    //创造像素
    function createPixel(x, y){
    	return new OpenLayers.Pixel(x, y);
    }
    
    //创造icon
    function createIcon(_text, imgUrl, size, _offset, padding){
    	if(!$.isArray(size)){
    		console.warn('size必填');
    		return null;
    	}
    	var offset = _offset || [0, 0];
    	var text = _text || '';
    	var str = imgUrl ? "<div style=\"background:url('" + imgUrl + "') no-repeat;\"><span>" + text +"</span></div>" : "<div>" + text + "</div>";
    	var _width = size[0];
    	var _height = size[1];
    	if(typeof padding == 'number'){
    		_width += (padding*2);
    		_height += (padding*2);
    	}
    	var sizeObj = createSize(_width, _height);
    	var icon = new OpenLayers.Icon(null, sizeObj, createPixel(offset[0], offset[1]));
    	icon.imageDiv.innerHTML = str;
    	return icon;
    }
    
    function proPointStyle(_style){
    	return {
    		graphicWidth: _style.size[0],
    		graphicHeight: _style.size[1],
    		externalGraphic: _style.imgUrl,
    		cursor: _style.cursor
    	};
    }
    
    //生成图层名
    function createLayer(layerName){
        if(typeof layerName != 'string'){
            return 'defaultLayer';
        }
        return layerName;
    }
    
    //生成size对象
    function createSize(width, height){
    	if(typeof width == 'number' && typeof height == 'number'){
    		return new OpenLayers.Size(width, height);
    	}else{
    		console.warn('宽和高数据无效');
    	}
    	return null;
    }
    
    //生成经纬度对象
    function createLonlat(lon, lat){
    	if(typeof lon == 'number' && typeof lat == 'number'){
    		return new OpenLayers.LonLat(lon, lat);
    	}else{
    		console.warn('经纬度数据无效');
    	}
    	return null;
    }
	
    //绑定地图事件
    function bindMapEvents(map, that, events){
		if(events && typeof events[constants.CLICK] == 'function'){
			map.register(constants.CLICK, that, function(event){
				var lonlatData = pixelToLonlat(event.xy, that);
				var result = {
					lonlat: [lonlatData.lon, lonlatData.lat]	
				};
				events[constants.CLICK](result);
			});
		}
		if(events && typeof events[constants.MOUSE_OVER] == 'function'){
			map.register('mousemove', that, function(event){
				var lonlatData = pixelToLonlat(event.xy, that);
				var result = {
					lonlat: [lonlatData.lon, lonlatData.lat]	
				};
				events[constants.MOUSE_OVER](result);
			});
		}
		if(events && typeof events[constants.DBLCLICK] == 'function'){
			map.register(constants.DBLCLICK, that, function(event){
				var lonlatData = pixelToLonlat(event.xy, that);
				var result = {
					lonlat: [lonlatData.lon, lonlatData.lat]	
				};
				events[constants.DBLCLICK](result);
			});
		}
		
    }
    
    //点位置到经纬度
    function pixelToLonlat(xy, map){
    	return map.getLonLatFromPixel(xy);
    }
    
    //对象转数组
    function objToArray(array) {
        var arr = [];
        for (var i in array) {
            arr.push(array[i]); 
        }
        return arr;
    }
    
    function tumengToArr(arr){
    	var result = [];
    	for(var i=0; i<arr.length; i++){
    		result.push([arr[i].lng, arr[i].lat]);
    	}
    	return result;
    }
    
    function getStakeWidth(nub){
    	var type = (nub + '').length;
    	var width = 32;
    	switch (type){
	    	case 3:
	    		width = 36;
	    		break;
	    	case 4:
	    		width = 42;
	    		break;
	    	case 1:
	    		width = 24;
	    		break;
    	}
    	return width;
    }
    
    function rectConvertToPolygn(lonlatArr){
    	return [lonlatArr[0], [lonlatArr[0][0], lonlatArr[1][1]], lonlatArr[1], [lonlatArr[1][0], lonlatArr[0][1]]];
    }
    
    function getBLen(str) {
	  if (str == null) return 0;
	  if (typeof str != "string"){
	    str += "";
	  }
	  return str.replace(/[^\x00-\xff]/g,"01").length;
	}
    
    function getId() {
	  function S4() {
	    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	  }
	  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
	}
	
})(mapAdapter);

