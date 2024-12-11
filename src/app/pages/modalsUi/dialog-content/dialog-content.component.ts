import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";


interface stats {
  id: number;
  time: string;
  color: string;
  title?: string;
  subtext?: string;
  link?: string;
}

@Component({
  selector: 'app-dialog-content',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardTitle,
    NgForOf,
    NgIf
  ],
  templateUrl: './dialog-content.component.html',
  styleUrl: './dialog-content.component.scss'
})
export class DialogContentComponent {


  openPDF() {
    const pdfLink = 'assets/expdf.pdf'; // Lien vers votre fichier PDF
    window.open(pdfLink, '_blank'); // Ouvre le PDF dans un nouvel onglet du navigateur
  }

  stats: stats[] = [
    {
      id: 1,
      time: '09.30 am',
      color: 'primary',
      subtext: 'Created',
    },
    {
      id: 2,
      time: '10.30 am',
      color: 'accent',
      title: 'Modified',
      link: '#ML-3467',
    },
    {
      id: 3,
      time: '12.30 pm',
      color: 'warning',
      subtext: 'Modified',
    },
    {
      id: 4,
      time: '12.30 pm',
      color: 'warning',
      title: 'Validation',
      link: '#ML-3467',
    },
    {
      id: 5,
      time: '12.30 pm',
      color: 'error',
      title: 'Refus',
      link: '#ML-3467',
    },
    {
      id: 6,
      time: '12.30 pm',
      color: 'success',
      subtext: 'Payment Done',
    },
  ];

}
