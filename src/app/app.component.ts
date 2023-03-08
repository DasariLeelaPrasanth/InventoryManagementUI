import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'InventoryManagementUi';

  // constructor(){
  //  let name = this.checkForPalindrome('ahabaha');
  //  console.log(name,"palindrome")
  // }



  // getData(){
  //   var a = [89,99,33,44,22]

  //   for(let i = 0 ; i < a.length  ; i++){
      
  //     for(let j = i +1 ; j < a.length  ; j++){
  //       console.log(a[i] , a[j] , i);
        
  //       if (a[i] > a[j]) {
  //         let temp = a[i];
  //         a[i] = a[j];
  //         a[j] = temp;
  //       }
  //     }
      
    
      
      
  //   }
    
  //   console.log(a);
    
  //   // let data = setInterval(()=>{
  //   //   console.log("inventory");
      
  //   // },1000)
  // }


  // checkForPalindrome(name :string){
  //   let reverseName = ""
  //   for(let i =0 ; i < name.length ; i++){
  //     reverseName = reverseName + name[name.length - i];
  //   }
  //   if(name == reverseName){
  //     return true
  //   }else{
  //     return false
  //   }
  // }


}
