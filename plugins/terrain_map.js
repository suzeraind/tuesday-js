var wmap={"startmove_x":null,"startmove_y":null,"scroll_x":null,"scroll_y":null,"scale":1,};
function terrain_map(){
    clearTimeout(dialog_timeout);
    arr_dialog=story_json[tue_story][scene].terrain_map
    tue_text_view.innerHTML='';
    tuesday.style.backgroundImage='none'
    var view=document.createElement("div");
    view.id='tue_world';
    view.style='height:100%;width:100%;overflow:auto;';
    var map=document.createElement("div");
    if(arr_dialog.scale){wmap.scale=arr_dialog.scale}
    map.id="tue_map";
    map.className=arr_dialog.className;
    map.style=arr_dialog.style;
    map.style.width=arr_dialog.size[0]+"px";
    map.style.height=arr_dialog.size[1]+"px";
    map.style.backgroundRepeat="no-repeat";
    map.style.backgroundPosition="center";
    map.style.backgroundSize="cover";
    if(arr_dialog.color){view.style.backgroundColor=art_data(arr_dialog.color);}
    map.style.backgroundImage='url("'+art_data(arr_dialog.art)+'")';
    map.style.position="relative";
    map.style.overflow="hidden";
    map.style.transformOrigin="left top";
    for(var i=0;i<arr_dialog.objects.length;i++){
        var item=document.createElement("div");
        item.className=arr_dialog.objects[i].className;
        item.style=arr_dialog.objects[i].style;
        item.style.width=arr_dialog.objects[i].size[0]+"px";
        item.style.height=arr_dialog.objects[i].size[1]+"px";
        item.style.backgroundRepeat="no-repeat";
        item.style.backgroundPosition="center";
        item.style.backgroundSize=arr_dialog.objects[i].fit;
        item.style.backgroundImage='url("'+art_data(arr_dialog.objects[i].art)+'")';
        item.style.position="absolute";
        item.style.transform='rotate('+arr_dialog.objects[i].angle+'deg)';
        item.style.top=arr_dialog.objects[i].position[1]+"px";
        item.style.left=arr_dialog.objects[i].position[0]+"px";
        var v='';
        if (arr_dialog.objects[i].sound){v+="sound_play('"+arr_dialog.objects[i].sound+"');"}
        else if (arr_dialog.sound){v+="sound_play('"+arr_dialog.sound+"');"}
        if (arr_dialog.objects[i].js){v+=arr_dialog.objects[i].js+";"}
        if (arr_dialog.objects[i].go_to){v+="tue_world.remove();"+((arr_dialog.objects[i].go_to=="tue_go")?"scene++;dialog=0;creation_scene();":"go_to('"+arr_dialog.objects[i].go_to+"');")}
        item.setAttribute("onclick",v);
        map.appendChild(item);
    }
    view.onmousedown=function(e) {
        wmap.startmove_x=e.clientX;
        wmap.startmove_y=e.clientY;
        wmap.scroll_x=view.scrollTop;
        wmap.scroll_y=view.scrollLeft;
        document.onmousemove=function(e) {
            view.scrollTop=wmap.scroll_x-(e.clientY-wmap.startmove_y);
            view.scrollLeft=wmap.scroll_y-(e.clientX-wmap.startmove_x);
        };
        document.onmouseup=function(e){
            document.onmousemove=null;
            document.onmouseup=null;
            if(arr_dialog.scroll){arr_dialog.scroll[1]=view.scrollTop;arr_dialog.scroll[0]=view.scrollLeft;}
        };
        document.onmouseleave=function(){
			document.onmousemove=null;
			document.onmouseup=null;
            arr_dialog.scroll[1]=view.scrollTop;
            arr_dialog.scroll[0]=view.scrollLeft;
		};
    }
    if(arr_dialog.background_music){
        if(tue_bg_music.canPlayType("audio/mpeg")){
            if(arr_dialog.background_music.includes("blob:")){
                tue_bg_music.src=arr_dialog.background_music;
            }else if(arr_dialog.background_music.includes(".mp3")){
                tue_bg_music.src=arr_dialog.background_music;
            }else{tue_bg_music.src=arr_dialog.background_music+".mp3";}
        }else{tue_bg_music.src=arr_dialog.background_music+".ogg";}
        tue_bg_music.loop=true;
        tue_bg_music.play();
    }
    tue_next.style.visibility='hidden';
    tue_back.style.visibility='hidden';
    view.appendChild(map);
    tuesday.appendChild(view);
    worldmap_resize();
    if(arr_dialog.scroll){view.scrollTop=arr_dialog.scroll[1];view.scrollLeft=arr_dialog.scroll[0];}
}
function worldmap_resize(){
    var rect=tuesday.getBoundingClientRect();
    if((arr_dialog.size[0]/arr_dialog.size[1])>(rect.width/rect.height)){tue_map.style.transform='scale('+(rect.height/arr_dialog.size[1])*wmap.scale+')'}
    else{tue_map.style.transform='scale('+(rect.width/arr_dialog.size[0])*wmap.scale+')'}
    tue_map.style.marginBottom="-"+(rect.height+arr_dialog.size[1])+"px";
    tue_map.style.marginRight="-"+(rect.width+arr_dialog.size[0])+"px"
    tue_map.style.marginTop="0px";
    tue_map.style.marginLeft="0px"
}
tuesday.addEventListener('terrain_map',function(event){terrain_map();});
window.addEventListener('resize',worldmap_resize,true);
