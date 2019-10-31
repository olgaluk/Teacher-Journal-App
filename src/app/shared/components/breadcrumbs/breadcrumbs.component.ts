import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';
import { filter } from 'rxjs/operators';
import { map } from 'rxjs/internal/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs: any[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => this.activateRoute))
      .pipe(map((route) => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }))
      .pipe(filter(route => route.outlet === PRIMARY_OUTLET))
      .subscribe(route => {
        let url = this.router.routerState.snapshot.url;
        let breadcrumbsLabelList = url.split('/');
        let breadcrumbLinksList = [breadcrumbsLabelList[0]];

        for (let i = 1; i <= breadcrumbsLabelList.length; i++) {
          const link = breadcrumbLinksList[i - 1] + '/' + breadcrumbsLabelList[i];
          breadcrumbLinksList.push(link);
        }

        const addingBreadcrumbs = breadcrumbsLabelList
          .map(label => { if (label) return label[0].toUpperCase() + label.slice(1) })
          .map((label, index) => {
            return {
              url: breadcrumbLinksList[index],
              label: label
            };
          });

        addingBreadcrumbs.splice(0, 1, {
          url: "",
          label: "Main"
        });

        this.breadcrumbs = addingBreadcrumbs;
      });
  }
}
