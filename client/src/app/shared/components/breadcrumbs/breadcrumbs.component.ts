import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface IBreadcrumbs {
  url: string;
  label: string;
}

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs: IBreadcrumbs[] = [];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.events
      .subscribe(() => {
        const url: string = this.router.routerState.snapshot.url;
        const breadcrumbsLabelList: string[] = url.split('/');

        const breadcrumbLinksList: string[] = [];
        breadcrumbsLabelList.forEach((label, index) => {
          if (index === 0) breadcrumbLinksList.push(label);
          if (index > 0) {
            const link = breadcrumbLinksList[index - 1] + '/' + label;
            breadcrumbLinksList.push(link);
          }
        });

        this.breadcrumbs = breadcrumbsLabelList
          .map((label, index) => {
            if (index === 0) return { url: "", label: "main" };

            return {
              url: breadcrumbLinksList[index],
              label: label
            };
          });
      });
  }
}
