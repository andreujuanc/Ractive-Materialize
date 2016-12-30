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
    template: `
            <li {{#divider}} class="divider" {{/divider}} >

                <a 
                    {{#href}}href="{{href}}"{{/href}}
                    on-click="@this.onclick(event)"
                 >
                    {{text}}
                </a>
                
            </li>`,
    onclick: function (event) {
        this.fire('click', event);
        //return false; no need
    }
});
//stoppropagation ??? needed?
Ractive.components.dropdown = Ractive.extend({
    isolated: true,
    template: `
		<a href='#' data-activates='{{id}}' stoppropagation="true">
            <i class="material-icons">more_vert</i>
        </a>

        <!-- Dropdown Structure -->
        <ul id='{{id}}' class='dropdown-content'>
            {{yield}}
        </ul>
	`,
    oninit: function () {
        if (typeof this.get('id') === 'undefined' || this.get('id') === null) {
            this.set('id', 'chk' + Date.now().toString());
        }
    },
    onrender: function () {
        //window.test = this;
        var belowOrigin = this.get('beloworigin');
        var constrain_width = this.get('constrainwidth');
        $(this.find('*')).dropdown({
            belowOrigin: belowOrigin,
            constrain_width: constrain_width
        });
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
	template:'<option value="{{value}}">{{text}}</option>',
    onrender: function(){
        $(this.parent.find('select')).material_select();
    }
});

/************************************
 * 			  COMBOBOX
 ***********************************/
Ractive.components.combobox = Ractive.extend({
    isolated: true,
    template: `
            <select id="{{id}}" on-change="@this.selectedchanged(event)" value="{{value}}" >
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
        var ctrl = this.find('select');
        $(ctrl).on('change', function(event){ self.selectedchanged(event, self); });
        $(ctrl).material_select();
        this.observe('value', function(a, b, c, d){            
            if(ctrl.value !== a){
               ctrl.value = a;
               self.update();
            }
            
        });
    },
    onchange: function(){
        $(this.find('select')).material_select();
    },
    oncomplete: function(){
       //$(this.find('select')).material_select();
    },
    onteardown: function(){
        //TODO: test
        $(this.find('select')).material_select('destroy');
    },
    data: function () {
        return {
            selected: null
        };
    },
    selectedchanged: function (event, self) {
        var e = event;
        if (event.original)
            e = event.original;

        self.set('value', self.find('select').value);
        self.fire('change', event);
        //this.set('value', e.target.value);
    },

});

/************************************
 * 				MODAL
 ***********************************/
Ractive.components.modalcontent = Ractive.extend({
    isolated: true,
    template: `
                <div class="modal-content">
                    <h4>{{title}}</h4>
                    {{yield}}
                </div>
	`
});

Ractive.components.modalfooter = Ractive.extend({
    isolated: true,
    template: `
                <div class="modal-footer">
                    {{yield}}
                </div>
	`
});

Ractive.components.modal = Ractive.extend({
    isolated: true,
    template: `
		  <div id="{{id}}" class="modal">
               {{yield}}
          </div>
	`,
    onrender: function () {
        if(!this.get('id')){
            console.error("Modal Component cannot work without id.");
            return;
        }

        $('#'+this.get('id')).modal({
            dismissible: true, // Modal can be dismissed by clicking outside of the modal
            // opacity: .5, // Opacity of modal background
            // in_duration: 300, // Transition in duration
            // out_duration: 200, // Transition out duration
            // starting_top: '4%', // Starting top style attribute
            // ending_top: '10%', // Ending top style attribute
            // ready: function (modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
            //    // alert("Ready");
            //     console.log(modal, trigger);
            // },
            // complete: function () { alert('Closed'); } // Callback for Modal close
        });
    }
});

// ---- main.js -----
//import {} from './decorators/stopPropagation';

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFjdGl2ZS1tYXRlcmlhbGl6ZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbXBvbmVudHMvYXBwYmFyLmpzIiwiLi4vLi4vc3JjL2NvbXBvbmVudHMvZHJvcGRvd24uanMiLCIuLi8uLi9zcmMvY29tcG9uZW50cy9hdXRvY29tcGxldGUuanMiLCIuLi8uLi9zcmMvY29tcG9uZW50cy9jaGVja2JveC5qcyIsIi4uLy4uL3NyYy9jb21wb25lbnRzL2NvbWJvYm94LmpzIiwiLi4vLi4vc3JjL2NvbXBvbmVudHMvbW9kYWwuanMiLCIuLi8uLi9zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqIFx0XHRcdFx0QVBQQkFSXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuaW1wb3J0IFJhY3RpdmUgZnJvbSAncmFjdGl2ZSc7XHJcblxyXG5SYWN0aXZlLmNvbXBvbmVudHMuYXBwYmFyID0gUmFjdGl2ZS5leHRlbmQoe1xyXG5cdGlzb2xhdGVkOiB0cnVlLFxyXG5cdHRlbXBsYXRlOmBcclxuXHRcdCA8bmF2PlxyXG5cdFx0XHQ8ZGl2IGNsYXNzPVwibmF2LXdyYXBwZXJcIj5cclxuXHRcdFx0XHR7e3lpZWxkfX1cdFx0XHRcclxuXHRcdFx0PC9kaXY+XHJcblx0XHQ8L25hdj5cclxuXHRgXHJcbn0pOyIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogXHRcdFx0ICBEUk9QRE9XTlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbmltcG9ydCBSYWN0aXZlIGZyb20gJ3JhY3RpdmUnO1xyXG5cclxuUmFjdGl2ZS5jb21wb25lbnRzLmRyb3Bkb3duaXRlbSA9IFJhY3RpdmUuZXh0ZW5kKHtcclxuICAgIGlzb2xhdGVkOiB0cnVlLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICAgICAgPGxpIHt7I2RpdmlkZXJ9fSBjbGFzcz1cImRpdmlkZXJcIiB7ey9kaXZpZGVyfX0gPlxyXG5cclxuICAgICAgICAgICAgICAgIDxhIFxyXG4gICAgICAgICAgICAgICAgICAgIHt7I2hyZWZ9fWhyZWY9XCJ7e2hyZWZ9fVwie3svaHJlZn19XHJcbiAgICAgICAgICAgICAgICAgICAgb24tY2xpY2s9XCJAdGhpcy5vbmNsaWNrKGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIHt7dGV4dH19XHJcbiAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgPC9saT5gLFxyXG4gICAgb25jbGljazogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5maXJlKCdjbGljaycsIGV2ZW50KTtcclxuICAgICAgICAvL3JldHVybiBmYWxzZTsgbm8gbmVlZFxyXG4gICAgfVxyXG59KTtcclxuLy9zdG9wcHJvcGFnYXRpb24gPz8/IG5lZWRlZD9cclxuUmFjdGl2ZS5jb21wb25lbnRzLmRyb3Bkb3duID0gUmFjdGl2ZS5leHRlbmQoe1xyXG4gICAgaXNvbGF0ZWQ6IHRydWUsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG5cdFx0PGEgaHJlZj0nIycgZGF0YS1hY3RpdmF0ZXM9J3t7aWR9fScgc3RvcHByb3BhZ2F0aW9uPVwidHJ1ZVwiPlxyXG4gICAgICAgICAgICA8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+bW9yZV92ZXJ0PC9pPlxyXG4gICAgICAgIDwvYT5cclxuXHJcbiAgICAgICAgPCEtLSBEcm9wZG93biBTdHJ1Y3R1cmUgLS0+XHJcbiAgICAgICAgPHVsIGlkPSd7e2lkfX0nIGNsYXNzPSdkcm9wZG93bi1jb250ZW50Jz5cclxuICAgICAgICAgICAge3t5aWVsZH19XHJcbiAgICAgICAgPC91bD5cclxuXHRgLFxyXG4gICAgb25pbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmdldCgnaWQnKSA9PT0gJ3VuZGVmaW5lZCcgfHwgdGhpcy5nZXQoJ2lkJykgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXQoJ2lkJywgJ2NoaycgKyBEYXRlLm5vdygpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvbnJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vd2luZG93LnRlc3QgPSB0aGlzO1xyXG4gICAgICAgIHZhciBiZWxvd09yaWdpbiA9IHRoaXMuZ2V0KCdiZWxvd29yaWdpbicpO1xyXG4gICAgICAgIHZhciBjb25zdHJhaW5fd2lkdGggPSB0aGlzLmdldCgnY29uc3RyYWlud2lkdGgnKVxyXG4gICAgICAgICQodGhpcy5maW5kKCcqJykpLmRyb3Bkb3duKHtcclxuICAgICAgICAgICAgYmVsb3dPcmlnaW46IGJlbG93T3JpZ2luLFxyXG4gICAgICAgICAgICBjb25zdHJhaW5fd2lkdGg6IGNvbnN0cmFpbl93aWR0aFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTsiLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqIFx0XHRcdEFVVE9DT01QTEVURVxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbmltcG9ydCBSYWN0aXZlIGZyb20gJ3JhY3RpdmUnO1xyXG5cclxuUmFjdGl2ZS5jb21wb25lbnRzLmF1dG9jb21wbGV0ZSA9IFJhY3RpdmUuZXh0ZW5kKHtcclxuICAgIGlzb2xhdGVkOiB0cnVlLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGRcIj5cclxuXHRcdCA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInt7aWR9fVwiIGNsYXNzPVwiYXV0b2NvbXBsZXRlXCIgb24ta2V5dXA9XCJ2YWx1ZWNoYW5nZVwiPlxyXG4gICAgICAgICA8bGFiZWwgZm9yPVwie3tpZH19XCI+QWRkIEl0ZW08L2xhYmVsPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgXHRgLFxyXG4gICAgZGF0YTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGl0ZW1zOiBudWxsXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBvbmluaXQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB9LFxyXG4gICAgaXRlbXNjaGFuZ2VkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2l0ZW1zIGNoYW5nZWQnLCB0aGlzLmdldCgnaXRlbXMnKSk7XHJcbiAgICAgICAgJCh0aGlzLmZpbmQoJ2lucHV0JykpLmF1dG9jb21wbGV0ZSh7XHJcbiAgICAgICAgICAgIGRhdGE6IHRoaXMuZ2V0KCdpdGVtcycpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgdmFsdWVjaGFuZ2U6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHRoaXMuZmlyZSgnYXV0b25lZWRkYXRhJywgZXZlbnQub3JpZ2luYWwudGFyZ2V0LnZhbHVlKTtcclxuICAgIH0sXHJcbiAgICBvbnJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMub2JzZXJ2ZSgnaXRlbXMnLCB0aGlzLml0ZW1zY2hhbmdlZCk7XHJcbiAgICAgICAgdGhpcy5vbigndmFsdWVjaGFuZ2UnLCB0aGlzLnZhbHVlY2hhbmdlKTtcclxuICAgIH1cclxufSk7IiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKiBcdFx0XHQgIENIRUNLQk9YXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuaW1wb3J0IFJhY3RpdmUgZnJvbSAncmFjdGl2ZSc7XHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqIFx0XHRcdCAgQ0hFQ0tCT1hcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5SYWN0aXZlLmNvbXBvbmVudHMuY2hlY2tib3ggPSBSYWN0aXZlLmV4dGVuZCh7XHJcblx0aXNvbGF0ZWQ6IHRydWUsXHJcblx0dGVtcGxhdGU6YFxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJ7e2lkfX1cIiB7eyNjaGVja2VkfX1jaGVja2Vke3svY2hlY2tlZH19IG9uLWNoYW5nZT1cImNoZWNrZWRjaGFuZ2VkXCIgLz5cclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cInt7aWR9fVwiID48L2xhYmVsPlxyXG4gICAgICAgICAgICBgLFxyXG4gICAgb25pbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMub24oJ2NoZWNrZWRjaGFuZ2VkJywgdGhpcy5jaGVja2VkY2hhbmdlZCk7XHJcbiAgICB9LFxyXG4gICAgb25yZW5kZXI6ZnVuY3Rpb24oKXtcclxuICAgICAgICBpZih0eXBlb2YgdGhpcy5nZXQoJ2lkJykgPT09ICd1bmRlZmluZWQnIHx8IHRoaXMuZ2V0KCdpZCcpID09PSBudWxsICl7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0KCdpZCcsICdjaGsnK0RhdGUubm93KCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGRhdGE6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY2hlY2tlZDpmYWxzZVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgY2hlY2tlZGNoYW5nZWQ6IGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICB2YXIgZSA9IGV2ZW50O1xyXG4gICAgICAgIGlmKGV2ZW50Lm9yaWdpbmFsKVxyXG4gICAgICAgICAgICBlID0gZXZlbnQub3JpZ2luYWw7XHJcbiAgICAgICAgdGhpcy5zZXQoJ2NoZWNrZWQnLCBlLnRhcmdldC5jaGVja2VkKTtcclxuICAgIH0sXHJcblxyXG59KTsiLCJpbXBvcnQgUmFjdGl2ZSBmcm9tICdyYWN0aXZlJztcclxuXHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqIFx0XHRcdCAgQ09NQk9CT1ggSVRFTVxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5SYWN0aXZlLmNvbXBvbmVudHMuY29tYm9ib3hpdGVtID0gUmFjdGl2ZS5leHRlbmQoe1xyXG5cdGlzb2xhdGVkOiB0cnVlLFxyXG5cdHRlbXBsYXRlOic8b3B0aW9uIHZhbHVlPVwie3t2YWx1ZX19XCI+e3t0ZXh0fX08L29wdGlvbj4nLFxyXG4gICAgb25yZW5kZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCh0aGlzLnBhcmVudC5maW5kKCdzZWxlY3QnKSkubWF0ZXJpYWxfc2VsZWN0KCk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKiBcdFx0XHQgIENPTUJPQk9YXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuUmFjdGl2ZS5jb21wb25lbnRzLmNvbWJvYm94ID0gUmFjdGl2ZS5leHRlbmQoe1xyXG4gICAgaXNvbGF0ZWQ6IHRydWUsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgICAgICA8c2VsZWN0IGlkPVwie3tpZH19XCIgb24tY2hhbmdlPVwiQHRoaXMuc2VsZWN0ZWRjaGFuZ2VkKGV2ZW50KVwiIHZhbHVlPVwie3t2YWx1ZX19XCIgPlxyXG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiIGRpc2FibGVkIHNlbGVjdGVkPnt7bGFiZWx9fTwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAge3t5aWVsZH19XHJcbiAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwie3tpZH19XCI+e3tsYWJlbH19PC9sYWJlbD5cclxuICAgICAgICAgICAgYCxcclxuICAgIG9uaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vdGhpcy5vbignc2VsZWN0ZWRjaGFuZ2VkJywgdGhpcy5zZWxlY3RlZGNoYW5nZWQpO1xyXG4gICAgICBcclxuICAgIH0sXHJcbiAgICBvbnJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB2YXIgY3RybCA9IHRoaXMuZmluZCgnc2VsZWN0Jyk7XHJcbiAgICAgICAgJChjdHJsKS5vbignY2hhbmdlJywgZnVuY3Rpb24oZXZlbnQpeyBzZWxmLnNlbGVjdGVkY2hhbmdlZChldmVudCwgc2VsZik7IH0pO1xyXG4gICAgICAgICQoY3RybCkubWF0ZXJpYWxfc2VsZWN0KCk7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZlKCd2YWx1ZScsIGZ1bmN0aW9uKGEsIGIsIGMsIGQpeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihjdHJsLnZhbHVlICE9PSBhKXtcclxuICAgICAgICAgICAgICAgY3RybC52YWx1ZSA9IGE7XHJcbiAgICAgICAgICAgICAgIHNlbGYudXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgb25jaGFuZ2U6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCh0aGlzLmZpbmQoJ3NlbGVjdCcpKS5tYXRlcmlhbF9zZWxlY3QoKTtcclxuICAgIH0sXHJcbiAgICBvbmNvbXBsZXRlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgLy8kKHRoaXMuZmluZCgnc2VsZWN0JykpLm1hdGVyaWFsX3NlbGVjdCgpO1xyXG4gICAgfSxcclxuICAgIG9udGVhcmRvd246IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy9UT0RPOiB0ZXN0XHJcbiAgICAgICAgJCh0aGlzLmZpbmQoJ3NlbGVjdCcpKS5tYXRlcmlhbF9zZWxlY3QoJ2Rlc3Ryb3knKTtcclxuICAgIH0sXHJcbiAgICBkYXRhOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc2VsZWN0ZWQ6IG51bGxcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIHNlbGVjdGVkY2hhbmdlZDogZnVuY3Rpb24gKGV2ZW50LCBzZWxmKSB7XHJcbiAgICAgICAgdmFyIGUgPSBldmVudDtcclxuICAgICAgICBpZiAoZXZlbnQub3JpZ2luYWwpXHJcbiAgICAgICAgICAgIGUgPSBldmVudC5vcmlnaW5hbDtcclxuXHJcbiAgICAgICAgc2VsZi5zZXQoJ3ZhbHVlJywgc2VsZi5maW5kKCdzZWxlY3QnKS52YWx1ZSk7XHJcbiAgICAgICAgc2VsZi5maXJlKCdjaGFuZ2UnLCBldmVudCk7XHJcbiAgICAgICAgLy90aGlzLnNldCgndmFsdWUnLCBlLnRhcmdldC52YWx1ZSk7XHJcbiAgICB9LFxyXG5cclxufSk7IiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKiBcdFx0XHRcdE1PREFMXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuaW1wb3J0IFJhY3RpdmUgZnJvbSAncmFjdGl2ZSc7XHJcblxyXG5SYWN0aXZlLmNvbXBvbmVudHMubW9kYWxjb250ZW50ID0gUmFjdGl2ZS5leHRlbmQoe1xyXG4gICAgaXNvbGF0ZWQ6IHRydWUsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDQ+e3t0aXRsZX19PC9oND5cclxuICAgICAgICAgICAgICAgICAgICB7e3lpZWxkfX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cdGBcclxufSk7XHJcblxyXG5SYWN0aXZlLmNvbXBvbmVudHMubW9kYWxmb290ZXIgPSBSYWN0aXZlLmV4dGVuZCh7XHJcbiAgICBpc29sYXRlZDogdHJ1ZSxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAge3t5aWVsZH19XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHRgXHJcbn0pO1xyXG5cclxuUmFjdGl2ZS5jb21wb25lbnRzLm1vZGFsID0gUmFjdGl2ZS5leHRlbmQoe1xyXG4gICAgaXNvbGF0ZWQ6IHRydWUsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG5cdFx0ICA8ZGl2IGlkPVwie3tpZH19XCIgY2xhc3M9XCJtb2RhbFwiPlxyXG4gICAgICAgICAgICAgICB7e3lpZWxkfX1cclxuICAgICAgICAgIDwvZGl2PlxyXG5cdGAsXHJcbiAgICBvbnJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmdldCgnaWQnKSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJNb2RhbCBDb21wb25lbnQgY2Fubm90IHdvcmsgd2l0aG91dCBpZC5cIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoJyMnK3RoaXMuZ2V0KCdpZCcpKS5tb2RhbCh7XHJcbiAgICAgICAgICAgIGRpc21pc3NpYmxlOiB0cnVlLCAvLyBNb2RhbCBjYW4gYmUgZGlzbWlzc2VkIGJ5IGNsaWNraW5nIG91dHNpZGUgb2YgdGhlIG1vZGFsXHJcbiAgICAgICAgICAgIC8vIG9wYWNpdHk6IC41LCAvLyBPcGFjaXR5IG9mIG1vZGFsIGJhY2tncm91bmRcclxuICAgICAgICAgICAgLy8gaW5fZHVyYXRpb246IDMwMCwgLy8gVHJhbnNpdGlvbiBpbiBkdXJhdGlvblxyXG4gICAgICAgICAgICAvLyBvdXRfZHVyYXRpb246IDIwMCwgLy8gVHJhbnNpdGlvbiBvdXQgZHVyYXRpb25cclxuICAgICAgICAgICAgLy8gc3RhcnRpbmdfdG9wOiAnNCUnLCAvLyBTdGFydGluZyB0b3Agc3R5bGUgYXR0cmlidXRlXHJcbiAgICAgICAgICAgIC8vIGVuZGluZ190b3A6ICcxMCUnLCAvLyBFbmRpbmcgdG9wIHN0eWxlIGF0dHJpYnV0ZVxyXG4gICAgICAgICAgICAvLyByZWFkeTogZnVuY3Rpb24gKG1vZGFsLCB0cmlnZ2VyKSB7IC8vIENhbGxiYWNrIGZvciBNb2RhbCBvcGVuLiBNb2RhbCBhbmQgdHJpZ2dlciBwYXJhbWV0ZXJzIGF2YWlsYWJsZS5cclxuICAgICAgICAgICAgLy8gICAgLy8gYWxlcnQoXCJSZWFkeVwiKTtcclxuICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKG1vZGFsLCB0cmlnZ2VyKTtcclxuICAgICAgICAgICAgLy8gfSxcclxuICAgICAgICAgICAgLy8gY29tcGxldGU6IGZ1bmN0aW9uICgpIHsgYWxlcnQoJ0Nsb3NlZCcpOyB9IC8vIENhbGxiYWNrIGZvciBNb2RhbCBjbG9zZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTsiLCIvLyAtLS0tIG1haW4uanMgLS0tLS1cclxuaW1wb3J0IHtSYWN0aXZlfSBmcm9tICdyYWN0aXZlJztcclxuXHJcbi8vaW1wb3J0IHt9IGZyb20gJy4vZGVjb3JhdG9ycy9zdG9wUHJvcGFnYXRpb24nO1xyXG5cclxuaW1wb3J0IHsgfSBmcm9tICcuL2NvbXBvbmVudHMvYXBwYmFyJztcclxuaW1wb3J0IHsgfSBmcm9tICcuL2NvbXBvbmVudHMvZHJvcGRvd24nO1xyXG5pbXBvcnQgeyB9IGZyb20gJy4vY29tcG9uZW50cy9hdXRvY29tcGxldGUnO1xyXG5pbXBvcnQgeyB9IGZyb20gJy4vY29tcG9uZW50cy9jaGVja2JveCc7XHJcbmltcG9ydCB7IH0gZnJvbSAnLi9jb21wb25lbnRzL2NvbWJvYm94JztcclxuaW1wb3J0IHsgfSBmcm9tICcuL2NvbXBvbmVudHMvbW9kYWwnO1xyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7O0FBR0EsQUFFQSxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO0NBQzFDLFFBQVEsRUFBRSxJQUFJO0NBQ2QsUUFBUSxDQUFDLENBQUM7Ozs7OztD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
