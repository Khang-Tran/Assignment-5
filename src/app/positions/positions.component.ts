import { Component, OnDestroy, OnInit } from '@angular/core';
import { PositionService } from '../data/position.service';
import { Position } from '../data/position';
import { Router } from '@angular/router';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit, OnDestroy {
  positions: Position[];
  getPositionsSub: any;
  loadingError: boolean;

  constructor(private positionService: PositionService, private route: Router) {
    this.positions = [];
    this.getPositionsSub = undefined;
    this.loadingError = false;
  }

  ngOnInit() {
    this.getPositionsSub = this.positionService
      .getPositions()
      .subscribe(positions => this.positions = positions,
        () => this.loadingError = true
      );
  }

  routePosition(id: string) {
    this.route.navigate(['/position', id]);
  }

  ngOnDestroy() {
    if (this.getPositionsSub !== undefined) {
      this.getPositionsSub.unsubscribe();
    }
  }

}
