// sheng tai yi min 2014/08/06 by jigl

$(function(){
		var fixRatio = 16/9,
			windowScrolled=0,
			viewHeight = $(window).height(),							
			// setting the video-container box height;
			fixHeight = $(window).width() / fixRatio,		
			// setting the video-container box margin-top value and centerallize it
			fixTop = Math.round((viewHeight-fixHeight)/2),		
    	    fadeTop = Math.max(200, fixTop),
			fadeBottom = Math.min(viewHeight - 200, fixTop + fixHeight),
			sequences = $('.video-sequence'), // get all video sequence divs;
		    videos = $('.video'),		//get all divs have video class 
		    videoContainers = $('.video-container'),	//get all divs have video-container class
			videoIndexPlayed= false;
			path = 'assets/',
			mobilePath = 'assets/mobile/'
			navHeights=[];
		
		   //check element  is partial in view or not;
		   function checkInView(element){			  			
			   var docViewTop = window.pageYOffset,
			   		  docViewBottom = docViewTop+viewHeight,		 //set doc viewport  vertical position
					  
					  elemTop = element.offset().top,
					  elemBottom = elemTop +element.height();			// set element vertial position
					  return ((elemBottom>=docViewTop)&&(elemTop<=docViewBottom));
					  //just only element is partially in view ,will return true;
			   }		 
		   
		   /*initial setting video class divs's child element display and opacity style*/
		   function initVideos(){
			   if(!isMobile()){
				   //for pc web;
				  var firstVideoSource =  $('video').eq(0)[0]; 	//get the first video source in the doc;
				 
				  //settingvideo-container inline style ----height, margin-top, position,z-index
					videoContainers.css({'height':fixHeight+'px','z-index':2});	
					sequences.eq(0).css('margin-top',fixTop);
				  
				  if($('audio')[0])$('audio')[0].play();
				  
				   sequences.each(function(index, element) {
						var thisVideos =  $(this).children('.video');
						var videoLength = thisVideos.length; 	//get this sequence's video children;
						thisVideos.each(function(index, element) {
								if(index==0 ||index== videoLength-1){ //set the first and the last video' children divs's style;
										$(this).children('.video-container').css({'position':'absolute','opacity':1,'top':0});
										$(this).children('.video-caption').css({'opacity':1});
									}
								else{
										$(this).children('.video-container').css({'position':'fixed','opacity':0});
										$(this).children('.video-caption').css({'opacity':0});
									}
						});	
						
					});
				   }
			   else{
				   //for mobile web;
				   $('img').each(function(index, element) {
						var srcPath = $(this).attr('src');
						$(this).attr('src',srcPath.replace(path,mobilePath));
               		 });
					$('source').each(function(index, element) {
                       var srcPath = $(this).attr('src');
						$(this).attr('src',srcPath.replace(path,mobilePath)); 
                    });
				   }
			   }
				
		  /*sequence in scroll, loop and caculate all the videos in this sequence*/
		  function sequenceInScroll(sequence,pageScrolled){
			  	if(isMobile()) return false;
				
			 	 var bgAudio= sequence.find('audio')[0];	
		  		 var thisVideos = sequence.children('.video'),
			  		 videosLength = thisVideos.length;
					 thisSequenceBottom = sequence.offset().top+sequence.height(),
					 viewBottom = pageScrolled+viewHeight,
					 opaicty=0;
				 
					//start check and set each video box
					 thisVideos.each(function(index, element) {
						 
						 if((pageScrolled+fixTop)>sequence.offset().top){
								$(this).children('.video-container').css({'position':'fixed','top':fixTop,'display':'block'});}
						 else{ 
								thisVideos.eq(0).children('.video-container').css({'position':'absolute','opacity':1,'top':0,'display':'block'});
							}
						
						if(!checkInView($(this))||($(this).offset().top+$(this).height()<pageScrolled+fadeTop)){
								$(this).children('div').css({'opacity':0}); // if this video is not in view, set it to transparent;
								$(this).children('.video-container').css('display','none');
								if($(this).find('video')[0]){ 
									$(this).find('video')[0].pause();
									$(this).find('video')[0].currentTime=0;
									}
								}
							
						else if(checkInView($(this))){
									
							if($(this).data('video')=='movie'&&bgAudio){
								 bgAudio.muted=true;
								 }
							else if(bgAudio) {
								bgAudio.muted=false;bgAudio.play();
								};
							 //start caculate the opacity of the sibling video containers;
							var nextVideoWillView = (pageScrolled+viewHeight)>($(this).offset().top+$(this).height());
							
							if(nextVideoWillView){
								opacity = ($(this).offset().top+$(this).height()-pageScrolled-fadeTop)/(Math.round(viewHeight/2-fadeTop))*1.3;
								opacity =opacity<0?0:opacity>1?1:opacity;
								
								$(this).children('div').css({'opacity':opacity});
								if($(this).find('video')[0]){
									$(this).find('video')[0].volume = opacity;
									}
								if($(this).find('audio')[0]){
									//console.log( $(this).children('.video-container').css('opacity'));
									//$(this).find('audio')[0].volume = $(this).children('.video-container').css('opacity');
									$(this).find('audio')[0].volume = opacity/2<.1?0:opacity;
		}
								$(this).next('.video').children('div').css({'opacity':1-opacity});
								if($(this).next('.video').find('video')[0]){
									$(this).next('.video').find('video')[0].volume =(1- opacity);
									}
								}
							
							//start playing the video source in view
							if($(this).find('video')[0]){
								var videoSource = $(this).find('video')[0];
									if((videoSource.currentTime<videoSource.duration)&&($(this).children('.video-container').css('opacity')>0.5)){
										$(this).find('video')[0].play();
										}
								}											
							}									
						});
					//end checking and setting each video box
					
					//if this sequence is scroll to the end, means end of the video
				if(((pageScrolled+fixTop+fixHeight)>thisSequenceBottom)){
					thisVideos.eq(videosLength-2).children('.video-container').css('opacity',0);
					thisVideos.eq(videosLength-1).children('.video-container').css({'position':'absolute','opacity':1,'top':0,'display':'block'});
					}				
				// calculate the background color when the sequence scrolled over pass the 2/3 of window;
				 var theSequenceWillShow = (pageScrolled+Math.round(viewHeight/3))>(sequence.offset().top);
				 var backColor='';
				 var backColorPercentage = 0;
				 if(theSequenceWillShow){
					 backColorPercentage = (sequence.offset().top-pageScrolled-fadeTop)/(Math.round(viewHeight/3)-fadeTop);
					 backColorPercentage = backColorPercentage<0?0:backColorPercentage;
					 backColorPercentage = Math.round(backColorPercentage*100)/100;
					 backColor = Math.round(255*backColorPercentage);
					$('body').css('background-color','rgb('+backColor+','+backColor+','+backColor+')');
					 }
				 var theSequenceWillHide = (pageScrolled+fadeBottom)>(sequence.offset().top+sequence.height());
				 if(theSequenceWillHide){
					 backColorPercentage = (pageScrolled+fadeBottom-sequence.offset().top-sequence.height())/fadeTop;
					 backColorPercentage = backColorPercentage>1?1:backColorPercentage;
					 backColorPercentage = Math.round(backColorPercentage*100)/100;
					backColor = Math.round(255*backColorPercentage);
					$('body').css('background-color','rgb('+backColor+','+backColor+','+backColor+')');
					 }
				 if((pageScrolled+Math.round(viewHeight/3))<(sequence.offset().top)){
					 $('body').css('background-color','white');
					 }
			  }
		  
		  function cacuAnchor(windowScrolled){
			  for(var i=0;i<navHeights.length-1;i++){
				  if(windowScrolled>=navHeights[i]&&windowScrolled<navHeights[i+1])
				  	{return i;
					break;}
				  }
				  
			  }
		  
		  /*when window scrolling*/
		   function windowScrolling(){
			   if(isMobile()) return false;
			   
			  	var sequenceInView = false,
					sequenceIndex = 0;
					windowScrolled = window.pageYOffset;
				   	if(windowScrolled<=0){//check the doc is scrolled on top or not;		
					   	$(window).scrollTop(1);
						sequenceInView = true;
						$('body').css('background-color','#000');
						initVideos();
					   }
				   	else{
					   sequences.each(function(index, element) {					  
						if(checkInView($(this))){
							sequenceInView=true; //just one sequence in view ,set the sequenceInView to true, and get the index, and break out the loop;
							sequenceIndex = index;
							return false;
							 }			
						  });
				   }
				   
				if(sequenceInView){
					$('.column audio').each(function(index, element) {
						element.pause();
					}); 
					 sequenceInScroll(sequences.eq(sequenceIndex),windowScrolled);
					 }
				else{initVideos();
					$('.video-sequence audio').each(function(index, element) {
						element.pause();
					});
					$('body').css('background-color','white');
					$('.galleryBtn').css('opacity',1);
					videoContainers.each(function(index, element) {
						if($(this).find('video')[0]){
							$(this).find('video')[0].pause();
							$(this).find('video')[0].currentTime=0;
							}
					});
					}
					
				// caculate the nav span
				//$('.nav-list li').removeClass('on');
				//$('.nav-list li').eq(cacuAnchor(windowScrolled)).addClass('on');		   
			   }
		
		/* resizeWindow*/
		function resizedWindow(){
				if(isMobile()) return false;
				viewHeight = $(window).height(),
				fixHeight = $(window).width() / fixRatio,			// setting the video-container box height;
				fixTop = Math.round((viewHeight-fixHeight)/2),		// setting the video-container box margin-top value and centerallize it
				fadeTop = Math.max(200, fixTop);
				fadeBottom = Math.min(viewHeight - 200, fixTop + fixHeight), 
				videos.css('height',$(window).height()+'px');
				
				videoContainers.css({'height':fixHeight+'px'});				//settingvideo-container inline style ----height, margin-top, position,z-index
				 sequences.eq(0).css('margin-top',fixTop);
				 windowScrolling();
			 	$('.section a[data-name]').each(function(index, element) {
                	navHeights[index]=$(this).offset().top+parseInt($('.section a[data-name]').css('margin-top'));
            	});
				navHeights[0]=0;
				navHeights[navHeights.length]=$(document).height();
			}
			
		function muted(){
		$(this).toggleClass('nav-mute');
		var mute= $(this).hasClass('nav-mute');
		if(mute){
			$('video,audio').attr('volume',function(){return $(this).prop('volume')});
			$('video,audio').prop('volume',0);
			}
		else
			$('video,audio').prop('volume',function(){return $(this).attr('volume');});		
		};
	/*
	//get the anchor num
	var sectionAnchors =$('.section a[data-name]'); 
	sectionAnchors.addClass('marker');
	sectionAnchors.each(function(index, element) {
        var li = document.createElement('li');
		var a = document.createElement('a');
		a.appendChild(document.createTextNode($(this).data('name')));
		li.appendChild(a);
		$('.nav-list').append(li);
		navHeights.push($(this).offset().top+parseInt($('.section a[data-name]').css('margin-top')));
    });
	$('.nav-list li').eq(0).addClass('on');
	navHeights[0]=0;
	navHeights[navHeights.length]=$(document).height();
	//set slider
	// when click the nav num and then scroll to the position;
	$('.nav-list li').click(function(){
		var index = $(this).index();
				offTop = $('.section a[data-name]').eq(index).offset().top-$('.nav').height();
				$('body,html').animate({scrollTop:offTop},1500);
				windowScrolling();
		});
		*/
		
	
	//when galleryBtn clicked show the corresponding gallery;
	$('.galleryImg,.galleryPly').click(function(){
		var galleryId = $(this).parent().data('gallery');
		var toTop = (innerHeight-$(this).height())/2;
		var fromTOp = (innerHeight-$(this).height())/2 -50;
		var container
		$('#'+galleryId).css('display','block')
						.css('left',function(){return (innerWidth-$(this).width())/2+'px';})
						.css('top',function(){return (innerHeight-$(this).height())/2+'px';})
						//.animate({'opacity':1},1000);
		$('body').css('background-color','#3e3e3e');
		});
	
	var closeSlider ="<div class='closeBtn'></div>";
	//flexslide begin;
	$('.flexslider').flexslider({
		slideshow:false
		}).append(closeSlider);
	$('.closeBtn').click(function(){
		$(this).parent().css('display','none');
		//$(this).parent().animate({'opacity':0},1000,function(){$(this).css('display','none')})
		$('body').css('background-color','#fff');
		});
	initVideos();
	$(window).scroll(windowScrolling); //when window scrolling, run the windowScrolling function;
	
	$(window).resize(resizedWindow);
	
	$(window).load(function(e) {
       	//when load the doc, init the all video elements in the doc;
    });
	
	$('.nav-volume').click(muted);
	
	//slide toggle the menu
	$('.nav-btn').click(function(){
		$('.nav-menu').slideToggle('slow');
		});
	$('.nav-list li').click(function(){
		if (!isMobile())  return false;

			$('.nav-menu').slideUp('fast');
		
		});
})

//jqplayer  config
$(function(){
	
	var myCirclePlayer = new CirclePlayer("#jquery_jplayer_1",
	{
		mp3: "assets/noodle.mp3"
	}, {
		cssSelectorAncestor: "#cp_container_1",
		//swfPath: "js",
		wmode: "window",
		keyEnabled: false,
		supplied:'mp3',
		preload:'auto'
	});
	
	var myCirclePlayer = new CirclePlayer("#jquery_jplayer_2",
	{
		mp3: "assets/dagong.mp3"
	}, {
		cssSelectorAncestor: "#cp_container_2",
		//swfPath: "js",
		wmode: "window",
		keyEnabled: false,
		supplied:'mp3',
		preload:'auto'
	});
	
	var myCirclePlayer = new CirclePlayer("#jquery_jplayer_3",
	{
		mp3: "assets/yuanqu.mp3"
	}, {
		cssSelectorAncestor: "#cp_container_3",
		//swfPath: "js",
		wmode: "window",
		keyEnabled: false,
		supplied:'mp3',
		preload:'auto'
	});
});