import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ResultComponent } from './components/result/result.component';

import { MatRadioModule} from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatTableModule} from '@angular/material/table';
import { MatCardModule} from '@angular/material/card';
import { MatListModule} from '@angular/material/list';

@NgModule({
    declarations: [
        AppComponent,
        IndexComponent,
        CheckoutComponent,
        ResultComponent,
    ],
    bootstrap: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule,
        MatRadioModule, MatExpansionModule, MatIconModule, MatGridListModule, MatTableModule, MatCardModule, MatListModule
    ],
    providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class AppModule { }
