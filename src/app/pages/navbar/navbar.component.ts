import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {User} from "../../interface/user";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  @Input() user: User;

  constructor(private router: Router, private userService: UserService) {
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

}
