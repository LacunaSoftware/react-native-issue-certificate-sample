import React, {Component, useState} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {WebView} from 'react-native-webview';

// ...
export default class WebViewComponent extends Component {
  disableDocumentPreview = this.props.disablePreview;
  theme = this.props.theme;
  embedUrl = this.props.embedUrl;
  signer_lib = `var exports = {};
  "use strict";var __extends=(this&&this.__extends)||(function(){var extendStatics=function(d,b){extendStatics=Object.setPrototypeOf||({__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b;})||function(d,b){for(var p in b)if(b.hasOwnProperty(p))d[p]=b[p];};return extendStatics(d,b);};return function(d,b){extendStatics(d,b);function __(){this.constructor=d;}
  d.prototype=b===null?Object.create(b):(__.prototype=b.prototype,new __());};})();Object.defineProperty(exports,"__esModule",{value:true});exports.CloudProviderClosedEvent=exports.CloudProviderSelectedEvent=exports.RedirectToSetupEvent=exports.DocumentRefusedEvent=exports.DocumentApprovedEvent=exports.DocumentSignedEvent=exports.FrameMessage=exports.ScaleOptions=exports.FrameMessageTypes=exports.LacunaSignerWidget=void 0;exports.default=LacunaSignerWidget;var LacunaSignerWidget=(function(){function LacunaSignerWidget(options){this.myInstanceVar=null;this._init=false;this._allowedUrls=[];this._handlers=[];this._cloudProviderUrl="";this.events={documentSigned:FrameMessageTypes.DocumentSigned,documentApproved:FrameMessageTypes.DocumentApproved,redirectToSetup:FrameMessageTypes.RedirectToSetup,cloudProviderSelected:FrameMessageTypes.CloudProviderSelected,documentRefused:FrameMessageTypes.DocumentRefused,};this.scaleOptions={PageWidth:ScaleOptions.PageWidth,S50:ScaleOptions.S50,S75:ScaleOptions.S75,S100:ScaleOptions.S100,S125:ScaleOptions.S125,S150:ScaleOptions.S150,S200:ScaleOptions.S200,S300:ScaleOptions.S300};if(!options){options={cloudProviderCallback:undefined,enableNotifications:false,disableDocumentPreview:false,enableRefusal:false,theme:undefined,culture:undefined};}
  this._options=options;}
  Object.defineProperty(LacunaSignerWidget.prototype,"_notify",{get:function(){return!!this._options&&this._options.enableNotifications;},enumerable:false,configurable:true});Object.defineProperty(LacunaSignerWidget.prototype,"_disablePreview",{get:function(){return!!this._options&&this._options.disableDocumentPreview;},enumerable:false,configurable:true});Object.defineProperty(LacunaSignerWidget.prototype,"_enableRefusal",{get:function(){return!!this._options&&this._options.enableRefusal;},enumerable:false,configurable:true});LacunaSignerWidget.prototype.listen=function(callback){this.createHandlerFunction('*',callback);};;LacunaSignerWidget.prototype.on=function(eventType,callback){var self=this;if(eventType&&typeof eventType=='string'){this.createHandlerFunction(eventType,callback);}
  else{throw"Invalid event type: "+eventType;}};;LacunaSignerWidget.prototype.renderElement=function(embedUrl,domElement,page,scale){this.renderFunction(embedUrl,domElement,page,scale);};;LacunaSignerWidget.prototype.render=function(embedUrl,domElementId,page,scale){this.renderFunction(embedUrl,document.getElementById(domElementId),page,scale);};;LacunaSignerWidget.prototype.openCloudProvider=function(){if(!this._cloudProviderUrl){throw Error('No cloud provider selected');}
  this._providerWindow=window.open(this._cloudProviderUrl,'_blank');this.pollProviderWindow();};LacunaSignerWidget.prototype.setEnableNotifications=function(notify){if(this._options){this._options.enableNotifications=notify;}};LacunaSignerWidget.prototype.setDisableDocumentPreview=function(disable){if(this._options){this._options.disableDocumentPreview=disable;}};LacunaSignerWidget.prototype.setEnableRefusal=function(refusal){if(this._options){this._options.enableRefusal=refusal;}};LacunaSignerWidget.prototype.setTheme=function(theme){if(this._options){this._options.theme=theme;}};LacunaSignerWidget.prototype.setCulture=function(culture){if(this._options){this._options.culture=culture;}};LacunaSignerWidget.prototype.pollProviderWindow=function(){var _this=this;setTimeout(function(){if(_this._providerWindow&&_this._providerWindow.closed){if(_this._iframe&&_this._iframe.contentWindow){var closedEvent=new CloudProviderClosedEvent();_this._iframe.contentWindow.postMessage(closedEvent.toJson(),'*');}}
  else{_this.pollProviderWindow();}},1000);};LacunaSignerWidget.prototype.initFunction=function(){var _this=this;this._init=true;window.addEventListener('message',function(e){var urls=_this._allowedUrls;var isValidOrigin=urls.indexOf(e.origin.toLowerCase())>-1;if(isValidOrigin){var callbackModel=JSON.parse(e.data);if(callbackModel.type===_this.events.redirectToSetup){location.href=callbackModel.url+'&returnUrl='+encodeURIComponent(document.URL);}
  else if(callbackModel.type===_this.events.cloudProviderSelected){_this._cloudProviderUrl=callbackModel.url;if(_this._options&&_this._options.cloudProviderCallback){_this._options.cloudProviderCallback();}
  else{var dialog=document.createElement('div');dialog.setAttribute('style','display: block; position: fixed; z-index: 100000; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgb(0,0,0); background-color: rgba(0,0,0,0.4);');var bodyDiv=document.createElement('div');bodyDiv.setAttribute('style','width: 300px; height: 250px; position: absolute; margin: auto; left: 0; bottom: 0; top: 0; right: 0; text-align: center; background-color: #fefefe; font-family: "Helvetica"; border-radius: 10px;');var contentDiv=document.createElement('div');contentDiv.setAttribute('style','display: table-cell; vertical-align: middle; padding-top: 30px;');var textElement=document.createElement('p');textElement.setAttribute('style','padding-left: 5%; padding-right: 5%; font-size: 1.6em; color: black; word-wrap: break-word; white-space: normal;');textElement.appendChild(document.createTextNode("Utilizar o provedor selecionado para realizar a assinatura?"));contentDiv.appendChild(textElement);var confirmButton=document.createElement('a');confirmButton.innerHTML='Confirmar';confirmButton.setAttribute('style','webkit-appearance: button; -moz-appearance: button; appearance: button; padding: 2% 4%; text-align: center; text-decoration: none; display: inline-block; font-size: 1.1em; margin: 5%; cursor: pointer; background-color: #0078e7; color: white');confirmButton.addEventListener("click",function(){_this.openCloudProvider();document.body.removeChild(dialog);});contentDiv.appendChild(confirmButton);var cancelButton=document.createElement('a');cancelButton.setAttribute('style','-webkit-appearance: button; -moz-appearance: button; appearance: button; padding: 2% 4%; text-align: center; text-decoration: none; display: inline-block; font-size: 1.1em; margin: 5%; cursor: pointer; background-color: #e7e7e7; color: black');cancelButton.innerHTML='Cancelar';cancelButton.addEventListener("click",function(){document.body.removeChild(dialog);});contentDiv.appendChild(cancelButton);bodyDiv.appendChild(contentDiv);dialog.appendChild(bodyDiv);document.body.appendChild(dialog);return;}}
  else if(_this._handlers&&_this._handlers.length>0){var handler=null;for(var i=0;i<_this._handlers.length;i++){handler=_this._handlers[i];if(handler.callback){if(handler.type==='*'||handler.type===callbackModel.type){handler.callback(callbackModel);}}}}}},false);};;LacunaSignerWidget.prototype.createHandlerFunction=function(type,callback){if(!this._init){this.initFunction();}
  this._handlers.push({type:type,callback:callback});};;LacunaSignerWidget.prototype.renderFunction=function(embedUrl,domElement,page,scale){var origin='';if(typeof URL==='function'){origin=new URL(embedUrl).origin.toLowerCase();}
  else{origin=embedUrl.toLowerCase();}
  if(this._allowedUrls.indexOf(origin)==-1){this._allowedUrls.push(origin);}
  if(this._notify){embedUrl=embedUrl+("&notify="+this._notify);}
  if(page){embedUrl=embedUrl+("&page="+page);}
  if(scale){embedUrl=embedUrl+("&scale="+scale);}
  if(this._disablePreview){embedUrl=embedUrl+("&preview="+this._disablePreview);}
  if(this._enableRefusal){embedUrl=embedUrl+("&refusal="+this._enableRefusal);}
  if(this._options&&this._options.theme!=null){embedUrl=embedUrl+("&theme="+this._options.theme);}
  if(this._options&&this._options.culture!=null){embedUrl=embedUrl+("&culture="+this._options.culture);}
  var iframe=document.createElement('iframe');iframe.classList.add('frame-responsive');iframe.src=embedUrl;iframe.allow='geolocation';domElement.appendChild(iframe);this._iframe=iframe;};;return LacunaSignerWidget;}());exports.LacunaSignerWidget=LacunaSignerWidget;;var FrameMessageTypes;(function(FrameMessageTypes){FrameMessageTypes["RedirectToSetup"]="redirectToSetup";FrameMessageTypes["DocumentSigned"]="documentSigned";FrameMessageTypes["DocumentApproved"]="documentApproved";FrameMessageTypes["CloudProviderSelected"]="cloudProviderSelected";FrameMessageTypes["CloudProviderClosed"]="cloudProviderClosed";FrameMessageTypes["DocumentRefused"]="documentRefused";})(FrameMessageTypes=exports.FrameMessageTypes||(exports.FrameMessageTypes={}));var ScaleOptions;(function(ScaleOptions){ScaleOptions["PageWidth"]="PageWidth";ScaleOptions["S50"]="50";ScaleOptions["S75"]="75";ScaleOptions["S100"]="100";ScaleOptions["S125"]="125";ScaleOptions["S150"]="150";ScaleOptions["S200"]="200";ScaleOptions["S300"]="300";})(ScaleOptions=exports.ScaleOptions||(exports.ScaleOptions={}));var FrameMessage=(function(){function FrameMessage(type){this.type=type;}
  FrameMessage.prototype.toJson=function(){return JSON.stringify(this);};return FrameMessage;}());exports.FrameMessage=FrameMessage;var DocumentSignedEvent=(function(_super){__extends(DocumentSignedEvent,_super);function DocumentSignedEvent(documentId){var _this=_super.call(this,FrameMessageTypes.DocumentSigned)||this;_this.id=documentId;return _this;}
  return DocumentSignedEvent;}(FrameMessage));exports.DocumentSignedEvent=DocumentSignedEvent;var DocumentApprovedEvent=(function(_super){__extends(DocumentApprovedEvent,_super);function DocumentApprovedEvent(documentId){var _this=_super.call(this,FrameMessageTypes.DocumentApproved)||this;_this.id=documentId;return _this;}
  return DocumentApprovedEvent;}(FrameMessage));exports.DocumentApprovedEvent=DocumentApprovedEvent;var DocumentRefusedEvent=(function(_super){__extends(DocumentRefusedEvent,_super);function DocumentRefusedEvent(documentId){var _this=_super.call(this,FrameMessageTypes.DocumentRefused)||this;_this.id=documentId;return _this;}
  return DocumentRefusedEvent;}(FrameMessage));exports.DocumentRefusedEvent=DocumentRefusedEvent;var RedirectToSetupEvent=(function(_super){__extends(RedirectToSetupEvent,_super);function RedirectToSetupEvent(redirectUrl){var _this=_super.call(this,FrameMessageTypes.RedirectToSetup)||this;_this.url=redirectUrl;return _this;}
  return RedirectToSetupEvent;}(FrameMessage));exports.RedirectToSetupEvent=RedirectToSetupEvent;var CloudProviderSelectedEvent=(function(_super){__extends(CloudProviderSelectedEvent,_super);function CloudProviderSelectedEvent(url,name,provider){var _this=_super.call(this,FrameMessageTypes.CloudProviderSelected)||this;_this.url=url;_this.name=name;_this.provider=provider;return _this;}
  return CloudProviderSelectedEvent;}(FrameMessage));exports.CloudProviderSelectedEvent=CloudProviderSelectedEvent;var CloudProviderClosedEvent=(function(_super){__extends(CloudProviderClosedEvent,_super);function CloudProviderClosedEvent(){return _super.call(this,FrameMessageTypes.CloudProviderClosed)||this;}
  return CloudProviderClosedEvent;}(FrameMessage));exports.CloudProviderClosedEvent=CloudProviderClosedEvent;
  
  window.onerror = function(message, sourcefile, lineno, colno, error) {
      alert('Message: ' + message + ' - Source: ' + sourcefile + ' Line: ' + lineno + ':' + colno);
      return true;
    };
  `;
  componentDidMount() {
    const widgetInstantiation = `
    var widget = new LacunaSignerWidget({ 
      disableDocumentPreview: ${this.disableDocumentPreview.toString()}, 
      theme: "${this.theme.toString()}"});
      widget.on(widget.events.documentSigned, function (e) {
        alert('Document ' + e.id + ' signed');
      }); 
      widget.render(${this.props.embedUrl}, "embed-container");`;
    const widgetJs = `${this.signer_lib}
    try {
        alert("kk eae men");
        ${widgetInstantiation}
        } catch(e) {
          alert(e)
        }
        void(0); true;
      `;
    // console.log(widgetJs);
    this.webview.injectJavaScript(widgetJs);
  }

  render() {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <body>
    <div id="container">
        <div id="embed-container" class="frame-container"></div>
    </div>
    </body>
    </html>
    `;
    return (
      <View style={styles.view}>
        <Text>Show webview</Text>
        <WebView
          style={styles.webview}
          ref={ref => (this.webview = ref)}
          source={{html}}
          javaScriptEnabledAndroid={true}
          javaScriptEnabled={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  webview: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  view: {flex: 1, flexDirection: 'column'},
});
