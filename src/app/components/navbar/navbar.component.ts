import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  selectedOption: string = 'pending';

  constructor(private location: Location, private router: Router) {}

  ngOnInit(): void {
    const currentUrl = this.location.path();
    if (currentUrl.includes('reviewed')) {
      this.selectedOption = 'reviewed';
    } else if (currentUrl.includes('pending')) {
      this.selectedOption = 'pending';
    }
  }

  onToggleChange(event: any) {
    this.router.navigate([event.value]);
  }
}
