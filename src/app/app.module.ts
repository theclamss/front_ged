import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

//Import all material modules
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Import Layouts
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

// Vertical Layout
import { SidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { HeaderComponent } from './layouts/full/header/header.component';
import { BrandingComponent } from './layouts/full/sidebar/branding.component';
import { AppNavItemComponent } from './layouts/full/sidebar/nav-item/nav-item.component';
import {ProjectComponent} from "./pages/project/project.component";
import {RequestInterceptor} from "./interceptor/RequestInterceptor";
import { TokenMockService } from './services/ephemere/token-mock.service';

//TODO : enlever la simulation APPINITILIZER et le service mocktoken quand le backend est pret

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    BlankComponent,
    SidebarComponent,
    HeaderComponent,
    BrandingComponent,
    AppNavItemComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TablerIconsModule.pick(TablerIcons),
  ],
  exports: [TablerIconsModule],
  providers: [
    // Fournisseur pour enregistrer l'interceptor globalement
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true, // Permet d'enchaîner plusieurs interceptors si nécessaire
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (tokenMockService: TokenMockService) => () => tokenMockService.storeMockToken(),
      deps: [TokenMockService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
