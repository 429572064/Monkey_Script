// ==UserScript==
// @name         PddSkuPaser
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://mobile.yangkeduo.com/*
// @grant        none
// @require  http://libs.baidu.com/jquery/2.1.4/jquery.min.js
// ==/UserScript==

(function() {
    $('#main').append('<button id="venn_view" style="color:#FFFFFF;background-color:#3385ff;position:fixed; top:0;width:150px;height:50px">查看SKU信息</button>')
    $('#main').append('<button id="venn_script" style="color:#FFFFFF;background-color:#3385ff;position:fixed; top:60px;width:150px;height:50px;display:none">获取SKU信息</button>')
    let skus = '';
    for (i = 0; i < window.rawData.store.initDataObj.goods.skus.length; i++) {
        skus += window.rawData.store.initDataObj.goods.skus[i].skuID+'：'+window.rawData.store.initDataObj.goods.skus[i].specs[0].spec_value+'\n'
    }
    $('#venn_view').click(function(){
        $('#venn_script').css("display","block");
        alert(skus)
    })
    $("#main").on("click","#venn_script", function() {
        $(this).attr("disabled","disabled");
        if (window.rawData.store.initDataObj.goods.skus){
            document.write("<form action='http://data.venndata.cn/sku/parse_ecsku/' method=post name=form1 style='display:none'>");
            document.write("<input type=hidden name='skuList' value='"+JSON.stringify({'media':'21','itemId':window.rawData.store.initDataObj.goods.goodsID,'skus':window.rawData.store.initDataObj.goods.skus})+"'/>");
            document.write("</form>");
            document.form1.submit();}
        else{
            alert('无效页面')
        }
    });
})();
