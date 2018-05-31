import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Broadcaster } from './broadcaster.component';

@Injectable()
export class MessageEvent {
    constructor(private broadcaster: Broadcaster) {}

    fire(data: string): void {
        this.broadcaster.broadcast(MessageEvent, data);
    }

    on(): Observable<string> {
        return this.broadcaster.on<string>(MessageEvent);
    }
}
