import { Component, OnInit, ViewChildren, ViewChild, ElementRef } from '@angular/core';
import { NavbarService } from 'src/app/service/navbar.service';
import { ActivatedRoute } from '@angular/router';
import * as jsPDF from 'jspdf'
import  html2canvas  from "html2canvas";
import domtoimage from 'dom-to-image';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: any;
  data2: any;
  data3: any;

  constructor(public nav: NavbarService, private activatedRoute:ActivatedRoute) {



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

  }

  ngOnInit(): void {
    this.nav.show();
    this.nav.doSomethingElseUseful();
  }

  download(){
    var pdf = new jsPDF('p', 'pt', 'letter');
    pdf.addHTML(('#content')[0], function () {
        pdf.save('Test.pdf');
    });
  }

  public exportPdf(){

  var data = document.getElementById('cotenidox');
  html2canvas(data).then(canvas => {
  var imgData = canvas.toDataURL('img/png')
  var imgHeight = canvas.height * 208 / canvas.width;
  var doc = new jsPDF();


  doc.addImage(imgData, 0, 0, 208,500)
  doc.save('MYPdf.pdf'); // Generated PDF
  });


  }

  public captureScreen()
{

html2canvas(document.querySelector("#capture")).then(canvas => {
  document.body.appendChild(canvas)
});
// html2canvas(data).then(canvas => {
// // Few necessary setting options
// var imgWidth = 208;
// var pageHeight = 295;
// var imgHeight = canvas.height * imgWidth / canvas.width;
// var heightLeft = imgHeight;

// const contentDataURL = canvas.toDataURL('image/png')
// let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
// var position = 0;
// pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
// pdf.save('MYPdf.pdf'); // Generated PDF
// });
}

  getHomeImg() {
    return "url('./assets/img/background-img.jpg')";
  }


  downloadPDF()
  {

    var node = document.getElementById('content');

    var img;
    var filename;
    var newImage;


    domtoimage.toPng(node, { bgcolor: '#fff' })

      .then(function(dataUrl) {

        img = new Image();
        img.src = dataUrl;
        newImage = img.src;

        img.onload = function(){

        var pdfWidth = img.width;
        var pdfHeight = img.height;

          // FileSaver.saveAs(dataUrl, 'my-pdfimage.png'); // Save as Image

          var doc;

          if(pdfWidth > pdfHeight)
          {
            doc = new jsPDF('l', 'px', [pdfWidth , pdfHeight]);
          }
          else
          {
            doc = new jsPDF('p', 'px', [pdfWidth , pdfHeight]);
          }


          var width = doc.internal.pageSize.getWidth();
          var height = doc.internal.pageSize.getHeight();


          doc.addImage(newImage, 'PNG',  10, 10, width, height);
          filename = 'mypdf_' + '.pdf';
          doc.save(filename);

        };


      })
      .catch(function(error) {

       // Error Handling

      });



  }




}
