import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button, Alert} from 'react-native';
import NfcManager, {NfcTech, NfcError} from 'react-native-nfc-manager';

// inicjalizacja NFC na urządzeniu
NfcManager.start();

const App = () => {
  const [nfcSupported, setNfcSupported] = useState(true);
  const [result, setResult] = useState('Przyłóż paszport do NFC');

  // Sprawdzenie dostępności NFC
  useEffect(() => {
    const checkNfcSupport = async () => {
      const supported = await NfcManager.isSupported();
      setNfcSupported(supported);
    };

    checkNfcSupport();
  }, []);

  // Odczyt danych z paszportu
  const readPassport = async () => {
    try {
      // Zacznij sesję NFC
      await NfcManager.requestTechnology(NfcTech.NfcA);

      const tag = await NfcManager.getTag();
      console.log(tag);

      // Tutaj musisz zaimplementować BAC oraz odczytanie danych z paszportu
      // na podstawie informacji z MRZ (numer paszportu, data urodzenia, data wygaśnięcia)
      // Te dane będą potrzebne do autoryzacji BAC (Basic Access Control)

      const passportNumber = '123456789'; // podaj numer paszportu
      const dateOfBirth = '850102'; // YYMMDD format
      const dateOfExpiry = '250101'; // YYMMDD format

      // Logika BAC do odczytu chipu paszportu

      setResult('Dane paszportowe odczytane!');
    } catch (ex) {
      if (ex instanceof NfcError) {
        Alert.alert('Błąd NFC', 'Nie można odczytać danych NFC');
      }
      console.warn(ex);
    } finally {
      // Zakończ sesję NFC
      NfcManager.cancelTechnologyRequest();
    }
  };

  
  return (
    <View style={styles.container}>
      <Text>{result}</Text>
      {nfcSupported ? (
        <Button title="Odczytaj paszport" onPress={readPassport} />
      ) : (
        <Text>Twoje urządzenie nie obsługuje NFC</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default App;