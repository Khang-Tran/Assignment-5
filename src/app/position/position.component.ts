import { Component, OnDestroy, OnInit } from '@angular/core';
import { Position } from '../data/position';
import { ActivatedRoute } from '@angular/router';
import { PositionService } from '../data/position.service';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit, OnDestroy {
  paramSubscription: any;
  positionSubscription: any;
  savePositionSubscription: any;
  position: Position;
  successMessage = false;
  failMessage = false;

  constructor(private activeRoute: ActivatedRoute, private positionService: PositionService) {
  }

  ngOnInit() {
    this.paramSubscription = this.activeRoute.params.subscribe(params => {
      const currentId = params._id;
      this.positionSubscription = this.positionService.getPosition(currentId).subscribe(positions => {
        this.position = positions.length > 0 ? positions[0] : new Position();
      });
    });
  }

  obSubmit() {
    if (this.position) {
      this.savePositionSubscription = this.positionService.savePosition(this.position).subscribe(() => {
        this.successMessage = true;
        setTimeout(() => this.successMessage = false, 2500);
      }, () => {
        this.failMessage = true;
        setTimeout(() => this.failMessage = false, 2500);
      });
    }
  }

  ngOnDestroy() {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
    if (this.positionSubscription) {
      this.positionSubscription.unsubscribe();
    }
    if (this.savePositionSubscription) {
      this.savePositionSubscription.unsubscribe();
    }
  }

}
