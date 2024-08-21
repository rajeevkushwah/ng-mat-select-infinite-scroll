import * as i0 from '@angular/core';
import { EventEmitter, Directive, Input, Output, NgModule } from '@angular/core';
import { takeUntil, debounceTime, tap } from 'rxjs/operators';
import { Subject, fromEvent } from 'rxjs';
import * as i1 from '@angular/material/select';
import { MatSelectModule } from '@angular/material/select';

/** The height of the select items in `em` units. */
const SELECT_ITEM_HEIGHT_EM = 3;
class MatSelectInfiniteScrollDirective {
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

class MatSelectInfiniteScrollModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MatSelectInfiniteScrollModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.12", ngImport: i0, type: MatSelectInfiniteScrollModule, declarations: [MatSelectInfiniteScrollDirective], imports: [MatSelectModule], exports: [MatSelectInfiniteScrollDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MatSelectInfiniteScrollModule, imports: [MatSelectModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MatSelectInfiniteScrollModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [MatSelectInfiniteScrollDirective],
                    imports: [
                        MatSelectModule
                    ],
                    exports: [MatSelectInfiniteScrollDirective]
                }]
        }] });

/*
 * Public API Surface of ng-mat-select-infinite-scroll
 */

/**
 * Generated bundle index. Do not edit.
 */

export { MatSelectInfiniteScrollDirective, MatSelectInfiniteScrollModule };
//# sourceMappingURL=ng-mat-select-infinite-scroll.mjs.map
