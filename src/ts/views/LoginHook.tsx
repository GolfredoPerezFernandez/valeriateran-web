

import { Colors, Fonts, } from '../app/Styles';

const _styles = {
  slider: RX.Styles.createViewStyle({
    overflow: 'hidden' // for custom animations
  }),
  sliderContentContainer: RX.Styles.createViewStyle({
    alignSelf: 'center'
  }),
  titleStyle55: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    alignSelf: 'center'
  }),
  titleStyle0: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
    alignSelf: 'center'
  }),
  titleStyle: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 24,
    textAlign: 'center',
    color: 'black',
    alignSelf: 'center'
  }),
  titleStyle2s: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 32,
    textAlign: 'left',
    color: 'white',
    alignSelf: 'flex-start'
  }),
  titleStyle2s2: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 32,
    textAlign: 'left',
    color: '#FF296D',
    alignSelf: 'flex-start'
  }),
  titleStyle2: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 40,
    textAlign: 'center',
    color: 'black',
    alignSelf: 'center'
  }),
  titleStyle22: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 32,
    textAlign: 'center',
    color: 'white',
    alignSelf: 'center'
  }),
  titleStyle3: RX.Styles.createTextStyle({
    font: Fonts.displayRegular,
    fontSize: 14,
    textAlign: 'left',
    color: 'gray',
    alignSelf: 'center'
  }),
  titleStyle4: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 15,
    textAlign: 'center',
    color: 'black',
    alignSelf: 'center'
  }),
  titleStyle33: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 40,
    textAlign: 'left',
    color: 'black',
    alignSelf: 'flex-start'
  }),
  titleStyle33s: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 32,
    textAlign: 'left',
    color: '#FF296D',
    alignSelf: 'flex-start'
  }),
  buttomStyle: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center'
  }),
  contentStyle: RX.Styles.createTextStyle({
    font: Fonts.displayRegular,
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center'
  }),
  contentStyle2: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center'
  }),
  contentContainer: RX.Styles.createViewStyle({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  }),
  container: RX.Styles.createViewStyle({
    flex: 1,
    backgroundColor: Colors.simpleDialogBackground,
    borderWidth: 1,
    borderColor: Colors.simpleDialogBorder,
  }),
  contentStyle3: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center'
  })
}


const Moralis = require('moralis');
Moralis.initialize("9BFHNXrDCGLgBZu71cCzhIpKyRYgXtYUSbZ8zwaA");
Moralis.serverURL = 'https://plezpobky6km.moralis.io:2053/server'
import * as UI from '@sproutch/ui';
import CurrentUserStore from '../stores/CurrentUserStore';

const _confirmDeleteDialogId = 'delete';



export const LoginHook = ({
}: {
}) => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [register, setIsRegister] = useState(false)

  return (<RX.View style={_styles.container} >

    <RX.View style={_styles.contentContainer}>
      <RX.View style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>

        {register ? <RX.View style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
          <RX.Text>{'Register'}</RX.Text>
          <RX.TextInput style={{ width: 200, height: 47 }} onChangeText={setUsername} placeholder="Username" />
          <RX.TextInput style={{ width: 200, height: 47 }} onChangeText={setEmail} placeholder="Email" />
          <RX.TextInput style={{ width: 200, height: 47 }} secureTextEntry={true} onChangeText={setPassword} placeholder="Password" />
          <RX.TextInput style={{ width: 200, height: 47 }} secureTextEntry={true} onChangeText={setPassword2} placeholder="Repeat Password" />
        </RX.View> : <RX.View style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
          <RX.Text>{'Login'}</RX.Text>
          <RX.TextInput style={{ width: 200, height: 47 }} onChangeText={setUsername} placeholder="Username" />
          <RX.TextInput style={{ width: 200, height: 47 }} secureTextEntry={true} onChangeText={setPassword} placeholder="Password" />
        </RX.View>}


      </RX.View>
    </RX.View>

    {register ? <RX.View style={{ paddingBottom: 50, justifyContent: 'center', alignItems: 'center' }}>

      <UI.Button disabled={email.length < 6 || username.length < 6 || password !== password2} onPress={() => onRegister()} style={{ content: [{ width: 160, borderRadius: 11, }], label: { color: 'black', font: Fonts.displayBold } }
      } elevation={4} variant={"outlined"} label="Register" />
      <UI.Button onPress={isLogin} style={{ root: [{ marginTop: 10 }], content: [{ width: 160, borderRadius: 11, }], label: { color: 'black', font: Fonts.displayBold } }
      } elevation={4} variant={"outlined"} label="Go to login" />
    </RX.View> : <RX.View style={{ paddingBottom: 50, justifyContent: 'center', alignItems: 'center' }}>

      <UI.Button onPress={onLogin} disabled={username.length < 6 || password.length < 6} style={{ content: [{ width: 160, borderRadius: 11, }], label: { color: 'black', font: Fonts.displayBold } }
      } elevation={4} variant={"outlined"} label="Enter" />
      <UI.Button onPress={isRegister} style={{ root: [{ marginTop: 10 }], content: [{ width: 160, borderRadius: 11, }], label: { color: 'black', font: Fonts.displayBold } }
      } elevation={4} variant={"outlined"} label="Register" />
    </RX.View>
    }
  </RX.View>

  );
  async function onLogin() {


    if (username !== '' && password !== '') {
      try {
        await Moralis.User.logIn(username, password)

        CurrentUserStore.setIsConnect(true)

        SimpleDialog.dismissAnimated(_confirmDeleteDialogId);
        // Hooray! Let them use the app now.
      } catch (error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
      }
    }

  }
  async function onRegister() {

    if (password !== password2) {
      CurrentUserStore.setError('Password dont Match')
    } else {
      const user = new Moralis.User();
      user.set("username", username);
      user.set("password", password);
      user.set("email", email);

      await user.signUp().then(() => {

        CurrentUserStore.setIsConnect(true)
        SimpleDialog.dismissAnimated(_confirmDeleteDialogId);
      });

      // Hooray! Let them use the app now.

    }
  }

  function isLogin(e: RX.Types.SyntheticEvent) {

    setEmail('')
    setPassword('')
    setPassword2('')
    setUsername('')
    setIsRegister(false)
    e.stopPropagation();
  }

  function isRegister(e: RX.Types.SyntheticEvent) {

    setEmail('')
    setPassword('')
    setPassword2('')
    setUsername('')
    setIsRegister(true)
    e.stopPropagation();

  }
};

import * as RX from 'reactxp'
import { useState } from 'react';
import SimpleDialog from '../controls/SimpleDialog';

