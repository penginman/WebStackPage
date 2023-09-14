const footer = '<footer class="main-footer sticky footer-type-1"> \
<div class="footer-inner">\
    <!-- Add your copyright text here -->\
    <div class="footer-text">\
        &copy; 2017-2022\
        <a href="../cn/about.html"><strong>WebStack</strong></a> design by <a href="https://www.viggoz.com" target="_blank"><strong>Viggo</strong></a>\
        <!--  - Purchase for only <strong>23$</strong> -->\
    </div>\
    <!-- Go to Top Link, just add rel="go-top" to any link to add this functionality -->\
    <div class="go-up">\
        <a href="#" rel="go-top">\
            <i class="fa-solid fa-angles-up"></i>\
        </a>\
    </div>\
</div>\
</footer>';


$(document).ready(function(){
  var main_content = $(".main-content");

  //添加目录和内容
  build_data(itemlist);

  //添加footer
  main_content.append(footer);
  
});

function build_data(itemlist){
    itemlist.forEach(element => {
    //     console.log("所有元素↓");
    //    console.log(element);
       if(element.hasOwnProperty('web')){
        add_web_menu(element.name,element.icon);
        add_main_content_html(element);
       }
       else if(element.hasOwnProperty('children')){
        add_children_menu(element.name,element.icon,element.children);
       }
       
    });
}

//没有childr的菜单
function add_web_menu(menu_name,icon){
    var html = `<li>\
    <a href="#${menu_name}" class="smooth">\
        <i class="${icon}"></i>\
        <span class="title">${menu_name}</span>\
    </a>\
</li>`
    const main_menu=$("#main-menu");
    main_menu.append(html);
}


//有children的菜单
function add_children_menu(parent_name,parent_icon,children){
    var html = document.createElement("li");
    //添加父菜单
    var parent = `<a>
    <i class="${parent_icon}"></i>
    <span class="title">${parent_name}</span>
</a>`;
    html.appendChild(parseElement(parent));

    //处理children
    var ul = document.createElement("ul");
    children.forEach(element => {
        // console.log("看看children↓");
        // console.log(element);
        var children = `<li>
        <a href="#${element.name}" class="smooth">
            <span class="title">${element.name}</span>
        </a>
    </li>`
        ul.appendChild(parseElement(children));
        add_main_content_html(element);
    });
    
    //添加到主菜单
    html.appendChild(ul);
    $("#main-menu").append(html);
    // console.log(html);
}

function parseElement(htmlString) {
	return new DOMParser().parseFromString(htmlString,'text/html').body.childNodes[0];
}


function add_main_content_html(item){
    var main_content = $(".main-content");

    //标题
    var h4_title=`<h2 class="text-gray"><i class="linecons-tag" style="margin-right: 7px;" id="${item.name}"></i>${item.name}</h2>`;
    main_content.append(h4_title);


    //创建row行和内部元素
    var row = document.createElement("div");
    row.className ="row";
    item.web.forEach(element => {
        // console.log(element);
        var nav_itme = `<div class="col-sm-3">
        <div class="xe-widget xe-conversations box2 label-info" onclick="window.open('${element.url}', '_blank')" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="${element.url}">
            <div class="xe-comment-entry">
                <a class="xe-user-img">
                    <img data-src="${element.logo}" class="lozad img-circle" width="40">
                </a>
                <div class="xe-comment">
                    <a href="#" class="xe-user-name overflowClip_1">
                        <strong>${element.title}</strong>
                    </a>
                    <p class="overflowClip_2">${element.desc}</p>
                </div>
            </div>
        </div>
    </div>`
        
        row.appendChild(parseElement(nav_itme));
        
    });
    main_content.append(row);
    main_content.append(document.createElement("br"))


}