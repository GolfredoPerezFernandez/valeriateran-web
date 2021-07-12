/*
* NavActions.tsx
* Copyright: Microsoft 2018
*
* Constructs navigation contexts.
*/

import * as NavModels from '../models/NavModels';

export default class NavActions {
    static createTodoListContext(useStackNav: boolean, selectedTodoId?: string, showNewTodoPanel = false,showHomePanel=false, showSwap=false,showVideoNFT=false,showAudioNFT=false,showImageNFT=false,showObjectNFT=false,showICO =false) {
        if (useStackNav) {
            const navContext = new NavModels.StackRootNavContext();
            navContext.stack.push(new NavModels.TodoListViewNavContext(selectedTodoId));
            if (showNewTodoPanel) {
                navContext.stack.push(new NavModels.NewTodoViewNavContext());
            } else if (selectedTodoId !== undefined) {
                navContext.stack.push(new NavModels.ViewTodoViewNavContext(selectedTodoId));
            } else if (showHomePanel) {
                navContext.stack.push(new NavModels.HomeViewNavContext());
            } else if (showVideoNFT) {
                navContext.stack.push(new NavModels.VideoNFTViewNavContext());
            }else if (showAudioNFT) {
                navContext.stack.push(new NavModels.AudioNFTViewNavContext());
            }else if (showImageNFT) {
                navContext.stack.push(new NavModels.ImageNFTViewNavContext());
            }else if (showObjectNFT) {
                navContext.stack.push(new NavModels.ObjectNFTViewNavContext());
            } else if (showSwap) {
                navContext.stack.push(new NavModels.SwapViewNavContext());
            } else if (showICO) {
                navContext.stack.push(new NavModels.ICOViewNavContext());
            }
            return navContext;
        } else {
            return new NavModels.TodoRootNavContext(selectedTodoId, showNewTodoPanel,showHomePanel,showSwap,showVideoNFT,showAudioNFT,showImageNFT,showObjectNFT,showICO);
        }
    }
}
