import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-google-button',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './google-button.component.html',
  styleUrl: './google-button.component.scss'
})
export class GoogleButtonComponent {

  @Output() onClick = new EventEmitter<void>();

  handleClick(){
    this.onClick.emit();
  }

}
