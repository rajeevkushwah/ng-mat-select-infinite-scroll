import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';
import { fromEvent, Subject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/select";
/** The height of the select items in `em` units. */
const SELECT_ITEM_HEIGHT_EM = 3;
export class MatSelectInfiniteScrollDirective {
    matSelect;
    ngZone;
    threshold = '15%';
    debounceTime = 150;
    complete;
    infiniteScroll = new EventEmitter();
    panel;
    thrPx = 0;
    thrPc = 0;
    singleOptionHeight = SELECT_ITEM_HEIGHT_EM;
    destroyed$ = new Subject();
    constructor(matSelect, ngZone) {
        this.matSelect = matSelect;
        this.ngZone = ngZone;
    }
    ngOnInit() {
        this.evaluateThreshold();
    }
    ngAfterViewInit() {
        this.matSelect.openedChange.pipe(takeUntil(this.destroyed$)).subscribe((opened) => {
            if (opened) {
                this.panel = this.matSelect.panel.nativeElement;
                this.singleOptionHeight = this.getSelectItemHeightPx();
                this.registerScrollListener();
            }
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    evaluateThreshold() {
        if (this.threshold.lastIndexOf('%') > -1) {
            this.thrPx = 0;
            this.thrPc = (parseFloat(this.threshold) / 100);
        }
        else {
            this.thrPx = parseFloat(this.threshold);
            this.thrPc = 0;
        }
    }
    registerScrollListener() {
        fromEvent(this.panel, 'scroll').pipe(takeUntil(this.destroyed$), debounceTime(this.debounceTime), tap((event) => {
            this.handleScrollEvent(event);
        })).subscribe();
    }
    handleScrollEvent(event) {
        this.ngZone.runOutsideAngular(() => {
            if (this.complete) {
                return;
            }
            const countOfRenderedOptions = this.matSelect.options.length;
            const infiniteScrollDistance = this.singleOptionHeight * countOfRenderedOptions;
            const threshold = this.thrPc !== 0 ? (infiniteScrollDistance * this.thrPc) : this.thrPx;
            const scrolledDistance = this.panel.clientHeight + event.target.scrollTop;
            if ((scrolledDistance + threshold) >= infiniteScrollDistance) {
                this.ngZone.run(() => this.infiniteScroll.emit());
            }
        });
    }
    getSelectItemHeightPx() {
        return parseFloat(getComputedStyle(this.panel).fontSize) * SELECT_ITEM_HEIGHT_EM;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MatSelectInfiniteScrollDirective, deps: [{ token: i1.MatSelect }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.3.12", type: MatSelectInfiniteScrollDirective, selector: "[msInfiniteScroll]", inputs: { threshold: "threshold", debounceTime: "debounceTime", complete: "complete" }, outputs: { infiniteScroll: "infiniteScroll" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MatSelectInfiniteScrollDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[msInfiniteScroll]'
                }]
        }], ctorParameters: () => [{ type: i1.MatSelect }, { type: i0.NgZone }], propDecorators: { threshold: [{
                type: Input
            }], debounceTime: [{
                type: Input
            }], complete: [{
                type: Input
            }], infiniteScroll: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXNlbGVjdC1pbmZpbml0ZS1zY3JvbGwuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctbWF0LXNlbGVjdC1pbmZpbml0ZS1zY3JvbGwvc3JjL2xpYi9tYXQtc2VsZWN0LWluZmluaXRlLXNjcm9sbC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFnQixTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBNkIsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRS9HLE9BQU8sRUFBQyxZQUFZLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzVELE9BQU8sRUFBQyxTQUFTLEVBQUUsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDOzs7QUFFeEMsb0RBQW9EO0FBQ3BELE1BQU0scUJBQXFCLEdBQUcsQ0FBQyxDQUFDO0FBS2hDLE1BQU0sT0FBTyxnQ0FBZ0M7SUFjdkI7SUFBOEI7SUFaekMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUNsQixZQUFZLEdBQUcsR0FBRyxDQUFDO0lBQ25CLFFBQVEsQ0FBVztJQUNsQixjQUFjLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztJQUU1QyxLQUFLLENBQVc7SUFDaEIsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNWLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDVixrQkFBa0IsR0FBRyxxQkFBcUIsQ0FBQztJQUUzQyxVQUFVLEdBQUcsSUFBSSxPQUFPLEVBQVcsQ0FBQztJQUU1QyxZQUFvQixTQUFvQixFQUFVLE1BQWM7UUFBNUMsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7SUFDaEUsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxTQUFTLENBQUMsWUFB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R0E5RVUsZ0NBQWdDOzRGQUFoQyxnQ0FBZ0M7OzRGQUFoQyxnQ0FBZ0M7a0JBSDVDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtpQkFDL0I7bUdBR1UsU0FBUztzQkFBakIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0ksY0FBYztzQkFBdkIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QWZ0ZXJWaWV3SW5pdCwgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIElucHV0LCBOZ1pvbmUsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRTZWxlY3R9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NlbGVjdCc7XG5pbXBvcnQge2RlYm91bmNlVGltZSwgdGFrZVVudGlsLCB0YXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7ZnJvbUV2ZW50LCBTdWJqZWN0fSBmcm9tICdyeGpzJztcblxuLyoqIFRoZSBoZWlnaHQgb2YgdGhlIHNlbGVjdCBpdGVtcyBpbiBgZW1gIHVuaXRzLiAqL1xuY29uc3QgU0VMRUNUX0lURU1fSEVJR0hUX0VNID0gMztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21zSW5maW5pdGVTY3JvbGxdJ1xufSlcbmV4cG9ydCBjbGFzcyBNYXRTZWxlY3RJbmZpbml0ZVNjcm9sbERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0IHtcblxuICBASW5wdXQoKSB0aHJlc2hvbGQgPSAnMTUlJztcbiAgQElucHV0KCkgZGVib3VuY2VUaW1lID0gMTUwO1xuICBASW5wdXQoKSBjb21wbGV0ZSE6IGJvb2xlYW47XG4gIEBPdXRwdXQoKSBpbmZpbml0ZVNjcm9sbCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBwcml2YXRlIHBhbmVsITogRWxlbWVudDtcbiAgcHJpdmF0ZSB0aHJQeCA9IDA7XG4gIHByaXZhdGUgdGhyUGMgPSAwO1xuICBwcml2YXRlIHNpbmdsZU9wdGlvbkhlaWdodCA9IFNFTEVDVF9JVEVNX0hFSUdIVF9FTTtcblxuICBwcml2YXRlIGRlc3Ryb3llZCQgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWF0U2VsZWN0OiBNYXRTZWxlY3QsIHByaXZhdGUgbmdab25lOiBOZ1pvbmUpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZXZhbHVhdGVUaHJlc2hvbGQoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLm1hdFNlbGVjdC5vcGVuZWRDaGFuZ2UucGlwZShcbiAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCQpXG4gICAgKS5zdWJzY3JpYmUoKG9wZW5lZCkgPT4ge1xuICAgICAgaWYgKG9wZW5lZCkge1xuICAgICAgICB0aGlzLnBhbmVsID0gdGhpcy5tYXRTZWxlY3QucGFuZWwubmF0aXZlRWxlbWVudDtcbiAgICAgICAgdGhpcy5zaW5nbGVPcHRpb25IZWlnaHQgPSB0aGlzLmdldFNlbGVjdEl0ZW1IZWlnaHRQeCgpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyU2Nyb2xsTGlzdGVuZXIoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZGVzdHJveWVkJC5uZXh0KHRydWUpO1xuICAgIHRoaXMuZGVzdHJveWVkJC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgZXZhbHVhdGVUaHJlc2hvbGQoKSB7XG4gICAgaWYgKHRoaXMudGhyZXNob2xkLmxhc3RJbmRleE9mKCclJykgPiAtMSkge1xuICAgICAgdGhpcy50aHJQeCA9IDA7XG4gICAgICB0aGlzLnRoclBjID0gKHBhcnNlRmxvYXQodGhpcy50aHJlc2hvbGQpIC8gMTAwKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRoclB4ID0gcGFyc2VGbG9hdCh0aGlzLnRocmVzaG9sZCk7XG4gICAgICB0aGlzLnRoclBjID0gMDtcbiAgICB9XG4gIH1cblxuICByZWdpc3RlclNjcm9sbExpc3RlbmVyKCkge1xuICAgIGZyb21FdmVudCh0aGlzLnBhbmVsLCAnc2Nyb2xsJykucGlwZShcbiAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCQpLFxuICAgICAgZGVib3VuY2VUaW1lKHRoaXMuZGVib3VuY2VUaW1lKSxcbiAgICAgIHRhcCgoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5oYW5kbGVTY3JvbGxFdmVudChldmVudCk7XG4gICAgICB9KVxuICAgICkuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBoYW5kbGVTY3JvbGxFdmVudChldmVudDogYW55KSB7XG4gICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuY29tcGxldGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgY291bnRPZlJlbmRlcmVkT3B0aW9ucyA9IHRoaXMubWF0U2VsZWN0Lm9wdGlvbnMubGVuZ3RoO1xuICAgICAgY29uc3QgaW5maW5pdGVTY3JvbGxEaXN0YW5jZSA9IHRoaXMuc2luZ2xlT3B0aW9uSGVpZ2h0ICogY291bnRPZlJlbmRlcmVkT3B0aW9ucztcbiAgICAgIGNvbnN0IHRocmVzaG9sZCA9IHRoaXMudGhyUGMgIT09IDAgPyAoaW5maW5pdGVTY3JvbGxEaXN0YW5jZSAqIHRoaXMudGhyUGMpIDogdGhpcy50aHJQeDtcblxuICAgICAgY29uc3Qgc2Nyb2xsZWREaXN0YW5jZSA9IHRoaXMucGFuZWwuY2xpZW50SGVpZ2h0ICsgZXZlbnQudGFyZ2V0LnNjcm9sbFRvcDtcblxuICAgICAgaWYgKChzY3JvbGxlZERpc3RhbmNlICsgdGhyZXNob2xkKSA+PSBpbmZpbml0ZVNjcm9sbERpc3RhbmNlKSB7XG4gICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB0aGlzLmluZmluaXRlU2Nyb2xsLmVtaXQoKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBnZXRTZWxlY3RJdGVtSGVpZ2h0UHgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gcGFyc2VGbG9hdChnZXRDb21wdXRlZFN0eWxlKHRoaXMucGFuZWwpLmZvbnRTaXplKSAqIFNFTEVDVF9JVEVNX0hFSUdIVF9FTTtcbiAgfVxuXG59XG4iXX0=