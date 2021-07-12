
import { Fonts, FontSizes, Styles } from '../app/Styles';

const _styles = {
  container: RX.Styles.createViewStyle({
    flex: 1,
    alignSelf: 'stretch',
    padding: 16,
  }),
  editTodoItem: RX.Styles.createTextInputStyle({
    margin: 8,
    height: 41,
    borderRadius: 20,
    paddingHorizontal: 10,
    fontSize: FontSizes.size16,
    alignSelf: 'stretch',
  }),
  editTodoItem2: RX.Styles.createTextInputStyle({
    margin: 8,
    height: 82,
    borderRadius: 20,
    paddingHorizontal: 10,
    fontSize: FontSizes.size16,
    alignSelf: 'stretch',
  }),
  Text: RX.Styles.createTextStyle({
    fontSize: 24,
    font: Fonts.displayBold,
    color: 'black',
  }),
  Text3: RX.Styles.createTextStyle({
    fontSize: 16,
    font: Fonts.displayBold,
    color: 'gray',
  }),
  Text2: RX.Styles.createTextStyle({
    fontSize: 18,
    font: Fonts.displayBold,
    color: 'black',
  }),
  buttonContainer: RX.Styles.createViewStyle({
    margin: 8,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  }),
  buttomStyle: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center'
  }),
  buttomStyle3: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center'
  }),
  buttomStyle2: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
    alignSelf: 'center'
  }),
  text: RX.Styles.createTextStyle({
    flex: -1,
    fontSize: FontSizes.size16,
    font: Fonts.displayBold,
    color: 'black',
    margin: 8,
  }),
};
import * as RX from 'reactxp';
import { useState } from 'react';

const Moralis = require('moralis');
Moralis.initialize("9BFHNXrDCGLgBZu71cCzhIpKyRYgXtYUSbZ8zwaA");
Moralis.serverURL = 'https://plezpobky6km.moralis.io:2053/server'
import VideoPlayer from 'react-video-player-extended';
import ReactAudioPlayer from 'react-audio-player';
import NavContextStore from '../stores/NavContextStore';
import CurrentUserStore from '../stores/CurrentUserStore';

import { BiSave } from "@react-icons/all-files/bi/BiSave";
import Dropzone from 'react-dropzone';

import * as UI from '@sproutch/ui';
import { FaUpload } from "@react-icons/all-files/fa/FaUpload";
import { MdRefresh } from "@react-icons/all-files/md/MdRefresh";
export const CreateTodoHook = ({
  todoName,
  _onChangeText,
  fileExtension,

}: {
  todoName: string;
  _onChangeText: any;
  fileExtension: string
}) => {

  var [title, setTitle] = useState('')
  var [content, setContent] = useState('')
  var [data,] = useState('')
  var [type,] = useState('')
  var [ipfsHash, setIpsHash] = useState<any>('')
  var [file] = useState<any>('')
  var [fileName, setFileName] = useState<any>('')
  var fileType = ''

  async function _onPressSave() {
    setCargando(true)
    const metadata = { createdById: '', title, content, fileName };
    console.log('filename' + fileName)
    const file = new Moralis.File(fileName, { base64: data }, fileType, metadata);
    const currentUser = Moralis.User.current();
    console.log(currentUser)
    if (currentUser) {
      file.saveIPFS().then(function () {
        setIpsHash(file.hash())
        console.log(file.ipfs(), file.hash())
        console.log(ipfsHash)


        setCargando(false)
        NavContextStore.navigateToTodoList()
      }, function (error: any) {
        console.log(error)
        setCargando(false)
      })
    } else {
      console.log('error')
      setCargando(false)
      // show the signup or login page
    }


  }
  var [file, setFile] = useState<any>('')

  var file64: any
  var image: File

  const _onDropFile = async (files: File[]) => {
    image = files[0]
    let blob = new Blob(files);
    setFileUpload(blob)
    setFileName(files[0].name)
    console.log("filename 2 " + fileName)
    fileType = files[0].type
    CurrentUserStore.setExtension(files[0].type)
    var reader = new FileReader()

    reader.readAsDataURL(image)

    reader.onloadend = _loaded
  }
  const _loaded = async (evt: ProgressEvent | any) => {

    await setFile64(evt.target.result)
  }

  function setFileUpload(file: any) {


    setFile(URL.createObjectURL(file))
  }

  var [data, setData] = useState('')
  var [type, setType] = useState('')
  function setFile64(file: any) {
    file64 = file
    setData(file)
    console.log(file64)

    setType(fileType)

  }
  const [cargando, setCargando] = useState(false)
  const [isPlaying, setPlaying] = useState(false)
  const [volume, setVolumen] = useState(0.7)

  const handlePlay = () => {
    setPlaying(true)
  };

  const handlePause = () => {

    setPlaying(false)
  };

  function handleVolume(value: any) {
    setVolumen(value)
  };
  return <RX.View useSafeInsets={true} style={[_styles.container, Styles.statusBarTopMargin]}>
    <RX.Text style={[_styles.Text, { marginBottom: 10 }]} >
      {'Create new Item'}
    </RX.Text>
    <RX.Text style={[_styles.Text2, { marginBottom: 10 }]} >
      {'Image, Video, Audio, PDF or 3D Model:'}
    </RX.Text>
    <MdRefresh onClick={() => setData('')} style={{ width: 25, height: 25, marginLeft: 50, alignSelf: 'flex-start' }} />

    {data === '' ?

      <RX.View style={{
        borderStyle: 'dashed',
        justifyContent: 'center', alignItems: 'center',
        marginTop: 20, paddingLeft: 10, paddingRight: 10, marginLeft: 50, marginRight: 50,
        paddingTop: 10, height: 200, width: 400, borderWidth: 2, borderRadius: 10, marginBottom: 20, borderColor: 'black'
      }}>

        <Dropzone style={{ flex: 1, flexDirection: 'column', height: 200, width: 400, justifyContent: 'center', alignItems: 'center', alignSelf: 'stretch', }}
          onDrop={_onDropFile}>
          <RX.Text style={[_styles.Text, { width: 300, marginTop: 50, marginLeft: 35, textAlign: 'center', color: 'black', alignSelf: 'center', }]}>
            {'Drag & drop media file.'}
          </RX.Text>

          <FaUpload style={{ width: 40, height: 40, marginTop: 20, marginBottom: 20, marginLeft: 160, alignSelf: 'center' }} />
          <RX.Text style={[_styles.Text3, { width: 200, marginTop: 50, marginLeft: 100, textAlign: 'center', alignSelf: 'center', }]}>
            {'Max file size 60mb'}
          </RX.Text>

        </Dropzone>

      </RX.View>

      :
      <RX.View style={{ height: 200, width: 400 }}>
        {type === 'image/png' || type === 'image/jpeg' ? <RX.Image style={{ height: 200, width: 400 }} source={file} />
          : type === 'video/mp4' ?
            <VideoPlayer
              url={file}
              isPlaying={isPlaying}
              volume={volume}
              onPlay={handlePlay}
              onPause={handlePause}
              onVolume={handleVolume}
              height={'200px'}
              width={'400px'}
            />
            : type === 'audio/mpeg' ?
              <RX.View style={{ width: 400, height: 150, justifyContent: 'center', alignItems: 'center' }}>
                <ReactAudioPlayer
                  src={file}
                  autoPlay={false}
                  controls={true}
                />
              </RX.View> :
              <RX.Text onPress={() => console.log("type " + fileType)} style={[_styles.Text2, { marginBottom: 10 }]} >
                {'Archivo no compatible:'}
              </RX.Text>}

      </RX.View>
    }

    <RX.Text style={[_styles.Text2,]} >
      {'Name:'}
    </RX.Text>
    <RX.TextInput
      style={_styles.editTodoItem}
      value={title}

      placeholder={'Item Name'}
      onChangeText={setTitle}
      accessibilityId={'EditTodoPanelTextInput'}
    />


    <RX.Text style={[_styles.Text2, { marginTop: 10 }]} >
      {'Descripcion:'}
    </RX.Text>
    <RX.TextInput
      multiline={true}
      style={_styles.editTodoItem2}
      value={content}
      placeholder={'Provide a detailed description of your item'}
      onChangeText={setContent}
      accessibilityId={'EditTodoPanelTextInput'}
    />

    <RX.View style={_styles.buttonContainer}>
      {cargando ? <UI.Spinner color={'black'} /> : <UI.Button onPress={() => _onPressSave()} iconSlot={iconStyle => (
        <BiSave color={'black'} style={{ marginTop: 0, marginRight: 5, width: 16, height: 16 }} />
      )} style={{ content: [{ width: 160, borderRadius: 11, marginBottom: 20, }], label: { color: 'black', font: Fonts.displayBold } }
      } elevation={4} variant={"outlined"} label="Save" />
      }
    </RX.View>

  </RX.View>

}

