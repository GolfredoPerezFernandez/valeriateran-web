/**
* CurrentUserStore.tsx
* Copyright: Microsoft 2018
*
* Singleton store that maintains information about the currently-signed-in user.
*/

import { autoSubscribe, AutoSubscribeStore, StoreBase } from 'resub';

import { User } from '../models/IdentityModels';

@AutoSubscribeStore
export class CurrentUserStore extends StoreBase {
    // TODO - properly initialize
    private _user: User = {
        id: '1',
        fullName: 'Adam Smith',
        email: 'adam.smith@sample.com',
    };
    private _sideMenu=true

    private _email=''
    private _error=''
    private _password=''
    private _username=''
    private _password2=''
    private _isConnect=false
    private _isRegister=false

    @autoSubscribe
    getUser(): User | undefined {
        return this._user;
    }

    @autoSubscribe
    getFullName(): string {
        return this._user ? this._user.fullName : '';
    }
    

    private activeId:string='all'
    @autoSubscribe
    getActive() {
        
        return this.activeId
    }  
    
    setActive(password:string){
        this.activeId=password
        this.trigger()
    }
    private _extension:string=''
    @autoSubscribe
    getExtension() {
        
        return this._extension
    }  
    
    setExtension(password:string){
        this._extension=password
        this.trigger()
    }
    @autoSubscribe
    getIsConnect(): boolean {
        return this._isConnect
    }
    
    setIsConnect(side: boolean) {
        this._isConnect=side
        this.trigger();

    }
    @autoSubscribe
    getSideMenu(): boolean {
        return this._sideMenu
    }
    
    setEmail(side: string) {
        this._email=side
        this.trigger();

    }
    @autoSubscribe
    getEmail(): string {
        return this._email
    }
    
    setRegister(side: boolean) {
        this._isRegister=side
        this.trigger();

    }
    @autoSubscribe
    getRegister(): boolean {
        return this._isRegister
    }
    
    setSideMenu(side: boolean) {
        this._sideMenu=side
        this.trigger();

    }
    setConnect(is: boolean) {
        this._isConnect=is
        this.trigger()
    }
    
    setError(side: string) {
        this._error=side
        this.trigger();

    }
    @autoSubscribe
    getError(): string {
        return this._error
    }
    setUserName(user: string) {
        this._username=user
        this.trigger();

    }
    @autoSubscribe
    getUserName(): string {
        return this._username
    }
    setPassword(side: string) {
        this._password=side
        this.trigger();

    }
    @autoSubscribe
    getPassword(): string {
        return this._password
    }
    setPassword2(side: string) {
        this._password2=side
        this.trigger();

    }
    @autoSubscribe
    getPassword2(): string {
        return this._password2
    }
}

export default new CurrentUserStore();
