import { Component, OnInit, Input } from '@angular/core';
import { ResourceType } from '../../model/resource-type';

@Component({
  selector: 'resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {

  @Input() file: string;
  @Input() type: ResourceType;

  constructor() { }

  ngOnInit() {
  }

  isAudio(): boolean {
    if (this.type != null) {
        if (this.type === ResourceType.AUDIO) {
            return true;
        }
    }
    return false;
}
isVideo(): boolean {
    if (this.type != null) {
        if (this.type === ResourceType.VIDEO) {
            return true;
        }
    }
    return false;
}
isImage(): boolean {
  if (this.type != null) {
      if (this.type === ResourceType.IMAGE) {
          return true;
      }
  }
  return false;
}
}