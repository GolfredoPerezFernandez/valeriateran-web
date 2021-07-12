/*
* DeepLinkConverter.tsx
* Copyright: Microsoft 2018
*
* Converts between app (deep-link) URLs and navigation contexts.
*/

import * as assert from 'assert';

import * as _ from 'lodash';

import NavActions from '../app/NavActions';
import * as NavModels from '../models/NavModels';

import AppConfig from './AppConfig';

export default class DeepLinkConverter {
    static getUrlFromContext(context: NavModels.RootNavContext): string {
        let url = AppConfig.getFrontendBaseUrl();

        if (context.isStackNav) {
            const stackContext = context as NavModels.StackRootNavContext;
            const topViewContext = stackContext.stack[stackContext.stack.length - 1];

            if (topViewContext instanceof NavModels.TodoListViewNavContext) {
                url += '/nft';
                return url;
            } else if (topViewContext instanceof NavModels.ViewTodoViewNavContext) {
                url += '/nft?selected=' + encodeURIComponent(topViewContext.todoId);
                return url;
            } else if (topViewContext instanceof NavModels.NewTodoViewNavContext) {
                url += '/nft?selected=new';
                return url;
            } else if (topViewContext instanceof NavModels.HomeViewNavContext) {
                url += '/';
                return url;
            } else if (topViewContext instanceof NavModels.VideoNFTViewNavContext) {
                url += '/videoNFT';
                return url;
            }  else if (topViewContext instanceof NavModels.AudioNFTViewNavContext) {
                url += '/nft?selected=audioNFT';
                return url;
            }  else if (topViewContext instanceof NavModels.ImageNFTViewNavContext) {
                url += '/nft?selected=imageNFT';
                return url;
            } else if (topViewContext instanceof NavModels.SwapViewNavContext) {
                url += '/swap';
                return url;
            } else if (topViewContext instanceof NavModels.ObjectNFTViewNavContext) {
                url += '/nft?selected=objectNFT';
                return url;
            }else if (topViewContext instanceof NavModels.HomeViewNavContext) {
                url += '/';
                return url;
            } else if (topViewContext instanceof NavModels.ICOViewNavContext) {
                url += '/nft?selected=ICO';
                return url;
            }
        } else {
            const compositeContext = context as NavModels.CompositeRootNavContext;
            if (compositeContext instanceof NavModels.TodoRootNavContext) {
                url += '/';
                const todoListContext = context as NavModels.TodoRootNavContext;
                if (todoListContext.showNewTodoPanel) {
                    url += 'nft?selected=new';
                } else if (todoListContext.todoList.selectedTodoId) {
                    url += 'nft?selected=' + encodeURIComponent(todoListContext.todoList.selectedTodoId);
                }  else if (todoListContext.showVideoNFT) {
                    url += 'videoNFT';
                }  else if (todoListContext.showAudioNFT) {
                    url += 'nft?selected=audioNFT';
                }  else if (todoListContext.showImageNFT) {
                    url += 'nft?selected=imageNFT';
                }  else if (todoListContext.showObjectNFT) {
                    url += 'nft?selected=objectNFT';
                } else if (todoListContext.showSwap) {
                    url += 'swap';
                } else if (todoListContext.showICO) {
                  
                    url += '/nft?selected=ICO';
                }  else if (todoListContext.showHomePanel) {
                    url += '';
                }
                return url;
            
            } else {
                assert.fail('Unimplemented');
            }
        }

        return '';
    }

    static getContextFromUrl(url: string, isStackNav: boolean): NavModels.RootNavContext | undefined {
        const urlObj = new URL(url);
        if (!urlObj) {
            return undefined;
        }

        const pathElements = _.map(_.split(urlObj.pathname, '/'), elem => decodeURIComponent(elem));
        if (pathElements.length < 2) {
            return undefined;
        }

        switch (pathElements[1]) {
            case 'nft':
                
                let selectedTodoId: string | undefined;
                let showNewPanel = false;
                let showVideoNFTPanel = false;
                let showAudioNFTPanel = false;
                let showImageNFTPanel = false;
                let showObjectNFT = false;
                let showSwap = false;

                let showICO = false;

                const selectedValue = urlObj.searchParams.get('selected');
                if (selectedValue === 'new') {
                    showNewPanel = true;
                } else if (selectedValue) {
                    selectedTodoId = selectedValue;
                }  else if (selectedValue==='videoNFT') {
                    selectedTodoId=undefined;
                    showVideoNFTPanel = true;
                }  else if (selectedValue==='imageNFT') {
                    selectedTodoId=undefined;

                    showImageNFTPanel = true;
                } else if (selectedValue==='audioNFT') {
                    selectedTodoId=undefined;

                    showAudioNFTPanel = true;
                } else if (selectedValue==='objectNFT') {
                    selectedTodoId=undefined;
                    showObjectNFT = true;
                } else if (selectedValue==='ICO') {         
                    selectedTodoId=undefined;
                    showICO = false;
                } 

                return NavActions.createTodoListContext(isStackNav, selectedTodoId, showNewPanel,showSwap,showVideoNFTPanel,showAudioNFTPanel,showImageNFTPanel,showObjectNFT,showICO);
         case 'ico':
                  return NavActions.createTodoListContext(isStackNav, undefined, false,false,false,false,false,false,true);
        case 'videoNFT':
                    return NavActions.createTodoListContext(isStackNav, undefined, false,false,false,true,false,false,false);
        case 'swap':
                    return NavActions.createTodoListContext(isStackNav, undefined, false,true,false,false,false,false,false);
  
            default:
                return NavActions.createTodoListContext(isStackNav, undefined, false,true);;
        }
    }
}
