import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthProvider } from '../providers/auth/auth';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenProvider } from '../providers/token/token';
import { TokenInterceptor } from '../providers/token-interceptor';
import { MessageProvider } from '../providers/message/message';
import { PostProvider } from '../providers/post/post';
import { UsersProvider } from '../providers/users/users';
import { EmojiPickerModule } from '@ionic-tools/emoji-picker';

@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    EmojiPickerModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    TokenProvider,
    MessageProvider,
    PostProvider,
    UsersProvider,
    Camera
  ]
})
export class AppModule {}
