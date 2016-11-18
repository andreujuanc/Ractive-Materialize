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

// ---- main.js -----

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFjdGl2ZS1tYXRlcmlhbGl6ZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbXBvbmVudHMvYXBwYmFyLmpzIiwiLi4vLi4vc3JjL2NvbXBvbmVudHMvZHJvcGRvd24uanMiLCIuLi8uLi9zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqIFx0XHRcdFx0QVBQQkFSXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuaW1wb3J0IFJhY3RpdmUgZnJvbSAncmFjdGl2ZSc7XHJcblxyXG5SYWN0aXZlLmNvbXBvbmVudHMuYXBwYmFyID0gUmFjdGl2ZS5leHRlbmQoe1xyXG5cdGlzb2xhdGVkOiB0cnVlLFxyXG5cdHRlbXBsYXRlOmBcclxuXHRcdCA8bmF2PlxyXG5cdFx0XHQ8ZGl2IGNsYXNzPVwibmF2LXdyYXBwZXJcIj5cclxuXHRcdFx0XHR7e3lpZWxkfX1cdFx0XHRcclxuXHRcdFx0PC9kaXY+XHJcblx0XHQ8L25hdj5cclxuXHRgXHJcbn0pOyIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogXHRcdFx0ICBEUk9QRE9XTlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbmltcG9ydCBSYWN0aXZlIGZyb20gJ3JhY3RpdmUnO1xyXG5cclxuUmFjdGl2ZS5jb21wb25lbnRzLmRyb3Bkb3duaXRlbSA9IFJhY3RpdmUuZXh0ZW5kKHtcclxuXHRpc29sYXRlZDogdHJ1ZSxcclxuXHR0ZW1wbGF0ZTonPGxpIHt7I2RpdmlkZXJ9fSBjbGFzcz1cImRpdmlkZXJcIiB7ey9kaXZpZGVyfX0gPjxhIGhyZWY9XCIjIVwiPnt7dGV4dH19PC9hPjwvbGk+J1xyXG59KTtcclxuXHJcblJhY3RpdmUuY29tcG9uZW50cy5kcm9wZG93biA9IFJhY3RpdmUuZXh0ZW5kKHtcclxuXHRpc29sYXRlZDogdHJ1ZSxcclxuXHR0ZW1wbGF0ZTpgXHJcblx0XHQ8YSBjbGFzcz0nZHJvcGRvd24tYnV0dG9uIGJ0bicgaHJlZj0nIycgZGF0YS1hY3RpdmF0ZXM9J2Ryb3Bkb3duMSc+RHJvcCBNZSE8L2E+XHJcblxyXG4gICAgICAgIDwhLS0gRHJvcGRvd24gU3RydWN0dXJlIC0tPlxyXG4gICAgICAgIDx1bCBpZD0nZHJvcGRvd24xJyBjbGFzcz0nZHJvcGRvd24tY29udGVudCc+XHJcbiAgICAgICAgICAgIHt7eWllbGR9fVxyXG4gICAgICAgIDwvdWw+XHJcblx0YCxcclxuICAgIG9ucmVuZGVyOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vd2luZG93LnRlc3QgPSB0aGlzO1xyXG4gICAgICAgICQodGhpcy5maW5kKCcqJykpLmRyb3Bkb3duKCk7XHJcbiAgICB9XHJcbn0pOyIsIi8vIC0tLS0gbWFpbi5qcyAtLS0tLVxyXG5pbXBvcnQge1JhY3RpdmV9IGZyb20gJ3JhY3RpdmUnO1xyXG5pbXBvcnQgeyB9IGZyb20gJy4vY29tcG9uZW50cy9hcHBiYXInO1xyXG5pbXBvcnQgeyB9IGZyb20gJy4vY29tcG9uZW50cy9kcm9wZG93bic7XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7QUFHQSxBQUVBLE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7Q0FDMUMsUUFBUSxFQUFFLElBQUk7Q0FDZCxRQUFRLENBQUMsQ0FBQzs7Ozs7O0NBTVYsQ0FBQztDQUNELENBQUM7O0FDZEY7OztBQUdBLEFBRUEsT0FBTyxDQUFDLFVBQVUsQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztDQUNoRCxRQUFRLEVBQUUsSUFBSTtDQUNkLFFBQVEsQ0FBQywrRUFBK0U7Q0FDeEYsQ0FBQyxDQUFDOztBQUVILE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7Q0FDNUMsUUFBUSxFQUFFLElBQUk7Q0FDZCxRQUFRLENBQUMsQ0FBQzs7Ozs7OztDQU9WLENBQUM7SUFDRSxRQUFRLEVBQUUsVUFBVTs7UUFFaEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUNoQztDQUNKLENBQUM7O0FDeEJGLHFCQUFxQixBQUNyQixBQUNBLEFBQ0EsQUFBd0MsOzsifQ==
