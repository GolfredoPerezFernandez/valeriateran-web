



import ImageSource from 'modules/images';

import * as UI from '@sproutch/ui';

export const ICOHook = ({
  isStackNav,
  width,
}: {
  width: number;
  isStackNav: boolean;
}) => {

  return (<RX.View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

    <RX.View style={{ width: isStackNav ? width : undefined, paddingTop: isStackNav ? 20 : 0, paddingBottom: isStackNav ? 20 : 0, flexDirection: isStackNav ? 'column' : 'row', alignItems: 'center', justifyContent: 'center' }}>

    </RX.View>
    <UI.Paper elevation={12} style={{ root: [{ marginTop: 12, borderRadius: 18, flex: isStackNav ? 30 : 30, marginRight: isStackNav ? 0 : 50, marginLeft: isStackNav ? 0 : 50, marginBottom: isStackNav ? 15 : 30, alignItems: 'center', justifyContent: 'center', height: 200, width: isStackNav ? 360 : 740 }] }}>

      <RX.Image style={{ width: 300, height: 150, marginTop: 40 }} source={ImageSource.logo} ></RX.Image>

    </UI.Paper>
  </RX.View>

  );
};

import * as RX from 'reactxp'

