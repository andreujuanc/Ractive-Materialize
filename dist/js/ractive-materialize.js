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
            items: []
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

// ---- main.js -----

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFjdGl2ZS1tYXRlcmlhbGl6ZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbXBvbmVudHMvYXBwYmFyLmpzIiwiLi4vLi4vc3JjL2NvbXBvbmVudHMvZHJvcGRvd24uanMiLCIuLi8uLi9zcmMvY29tcG9uZW50cy9hdXRvY29tcGxldGUuanMiLCIuLi8uLi9zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqIFx0XHRcdFx0QVBQQkFSXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuaW1wb3J0IFJhY3RpdmUgZnJvbSAncmFjdGl2ZSc7XHJcblxyXG5SYWN0aXZlLmNvbXBvbmVudHMuYXBwYmFyID0gUmFjdGl2ZS5leHRlbmQoe1xyXG5cdGlzb2xhdGVkOiB0cnVlLFxyXG5cdHRlbXBsYXRlOmBcclxuXHRcdCA8bmF2PlxyXG5cdFx0XHQ8ZGl2IGNsYXNzPVwibmF2LXdyYXBwZXJcIj5cclxuXHRcdFx0XHR7e3lpZWxkfX1cdFx0XHRcclxuXHRcdFx0PC9kaXY+XHJcblx0XHQ8L25hdj5cclxuXHRgXHJcbn0pOyIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogXHRcdFx0ICBEUk9QRE9XTlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbmltcG9ydCBSYWN0aXZlIGZyb20gJ3JhY3RpdmUnO1xyXG5cclxuUmFjdGl2ZS5jb21wb25lbnRzLmRyb3Bkb3duaXRlbSA9IFJhY3RpdmUuZXh0ZW5kKHtcclxuXHRpc29sYXRlZDogdHJ1ZSxcclxuXHR0ZW1wbGF0ZTonPGxpIHt7I2RpdmlkZXJ9fSBjbGFzcz1cImRpdmlkZXJcIiB7ey9kaXZpZGVyfX0gPjxhIGhyZWY9XCIjIVwiPnt7dGV4dH19PC9hPjwvbGk+J1xyXG59KTtcclxuXHJcblJhY3RpdmUuY29tcG9uZW50cy5kcm9wZG93biA9IFJhY3RpdmUuZXh0ZW5kKHtcclxuXHRpc29sYXRlZDogdHJ1ZSxcclxuXHR0ZW1wbGF0ZTpgXHJcblx0XHQ8YSBjbGFzcz0nZHJvcGRvd24tYnV0dG9uIGJ0bicgaHJlZj0nIycgZGF0YS1hY3RpdmF0ZXM9J2Ryb3Bkb3duMSc+RHJvcCBNZSE8L2E+XHJcblxyXG4gICAgICAgIDwhLS0gRHJvcGRvd24gU3RydWN0dXJlIC0tPlxyXG4gICAgICAgIDx1bCBpZD0nZHJvcGRvd24xJyBjbGFzcz0nZHJvcGRvd24tY29udGVudCc+XHJcbiAgICAgICAgICAgIHt7eWllbGR9fVxyXG4gICAgICAgIDwvdWw+XHJcblx0YCxcclxuICAgIG9ucmVuZGVyOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vd2luZG93LnRlc3QgPSB0aGlzO1xyXG4gICAgICAgICQodGhpcy5maW5kKCcqJykpLmRyb3Bkb3duKCk7XHJcbiAgICB9XHJcbn0pOyIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogXHRcdFx0QVVUT0NPTVBMRVRFXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuaW1wb3J0IFJhY3RpdmUgZnJvbSAncmFjdGl2ZSc7XHJcblxyXG5SYWN0aXZlLmNvbXBvbmVudHMuYXV0b2NvbXBsZXRlID0gUmFjdGl2ZS5leHRlbmQoe1xyXG4gICAgaXNvbGF0ZWQ6IHRydWUsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZFwiPlxyXG5cdFx0IDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwie3tpZH19XCIgY2xhc3M9XCJhdXRvY29tcGxldGVcIiBvbi1rZXl1cD1cInZhbHVlY2hhbmdlXCI+XHJcbiAgICAgICAgIDxsYWJlbCBmb3I9XCJ7e2lkfX1cIj5BZGQgSXRlbTwvbGFiZWw+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBcdGAsXHJcbiAgICBkYXRhOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaXRlbXM6IFtdXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBvbmluaXQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB9LFxyXG4gICAgaXRlbXNjaGFuZ2VkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2l0ZW1zIGNoYW5nZWQnLCB0aGlzLmdldCgnaXRlbXMnKSk7XHJcbiAgICAgICAgJCh0aGlzLmZpbmQoJ2lucHV0JykpLmF1dG9jb21wbGV0ZSh7XHJcbiAgICAgICAgICAgIGRhdGE6IHRoaXMuZ2V0KCdpdGVtcycpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgdmFsdWVjaGFuZ2U6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHRoaXMuZmlyZSgnYXV0b25lZWRkYXRhJywgZXZlbnQub3JpZ2luYWwudGFyZ2V0LnZhbHVlKTtcclxuICAgIH0sXHJcbiAgICBvbnJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMub2JzZXJ2ZSgnaXRlbXMnLCB0aGlzLml0ZW1zY2hhbmdlZCk7XHJcbiAgICAgICAgdGhpcy5vbigndmFsdWVjaGFuZ2UnLCB0aGlzLnZhbHVlY2hhbmdlKTtcclxuICAgIH1cclxufSk7IiwiLy8gLS0tLSBtYWluLmpzIC0tLS0tXHJcbmltcG9ydCB7UmFjdGl2ZX0gZnJvbSAncmFjdGl2ZSc7XHJcbmltcG9ydCB7IH0gZnJvbSAnLi9jb21wb25lbnRzL2FwcGJhcic7XHJcbmltcG9ydCB7IH0gZnJvbSAnLi9jb21wb25lbnRzL2Ryb3Bkb3duJztcclxuaW1wb3J0IHsgfSBmcm9tICcuL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlJztcclxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7OztBQUdBLEFBRUEsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztDQUMxQyxRQUFRLEVBQUUsSUFBSTtDQUNkLFFBQVEsQ0FBQyxDQUFDOzs7Ozs7Q0FNVixDQUFDO0NBQ0QsQ0FBQzs7QUNkRjs7O0FBR0EsQUFFQSxPQUFPLENBQUMsVUFBVSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO0NBQ2hELFFBQVEsRUFBRSxJQUFJO0NBQ2QsUUFBUSxDQUFDLCtFQUErRTtDQUN4RixDQUFDLENBQUM7O0FBRUgsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztDQUM1QyxRQUFRLEVBQUUsSUFBSTtDQUNkLFFBQVEsQ0FBQyxDQUFDOzs7Ozs7O0NBT1YsQ0FBQztJQUNFLFFBQVEsRUFBRSxVQUFVOztRQUVoQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ2hDO0NBQ0osQ0FBQzs7QUN4QkY7OztBQUdBLEFBRUEsT0FBTyxDQUFDLFVBQVUsQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztJQUM3QyxRQUFRLEVBQUUsSUFBSTtJQUNkLFFBQVEsRUFBRSxDQUFDOzs7OztLQUtWLENBQUM7SUFDRixJQUFJLEVBQUUsWUFBWTtRQUNkLE9BQU87WUFDSCxLQUFLLEVBQUUsRUFBRTtTQUNaLENBQUM7S0FDTDtJQUNELE1BQU0sRUFBRSxZQUFZOztLQUVuQjtJQUNELFlBQVksRUFBRSxZQUFZO1FBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQztZQUMvQixJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7U0FDMUIsQ0FBQyxDQUFDO0tBQ047SUFDRCxXQUFXLEVBQUUsVUFBVSxLQUFLLEVBQUU7UUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDMUQ7SUFDRCxRQUFRLEVBQUUsWUFBWTtRQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQzVDO0NBQ0osQ0FBQzs7QUNsQ0YscUJBQXFCLEFBQ3JCLEFBQ0EsQUFDQSxBQUNBLEFBQTRDLDs7In0=
