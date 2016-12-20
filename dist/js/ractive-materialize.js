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
        return false;
    }
});

Ractive.components.dropdown = Ractive.extend({
    isolated: true,
    template: `
		<a href='#' data-activates='{{id}}'>
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

/************************************
 * 				APPBAR
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFjdGl2ZS1tYXRlcmlhbGl6ZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbXBvbmVudHMvYXBwYmFyLmpzIiwiLi4vLi4vc3JjL2NvbXBvbmVudHMvZHJvcGRvd24uanMiLCIuLi8uLi9zcmMvY29tcG9uZW50cy9hdXRvY29tcGxldGUuanMiLCIuLi8uLi9zcmMvY29tcG9uZW50cy9jaGVja2JveC5qcyIsIi4uLy4uL3NyYy9jb21wb25lbnRzL2NvbWJvYm94LmpzIiwiLi4vLi4vc3JjL2NvbXBvbmVudHMvbW9kYWwuanMiLCIuLi8uLi9zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqIFx0XHRcdFx0QVBQQkFSXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuaW1wb3J0IFJhY3RpdmUgZnJvbSAncmFjdGl2ZSc7XHJcblxyXG5SYWN0aXZlLmNvbXBvbmVudHMuYXBwYmFyID0gUmFjdGl2ZS5leHRlbmQoe1xyXG5cdGlzb2xhdGVkOiB0cnVlLFxyXG5cdHRlbXBsYXRlOmBcclxuXHRcdCA8bmF2PlxyXG5cdFx0XHQ8ZGl2IGNsYXNzPVwibmF2LXdyYXBwZXJcIj5cclxuXHRcdFx0XHR7e3lpZWxkfX1cdFx0XHRcclxuXHRcdFx0PC9kaXY+XHJcblx0XHQ8L25hdj5cclxuXHRgXHJcbn0pOyIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogXHRcdFx0ICBEUk9QRE9XTlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbmltcG9ydCBSYWN0aXZlIGZyb20gJ3JhY3RpdmUnO1xyXG5cclxuUmFjdGl2ZS5jb21wb25lbnRzLmRyb3Bkb3duaXRlbSA9IFJhY3RpdmUuZXh0ZW5kKHtcclxuICAgIGlzb2xhdGVkOiB0cnVlLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICAgICAgPGxpIHt7I2RpdmlkZXJ9fSBjbGFzcz1cImRpdmlkZXJcIiB7ey9kaXZpZGVyfX0gPlxyXG5cclxuICAgICAgICAgICAgICAgIDxhIFxyXG4gICAgICAgICAgICAgICAgICAgIHt7I2hyZWZ9fWhyZWY9XCJ7e2hyZWZ9fVwie3svaHJlZn19XHJcbiAgICAgICAgICAgICAgICAgICAgb24tY2xpY2s9XCJAdGhpcy5vbmNsaWNrKGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIHt7dGV4dH19XHJcbiAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgPC9saT5gLFxyXG4gICAgb25jbGljazogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5maXJlKCdjbGljaycsIGV2ZW50KTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuUmFjdGl2ZS5jb21wb25lbnRzLmRyb3Bkb3duID0gUmFjdGl2ZS5leHRlbmQoe1xyXG4gICAgaXNvbGF0ZWQ6IHRydWUsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG5cdFx0PGEgaHJlZj0nIycgZGF0YS1hY3RpdmF0ZXM9J3t7aWR9fSc+XHJcbiAgICAgICAgICAgIDxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5tb3JlX3ZlcnQ8L2k+XHJcbiAgICAgICAgPC9hPlxyXG5cclxuICAgICAgICA8IS0tIERyb3Bkb3duIFN0cnVjdHVyZSAtLT5cclxuICAgICAgICA8dWwgaWQ9J3t7aWR9fScgY2xhc3M9J2Ryb3Bkb3duLWNvbnRlbnQnPlxyXG4gICAgICAgICAgICB7e3lpZWxkfX1cclxuICAgICAgICA8L3VsPlxyXG5cdGAsXHJcbiAgICBvbmluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuZ2V0KCdpZCcpID09PSAndW5kZWZpbmVkJyB8fCB0aGlzLmdldCgnaWQnKSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldCgnaWQnLCAnY2hrJyArIERhdGUubm93KCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG9ucmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy93aW5kb3cudGVzdCA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGJlbG93T3JpZ2luID0gdGhpcy5nZXQoJ2JlbG93b3JpZ2luJyk7XHJcbiAgICAgICAgdmFyIGNvbnN0cmFpbl93aWR0aCA9IHRoaXMuZ2V0KCdjb25zdHJhaW53aWR0aCcpXHJcbiAgICAgICAgJCh0aGlzLmZpbmQoJyonKSkuZHJvcGRvd24oe1xyXG4gICAgICAgICAgICBiZWxvd09yaWdpbjogYmVsb3dPcmlnaW4sXHJcbiAgICAgICAgICAgIGNvbnN0cmFpbl93aWR0aDogY29uc3RyYWluX3dpZHRoXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pOyIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogXHRcdFx0QVVUT0NPTVBMRVRFXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuaW1wb3J0IFJhY3RpdmUgZnJvbSAncmFjdGl2ZSc7XHJcblxyXG5SYWN0aXZlLmNvbXBvbmVudHMuYXV0b2NvbXBsZXRlID0gUmFjdGl2ZS5leHRlbmQoe1xyXG4gICAgaXNvbGF0ZWQ6IHRydWUsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZFwiPlxyXG5cdFx0IDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwie3tpZH19XCIgY2xhc3M9XCJhdXRvY29tcGxldGVcIiBvbi1rZXl1cD1cInZhbHVlY2hhbmdlXCI+XHJcbiAgICAgICAgIDxsYWJlbCBmb3I9XCJ7e2lkfX1cIj5BZGQgSXRlbTwvbGFiZWw+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBcdGAsXHJcbiAgICBkYXRhOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaXRlbXM6IG51bGxcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIG9uaW5pdDogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIH0sXHJcbiAgICBpdGVtc2NoYW5nZWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnaXRlbXMgY2hhbmdlZCcsIHRoaXMuZ2V0KCdpdGVtcycpKTtcclxuICAgICAgICAkKHRoaXMuZmluZCgnaW5wdXQnKSkuYXV0b2NvbXBsZXRlKHtcclxuICAgICAgICAgICAgZGF0YTogdGhpcy5nZXQoJ2l0ZW1zJylcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICB2YWx1ZWNoYW5nZTogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5maXJlKCdhdXRvbmVlZGRhdGEnLCBldmVudC5vcmlnaW5hbC50YXJnZXQudmFsdWUpO1xyXG4gICAgfSxcclxuICAgIG9ucmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZlKCdpdGVtcycsIHRoaXMuaXRlbXNjaGFuZ2VkKTtcclxuICAgICAgICB0aGlzLm9uKCd2YWx1ZWNoYW5nZScsIHRoaXMudmFsdWVjaGFuZ2UpO1xyXG4gICAgfVxyXG59KTsiLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqIFx0XHRcdCAgQ0hFQ0tCT1hcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5pbXBvcnQgUmFjdGl2ZSBmcm9tICdyYWN0aXZlJztcclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogXHRcdFx0ICBDSEVDS0JPWFxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblJhY3RpdmUuY29tcG9uZW50cy5jaGVja2JveCA9IFJhY3RpdmUuZXh0ZW5kKHtcclxuXHRpc29sYXRlZDogdHJ1ZSxcclxuXHR0ZW1wbGF0ZTpgXHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cInt7aWR9fVwiIHt7I2NoZWNrZWR9fWNoZWNrZWR7ey9jaGVja2VkfX0gb24tY2hhbmdlPVwiY2hlY2tlZGNoYW5nZWRcIiAvPlxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwie3tpZH19XCIgPjwvbGFiZWw+XHJcbiAgICAgICAgICAgIGAsXHJcbiAgICBvbmluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5vbignY2hlY2tlZGNoYW5nZWQnLCB0aGlzLmNoZWNrZWRjaGFuZ2VkKTtcclxuICAgIH0sXHJcbiAgICBvbnJlbmRlcjpmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLmdldCgnaWQnKSA9PT0gJ3VuZGVmaW5lZCcgfHwgdGhpcy5nZXQoJ2lkJykgPT09IG51bGwgKXtcclxuICAgICAgICAgICAgdGhpcy5zZXQoJ2lkJywgJ2NoaycrRGF0ZS5ub3coKS50b1N0cmluZygpKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZGF0YTogZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjaGVja2VkOmZhbHNlXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBjaGVja2VkY2hhbmdlZDogZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgIHZhciBlID0gZXZlbnQ7XHJcbiAgICAgICAgaWYoZXZlbnQub3JpZ2luYWwpXHJcbiAgICAgICAgICAgIGUgPSBldmVudC5vcmlnaW5hbDtcclxuICAgICAgICB0aGlzLnNldCgnY2hlY2tlZCcsIGUudGFyZ2V0LmNoZWNrZWQpO1xyXG4gICAgfSxcclxuXHJcbn0pOyIsImltcG9ydCBSYWN0aXZlIGZyb20gJ3JhY3RpdmUnO1xyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKiBcdFx0XHQgIENPTUJPQk9YIElURU1cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuUmFjdGl2ZS5jb21wb25lbnRzLmNvbWJvYm94aXRlbSA9IFJhY3RpdmUuZXh0ZW5kKHtcclxuXHRpc29sYXRlZDogdHJ1ZSxcclxuXHR0ZW1wbGF0ZTonPG9wdGlvbiB2YWx1ZT1cInt7dmFsdWV9fVwiPnt7dGV4dH19PC9vcHRpb24+J1xyXG59KTtcclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogXHRcdFx0ICBDT01CT0JPWFxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblJhY3RpdmUuY29tcG9uZW50cy5jb21ib2JveCA9IFJhY3RpdmUuZXh0ZW5kKHtcclxuICAgIGlzb2xhdGVkOiB0cnVlLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICAgICAgPHNlbGVjdCBpZD1cInt7aWR9fVwiIG9uLWNoYW5nZT1cIkB0aGlzLnNlbGVjdGVkY2hhbmdlZChldmVudClcIiB2YWx1ZT1cInt7dmFsdWV9fVwiPlxyXG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiIGRpc2FibGVkIHNlbGVjdGVkPnt7bGFiZWx9fTwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAge3t5aWVsZH19XHJcbiAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwie3tpZH19XCI+e3tsYWJlbH19PC9sYWJlbD5cclxuICAgICAgICAgICAgYCxcclxuICAgIG9uaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vdGhpcy5vbignc2VsZWN0ZWRjaGFuZ2VkJywgdGhpcy5zZWxlY3RlZGNoYW5nZWQpO1xyXG4gICAgfSxcclxuICAgIG9ucmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICQodGhpcy5maW5kKCdzZWxlY3QnKSkubWF0ZXJpYWxfc2VsZWN0KCk7XHJcbiAgICAgICAgJCh0aGlzLmZpbmQoJ3NlbGVjdCcpKS5vbignY2hhbmdlJywgZnVuY3Rpb24oZXZlbnQpeyBzZWxmLnNlbGVjdGVkY2hhbmdlZChldmVudCwgc2VsZik7IH0pO1xyXG4gICAgfSxcclxuICAgIG9udGVhcmRvd246IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgZGVidWdnZXI7Ly9UT0RPOiB0ZXN0XHJcbiAgICAgICAgJCh0aGlzLmZpbmQoJ3NlbGVjdCcpKS5tYXRlcmlhbF9zZWxlY3QoJ2Rlc3Ryb3knKTtcclxuICAgIH0sXHJcbiAgICBkYXRhOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc2VsZWN0ZWQ6IG51bGwsXHJcbiAgICAgICAgICAgIHZhbHVlOm51bGxcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIHNlbGVjdGVkY2hhbmdlZDogZnVuY3Rpb24gKGV2ZW50LCBzZWxmKSB7XHJcbiAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgdmFyIGUgPSBldmVudDtcclxuICAgICAgICBpZiAoZXZlbnQub3JpZ2luYWwpXHJcbiAgICAgICAgICAgIGUgPSBldmVudC5vcmlnaW5hbDtcclxuICAgICAgICBzZWxmLnNldCgndmFsdWUnLCBzZWxmLmZpbmQoJ3NlbGVjdCcpLnZhbHVlKTtcclxuICAgICAgICBzZWxmLmZpcmUoJ2NoYW5nZScsIGV2ZW50KTtcclxuICAgICAgICAvL3RoaXMuc2V0KCd2YWx1ZScsIGUudGFyZ2V0LnZhbHVlKTtcclxuICAgIH0sXHJcblxyXG59KTsiLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqIFx0XHRcdFx0QVBQQkFSXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuaW1wb3J0IFJhY3RpdmUgZnJvbSAncmFjdGl2ZSc7XHJcblxyXG5SYWN0aXZlLmNvbXBvbmVudHMubW9kYWxjb250ZW50ID0gUmFjdGl2ZS5leHRlbmQoe1xyXG4gICAgaXNvbGF0ZWQ6IHRydWUsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDQ+e3t0aXRsZX19PC9oND5cclxuICAgICAgICAgICAgICAgICAgICB7e3lpZWxkfX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cdGBcclxufSk7XHJcblxyXG5SYWN0aXZlLmNvbXBvbmVudHMubW9kYWxmb290ZXIgPSBSYWN0aXZlLmV4dGVuZCh7XHJcbiAgICBpc29sYXRlZDogdHJ1ZSxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAge3t5aWVsZH19XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHRgXHJcbn0pO1xyXG5cclxuUmFjdGl2ZS5jb21wb25lbnRzLm1vZGFsID0gUmFjdGl2ZS5leHRlbmQoe1xyXG4gICAgaXNvbGF0ZWQ6IHRydWUsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG5cdFx0ICA8ZGl2IGlkPVwie3tpZH19XCIgY2xhc3M9XCJtb2RhbFwiPlxyXG4gICAgICAgICAgICAgICB7e3lpZWxkfX1cclxuICAgICAgICAgIDwvZGl2PlxyXG5cdGAsXHJcbiAgICBvbnJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmdldCgnaWQnKSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJNb2RhbCBDb21wb25lbnQgY2Fubm90IHdvcmsgd2l0aG91dCBpZC5cIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoJyMnK3RoaXMuZ2V0KCdpZCcpKS5tb2RhbCh7XHJcbiAgICAgICAgICAgIGRpc21pc3NpYmxlOiB0cnVlLCAvLyBNb2RhbCBjYW4gYmUgZGlzbWlzc2VkIGJ5IGNsaWNraW5nIG91dHNpZGUgb2YgdGhlIG1vZGFsXHJcbiAgICAgICAgICAgIC8vIG9wYWNpdHk6IC41LCAvLyBPcGFjaXR5IG9mIG1vZGFsIGJhY2tncm91bmRcclxuICAgICAgICAgICAgLy8gaW5fZHVyYXRpb246IDMwMCwgLy8gVHJhbnNpdGlvbiBpbiBkdXJhdGlvblxyXG4gICAgICAgICAgICAvLyBvdXRfZHVyYXRpb246IDIwMCwgLy8gVHJhbnNpdGlvbiBvdXQgZHVyYXRpb25cclxuICAgICAgICAgICAgLy8gc3RhcnRpbmdfdG9wOiAnNCUnLCAvLyBTdGFydGluZyB0b3Agc3R5bGUgYXR0cmlidXRlXHJcbiAgICAgICAgICAgIC8vIGVuZGluZ190b3A6ICcxMCUnLCAvLyBFbmRpbmcgdG9wIHN0eWxlIGF0dHJpYnV0ZVxyXG4gICAgICAgICAgICAvLyByZWFkeTogZnVuY3Rpb24gKG1vZGFsLCB0cmlnZ2VyKSB7IC8vIENhbGxiYWNrIGZvciBNb2RhbCBvcGVuLiBNb2RhbCBhbmQgdHJpZ2dlciBwYXJhbWV0ZXJzIGF2YWlsYWJsZS5cclxuICAgICAgICAgICAgLy8gICAgLy8gYWxlcnQoXCJSZWFkeVwiKTtcclxuICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKG1vZGFsLCB0cmlnZ2VyKTtcclxuICAgICAgICAgICAgLy8gfSxcclxuICAgICAgICAgICAgLy8gY29tcGxldGU6IGZ1bmN0aW9uICgpIHsgYWxlcnQoJ0Nsb3NlZCcpOyB9IC8vIENhbGxiYWNrIGZvciBNb2RhbCBjbG9zZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTsiLCIvLyAtLS0tIG1haW4uanMgLS0tLS1cclxuaW1wb3J0IHtSYWN0aXZlfSBmcm9tICdyYWN0aXZlJztcclxuXHJcbi8vaW1wb3J0IHt9IGZyb20gJy4vZGVjb3JhdG9ycy9zdG9wUHJvcGFnYXRpb24nO1xyXG5cclxuaW1wb3J0IHsgfSBmcm9tICcuL2NvbXBvbmVudHMvYXBwYmFyJztcclxuaW1wb3J0IHsgfSBmcm9tICcuL2NvbXBvbmVudHMvZHJvcGRvd24nO1xyXG5pbXBvcnQgeyB9IGZyb20gJy4vY29tcG9uZW50cy9hdXRvY29tcGxldGUnO1xyXG5pbXBvcnQgeyB9IGZyb20gJy4vY29tcG9uZW50cy9jaGVja2JveCc7XHJcbmltcG9ydCB7IH0gZnJvbSAnLi9jb21wb25lbnRzL2NvbWJvYm94JztcclxuaW1wb3J0IHsgfSBmcm9tICcuL2NvbXBvbmVudHMvbW9kYWwnO1xyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7O0FBR0EsQUFFQSxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO0NBQzFDLFFBQVEsRUFBRSxJQUFJO0NBQ2QsUUFBUSxDQUFDLENBQUM7Ozs7OztDQU1WLENBQUM7Q0FDRCxDQUFDOztBQ2RGOzs7QUFHQSxBQUVBLE9BQU8sQ0FBQyxVQUFVLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7SUFDN0MsUUFBUSxFQUFFLElBQUk7SUFDZCxRQUFRLEVBQUUsQ0FBQzs7Ozs7Ozs7OztpQkFVRSxDQUFDO0lBQ2QsT0FBTyxFQUFFLFVBQVUsS0FBSyxFQUFFO1FBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzFCLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0NBQ0osQ0FBQyxDQUFDOztBQUVILE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7SUFDekMsUUFBUSxFQUFFLElBQUk7SUFDZCxRQUFRLEVBQUUsQ0FBQzs7Ozs7Ozs7O0NBU2QsQ0FBQztJQUNFLE1BQU0sRUFBRSxZQUFZO1FBQ2hCLElBQUksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLFdBQVcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtZQUNsRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUks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
