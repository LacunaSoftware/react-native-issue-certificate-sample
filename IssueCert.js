import {React, useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  Text,
  Linking,
} from 'react-native';
import MaskInput from 'react-native-mask-input';

import config from './config/config';
import Util from './util';

const IssueCert: () => Node = () => {

  const routes = {
    createOrder: 'api/orders/pki-brazil',
    getOrderLink: 'api/orders/',
    issueLink: '/issue-link'};

  const sendCreateOrderRequest = async () => {
    const postPayload = {
      parameters: {
        name: subjectName,
        cpf: identifier,
        phoneNumber: phoneNumber,
      },
      caId: config.caId,
      validityEnd: Util.getTwoYearsFromNowDate(),
      kind: 'PublicKey'
    };
    console.log(JSON.stringify(postPayload));
    const res = await fetch(`${config.endpoint}${routes.createOrder}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.apiKey,
      },
      body: JSON.stringify(postPayload),
    });
    const result = await res.json();
    console.log(result.id);
    getOrderIssueLink(result.id);
  };

  const getOrderIssueLink = async (orderId) => {
    const reqString = `${config.endpoint}${routes.getOrderLink}${orderId}${routes.issueLink}`;
    console.log(reqString);
    const res = await fetch(reqString, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': config.apiKey,
        },
    });
    const result = await res.json();
    console.log(result);
    Linking.openURL(result);
  };

  const [subjectName, setSubjectName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = () => {
    console.log(subjectName);
    console.log(identifier);
    console.log(phoneNumber);
    const result = sendCreateOrderRequest();
    console.log(result);
  };

  const phoneNumberMask = ['+', /\d/, /\d/, /\d/, '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  const identifierMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  return (
    <SafeAreaView>
      <TextInput
        onChangeText={text => setSubjectName(text)}
        value={subjectName}
        style={styles.input}
        placeholder="Digite o nome"
      />
      <MaskInput
        onChangeText={(masked, unmasked) => {
          setIdentifier(masked);
        }}
        value={identifier}
        style={styles.input}
        placeholder="Digite o CPF"
        mask={identifierMask}
      />
      <MaskInput
      value={phoneNumber}
      onChangeText={(masked, unmasked) => {
        setPhoneNumber(masked);
      }}
      mask={phoneNumberMask}
      style={styles.input}
      placeholder="Digite o número de telefone"
      />
      <TouchableHighlight onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableHighlight>
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
  },
  button: {
    backgroundColor: 'lightgreen',
    borderRadius: 15,
    marginTop: 25,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
});
export default IssueCert;
