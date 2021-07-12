/**
* index.web.ts
* Copyright: Microsoft 2018
*
* Web implementation of "images" module.
*/

import AppConfig from '../../app/AppConfig';

import { ImageSourceBase } from './Images';

class ImageSource implements ImageSourceBase {
    todoLogo = AppConfig.getImagePath('todo-logo.png');
    todoSmall = AppConfig.getImagePath('todo-small.png');
    caru1 = AppConfig.getImagePath('caru1.png');
    caru2 = AppConfig.getImagePath('caru2.png');
    caru3 = AppConfig.getImagePath('caru3.png');
    logo = AppConfig.getImagePath('logo.png');
}

export default new ImageSource();
