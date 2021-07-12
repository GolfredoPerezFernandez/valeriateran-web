/*
* TopBarComposite.tsx
* Copyright: Microsoft 2018
*
* Horizontal bar that appears on the top of every view within the app
* when it's using composite layout (as opposed to stack-based layout).
*/

import * as RX from 'reactxp';
import { ComponentBase } from 'resub';

import HoverButton from '../controls/HoverButton';
import { Colors, Fonts, FontSizes } from '../app/Styles';
import VerticalSeparator from '../controls/VerticalSeparator';

import * as UI from '@sproutch/ui';

const _styles = {
    background: RX.Styles.createViewStyle({
        alignSelf: 'stretch',
        height: 50,
        borderBottomWidth: 1,
        borderColor: Colors.gray66,
        flexDirection: 'row',
        paddingHorizontal: 16,
    }),
    logoContainer: RX.Styles.createViewStyle({
        flexDirection: 'row',
        marginLeft: 5,
        alignItems: 'center',
    }),
    barControlsContainer: RX.Styles.createViewStyle({
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row',
    }),
    logoImage: RX.Styles.createImageStyle({
        height: 24,
        width: 26,
    }),
    logoText: RX.Styles.createTextStyle({
        font: Fonts.displayBold,
        fontSize: FontSizes.size20,
        marginLeft: 30,
        marginHorizontal: 4,
        color: Colors.logoColor,
    }),
    linkText: RX.Styles.createTextStyle({
        font: Fonts.displayRegular,
        fontSize: FontSizes.menuItem,
        marginHorizontal: 8,
        color: Colors.menuText,
    }),
    linkTextHover: RX.Styles.createTextStyle({
        color: Colors.menuTextHover,
    }),
    backButtonContainer: RX.Styles.createViewStyle({
        flexDirection: 'row',
        alignItems: 'center',
    }),
    backText: RX.Styles.createTextStyle({
        font: Fonts.displayRegular,
        fontSize: FontSizes.size16,
        color: Colors.menuText,
    }),
};

export interface TopBarCompositeProps extends RX.CommonProps {
    showBackButton: boolean;
    showSideMenu: boolean;
    onBack?: () => void;
}

interface TopBarCompositeState {
    isRegister: boolean
}

import { AiOutlineMenuFold } from "@react-icons/all-files/ai/AiOutlineMenuFold";

import { AiOutlineMenuUnfold } from "@react-icons/all-files/ai/AiOutlineMenuUnfold";
import { FaWallet } from "@react-icons/all-files/fa/FaWallet";
import CurrentUserStore from '../stores/CurrentUserStore';

import SimpleDialog from '../controls/SimpleDialog';
const _confirmDeleteDialogId = 'delete';

export default class TopBarComposite extends ComponentBase<TopBarCompositeProps, TopBarCompositeState> {
    protected _buildState(props: TopBarCompositeProps, initState: boolean): Partial<TopBarCompositeState> | undefined {
        const partialState: Partial<TopBarCompositeState> = {
            isRegister: CurrentUserStore.getRegister()
        };
        return partialState;
    }


    setSideMenu(params: boolean) {
        CurrentUserStore.setSideMenu(params)
    }

    async login() {
        // const Moralis = require('moralis');
        // Moralis.initialize("fJFTnFBJhMIrDJdOGvimIqf7eP79v8sf0teXxFY3");

        // Moralis.serverURL = 'https://cfpfjbpehbkg.moralis.io:2053/server'
        //      CurrentUserStore.setConnect(true)   
        //     try {

        //         Moralis.Web3.authenticate().then(()=>{


        //     }  )
        //         // Hooray! Let them use the app now.
        //     } catch (error) {
        //         // Show the error message somewhere and let the user try again.
        //         alert("Error: " + error.code + " " + error.message);
        //     }

    }
    render(): JSX.Element | null {
        let leftContents: JSX.Element | undefined;

        if (this.props.showBackButton) {
            leftContents = (
                <HoverButton onPress={this._onPressBack} onRenderChild={this._renderBackButton} />
            );
        } else {
            leftContents = (
                <RX.View style={{ justifyContent: 'center', alignItems: 'center' }} >
                    <RX.View style={_styles.logoContainer}>  <RX.Button>{this.props.showSideMenu ?

                        <AiOutlineMenuFold onClick={() => this.setSideMenu(false)} style={{ width: 20, height: 20 }} />
                        :
                        <AiOutlineMenuUnfold onClick={() => this.setSideMenu(true)} style={{ width: 20, height: 20 }} />}
                    </RX.Button>
                        <RX.Text style={_styles.logoText}>

                            {'ValeriaTeran'}
                        </RX.Text>
                    </RX.View>
                </RX.View>
            );
        }
        return (
            <RX.View style={_styles.background}>
                {leftContents}
                <RX.View style={_styles.barControlsContainer}>
                    {false ?
                        <UI.Button onPress={this._onPressModal} iconSlot={iconStyle => (
                            <FaWallet color={'black'} style={{ marginTop: 0, marginRight: 5, width: 16, height: 16 }} />
                        )} style={{ content: [{ width: 160, borderRadius: 11, }], label: { color: 'black', font: Fonts.displayBold } }
                        } elevation={4} variant={"outlined"} label="Subir Imagen" />
                        :
                        <RX.View> <VerticalSeparator />
                            <HoverButton onPress={this._onPressHelp} onRenderChild={this._onRenderHelpButton} />
                            <VerticalSeparator />
                        </RX.View>}
                    {true ?
                        <UI.Button onPress={this._onPressModal} iconSlot={iconStyle => (
                            <FaWallet color={'black'} style={{ marginTop: 0, marginRight: 5, width: 16, height: 16 }} />
                        )} style={{ content: [{ width: 160, borderRadius: 11, }], label: { color: 'black', font: Fonts.displayBold } }
                        } elevation={4} variant={"outlined"} label="Access" />
                        :
                        <RX.View> <VerticalSeparator />

                            <VerticalSeparator />
                        </RX.View>}

                </RX.View>
            </RX.View>
        );
    }

    private _onPressModal = (e: RX.Types.SyntheticEvent) => {
        e.stopPropagation();

        const dialog = (
            <SimpleDialog
                dialogId={_confirmDeleteDialogId}
                text={''}
                containerStyle={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}
                maxHeight={600}
                maxWidth={400}
                isRegister={this.state.isRegister}

                buttons={[{
                    text: 'Login',
                    onPress: () => {
                        SimpleDialog.dismissAnimated(_confirmDeleteDialogId);
                    },
                }, {
                    text: 'Register',
                    isCancel: false,
                    onPress: () => {

                        console.log(this.state.isRegister)
                        CurrentUserStore.setRegister(true)
                        console.log(this.state.isRegister)
                    },
                }]}
            />
        );

        RX.Modal.show(dialog, _confirmDeleteDialogId);
    };
    private _onPressBack = (e: RX.Types.SyntheticEvent) => {
        e.stopPropagation();

        if (this.props.onBack) {
            this.props.onBack();
        }
    };

    private _renderBackButton = (isHovering: boolean) => (
        <RX.View style={_styles.backButtonContainer}>
            <RX.Text style={[_styles.backText, isHovering ? _styles.linkTextHover : undefined]}>
                {'Back'}
            </RX.Text>
        </RX.View>
    );


    private _onPressHelp = (e: RX.Types.SyntheticEvent) => {
        e.stopPropagation();

        RX.Linking.openUrl('https://www.bing.com/search?q=help');
    };

    private _onRenderHelpButton = (isHovering: boolean) => {
        const textStyles = [_styles.linkText];
        if (isHovering) {
            textStyles.push(_styles.linkTextHover);
        }

        return (
            <RX.Text style={textStyles}>
                {'Help'}
            </RX.Text>
        );
    };
}
