import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-text',
    templateUrl: './text.component.html',
    styleUrls: ['./text.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextComponent),
            multi: true
        }
    ]
})
export class TextComponent implements OnInit, ControlValueAccessor {

    @Input() placeholder!: string;
    @Input() type: string = 'text';
    @Input() class: string = '';

    value = '';
    disabled = false;

    onChange: any = () => { };
    onTouched: any = () => { };

    constructor() { }

    ngOnInit() { }

    writeValue(value: any): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    changeValue(): void {
        this.onChange(this.value);
    }

}
