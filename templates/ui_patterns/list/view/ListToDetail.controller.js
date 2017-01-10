jQuery.sap.require("util.DataLoader");

(function(){
 	var _Controller;
 	var _View;
 	var _Dialog;

	sap.ui.controller("view.ListToDetail", {
		onInit: function() {
			_Controller = this;
	      	_View = this.getView();
	  	},

	 	onBeforeRendering: function() {
	 		var dl = new DataLoader(_View, "f");
			dl.load("model/SearchCondition.model.json","",false);
	  	},

	 	onAfterRendering: function() {

	  	},

	 	onExit: function() {
	 		_View.destroyContent();
	      	_View.destroyAggregation();
	      	if(_Dialog != undefined) _Dialog.destroyContent();
	  	},
		
		doSearch: function(oEvent) {
			var oTable = sap.ui.getCore().byId(_View.getId()+"-table");

			if(oTable.isBusy()) {
				sap.ui.commons.MessageBox.alert("In progress.");
				return;
			}

			var viewModel = _View.getModel("f");
			var comboBox = viewModel.getProperty("/SearchCondition/ComboBox");
			var fromDate = viewModel.getProperty("/SearchCondition/FromDate");
			var toDate = viewModel.getProperty("/SearchCondition/ToDate");
			var valueHF = viewModel.getProperty("/SearchCondition/ValueHF");
			var chk1 = viewModel.getProperty("/SearchCondition/Chk1");
			var chk2 = viewModel.getProperty("/SearchCondition/Chk2");
			var chk3 = viewModel.getProperty("/SearchCondition/Chk3");
			var chk4 = viewModel.getProperty("/SearchCondition/Chk4");

			var params = "comboBox=" + comboBox + "&fromDate=" + fromDate + "&toDate=" + toDate + "&valueHF=" + valueHF+ "&chk1=" + chk1+ "&chk2=" + chk2+ "&chk3=" + chk3+ "&chk4=" + chk4;

			if(comboBox == "" && fromDate == "" && toDate == "") {
				sap.ui.commons.MessageBox.alert("Input the essential field!");
				return;
			}
			
			var tableHeight = parseInt($(document).height()) - parseInt($("#"+oTable.getId()).offset().top) - 20;
			oTable.setHeight(tableHeight+"px");

			var dl = new DataLoader(oTable, "t");
			dl.load(
				"model/ListToDetail.model.json", 	// url
				params,							// parameter
				false,						// sync, async
				function(){					// function after attachedRequestCompleted
				
				}
			);
		},

		openDetail: function(data){
			var key = data.getParameter("rowData")["column3"];
			var detailView = sap.ui.view({viewName:"view.Detail", type:sap.ui.core.mvc.ViewType.JS});
			detailView.data("key",key);
			detailView.setWidth("100%");
			detailView.setHeight("100%");

			var oDialog = new sap.ui.commons.Dialog({title:"Detail",width:"90%",height:"400px"});
	    	oDialog.addContent(detailView);
	    	oDialog.setModal(true);
	    	oDialog.addButton(new sap.ui.commons.Button({text: "Edit", style:sap.ui.commons.ButtonStyle.Emph, press:detailView.getController().doEdit}));
			oDialog.addButton(new sap.ui.commons.Button({text: "Print", style:sap.ui.commons.ButtonStyle.Emph, press:detailView.getController().doPrint}));
			oDialog.addButton(new sap.ui.commons.Button({text: "Close", style:sap.ui.commons.ButtonStyle.Emph, press:function(){oDialog.close();}}));
	    	
	    	oDialog.open();
		},

		openValueHelp: function(oEvent){
			var viewModel = _View.getModel("f");
			if(_Dialog == undefined){
				_Dialog = sap.ui.jsfragment("fragments.valuehelp.code");
				_Dialog.attachClosed(function(){
					viewModel.setProperty("/SearchCondition/ValueHF", _Dialog.data("code"));
					viewModel.setProperty("/SearchCondition/ValueHFDesc", _Dialog.data("desc"));
				});
			}
			
			_Dialog.open();
		}

	});

}());