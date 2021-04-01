import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostBinding, Inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemingService } from 'src/app/services/theming.service';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.scss']
})
export class PortfolioPageComponent implements OnInit {
  @HostBinding('class') public cssClass: string;
  themingSubscription: Subscription;
  themes: string[];

  constructor(
    private themingService: ThemingService,
    private overlayContainer: OverlayContainer,
    @Inject(DOCUMENT) document
  ) { }

  ngOnInit() {
    this.themingSubscription = this.themingService.theme.subscribe((theme: string) => {
      this.cssClass = theme;
      this.applyThemeOnOverlays();
    });
  }

  changeTheme(theme: string) {
    this.themingService.theme.next(theme);
  }





  /**
   * Apply the current theme on components with overlay (e.g. Dropdowns, Dialogs)
   */
  private applyThemeOnOverlays() {
    // remove old theme class and add new theme class
    // we're removing any css class that contains '-theme' string but your theme classes can follow any pattern
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(this.themingService.themes);
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add(this.cssClass);
  }

  ngOnDestroy() {
    this.themingSubscription.unsubscribe();
  }

  scrollTo(link) {
    console.log(document)
    document.getElementById(link).scrollIntoView();
  }
}
