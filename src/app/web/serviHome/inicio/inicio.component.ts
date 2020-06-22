import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/service/navbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake
import { PdfMakeWrapper, Canvas, Line, PageReference, Txt, Img, Columns, TocItem } from 'pdfmake-wrapper';
import { DatePipe, formatDate } from '@angular/common';
// declare var drawGauge: any;
// import '../../../../assets/js/sb-admin-2.min.js';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [DatePipe]
})
export class InicioComponent implements OnInit {

  cliente = false;
  admin = false;
  empleado = false;
  empresa = false;
  public role = '';
  data: any;
  data2: any;
  data3: any;
  currentDate = new Date();



  constructor(public nav: NavbarService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private datePipe: DatePipe) {



    this.data = {
      labels: ['Exelente','Bueno','Regular','Malo','Muy malo'],
      datasets: [
          {
              data: [7, 3, 4, 5, 5],
              backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  '#1E88E5'
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  '#1E88E5'
              ]
          }]
      };
      this.data2 = {
        labels: ['Lento','Normal','Rápido'],
        datasets: [
            {
                data: [20, 30, 50],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ]
            }]
        };
        this.data3 = {
          labels: ['No Recomendaría','Tal Vez','Recomendaría'],
          datasets: [
              {
                  data: [3, 50, 100],
                  backgroundColor: [
                      "#FF6384",
                      "#36A2EB",
                      "#FFCE56"
                  ],
                  hoverBackgroundColor: [
                      "#FF6384",
                      "#36A2EB",
                      "#FFCE56"
                  ]
              }]
          };
    this.activatedRoute.params.subscribe(params => {
      this.role = params.idrole;

    });

    if (sessionStorage.getItem('idrole')=='2') {
      this.cliente = true;
    } else if (sessionStorage.getItem('idrole')=='1') {
      this.admin = true;
    } else if (sessionStorage.getItem('idrole')=='3') {
      this.empleado = true;
    } else if (sessionStorage.getItem('idrole')=='4') {
      this.empresa = true;
    }
    this.nav.hide();
    this.nav.doSomethingElseUseful();

    if ((sessionStorage.getItem('idrole') == null)) {
      Swal.fire('No estás autenticado', 'Inicia sesión para acceder a las rutas', 'warning')
      this.router.navigate(['/login']);
    }

  }


  ngOnInit(): void {

    //  this.loadScript('../assets/js/sb-admin-2.min.js');
    //  this.loadScript('../assets/vendor/jquery/jquery.slim.min.js');
    //  this.loadScript('../assets/vendor/bootstrap/js/bootstrap.bundle.min.js');
    // this.loadScript('../../../assets/vendor/jquery-easing/jquery.easing.min.js');
    // this.loadScript('../../../assets/vendor/chart.js/Chart.min.js');
    // this.loadScript('../../../aassets/js/demo/chart-area-demo.js');
    // this.loadScript('../../../../assets/js/demo/chart-pie-demo.js');

  }

  // public loadScript(url: string) {
  //   const body = <HTMLDivElement> document.body;
  //   const script = document.createElement('script');
  //   script.innerHTML = '';
  //   script.src = url;
  //   script.async = false;
  //   script.defer = true;
  //   body.appendChild(script);
  // }


  

  async genratePDF(){
    const cValue = formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US');
    PdfMakeWrapper.setFonts(pdfFonts);


    const pdf = new PdfMakeWrapper();

    pdf.pageMargins([ 40, 60 ]); // affects top-bottom and right-left
    pdf.header('ServiExpress '+cValue.toString());
    pdf.add(new Txt('Dashboard').alignment('center').italics().end);
    pdf.add(
      pdf.ln(2)
  );
    pdf.add('Servicio');
    pdf.add(
      pdf.ln(2)
  );
    // labels: ['Exelente','Bueno','Regular','Malo','Muy malo'],
    pdf.add(new Columns([ 'Exelente', ' 7' ]).columnGap(10).end);
    pdf.add(new Columns([ 'Bueno   ', ' 3' ]).columnGap(10).end);
    pdf.add(new Columns([ 'Regular ', ' 4' ]).columnGap(10).end);
    pdf.add(new Columns([ 'Malo    ', ' 5' ]).columnGap(10).end);
    pdf.add(new Columns([ 'Muy malo', ' 5' ]).columnGap(10).end);
    pdf.add(
      pdf.ln(2)
  );
  pdf.add('Tiempo');
  pdf.add(
    pdf.ln(2)
);
  //      labels: ['Lento','Normal','Rápido'],
  pdf.add(new Columns([ 'Lento', ' 20' ]).columnGap(10).end);
  pdf.add(new Columns([ 'Normal   ', ' 30' ]).columnGap(10).end);
  pdf.add(new Columns([ 'Rápido ', ' 50' ]).columnGap(10).end);
  pdf.add(
    pdf.ln(2)
);
pdf.add('Recomendación');
pdf.add(
  pdf.ln(2)
);
//                labels: ['No Recomendaría','Tal Vez','Recomendaría'],
pdf.add(new Columns([ 'Lento', ' 3' ]).columnGap(10).end);
pdf.add(new Columns([ 'Normal   ', ' 50' ]).columnGap(10).end);
pdf.add(new Columns([ 'Rápido ', ' 100' ]).columnGap(10).end);
    pdf.footer('This is a footer');

    pdf.create().download();
  }


}
