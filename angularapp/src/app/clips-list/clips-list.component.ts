import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { ClipzService } from '../services/clipz.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-clips-list',
  templateUrl: './clips-list.component.html',
  styleUrls: ['./clips-list.component.css'],
  providers: [DatePipe]
})
export class ClipsListComponent implements OnInit, OnDestroy {

  @Input() scrollable = true;

  constructor(public clipzService: ClipzService) {
      this.clipzService.getScrollClips();
   }

  ngOnInit(): void {
    if(this.scrollable) {
      document.addEventListener('scroll', this.handleScroll);
    }
  }

  ngOnDestroy(): void {
    if(this.scrollable) {
      document.removeEventListener('scroll', this.handleScroll);
    }

    this.clipzService.pageClip = []
  }

  handleScroll = () => {
    const { scrollTop, offsetHeight } = document.documentElement;
    const { innerHeight } = window;

    const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;
    if(bottomOfWindow) {
      this.clipzService.getScrollClips()
    }
  }

}
