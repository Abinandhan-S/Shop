import { Directive,HostBinding, HostListener,ElementRef, OnInit } from "@angular/core";


@Directive({
    selector:'[appDropdownDirective]'

})

export class DropdownDirective implements OnInit{
    
    @HostBinding('class.open') thisOpen:boolean
    
    // @HostListener('click') onOpen(){
    //     this.thisOpen=!this.thisOpen
    // }   
    
    ngOnInit(): void {
        this.thisOpen=false
    }
   
    @HostListener('document:click', ['$event']) onOpen(event: Event) {
        this.thisOpen = this.elRef.nativeElement.contains(event.target) ? !this.thisOpen : false;
      }
      constructor(private elRef: ElementRef) {}

}