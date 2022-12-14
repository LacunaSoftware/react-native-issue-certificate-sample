import {React, useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  TouchableHighlight,
  StyleSheet,
  Text,
  Linking,
  Button,
  View
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {WebView} from 'react-native-webview';
import WebViewComponent from './webViewComponent';

const IssueCert: () => Node = () => {
  const routes = {
    signerElectronic:
      'https://demos.lacunasoftware.com/api/signer/embedded?allowElectronic=true',
  };

  const itemOptions = [
    {value: '', label: 'Default theme'},
    {value: 'apb', label: 'Amaranth Pacific Blue'},
    {value: 'acr', label: 'Amazon Cornell Red'},
    {value: 'azg', label: 'Azure Lime Green'},
    {value: 'cgo', label: 'Castleton Green Orange'},
    {value: 'clg', label: 'Cerulean Lime Green'},
    {value: 'cam', label: 'Charcoal Amazonite'},
    {value: 'clc', label: 'Cobalt Lemon Curry'},
    {value: 'dcg', label: 'Dark Cerulean Green'},
    {value: 'dgy', label: 'Dark Grey Yellow'},
    {value: 'dir', label: 'Dark Indigo Red'},
    {value: 'eva', label: 'English Vermillion Arsenic'},
    {value: 'gdc', label: 'Green Dark Coral'},
    {value: 'idg', label: 'Independence Green'},
    {value: 'mse', label: 'Metallic Seaweed Emerald'},
    {value: 'osg', label: 'Onyx Satin Gold'},
    {value: 'obg', label: 'Oxford Blue Green'},
    {value: 'pps', label: 'Persian Plum Sand'},
    {value: 'qbm', label: 'Queen Blue Mint'},
    {value: 'tbg', label: 'Teal Blue Gold'},
    {value: 'vgy', label: 'Viridian Green Yellow'},
    {value: 'iog', label: 'International Orange Green'},
    {value: 'oco', label: 'Onyx Carrot Orange'},
    {value: 'ioa', label: 'International Orange Apricot'},
    {value: 'gvb', label: 'Generic Viridian Blue'},
    {value: 'scy', label: 'Space Cadet Yellow'},
    {value: 'bvr', label: 'Blue Venetian Red'},
    {value: 'vsb', label: 'Vivid Sky Blue'},
    {value: 'ctv', label: 'Chartreuse Traditional Violet'},
  ];

  var [disableButton, setDisableButton] = useState(false);
  const [items, setItems] = useState(itemOptions);
  var [dropdownValue, setDropdownValue] = useState('');
  const [open, setOpen] = useState(false);
  const [disabledCheckbox, setDisabledCheckbox] = useState(false);
  const [renderWebView, setRenderWebView] = useState(false);
  var [embedUrl, setEmbedUrl] = useState('');

  const handleSubmit = () => {
    console.log('Disabled? ' + disabledCheckbox);
    console.log('Theme: ' + dropdownValue);
    setDisableButton(true);
    sign();
  };

  const sign = async () => {
    return fetch(routes.signerElectronic, {
      method: 'POST',
      headers: {
        Accept: '*/*',
      },
    }).then(res => res.text()).then((response) => {
      if (dropdownValue !== ''){
        response += `&theme=${dropdownValue}`;
      }
      if (disabledCheckbox){
        response += `&preview=${disabledCheckbox}`;
      }
      console.log(response);
      setEmbedUrl(response);
      setRenderWebView(true);
    });
  };


  const disablePreviewCheckboxText = 'Disable document preview';
  const disablePreviewCheckboxTextStyle = {textDecorationLine: 'none'};
  const titleTextMessage = 'Welcome to the embedded signatures mobile sample';

  return (
    <SafeAreaView>
      {!renderWebView ? (
        <>
        <View>
        <Text style={styles.titleText}>
          {titleTextMessage}
        </Text>
        </View>
          <DropDownPicker
            open={open}
            setOpen={setOpen}
            items={items}
            value={dropdownValue}
            setValue={setDropdownValue}
            setItems={setItems}
          />
          <BouncyCheckbox
            style
            text={disablePreviewCheckboxText}
            textStyle={disablePreviewCheckboxTextStyle}
            fillColor="gray"
            isChecked={disabledCheckbox}
            disableBuiltInState
            onPress={() => setDisabledCheckbox(!disabledCheckbox)}
          />
          <TouchableHighlight onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText} disabled={disableButton}>
              Sign a document
            </Text>
          </TouchableHighlight>
        </>
      ) : null}
      {renderWebView ? (
        <>
        <WebViewComponent
          disablePreview={disabledCheckbox}
          theme={dropdownValue}
          embedUrl={embedUrl}
        />
        <View style={styles.buttonLayout}>
            <Button title="Go back to main screen"
            onPress={
              ()=> {setRenderWebView(false);
            }}/>
        </View>
        </>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 250,
    height: 50,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'black',
    padding: 2,
    margin: 10,
    textDecorationColor: 'black',
    color: 'gray',
  },
  button: {
    backgroundColor: 'green',
    borderRadius: 15,
    marginTop: 25,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  checkbox: {
    margin: 25,
    padding: 25,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    alignContent: 'center',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonLayout: {
    marginBottom: 10,
  },
});
export default IssueCert;
