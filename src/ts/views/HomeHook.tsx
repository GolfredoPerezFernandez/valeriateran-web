

import { Fonts, } from '../app/Styles';

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
    width: 500,
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
  contentStyle3: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center'
  })
}

interface Entries {
  img: string;
  imgText: string;
  title: string;
  content: string;
}


const { Carousel } = require('reactxp-carousel')

import ImageSource from 'modules/images';

import * as UI from '@sproutch/ui';

interface Entries {
  img: string;
  imgText: string;
  title: string;
  content: string;
}

export const HomeHook = ({
  entries,
  isStackNav,
  width,
}: {
  entries: Entries[];
  width: number;
  isStackNav: boolean;
}) => {

  return (<RX.View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

    <UI.Paper elevation={12} style={{ root: [{ marginTop: 12, borderRadius: 18, flex: isStackNav ? 30 : 30, marginRight: isStackNav ? 0 : 50, marginLeft: isStackNav ? 0 : 50, marginBottom: isStackNav ? 15 : 30, alignItems: 'center', justifyContent: 'center', height: 200, width: isStackNav ? 360 : 740 }] }}>

      <RX.Image style={{ width: 300, height: 150, marginTop: 40 }} source={ImageSource.logo} ></RX.Image>

      <Carousel
        autoplay={true}
        lockScrollWhileSnapping={true}
        data={entries}
        enableMomentum={false}
        renderItem={({ item, index }: { item: Entries, index: number }) => {
          return (<RX.View style={{ flex: 1, alignSelf: 'center', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <RX.Image resizeMode={'cover'}
              style={{ width: 440, height: 360, borderRadius: 18 }}
              source={item.img}
            />
            <RX.View style={{
              width: 360,
              height: 100, backgroundColor: 'white'
            }}>
              <RX.Text style={_styles.titleStyle4}>{item.content}</RX.Text>

              <RX.Text style={_styles.titleStyle3}>{"Created By " + item.title}</RX.Text>

            </RX.View>
          </RX.View>);
        }}
        sliderWidth={isStackNav ? 360 : 740}

        itemWidth={isStackNav ? 360 : 740}

        containerCustomStyle={[_styles.slider,]}
        contentContainerCustomStyle={[_styles.sliderContentContainer]}
        layoutCardOffset={0}
        layout={'default'}
        scrollEnabled={false}
        loop={true}
        vertical={false}
        showsHorizontalScrollIndicator={true}
      />
    </UI.Paper>
  </RX.View>

  );
};

import * as RX from 'reactxp'

