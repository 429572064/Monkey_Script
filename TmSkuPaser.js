// ==UserScript==
// @name         TmSkuPaser
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://*.detail.tmall.*/*
// @match        https://chaoshi.detail.tmall.com/*
// @match        https://detail.tmall.hk/*
// @match        https://detail.tmall.com/*
// @grant        none
// @require  http://libs.baidu.com/jquery/2.1.4/jquery.min.js
// ==/UserScript==

(function() {
    let txt = $('#detail script')[4].text;
    let reg=/"skuList":.*?]/
    let skuList = '{'+reg.exec(txt)[0]+'}'
    skuList = JSON.parse(skuList)
    $('#header').append('<button id="venn_view" style="color:#FFFFFF;background-color:#3385ff;position:fixed; top:30px;width:150px;height:50px;z-index:10000;">查看SKU信息</button>')
    $('#header').append('<button id="venn_script" style="color:#FFFFFF;background-color:#3385ff;position:fixed; top:90px;width:150px;height:50px;display:none;z-index:10000;">获取SKU信息</button>')
    let skus = ''
    let skuinfo = []
    for (i = 0; i < skuList.skuList.length; i++) {
        skus += skuList.skuList[i].skuId+'：'+skuList.skuList[i].names+'_'+$('[data-value="'+skuList.skuList[i].pvs+'"]').attr('title')+'\n';
        skuinfo.push({"skuId":skuList.skuList[i].skuId,"names":skuList.skuList[i].names+'_'+$('[data-value="'+skuList.skuList[i].pvs+'"]').attr('title')})
    }
    $('#venn_view').click(function(){
        $('#venn_script').css("display","block");
        alert(skus)
        console.log(skus)
        console.log(skuinfo)
    })

    let res = {"media":"13","itemId":window.g_config.itemId,'skus':skuinfo}


    $("#header").on("click","#venn_script", function() {
        $(this).attr("disabled","disabled");
        if (skuList.skuList){
            document.write("<form accept-charset='utf-8' action='http://data.venndata.cn/sku/parse_ecsku/' method=post name=form1 style='display:none'>");
            document.write("<input type=hidden name='skuList' value='"+JSON.stringify(res)+"'/>");
            document.write("</form>");
            document.form1.submit();
        }else{
            alert('无效页面')
        }
    });
})();
