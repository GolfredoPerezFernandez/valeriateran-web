/**
* ViewTodoPanel.tsx
* Copyright: Microsoft 2017
*
* The Todo item edit view.
*/

import * as RX from 'reactxp';
import { ComponentBase } from 'resub';

import { FontSizes } from '../app/Styles';
import { Todo } from '../models/TodoModels';
import TodosStore from '../stores/TodosStore';

export interface ViewTodoPanelProps extends RX.CommonProps {
    todoId: string;
    isStackNav: boolean;
}

interface ViewTodoPanelState {
    todo: Todo;
}

const _styles = {
    container: RX.Styles.createViewStyle({
        flex: 1, alignItems: 'center', justifyContent: 'center'
    }),
    todoText: RX.Styles.createTextStyle({
        margin: 8,
        fontSize: FontSizes.size16,
        alignSelf: 'stretch',
        backgroundColor: 'transparent',
    }),
    buttonContainer: RX.Styles.createViewStyle({
        margin: 8,
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }),
};


import * as UI from '@sproutch/ui';
export default class ViewTodoPanel extends ComponentBase<ViewTodoPanelProps, ViewTodoPanelState> {
    protected _buildState(props: ViewTodoPanelProps, initState: boolean): Partial<ViewTodoPanelState> {
        const newState: Partial<ViewTodoPanelState> = {
            todo: props.todoId === 'videoNFT' || props.todoId === 'ICO' || props.todoId === 'objectNFT' || props.todoId === 'imageNFT' || props.todoId === 'swap' ? TodosStore.getTodo2ById(props.todoId) : TodosStore.getTodoById(props.todoId),
        };

        return newState;
    }

    render() {
        return (
            <RX.View useSafeInsets={true} style={_styles.container}>
                <UI.Paper elevation={12} style={{ root: [{ marginTop: 12, borderRadius: 18, flex: this.props.isStackNav ? 30 : 30, marginRight: this.props.isStackNav ? 0 : 50, marginLeft: this.props.isStackNav ? 0 : 50, marginBottom: this.props.isStackNav ? 15 : 30, alignItems: 'center', justifyContent: 'center', height: 200, width: this.props.isStackNav ? 360 : 740 }] }}>

                    <RX.View style={{ flex: 35 }}>
                        <RX.Text style={_styles.todoText}>
                            {this.state.todo ? this.state.todo.text : ''}
                        </RX.Text>

                        <RX.View style={_styles.buttonContainer}>
                        </RX.View>

                    </RX.View>

                </UI.Paper>
            </RX.View>
        );
    }

}
