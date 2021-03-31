import { Component, OnInit } from '@angular/core';
import { TestService } from '../../core/services/test.service';
import { AuthenticationService } from '../../core/services';
import { User } from '../../shared';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  testServiceResponse = '';
  user: User = new User();

  constructor(
    private testService: TestService,
    private authenticationService: AuthenticationService) {

  }

  ngOnInit() {
    this.testServiceResponse = this.testService.test();
    this.user = this.authenticationService.getUser();
  }


}
