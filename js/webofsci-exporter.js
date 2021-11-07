// ==UserScript==
// @name         SCI WEB DOWNLOAD
// @namespace    Sunic.Science
// @version      0.2
// @description  More Sports!
// @author       SunicYosen @ github.com/sunicyosen
// @match        https://www.google.com/search?q=Tampermonkey&oq=Tampermonkey&aqs=chrome..69i57j69i60l4.685j0j7&sourceid=chrome&ie=UTF-8
// @icon         https://www.google.com/s2/favicons?domain=www.webofscience.com
// @include      https://www.webofscience.com/*
// @grant       GM_xmlhttpRequest
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_deleteValue
// @grant       unsafeWindow
// ==/UserScript==

(function() {
    'use strict';
    var begin_num=1;
    var step=1000;
    var end_num=begin_num+step;
    var all_num=30332;

    function downloading(){
        var pop_window = document.getElementsByClassName("window")[0];
        var record_begin=pop_window.getElementsByTagName("input")[2];
        record_begin.value=begin_num;
        var record_end=pop_window.getElementsByTagName("input")[3];
        record_end.value=end_num;
        var export_btn=pop_window.getElementsByTagName("button")[3];
        export_btn.click();

        if(end_num < all_num){
            begin_num = end_num+1;
            if(end_num + step <= all_num){
                end_num = end_num + step;
            }
            else{
                end_num = all_num;
            }
            setTimeout(export_excels, 8000);
        }
        else {
            setTimeout('alert("已完成！")', 1000);
        }
    }

    function window_click(){
        var record_checkbox=document.getElementById("radio3-input");
        record_checkbox.click();
        setTimeout(downloading, 500);
    }

    function export_excels(){
        var daochu_button=document.getElementsByTagName("app-export-menu");
        var daochu_bt=daochu_button[0].getElementsByTagName("button");
        daochu_bt[0].click();
        var daochu_list=document.getElementsByClassName("mat-menu-content");
        var excel_button=document.getElementById("exportToExcelButton");
        excel_button.click();

        setTimeout(window_click, 500);
    }

    var sunic_ext_elements = '<div id="sunic_ext" style="z-index: 9999; position: fixed ! important; right:0px; top: 1%; width:50%;"> <div style="float: left; margin-left:5px;"><input id="sunic_enable" type="checkbox" style="margin-left:5px;"/></div> <div style="text-align:center; float: left;"> Export</div></div>';
    if(window.location.origin == "https://www.webofscience.com"){
        let div=document.createElement("div");
        div.innerHTML=sunic_ext_elements
        document.body.append(div);
    }

    function is_exporting_page(){
        return (document.getElementsByTagName("app-export-menu").length != 0);
    }

    document.getElementById("sunic_enable").onclick = function(){
        if(is_exporting_page()){
            setTimeout(export_excels, 1000);
            // setTimeout('alert("开启")', time_out_ms);
        } else{
            alert("请在导出页面开启");
            document.getElementById("sunic_enable").checked = false;
        }
    }

    // Your code here...
})();
