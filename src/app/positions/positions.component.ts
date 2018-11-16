import { Component, OnDestroy, OnInit } from '@angular/core';
import { PositionService } from '../data/position.service';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css'],
})
export class PositionsComponent implements OnInit, OnDestroy {
  positions: Position[];
  getPositionsSub: any;
  loadingError: boolean;

  constructor(private positionService: PositionService) {
    this.positions = [];
    this.getPositionsSub = undefined;
    this.loadingError = false;
  }

  ngOnInit() {
    this.getPositionsSub = this.positionService
      .getPositions()
      .subscribe(positions => this.positions = positions,
        () => this.loadingError = true,
      );
  }

  ngOnDestroy() {
    if (this.getPositionsSub !== undefined) {
      this.getPositionsSub.unsubscribe();
    }
  }

}
