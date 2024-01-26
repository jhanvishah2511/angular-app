import { Component } from '@angular/core';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  categories:any;

  items: any[] = [
    { name: 'Item 1', description: 'Description 1' },
    { name: 'Item 2', description: 'Description 2' },
    { name: 'Item 3', description: 'Description 3' },
    // Add more data items
  ];
  constructor(public service: CategoryService) {}
  ngOnInit() {
    this.categoryList();
  }
  
  categoryList(){
    this.service.getAllCategories().subscribe((response: any) => {
      this.categories = response.data;
      this.categories.forEach((element :any) => {
        if(element.categoryImage){
          const fileName = element.categoryImage;
          this.service.getCategoryImage(fileName).subscribe((res: any) => {
            const reader = new FileReader();
            reader.onload = (e: any) => {
              element.categoryImage = e.target.result
            };
            reader.readAsDataURL(res);
          })
        }
      })
    });
    
  }

  draggingIndex: number = -1;

  onDragStart(index: number) {
    this.draggingIndex = index;
  }

  onDragOver(event: any, index: number) {
    event.preventDefault();
    const overIndex = index;

    if (this.draggingIndex !== -1 && this.draggingIndex !== overIndex) {
      const [draggedItem] = this.categories.splice(this.draggingIndex, 1);
      this.categories.splice(overIndex, 0, draggedItem);
      this.draggingIndex = overIndex;
    }
  }

  onDragEnd() {
    this.draggingIndex = -1;
  }
}
