import { Directive, ElementRef, inject, input } from "@angular/core";
import { LogDirective } from "../log.directive";

@Directive({
    selector: 'a[appSafeLink]',
    standalone: true,
    hostDirectives: [LogDirective],
    host: {
        '(click)': 'onClick($event)'
    }
})
export class SafeLinkDirective {
    queryParam = input('myapp', {alias: 'appSafeLink'});
    private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

    constructor() {
        console.log('Save link directive is active!');
    }

    onClick(event: MouseEvent) {
        const wantsToLeave = window.confirm('Do you want to leave the app?');

        if (wantsToLeave) {
            const address = this.hostElementRef.nativeElement.href;
            this.hostElementRef.nativeElement.href = address + '?form=' + this.queryParam();
            return;
        }

        event?.preventDefault();
    }
}