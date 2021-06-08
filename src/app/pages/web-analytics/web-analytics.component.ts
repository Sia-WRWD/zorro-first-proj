import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzImageService } from 'ng-zorro-antd/image';

@Component({
  selector: 'app-web-analytics',
  templateUrl: './web-analytics.component.html',
  styleUrls: ['./web-analytics.component.css']
})
export class WebAnalyticsComponent implements OnInit {

  size: NzButtonSize = 'large';
  deadline = Date.now() + 1000 * 60 * 60 * 24 * 230 + 1000 * 30;
  encapsulation: ViewEncapsulation.None

  constructor(private nzImageService: NzImageService) { }

  ngOnInit(): void {
    
  }

  showEvent(): void {
    const images = [ 
      {
        src: 'https://media4.giphy.com/media/xT0xencZ3A3uwUJhvy/giphy.gif',
        width: '500px',
        height: '300px',
        alt: 'AYAYA = Birthday'
      },
      {
        src: 'https://64.media.tumblr.com/dc84f77049d884069752882b6182be59/tumblr_prtlxkm93j1woadb9o2_r1_250.gifv',
        width: '400px',
        height: '400px',
        alt: 'AYAYA = TRIGGERED'
      }
    ];
    this.nzImageService.preview(images, { nzZoom: 1.5, nzRotate: 0});
  }
}
