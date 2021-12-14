import { Component } from '@angular/core';
import { Schema } from './schema/schema';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Indices 3.0 - Mock API Schema';
  schema: any = Schema.entities;
}
