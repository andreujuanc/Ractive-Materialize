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
	template:'<option selected="{{selected}}" value="{{value}}">{{text}}</option>',
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
                    <h5>{{title}}</h5>
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
		 <div  id="{{id}}" 
                class="modal 
                        {{#if type==='bottom'}}bottom-sheet{{/if}}"
                        {{#size}}style="max-height:{{size}}"{{/size}} 
            >
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

/************************************
 * 			  PRELOADER
 ***********************************/
Ractive.components.preloader = Ractive.extend({
	isolated: true,
	template:`
            <div class="preloader-wrapper {{size}} active">
                <div class="spinner-layer spinner-{{color}}-only">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div>
                    <div class="gap-patch">
                        <div class="circle"></div>
                    </div>
                    <div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                </div>
            </div>
            `,
    oninit: function(){
        
    },
    onrender:function(){
    },
    data: function(){
        return {
            
        };
    }
});

// ---- main.js -----
//import {} from './decorators/stopPropagation';

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFjdGl2ZS1tYXRlcmlhbGl6ZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbXBvbmVudHMvYXBwYmFyLmpzIiwiLi4vLi4vc3JjL2NvbXBvbmVudHMvZHJvcGRvd24uanMiLCIuLi8uLi9zcmMvY29tcG9uZW50cy9hdXRvY29tcGxldGUuanMiLCIuLi8uLi9zcmMvY29tcG9uZW50cy9jaGVja2JveC5qcyIsIi4uLy4uL3NyYy9jb21wb25lbnRzL2NvbWJvYm94LmpzIiwiLi4vLi4vc3JjL2NvbXBvbmVudHMvbW9kYWwuanMiLCIuLi8uLi9zcmMvY29tcG9uZW50cy9wcmVsb2FkZXIuanMiLCIuLi8uLi9zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqIFx0XHRcdFx0QVBQQkFSXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuaW1wb3J0IFJhY3RpdmUgZnJvbSAncmFjdGl2ZSc7XHJcblxyXG5SYWN0aXZlLmNvbXBvbmVudHMuYXBwYmFyID0gUmFjdGl2ZS5leHRlbmQoe1xyXG5cdGlzb2xhdGVkOiB0cnVlLFxyXG5cdHRlbXBsYXRlOmBcclxuXHRcdCA8bmF2PlxyXG5cdFx0XHQ8ZGl2IGNsYXNzPVwibmF2LXdyYXBwZXJcIj5cclxuXHRcdFx0XHR7e3lpZWxkfX1cdFx0XHRcclxuXHRcdFx0PC9kaXY+XHJcblx0XHQ8L25hdj5cclxuXHRgXHJcbn0pOyIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogXHRcdFx0ICBEUk9QRE9XTlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbmltcG9ydCBSYWN0aXZlIGZyb20gJ3JhY3RpdmUnO1xyXG5cclxuUmFjdGl2ZS5jb21wb25lbnRzLmRyb3Bkb3duaXRlbSA9IFJhY3RpdmUuZXh0ZW5kKHtcclxuICAgIGlzb2xhdGVkOiB0cnVlLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICAgICAgPGxpIHt7I2RpdmlkZXJ9fSBjbGFzcz1cImRpdmlkZXJcIiB7ey9kaXZpZGVyfX0gPlxyXG5cclxuICAgICAgICAgICAgICAgIDxhIFxyXG4gICAgICAgICAgICAgICAgICAgIHt7I2hyZWZ9fWhyZWY9XCJ7e2hyZWZ9fVwie3svaHJlZn19XHJcbiAgICAgICAgICAgICAgICAgICAgb24tY2xpY2s9XCJAdGhpcy5vbmNsaWNrKGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIHt7dGV4dH19XHJcbiAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgPC9saT5gLFxyXG4gICAgb25jbGljazogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5maXJlKCdjbGljaycsIGV2ZW50KTtcclxuICAgICAgICAvL3JldHVybiBmYWxzZTsgbm8gbmVlZFxyXG4gICAgfVxyXG59KTtcclxuLy9zdG9wcHJvcGFnYXRpb24gPz8/IG5lZWRlZD9cclxuUmFjdGl2ZS5jb21wb25lbnRzLmRyb3Bkb3duID0gUmFjdGl2ZS5leHRlbmQoe1xyXG4gICAgaXNvbGF0ZWQ6IHRydWUsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG5cdFx0PGEgaHJlZj0nIycgZGF0YS1hY3RpdmF0ZXM9J3t7aWR9fScgc3RvcHByb3BhZ2F0aW9uPVwidHJ1ZVwiPlxyXG4gICAgICAgICAgICA8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+bW9yZV92ZXJ0PC9pPlxyXG4gICAgICAgIDwvYT5cclxuXHJcbiAgICAgICAgPCEtLSBEcm9wZG93biBTdHJ1Y3R1cmUgLS0+XHJcbiAgICAgICAgPHVsIGlkPSd7e2lkfX0nIGNsYXNzPSdkcm9wZG93bi1jb250ZW50Jz5cclxuICAgICAgICAgICAge3t5aWVsZH19XHJcbiAgICAgICAgPC91bD5cclxuXHRgLFxyXG4gICAgb25pbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmdldCgnaWQnKSA9PT0gJ3VuZGVmaW5lZCcgfHwgdGhpcy5nZXQoJ2lkJykgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXQoJ2lkJywgJ2NoaycgKyBEYXRlLm5vdygpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvbnJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vd2luZG93LnRlc3QgPSB0aGlzO1xyXG4gICAgICAgIHZhciBiZWxvd09yaWdpbiA9IHRoaXMuZ2V0KCdiZWxvd29yaWdpbicpO1xyXG4gICAgICAgIHZhciBjb25zdHJhaW5fd2lkdGggPSB0aGlzLmdldCgnY29uc3RyYWlud2lkdGgnKVxyXG4gICAgICAgICQodGhpcy5maW5kKCcqJykpLmRyb3Bkb3duKHtcclxuICAgICAgICAgICAgYmVsb3dPcmlnaW46IGJlbG93T3JpZ2luLFxyXG4gICAgICAgICAgICBjb25zdHJhaW5fd2lkdGg6IGNvbnN0cmFpbl93aWR0aFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTsiLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqIFx0XHRcdEFVVE9DT01QTEVURVxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbmltcG9ydCBSYWN0aXZlIGZyb20gJ3JhY3RpdmUnO1xyXG5cclxuUmFjdGl2ZS5jb21wb25lbnRzLmF1dG9jb21wbGV0ZSA9IFJhY3RpdmUuZXh0ZW5kKHtcclxuICAgIGlzb2xhdGVkOiB0cnVlLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGRcIj5cclxuXHRcdCA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInt7aWR9fVwiIGNsYXNzPVwiYXV0b2NvbXBsZXRlXCIgb24ta2V5dXA9XCJ2YWx1ZWNoYW5nZVwiPlxyXG4gICAgICAgICA8bGFiZWwgZm9yPVwie3tpZH19XCI+QWRkIEl0ZW08L2xhYmVsPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgXHRgLFxyXG4gICAgZGF0YTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGl0ZW1zOiBudWxsXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBvbmluaXQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB9LFxyXG4gICAgaXRlbXNjaGFuZ2VkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2l0ZW1zIGNoYW5nZWQnLCB0aGlzLmdldCgnaXRlbXMnKSk7XHJcbiAgICAgICAgJCh0aGlzLmZpbmQoJ2lucHV0JykpLmF1dG9jb21wbGV0ZSh7XHJcbiAgICAgICAgICAgIGRhdGE6IHRoaXMuZ2V0KCdpdGVtcycpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgdmFsdWVjaGFuZ2U6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHRoaXMuZmlyZSgnYXV0b25lZWRkYXRhJywgZXZlbnQub3JpZ2luYWwudGFyZ2V0LnZhbHVlKTtcclxuICAgIH0sXHJcbiAgICBvbnJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMub2JzZXJ2ZSgnaXRlbXMnLCB0aGlzLml0ZW1zY2hhbmdlZCk7XHJcbiAgICAgICAgdGhpcy5vbigndmFsdWVjaGFuZ2UnLCB0aGlzLnZhbHVlY2hhbmdlKTtcclxuICAgIH1cclxufSk7IiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKiBcdFx0XHQgIENIRUNLQk9YXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuaW1wb3J0IFJhY3RpdmUgZnJvbSAncmFjdGl2ZSc7XHJcblxyXG5SYWN0aXZlLmNvbXBvbmVudHMuY2hlY2tib3ggPSBSYWN0aXZlLmV4dGVuZCh7XHJcblx0aXNvbGF0ZWQ6IHRydWUsXHJcblx0dGVtcGxhdGU6YFxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJ7e2lkfX1cIiB7eyNjaGVja2VkfX1jaGVja2Vke3svY2hlY2tlZH19IG9uLWNoYW5nZT1cImNoZWNrZWRjaGFuZ2VkXCIgLz5cclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cInt7aWR9fVwiID48L2xhYmVsPlxyXG4gICAgICAgICAgICBgLFxyXG4gICAgb25pbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMub24oJ2NoZWNrZWRjaGFuZ2VkJywgdGhpcy5jaGVja2VkY2hhbmdlZCk7XHJcbiAgICB9LFxyXG4gICAgb25yZW5kZXI6ZnVuY3Rpb24oKXtcclxuICAgICAgICBpZih0eXBlb2YgdGhpcy5nZXQoJ2lkJykgPT09ICd1bmRlZmluZWQnIHx8IHRoaXMuZ2V0KCdpZCcpID09PSBudWxsICl7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0KCdpZCcsICdjaGsnK0RhdGUubm93KCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGRhdGE6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY2hlY2tlZDpmYWxzZVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgY2hlY2tlZGNoYW5nZWQ6IGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICB2YXIgZSA9IGV2ZW50O1xyXG4gICAgICAgIGlmKGV2ZW50Lm9yaWdpbmFsKVxyXG4gICAgICAgICAgICBlID0gZXZlbnQub3JpZ2luYWw7XHJcbiAgICAgICAgdGhpcy5zZXQoJ2NoZWNrZWQnLCBlLnRhcmdldC5jaGVja2VkKTtcclxuICAgIH0sXHJcblxyXG59KTsiLCJpbXBvcnQgUmFjdGl2ZSBmcm9tICdyYWN0aXZlJztcclxuXHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqIFx0XHRcdCAgQ09NQk9CT1ggSVRFTVxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5SYWN0aXZlLmNvbXBvbmVudHMuY29tYm9ib3hpdGVtID0gUmFjdGl2ZS5leHRlbmQoe1xyXG5cdGlzb2xhdGVkOiB0cnVlLFxyXG5cdHRlbXBsYXRlOic8b3B0aW9uIHNlbGVjdGVkPVwie3tzZWxlY3RlZH19XCIgdmFsdWU9XCJ7e3ZhbHVlfX1cIj57e3RleHR9fTwvb3B0aW9uPicsXHJcbiAgICBvbnJlbmRlcjogZnVuY3Rpb24oKXtcclxuICAgICAgICAkKHRoaXMucGFyZW50LmZpbmQoJ3NlbGVjdCcpKS5tYXRlcmlhbF9zZWxlY3QoKTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqIFx0XHRcdCAgQ09NQk9CT1hcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5SYWN0aXZlLmNvbXBvbmVudHMuY29tYm9ib3ggPSBSYWN0aXZlLmV4dGVuZCh7XHJcbiAgICBpc29sYXRlZDogdHJ1ZSxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgICAgIDxzZWxlY3QgaWQ9XCJ7e2lkfX1cIiBvbi1jaGFuZ2U9XCJAdGhpcy5zZWxlY3RlZGNoYW5nZWQoZXZlbnQpXCIgdmFsdWU9XCJ7e3ZhbHVlfX1cIiA+XHJcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCIgZGlzYWJsZWQgc2VsZWN0ZWQ+e3tsYWJlbH19PC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICB7e3lpZWxkfX1cclxuICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJ7e2lkfX1cIj57e2xhYmVsfX08L2xhYmVsPlxyXG4gICAgICAgICAgICBgLFxyXG4gICAgb25pbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy90aGlzLm9uKCdzZWxlY3RlZGNoYW5nZWQnLCB0aGlzLnNlbGVjdGVkY2hhbmdlZCk7XHJcbiAgICAgIFxyXG4gICAgfSxcclxuICAgIG9ucmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHZhciBjdHJsID0gdGhpcy5maW5kKCdzZWxlY3QnKTtcclxuICAgICAgICAkKGN0cmwpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihldmVudCl7IHNlbGYuc2VsZWN0ZWRjaGFuZ2VkKGV2ZW50LCBzZWxmKTsgfSk7XHJcbiAgICAgICAgJChjdHJsKS5tYXRlcmlhbF9zZWxlY3QoKTtcclxuICAgICAgICB0aGlzLm9ic2VydmUoJ3ZhbHVlJywgZnVuY3Rpb24oYSwgYiwgYywgZCl7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKGN0cmwudmFsdWUgIT09IGEpe1xyXG4gICAgICAgICAgICAgICBjdHJsLnZhbHVlID0gYTtcclxuICAgICAgICAgICAgICAgc2VsZi51cGRhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBvbmNoYW5nZTogZnVuY3Rpb24oKXtcclxuICAgICAgICAkKHRoaXMuZmluZCgnc2VsZWN0JykpLm1hdGVyaWFsX3NlbGVjdCgpO1xyXG4gICAgfSxcclxuICAgIG9uY29tcGxldGU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAvLyQodGhpcy5maW5kKCdzZWxlY3QnKSkubWF0ZXJpYWxfc2VsZWN0KCk7XHJcbiAgICB9LFxyXG4gICAgb250ZWFyZG93bjogZnVuY3Rpb24oKXtcclxuICAgICAgICAvL1RPRE86IHRlc3RcclxuICAgICAgICAkKHRoaXMuZmluZCgnc2VsZWN0JykpLm1hdGVyaWFsX3NlbGVjdCgnZGVzdHJveScpO1xyXG4gICAgfSxcclxuICAgIGRhdGE6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzZWxlY3RlZDogbnVsbFxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgc2VsZWN0ZWRjaGFuZ2VkOiBmdW5jdGlvbiAoZXZlbnQsIHNlbGYpIHtcclxuICAgICAgICB2YXIgZSA9IGV2ZW50O1xyXG4gICAgICAgIGlmIChldmVudC5vcmlnaW5hbClcclxuICAgICAgICAgICAgZSA9IGV2ZW50Lm9yaWdpbmFsO1xyXG5cclxuICAgICAgICBzZWxmLnNldCgndmFsdWUnLCBzZWxmLmZpbmQoJ3NlbGVjdCcpLnZhbHVlKTtcclxuICAgICAgICBzZWxmLmZpcmUoJ2NoYW5nZScsIGV2ZW50KTtcclxuICAgICAgICAvL3RoaXMuc2V0KCd2YWx1ZScsIGUudGFyZ2V0LnZhbHVlKTtcclxuICAgIH0sXHJcblxyXG59KTsiLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqIFx0XHRcdFx0TU9EQUxcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5pbXBvcnQgUmFjdGl2ZSBmcm9tICdyYWN0aXZlJztcclxuXHJcblJhY3RpdmUuY29tcG9uZW50cy5tb2RhbGNvbnRlbnQgPSBSYWN0aXZlLmV4dGVuZCh7XHJcbiAgICBpc29sYXRlZDogdHJ1ZSxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoNT57e3RpdGxlfX08L2g1PlxyXG4gICAgICAgICAgICAgICAgICAgIHt7eWllbGR9fVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblx0YFxyXG59KTtcclxuXHJcblJhY3RpdmUuY29tcG9uZW50cy5tb2RhbGZvb3RlciA9IFJhY3RpdmUuZXh0ZW5kKHtcclxuICAgIGlzb2xhdGVkOiB0cnVlLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICB7e3lpZWxkfX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cdGBcclxufSk7XHJcblxyXG5SYWN0aXZlLmNvbXBvbmVudHMubW9kYWwgPSBSYWN0aXZlLmV4dGVuZCh7XHJcbiAgICBpc29sYXRlZDogdHJ1ZSxcclxuICAgIHRlbXBsYXRlOiBgXHJcblx0XHQgPGRpdiAgaWQ9XCJ7e2lkfX1cIiBcclxuICAgICAgICAgICAgICAgIGNsYXNzPVwibW9kYWwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt7I2lmIHR5cGU9PT0nYm90dG9tJ319Ym90dG9tLXNoZWV0e3svaWZ9fVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt7I3NpemV9fXN0eWxlPVwibWF4LWhlaWdodDp7e3NpemV9fVwie3svc2l6ZX19IFxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICB7e3lpZWxkfX1cclxuICAgICAgICAgIDwvZGl2PlxyXG5cdGAsXHJcbiAgICBvbnJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmdldCgnaWQnKSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJNb2RhbCBDb21wb25lbnQgY2Fubm90IHdvcmsgd2l0aG91dCBpZC5cIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoJyMnK3RoaXMuZ2V0KCdpZCcpKS5tb2RhbCh7XHJcbiAgICAgICAgICAgIGRpc21pc3NpYmxlOiB0cnVlLCAvLyBNb2RhbCBjYW4gYmUgZGlzbWlzc2VkIGJ5IGNsaWNraW5nIG91dHNpZGUgb2YgdGhlIG1vZGFsXHJcbiAgICAgICAgICAgIC8vIG9wYWNpdHk6IC41LCAvLyBPcGFjaXR5IG9mIG1vZGFsIGJhY2tncm91bmRcclxuICAgICAgICAgICAgLy8gaW5fZHVyYXRpb246IDMwMCwgLy8gVHJhbnNpdGlvbiBpbiBkdXJhdGlvblxyXG4gICAgICAgICAgICAvLyBvdXRfZHVyYXRpb246IDIwMCwgLy8gVHJhbnNpdGlvbiBvdXQgZHVyYXRpb25cclxuICAgICAgICAgICAgLy8gc3RhcnRpbmdfdG9wOiAnNCUnLCAvLyBTdGFydGluZyB0b3Agc3R5bGUgYXR0cmlidXRlXHJcbiAgICAgICAgICAgIC8vIGVuZGluZ190b3A6ICcxMCUnLCAvLyBFbmRpbmcgdG9wIHN0eWxlIGF0dHJpYnV0ZVxyXG4gICAgICAgICAgICAvLyByZWFkeTogZnVuY3Rpb24gKG1vZGFsLCB0cmlnZ2VyKSB7IC8vIENhbGxiYWNrIGZvciBNb2RhbCBvcGVuLiBNb2RhbCBhbmQgdHJpZ2dlciBwYXJhbWV0ZXJzIGF2YWlsYWJsZS5cclxuICAgICAgICAgICAgLy8gICAgLy8gYWxlcnQoXCJSZWFkeVwiKTtcclxuICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKG1vZGFsLCB0cmlnZ2VyKTtcclxuICAgICAgICAgICAgLy8gfSxcclxuICAgICAgICAgICAgLy8gY29tcGxldGU6IGZ1bmN0aW9uICgpIHsgYWxlcnQoJ0Nsb3NlZCcpOyB9IC8vIENhbGxiYWNrIGZvciBNb2RhbCBjbG9zZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTsiLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqIFx0XHRcdCAgUFJFTE9BREVSXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuaW1wb3J0IFJhY3RpdmUgZnJvbSAncmFjdGl2ZSc7XHJcblxyXG5SYWN0aXZlLmNvbXBvbmVudHMucHJlbG9hZGVyID0gUmFjdGl2ZS5leHRlbmQoe1xyXG5cdGlzb2xhdGVkOiB0cnVlLFxyXG5cdHRlbXBsYXRlOmBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByZWxvYWRlci13cmFwcGVyIHt7c2l6ZX19IGFjdGl2ZVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItbGF5ZXIgc3Bpbm5lci17e2NvbG9yfX0tb25seVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGUtY2xpcHBlciBsZWZ0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGVcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FwLXBhdGNoXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGVcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlLWNsaXBwZXIgcmlnaHRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgLFxyXG4gICAgb25pbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIFxyXG4gICAgfSxcclxuICAgIG9ucmVuZGVyOmZ1bmN0aW9uKCl7XHJcbiAgICB9LFxyXG4gICAgZGF0YTogZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59KTsiLCIvLyAtLS0tIG1haW4uanMgLS0tLS1cclxuaW1wb3J0IHtSYWN0aXZlfSBmcm9tICdyYWN0aXZlJztcclxuXHJcbi8vaW1wb3J0IHt9IGZyb20gJy4vZGVjb3JhdG9ycy9zdG9wUHJvcGFnYXRpb24nO1xyXG5cclxuaW1wb3J0IHsgfSBmcm9tICcuL2NvbXBvbmVudHMvYXBwYmFyJztcclxuaW1wb3J0IHsgfSBmcm9tICcuL2NvbXBvbmVudHMvZHJvcGRvd24nO1xyXG5pbXBvcnQgeyB9IGZyb20gJy4vY29tcG9uZW50cy9hdXRvY29tcGxldGUnO1xyXG5pbXBvcnQgeyB9IGZyb20gJy4vY29tcG9uZW50cy9jaGVja2JveCc7XHJcbmltcG9ydCB7IH0gZnJvbSAnLi9jb21wb25lbnRzL2NvbWJvYm94JztcclxuaW1wb3J0IHsgfSBmcm9tICcuL2NvbXBvbmVudHMvbW9kYWwnO1xyXG5pbXBvcnQgeyB9IGZyb20gJy4vY29tcG9uZW50cy9wcmVsb2FkZXInOyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7QUFHQSxBQUVBLE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7Q0FDMUMsUUFBUSxFQUFFLElBQUk7Q0FDZCxRQUFRLENBQUMsQ0FBQzs7Ozs7O0NBTVYsQ0FBQztDQUNELENBQUM7O0FDZEY7OztBQUdBLEFBRUEsT0FBTyxDQUFDLFVBQVUsQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztJQUM3QyxRQUFRLEVBQUUsSUFBSTtJQUNkLFFBQVEsRUFBRSxDQUFDOzs7Ozs7Ozs7O2lCQVVFLENBQUM7SUFDZCxPQUFPLEVBQUUsVUFBVSxLQUFLLEVBQUU7UUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7O0tBRTdCO0NBQ0osQ0FBQyxDQUFDOztBQUVILE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7SUFDekMsUUFBUSxFQUFFLElBQUk7SUFDZCxRQUFRLEVBQUUsQ0FBQzs7Ozs7Ozs7O0NBU2QsQ0FBQztJQUNFLE1BQU0sRUFBRSxZQUFZO1FBQ2hCLElBQUksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLFdBQVcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtZQUNsRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENB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
