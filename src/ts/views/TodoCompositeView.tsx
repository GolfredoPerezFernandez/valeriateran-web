/*
* TodoCompositeView.tsx
* Copyright: Microsoft 2018
*
* Main view that provides a composite view of todos on the left and
* details of the selected todo on the right.
*/

import * as RX from 'reactxp';
import { ComponentBase } from 'resub';

import NavContextStore from '../stores/NavContextStore';
import * as NavModels from '../models/NavModels';
import { Colors, Fonts } from '../app/Styles';

import CreateTodoPanel from './CreateTodoPanel';
import TodoListPanel from './TodoListPanel';
import TodoListPanel2 from './TodoListPanel2';
import ViewTodoPanel from './ViewTodoPanel';
import { HomeHook } from './HomeHook';
import { SwapHook } from './SwapHook';
import { ICOHook } from './ICOHook';


import { VideoNFTHook } from './VideoNFTHook';

import * as UI from '@sproutch/ui';
import TodoListPanel3 from './TodoListPanel3';
import CurrentUserStore from '../stores/CurrentUserStore';

interface Entries {
    img: string;
    imgText: string;
    title: string;
    content: string;
}


export interface TodoCompositeViewProps extends RX.CommonProps {
    navContext: NavModels.TodoRootNavContext;
    entries: Entries[];
    isStackNav: boolean;
    width: number;
    isConnect: boolean;
    showSideMenu: boolean;
}

interface TodoCompositeViewState {
    activeId: string
}

const _styles = {
    viewContainer: RX.Styles.createViewStyle({
        flex: 1,
        alignSelf: 'stretch',
        flexDirection: 'row',
    }),
    leftPanelContainer: RX.Styles.createViewStyle({

        flexDirection: 'column',
    }),
    leftPanelContainer2: RX.Styles.createViewStyle({
        width: 400,
        flexDirection: 'column',
    }),
    rightPanelContainer: RX.Styles.createViewStyle({
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.grayF8,
    }),
};


export default class TodoCompositeView extends ComponentBase<TodoCompositeViewProps, TodoCompositeViewState> {
    protected _buildState(props: TodoCompositeViewProps, initState: boolean): Partial<TodoCompositeViewState> | undefined {
        const partialState: Partial<TodoCompositeViewState> = {
            activeId: CurrentUserStore.getActive()

        };
        return partialState;
    }
    render(): JSX.Element | null {
        return (
            <RX.View style={_styles.viewContainer}>
                <RX.View style={[_styles.leftPanelContainer, { width: this.props.showSideMenu ? 310 : 60 }]}>
                    <TodoListPanel2
                        showSideMenu={this.props.showSideMenu}
                        selectedTodoId={this.props.navContext.todoList.selectedTodoId || ''}
                        onSelect={this._onSelectTodo}
                        onCreateNew={this._onCreateNewTodo}
                    />

                </RX.View>

                <RX.View style={_styles.rightPanelContainer}>
                    {this._renderRightPanel()}
                </RX.View>
                {this.props.isConnect ? <RX.View style={_styles.leftPanelContainer2}>
                    <RX.View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        {this.state.activeId === 'all' ? <UI.Button onPress={() => this.goToAll()} palette='primary' style={{ root: [{}], content: [{ width: 200, backgroundColor: 'black' }], label: { color: 'white', font: Fonts.displayBold } }
                        } elevation={4} variant={"outlined"} label="All NFTs" /> : <UI.Button onPress={() => this.goToAll()} style={{ content: [{ width: 200, }], label: { color: 'black', font: Fonts.displayBold } }
                        } elevation={4} variant={"outlined"} label="All NFTs" />}

                        {this.state.activeId === 'My' ?
                            <UI.Button onPress={() => this.goToMy()} palette={'primary'} style={{ content: [{ width: 200, backgroundColor: 'black' }], label: { color: 'white', font: Fonts.displayBold } }
                            } elevation={4} variant={"outlined"} label="My NFTs" /> : <UI.Button onPress={() => this.goToMy()} style={{ content: [{ width: 200, }], label: { color: 'black', font: Fonts.displayBold } }
                            } elevation={4} variant={"outlined"} label="My NFTs" />}
                    </RX.View>
                    {this.state.activeId !== 'all' ?

                        <TodoListPanel
                            selectedTodoId={this.props.navContext.todoList.selectedTodoId || ''}
                            onSelect={this._onSelectTodo}
                            onCreateNew={this._onCreateNewTodo}
                        /> :
                        <TodoListPanel3
                            selectedTodoId={this.props.navContext.todoList.selectedTodoId || ''}
                            onSelect={this._onSelectTodo}
                            onCreateNew={this._onCreateNewTodo}
                        />
                    }
                </RX.View> : null
                }
            </RX.View>
        );
    }

    private _renderRightPanel() {
        if (this.props.navContext.showNewTodoPanel) {
            return (
                <CreateTodoPanel />
            );
        } else if (this.props.navContext.showHomePanel) {
            return (
                <HomeHook width={this.props.width} isStackNav={this.props.isStackNav} entries={this.props.entries} />
            );
        } else if (this.props.navContext.todoList.selectedTodoId) {
            return (
                <ViewTodoPanel isStackNav={this.props.isStackNav} todoId={this.props.navContext.todoList.selectedTodoId} />
            );
        } else if (this.props.navContext.showSwap) {
            return (
                <SwapHook />
            );
        } else if (this.props.navContext.showVideoNFT) {
            return (
                <VideoNFTHook />
            );
        } else if (this.props.navContext.showICO) {
            return (
                <ICOHook width={this.props.width} isStackNav={this.props.isStackNav} />
            );
        } else {
            return <HomeHook width={this.props.width} isStackNav={this.props.isStackNav} entries={this.props.entries} />;
        }
    }

    private _onSelectTodo = (todoId: string) => {
        NavContextStore.navigateToTodoList(todoId, false);
    };

    private goToAll() {
        CurrentUserStore.setActive('all')
    };
    private goToMy() {
        CurrentUserStore.setActive('My')
    };

    private _onCreateNewTodo = () => {
        NavContextStore.navigateToTodoList('', true);
    };
}
