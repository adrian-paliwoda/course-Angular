import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'temp',
    standalone: true
})
export class TemperaturePipe implements PipeTransform {
    transform(value: string | number | null, inputType: 'cel' | 'fah' = 'cel', outputType?: 'cel' | 'fah') {
        if (!value){
            return value;
        }

        let val: number = 1;
        if (typeof value === 'string') {
            val = parseFloat(value);
        } else {
            val = value;
        }

        const symbol = outputType === 'cel' ? 'ºC' : outputType === 'fah' ? 'ºF' : inputType === 'cel' ? 'ºC' : 'ºF';

        let     outputTemp: number = 1;
        if (inputType === 'cel' && outputType === 'fah') {
            outputTemp = val * (9 / 5) + 32;
        } else if (inputType === 'fah' && outputType === 'cel') {
            outputTemp = (val - 32) * (5 / 9);
        } else {
            outputTemp = val;
        }

        return `${outputTemp.toFixed(2)} ${symbol}`;
    }
}   