import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/service/navbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake
import { PdfMakeWrapper, Canvas, Line, PageReference, Txt, Img, Columns, TocItem } from 'pdfmake-wrapper';
import { DatePipe, formatDate } from '@angular/common';
import * as jsPDF from 'jspdf'
import domtoimage from 'dom-to-image';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { EncuestaService } from 'src/app/service/encuesta.service';
import { Util } from 'src/app/util/util';

// declare var drawGauge: any;
// import '../../../../assets/js/sb-admin-2.min.js';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [DatePipe]
})
export class InicioComponent implements OnInit {
  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  cliente = false;
  admin = false;
  empleado = false;
  empresa = false;
  public role = '';
  data: any;
  data2: any;
  data3: any;
  dataBar: any;
  dataBar2: any;
  currentDate = new Date();
  options: any;
  options2: any;
  fini: any;
  ffin: any;
  response: any;
  private util: Util = new Util();
  constructor(public nav: NavbarService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private encuestaService: EncuestaService) {

    this.fromDate = calendar.getNext(calendar.getToday(), 'd', -30);
    this.toDate = calendar.getToday();
    




    this.buscarencuesta1();





    this.dataBar = {
      labels: ['Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosoto'],
      datasets: [
        {
          label: 'Cambio de Aceite',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'Cambio de Neumaticos',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: [28, 48, 40, 19, 86, 27, 80]
        },
        {
          label: 'Lavado de Motor',
          backgroundColor: '#FFCE56',
          borderColor: '#FFCE56',
          data: [50, 60, 20, 30, 45, 60, 100]
        }
      ]
    }

    this.dataBar2 = {
      labels: ['Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosoto'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'My Second dataset',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    }

    this.activatedRoute.params.subscribe(params => {
      this.role = params.idrole;

    });

    if (sessionStorage.getItem('idrole') == '2') {
      this.cliente = true;
    } else if (sessionStorage.getItem('idrole') == '1') {
      this.admin = true;
    } else if (sessionStorage.getItem('idrole') == '3') {
      this.empleado = true;
    } else if (sessionStorage.getItem('idrole') == '4') {
      this.empresa = true;
    }
    this.nav.hide();
    this.nav.doSomethingElseUseful();

    if ((sessionStorage.getItem('idrole') == null)) {
      Swal.fire('No estás autenticado', 'Inicia sesión para acceder a las rutas', 'warning')
      this.router.navigate(['/login']);
    }

  }
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  buscarencuesta1() {

    const date1 = new Date(this.fromDate.year, this.fromDate.month, this.fromDate.day);
    const date2 = new Date(this.toDate.year, this.toDate.month, this.toDate.day);
    console.log(date1 + " " + date2)
    this.fini = this.util.formatDate(date1);
    this.ffin = this.util.formatDate(date2);
    sessionStorage.setItem("fechaini",this.fini);
    sessionStorage.setItem("fechafin",this.ffin);

    console.log(this.fini + " " + this.ffin)
    this.encuestaService.buscarEncuestas(this.fini, this.ffin).subscribe(
      res => {
        var body = res["body"];

        var recomendacion = body["recomendacion"];
        sessionStorage.setItem("recomendaria", recomendacion["recomendaria"]);
        sessionStorage.setItem("talvez", recomendacion["talvez"]);
        sessionStorage.setItem("norecomendaria", recomendacion["norecomendaria"]);

        var servicio = body["servicio"];
        sessionStorage.setItem("muymalo", servicio["muymalo"]);
        sessionStorage.setItem("malo", servicio["malo"]);
        sessionStorage.setItem("bueno", servicio["bueno"]);
        sessionStorage.setItem("exelente", servicio["exelente"]);
        sessionStorage.setItem("regular", servicio["regular"]);

        var tiempo = body["tiempo"];
        sessionStorage.setItem("rapido", tiempo["rapido"]);
        sessionStorage.setItem("lento", tiempo["lento"]);
        sessionStorage.setItem("normal", tiempo["normal"]);

        //encuesta 1

        this.data = {
          labels: ['Exelente', 'Bueno', 'Regular', 'Malo', 'Muy malo'],
          datasets: [
            {
              data: [sessionStorage.getItem("exelente"), sessionStorage.getItem("bueno"), 
                    sessionStorage.getItem("regular"), sessionStorage.getItem("malo"), 
                    sessionStorage.getItem("muymalo")],
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

        //encuesta 2
        this.data2 = {
          labels: ['Lento', 'Normal', 'Rápido'],
          datasets: [
            {
              data: [sessionStorage.getItem("lento"), sessionStorage.getItem("normal"), sessionStorage.getItem("rapido")],
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

       //encuesta 3
        this.data3 = {
          labels: ['No Recomendaría', 'Tal Vez', 'Recomendaría'],
          datasets: [
            {
              data: [sessionStorage.getItem("norecomendaria"), sessionStorage.getItem("talvez"), sessionStorage.getItem("recomendaria")],
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

      },
      error => {

        this.util.handleError(error);
      },

    );
    //   console.log( this.fromDate.year +' '+this.fromDate.month+' '+this.fromDate.day
    //   +'--'+
    //  this.toDate.year+' '+this.toDate.month+' '+this.toDate.day); 
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


  // async genratePDF() {
  //   const cValue = formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US');
  //   PdfMakeWrapper.setFonts(pdfFonts);


  //   const pdf = new PdfMakeWrapper();

  //   pdf.pageMargins([40, 60]); // affects top-bottom and right-left
  //   pdf.header('ServiExpress ' + cValue.toString());
  //   pdf.add(new Txt('Dashboard').alignment('center').italics().end);
  //   pdf.add(
  //     pdf.ln(2)
  //   );
  //   pdf.add('Servicio');
  //   pdf.add(
  //     pdf.ln(2)
  //   );
  //   // labels: ['Exelente','Bueno','Regular','Malo','Muy malo'],
  //   pdf.add(new Columns(['Exelente', ' 7']).columnGap(10).end);
  //   pdf.add(new Columns(['Bueno   ', ' 3']).columnGap(10).end);
  //   pdf.add(new Columns(['Regular ', ' 4']).columnGap(10).end);
  //   pdf.add(new Columns(['Malo    ', ' 5']).columnGap(10).end);
  //   pdf.add(new Columns(['Muy malo', ' 5']).columnGap(10).end);
  //   pdf.add(
  //     pdf.ln(2)
  //   );
  //   pdf.add('Tiempo');
  //   pdf.add(
  //     pdf.ln(2)
  //   );
  //   //      labels: ['Lento','Normal','Rápido'],
  //   pdf.add(new Columns(['Lento', ' 20']).columnGap(10).end);
  //   pdf.add(new Columns(['Normal   ', ' 30']).columnGap(10).end);
  //   pdf.add(new Columns(['Rápido ', ' 50']).columnGap(10).end);
  //   pdf.add(
  //     pdf.ln(2)
  //   );
  //   pdf.add('Recomendación');
  //   pdf.add(
  //     pdf.ln(2)
  //   );
  //   //                labels: ['No Recomendaría','Tal Vez','Recomendaría'],
  //   pdf.add(new Columns(['Lento', ' 3']).columnGap(10).end);
  //   pdf.add(new Columns(['Normal   ', ' 50']).columnGap(10).end);
  //   pdf.add(new Columns(['Rápido ', ' 100']).columnGap(10).end);
  //   pdf.footer('This is a footer');

  //   pdf.create().download();
  // }

  generarReporte() {

  //   var node = document.getElementById('contenido');

    var img;
    var filename;
    var newImage;
    const cValue = formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US');

    domtoimage.toPng(node, { bgcolor: '#fff' })

      .then(function (dataUrl) {

    //     img = new Image();
    //     img.src = dataUrl;
    //     newImage = img.src;

        img.onload = function () {

          var pdfWidth = img.width;
          var pdfHeight = img.height;

    //       // FileSaver.saveAs(dataUrl, 'my-pdfimage.png'); // Save as Image

    //       var doc;

          if (pdfWidth > pdfHeight) {
            doc = new jsPDF('landscape');


          }
          else {
            doc = new jsPDF('landscape');

          }


    //       var width = doc.internal.pageSize.getWidth();
    //       var height = doc.internal.pageSize.getHeight();


          doc.setFontSize(7);               
          doc.text(20, 10, 'Desde '+sessionStorage.getItem("fechaini")+' Hasta '+sessionStorage.getItem("fechafin")); 
          doc.setFontSize(15);
          doc.text(20, 20, 'Reporte de Satisfacción');  
          doc.setFontSize(13);
          doc.text(20, 30, 'Servicio.');
          // data: [sessionStorage.getItem("exelente"), , 
          // , , 
          // ],

          doc.setFontSize(10);
          doc.text(20, 40, 'Exelente:'+sessionStorage.getItem("exelente")+
                             ', Bueno:'+sessionStorage.getItem("bueno")+
                             ', Regular:'+sessionStorage.getItem("regular")+
                             ', Malo:'+sessionStorage.getItem("malo")+
                             ', Muy malo: '+sessionStorage.getItem("muymalo")
          );
          doc.setFontSize(13);
          doc.text(20, 60, 'Tiempo.');
          doc.setFontSize(10);
          doc.text(20, 70, 'Lento:'+sessionStorage.getItem("lento")+
                             ', Normal:'+sessionStorage.getItem("normal")+
                             ', Rápido:'+sessionStorage.getItem("rapido")
          );
          doc.setFontSize(13);
          doc.text(20, 90, 'Recomendación.');
          doc.setFontSize(10);
          doc.text(20, 100, 'No Recomendaría:'+sessionStorage.getItem("norecomendaria")+
                          ', Tal Vez:'+sessionStorage.getItem("talvez")+
                            ', Recomendaría:'+sessionStorage.getItem("recomendaria"));
          doc.addImage(newImage, 'PNG', 5, 110, 310, 50);
          doc.setFontSize(10);               
          doc.text(20, 200, 'Documento emitido por '+sessionStorage.getItem("name")+' '+sessionStorage.getItem("apellido")+' '+cValue.toString()); 
    
          // Output as Data URI
          doc.output('datauri');
          filename = 'ServiExpressReporte' + '.pdf';
          doc.save(filename);



    //     };


      })
      .catch(function (error) {

        // Error Handling

    //   });



  // }

}
