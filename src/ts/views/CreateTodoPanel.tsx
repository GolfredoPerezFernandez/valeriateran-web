/**
* CreateTodoPanel.tsx
* Copyright: Microsoft 2017
*
* The Todo item edit view.
*/

import * as RX from 'reactxp';

import TodosStore from '../stores/TodosStore';
import { CreateTodoHook } from './CreateTodoHook';

interface CreateTodoPanelProps extends RX.CommonProps {
}

interface CreateTodoPanelState {
    todoText: string;
    file: File[] | undefined;
    extension:string;
}

export default class CreateTodoPanel extends RX.Component<CreateTodoPanelProps, CreateTodoPanelState> {
    protected _buildState(props: CreateTodoPanelProps, initState: boolean): Partial<CreateTodoPanelState> | undefined {
       
        let partialState: Partial<CreateTodoPanelState> = {          
            extension:TodosStore.getExtension(),
            todoText:'' 
        };
        return partialState;
    } 
  
    render() {
        return  <CreateTodoHook fileExtension={this.state?.extension} _onChangeText={this._onChangeText} todoName={this.state?.todoText}/>

    }

    private _onChangeText = (newText: string) => {
        this.setState({ todoText: newText });
    };

}
