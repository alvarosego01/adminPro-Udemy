import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'graficoComponent',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  @Input() dataGraficos: any = {};

   doughnutChartLabels: string[];
   doughnutChartData: number[];
   doughnutChartType: string;

  constructor(){}

  ngOnInit() {
    this.doughnutChartLabels = this.dataGraficos.labels;
    this.doughnutChartData = this.dataGraficos.data;
    this.doughnutChartType = this.dataGraficos.type;
  }

}
