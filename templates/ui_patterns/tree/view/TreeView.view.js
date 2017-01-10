sap.ui.jsview("view.TreeView", {
    getControllerName : function() {
        return "view.TreeView";
    },

    createContent : function(oController){
        this.loadLibrary();
        
        var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});

        oLayout.addContent(this.createTitle(oController));

        var oHLayout = new sap.ui.layout.HorizontalLayout({width:"100%"});
        oHLayout.addContent(this.createTree(oController));
        oHLayout.addContent(this.createDetail(oController));

        oLayout.addContent(oHLayout);

        return oLayout;
    },

    loadLibrary : function(){
        jQuery.sap.require("sap.ui.core.theming.Parameters");
        jQuery.sap.require("sapui6.ui.layout.BorderedForm");
        jQuery.sap.require("sapui6.ui.commons.TabStrip");
        jQuery.sap.require("sapui6.ui.commons.AppendTextView");
        jQuery.sap.require("sapui6.ui.commons.InlineCheckBoxGroup");
        jQuery.sap.require("sapui6.ui.commons.NumberField");
        jQuery.sap.require("sapui6.ui.commons.NumberFormatField");
        jQuery.sap.require("sapui6.ui.commons.YearPicker");
        jQuery.sap.require("sapui6.ui.commons.MonthPicker");
        jQuery.sap.require("sapui6.ui.commons.TimePicker");
        jQuery.sap.require("sapui6.ui.commons.UppercaseField");
        jQuery.sap.require("sapui6.ui.commons.LowercaseField");
        jQuery.sap.require("sapui6.ui.commons.RegExpField");
        jQuery.sap.require("sapui6.ui.commons.Panel");
    },

    createTitle : function(oController){
        jQuery.sap.require("sap.ui.core.theming.Parameters");
        var titleColor = sap.ui.core.theming.Parameters.get("sapUiTextTitle");
        var strongColor = sap.ui.core.theming.Parameters.get("sapActiveColor");
        var tileFontSize = sap.ui.core.theming.Parameters.get("sapUiFontHeader4Size");

        return new sap.ui.core.HTML({content:'<div style="margin:0px 0px 5px 0px;padding-left: 5px;color:' + titleColor + ';font-weight:bold;font-size:' + tileFontSize + ';border-left:5px solid ' + strongColor + ';">Tree Form & Table</div>'});
    },

    createTree : function(oController){
        var oTree = new sap.ui.commons.Tree({
            showHeader : false,
            width:"260px",
            height:"auto",
            showHorizontalScrollbar : false
        });

        var oTreeNode1 = this.createTreeNode(oController, "Organization1", "org0001");
        var oTreeNode2 = this.createTreeNode(oController, "Department1", "dept0001");
        var oTreeNode3 = this.createTreeNode(oController, "Person1", "p0000001");
        var oTreeNode4 = this.createTreeNode(oController, "Person2", "p0000002");
        var oTreeNode5 = this.createTreeNode(oController, "Department2", "dept0002");
        var oTreeNode6 = this.createTreeNode(oController, "Organization2", "org0002");

        oTreeNode1.addNode(oTreeNode2);
        oTreeNode1.addNode(oTreeNode5);

        oTreeNode2.addNode(oTreeNode3);
        oTreeNode2.addNode(oTreeNode4);

        oTree.addNode(oTreeNode1);
        oTree.addNode(oTreeNode6);

        var oPanel = new sapui6.ui.commons.Panel(this.getId()+"-panel-left",{
                width: "300px",
                height: "800px",
                title: "Tree",
                collapsed : false,
                headerBackgroundColor : "#ddeeff"
                // titleColor : "#fff",
                // iconHoverColor : "#220000"
        });
        oPanel.addContent(oTree);

        return oPanel;
    },

    createTreeNode : function(oController, text, key){
        var oTreeNode = new sap.ui.commons.TreeNode({
            text:text,
            expanded:true,
            selected:oController.selectTreeNode
        });

        oTreeNode.data("key", key);

        return oTreeNode;
    },

    createDetail : function(oController){
        var oPanel = new sapui6.ui.commons.Panel(this.getId()+"-panel-right",{
                width: "800px",
                height: "800px",
                marginLeft: "10px",
                title: "Detail",
                collapsed : false,
                headerBackgroundColor : "#ddeeff"
                // titleColor : "#fff",
                // iconHoverColor : "#220000"
        });
        oPanel.addContent(this.createForm(oController));
        oPanel.addContent(this.createTable(oController));

        return oPanel;
    },

    createForm : function(oController){
        var oComboBox = new sap.ui.commons.ComboBox({editable:false});
        oComboBox.bindItems("t>/ComboBoxData", new sap.ui.core.ListItem({key:"{t>key}",text:"{t>text}"}));
        oComboBox.bindProperty("selectedKey","t>/FormData/ComboBox");
        
        var oAppendTextView = new sapui6.ui.commons.AppendTextView({before:"(", after:")", text:"{t>/FormData/ValueHF}"});
        var oAppendTextViewDesc = new sap.ui.commons.TextView({text:"{t>/FormData/ValueHFDesc}"});

        var oRadioButtonGroup = new sap.ui.commons.RadioButtonGroup({
            columns : 2,
            items:[
                new sap.ui.core.Item({text:"Yes",key:"Yes"}),
                new sap.ui.core.Item({text:"No",key:"No"})
            ],
            editable: false
        });

        oRadioButtonGroup.bindProperty("selectedIndex",{
            parts: [
                {path: "t>/FormData/Radio"},
            ],
            formatter: function(key){ 
              if(key == "Yes") return 0;
              else if(key == "No") return 1;
            }
        }); 
        
        var oInlineCheckBoxGroup = new sapui6.ui.commons.InlineCheckBoxGroup();
        oInlineCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 1", checked:"{t>/FormData/Chk1}",editable:false}));
        oInlineCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 2", checked:"{t>/FormData/Chk2}",editable:false}));
        oInlineCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 3", checked:"{t>/FormData/Chk3}",editable:false}));
        oInlineCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 4", checked:"{t>/FormData/Chk4}",editable:false}));
        
        var oNumberField = new sapui6.ui.commons.NumberField({value:"{t>/FormData/Code}", editable:false});
        
        var oCurrencyField = new sapui6.ui.commons.NumberFormatField({format:"#,##0.00",editable:false});
        oCurrencyField.bindValue("t>/FormData/Currency");

        var oQtyField = new sapui6.ui.commons.NumberFormatField({format:"#,##0",editable:false});
        oQtyField.bindValue("t>/FormData/Qty");

        var oPercentField = new sapui6.ui.commons.AppendTextView({after:"%", text:"{t>/FormData/Percent}"});
        
        var oYearPicker = new sapui6.ui.commons.YearPicker({value:"{t>/FormData/Year}", editable:false});
        
        var oMonthPicker = new sapui6.ui.commons.MonthPicker({format:"MM.yyyy", editable:false});
        oMonthPicker.bindValue("t>/FormData/Month");

        var oDatePicker = new sap.ui.commons.DatePicker({width:"100px", yyyymmdd:"{t>/FormData/Date}", editable:false});
        
        var oTimePicker = new sapui6.ui.commons.TimePicker({interval:30, editable:false});
        oTimePicker.bindValue("t>/FormData/Time");
        
        var oUppercaseField = new sapui6.ui.commons.UppercaseField({value:"{t>/FormData/Uppercase}", editable:false});

        var oLowercaseField = new sapui6.ui.commons.LowercaseField({value:"{t>/FormData/Lowercase}", editable:false});
        
        var oEmail = new sapui6.ui.commons.RegExpField({
            value: "{t>/FormData/Email}",
            message: "The input value is not correct.",
            width:"250px",
            editable:false
        });
        oEmail.setRegExp(oEmail.EMAIL);

        var oURL = new sapui6.ui.commons.RegExpField({
            value: "{t>/FormData/URL}",
            message: "The input value is not correct.",
            width:"250px",
            editable:false
        });
        oURL.setRegExp(oURL.URL);

        var oUserId = new sapui6.ui.commons.RegExpField({
            value: "{t>/FormData/UserId}",
            message: "The input value is not correct.",
            editable:false
        });
        oUserId.setRegExp(oUserId.USER_ID);

        var oTextField = new sap.ui.commons.TextField({value:"{t>/FormData/TextField}",editable:false});

        var oLink = new sap.ui.commons.Link({text:"2014 Sales Report"});

        var oSlider = new sap.ui.commons.Slider({
            width: '100%',
            min: 100,
            max: 300,
            value: "{t>/FormData/Slider}",
            totalUnits: 5,
            smallStepWidth: 5,
            stepLabels : true,
            editable:false
        });

        var oTextArea = new sap.ui.commons.TextArea({rows:4, width:"100%", value:"{t>/FormData/TextArea}",editable:false});

        var settings = [
                {label:"ComboBox", element:[oComboBox]},
                {label:"TextView", element:[oAppendTextView,oAppendTextViewDesc]},
                {label:"RadioButton", element:[oRadioButtonGroup], marginLeft:"5px"},
                {label:"CheckBox", element:[oInlineCheckBoxGroup], marginLeft:"5px"},
                {label:"NumberField", element:[oNumberField]},
                {label:"Currency", element:[oCurrencyField]},
                {label:"Qty", element:[oQtyField]},
                {label:"Percent", element:[oPercentField], marginLeft:"6px"},
                {label:"YearPicker", element:[oYearPicker]},
                {label:"MonthPicker", element:[oMonthPicker]},
                {label:"DatePicker", element:[oDatePicker]},
                {label:"TimePicker", element:[oTimePicker]},
                {label:"Uppercase", element:[oUppercaseField]},
                {label:"Lowercase", element:[oLowercaseField]},
                {label:"User ID(RegExp)", element:[oUserId]},
                {label:"Email(RegExp)", element:[oEmail]},
                {label:"URL(RegExp)", element:[oURL]},
                {label:"TextField", element:[oTextField]},
                {label:"Slider", element:[oSlider]},
                {label:"Files", element:[oLink], marginLeft:"6px"},
                {label:"TextArea", element:[oTextArea]}
        ];

        var oBorderedForm = new sapui6.ui.layout.BorderedForm({
                columns : 4,
                width : "100%",
                margin : "10px",
                labelBackgroundColor : "#eef7ff",
                labelBold : true,
                widths : ["140px","380px","140px","380px"],
                title : "Tab View"
        });

        oBorderedForm.set(settings);

        return oBorderedForm;
    },

    createTable : function(oController){
        jQuery.sap.require("sapui6.ui.table.Table");

        var oCheckBox = new sap.ui.commons.CheckBox({text:"CheckBox", editable:false,checked:"{t>column4}"});

        var oRadioButtonGroup = new sap.ui.commons.RadioButtonGroup({
            columns : 2,
            editable : false,
            items:[
                new sap.ui.core.Item({text:"Yes",key:"Yes"}),
                new sap.ui.core.Item({text:"No",key:"No"})
            ]
        });

        oRadioButtonGroup.bindProperty("selectedIndex",{
            parts: [
                {path: "t>column9"},
            ],
            formatter: function(key){ 
              if(key == "Yes") return 0;
              else if(key == "No") return 1;
            }
        }); 

        var columns = [
            new sapui6.ui.table.Column({
                title:"Column1", path:"t>column1", width:"120px", align:"left"
            }),
            new sapui6.ui.table.Column({
                title:"Column2", path:"t>column2", width:"120px", align:"left"
            }),
            new sapui6.ui.table.Column({
                title:"Column3", path:"t>column3", width:"120px", align:"center"
            }),
            new sapui6.ui.table.Column({
                title:"Column4", path:"t>column4", width:"120px", align:"center", template:oCheckBox
            }),
            new sapui6.ui.table.Column({
                title:"Column5", path:"t>column5", width:"120px", align:"right", format:"#,##0.##"
            }),
            new sapui6.ui.table.Column({
                title:"Column6", path:"t>column6", width:"120px", align:"center", format:"MM-dd-yyyy"
            }),
            new sapui6.ui.table.Column({
                title:"Column7", path:"t>column7", width:"120px", align:"right", format:"#,###"
            }),
            new sapui6.ui.table.Column({
                title:"Column8", path:"t>column8", width:"120px", align:"right", format:"#,###.##"
            }),
            new sapui6.ui.table.Column({
                title:"Column9", path:"t>column9", width:"120px", align:"center", template:oRadioButtonGroup
            })
        ]

        var table = new sapui6.ui.table.Table(this.getId()+"-table",{
            width:"100%", 
            height:"230px",
            columns:columns,
            margin : "10px",
            // noDataText:"No Data.",
            resize: true
        });
        table.bindRows("t>/TableData");

        return table;
    }
});