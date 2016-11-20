(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('ractive')) :
	typeof define === 'function' && define.amd ? define(['ractive'], factory) :
	(factory(global.Ractive));
}(this, (function (Ractive) { 'use strict';

Ractive = 'default' in Ractive ? Ractive['default'] : Ractive;

/************************************
 * 				APPBAR
 ***********************************/
Ractive.components.appbar = Ractive.extend({
	isolated: true,
	template:`
		 <nav>
			<div class="nav-wrapper">
				{{yield}}			
			</div>
		</nav>
	`
});

/************************************
 * 			  DROPDOWN
 ***********************************/
Ractive.components.dropdownitem = Ractive.extend({
	isolated: true,
	template:'<li {{#divider}} class="divider" {{/divider}} ><a href="#!">{{text}}</a></li>'
});

Ractive.components.dropdown = Ractive.extend({
	isolated: true,
	template:`
		<a class='dropdown-button btn' href='#' data-activates='dropdown1'>Drop Me!</a>

        <!-- Dropdown Structure -->
        <ul id='dropdown1' class='dropdown-content'>
            {{yield}}
        </ul>
	`,
    onrender: function(){
        //window.test = this;
        $(this.find('*')).dropdown();
    }
});

/************************************
 * 			AUTOCOMPLETE
 ***********************************/
Ractive.components.autocomplete = Ractive.extend({
    isolated: true,
    template: `
        <div class="input-field">
		 <input type="text" id="{{id}}" class="autocomplete" on-keyup="valuechange">
         <label for="{{id}}">Add Item</label>
        </div>
    	`,
    data: function () {
        return {
            items: null
        };
    },
    oninit: function () {

    },
    itemschanged: function () {
        console.log('items changed', this.get('items'));
        $(this.find('input')).autocomplete({
            data: this.get('items')
        });
    },
    valuechange: function (event) {
        this.fire('autoneeddata', event.original.target.value);
    },
    onrender: function () {
        this.observe('items', this.itemschanged);
        this.on('valuechange', this.valuechange);
    }
});

/************************************
 * 			  CHECKBOX
 ***********************************/
/************************************
 * 			  CHECKBOX
 ***********************************/
Ractive.components.checkbox = Ractive.extend({
	isolated: true,
	template:`
            <input type="checkbox" id="{{id}}" {{#checked}}checked{{/checked}} on-change="checkedchanged" />
            <label for="{{id}}" ></label>
            `,
    oninit: function(){
        this.on('checkedchanged', this.checkedchanged);
    },
    onrender:function(){
        if(typeof this.get('id') === 'undefined' || this.get('id') === null ){
            this.set('id', 'chk'+Date.now().toString());
        }
    },
    data: function(){
        return {
            checked:true
        };
    },
    checkedchanged: function(event){
        var e = event;
        if(event.original)
            e = event.original;
        this.set('checked', e.target.checked);
    },

});

// ---- main.js -----
//import {} from './decorators/stopPropagation';

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFjdGl2ZS1tYXRlcmlhbGl6ZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbXBvbmVudHMvYXBwYmFyLmpzIiwiLi4vLi4vc3JjL2NvbXBvbmVudHMvZHJvcGRvd24uanMiLCIuLi8uLi9zcmMvY29tcG9uZW50cy9hdXRvY29tcGxldGUuanMiLCIuLi8uLi9zcmMvY29tcG9uZW50cy9jaGVja2JveC5qcyIsIi4uLy4uL3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogXHRcdFx0XHRBUFBCQVJcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5pbXBvcnQgUmFjdGl2ZSBmcm9tICdyYWN0aXZlJztcclxuXHJcblJhY3RpdmUuY29tcG9uZW50cy5hcHBiYXIgPSBSYWN0aXZlLmV4dGVuZCh7XHJcblx0aXNvbGF0ZWQ6IHRydWUsXHJcblx0dGVtcGxhdGU6YFxyXG5cdFx0IDxuYXY+XHJcblx0XHRcdDxkaXYgY2xhc3M9XCJuYXYtd3JhcHBlclwiPlxyXG5cdFx0XHRcdHt7eWllbGR9fVx0XHRcdFxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdDwvbmF2PlxyXG5cdGBcclxufSk7IiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKiBcdFx0XHQgIERST1BET1dOXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuaW1wb3J0IFJhY3RpdmUgZnJvbSAncmFjdGl2ZSc7XHJcblxyXG5SYWN0aXZlLmNvbXBvbmVudHMuZHJvcGRvd25pdGVtID0gUmFjdGl2ZS5leHRlbmQoe1xyXG5cdGlzb2xhdGVkOiB0cnVlLFxyXG5cdHRlbXBsYXRlOic8bGkge3sjZGl2aWRlcn19IGNsYXNzPVwiZGl2aWRlclwiIHt7L2RpdmlkZXJ9fSA+PGEgaHJlZj1cIiMhXCI+e3t0ZXh0fX08L2E+PC9saT4nXHJcbn0pO1xyXG5cclxuUmFjdGl2ZS5jb21wb25lbnRzLmRyb3Bkb3duID0gUmFjdGl2ZS5leHRlbmQoe1xyXG5cdGlzb2xhdGVkOiB0cnVlLFxyXG5cdHRlbXBsYXRlOmBcclxuXHRcdDxhIGNsYXNzPSdkcm9wZG93bi1idXR0b24gYnRuJyBocmVmPScjJyBkYXRhLWFjdGl2YXRlcz0nZHJvcGRvd24xJz5Ecm9wIE1lITwvYT5cclxuXHJcbiAgICAgICAgPCEtLSBEcm9wZG93biBTdHJ1Y3R1cmUgLS0+XHJcbiAgICAgICAgPHVsIGlkPSdkcm9wZG93bjEnIGNsYXNzPSdkcm9wZG93bi1jb250ZW50Jz5cclxuICAgICAgICAgICAge3t5aWVsZH19XHJcbiAgICAgICAgPC91bD5cclxuXHRgLFxyXG4gICAgb25yZW5kZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy93aW5kb3cudGVzdCA9IHRoaXM7XHJcbiAgICAgICAgJCh0aGlzLmZpbmQoJyonKSkuZHJvcGRvd24oKTtcclxuICAgIH1cclxufSk7IiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKiBcdFx0XHRBVVRPQ09NUExFVEVcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5pbXBvcnQgUmFjdGl2ZSBmcm9tICdyYWN0aXZlJztcclxuXHJcblJhY3RpdmUuY29tcG9uZW50cy5hdXRvY29tcGxldGUgPSBSYWN0aXZlLmV4dGVuZCh7XHJcbiAgICBpc29sYXRlZDogdHJ1ZSxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkXCI+XHJcblx0XHQgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJ7e2lkfX1cIiBjbGFzcz1cImF1dG9jb21wbGV0ZVwiIG9uLWtleXVwPVwidmFsdWVjaGFuZ2VcIj5cclxuICAgICAgICAgPGxhYmVsIGZvcj1cInt7aWR9fVwiPkFkZCBJdGVtPC9sYWJlbD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIFx0YCxcclxuICAgIGRhdGE6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpdGVtczogbnVsbFxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgb25pbml0OiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgfSxcclxuICAgIGl0ZW1zY2hhbmdlZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdpdGVtcyBjaGFuZ2VkJywgdGhpcy5nZXQoJ2l0ZW1zJykpO1xyXG4gICAgICAgICQodGhpcy5maW5kKCdpbnB1dCcpKS5hdXRvY29tcGxldGUoe1xyXG4gICAgICAgICAgICBkYXRhOiB0aGlzLmdldCgnaXRlbXMnKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIHZhbHVlY2hhbmdlOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLmZpcmUoJ2F1dG9uZWVkZGF0YScsIGV2ZW50Lm9yaWdpbmFsLnRhcmdldC52YWx1ZSk7XHJcbiAgICB9LFxyXG4gICAgb25yZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLm9ic2VydmUoJ2l0ZW1zJywgdGhpcy5pdGVtc2NoYW5nZWQpO1xyXG4gICAgICAgIHRoaXMub24oJ3ZhbHVlY2hhbmdlJywgdGhpcy52YWx1ZWNoYW5nZSk7XHJcbiAgICB9XHJcbn0pOyIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogXHRcdFx0ICBDSEVDS0JPWFxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbmltcG9ydCBSYWN0aXZlIGZyb20gJ3JhY3RpdmUnO1xyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKiBcdFx0XHQgIENIRUNLQk9YXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuUmFjdGl2ZS5jb21wb25lbnRzLmNoZWNrYm94ID0gUmFjdGl2ZS5leHRlbmQoe1xyXG5cdGlzb2xhdGVkOiB0cnVlLFxyXG5cdHRlbXBsYXRlOmBcclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwie3tpZH19XCIge3sjY2hlY2tlZH19Y2hlY2tlZHt7L2NoZWNrZWR9fSBvbi1jaGFuZ2U9XCJjaGVja2VkY2hhbmdlZFwiIC8+XHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJ7e2lkfX1cIiA+PC9sYWJlbD5cclxuICAgICAgICAgICAgYCxcclxuICAgIG9uaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLm9uKCdjaGVja2VkY2hhbmdlZCcsIHRoaXMuY2hlY2tlZGNoYW5nZWQpO1xyXG4gICAgfSxcclxuICAgIG9ucmVuZGVyOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYodHlwZW9mIHRoaXMuZ2V0KCdpZCcpID09PSAndW5kZWZpbmVkJyB8fCB0aGlzLmdldCgnaWQnKSA9PT0gbnVsbCApe1xyXG4gICAgICAgICAgICB0aGlzLnNldCgnaWQnLCAnY2hrJytEYXRlLm5vdygpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBkYXRhOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNoZWNrZWQ6dHJ1ZVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgY2hlY2tlZGNoYW5nZWQ6IGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICB2YXIgZSA9IGV2ZW50O1xyXG4gICAgICAgIGlmKGV2ZW50Lm9yaWdpbmFsKVxyXG4gICAgICAgICAgICBlID0gZXZlbnQub3JpZ2luYWw7XHJcbiAgICAgICAgdGhpcy5zZXQoJ2NoZWNrZWQnLCBlLnRhcmdldC5jaGVja2VkKTtcclxuICAgIH0sXHJcblxyXG59KTsiLCIvLyAtLS0tIG1haW4uanMgLS0tLS1cclxuaW1wb3J0IHtSYWN0aXZlfSBmcm9tICdyYWN0aXZlJztcclxuXHJcbi8vaW1wb3J0IHt9IGZyb20gJy4vZGVjb3JhdG9ycy9zdG9wUHJvcGFnYXRpb24nO1xyXG5cclxuaW1wb3J0IHsgfSBmcm9tICcuL2NvbXBvbmVudHMvYXBwYmFyJztcclxuaW1wb3J0IHsgfSBmcm9tICcuL2NvbXBvbmVudHMvZHJvcGRvd24nO1xyXG5pbXBvcnQgeyB9IGZyb20gJy4vY29tcG9uZW50cy9hdXRvY29tcGxldGUnO1xyXG5pbXBvcnQgeyB9IGZyb20gJy4vY29tcG9uZW50cy9jaGVja2JveCc7XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7QUFHQSxBQUVBLE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7Q0FDMUMsUUFBUSxFQUFFLElBQUk7Q0FDZCxRQUFRLENBQUMsQ0FBQzs7Ozs7O0NBTVYsQ0FBQztDQUNELENBQUM7O0FDZEY7OztBQUdBLEFBRUEsT0FBTyxDQUFDLFVBQVUsQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztDQUNoRCxRQUFRLEVBQUUsSUFBSTtDQUNkLFFBQVEsQ0FBQywrRUFBK0U7Q0FDeEYsQ0FBQyxDQUFDOztBQUVILE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7Q0FDNUMsUUFBUSxFQUFFLElBQUk7Q0FDZCxRQUFRLENBQUMsQ0FBQzs7Ozs7OztDQU9WLENBQUM7SUFDRSxRQUFRLEVBQUUsVUFBVTs7UUFFaEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUNoQztDQUNKLENBQUM7O0FDeEJGOzs7QUFHQSxBQUVBLE9BQU8sQ0FBQyxVQUFVLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7SUFDN0MsUUFBUSxFQUFFLElBQUk7SUFDZCxRQUFRLEVBQUUsQ0FBQzs7Ozs7S0FLVixDQUFDO0lBQ0YsSUFBSSxFQUFFLFlBQVk7UUFDZCxPQUFPO1lBQ0gsS0FBSyxFQUFFLElBQUk7U0FDZCxDQUFDO0tBQ0w7SUFDRCxNQUFNLEVBQUUsWUFBWTs7S0FFbkI7SUFDRCxZQUFZLEVBQUUsWUFBWTtRQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDaEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUM7WUFDL0IsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO1NBQzFCLENBQUMsQ0FBQztLQUNOO0lBQ0QsV0FBVyxFQUFFLFVBQVUsS0FBSyxFQUFFO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzFEO0lBQ0QsUUFBUSxFQUFFLFlBQVk7UUFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUM1QztDQUNKLENBQUM7O0FDbENGOzs7QUFHQSxBQUVBOzs7QUFHQSxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO0NBQzVDLFFBQVEsRUFBRSxJQUFJO0NBQ2QsUUFBUSxDQUFDLENBQUM7OztZQUdDLENBQUM7SUFDVCxNQUFNLEVBQUUsVUFBVTtRQUNkLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0tBQ2xEO0lBQ0QsUUFBUSxDQUFDLFVBQVU7UUFDZixHQUFHLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxXQUFXLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDakUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQy9DO0tBQ0o7SUFDRCxJQUFJLEVBQUUsVUFBVTtRQUNaLE9BQU87WUFDSCxPQUFPLENBQUMsSUFBSTtTQUNmLENBQUM7S0FDTDtJQUNELGNBQWMsRUFBRSxTQUFTLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDZCxHQUFHLEtBQUssQ0FBQyxRQUFRO1lBQ2IsQ0FBQyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUM7UUFDdkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUN6Qzs7Q0FFSixDQUFDOztBQ2xDRjtBQUNBLEFBRUEsZ0RBQWdELEFBRWhELEFBQ0EsQUFDQSxBQUNBLEFBQXdDLDs7In0=
