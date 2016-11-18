(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(['ractive'],factory) :
	(factory());
}(this, (function (Ractive) { 'use strict';

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFjdGl2ZS1tYXRlcmlhbGl6ZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbXBvbmVudHMvYXBwYmFyLmpzIiwiLi4vLi4vc3JjL2NvbXBvbmVudHMvZHJvcGRvd24uanMiLCIuLi8uLi9zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqIFx0XHRcdFx0QVBQQkFSXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuUmFjdGl2ZS5jb21wb25lbnRzLmFwcGJhciA9IFJhY3RpdmUuZXh0ZW5kKHtcclxuXHRpc29sYXRlZDogdHJ1ZSxcclxuXHR0ZW1wbGF0ZTpgXHJcblx0XHQgPG5hdj5cclxuXHRcdFx0PGRpdiBjbGFzcz1cIm5hdi13cmFwcGVyXCI+XHJcblx0XHRcdFx0e3t5aWVsZH19XHRcdFx0XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0PC9uYXY+XHJcblx0YFxyXG59KTsiLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqIFx0XHRcdCAgRFJPUERPV05cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5SYWN0aXZlLmNvbXBvbmVudHMuZHJvcGRvd25pdGVtID0gUmFjdGl2ZS5leHRlbmQoe1xyXG5cdGlzb2xhdGVkOiB0cnVlLFxyXG5cdHRlbXBsYXRlOic8bGkge3sjZGl2aWRlcn19IGNsYXNzPVwiZGl2aWRlclwiIHt7L2RpdmlkZXJ9fSA+PGEgaHJlZj1cIiMhXCI+e3t0ZXh0fX08L2E+PC9saT4nXHJcbn0pO1xyXG5cclxuUmFjdGl2ZS5jb21wb25lbnRzLmRyb3Bkb3duID0gUmFjdGl2ZS5leHRlbmQoe1xyXG5cdGlzb2xhdGVkOiB0cnVlLFxyXG5cdHRlbXBsYXRlOmBcclxuXHRcdDxhIGNsYXNzPSdkcm9wZG93bi1idXR0b24gYnRuJyBocmVmPScjJyBkYXRhLWFjdGl2YXRlcz0nZHJvcGRvd24xJz5Ecm9wIE1lITwvYT5cclxuXHJcbiAgICAgICAgPCEtLSBEcm9wZG93biBTdHJ1Y3R1cmUgLS0+XHJcbiAgICAgICAgPHVsIGlkPSdkcm9wZG93bjEnIGNsYXNzPSdkcm9wZG93bi1jb250ZW50Jz5cclxuICAgICAgICAgICAge3t5aWVsZH19XHJcbiAgICAgICAgPC91bD5cclxuXHRgLFxyXG4gICAgb25yZW5kZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy93aW5kb3cudGVzdCA9IHRoaXM7XHJcbiAgICAgICAgJCh0aGlzLmZpbmQoJyonKSkuZHJvcGRvd24oKTtcclxuICAgIH1cclxufSk7IiwiLy8gLS0tLSBtYWluLmpzIC0tLS0tXHJcbmltcG9ydCB7IH0gZnJvbSAnLi9jb21wb25lbnRzL2FwcGJhcic7XHJcbmltcG9ydCB7IH0gZnJvbSAnLi9jb21wb25lbnRzL2Ryb3Bkb3duJztcclxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7QUFHQSxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO0NBQzFDLFFBQVEsRUFBRSxJQUFJO0NBQ2QsUUFBUSxDQUFDLENBQUM7Ozs7OztDQU1WLENBQUM7Q0FDRCxDQUFDOztBQ1pGOzs7QUFHQSxPQUFPLENBQUMsVUFBVSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO0NBQ2hELFFBQVEsRUFBRSxJQUFJO0NBQ2QsUUFBUSxDQUFDLCtFQUErRTtDQUN4RixDQUFDLENBQUM7O0FBRUgsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztDQUM1QyxRQUFRLEVBQUUsSUFBSTtDQUNkLFFBQVEsQ0FBQyxDQUFDOzs7Ozs7O0NBT1YsQ0FBQztJQUNFLFFBQVEsRUFBRSxVQUFVOztRQUVoQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ2hDO0NBQ0osQ0FBQzs7QUN0QkYscUJBQXFCLEFBQ3JCLEFBQ0EsQUFBd0MsOzsifQ==
