import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private apiUrl = 'https://localhost:7206/api/Report/GeneratePdf';
  constructor(private http: HttpClient) { }


  generatePdf(htmlContent: string): void {
    this.http.post(`${this.apiUrl}`, { htmlContent }, { responseType: 'blob' })
      .subscribe((data: Blob) => {
        saveAs(data, 'report.pdf');
      });
  }
}
