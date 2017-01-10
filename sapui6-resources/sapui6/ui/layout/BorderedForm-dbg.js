jQuery.sap.declare("sapui6.ui.layout.BorderedForm");
jQuery.sap.require("sap.ui.core.Control");

sap.ui.core.Control.extend("sapui6.ui.layout.BorderedForm", { 
    metadata : {     
    	library : "sapui6.ui.layout",                        
        properties : {
        	"visible" : {type : "boolean", group : "Behavior", defaultValue : true},
			"width" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : null},
			"minusWidth" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : "0px"},
			"height" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : null},
			"margin" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : null},
			"marginLeft" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : null},
			"marginRight" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : null},
			"marginTop" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : null},
			"marginBottom" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : null},
			"backgroundColor" : {type : "string" , group : "Appearance", defaultValue : null},
			"columns" : {type : "int", group : "Appearance", defaultValue : 1},
			"widths" : {type : "sap.ui.core.CSSSize[]", group : "Appearance", defaultValue : null},
			// "border" : {type : "boolean", group : "Appearance", defaultValue : true},
			"borderColor" : {type : "string" , group : "Appearance", defaultValue : null},
			"strongColor" : {type : "string" , group : "Appearance", defaultValue : null},
			"labelBackgroundColor" : {type : "string" , group : "Appearance", defaultValue : null},
			"labelBold" : {type : "boolean", group : "Appearance", defaultValue : false},
			"labelAlign" : {type : "string", group : "Appearance", defaultValue : null},
			"fontSize" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : null},
			"rowsBorder" : {type : "boolean", group : "Appearance", defaultValue : true},
			"colsBorder" : {type : "boolean", group : "Appearance", defaultValue : true},
			"textColor" : {type : "string" , group : "Appearance", defaultValue : null},
			"title" : {type : "string", defaultValue : null},
			"titleColor" : {type : "string" , group : "Appearance", defaultValue : null},
			"titleFontSize" : {type : "string", group : "Dimension", defaultValue : null},
			// "buttonSize" : {type : "string", group : "Dimension", defaultValue : "default"},
			"resize" : {type:"boolean", defaultValue : true}
		},
		defaultAggregation : "button",
		aggregations : {
	    	"button" : {type : "sap.ui.commons.Button", multiple : true, singularName : "button"},
	    	"toolbar" : {type : "sap.ui.commons.Toolbar", multiple : false},
	    	"item" : {type : "sap.ui.core.Control", multiple : true, singularName : "item"}
		}
    },

    settings : null,

    onBeforeRendering : function(){
    	jQuery.sap.require("sap.ui.core.theming.Parameters");
		
		if(!this.getTitleColor()) this.setProperty("titleColor", sap.ui.core.theming.Parameters.get("sapTitleColor"), true);
    	if(!this.getBorderColor()) this.setProperty("borderColor", sap.ui.core.theming.Parameters.get("sapUiBaseBorder"), true);
    	if(!this.getStrongColor()) this.setProperty("strongColor", sap.ui.core.theming.Parameters.get("sapActiveColor"), true);
    	if(!this.getLabelBackgroundColor()) this.setProperty("labelBackgroundColor", sap.ui.core.theming.Parameters.get("sapUiListHeaderBackground"), true);
    	if(!this.getFontSize()) this.setProperty("fontSize", sap.ui.core.theming.Parameters.get("sapUiDesktopFontSize"), true);
    	if(!this.getTitleFontSize()) this.setProperty("titleFontSize", sap.ui.core.theming.Parameters.get("sapUiFontHeader4Size"), true);
    	if(!this.getBackgroundColor()) this.setProperty("backgroundColor", sap.ui.core.theming.Parameters.get("sapUiTableRowBG"), true);
    	if(!this.getTextColor()) this.setProperty("textColor", sap.ui.core.theming.Parameters.get("sapTextColor"), true);
    },

  	renderer : function(oRm, oControl){
  		if(!oControl.getVisible()) return;

  		if(!oControl.settings) return;

  		oRm.write("<div");
		oRm.writeControlData(oControl);
		oRm.addClass("sapui6_formLayout");
		oRm.writeClasses();
		if(oControl.getWidth()) oRm.addStyle("width", oControl.getWidth());
		if(oControl.getMargin())oRm.addStyle("margin", oControl.getMargin());
        if(oControl.getMarginLeft())oRm.addStyle("margin-left", oControl.getMarginLeft());
        if(oControl.getMarginRight())oRm.addStyle("margin-right", oControl.getMarginRight());
        if(oControl.getMarginTop())oRm.addStyle("margin-top", oControl.getMarginTop());
        if(oControl.getMarginBottom())oRm.addStyle("margin-bottom", oControl.getMarginBottom());
		oRm.writeStyles();
		oRm.write(">");
		
		if(oControl.getToolbar()){
            oRm.write("<div>");
            oRm.renderControl(oControl.getToolbar());
            oRm.write("</div>");
        }else if(oControl.getButton().length > 0 || oControl.getTitle()){
			oRm.write("<div");
			if(oControl.getButton().length == 0) {
				oRm.addStyle("margin-bottom","5px");
				oRm.writeStyles();
			}
			oRm.write(">");

			if(oControl.getButton().length > 0){
				oRm.write("<span");
				oRm.addClass("btn-right");
				oRm.writeClasses();
				oRm.write(">");
			
				oControl.getButton().forEach(function(button,index){
					oRm.write("<span style='margin-left:5px;'>");
					oRm.renderControl(button);
					oRm.write("</span>");
				});
			}
			oRm.write("</span>");
			if(oControl.getTitle()) {
				oRm.write("<span");
				oRm.addClass("title");
				oRm.writeClasses();
				oRm.addStyle("color",oControl.getTitleColor());
				oRm.addStyle("font-size",oControl.getTitleFontSize());
				if(oControl.getStrongColor()){
					oRm.addStyle("border-left-color",oControl.getStrongColor());
				}

				oRm.writeStyles();
				oRm.write(">");
				oRm.write(oControl.getTitle());
				oRm.write("</span>");
			}
			oRm.write("</div>");
		}
		
		oRm.write("<table");
		oRm.addStyle("border-top-color",oControl.getStrongColor());
		oRm.addStyle("border-left-color",oControl.getBorderColor());
		oRm.addStyle("border-right-color",oControl.getBorderColor());
		oRm.addStyle("border-bottom-color",oControl.getBorderColor());
		oRm.addStyle("font-size",oControl.getFontSize());
		oRm.addStyle("background-color",oControl.getBackgroundColor());
		oRm.addStyle("color",oControl.getTextColor());
		oRm.writeStyles();
		oRm.write(">");
		
		if(oControl.getWidths()){
			oRm.write("<colgroup>");
			var widthsLength = oControl.getWidths().length;
			if(widthsLength > oControl.getColumns()) widthsLength = oControl.getColumns();
			for(var i=0 ; i<widthsLength ; i++){
				oRm.write("<col");
				oRm.addStyle("width", oControl.getWidths()[i]);
				oRm.writeStyles();
				oRm.write("/>");
			}
			oRm.write("</colgroup>");
		}		

		oRm.write("<tbody>");
		var rowspanArr = [];
		for(var i=0 ; i<columns ; i++) rowspanArr.push(1);

		var items = oControl.getItem();
		var itemIndex = 0;
		var layoutCnt = 0;
		var columns = oControl.getColumns();
		var length = oControl.settings.length;
		for(var i=0 ; i<length ; i++){
			var item = oControl.settings[i];

			var rowspanArrIndex = layoutCnt;
			if(item["rowspan"] != undefined){
				rowspanArr[rowspanArrIndex] = item["rowspan"];
			}

			var colspan = item["colspan"];

			if(colspan == undefined) {
				layoutCnt += 2;
				colspan = 2;
			}else {
				layoutCnt += parseInt(colspan);
				colspan = parseInt(colspan);
			}

			var newline = colspan/2;

			if((layoutCnt/2)%columns == newline){
				oRm.write("<tr");

				if(item["id"] != undefined){
					oRm.writeAttribute("id", item["id"]);
				}

				if(item["display"] != undefined){
					oRm.addStyle("display", item["display"]);
				}

				if(oControl.getRowsBorder()) {
					oRm.addStyle("border-bottom","1px solid " + oControl.getBorderColor());
				}

				if(item["display"] != undefined || oControl.getRowsBorder()) oRm.writeStyles();

				oRm.write(">");
			}

			oRm.write("<td");
			oRm.addStyle("background-color", oControl.getLabelBackgroundColor());
			if(oControl.getLabelBold()) oRm.addStyle("font-weight", "bold");
			if(oControl.getLabelAlign()) oRm.addStyle("text-align", oControl.getLabelAlign());
			if(oControl.getColsBorder()) oRm.addStyle("border-right", "1px solid " + oControl.getBorderColor());
			if(oControl.getLabelBackgroundColor() || oControl.getLabelBold() || oControl.getColsBorder() || oControl.getLabelAlign()) oRm.writeStyles();
		
			oRm.addClass("label");
			oRm.writeClasses();

			if(item["rowspan"] != undefined){
				oRm.writeAttribute("rowspan", item["rowspan"]);
			}

			oRm.write(">");
			if(item["label"] != undefined) {
				var oLabel = new sap.ui.commons.Label({text:item["label"]});
				if(item["required"]) oLabel.setRequired(item["required"]);
				if(item["requiredAtBegin"]) oLabel.setRequiredAtBegin(item["requiredAtBegin"]);

				oRm.renderControl(oLabel);
			}
			oRm.write("</td>");

			oRm.write("<td");
			if(item["colspan"] != undefined){
				oRm.writeAttribute("colspan", parseInt(item["colspan"])-1);
			}else if(i == length-1) {
				oRm.writeAttribute("colspan", columns - (layoutCnt-1));
			}

			if(item["rowspan"] != undefined){
				oRm.writeAttribute("rowspan", item["rowspan"]);
			}
			if(oControl.getColsBorder()) {
				oRm.addStyle("border-right", "1px solid " + oControl.getBorderColor());
				oRm.writeStyles();
			}
			oRm.write(">");
			
			if(item["element"] != undefined){
				item["element"].forEach(function(ele,index){
					oRm.write("<span");
					if(index==0 && item["marginLeft"]) {
						oRm.addStyle("margin-left",item["marginLeft"]);
						oRm.writeStyles();
					}else if(index < item["element"].length-1) {
						oRm.addStyle("margin-right","5px");
						oRm.writeStyles();
					}
					oRm.write(">")
					// oRm.renderControl(ele);
					oRm.renderControl(items[itemIndex]);
					itemIndex++;
					oRm.write("</span>");				
				});
			}
			
			oRm.write("</td>");

			if(rowspanArr[rowspanArrIndex] > 1 && item["rowspan"] == undefined){
				layoutCnt += 2;
				rowspanArr[rowspanArrIndex] -= 1;
			}

			if((layoutCnt == columns) || (i == length-1)){
				oRm.write("</tr>");
				layoutCnt = 0;
			}
		}
		
		oRm.write("</tbody>");
		oRm.write("</table>");

		oRm.write("</div>");
    },

    onAfterRendering : function(){
    	var that = this;
    	var obj = $("#"+this.getId());
        var parentWidth = obj.parent().width();

        if(parentWidth == 0 && this.getWidth().indexOf("%") > -1){
        	var fnInterval = window.setInterval(function(){
        		parentWidth = obj.parent().width();
        		if(parentWidth > 0){
        			window.clearInterval(fnInterval);
        			objWidth = parentWidth * (parseFloat(that.getWidth().split("%")[0])/100);
        			
        			var leftRightMargin = 0;

		            if(that.getMarginLeft() || that.getMarginRight()){
		                if(that.getMarginLeft()) leftRightMargin += parseInt(that.getMarginLeft().split("px")[0]);
		                if(that.getMarginRight()) leftRightMargin += parseInt(that.getMarginRight().split("px")[0]);
		            }else if(that.getMargin()){
		                leftRightMargin = parseInt(that.getMargin().split("px")[0]) * 2;
		            }

		            $("#"+that.getId()).css("width", String(objWidth-leftRightMargin-parseInt(that.getMinusWidth().split("px")[0]))+"px");
        		}
        	}, 100);

        }else if(this.getWidth().indexOf("px")>-1){
            var w = this.getWidth().split("px")[0];
            $("#"+this.getId()).css("width", String(w-leftRightMargin-parseInt(this.getMinusWidth().split("px")[0]))+"px");
        }else{
        	if(obj.outerWidth() >= parentWidth){
	        	var leftRightMargin = 0;

	            if(this.getMarginLeft() || this.getMarginRight()){
	                if(this.getMarginLeft()) leftRightMargin += parseInt(this.getMarginLeft().split("px")[0]);
	                if(this.getMarginRight()) leftRightMargin += parseInt(this.getMarginRight().split("px")[0]);
	            }else if(this.getMargin()){
	                leftRightMargin = parseInt(this.getMargin().split("px")[0]) * 2;
	            }

	            $("#"+this.getId()).css("width", String(parentWidth-leftRightMargin-parseInt(this.getMinusWidth().split("px")[0]))+"px");
	        }
        }

    	if(this.getResize()){
            var widthRatio = parseFloat($("#"+this.getId()).width()/$(window).width());
            jQuery.sap.delayedCall(50, that, function() {
                that.resizeLayout(widthRatio);
            });
            
            $(window).resize(function(){
                jQuery.sap.delayedCall(50, that, function() {
                    that.resizeLayout(widthRatio);
                });
            });
        }
    }
});

sapui6.ui.layout.BorderedForm.prototype.resizeLayout = function(widthRatio){
	$("#"+this.getId()).css("width",String(parseInt($(window).width()*widthRatio))+"px");

	var obj = $("#"+this.getId());
	var parentWidth = obj.parent().width();
	if(obj.outerWidth() >= parentWidth){
        var leftRightMargin = 0;

        if(this.getMarginLeft() || this.getMarginRight()){
            if(this.getMarginLeft()) leftRightMargin += parseInt(this.getMarginLeft().split("px")[0]);
            if(this.getMarginRight()) leftRightMargin += parseInt(this.getMarginRight().split("px")[0]);
        }else if(this.getMargin()){
            leftRightMargin = parseInt(this.getMargin().split("px")[0]) * 2;
        }

        $("#"+this.getId()).css("width", String(parentWidth-leftRightMargin-parseInt(this.getMinusWidth().split("px")[0]))+"px");
    }
};

sapui6.ui.layout.BorderedForm.prototype.set = function(oSettings){
	this.settings = oSettings;
	var that = this;
	this.settings.forEach(function(element){
		element["element"].forEach(function(ele){
			that.addAggregation("item",ele);
		});
	});
};

