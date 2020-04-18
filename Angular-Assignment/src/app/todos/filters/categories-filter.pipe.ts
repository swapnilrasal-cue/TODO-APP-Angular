import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoriesFilter'
})
export class CategoriesFilterPipe implements PipeTransform {

  transform(value: any, filterCategory:string): any {
    if(value.length <= 0 || filterCategory == ''){
      return value;
    }

    let resultArray = [];
    for(let item of value){
      if(item['category'].toLowerCase() === filterCategory.toLowerCase()){
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
