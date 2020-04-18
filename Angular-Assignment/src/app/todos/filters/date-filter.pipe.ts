import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFilter'
})
export class DateFilterPipe implements PipeTransform {

  transform(value: any, startDate:string, dueDate: string): any {
    if(value.length <= 0 || startDate == '' || dueDate == ''){
      return value;
    }
    let resultArray = [];
    let filterStartDate = new Date(startDate);
    let filterDueDate = new Date(dueDate);

    for(let item of value){
      if((new Date(item['startDate']) >= filterStartDate) && (new Date(item['startDate']) <= filterDueDate)){
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
