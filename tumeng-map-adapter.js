/**
 * 适配图盟地图api,定义接口(兼容其他的地图api)
 * Yu Jie
 * 2018-07-05
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
 * 参数： 1.map对象 2.地图事件对象（同其他事件对象一样） 例如：{
 *          									'click': function(a, b, c){}   //事件类型：回调函数,类型从自定义对象 Constants中选择, 
 *          																   //a表示数据，b表示图盟的事件本身，c表示覆盖物本身
 *      									}
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
 * ----setContext  更新内容
 * ----setPosition  更新位置 
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
 *                      text: '显示文字',  //显示文字
 *                      textStyle: {}   //显示文字的css样式，
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
 * ----打闪烁的点
 * 方法名：addFlickeringPoint
 * 参数：
 * 	  1.经纬度数组(必填)； [180.12, 23.1245]
 *    2.图层名(默认defaultlayer)：''
 *    3.其他参数对象(选填，不填则使用默认值): {
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
 * ----根据数据生成覆盖物：
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
 * 参数：覆盖物 overlay
 * 返回：覆盖物
 * 
 * ----添加覆盖物集合
 * 方法名：addOverLays
 * 参数：覆盖物集合
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
 * 返回：覆盖物对象数据
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
 *    5.数据data
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
 * 返回：覆盖物对象
 * 
 ----创建label
 * 方法名：createLabel
   备注:这里的监听事件使用的是jq的监听
 * 参数：
 *     1.html :显示的html字段
       2.center  {lng,lat}
       3._options label的属性
	   4.areaCallback：点击行政区划的回调
 * 返回：label
 
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
 * 					arrow: true,   //是否带箭头
 * 					autoClose: true,  //是否自动关闭
 * 					fillColor: 'red',  //填充颜色
 * 					fillOpacity: 0.1, //填充透明度
 * 					strokeColor： 'red',  //边框颜色
 * 					strokeOpacity: 0.1, //边框透明度
 * 					strokeWeight: '2',  //边框宽度
 * 				}
 * 		2.第二个参数 ： 添加完成后的调方法 function(a, b, c){
 * 							a:表示经纬度或经纬度数组，如果是园就是园心，如果是矩形就是矩形的范围
 * 							b:代表覆盖物本身，如果是园则是圆半径
 * 							c:如果是园，就是园本身，其他无，
 * 						}
 * 		3.第三个参数： {
 *          		'click': function(a, b, c){}   //事件类型：回调函数,类型从自定义对象 Constants中选择, 
 *          										 //a表示数据，b表示图盟的事件本身，c表示覆盖物本身
 *      		}
 * 返回： 无
 * 
 * 
 * ----删除指定图层的全部覆盖物
 * 方法名：removeLayerOverLays
 * 参数：图层名称
 * 返回：
 * 
 * ----初始化聚合图层
 * 方法名：initClusterLayer
 * 参数：1.覆盖物集合(初始化可以添加覆盖物，可以为空集合), 2.点击聚合图标回调事件（参考上面事件）
 * 返回：
 * 
 * ----向聚合图层上添加覆盖物点集合
 * 方法名：addOverLaysToCluster
 * 参数：1.覆盖物集合
 * 返回：
 * 
 * ----向聚合图层上删除覆盖物集合
 * 方法名：removeOverlaysFromCluster
 * 参数：覆盖物集合
 * 返回：
 * 
 * ----添加图层
 * 方法名：addLayerByUrlFun
 * 参数：function(x, y, z){}  //具体x,y,z可参数图盟api
 * 返回：图层对象本身（注意图层对象对于我们来说是个抽象的概念）
 * 
 * ----添加图层
 * 方法名：addLayerByUrl
 * 参数：url地址
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
 * 参数：1.经纬度数组 2.内容  3.size 数组 [width, height],  4.closeCallback 关闭窗口后回调事件,  5.窗口偏移量 offset  例{x:10,y:-56} ,
 * 返回：信息窗口对象
 * 
 * ----删除信息窗口
 * 方法名：removeWindowInfo
 * 参数：信息窗口
 * 返回：
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

(function(mapAdapter){  //说明：依赖jquery
    
    //定义常量对象
    var constants = {  //支持扩展属性
        CLICK: IMAP.Constants.CLICK,      //单击
        DBLCLICK: IMAP.Constants.DBLCLICK,  //双击
        RIGHT_CLICK: 'rightclick',     //右击事件
        MOUSE_OVER: IMAP.Constants.MOUSE_OVER,  //鼠标悬停
        SOLID: IMAP.Constants.OVERLAY_LINE_SOLID,   //实线
        DASHED: IMAP.Constants.OVERLAY_LINE_DASHED,  //虚线
        LABELDEFAULT:IMAP.Constants. OVERLAY_LABEL_DEFAULT ,//label 默认展示类型
        LABELHTML:IMAP.Constants.OVERLAY_LABEL_HTML ,//label 支持HTML标签类型
        TIP_CLOSE: IMAP.Constants.TIP_CLICK,    //窗口关闭事件
    };
    
    //定义单点默认配置项
    var defaultPointOptions = function(){
        return {
            imgUrl:IMAP.MapConfig.API_REALM_NAME+"images/point_1.png",
            size: [30, 30],
        };
    };
    
    //定义线默认配置项
    var defaultLineOptions = function(){
        return {
            strokeColor: '#ff0000', //折线颜色
            strokeWeight: 2,   //折线宽度
            strokeOpacity: 1,  //折线透明度，范围在 0~1 之间
            strokeStyle: constants.SOLID,  //线类型，实线、虚线，类型从自定义对象 Constants中选择
        };
    };
    
    //定义多边形默认配置项
    var defaultPolygonOptions = function(){
        return {
            fillColor: '#ff0000',     //填充颜色
            fillOpacity: 0.3,   //填充透明度
            strokeColor: '#ff0000', //折线颜色
            strokeWeight: 2,   //折线宽度
            strokeOpacity: 1,  //折线透明度，范围在 0~1 之间
            strokeStyle: constants.SOLID   //线类型，实线、虚线，类型从自定义对象 Constants中选择    
        };
    };
    
    //定义矩形默认配置
    var defaultRectangleOptions = function(){
        return {
            fillColor: '#ff0000',     //填充颜色
            fillOpacity: 0.3,   //填充透明度
            strokeColor: '#ff0000', //折线颜色
            strokeWeight: 2,   //折线宽度
            strokeOpacity: 1,  //折线透明度，范围在 0~1 之间
            strokeStyle: constants.SOLID   //线类型，实线、虚线，类型从自定义对象 Constants中选择    
        };
    };
    
    //定义圆默认配置项
    var defaultCircleOptions = function(){
        return {
            fillColor: '#ff0000',     //填充颜色
            fillOpacity: 0.3,   //填充透明度
            strokeColor: '#ff0000', //折线颜色
            strokeWeight: 2,   //折线宽度
            strokeOpacity: 1,  //折线透明度，范围在 0~1 之间
            strokeStyle: constants.SOLID   //线类型，实线、虚线，类型从自定义对象 Constants中选择    
        };
    };

    //定义Label认配置项
    var defaultLabelOptions = function(){
        return {
            type:constants.LABELHTML, //展示类型
            visible:true,// 默认展示
            //anchor:[IMAP.Constants.CENTER] , //Label展示位置锚点
            auto:false,    //创建后是否直接定位到该label
        };
    };

    //定义实时交通图层url地址
    var trafficLayerUrl = GISConfig.tumengTrafficLayerUrl;
    
    mapAdapter.constants = constants;
    mapAdapter.trafficLayerUrl = trafficLayerUrl;
    
    //初始化方法
    mapAdapter.init = function(map, events, optionObj = {}){
        return new mapWapper(map, events, optionObj);
    };
    
    function mapWapper(map, events, optionObj){
        if(typeof map != 'object'){
            throw new Error('非法map对象');
        }
        this.map = map;    //地图对象
        this.trafficLayer = null;   // 实时交通图层
        this.clusterLayer = null;   //聚合图层（第一次添加聚合物的时候才初始化聚合图层）
        this.layer = {'defaultLayer': 'defaultLayer'};  //抽象图层集合
        this.polylineTool = null;   //直线绘制工具
        this.tool = null;   //鼠标绘制工具
        this.addoverlayEvt = null;
        
        //初始化绘制工具
        this.initDrawTool();
        
        //给地图绑定事件
        bindEvent(this.map, events);
        
        //map自身方法是否启用
        mapMethodAble(this.map, optionObj);
    }
    
    mapWapper.prototype = {  //所有方法参数可参照上面定义的接口
        
        //处理图层（私有）
        handleLayer: function(layerName){
            var layN = createLayer(layerName);
            if(!this.layer[layN]){
                this.layer[layN] = layN;
            }
            return layN;
        },
        
        //创建点
        createLonlat:createLonlat,

        //创建偏移量点
        createPixel :function(x,y){
           return  new IMAP.Pixel(x, y);
        },  

        //打单点
        addPoint: function(lonlat, layerName, options, events, data, auto = true){
            
            var marker = this.createOverLay(lonlat, layerName, options, events, data);
            
            var mark = this.addOverLay(marker, auto);
            if(mark && options && options.text){
            	try{
            		if(options.textStyle){
            			$(mark.getElement()).css(options.textStyle);
            		}
            		$(mark.getElement()).html(options.text);
            	}catch(e){
            		throw new Error('创建文字失败了');
            	}
            }
            
            return mark;
        },
        
        //打闪烁的点
        addFlickeringPoint: function(lonlat, layerName, options, events, data, auto = true){
        	
        	var style = {
                    imgUrl: '',
                    size: [30, 30],
                };
        	$.extend(style, options);
        	
        	var marker = this.addPoint(lonlat, layerName, style, events, data);
        	
        	if(marker){
        		try{
        			$(marker.getElement()).append("<div class='case-address-animation'></div>");
        		}catch(e){
        			throw new Error('创建闪烁时失败了');
        		}
        	}
        	
        	return marker;
        },
        
        //生成单个覆盖物
        createOverLay: function(lonlat, layerName, options, events, data){
            return createOverLay(lonlat, this.handleLayer(layerName), options, events, data);
        },
        
        //根据wkt数据生成覆盖物
        createOverLayByWkt: function(wkt, layerName, options, events, data){
            
            var overLay;
            
            var mark = WKTUtil.read(wkt);
            if(!mark){
            	console.log('wkt数据无效');
            	return overLay;
            }
            var type = mark.type;
            if(!type){
            	console.log('wkt数据无效');
            	return overLay;
            }
            
            switch (type) {
                case 'point':
                    var lon = parseFloat(mark.longLat.lng);
                    var lat = parseFloat(mark.longLat.lat);
                    overLay = createOverLay([lon, lat], this.handleLayer(layerName), options, events, data);
                    break;
                case 'polygon':
                    var lonlatArr = [];
                    for(var i=0; i<mark.longLat.length; i++){
                        lonlatArr.push([parseFloat(mark.longLat[i].lng), parseFloat(mark.longLat[i].lat)]);
                    }
                    overLay = createPolygon(lonlatArr, this.handleLayer(layerName), options, events, data);
                    break;
                case 'polyline':
                    var lonlatArr = [];
                    for(var i=0; i<mark.longLat.length; i++){
                        lonlatArr.push([parseFloat(mark.longLat[i].lng), parseFloat(mark.longLat[i].lat)]);
                    }
                    overLay = createLine(lonlatArr, this.handleLayer(layerName), options, events, data);
                    break;
            }
            
            return overLay;
        },
        
        //根据wkt数据添加覆盖物
        addOverLayByWkt: function(wkt, layerName, options, events, data){
            
            return this.addOverLay(this.createOverLayByWkt(wkt, layerName, options, events, data));
        },
        
        //添加覆盖物
        addOverLay: function(marker, auto = true){
            
            if(this.map && marker){
                this.map.getOverlayLayer().addOverlay(marker, auto);
            }else{
                console.warn('地图对象或覆盖物对象不存在');
            }
            
            return marker;
            
        },
        
        //根据覆盖物id获取覆盖物
        getOverLayById: function(id){
            
            if(!id) return;
            if(this.map){
                
                try{
                    var mark = this.map.getOverlayLayer().getOverlayById(id);
                    return mark;
                }catch(e){
                    throw new Error('根据id获取覆盖物失败');
                }
            }else{
                console.warn('地图对象不存在');
            }
            
            return null;
        },
        
        //根据覆盖物id移动覆盖物
        moveTo: function(id, lonlat){
            
            if(!isArray(lonlat)) return;
            
            var marker = this.getOverLayById(id);
            
            try{
                marker.setPosition(createLonlat(lonlat[0], lonlat[1]));
            }catch(e){
                throw new Error('移动覆盖物失败了');
            }
            
        },
        
        //使覆盖物运动到某点
        moveToLonlat: function(mark, lonlat, _options){
        	
        	if(!isArray(lonlat)) return;
        	
        	var options = {
        		speed: 100,
        		isRotate: false
        	};
        	$.extend(options, _options);
        	
        	try{
        		mark.moveTo(createLonlat(lonlat[0], lonlat[1]), options.speed, options.isRotate);
        	}catch(e){
        		throw new Error('移动覆盖物失败了');
        	}
        	
        },
        
        //使覆盖物运动到某点
        moveToLonlatById: function(id, lonlat, _options){
        	var marker = this.getOverLayById(id);
        	this.moveToLonlat(marker, lonlat, _options);
        },
        
        //使覆盖物沿某线段运动
        moveAlong: function(mark, lonlatArr, _options){
        	
        	if(!isArray(lonlatArr)) return;
        	
        	var options = {
    			speed: 100,
        		isRotate: false,
        		loop: false
        	};
        	$.extend(options, _options);
        	
        	try{
        		mark.moveAlong(createLonlatArr(lonlatArr), options.speed, options.loop, options.isRotate);
        	}catch(e){
        		throw new Error('移动覆盖物失败了');
        	}
        	
        },
        
        //使覆盖物沿某线段运动
        moveAlongById: function(id, lonlatArr, _options){
        	var marker = this.getOverLayById(id);
        	this.moveAlong(marker, lonlatArr, _options);
        },
        
        //更改图标
        setOverlayIcon: function(marker, imgUrl, imgSize){
        	if(!isArray(imgSize)) return;
        	try{
                marker.setIcon(createIcon(imgUrl, imgSize[0], imgSize[1]));
            }catch(e){
                throw new Error('改变覆盖物icon失败了');
            }
        },
        
        //根据覆盖物id改变icon
        changeIconById: function(id, imgUrl, imgSize){
            
            var marker = this.getOverLayById(id);
            this.setOverlayIcon(marker, imgUrl, imgSize);
            
        },
        
        //生成覆盖物集合
        createPointOverlays: function(lonlatArr, layerName, options, events, dataArr){
            
            var layer = this.handleLayer(layerName);
            var markerArr = [];
            if(isArray(lonlatArr)){
                var d_a = false;
                if(dataArr){
                    if(isArray(dataArr)){
                        d_a = true;
                    }else{
                        console.warn('dataArr需为数组');
                    }
                }
                for(var i=0; i<lonlatArr.length; i++){
                    var mark = createOverLay(lonlatArr[i], layer, options, events, d_a ? dataArr[i] : {});
                    if(mark){
                        markerArr.push(mark);
                    }
                }
            }else{
                console.warn('lonlatArr需为数组');
            }
            
            return markerArr;
            
        },
        
        //打多点
        addPoints: function(lonlatArr, layerName, options, events, dataArr){
            
            var markerArr = this.createPointOverlays(lonlatArr, layerName, options, events, dataArr);
            
            return this.addOverLays(markerArr);
            
        },
        
        //添加覆盖物集合
        addOverLays: function(markers, auto = true){
            
            if(!isArray(markers)){
                throw new Error("markers必须为数组");
            }
            
            if(this.map){
                this.map.getOverlayLayer().addOverlays(markers, auto);
            }else{
                console.warn('地图对象不存在');
            }
            
            return markers;
            
        },
		
		//生成线覆盖物
		createPoline: function(lonlatArr, layerName, options, events, data){
			return createLine(lonlatArr, this.handleLayer(layerName), options, events, data);
		},
        
        //画线
        addPoline: function(lonlatArr, layerName, options, events, data, auto = true){
            
            var polyline = this.createPoline(lonlatArr, layerName, options, events, data);
            if(this.map && polyline){
                this.map.getOverlayLayer().addOverlay(polyline, auto);
            }else{
                console.warn('地图对象或覆盖物对象不存在');
            }
            
            return polyline;
        },
		
		//生成多边形覆盖物
		createPolygon: function(lonlatArr, layerName, options, events, data){
			return createPolygon(lonlatArr, this.handleLayer(layerName), options, events, data);
		},
        
        //画多边型
        addPolygon: function(lonlatArr, layerName, options, events, data){
            
            var polygon = this.createPolygon(lonlatArr, layerName, options, events, data);
            if(this.map && polygon){
                this.map.getOverlayLayer().addOverlay(polygon, true);
            }else{
                console.warn('地图对象或覆盖物对象不存在');
            }
            
            return polygon;
        },
		
		//生成矩形覆盖物
		createRectangle: function(lonlatArr, layerName, options, events, data){
			return createRectangle(lonlatArr, this.handleLayer(layerName), options, events, data);
		},
        
        //画矩形
        addRectangle: function(lonlatArr, layerName, options, events, data){
            
            var rect = this.createRectangle(lonlatArr, layerName, options, events, data);
            if(this.map && rect){
                this.map.getOverlayLayer().addOverlay(rect, true);
            }else{
                console.warn('地图对象或覆盖物对象不存在');
            }
            
            return rect;
        },
		
		//生成圆形覆盖物
		createCircle: function(lonlat, layerName, radius, options, events, data){
			return createCircle(lonlat, this.handleLayer(layerName), radius, options, events, data);
		},
        
        //画圆
        addCircle: function(lonlat, layerName, radius, options, events, data){
            
            var circle = this.createCircle(lonlat, layerName, radius, options, events, data);
            if(this.map && circle){
                this.map.getOverlayLayer().addOverlay(circle, true);
            }else{
                console.warn('地图对象或覆盖物对象不存在');
            }
            
            return circle;
        },
        
        //删除指定覆盖物
        removeOverlay: function(overlay){
            if(this.map && overlay){
                this.map.getOverlayLayer().removeOverlay(overlay);
                return true;
            }else{
                console.warn('地图不存在或无法删除不存在覆盖物');
                return false;
            }
        },
        
        //删除指定覆盖物通过覆盖物id
        removeOverlayById: function(id){
        	this.removeOverlay(this.getOverLayById(id));
        },
        
        //删除一组指定覆盖物
        removeOverlays: function(overlays){
            if(this.map){
                this.map.getOverlayLayer().clear(overlays);
                return true;
            }else{
                console.warn('地图不存在');
            }
            return false;
        },
        
        //获得指定图层全部覆盖物
        getLayerOverlays: function(layerName){
            
            if(this.map){
                var allOverlay = this.map.getOverlayLayer().getOverlays();
                var result = [];
                for(var index in allOverlay){
                    if(allOverlay[index].getData && typeof allOverlay[index].getData == 'function'){
                        var da = allOverlay[index].getData();
                        if(da && da.layer == layerName){
                            result.push(allOverlay[index]);
                        }
                    }
                }
                
                return result;
            }else{
                console.warn('地图不存在');
            }
                    
            return null;
        },
        
        //删除指定图层的全部覆盖物
        removeLayerOverLays: function(layerName){
            
            var ols = this.getLayerOverlays(layerName);
            this.removeOverlays(ols);
            
        },
        
        //隐藏指定图层的全部覆盖物
        hideLayerOverLays: function(layerName){
            
            var ols = this.getLayerOverlays(layerName);
            for(var i=0; i<ols.length; i++){
                ols[i].visible(false);
            }
            
        },
        
        //显示指定图层的全部覆盖物
        showLayerOverLays: function(layerName){
            
            var ols = this.getLayerOverlays(layerName);
            for(var i=0; i<ols.length; i++){
                ols[i].visible(true);
            }
            
        },
        
        //初始化聚合图层
        initClusterLayer: function(markers, events){
            
            var dataCluster;
            
            if(this.map){
                var that = this;
                that.map.plugin(['IMAP.DataCluster'], function(){
                    dataCluster = new IMAP.DataCluster(that.map, markers, {
                        
                    });
                    
                    if(events && !!events['click'] && typeof events['click'] == 'function'){  //单击事件
                        dataCluster.addEventListener('click', function(lonlat, marks){
                            events['click'](lonlat, marks);
                        });
                    }
                    
                    that.clusterLayer = dataCluster;
                    
                });
                
            }else{
                console.warn('地图不存在');
            }
            
        },
        
        //将覆盖物集合添加到聚合图层上
        addOverLaysToCluster: function(markers){
            
            if(!isArray(markers)){
                throw new Error("markers必须为数组");
            }
                
            if(this.clusterLayer){
                
                try{
                    this.clusterLayer.addMarkers(markers, true);
                }catch(e){
                    throw new Error('向聚合图层添加覆盖物失败了')
                }
                
            }else{
                
                console.warn('聚合图层不存在');
                
            }
            
        },
        
        //从聚合图层上删除覆盖物集合
        removeOverlaysFromCluster: function(markers){
            
            if(!isArray(markers)){
                throw new Error("markers必须为数组");
            }
            
            if(this.clusterLayer){
                
                try{
                    
                    for(var i=0; i<markers.length; i++){
                        this.clusterLayer.removeMarker(markers[i], false);
                    }
                    this.clusterLayer.refreshCluster();
                    
                }catch(e){
                    
                    throw new Error('从聚合图层上删除覆盖物失败');
                }
                
            }else{
                console.warn('聚合图层不存在');
            }
            
        },
        
        //添加图层通过url函数
        addLayerByUrlFun: function(urlFun){
        	var layer = new IMAP.TileLayer({
                maxZoom:18,
                minZoom:1,
                tileSize : 256
            });
        	layer.setTileUrlFunc(urlFun);
        	layer.setOpacity(0.7);//设置图层透明度，取值范围0-1
            if(this.map){
                this.map.addLayer(layer);
                return layer;
            }else{
                console.warn('地图对象不存在 ');
                return null;
            }
        },
        
        //添加图层通过url
        addLayerByUrl: function(layerUrl){
        	return this.addLayerByUrlFun(getTileUrl(layerUrl));
        },
        
        //删除图层
        removeLayer: function(layer){
        	if(this.map){
                this.map.removeLayer(layer);
            }else{
                console.warn('地图对象不存在');
            }
        },
        
        //添加实时交通图层
        addTrafficLayer: function(){
            if (this.trafficLayer){return;}
            this.trafficLayer = this.addLayerByUrl(trafficLayerUrl);
            if(this.trafficLayer == null){
            	console.warn('添加实时路况图层失败了');
            }
        },
        
        //刷新实时交通图层
        refreshTrafficLayer: function(time){
        	
        	if(this.trafficLayer){
        		var layer = this.trafficLayer;
        		var that = this;
        		var t = time || 1000;
        		this.trafficLayer = this.addLayerByUrl(trafficLayerUrl);
        		setTimeout(function(){
        			that.removeLayer(layer);
        		}, t);
        	}else{
        		console.warn('实时图层不存在');
        	}
        	
        },
        
        //删除实时交通图层 
        removeTrafficLayer: function(){
            if (!this.trafficLayer){return;}
            
            this.removeLayer(this.trafficLayer);
            
            this.trafficLayer = null;
        },
        
        //生成信息窗口
        addWindowInfo: function(lonlat, content, size, closeCallback, offset){
            if(size && !isArray(size)){
                throw new Error('size必须为数组');
            }
            var opt = {
                title: '',
                size: createSize(size[0], size[1]),
                position: createLonlat(lonlat[0], lonlat[1])
            };
            if(offset){
                opt['offset'] = new IMAP.Pixel(offset.x, offset.y);
            }
            var windowInfo = new IMAP.InfoWindow(content,opt);
            
            if(this.map){
                this.map.getOverlayLayer().addOverlay(windowInfo);
                windowInfo.autoPan(true);
                windowInfo.addEventListener(constants.TIP_CLOSE, function(event){
                	if(typeof closeCallback == 'function'){
                		closeCallback(event);
                	}
                });
            }else{
                console.warn('地图对象不存在');
            }
            
            return windowInfo;
        },
        
        //删除信息窗口
        removeWindowInfo: function(win){
            this.removeOverlay(win);
        },
        
        //
        getReturnSize: function(width, height){
            return createSize(width, height);
        },
        
        //找到几个点的中心点
        getCenterByBound: function(lonlatArr){
            
            if(lonlatArr && !isArray(lonlatArr)){
                throw new Error('makers必须为数组');
            }
            
            var center = createLine(lonlatArr).getBounds().getCenter();
            return [center.lng, center.lat];
            
        },
        
        //根据wkt找到中心点
        getCenterByWkt: function(wkt){
            var mark = WKTUtil.read(wkt);
            
            if(mark){
            	
            	var type = mark.type;
                if(!type){
                	console.log('wkt数据无效');
                	return overLay;
                }
            	
                var lon,lat;
                
                switch (type) {
                    case 'point':
                        lon = parseFloat(mark.longLat.lng);
                        lat = parseFloat(mark.longLat.lat);
                        break;
                    case 'polygon':
                        var lonlatArr = [];
                        for(var i=0; i<mark.longLat.length; i++){
                            lonlatArr.push([parseFloat(mark.longLat[i].lng), parseFloat(mark.longLat[i].lat)]);
                        }
                        var center = this.getCenterByBound(lonlatArr);
                        lon = center[0];
                        lat = center[1];
                        break;
                    case 'polyline':
                        var lonlatArr = [];
                        for(var i=0; i<mark.longLat.length; i++){
                            lonlatArr.push([parseFloat(mark.longLat[i].lng), parseFloat(mark.longLat[i].lat)]);
                        }
                        var center = this.getCenterByBound(lonlatArr);
                        lon = center[0];
                        lat = center[1];
                        break;
                }
                
                return [lon, lat];
                
            }else{
                console.warn('数据无效');
                return undefined;
            }
        },
        
        //将某点设置成中心
        setCenter: function(lon, lat,zoom){
            if(this.map){
                try{
                    this.map.setCenter(createLonlat(lon, lat));
                    this.map.setZoom(zoom || GISConfig.positionLevel);
                }catch(e){
                    throw new Error('设置中心失败');
                }
            }else{
                throw new Error('地图不存在');
            }
        },
        //将某点设置成中心 不需要转换坐标系
        setCenterNoTransform: function(lng, lat,zoom){
            if(this.map){
                try{
                    this.map.setCenter(new IMAP.LngLat(parseFloat(lng),parseFloat(lat)),zoom || GISConfig.positionLevel);
                }catch(e){
                    throw new Error('设置中心失败');
                }
            }else{
                throw new Error('地图不存在');
            }
        },
      	//设置zoom
        setZoom: function(zoomLv){
            if(this.map){
                try{
                	this.map.setZoom(zoomLv);
                }catch(e){
                    throw new Error('设置缩放失败');
                }
            }else{
                throw new Error('地图不存在');
            }
        },
        //按照像素平移
        togglePanBy:function(x,y){
            this.map.panBy(x, y);
        },
        //将wkt数据设置中心
        setCenterByWkt: function(wkt){
            
            var lonlat = this.getCenterByWkt(wkt);
            this.setCenter(lonlat[0], lonlat[1]);
            
        },
       //添加行政区划并显示label数据
        boundary:function(keyword,_options,_areaOption,areaCallback,centerCallback) {
            if(!keyword){
                return
            }
            var areaOption = {
                layerName:"defaultLayer",
                data:{},
                html:"",
                auto:false
            };
            $.extend(areaOption,_areaOption);    
            var overlays = [] ;
            var center;
            var _this = this;
            var lnglats= [];
            //删除已经存在的信息
            this.removeLayerOverLays(areaOption.layerName);


            var polygonOption = $.extend(defaultPolygonOptions(),_options);

            _this.map.plugin(['IMAP.DistrictSearch'], function(){
                _this.boundarySearch = new IMAP.DistrictSearch();
                _this.boundarySearch.search(keyword,
                        function(status,result) {
                            if (status==0) {
                                var paths = result.results,pathArray;
                                center = paths[0].center;
                                if(typeof centerCallback  == 'function'){
                                    centerCallback(paths[0]);
                                }
                                for (var i = 0, l = paths.length; i < 1; ++i) {
                                    if (paths[i]) {
                                        pathArray = paths[i].polyline.split("|");
                                        var path;
                                        for (var j = 0, jl = pathArray.length; j < jl; ++j) {
                                            lnglats = [];
                                            path = pathArray[j].split(";");
                                            for (var n = 0, nl = path.length; n < nl; ++n) {
                                                var lnglat = path[n].split(",");
                                                lnglat = new IMAP.LngLat(lnglat[0], lnglat[1]);
                                                lnglats.push(lnglat);
                                            }

                                            var polygonData = {};
                                            $.extend(polygonData, areaOption.data);
                                            polygonData.layer = areaOption.layerName;
                                            polygonData.center = center;
                                            var polygon = new IMAP.Polygon(lnglats,polygonOption);
                                            polygon.getData = function(){
                                                return polygonData;
                                            }
                                            overlays.push(polygon);
                                            bindEvent(polygon,{
                                                click:areaCallback,
                                            },polygonData);
                                        }
                                    }
                                }
                                _this.map.getOverlayLayer().addOverlays(overlays,areaOption.auto);  
                               //目前出现问题是添加label的时候容易重叠，定时器可以 推测是同时绘制多个overlay造成的
                               setTimeout(function(){
                                    _this.createLabel(areaOption.html,center,{},areaOption.layerName);
                                }.bind(this),500);
                                
                            }
                    });
            });
        },
        //添加label
        createLabel:function(html,center,_options,layerName,data){
            var options = defaultLabelOptions();
            var position = createLonlat(parseFloat(center.lng),parseFloat(center.lat));
            $.extend(options, _options);
            options.position = position;
            var label=new IMAP.Label(html, options);
            var labelData={layer:this.handleLayer(layerName)};
            $.extend(labelData, data);
            label.getData = function(){
                return labelData;
            }
            this.map.getOverlayLayer().addOverlay(label,options.auto);
            return label
        },
        
        //创建绘制工具
        initDrawTool: function(){
        	if(this.map){
        		this.map.plugin(['IMAP.Tool']);//下载鼠标工具插件
        	}else{
        		console.warn('地图对象不存在，初始化鼠标绘制工具失败');
        	}
        },
        
        //关闭绘制
        closeDraw: function(){
        	if (this.tool){
				if (this.addoverlayEvt) {
					this.tool.removeEventListener(this.addoverlayEvt);
				}

				this.tool.close();
				this.tool = null;
				
			}
        },
        
        //添加绘制事件
        addDrawEvent: function(addFun, type, layer, _event){
        	if(this.tool){
        		if(addFun){
    				this.tool.addEventListener(IMAP.Constants.ADD_OVERLAY, function(e){
    					if(!addFun || typeof addFun != 'function'){
    						return;
    					}
    					switch (type){
	    					case 'point':
								//var point = tumengTowgs84(e.overlay.getPosition());
								var overlay = e.overlay;
								var path = e.overlay.getPosition();
								var _data = {
									layer: layer,
									path: path
								};
								overlay.getData = function(){
									return _data;
								};
								bindEvent(overlay, _event, _data);
	    						addFun(path, overlay);
	    						break;
	    					case 'line':
	    						//var paths = tumengArrTowgs84(e.overlay.getPath());
	    						var overlay = e.overlay;
	    						var path = e.overlay.getPath();
	    						var _data = {
									layer: layer,
									path: path
								};
	    						overlay.getData = function(){
									return _data;
								};
								bindEvent(overlay, _event, _data);
	    						addFun(path, overlay);
	    						break;
	    					case 'circle':
								//var point = tumengTowgs84(e.overlay.getCenter());
	    						var overlay = e.overlay;
	    						var path = e.overlay.getCenter();
	    						var radius = e.overlay.getRadius();
	    						var _data = {
									layer: layer,
									path: path,
									radius: radius
								};
	    						overlay.getData = function(){
									return _data;
								};
								bindEvent(overlay, _event, _data);
	    						addFun(path, radius, overlay);
	    						break;
	    					case 'rect': 
	    						//var ds = e.overlay.getBounds();
	    						//var bounds = {
	    						//	northeast: tumengTowgs84(ds.northeast),
	    						//	southwest: tumengTowgs84(ds.southwest)
	    						//};
	    						var overlay = e.overlay;
	    						var path = e.overlay.getBounds();
	    						var _data = {
									layer: layer,
									path: path
								};
	    						overlay.getData = function(){
									return _data;
								};
								bindEvent(overlay, _event, _data);
	    						addFun(path, overlay);
	    						break;
    					}
    				}, this);
    			}
        	}
        },
        
        //绘制点
        drawPoint(_options, addFun, _event){
        	
        	var options = defaultPointOptions();
        	options.follow = false;
        	options.autoClose = true;
        	$.extend(options, _options);
        	options.layer = this.handleLayer(options.layer);
        	
        	this.closeDraw();
        	
        	if(this.map){
        		this.tool = new IMAP.MarkerTool(createIcon(options.imgUrl, options.size[0], options.size[1]));
    			this.tool.follow=options.follow;
    			this.tool.autoClose=options.autoClose;
    			this.map.addTool(this.tool);
    			this.tool.open();
    			
    			this.addDrawEvent(addFun, 'point', options.layer, _event);
        	}else{
        		throw new Error('地图对象不存在');
        	}
        	
        },
        
        //绘制线
        drawPolyline(_options, addFun, _event){
        	
        	var options = defaultLineOptions();
        	options.autoClose = true;
        	$.extend(options, _options);
        	options.layer = this.handleLayer(options.layer);
        	
        	this.closeDraw();
        	
        	if(this.map){
        		this.tool = new IMAP.PolylineTool(options);
    			this.tool.autoClose=options.autoClose;
    			this.tool.strokeWeight = options.strokeWeight;
    			this.tool.strokeOpacity = options.strokeOpacity;
    			this.tool.strokeColor = options.strokeColor;
    			if(options.arrow){
    				this.tool.arrow = true;
    			}
    			this.map.addTool(this.tool);
    			this.tool.open();
    			
    			this.addDrawEvent(addFun, 'line', options.layer, _event);
        	}else{
        		throw new Error('地图对象不存在');
        	}
        	
        },
        
        //绘制多边形
        drawPolygon: function(_options, addFun, _event){
        	var options = defaultPolygonOptions();
        	options.autoClose = true;
        	$.extend(options, _options);
        	options.layer = this.handleLayer(options.layer);
        	
        	this.closeDraw();
        	
        	if(this.map){
        		this.tool = new IMAP.PolygonTool(options);
    			this.tool.autoClose=options.autoClose;
    			this.tool.strokeWeight = options.strokeWeight;
    			this.tool.strokeOpacity = options.strokeOpacity;
    			this.tool.strokeColor = options.strokeColor;
    			this.tool.fillColor = options.fillColor;
    			this.tool.fillOpacity = options.fillOpacity;
    			this.map.addTool(this.tool);
    			this.tool.open();
    			
    			this.addDrawEvent(addFun, 'line', options.layer, _event);
        	}else{
        		throw new Error('地图对象不存在');
        	}
        },
        
        //绘制园
        drawCircle: function(_options, addFun, _event){
        	var options = defaultCircleOptions();
        	options.autoClose = true;
        	$.extend(options, _options);
        	options.layer = this.handleLayer(options.layer);
        	
        	this.closeDraw();
        	
        	if(this.map){
        		this.tool = new IMAP.CircleTool(options);
    			this.tool.autoClose=options.autoClose;
    			this.tool.strokeWeight = options.strokeWeight;
    			this.tool.strokeOpacity = options.strokeOpacity;
    			this.tool.strokeColor = options.strokeColor;
    			this.tool.fillColor = options.fillColor;
    			this.tool.fillOpacity = options.fillOpacity;
    			this.map.addTool(this.tool);
    			this.tool.open();
    			
    			this.addDrawEvent(addFun, 'circle', options.layer, _event);
        	}else{
        		throw new Error('地图对象不存在');
        	}
        },
        
        //绘制矩形
        drawRect: function(_options, addFun, _event){
        	var options = defaultRectangleOptions();
        	options.autoClose = true;
        	$.extend(options, _options);
        	options.layer = this.handleLayer(options.layer);
        	
        	this.closeDraw();
        	
        	if(this.map){
        		this.tool = new IMAP.RectangleTool(options);
    			this.tool.autoClose=options.autoClose;
    			this.tool.strokeWeight = options.strokeWeight;
    			this.tool.strokeOpacity = options.strokeOpacity;
    			this.tool.strokeColor = options.strokeColor;
    			this.tool.fillColor = options.fillColor;
    			this.tool.fillOpacity = options.fillOpacity;
    			this.map.addTool(this.tool);
    			this.tool.open();
    			
    			this.addDrawEvent(addFun, 'rect', options.layer, _event);
        	}else{
        		throw new Error('地图对象不存在');
        	}
        },
        
        
        //创建折线绘制工具
        initPolylineTool:function(callback){
            let that = this;
            that.map.plugin(['IMAP.Tool'],function () {
                that.polylineTool =  new IMAP.PolylineTool();
                callback();
            });
        },
        //工具类绑定事件方法：add,remove
        addEventListenerForTool:function (typeStr,fun) {
            let type = IMAP.Constants.ADD_OVERLAY;
            switch ($.trim(typeStr)){
                case "add":type=IMAP.Constants.ADD_OVERLAY;break;
                case "remove":type=IMAP.Constants.REMOVE_TOOL;break;
            }
            if($.trim(fun)){
                this.polylineTool.addEventListener(type, fun);
            }else {
                this.polylineTool.addEventListener(type, function(evt){

                    });
            }

        },
        //地图加载工具类
        addTool:function(){
            this.map.addTool(this.polylineTool);
        },
        //打开工具，工具类开始绘制
        openTool:function () {
            this.polylineTool.open();
        },
        //关闭工具，工具类绘制结束
        closeTool:function () {
            this.polylineTool.close();
        },
        clearMap:function () {
            this.map.clearOverlays();
        },
        clearOverlays: function(){
        	if(this.map){
        		this.map.clearOverlays();
        	}else{
        		console.warn('地图对象不存在');
        	}
        },
        
        //根据行政区划名字画行政区划
        addDistrictShowByName: function(cityName, _layer, _events, _data, _options){
        	
        	var keyword = cityName;
        	
        	if(this.map){
        		var that = this;
        		that.map.plugin(['IMAP.DistrictSearch'], function(){
					var boundarySearch = new IMAP.DistrictSearch();
					boundarySearch.search(keyword,
						function(status,result) {
							var overlays = [];
							if (status==0) {
								var paths = result.results,pathArray;
								for (var i = 0, l = paths.length; i < l; ++i) {
									if (paths[i]) {
										pathArray = paths[i].polyline.split("|");
										var path;
										_data.center = paths[i].center;
										for (var j = 0, jl = pathArray.length; j < jl; ++j) {
											var lnglats = [];
											path = pathArray[j].split(";");
											for (var n = 0, nl = path.length; n < nl; ++n) {
												var lnglat = path[n].split(",");
												lnglat = [parseFloat(lnglat[0]), parseFloat(lnglat[1])];
												lnglats.push(lnglat);
											}
											var polygon = createPolygon(lnglats, _layer, _options, _events, _data);
											overlays.push(polygon);
										}
									}
								}
							}
							that.addOverLays(overlays);
						});
        		});
        		
        	}else{
        		console.warn('地图不存在');
        	}
        	
        },
        
        //加载插件（私有）
        loadPlugin: function(pluginNameArr, callback){
        	
        	if(this.map){
        		this.map.plugin(pluginNameArr, function(){
        			if(typeof callback == 'function'){
        				callback();
        			}
        		});
        	}else{
        		console.warn('地图不存在');
        	}
        	
        },
        
        //路线规划（步行）
        walkPlan: function(start, end, callback, _options){
        	
        	if(!isArray(start)){
        		console.warn('start必须为数组');
        	}
        	if(!isArray(end)){
        		console.warn('end必须为数组');
        	}
        	
        	var options = {map: this.map};
        	$.extend(options, _options);
        	
        	this.loadPlugin(['IMAP.Walking'], function(){
        		var walkingSearch=new IMAP.Walking(options);
        		walkingSearch.search(createLonlat(start[0], start[1]), createLonlat(end[0], end[1]), function(status, result){
        			if(typeof callback == 'function'){
        				callback(status, result);
        				if(options.clear){
        					try{
        						walkingSearch.clear();
        					}catch(e){}
        				}
        			}
        		});
        	});
        	
        },
        
        //路线规划（驾车）
        drivePlan: function(start, end, callback, _options){
        	
        	if(!isArray(start)){
        		console.warn('start必须为数组');
        	}
        	if(!isArray(end)){
        		console.warn('end必须为数组');
        	}
        	
        	var options = {map: this.map};
        	$.extend(options, _options);
        	
        	this.loadPlugin(['IMAP.Driving'], function(){
        		var drivingSearch=new IMAP.Driving(options);
        		drivingSearch.search(createLonlat(start[0], start[1]), createLonlat(end[0], end[1]), function(status, result){
        			if(typeof callback == 'function'){
        				callback(status, result);
        				if(options.clear){
        					try{
        						walkingSearch.clear();
        					}catch(e){}
        				}
        			}
        		});
        	});
        	
        },
        
    };
    
    //获取图层函数 
    function getTileUrl(layerUrl){
    	
    	function getUrl(x,y,z){
            var url = layerUrl;
            return url.replace("{x}",x).replace("{y}",y).replace("{z}",z).replace("{17-z}", 17-z);
    	}
        return getUrl;
    }
    
    //生成覆盖物（圆）
    function createCircle(lonlat, layerName, radius, _options, events, data){
        
        if(!isArray(lonlat)){
            throw new Error("lonlat必须为数组");
        }
        
        var options = defaultCircleOptions();
        $.extend(options, _options);
        
        var circleData = {};
        $.extend(circleData, data);
        circleData.layer = layerName;
        
        if(lonlat.length > 1){
            var centerlnglat = createLonlat(lonlat[0], lonlat[1]);
            var circle = new IMAP.Circle(centerlnglat, radius, options);
            circle.getData = function(){
                return circleData;
            };
            
            //绑定事件
            if(events && typeof events == 'object'){
                bindEvent(circle, events, circleData);
            }
            
            return circle;
        }
        
        return circle;
    }
    
    //生成覆盖物（矩形）
    function createRectangle(lonlatArr, layerName, _options, events, data){
        
        if(!isArray(lonlatArr)){
            throw new Error("lonlat必须为数组");
        }
        
        var options = defaultRectangleOptions();
        $.extend(options, _options);
        
        var rectangleData = {};
        $.extend(rectangleData, data);
        rectangleData.layer = layerName;
        
        if(lonlatArr.length > 1){
            var sw = createLonlat(lonlatArr[0][0], lonlatArr[0][1]);
            var ne = createLonlat(lonlatArr[1][0], lonlatArr[1][1]);
            var rect = new IMAP.Rectangle(new IMAP.LngLatBounds(sw,ne), options);
            rect.getData = function(){
                return rectangleData;
            };
            
            //绑定事件
            if(events && typeof events == 'object'){
                bindEvent(rect, events, rectangleData);
            }
            
            return rect;
        }
        
        return null;
        
    }
    
    //生成覆盖物（多边形）
    function createPolygon(lonlatArr, layerName, _options, events, data){
        
        if(!isArray(lonlatArr)){
            throw new Error("lonlat必须为数组");
        }
        
        var options = defaultPolygonOptions();
        $.extend(options, _options);
        
        var polygonData = {};
        $.extend(polygonData, data);
        polygonData.layer = layerName;
        
        var polygonArr = [];
        for(var i=0; i<lonlatArr.length; i++){
            if(isArray(lonlatArr[i])){
                polygonArr.push(createLonlat(lonlatArr[i][0], lonlatArr[i][1]));
            }
        }
        
        if(polygonArr.length > 0){
            var polygon=new IMAP.Polygon(polygonArr, options);
            polygon.getData = function(){
                return polygonData;
            }
            
            //绑定事件
            if(events && typeof events == 'object'){
                bindEvent(polygon, events, polygonData);
            }
            
            return polygon;
        }
        
        return null;
    }
    
    //生成覆盖物（线）
    function createLine(lonlatArr, layerName, _options, events, data){
        
        if(!isArray(lonlatArr)){
            throw new Error("lonlat必须为数组");
        }
        
        var options = defaultLineOptions();
        $.extend(options, _options);
        
        var lineData = {};
        $.extend(lineData, data);
        lineData.layer = layerName;
        
        var linePath = [];
        for(var i=0; i<lonlatArr.length; i++){
            if(isArray(lonlatArr[i])){
                linePath.push(createLonlat(lonlatArr[i][0], lonlatArr[i][1]));
            }
        }
        
        if(linePath.length > 0){
            var polyline = new IMAP.Polyline(linePath, options);
            polyline.getData = function(){
                return lineData;
            };
            
            //绑定事件
            if(events && typeof events == 'object'){
                bindEvent(polyline, events, lineData);
            }
            
            return polyline;
        }
        
        return null;
    }
    
    //生成单点的覆盖物
    function createOverLay(lonlat, layerName, _options, events, data){
        
        if(!isArray(lonlat)){
            throw new Error("lonlat必须为数组");
        }
        
        var options = defaultPointOptions();
        $.extend(options, _options);
        
        var pointData = {};
        $.extend(pointData, data);
        pointData.layer = layerName;
        
        var opts=new IMAP.MarkerOptions();
        opts.anchor = IMAP.Constants.CENTER;
        opts.icon = createIcon(options.imgUrl, options.size[0], options.size[1]);
        opts.title = pointData.title;

        var lnglat = createLonlat(lonlat[0], lonlat[1]);
        if(lnglat){
            var marker=new IMAP.Marker(lnglat, opts);
            //marker.data = pointData;
            marker.getData = function(){
                return pointData;
            };
            
            //绑定事件
            if(events && typeof events == 'object'){
                bindEvent(marker, events, pointData);
            }
            
            return marker;
        }
        
        return null;
    }
    
    //生成icon
    function createIcon(url, width, height){
        return new IMAP.Icon(url, {
            "size":createSize(width, height),
            "offset":new IMAP.Pixel(0, 0)
        });
    }
    
    //生成经纬度数据
    function createLonlatArr(lonlatArr){
    	var result = [];
    	if(isArray(lonlatArr)){
    		for(var i=0; i<lonlatArr.length; i++){
    			if(isArray){
    				var lonlat = createLonlat(lonlatArr[i][0], lonlatArr[i][1]);
        			if(lonlat){
        				result.push(lonlat);
        			}
    			}
    		}
    	}
    	return result;
    }
    
    //生成经纬度对象
    function createLonlat(lon, lat){
        if(lon && typeof lon == 'number' && lat && typeof lat == 'number'){
            //数据库获取的84坐标要转换成图盟的gcj02坐标 add by chenzy
            // var lonLat=coordinateUtil.wgs84togcj02(lon, lat);
            return new IMAP.LngLat(lon, lat);
        }else{
            console.warn('经纬度数据必须为number类型');
        }
        return null;
    }
    
    //生成Size对象
    function createSize(width, height){
        if(width && typeof width == 'number' && height && typeof height == 'number'){
            return new IMAP.Size(width, height);
        }else{
            throw new Error('size数据必须为number类型');
        }
        return null;
    }
    
    //为覆盖物绑定事件
    function bindEvent(marker, events, data){
        if(events && !!events['click'] && typeof events['click'] == 'function'){  //单击事件
            marker.addEventListener('click', function(event){
                events['click'](data, event, marker);
            }, marker);
        }
        if(events && !!events['dblclick'] && typeof events['dblclick'] == 'function'){  //双击击事件
            marker.addEventListener('dblclick', function(event){
                events['dblclick'](data, event, marker);
            }, marker);
        }
        if(events && !!events['mouseover'] && typeof events['mouseover'] == 'function'){  //鼠标移入事件
            marker.addEventListener('mouseover', function(event){
                events['mouseover'](data, event, marker);
            }, marker);
        }
        if(events && !!events['mouseout'] && typeof events['mouseout'] == 'function'){  //鼠标移出事件
            marker.addEventListener(IMAP.Constants.MOUSE_OUT, function(event){
                events['mouseout'](data, event, marker);
            }, marker);
        }
        if(events && !!events['rightclick'] && typeof events['rightclick'] == 'function'){  //右键事件
			marker.addEventListener(IMAP.Constants.MOUSE_CONTEXTMENU, function(event){
				events['rightclick'](data, event, marker);
	        }, marker);
		}
    }
    
    //map自身方法是否启用
    function mapMethodAble(marker,obj) {
    	if(!isObject(obj)) return false;
    	if(obj.hasOwnProperty('disableZoom')) {
    		marker.dblclickZoom(obj['disableZoom'] ? true : false);  //是否启用鼠标双击放大地图
    	}
    }
    
    //判断是否对象
    function isObject(obj) {
    	var type = typeof obj;
    	return type === 'function' || type === 'object' && !!obj;
    }
    
    //判断一个对象是否为数组
    function isArray(arr){
        if(Array.isArray(arr)){
            return true;
        }
        return false;
    }
    
    //生成图层名
    function createLayer(layerName){
        if(typeof layerName != 'string'){
            return 'defaultLayer';
        }
        return layerName;
    }
    
    //将图盟gcj02转wgs84(保持图盟类型的经纬度对象)
    function tumengTowgs84(lnglat){
    	if(lnglat && lnglat.lng && lnglat.lat){
    		var lonlat = coordinateUtil.gcj02towgs84(lnglat.lng, lnglat.lat);
    		return {
    			lng: lonlat[0],
    			lat: lonlat[1]
    		};
    	}
    	return null;
    }
    
    //将图盟gcj02数组转wgs84数组(保持图盟类型的经纬度对象数组)
    function tumengArrTowgs84(lnglatArr){
    	var result = [];
    	if($.isArray(lnglatArr)){
    		for(var i=0; i<lnglatArr.length; i++){
    			result.push(tumengTowgs84(lnglatArr[i]));
    		}
    		return result;
    	}
    	return null;
    }
    
})(mapAdapter);