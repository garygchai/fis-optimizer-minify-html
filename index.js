/*
 * fis-optimizer-minify-html
 * v1.0.0
 * garygao
 * http://fanxing.com/
 */

'use strict';

var UglifyJS = require('uglify-js');
var CleanCss = require('clean-css');
//匹配 <style></style>
var styleReg = /(<style(?:(?=\s)[\s\S]*?["'\s\w\/\-]>|>))([\s\S]*?)(<\/style\s*>|$)/ig;
//匹配 <script></script>
var scriptReg = /(<script(?:(?=\s)[\s\S]*?["'\s\w\/\-]>|>))([\s\S]*?)(<\/script\s*>|$)/ig;

module.exports = function(content, file, conf){console.log(conf)
	//修改配置
    conf.fromString = true;
    conf.processImport = false;

    //压缩内联css
    content = content.replace(styleReg, function(m, start_tag, cont, end_tag){
    	var parseCont = "";
    	try {
    		parseCont = CleanCss.process(cont, conf);

    	} catch(e) {
    		parseCont = cont;
    	}
        return start_tag + parseCont + end_tag;
    });

	//压缩内联js
    content = content.replace(scriptReg, function(m, start_tag, cont, end_tag){
    	var parseCont = "";
    	try {
    		parseCont = UglifyJS.minify(cont, conf).code;
    	} catch(e) {
    		parseCont = cont;
    	}
        return start_tag + parseCont + end_tag;
    });

    file.setContent(content);

    return content;
};