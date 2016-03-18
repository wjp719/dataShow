var bind=function(){
//	$('#play').click(function(){
//		 $("#my_audio").trigger('play');
//	});
//	$('#pause').click(function(){
//		 $("#my_audio").trigger('pause');
//        $("#my_audio").prop("currentTime",0);
//	});
	for(var i=0;i<$('.vioce').size();i++){
		$('.vioce').eq(i).css("autoplay",0);
		//$('.vioce').eq(i).prop("currentTime",0);
	}
	stop();
	//console.info($('.vioce').size());
	$('.pics').mouseover(function(){
		var name=$(this).attr('src');
		$(this).css("cursor","pointer");
		arrs=name.split("/");
		arrs=arrs[2].split('.');
		//console.info(arrs[0]);
		//stop();
		var tem="assets/img/"+arrs[0]+'.z.jpg';
		//console.info(tem);
		$(this).attr("src",tem);
		$('.vioce').eq(parseInt(arrs[0])-1).trigger('play');
		//console.info("paluy");
	});
	
	$('.pics').mouseout(function(){
		var name=$(this).attr('src');
		
		arrs=name.split("/");
		arrs=arrs[2].split('.');
		//console.info(arrs[0]);
		stop();
		var tem="assets/img/"+arrs[0]+'.jpg';
		//console.info(tem);
		$(this).attr("src",tem);
		$('.vioce').eq(parseInt(arrs[0])-1).trigger('pause');
		//console.info("paluy");
	});
};
var stop=function(){
	for(var i=0;i<$('.vioce').size();i++){
		$('.vioce').eq(i).trigger('pause');
		$('.vioce').eq(i).prop("currentTime",0);
	}
};
var treeMap=function(){
	// 基于准备好的dom，初始化echarts实例
	var h=window.screen.height;
	var w=window.screen.width;
	$('#tree').css("width",w);
	$('#tree').css("height",h);
	var myChart = echarts.init(document.getElementById('tree'));
	var mes={'泉州湾河口湿地':'福建·泉州；面积7009 hm2；省级	；始建于2002/2/26',
			'漳江口红树林':'福建·云霄县；面积2360 hm2；国家级；始建于1992/7/1',
			'龙海九龙江河口湿地':'福建·龙海市；面积4360 hm2	；县级；始建于2004/11/25',
			'龙海九龙江口红树林':'福建·龙海市；面积420 hm2；省级	；始建于1988/2/12',
			'环三都澳红树林':'福建·宁德市蕉城区；面积1206 hm2；市级；始建于1997/3/25',
			'大鹏半岛':'广东·深圳市葵涌、 大鹏、南澳；面积14622 hm2；市级；始建于2010/1/1',
			'内伶仃岛－福田':'广东·深圳市宝安区、福田区；面积815 hm2	；国家级；始建于1984/4/9',
			'淇澳－担杆岛':'广东·珠海市；面积7363 hm2；省级；始建于1989/11/1',
			'镇海湾红树林':'广东·台山市；面积1500 hm2；县级；始建于2000/11/1',
			'恩平红树林':'广东·恩平市；面积700 hm2；县级	；始建于2005/1/1',
			'湛江红树林':'广东·湛江市；面积19300 hm2；国家级	；始建于1990/1/8',
			'苍头、南山红树林':'广东·徐闻县；面积300 hm2；县级	；始建于1997/5/1',
			'茂港红树林':'广东·茂名市茂港区；面积800 hm2	；县级；始建于2001/11/1',
			'电白红树林':'广东·电白县；面积1950 hm2；市级；始建于1999/12/1',
			'惠东红树林':'广东·惠东县；面积533 hm2；市级	；始建于1999/12/1',
			'南万红椎林':'广东·陆河县；面积2486 hm2；省级；始建于1999/11/1',
			'岗列对岸三角洲':'广东·阳江市江城区；面积40 hm2；县级；始建于2005/1/1',
			'平冈红树林湿地':'广东·阳江市江城区；面积800 hm2；县级；始建于2005/1/1',
			'程村豪光红树林':'广东·阳西县；面积1000 hm2；县级；始建于2000/6/1',
			'山口红树林':'广西·合浦县；面积8000 hm2；国家级；始建于1990/9/30',
			'北仑河口':'广西·防城港市、东兴市；面积3000 hm2；国家级；始建于1990/3/4',
			'茅尾海红树林':'广西·钦州市；面积2784 hm2；省级；始建于2005/1/17',
			'东寨港':'海南·海口市美兰区；面积3337 hm2；国家级；始建于1980/1/3',
			'三亚河红树林':'海南·三亚市；面积344 hm2；市级	；始建于1992/2/1',
			'铁炉港红树林':'海南·三亚市；面积292hm2；市级；始建于1999/11/1',
			'亚龙湾青梅港':'海南·三亚市；面积156 hm2；市级；始建于	1989/1/1',
			'新英湾红树林':'海南·儋州市；面积115 hm2；市级；始建于	1992/4/27',
			'清澜港':'海南·文昌市；面积2948 hm2；省级；始建于1981/9/25',
			'花场湾沿岸红树林':'海南·橙迈县；面积150 hm2；县级；始建于	1995/12/1',
			'彩桥红树林':'海南·临高县；面积350 hm2；县级；始建于	1986/12/1',
			'淡水河口红树林':'台湾·台北；面积76 hm2；省级；始建于1986/6/27',
			'关渡':'台湾·台北；面积55 hm2；市级；始建于1986/6/27',
			'北门沿海':'台湾·台南；面积未知；县级；始建于1986年',
			'米埔红树林':'香港·米埔；面积2700 hm2；国家级；始建于1975年'
};
    var data = [
{name: '内伶仃岛－福田', value: 200},
{name: '泉州湾河口湿地', value: 60},
{name: '漳江口红树林', value: 60},
{name: '龙海九龙江河口湿地', value: 60},
{name: '龙海九龙江口红树林', value: 60},
{name: '环三都澳红树林', value: 60},
{name: '大鹏半岛', value:60},

{name: '淇澳－担杆岛', value: 60},
{name: '镇海湾红树林', value: 60},
{name: '恩平红树林', value: 60},
{name: '湛江红树林', value: 60},
{name: '苍头、南山红树林', value: 60},
{name: '茂港红树林', value: 60},
{name: '电白红树林', value: 60},
{name: '惠东红树林', value: 60},
{name: '南万红椎林', value: 60},
{name: '岗列对岸三角洲', value: 60},
{name: '平冈红树林湿地', value: 60},
{name: '程村豪光红树林', value: 60},
{name: '山口红树林', value: 60},
{name: '北仑河口', value: 60},
{name: '茅尾海红树林', value:60},
{name: '东寨港', value: 60},
{name: '三亚河红树林', value: 60},
{name: '铁炉港红树林', value: 60},
{name: '亚龙湾青梅港', value: 60},
{name: '新英湾红树林', value: 60},
{name: '清澜港', value: 60},
{name: '花场湾沿岸红树林', value: 60},
{name: '彩桥红树林', value: 60},
{name: '淡水河口红树林', value: 60},
{name: '关渡', value: 60},
{name: '米埔红树林', value: 60}
           ];
           var geoCoordMap = {
        		   '泉州湾河口湿地':[118.68,24.88],
        		   '漳江口红树林':[118.02,24.20],
        		   '龙海九龙江河口湿地':[117.82,24.45],
        		   '龙海九龙江口红树林':[117.82,24.45],
        		   '环三都澳红树林':[119.53,26.67],
        		   '大鹏半岛':[114.49,22.55],
        		   '内伶仃岛－福田':[113.81,22.41],
        		   '淇澳－担杆岛':[113.63,22.40],
        		   '镇海湾红树林':[112.79,22.25],
        		   '恩平红树林':[112.31,22.18],
        		   '湛江红树林':[109.74,21.61],
        		   '苍头、南山红树林':[110.18,20.33],
        		   '茂港红树林':[110.93,21.66],
        		   '电白红树林':[111.01,21.51],
        		   '惠东红树林':[114.54,22.74],
        		   '南万红椎林':[115.52,23.35],
        		   '岗列对岸三角洲':[111.96,21.86],
        		   '平冈红树林湿地':[111.90,21.76],
        		   '程村豪光红树林':[111.62,21.75],
        		   '山口红树林':[109.74,21.61],
        		   '北仑河口':[108.33,22.82],
        		   '茅尾海红树林':[108.54,21.82],
        		   '东寨港':[110.37,20.03],
        		   '三亚河红树林':[109.51,18.25],
        		   '铁炉港红树林':[109.69,18.27],
        		   '亚龙湾青梅港':[109.64,18.21],
        		   '新英湾红树林':[109.22,19.75],
        		   '清澜港':[110.83,19.52],
        		   '花场湾沿岸红树林':[110.01,19.74],
        		   '彩桥红树林':[109.69,19.91],
        		   '淡水河口红树林':[121.44,25.18],
        		   '关渡':[121.47,25.11],
        		   '米埔红树林':[114.01,22.53]
           };

           var convertData = function (data) {
               var res = [];
               for (var i = 0; i < data.length; i++) {
                   var geoCoord = geoCoordMap[data[i].name];
                   if (geoCoord) {
                	   if(data[i].name=="内伶仃岛－福田"){
                		   res.push({
                               name: data[i].name,
                               value: geoCoord.concat(data[i].value)
                           });
                	   }else{
                		   res.push({
                               name: data[i].name,
                               value: geoCoord.concat(data[i].value)
                           });
                	   }
                      
                   }
               }
               return res;
           };

           option = {
               backgroundColor: '#404a59',
               title: {
                   text: '全国红树林自然保护区名录（截至2011年底）',
                   subtext: '数据来源：中华人民共和国环境保护部自然生态保护司公布的全国自然保护区名录',
                   sublink: '',
                   left: 'center',
                   zlevel:3,
                   textStyle: {
                       color: '#fff'
                   }
               },
               tooltip : {
                   trigger: 'item',
                   formatter:function (params) {
       	        	//console.info(params);
       	            return params['name']+'  '+mes[params['name']]
       	        }
               },
              
               legend: {
                   orient: 'vertical',
                   y: 'bottom',
                   x:'right',
                   data:['pm2.5'],
                   textStyle: {
                       color: '#fff'
                   }
               },
               geo: {
                   map: 'china',
                   top :-50,
                   label: {
                       emphasis: {
                           show: false
                       }
                   },
                   mapLocation:{"x": "right",
                	    "y": "right"},
                   roam: true,
                   itemStyle: {
                       normal: {
                           areaColor: '#323c48',
                           borderColor: '#111'
                       },
                       emphasis: {
                           areaColor: '#2a333d'
                       }
                   }
               },
               series : [
                  
                   {
                       name: '红树林',
                       type: 'effectScatter',
                       coordinateSystem: 'geo',
                       data: convertData(data.sort(function (a, b) {
                           return b.value - a.value;
                       }).slice(1, 34)),
                       symbolSize: function (val) {
                           return val[2] / 10;
                       },
                       showEffectOn: 'render',
                       rippleEffect: {
                           brushType: 'stroke'
                       },
                       hoverAnimation: true,
                       label: {
                           normal: {
                               formatter: '{b}',
                               position: 'right',
                               show: false
                           }
                       },
                       itemStyle: {
                           normal: {
                               color: '#f4e925',
                               shadowBlur: 10,
                               shadowColor: '#333'
                           }
                       },
                       zlevel: 1
                   }, {
                       name: '红树林',
                       type: 'effectScatter',
                       coordinateSystem: 'geo',
                       data: convertData(data.sort(function (a, b) {
                           return b.value - a.value;
                       }).slice(0, 1)),
                       symbolSize: function (val) {
                           return val[2] / 10;
                       },
                       showEffectOn: 'render',
                       rippleEffect: {
                           brushType: 'stroke'
                       },
                       hoverAnimation: true,
                       label: {
                           normal: {
                               formatter: '{b}',
                               position: 'right',
                               show: true
                           }
                       },
                       itemStyle: {
                           normal: {
                               color: '#f4e925',
                               shadowBlur: 10,
                               shadowColor: '#333'
                           }
                       },
                       zlevel: 1
                   }
               ]
           };



    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
};
var migrationMap=function(){
	var h=window.screen.height;
	var w=window.screen.width;
	$('#migration').css("width",w);
	$('#migration').css("height",h);
	 var myChart = echarts.init(document.getElementById('migration'));


     var geoCoordMap = {
     		'美国阿拉斯加':[(-151.19-90+360)%360,63.11],
     		'澳大利亚克拉金固隆国家公园':[(149.44-90+360)%360,-37.73],
     		'科科斯群岛':[(96.89-90+360)%360,-12.20],
     		'深圳福田红树林':[(114.00-90+360)%360,22.52],
     		'丹东鸭绿江口':[(124.08-90+360)%360,39.83],
     		'俄罗斯远东地区':[(156.79-90+360)%360,65.65]
     		
     
     	};
     var mes={
     		'美国阿拉斯加':'东亚—澳大利亚迁徙线的始发站，候鸟们从这里起飞，<br/>到澳大利亚温暖的湿地繁衍后再北上，经过我国东部沿海省份。',
     		'澳大利亚克拉金固隆国家公园':'澳大利亚全国现共有<br/> 65 个拉姆萨尔湿地，面积共约 800 万公顷。<br/>卡卡杜国家公园、克拉金固隆国家公园和纳吉自然保护区<br/>里的湿地吸引了大量候鸟不辞辛苦地飞来，<br/>在这片温暖的地方温暖的地方产卵、育雏。',
     		'科科斯群岛':'科科斯群岛是澳大利亚在<br/>印度洋上的海外领地，在珀斯西北部。<br/>群岛面积共14.2平方公里，由27个珊瑚岛组成，<br/>被认为是世界上海盗埋藏珍宝最多的地方，<br/>在寻宝者的眼里也叫“宝藏岛”。<br/>1995年建成的普鲁国家公园是很多候鸟的天堂，<br/>共有97种鸟类。',
     		'深圳福田红树林':'  福田红树林地处深圳湾东北岸，<br/>毗邻拉木萨尔国际重要湿地香港米埔保护区。<br/>每年有10万只以上长途迁徙的候鸟在深圳湾停歇，<br/>是东半球国际候鸟通道上重要的<br/>“中转站”、“停歇地”和“加油站”。',
     		'丹东鸭绿江口':' 丹东，是我国延绵一万八千<br/>多公里海岸线的北端起点。 <br/>国家级鸭绿江口湿地保护区鸟类资源<br/>十分丰富，每年三至五月，<br/>多达上百万只候鸟在此停歇，经过<br/>四至五周的体力休整、能量补充，<br/>再次向北远行',
     		'俄罗斯远东地区':'长途的迁徙再历经最后一番磨难，<br/>便要回到最初的原点。'
     };

     	var BJData = [
     	    [{name:'美国阿拉斯加'}, {name:'澳大利亚克拉金固隆国家公园',value:80}],
     	    [{name:'澳大利亚克拉金固隆国家公园'}, {name:'科科斯群岛',value:80}],
     	    [{name:'科科斯群岛'}, {name:'深圳福田红树林',value:80}],
     	    [{name:'深圳福田红树林'}, {name:'丹东鸭绿江口',value:80}],
     	    [{name:'丹东鸭绿江口'}, {name:'俄罗斯远东地区',value:80}],
     	    [{name:'俄罗斯远东地区'}, {name:'美国阿拉斯加',value:80}]
     	];

     

     	var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

     	var convertData = function (data) {
     	    var res = [];
     	    for (var i = 0; i < data.length; i++) {
     	        var dataItem = data[i];
     	        var fromCoord = geoCoordMap[dataItem[0].name];
     	        var toCoord = geoCoordMap[dataItem[1].name];
     	        if (fromCoord && toCoord) {
     	            res.push([{
     	                coord: fromCoord
     	            }, {
     	                coord: toCoord
     	            }]);
     	        }
     	    }
     	    //console.info(res);
     	    return res;
     	};

     	var color = ['#a6c84c', '#ffa022', '#46bee9'];
     	var series = [];
     	[['北京', BJData]].forEach(function (item, i) {
     		
     	    series.push(
     	    {
     	        name: '2',
     	        type: 'lines',
     	        zlevel: 2,
     	        effect: {
     	        
                     
     	        	  show: true,
                       scaleSize: 1,
                       period: 6,
                       color: '#fff',
                       shadowBlur: 5,
     	           
     	        },
     	        lineStyle: {
     	            normal: {
     	                color: color[i],
     	                width: 1,
     	                opacity: 0.4,
     	                curveness: 0.2
     	            }
     	        },
     	        data: convertData(item[1])
     	    },
     	    {
     	        name: i,
     	        type: 'effectScatter',
     	        coordinateSystem: 'geo',
     	        zlevel: 2,
     	        rippleEffect: {
     	            brushType: 'stroke'
     	        },
     	        label: {
     	            normal: {
     	                show: true,
     	                position: 'right',
     	                formatter: '{b}'
     	            }
     	        },
     	        symbolSize: function (val) {
     	            return val[2] / 8;
     	        },
     	        itemStyle: {
     	            normal: {
     	                color: color[i]
     	            }
     	        },
     	        data: item[1].map(function (dataItem) {
     	        //	console.info(geoCoordMap[dataItem[1].name].concat([dataItem[1].value]))
     	            return {
     	                name: dataItem[1].name,
     	                value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
     	            };
     	        })
     	    });
     	});

     	option = {
     	    backgroundColor: '#404a59',
     	    
     	    title : {
     	        text: '模拟迁徙',
     	        subtext: '数据纯属虚构',
     	        left: 'center',
     	        textStyle : {
     	            color: '#fff'
     	        }
     	    },
     	    tooltip : {
     	        trigger: 'item',
     	        formatter:function (params) {
     	        	//console.info(params);
     	            return mes[params['name']]
     	        }
     	    },
     	    legend: {
     	        orient: 'horizon',
     	        top: 'top',
     	        left: 'right',
     	        data:['北京 Top10'],
     	        textStyle: {
     	            color: '#fff'
     	        },
     	        selectedMode: 'single'
     	    },
     	    geo: {
     	        map: 'world',
     	        label: {
     	            emphasis: {
     	                show: false
     	            }
     	        },
     	        
     	        roam: true,
     	        itemStyle: {
     	            normal: {
     	                areaColor: '#323c48',
     	                borderColor: '#404a59'
     	            },
     	            emphasis: {
     	                areaColor: '#2a333d'
     	            }
     	        }
     	    },
     	    series: series
     	};

     // 使用刚指定的配置项和数据显示图表。
     myChart.setOption(option);
};
var birdMap=function(){
	// 基于准备好的dom，初始化echarts实例
	var h=window.screen.height;
	var w=window.screen.width;
	$('#bird').css("width",w);
	$('#bird').css("height",h);
	var myChart = echarts.init(document.getElementById('bird'));
	option = {
		    title: {
		        text: '2011-2015年福田红树林黑脸琵鹭变化状况',
		    },
		    tooltip: {
		        trigger: 'axis'
		    },
		    toolbox: {
		        feature: {
		            dataView: {show: true, readOnly: false},
		            magicType: {show: true, type: ['line', 'bar']},
		            restore: {show: true},
		            saveAsImage: {show: true}
		        }
		    },
		    legend: {
		        data:['蒸发量','降水量','平均温度']
		    },
		    xAxis: [
		        {
		            type: 'category',
		            data: ['2001年','2002年','2003年','2004年','2005年','2006年','2007年','2008年','2009年','2010年','2011年','2012年','2013年','2014年','2015年']
		        }
		    ],
		    yAxis: [
		        {
		            type: 'value',
		            name: '数量',
		            min: 0,
		            max: 70,
		            interval: 10,
		            axisLabel: {
		                formatter: '{value} 只 '
		            }
		        },
		    ],
		    series: [
		        {
		          
		            name:'黑脸琵鹭数量',
		            type:'bar',
		            data:[42, 3,24, 5, 39, 50, 36, 38, 62, 33, 25, 36, 29,30,48]
		        },
		       
		    ]
		};
    myChart.setOption(option);
};
var zhexianMap=function(){
	var h=window.screen.height;
	var w=window.screen.width;
	$('#zhexian').css("width",w);
	$('#zhexian').css("height",h);
	var myChart = echarts.init(document.getElementById('zhexian'));
	option = {
		    title: {
		        text: '已知越冬黑脸琵鹭数量'
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['深圳','香港','日本','台湾','全球']
		    },
		    toolbox: {
		        feature: {
		            saveAsImage: {}
		        }
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis : [
		        {
		            type : 'category',
		            boundaryGap : false,
		            data : ['2001','2005','2010','2011','2012','2013','2014','2015']
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    series : [
		        {
		            name:'深圳',
		            type:'line',
		            stack: '总量',
		            areaStyle: {normal: {}},
		            data:[42,39,33,25,36,29,30,48

		]
		        },
		        {
		            name:'香港',
		            type:'line',
		            stack: '总量',
		            areaStyle: {normal: {}},
		            data:[135,272,429,386,357,322,222,363
		]
		        },
		        {
		            name:'日本',
		            type:'line',
		            stack: '总量',
		            areaStyle: {normal: {}},
		            data:[87,103,258,270,284,277,350,371
		]
		        },
		        {
		            name:'台湾',
		            type:'line',
		            stack: '总量',
		            areaStyle: {normal: {}},
		            data:[427,757,1280,834,1562,1624,1659,2034
		]
		        },
		        {
		            name:'全球',
		            type:'line',
		            stack: '总量',
		            label: {
		                normal: {
		                    show: true,
		                    position: 'top'
		                }
		            },
		            areaStyle: {normal: {}},
		            data:[828,1475,2347,1839,2693,2725,2726,3272]
		        }
		    ]
		};
	  myChart.setOption(option);
};
var binMap=function(){
	var h=window.screen.height;
	var w=window.screen.width;
	$('#bin').css("width",w);
	$('#bin').css("height",h);
	var myChart = echarts.init(document.getElementById('bin'));
	option = {
		    title : {
		        text: '2015年已知越冬黑脸琵鹭数量',
		        subtext: '香港观鸟协会',
		        x:'center'
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        orient: 'vertical',
		        left: 'left',
		        data: ['深圳','香港','台湾','日本','中国大陆其他地区','全球其他地区']
		    },
		    series : [
		        {
		            name: '访问来源',
		            type: 'pie',
		            radius : '55%',
		            center: ['50%', '60%'],
		            data:[
		                {value:48, name:'深圳'},
		                {value:363, name:'香港'},
		                {value:2034, name:'台湾'},
		                {value:371, name:'日本'},
		                {value:330, name:'中国大陆其他地区'},
		                {value:126, name:'全球其他地区'}
		            ],
		            itemStyle: {
		                emphasis: {
		                    shadowBlur: 10,
		                    shadowOffsetX: 0,
		                    shadowColor: 'rgba(0, 0, 0, 0.5)'
		                }
		            }
		        }
		    ]
		};
	  myChart.setOption(option);
};
