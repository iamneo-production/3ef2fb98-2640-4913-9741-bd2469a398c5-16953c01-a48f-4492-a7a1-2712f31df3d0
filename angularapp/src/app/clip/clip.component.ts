import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import videojs from 'video.js';

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ClipComponent implements OnInit {
  id = ''
  @ViewChild('videoPlayer', { static: true }) target ?: ElementRef;
  player ?: videojs.Player;


  constructor(private route: ActivatedRoute) {
     this.route.params.subscribe(({id, url}) => {
      this.id = id;
      this.player?.src({
        src: url,
        type: 'video/mp4'
      })
     })
   }

  ngOnInit(): void {
  }

}
