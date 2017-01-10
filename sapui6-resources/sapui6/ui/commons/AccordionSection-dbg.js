jQuery.sap.declare("sapui5js.custom.AccordionSection");
jQuery.sap.require("sap.ui.core.Element");

sap.ui.core.Element.extend("sapui5js.custom.AccordionSection", { 
    metadata : {       
    	library : "sapui5js.custom",                      
        properties : {
			"height" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : "200px"},
			"enabled" : {type : "boolean", group : "Behavior", defaultValue : true},
			"expand" : {type : "boolean", group : "Behavior", defaultValue : false},
			"title" : {type : "string", group : "Misc", defaultValue : null}
		},
		defaultAggregation : "content",
		aggregations : {
	    	"content" : {type : "sap.ui.core.Control", multiple : true, singularName : "content"}
		}
    }

});
