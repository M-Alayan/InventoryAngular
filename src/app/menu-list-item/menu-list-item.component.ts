import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NavItem } from 'src/models/nav-item';
import { NavService } from '../services/nav.service';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.css'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class MenuListItemComponent implements OnInit {
  @Input() item: NavItem | undefined;
  @Input() depth: number | undefined;
  expanded: boolean = false;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;

  constructor(public navService: NavService,
    public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {
    debugger

    this.navService.currentUrl.subscribe((url: string) => {
      debugger
      if (this.item != undefined) {
        if (this.item!.route && url) {
          this.expanded = url.indexOf(`/${this.item!.route}`) === 0;
          this.ariaExpanded = this.expanded;
        }
      }
    });
  }

  onItemSelected(item: NavItem) {
    debugger
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
    }

    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }
}
