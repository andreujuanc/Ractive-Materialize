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
            checked:false
        };
    },
    checkedchanged: function(event){
        var e = event;
        if(event.original)
            e = event.original;
        this.set('checked', e.target.checked);
    },

});

/************************************
 * 			  COMBOBOX ITEM
 ***********************************/

Ractive.components.comboboxitem = Ractive.extend({
	isolated: true,
	template:'<option value="{{value}}">{{text}}</option>'
});

/************************************
 * 			  COMBOBOX
 ***********************************/
Ractive.components.combobox = Ractive.extend({
    isolated: true,
    template: `
            <select id="{{id}}" on-change="@this.selectedchanged(event)" value="{{value}}">
                <option value="" disabled selected>{{label}}</option>
                {{yield}}
            </select>
            <label for="{{id}}">{{label}}</label>
            `,
    oninit: function () {
        //this.on('selectedchanged', this.selectedchanged);
    },
    onrender: function () {
        var self = this;
        $(this.find('select')).material_select();
        $(this.find('select')).on('change', function(event){ self.selectedchanged(event, self); });
    },
    onteardown: function(){
        debugger;//TODO: test
        $(this.find('select')).material_select('destroy');
    },
    data: function () {
        return {
            selected: null,
            value:null
        };
    },
    selectedchanged: function (event, self) {
        debugger;
        var e = event;
        if (event.original)
            e = event.original;
        self.set('value', self.find('select').value);
        self.fire('change', event);
        //this.set('value', e.target.value);
    },

});

// ---- main.js -----
//import {} from './decorators/stopPropagation';

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFjdGl2ZS1tYXRlcmlhbGl6ZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbXBvbmVudHMvYXBwYmFyLmpzIiwiLi4vLi4vc3JjL2NvbXBvbmVudHMvZHJvcGRvd24uanMiLCIuLi8uLi9zcmMvY29tcG9uZW50cy9hdXRvY29tcGxldGUuanMiLCIuLi8uLi9zcmMvY29tcG9uZW50cy9jaGVja2JveC5qcyIsIi4uLy4uL3NyYy9jb21wb25lbnRzL2NvbWJvYm94LmpzIiwiLi4vLi4vc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKiBcdFx0XHRcdEFQUEJBUlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbmltcG9ydCBSYWN0aXZlIGZyb20gJ3JhY3RpdmUnO1xyXG5cclxuUmFjdGl2ZS5jb21wb25lbnRzLmFwcGJhciA9IFJhY3RpdmUuZXh0ZW5kKHtcclxuXHRpc29sYXRlZDogdHJ1ZSxcclxuXHR0ZW1wbGF0ZTpgXHJcblx0XHQgPG5hdj5cclxuXHRcdFx0PGRpdiBjbGFzcz1cIm5hdi13cmFwcGVyXCI+XHJcblx0XHRcdFx0e3t5aWVsZH19XHRcdFx0XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0PC9uYXY+XHJcblx0YFxyXG59KTsiLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqIFx0XHRcdCAgRFJPUERPV05cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5pbXBvcnQgUmFjdGl2ZSBmcm9tICdyYWN0aXZlJztcclxuXHJcblJhY3RpdmUuY29tcG9uZW50cy5kcm9wZG93bml0ZW0gPSBSYWN0aXZlLmV4dGVuZCh7XHJcblx0aXNvbGF0ZWQ6IHRydWUsXHJcblx0dGVtcGxhdGU6JzxsaSB7eyNkaXZpZGVyfX0gY2xhc3M9XCJkaXZpZGVyXCIge3svZGl2aWRlcn19ID48YSBocmVmPVwiIyFcIj57e3RleHR9fTwvYT48L2xpPidcclxufSk7XHJcblxyXG5SYWN0aXZlLmNvbXBvbmVudHMuZHJvcGRvd24gPSBSYWN0aXZlLmV4dGVuZCh7XHJcblx0aXNvbGF0ZWQ6IHRydWUsXHJcblx0dGVtcGxhdGU6YFxyXG5cdFx0PGEgY2xhc3M9J2Ryb3Bkb3duLWJ1dHRvbiBidG4nIGhyZWY9JyMnIGRhdGEtYWN0aXZhdGVzPSdkcm9wZG93bjEnPkRyb3AgTWUhPC9hPlxyXG5cclxuICAgICAgICA8IS0tIERyb3Bkb3duIFN0cnVjdHVyZSAtLT5cclxuICAgICAgICA8dWwgaWQ9J2Ryb3Bkb3duMScgY2xhc3M9J2Ryb3Bkb3duLWNvbnRlbnQnPlxyXG4gICAgICAgICAgICB7e3lpZWxkfX1cclxuICAgICAgICA8L3VsPlxyXG5cdGAsXHJcbiAgICBvbnJlbmRlcjogZnVuY3Rpb24oKXtcclxuICAgICAgICAvL3dpbmRvdy50ZXN0ID0gdGhpcztcclxuICAgICAgICAkKHRoaXMuZmluZCgnKicpKS5kcm9wZG93bigpO1xyXG4gICAgfVxyXG59KTsiLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqIFx0XHRcdEFVVE9DT01QTEVURVxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbmltcG9ydCBSYWN0aXZlIGZyb20gJ3JhY3RpdmUnO1xyXG5cclxuUmFjdGl2ZS5jb21wb25lbnRzLmF1dG9jb21wbGV0ZSA9IFJhY3RpdmUuZXh0ZW5kKHtcclxuICAgIGlzb2xhdGVkOiB0cnVlLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGRcIj5cclxuXHRcdCA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInt7aWR9fVwiIGNsYXNzPVwiYXV0b2NvbXBsZXRlXCIgb24ta2V5dXA9XCJ2YWx1ZWNoYW5nZVwiPlxyXG4gICAgICAgICA8bGFiZWwgZm9yPVwie3tpZH19XCI+QWRkIEl0ZW08L2xhYmVsPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgXHRgLFxyXG4gICAgZGF0YTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGl0ZW1zOiBudWxsXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBvbmluaXQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB9LFxyXG4gICAgaXRlbXNjaGFuZ2VkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2l0ZW1zIGNoYW5nZWQnLCB0aGlzLmdldCgnaXRlbXMnKSk7XHJcbiAgICAgICAgJCh0aGlzLmZpbmQoJ2lucHV0JykpLmF1dG9jb21wbGV0ZSh7XHJcbiAgICAgICAgICAgIGRhdGE6IHRoaXMuZ2V0KCdpdGVtcycpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgdmFsdWVjaGFuZ2U6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHRoaXMuZmlyZSgnYXV0b25lZWRkYXRhJywgZXZlbnQub3JpZ2luYWwudGFyZ2V0LnZhbHVlKTtcclxuICAgIH0sXHJcbiAgICBvbnJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMub2JzZXJ2ZSgnaXRlbXMnLCB0aGlzLml0ZW1zY2hhbmdlZCk7XHJcbiAgICAgICAgdGhpcy5vbigndmFsdWVjaGFuZ2UnLCB0aGlzLnZhbHVlY2hhbmdlKTtcclxuICAgIH1cclxufSk7IiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKiBcdFx0XHQgIENIRUNLQk9YXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuaW1wb3J0IFJhY3RpdmUgZnJvbSAncmFjdGl2ZSc7XHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqIFx0XHRcdCAgQ0hFQ0tCT1hcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5SYWN0aXZlLmNvbXBvbmVudHMuY2hlY2tib3ggPSBSYWN0aXZlLmV4dGVuZCh7XHJcblx0aXNvbGF0ZWQ6IHRydWUsXHJcblx0dGVtcGxhdGU6YFxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJ7e2lkfX1cIiB7eyNjaGVja2VkfX1jaGVja2Vke3svY2hlY2tlZH19IG9uLWNoYW5nZT1cImNoZWNrZWRjaGFuZ2VkXCIgLz5cclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cInt7aWR9fVwiID48L2xhYmVsPlxyXG4gICAgICAgICAgICBgLFxyXG4gICAgb25pbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMub24oJ2NoZWNrZWRjaGFuZ2VkJywgdGhpcy5jaGVja2VkY2hhbmdlZCk7XHJcbiAgICB9LFxyXG4gICAgb25yZW5kZXI6ZnVuY3Rpb24oKXtcclxuICAgICAgICBpZih0eXBlb2YgdGhpcy5nZXQoJ2lkJykgPT09ICd1bmRlZmluZWQnIHx8IHRoaXMuZ2V0KCdpZCcpID09PSBudWxsICl7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0KCdpZCcsICdjaGsnK0RhdGUubm93KCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGRhdGE6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY2hlY2tlZDpmYWxzZVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgY2hlY2tlZGNoYW5nZWQ6IGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICB2YXIgZSA9IGV2ZW50O1xyXG4gICAgICAgIGlmKGV2ZW50Lm9yaWdpbmFsKVxyXG4gICAgICAgICAgICBlID0gZXZlbnQub3JpZ2luYWw7XHJcbiAgICAgICAgdGhpcy5zZXQoJ2NoZWNrZWQnLCBlLnRhcmdldC5jaGVja2VkKTtcclxuICAgIH0sXHJcblxyXG59KTsiLCJpbXBvcnQgUmFjdGl2ZSBmcm9tICdyYWN0aXZlJztcclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogXHRcdFx0ICBDT01CT0JPWCBJVEVNXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcblJhY3RpdmUuY29tcG9uZW50cy5jb21ib2JveGl0ZW0gPSBSYWN0aXZlLmV4dGVuZCh7XHJcblx0aXNvbGF0ZWQ6IHRydWUsXHJcblx0dGVtcGxhdGU6JzxvcHRpb24gdmFsdWU9XCJ7e3ZhbHVlfX1cIj57e3RleHR9fTwvb3B0aW9uPidcclxufSk7XHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqIFx0XHRcdCAgQ09NQk9CT1hcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5SYWN0aXZlLmNvbXBvbmVudHMuY29tYm9ib3ggPSBSYWN0aXZlLmV4dGVuZCh7XHJcbiAgICBpc29sYXRlZDogdHJ1ZSxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgICAgIDxzZWxlY3QgaWQ9XCJ7e2lkfX1cIiBvbi1jaGFuZ2U9XCJAdGhpcy5zZWxlY3RlZGNoYW5nZWQoZXZlbnQpXCIgdmFsdWU9XCJ7e3ZhbHVlfX1cIj5cclxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIiBkaXNhYmxlZCBzZWxlY3RlZD57e2xhYmVsfX08L29wdGlvbj5cclxuICAgICAgICAgICAgICAgIHt7eWllbGR9fVxyXG4gICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cInt7aWR9fVwiPnt7bGFiZWx9fTwvbGFiZWw+XHJcbiAgICAgICAgICAgIGAsXHJcbiAgICBvbmluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL3RoaXMub24oJ3NlbGVjdGVkY2hhbmdlZCcsIHRoaXMuc2VsZWN0ZWRjaGFuZ2VkKTtcclxuICAgIH0sXHJcbiAgICBvbnJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICAkKHRoaXMuZmluZCgnc2VsZWN0JykpLm1hdGVyaWFsX3NlbGVjdCgpO1xyXG4gICAgICAgICQodGhpcy5maW5kKCdzZWxlY3QnKSkub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGV2ZW50KXsgc2VsZi5zZWxlY3RlZGNoYW5nZWQoZXZlbnQsIHNlbGYpOyB9KTtcclxuICAgIH0sXHJcbiAgICBvbnRlYXJkb3duOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGRlYnVnZ2VyOy8vVE9ETzogdGVzdFxyXG4gICAgICAgICQodGhpcy5maW5kKCdzZWxlY3QnKSkubWF0ZXJpYWxfc2VsZWN0KCdkZXN0cm95Jyk7XHJcbiAgICB9LFxyXG4gICAgZGF0YTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkOiBudWxsLFxyXG4gICAgICAgICAgICB2YWx1ZTpudWxsXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBzZWxlY3RlZGNoYW5nZWQ6IGZ1bmN0aW9uIChldmVudCwgc2VsZikge1xyXG4gICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgIHZhciBlID0gZXZlbnQ7XHJcbiAgICAgICAgaWYgKGV2ZW50Lm9yaWdpbmFsKVxyXG4gICAgICAgICAgICBlID0gZXZlbnQub3JpZ2luYWw7XHJcbiAgICAgICAgc2VsZi5zZXQoJ3ZhbHVlJywgc2VsZi5maW5kKCdzZWxlY3QnKS52YWx1ZSk7XHJcbiAgICAgICAgc2VsZi5maXJlKCdjaGFuZ2UnLCBldmVudCk7XHJcbiAgICAgICAgLy90aGlzLnNldCgndmFsdWUnLCBlLnRhcmdldC52YWx1ZSk7XHJcbiAgICB9LFxyXG5cclxufSk7IiwiLy8gLS0tLSBtYWluLmpzIC0tLS0tXHJcbmltcG9ydCB7UmFjdGl2ZX0gZnJvbSAncmFjdGl2ZSc7XHJcblxyXG4vL2ltcG9ydCB7fSBmcm9tICcuL2RlY29yYXRvcnMvc3RvcFByb3BhZ2F0aW9uJztcclxuXHJcbmltcG9ydCB7IH0gZnJvbSAnLi9jb21wb25lbnRzL2FwcGJhcic7XHJcbmltcG9ydCB7IH0gZnJvbSAnLi9jb21wb25lbnRzL2Ryb3Bkb3duJztcclxuaW1wb3J0IHsgfSBmcm9tICcuL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlJztcclxuaW1wb3J0IHsgfSBmcm9tICcuL2NvbXBvbmVudHMvY2hlY2tib3gnO1xyXG5pbXBvcnQgeyB9IGZyb20gJy4vY29tcG9uZW50cy9jb21ib2JveCc7XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7QUFHQSxBQUVBLE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7Q0FDMUMsUUFBUSxFQUFFLElBQUk7Q0FDZCxRQUFRLENBQUMsQ0FBQzs7Ozs7O0NBTVYsQ0FBQztDQUNELENBQUM7O0FDZEY7OztBQUdBLEFBRUEsT0FBTyxDQUFDLFVBQVUsQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztDQUNoRCxRQUFRLEVBQUUsSUFBSTtDQUNkLFFBQVEsQ0FBQywrRUFBK0U7Q0FDeEYsQ0FBQyxDQUFDOztBQUVILE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7Q0FDNUMsUUFBUSxFQUFFLElBQUk7Q0FDZCxRQUFRLENBQUMsQ0FBQzs7Ozs7OztDQU9WLENBQUM7SUFDRSxRQUFRLEVBQUUsVUFBVTs7UUFFaEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUNoQztDQUNKLENBQUM7O0FDeEJGOzs7QUFHQSxBQUVBLE9BQU8sQ0FBQyxVQUFVLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7SUFDN0MsUUFBUSxFQUFFLElBQUk7SUFDZCxRQUFRLEVBQUUsQ0FBQzs7Ozs7S0FLVixDQUFDO0lBQ0YsSUFBSSxFQUFFLFlBQVk7UUFDZCxPQUFPO1lBQ0gsS0FB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
